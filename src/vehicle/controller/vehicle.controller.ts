import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { VehicleService } from '../service/vehicle.service';
import { Vehicle } from '../schema/vehicle.schema';
import { InsertVehicleDTO, UpdateVehicleDTO, VehicleSearchQueryDTO } from '../dtos/index.dto';
import { Users } from 'src/users/schema/users.schema';

@Controller('vehicle')
export class VehicleController {
    constructor(
        private readonly vehicleService: VehicleService,
    ) { }

    @Post('insert')
    async insert(@Body() vehicleInsertBody: InsertVehicleDTO): Promise<Vehicle> {
        return await this.vehicleService.insert(vehicleInsertBody);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() vehicleUpdateBody: UpdateVehicleDTO): Promise<Vehicle> {
        return await this.vehicleService.update(id, vehicleUpdateBody);
    }

    @Get()
    async findAll(): Promise<Vehicle[]> {
        return await this.vehicleService.findAll();
    }

    @Get('search-by-query')
    async find(@Query() vehicleSearchQuery: VehicleSearchQueryDTO): Promise<Vehicle[]> {
        return await this.vehicleService.find(vehicleSearchQuery);
    }

    @Get('search/:id')
    async findById(@Param('id') id: string): Promise<Vehicle> {
        return await this.vehicleService.findById(id);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Vehicle> {
        return await this.vehicleService.remove(id);
    }
}
