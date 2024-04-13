import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from 'src/auth/dtos';
import * as costumBcrypt from '../../bcrypt/utils'
import { UsersService } from 'src/users/service/users.service';
import { Payload } from '../types';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    // validate the user via users login data,
    // update the user's token,
    // return the token
    async validateUser(loginBody: LoginDTO): Promise<any> {
        try {
            const { email, password } = loginBody;

            const user = await this.usersService.findOneByEmail(email);
            if (!user)
                throw new ForbiddenException(`credentials incorrect`);

            const { id } = user;

            const is_password_match: boolean = await costumBcrypt.compare(password, user.password);
            if (!is_password_match)
                throw new BadRequestException(`password does not match`);

            const token: string = await this.createToken(id);
            await this.usersService.updateToken(id, token);

            return {
                access_token: token
            };
        } catch (error) {
            throw new HttpException({ error }, HttpStatus.EXPECTATION_FAILED);
        }
    }

    // get the user id, reutrns the created token
    async createToken(id: string): Promise<string> {
        const payload: Payload = { sub: id };
        return await this.jwtService.signAsync(payload);
    }
}