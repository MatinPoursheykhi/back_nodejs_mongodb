import { Controller } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UserInsertDTO, UserSearchQuery, UserUpdateDTO } from '../dtos';
import { Body, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Users } from '../schema/users.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('signup')
    async singUp(@Body() userInsertData: UserInsertDTO): Promise<Users> {
        return await this.usersService.insert(userInsertData)
    }

    @UseGuards(AuthGuard) // handle the authorization of just this controller
    @Get('find')
    async find(@Query() userSearchQuery: UserSearchQuery): Promise<Array<Users>> {
        return await this.usersService.find(userSearchQuery)
    }

    @UseGuards(AuthGuard)
    @Get('all-users')
    async findAll(): Promise<Users[]> {
        return await this.usersService.findAll()
    }

    @UseGuards(AuthGuard)
    @Put('update/:id')
    async update(@Body() userUpdateData: UserUpdateDTO, @Param('id') id: string): Promise<Users> {
        return await this.usersService.update(userUpdateData, id)
    }

    @UseGuards(AuthGuard)
    @Delete('delete/:id')
    async remove(@Param('id') id: string): Promise<Users> {
        return await this.usersService.remove(id)
    }

}