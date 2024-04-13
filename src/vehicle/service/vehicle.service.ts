import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Vehicle } from '../schema/vehicle.schema';
import { Model } from 'mongoose';
import { InsertVehicleDTO, UpdateVehicleDTO, VehicleSearchQueryDTO } from '../dtos/index.dto';
import { UsersService } from 'src/users/service/users.service';
import { UserSearchQuery } from 'src/users/dtos/index.dto';
import { Users } from 'src/users/schema/users.schema';

@Injectable()
export class VehicleService {
    constructor(
        @InjectModel(Vehicle.name) private readonly vehicleModel: Model<Vehicle>,
        @InjectModel(Users.name) private readonly userModel: Model<Users>,
    ) { }

    // insert the vehicle and update the vehicles of user
    async insert({ userId, ...vehicleInsertBody }: InsertVehicleDTO): Promise<Vehicle> {
        try {
            // find user
            const user = await this.userModel.findById(userId).populate('vehicles');
            if (Object.values(user).length === 0)
                throw new HttpException({ message: 'user not found' }, HttpStatus.NOT_FOUND);

            // create vehicle
            const newVehicle = new this.vehicleModel(vehicleInsertBody);
            const savedVehicle = await newVehicle.save();

            // update user
            await user.updateOne({
                $push: {
                    vehicles: savedVehicle._id,
                }
            });

            return savedVehicle;
        } catch (error) {
            throw new HttpException({ error }, HttpStatus.EXPECTATION_FAILED);
        }
    }

    async update(id: string, vehicleUpdateBody: UpdateVehicleDTO): Promise<Vehicle> {
        try {
            await this.vehicleModel.findByIdAndUpdate(id, vehicleUpdateBody).exec();

            return await this.findById(id);
        } catch (error) {
            throw new HttpException({ error }, HttpStatus.EXPECTATION_FAILED);
        }
    }

    async findAll(): Promise<Vehicle[]> {
        return await this.vehicleModel.find();
    }

    async find(vehicleSearchQuery: VehicleSearchQueryDTO): Promise<Vehicle[]> {
        return await this.vehicleModel.find(vehicleSearchQuery).exec();
    }

    async findById(id: string): Promise<Vehicle> {
        return await this.vehicleModel.findById(id);
    }

    async remove(id: string): Promise<Vehicle> {
        try {
            return await this.vehicleModel.findByIdAndDelete(id).exec();
        } catch (error) {
            throw new HttpException({ error }, HttpStatus.EXPECTATION_FAILED);
        }
    }
}
