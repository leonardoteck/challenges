import {
    Controller,
    Post,
    Body,
    UseInterceptors,
    ClassSerializerInterceptor,
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common';

import { UserService } from '../services/user.service';
import { UserPayload } from '../models/user.payload';
import { User } from '../models/user.entity';
import { InvalidOperationException } from '../../../exceptions/invalid-operation.exception';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Post('register')
    async register(@Body() payload: UserPayload): Promise<User> {
        try {
            const user = await this.userService.add({
                ...payload,
                id: 0,
            });

            return user;
        } catch (error) {
            if (error instanceof BadRequestException) throw error;
            if (error instanceof InvalidOperationException) throw error.toBadRequest();
            else throw new InternalServerErrorException('Ocorreu um erro ao registrar usuário');
        }
    }
}
