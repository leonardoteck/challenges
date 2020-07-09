import {
    IsEmail, MaxLength, IsNotEmpty, MinLength,
} from 'class-validator';

export class AuthPayload {
    @IsEmail()
    @MaxLength(254)
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(100)
    password: string;
}
