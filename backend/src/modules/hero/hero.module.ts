import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroController } from './controllers/hero.controller';
import { HeroService } from './services/hero.service';
import { Hero } from './models/hero.entity';
import { HeroFight } from '../fight/models/hero-fight.entity';
import { HeroRank } from './models/hero-rank.entity';
import { Location } from '../../models/location.entity';
import { FightModule } from '../fight/fight.module';

@Module({
  imports: [
      PassportModule.register({ defaultStrategy: 'jwt' }),
      TypeOrmModule.forFeature([Hero, HeroFight, HeroRank, Location]),
      FightModule,
  ],
  controllers: [HeroController],
  providers: [HeroService]
})
export class HeroModule {}
