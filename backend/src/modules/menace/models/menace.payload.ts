import { IsNotEmpty, MaxLength, IsNumber, IsOptional } from "class-validator";
import { LocationPayload } from "../../../models/location.payload";

export class MenacePayload {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsNotEmpty()
    @IsNumber()
    menaceRankId: number;

    @IsOptional()
    dateRegister?: Date;

    @IsNotEmpty()
    location: LocationPayload;
}
