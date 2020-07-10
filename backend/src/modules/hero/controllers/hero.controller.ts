import { Controller, Post, UseGuards, Body, Get, Query, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HeroPayload } from '../models/hero.payload';
import { Hero } from '../models/hero.entity';
import { HeroService } from '../services/hero.service';
import { HeroRank } from '../models/hero-rank.entity';

@Controller('hero')
export class HeroController {
    constructor(
        private readonly heroService: HeroService,
    ) {}

    @Get('list')
    @UseGuards(AuthGuard())
    list(): Promise<Hero[]> {
        return this.heroService.list();
    }
    
    @Get('ranks')
    @UseGuards(AuthGuard())
    ranks(): Promise<HeroRank[]> {
        return this.heroService.listRanks();
    }
    
    @Post('register')
    @UseGuards(AuthGuard())
    register(@Body() payload: HeroPayload): Promise<Hero> {
        return this.heroService.register({
            dateRegister: new Date(),
            ...payload,
        });
    }

    @Delete('remove')
    @UseGuards(AuthGuard())
    remove(@Query() query: { id: number }): Promise<void> {
        return this.heroService.remove(+query.id);
    }
}
