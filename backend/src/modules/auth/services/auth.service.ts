import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from '../models/auth.payload';
import { UserService } from '../../user/services/user.service';
import { User } from '../../user/models/user.entity';
import { BcryptHashService } from './bcrypt-hash.service';
import { AccessToken } from '../models/access-token.viewmodel';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly hasher: BcryptHashService,
    ) { }

    async validateUser(payload: AuthPayload): Promise<User> {
        const user = await this.userService.searchByEmail(payload.email);
        if (!user || !this.hasher.verify(payload.password, user.password)) {
            throw new UnauthorizedException('E-mail ou senha incorretos!');
        }
        return user;
    }

    async createToken(email: string, userId: number): Promise<AccessToken> {
        const timestamp = new Date().getTime();
        const payload = { email };
        const accessToken = await this.jwtService.signAsync(payload, { expiresIn: +process.env.JWT_EXPIRATION_TIME });
        const obj = {
            expiresIn: +process.env.JWT_EXPIRATION_TIME,
            accessToken,
            userId,
            timestamp,
        };
        return obj;
    }
}
