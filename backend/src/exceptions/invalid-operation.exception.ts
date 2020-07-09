import { BadRequestException } from '@nestjs/common';

export class InvalidOperationException extends Error {
    readonly name: string = 'InvalidOperationException';

    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, InvalidOperationException.prototype);
    }

    toBadRequest() {
        const badReq = new BadRequestException(this.message);
        badReq.stack = this.stack;
        return badReq;
    }
}
