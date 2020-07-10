import {
    EntityRepository, Repository,
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { InvalidOperationException } from '../../../exceptions/invalid-operation.exception';

@EntityRepository()
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    /**
     * This method is intended for authentication only!
     */
    async searchByEmail(email: string): Promise<User> {
        return this.userRepository
            .findOne({ where: { email }, loadEagerRelations: false });
    }

    async emailExists(email: string): Promise<boolean> {
        const exists = await this.userRepository.createQueryBuilder('u')
            .where('u.email = :email', { email })
            .take(1)
            .limit(1)
            .select('u.id')
            .getRawMany(); // the lightest query one can think of
        return exists.length > 0;
    }

    async add(user: User): Promise<User> {
        if (await this.emailExists(user.email)) throw new InvalidOperationException('E-mail já cadastrado');
        return this.userRepository.save(user);
    }
}
