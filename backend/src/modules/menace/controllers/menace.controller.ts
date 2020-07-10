import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MenacePayload } from '../models/menace.payload';
import { Menace } from '../models/menace.entity';
import { MenaceService } from '../services/menace.service';
import { MenaceRank } from '../models/menace-rank.entity';

@Controller('menace')
export class MenaceController {
    constructor(
        private readonly menaceService: MenaceService,
    ) {}

    @Get('list')
    @UseGuards(AuthGuard())
    list(): Promise<Menace[]> {
        return this.menaceService.list();
    }

    @Get('ranks')
    @UseGuards(AuthGuard())
    ranks(): Promise<MenaceRank[]> {
        return this.menaceService.listRanks();
    }

    @Post('register')
    @UseGuards(AuthGuard())
    register(@Body() payload: MenacePayload): Promise<Menace> {
        return this.menaceService.register({
            ...payload,
            dateRegister: new Date(),
        });
    }
}
