import { IsNotEmpty, MaxLength, IsNumber, IsOptional } from "class-validator";
import { LocationPayload } from "../../../models/location.payload";

export class HeroPayload {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsNotEmpty()
    @IsNumber()
    heroRankId: number;

    @IsOptional()
    dateRegister?: Date;

    @IsNotEmpty()
    location: LocationPayload;
}
