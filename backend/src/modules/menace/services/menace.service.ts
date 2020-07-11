import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Menace } from '../models/menace.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MenaceRank } from '../models/menace-rank.entity';
import { FightService } from '../../fight/services/fight.service';

@Injectable()
export class MenaceService {
    constructor(
        @InjectRepository(Menace)
        private readonly menaceRepository: Repository<Menace>,
        @InjectRepository(MenaceRank)
        private readonly menaceRankRepository: Repository<MenaceRank>,
        private readonly fightService: FightService,
    ) {}

    async register(menace: Menace): Promise<Menace> {
        const saved = await this.menaceRepository.save(menace);
        await this.fightService.findMatches();
        return saved;
    }

    async list(): Promise<Menace[]> {
        return this.menaceRepository.find();
    }

    async listRanks(): Promise<MenaceRank[]> {
        return this.menaceRankRepository.find();
    }
}
