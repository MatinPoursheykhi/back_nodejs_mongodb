import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt'
import { Vehicle } from "src/vehicle/schema/vehicle.schema";
import mongoose from "mongoose";
import { Role } from "../constants";

// just the structure
@Schema({ timestamps: true })
export class Users {

    // FIELDS
    @Prop({ unique: true, required: true, index: true, minlength: 5, maxlength: 20 })
    userName: string;

    @Prop({ unique: true, required: true, index: true })
    email: string;

    @Prop({ unique: true, required: true, index: true })
    phone: string;

    @Prop({ select: false, minlength: 8 })
    password: string;

    @Prop()
    avatarUrl?: string;

    @Prop()
    bio?: string;

    @Prop({ type: String, enum: Role, default: Role.USER })
    role: string;

    // relation for one to many
    // user can have many vehicles
    // this property is ganna be an array of IDs from vehicle model
    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }]
    })
    vehicles?: Vehicle[];

    @Prop({ select: false })
    token?: string; // the (?) shows that, this prop is optional
}

// real schema
export const UsersSchema = SchemaFactory.createForClass(Users);

// HOOKS

// a hook which will be executed before user insertion
UsersSchema.pre("save", async function () {
    const salt: string = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
});

// a hook which will be executed before findOneAndUpdate
UsersSchema.pre("findOneAndUpdate", async function () {
    // this.getFilter() => gets the id as the filter parameter
    // this.getUpdate() => gets the userUpdateData
    const user = this.getUpdate();

    const salt: string = await bcrypt.genSalt();
    const PASSWORD = user['password'];

    if (!!PASSWORD.trim())
        user['password'] = await bcrypt.hash(PASSWORD, salt);
});

