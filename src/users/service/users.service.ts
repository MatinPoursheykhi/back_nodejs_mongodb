import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserInsertDTO, UserSearchQuery, UserUpdateDTO } from '../dtos';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from 'src/schemas/users.schema';
import { Model } from 'mongoose';
import { Occupation, Role, Skills } from '../constants';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private readonly userModel: Model<Users>) { }

    async insert(userInsertData: UserInsertDTO) {
        try {
            const newUser = new this.userModel(userInsertData);
            await newUser.save();

            const { id } = newUser;
            // to exclude the password and token
            const createdUser = await this.userModel.findById(id);
            return createdUser;
        } catch (error) {
            throw new HttpException({ error }, HttpStatus.EXPECTATION_FAILED);
        }
    }

    // return searched users by any fields
    async find(userSearchQuery: UserSearchQuery) {
        return await this.userModel.find(userSearchQuery).exec();
    }

    // return usersConstants
    async usersConstants() {
        return {
            userRoles: Role,
            userOccupations: Occupation,
            userSkills: Skills,
        }
    }

    // reutrn previous user object
    async update(userUpdateData: UserUpdateDTO, id: string) {
        try {
            // await this.userModel.findByIdAndUpdate(id, userUpdateData).exec();
            // await this.userModel.findByIdAndUpdate(id, userUpdateData);
            // As far as functionality is concerned, these two are equivalent.
            // However,using .exec() is recommend because that gives you better stack traces.
            // Also .exec() can provide you more details and context information if error occurs.
            return await this.userModel.findByIdAndUpdate(id, userUpdateData).exec();
        } catch (error) {
            throw new HttpException({ error }, HttpStatus.EXPECTATION_FAILED);
        }
    }

    async findAll() {
        return await this.userModel.find();
    }

    async remove(id: string) {
        try {
            return await this.userModel.findByIdAndDelete(id).exec();
        } catch (error) {
            throw new HttpException({ error }, HttpStatus.EXPECTATION_FAILED);
        }
    }

    // get the email, return the user object
    // exclusively used in authService
    async findOneByEmail(email: string) {
        return await this.userModel.findOne({ email }).select(['id', 'password']);
    }

    // get the user id and token, return the affected rows
    // exclusively used in authService
    async updateToken(id: string, token: string) {
        try {
            await this.userModel.findByIdAndUpdate(id, { token }).exec();
        } catch (error) {
            throw new HttpException({ error }, HttpStatus.EXPECTATION_FAILED);
        }
    }

}
