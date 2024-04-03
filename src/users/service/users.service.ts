import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserInsertDTO, UserSearchQuery, UserUpdateDTO } from '../dtos';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from 'src/users/schema/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private readonly userModel: Model<Users>) { }

    async insert(userInsertData: UserInsertDTO): Promise<Users> {
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

    async find(userSearchQuery: UserSearchQuery): Promise<Array<Users>> {
        return await this.userModel.find(userSearchQuery).exec();
    }


    async update(userUpdateData: UserUpdateDTO, id: string): Promise<Users> {
        try {
            return await this.userModel.findByIdAndUpdate(id, userUpdateData).exec();
        } catch (error) {
            throw new HttpException({ error }, HttpStatus.EXPECTATION_FAILED);
        }
    }

    async findAll(): Promise<Users[]> {
        return await this.userModel.find();
    }

    async remove(id: string): Promise<Users> {
        try {
            return await this.userModel.findByIdAndDelete(id).exec();
        } catch (error) {
            throw new HttpException({ error }, HttpStatus.EXPECTATION_FAILED);
        }
    }

    // exclusively used in authService
    async findOneByEmail(email: string) {
        return await this.userModel.findOne({ email }).select(['id', 'password']);
    }

    // exclusively used in authService
    async updateToken(id: string, token: string): Promise<void> {
        try {
            await this.userModel.findByIdAndUpdate(id, { token }).exec();
        } catch (error) {
            throw new HttpException({ error }, HttpStatus.EXPECTATION_FAILED);
        }
    }

}
