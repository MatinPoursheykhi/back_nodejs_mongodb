import { Module } from '@nestjs/common';
import { VehicleController } from './controller/vehicle.controller';
import { VehicleService } from './service/vehicle.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle, VehicleSchema } from './schema/vehicle.schema';
import { UsersService } from 'src/users/service/users.service';
import { UsersModule } from 'src/users/users.module';
import { Users, UsersSchema } from 'src/users/schema/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Vehicle.name,
        schema: VehicleSchema,
      },
      {
        name: Users.name,
        schema: UsersSchema,
      },
    ])],
  controllers: [VehicleController],
  providers: [VehicleService, UsersService],
})
export class VehicleModule { }
