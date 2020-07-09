import {
    IsEmail, IsNotEmpty, MaxLength,
} from 'class-validator';

export class UserPayload {
    @IsEmail()
    @MaxLength(254)
    @IsNotEmpty()
    email: string;

    @MaxLength(100)
    @IsNotEmpty()
    password: string;
}
