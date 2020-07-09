import {
    Controller, Get, UseGuards, Body, Post, UseInterceptors, ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { AuthPayload } from '../models/auth.payload';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from '../../user/models/user.entity';
import { AccessToken } from '../models/access-token.viewmodel';

/**
 * ATTENTION: FOR INCREASED SECURITY, NO DATA SHALL BE RECEIVED THROUGH PATH PARAMS OR QUERY PARAMS!
 */

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('login')
    async login(@Body() payload: AuthPayload): Promise<AccessToken> {
        const user = await this.authService.validateUser(payload);
        return this.authService.createToken(user.email, user.id);
    }

    @Get('testauth')
    @UseGuards(AuthGuard())
    testAuth(@CurrentUser() user: User): string {
        return user.email;
    }
}
