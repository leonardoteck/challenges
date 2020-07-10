import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Menace } from '../models/menace.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MenaceRank } from '../models/menace-rank.entity';

@Injectable()
export class MenaceService {
    constructor(
        @InjectRepository(Menace)
        private readonly menaceRepository: Repository<Menace>,
        @InjectRepository(MenaceRank)
        private readonly menaceRankRepository: Repository<MenaceRank>,
    ) {}

    async register(menace: Menace): Promise<Menace> {
        return this.menaceRepository.save(menace);
    }

    async list(): Promise<Menace[]> {
        return this.menaceRepository.find();
    }

    async listRanks(): Promise<MenaceRank[]> {
        return this.menaceRankRepository.find();
    }
}
