import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenaceController } from './controllers/menace.controller';
import { MenaceService } from './services/menace.service';
import { Menace } from './models/menace.entity';
import { MenaceRank } from './models/menace-rank.entity';
import { FightModule } from '../fight/fight.module';
import { ListenerService } from './services/listener.service';

@Module({
  imports: [
      PassportModule.register({ defaultStrategy: 'jwt' }),
      TypeOrmModule.forFeature([Menace, MenaceRank]),
      FightModule,
  ],
  controllers: [MenaceController],
  providers: [MenaceService, ListenerService],
  exports: [ListenerService],
})
export class MenaceModule {}
