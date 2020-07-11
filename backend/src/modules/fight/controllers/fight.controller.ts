import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { FightService } from '../services/fight.service';
import { AuthGuard } from '@nestjs/passport';
import { Fight } from '../models/fight.entity';

@Controller('fight')
export class FightController {
    constructor(
        private readonly fightService: FightService,
    ) {}

    @Get('test')
    test(): Promise<any> {
        return this.fightService.findMatches();
    }

    @Get('list')
    @UseGuards(AuthGuard())
    list(): Promise<{ goingOn: Fight[], ended: Fight[] }> {
        return this.fightService.list();
    }

    @Get('end')
    @UseGuards(AuthGuard())
    end(@Query() query: { id: number }): Promise<void> {
        return this.fightService.end(query.id);
    }
}
