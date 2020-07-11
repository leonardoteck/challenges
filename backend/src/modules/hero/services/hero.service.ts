import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Hero } from '../models/hero.entity';
import { HeroFight } from '../../fight/models/hero-fight.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HeroRank } from '../models/hero-rank.entity';
import { Location } from '../../../models/location.entity';
import { FightService } from '../../fight/services/fight.service';

@Injectable()
export class HeroService {
    constructor(
        @InjectRepository(Hero)
        private readonly heroRepository: Repository<Hero>,
        @InjectRepository(HeroRank)
        private readonly heroRankRepository: Repository<HeroRank>,
        @InjectRepository(HeroFight)
        private readonly heroFightRepository: Repository<HeroFight>,
        @InjectRepository(Location)
        private readonly locationRepository: Repository<Location>,
        private readonly fightService: FightService,
    ) {}

    async register(hero: Hero): Promise<Hero> {
        const saved = await this.heroRepository.save(hero);
        await this.fightService.findMatches();
        return saved;
    }

    async list(): Promise<Hero[]> {
        return this.heroRepository.find();
    }

    async listRanks(): Promise<HeroRank[]> {
        return this.heroRankRepository.find();
    }

    async remove(id: number): Promise<void> {
        await this.heroFightRepository.update({ heroId: id }, { heroId: null });
        const entity = await this.heroRepository.findOne(id);
        await this.heroRepository.remove(entity);
        await this.locationRepository.delete({ id: entity.locationId });
    }
}
