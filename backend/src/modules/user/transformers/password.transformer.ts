import { ValueTransformer } from 'typeorm';
import { BcryptHashService } from '../../auth/services/bcrypt-hash.service';

export class PasswordTransformer implements ValueTransformer {
    constructor(
        private readonly hasher: BcryptHashService,
    ) { }

    to(value) {
        return !value ? null : this.hasher.hash(value);
    }

    from(value) {
        return value;
    }
}
