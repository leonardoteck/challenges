import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtAcessPayload as JwtAccessPayload } from '../models/jwt-access.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    accessToken: string;

    constructor() {
        super({
            jwtFromRequest: (req) => {
                this.accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
                return this.accessToken;
            },
            secretOrKey: process.env.JWT_SECRET_KEY,
        });
    }

    async validate(payload: JwtAccessPayload) {
        return {
            accessToken: this.accessToken,
            decodedToken: payload,
        };
    }
}
