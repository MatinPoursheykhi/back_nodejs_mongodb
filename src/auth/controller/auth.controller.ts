import { Controller, Post, UseGuards, Body, Get, Request } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDTO } from '../dtos';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginBody: LoginDTO): Promise<Object> {
        return await this.authService.validateUser(loginBody);
    }
}