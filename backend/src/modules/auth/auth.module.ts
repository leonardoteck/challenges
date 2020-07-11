import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { BcryptHashService } from './services/bcrypt-hash.service';
import { MenaceModule } from '../menace/menace.module';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
        }),
        UserModule,
        MenaceModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, BcryptHashService],
    exports: [PassportModule, AuthService, BcryptHashService],
})
export class AuthModule { }
