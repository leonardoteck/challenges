import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import config = require('../ormconfig');
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config as TypeOrmModuleOptions),
    AuthModule,
    UserModule,
    // HeroModule,
    // MenaceModule,
    // FightModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
