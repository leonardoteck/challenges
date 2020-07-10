import { Exclude } from 'class-transformer';
import {
    Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';
import { PasswordTransformer } from '../transformers/password.transformer';
import { BcryptHashService } from '../../auth/services/bcrypt-hash.service';

@Entity({
    name: 'user',
})
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ length: 254 })
    email: string;

    @Column({ length: 100, nullable: true, transformer: new PasswordTransformer(new BcryptHashService()) })
    @Exclude({ toPlainOnly: true })
    password: string;
}
