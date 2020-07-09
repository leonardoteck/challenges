import { createParamDecorator } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { User } from '../../user/models/user.entity';

/**
 * Retrieve the current user with a decorator
 * example of a controller method:
 * @Post()
 * someMethod(@CurrentUser() user: User) {
 *   // do something with the user
 * }
 */
export const CurrentUser = createParamDecorator(async (_, req) => {
    const user = await getRepository(User).findOne({
        where: { email: req.user.decodedToken.email },
        loadEagerRelations: false,
    });
    return user;
});
