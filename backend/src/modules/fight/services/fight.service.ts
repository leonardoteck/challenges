import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hero } from '../../hero/models/hero.entity';
import { Fight } from '../models/fight.entity';
import { Repository, IsNull, Not, In } from 'typeorm';
import { Menace } from '../../menace/models/menace.entity';
import { HeroFight } from '../models/hero-fight.entity';

@Injectable()
export class FightService {
    constructor(
        @InjectRepository(Hero)
        private readonly heroRepository: Repository<Hero>,
        @InjectRepository(HeroFight)
        private readonly heroFightRepository: Repository<HeroFight>,
        @InjectRepository(Fight)
        private readonly fightRepository: Repository<Fight>,
        @InjectRepository(Menace)
        private readonly menaceRepository: Repository<Menace>,
    ) {}
    
    async findMatches(): Promise<any> {
        let availableMenaces = await this.menaceRepository.find({ where: { fightId: IsNull() } });
        const heroesBusy = await this.heroFightRepository.find({ loadEagerRelations: false })
        let availableHeroes = await this.heroRepository.find(
            heroesBusy.length > 0 ? { where: { id: Not(In(heroesBusy.map(obj => obj.heroId))) } } : {}
        );
        
        const fightsToAwait: Array<Promise<Fight>> = [];

        // firstly, if there's any single hero able to fight a menace alone, he/she/it shall do it
        for (let i = 0; i < availableMenaces.length; i++) {
            for (let j = 0; j < availableHeroes.length; j++) {
                if (availableMenaces[i].menaceRank.value === availableHeroes[j].heroRank.value) {
                    fightsToAwait.push(this.startFight(availableMenaces[i], [availableHeroes[j]]));
                    availableMenaces.splice(i--, 1);
                    availableHeroes.splice(j--, 1);
                    break;
                }
            }
        }

        // if there's still menaces going on and heroes available, let's match'em
        if (availableHeroes.length > 0 && availableMenaces.length > 0) {
            availableMenaces = availableMenaces.sort((a, b) => b.menaceRank.value - a.menaceRank.value);
            availableHeroes = availableHeroes.sort((a, b) => b.heroRank.value - a.heroRank.value);
            for (let i = 0; i < availableMenaces.length; i++) {
                const menace = availableMenaces[i];

                // first, search for a group of heroes that individually are not strong enough
                let prospectedHeroes: number[] = [];
                let rankSum = 0;
                for (let j = 0; j < availableHeroes.length; j++) {
                    const hero = availableHeroes[j];
                    if (rankSum + hero.heroRank.value <= menace.menaceRank.value) {
                        prospectedHeroes.push(j);
                        rankSum += hero.heroRank.value;
                    }
                    if (rankSum === menace.menaceRank.value) break;
                }

                // if the whole group still can't fight the menace but there are other heroes available...
                if (rankSum < menace.menaceRank.value && prospectedHeroes.length < availableHeroes.length) {
                    // it means that there's a hero alone that is stronger than the menace
                    const stronger = availableHeroes
                        .sort((a, b) => a.heroRank.value - b.heroRank.value) // get the weaker of the strongers
                        .findIndex(hero => hero.heroRank.value > menace.menaceRank.value);
                    prospectedHeroes = [stronger];
                    rankSum = availableHeroes[stronger].heroRank.value;
                }

                if (rankSum >= menace.menaceRank.value) {
                    const heroes = prospectedHeroes.sort((a, b) => b - a).reduce((group, heroIndex) => {
                        group.push(availableHeroes[heroIndex]);
                        availableHeroes.splice(heroIndex, 1);
                        return group;
                    }, new Array<Hero>());

                    fightsToAwait.push(this.startFight(menace, heroes));
                    availableMenaces.splice(i--, 1);
                }
            }
        }

        return [await Promise.all(fightsToAwait), availableMenaces, availableHeroes];
    }

    async startFight(menace: Menace, heroes: Hero[]): Promise<Fight> {
        menace.fight = {
            dateStart: new Date(),
            heroFightList: heroes.map(hero => ({
                hero,
                heroId: hero.id,
            })),
        };
        await this.menaceRepository.save(menace);
        return menace.fight;
    }

    async list(): Promise<{ goingOn: Fight[], ended: Fight[] }> {
        return (await this.fightRepository.find()).reduce((list, fight) => {
            if (fight.dateEnd) list.ended.push(fight);
            else list.goingOn.push(fight);
            return list;
        }, { goingOn: [], ended: [] });
    }

    async end(id: number): Promise<void> {
        await this.fightRepository.update({ id }, { dateEnd: new Date() })
    }
}
