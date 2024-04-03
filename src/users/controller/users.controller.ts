import { Controller } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UserInsertDTO, UserSearchQuery, UserUpdateDTO } from '../dtos';
import { Body, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from 'src/auth/guard/auth.guard';

// @UseGuards(AuthGuard) // handle the authorization of all the controllers
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('signup')
    async singUp(@Body() userInsertData: UserInsertDTO) {
        console.log(userInsertData);
        return await this.usersService.insert(userInsertData)
    }

    @Get('constants')
    async userConstants(){
        return await this.usersService.usersConstants();
    }

    @UseGuards(AuthGuard) // handle the authorization of just this controller
    @Get('find')
    async find(@Query() userSearchQuery: UserSearchQuery) {
        return await this.usersService.find(userSearchQuery)
    }
    
    @UseGuards(AuthGuard)
    @Get('all-users')
    async findAll() {
        return await this.usersService.findAll()
    }

    @UseGuards(AuthGuard)
    @Put('update/:id')
    async update(@Body() userUpdateData: UserUpdateDTO, @Param('id') id: string) {
        return await this.usersService.update(userUpdateData, id)
    }

    @UseGuards(AuthGuard)
    @Delete('delete/:id')
    async remove(@Param('id') id: string) {
        return await this.usersService.remove(id)
    }

}