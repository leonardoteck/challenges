import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import config = require('../ormconfig');
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { HeroModule } from './modules/hero/hero.module';
import { MenaceModule } from './modules/menace/menace.module';
import { FightModule } from './modules/fight/fight.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config as TypeOrmModuleOptions),
    AuthModule,
    UserModule,
    HeroModule,
    MenaceModule,
    FightModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
