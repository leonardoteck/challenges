import { Injectable, Optional } from '@nestjs/common';
import { compareSync, genSaltSync, hashSync as genHashSync } from 'bcryptjs';

@Injectable()
export class BcryptHashService {
    // Recommended number of rounds for production grade
    // software is equals or greater than 12.
    constructor(@Optional() private readonly rounds = 12) { }

    private generateSalt(): string {
        return genSaltSync(this.rounds);
    }

    hash(password: string): string {
        const salt = this.generateSalt();
        return genHashSync(password, salt);
    }

    verify(password: string, encryptedPassword: string): boolean {
        return compareSync(password, encryptedPassword);
    }
}
