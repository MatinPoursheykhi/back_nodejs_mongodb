import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Occupation, Role, Skills } from "../constants";

export class UserInsertDTO {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsString()
    @IsNotEmpty()
    @IsMobilePhone('fa-IR')
    phone: string
    @IsString()
    @IsNotEmpty()
    userName: string;
    @IsString()
    @IsNotEmpty()
    password: string;
    @IsString()
    @IsNotEmpty()
    @IsEnum(Occupation)
    occupation: string;
    @IsString()
    @IsNotEmpty()
    @IsEnum(Role)
    role: string;
    @IsNotEmpty()
    skills: string[];
};

// PartialType would help to use the properties of extended class as optional  
export class UserUpdateDTO extends PartialType(UserInsertDTO) { }

export class UserSearchQuery {
    @IsOptional()
    id: string;
    @IsOptional()
    userName: string;
    @IsOptional()
    email: string;
    @IsOptional()
    phone: string;
    @IsOptional()
    occupation: string;
    @IsOptional()
    role: string;
    @IsOptional()
    skills: string;
}
