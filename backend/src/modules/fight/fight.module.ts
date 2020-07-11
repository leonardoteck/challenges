import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FightController } from './controllers/fight.controller';
import { FightService } from './services/fight.service';
import { Fight } from './models/fight.entity';
import { HeroFight } from './models/hero-fight.entity';
import { Menace } from '../menace/models/menace.entity';
import { Hero } from '../hero/models/hero.entity';

@Module({
  imports: [
      PassportModule.register({ defaultStrategy: 'jwt' }),
      TypeOrmModule.forFeature([Fight, Hero, HeroFight, Menace]),
  ],
  controllers: [FightController],
  providers: [FightService],
  exports: [FightService],
})
export class FightModule {}
