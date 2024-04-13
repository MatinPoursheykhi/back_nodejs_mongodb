import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Vehicle {

    // FIELDS
    @Prop({ required: true })
    name: string;
    @Prop({ required: true, index: true })
    brand: string;
    @Prop({ required: true, unique: true })
    model: string;
    @Prop()
    weight: string;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);