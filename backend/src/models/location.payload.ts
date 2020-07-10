import { IsOptional, IsNotEmpty, IsNumber } from "class-validator";

export class LocationPayload {
    @IsOptional()
    id?: number;

    @IsNotEmpty()
    @IsNumber()
    latitude: number;

    @IsNotEmpty()
    @IsNumber()
    longitude: number;
}
