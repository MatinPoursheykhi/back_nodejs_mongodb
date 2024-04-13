import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class InsertVehicleDTO {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    brand: string;
    @IsString()
    model: string;
    @IsString()
    weight: string;
    @IsString()
    @IsNotEmpty()
    userId: string;
}

export class UpdateVehicleDTO extends PartialType(InsertVehicleDTO) { };

export class VehicleSearchQueryDTO {
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    name: string;
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    brand: string;
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    model: string;
    @IsString()
    @IsOptional()
    weight: string;
}