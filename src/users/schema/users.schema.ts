import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Occupation, Role, Skills } from "src/users/constants";
import * as bcrypt from 'bcrypt'

// just the structure
@Schema({ timestamps: true })
export class Users {

    @Prop({ unique: true, required: true, index: true, minlength: 5, maxlength: 20 })
    userName: string;

    @Prop({ unique: true, required: true, index: true })
    email: string;

    @Prop({ unique: true, required: true, index: true })
    phone: string;

    @Prop({ select: false, minlength: 8 })
    password: string;

    @Prop({ type: [String], enum: Skills })
    skills: string[];

    @Prop()
    avatarUrl?: string;

    @Prop()
    bio?: string;

    @Prop({ type: String, enum: Occupation })
    occupation: string;

    @Prop({ type: String, enum: Role, default: Role.USER })
    role: string;

    @Prop({ select: false })
    token?: string; // the (?) shows that, this prop is optional
}

// real schema
export const UsersSchema = SchemaFactory.createForClass(Users);


// a hook which will be executed before user insertion
UsersSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
});

// a hook which will be executed before findOneAndUpdate
UsersSchema.pre("findOneAndUpdate", async function () {
    // this.getFilter() => gets the id as the filter parameter
    // this.getUpdate() => gets the userUpdateData
    const user = this.getUpdate();

    const salt = await bcrypt.genSalt();
    const PASSWORD = user['password'];

    if (!!PASSWORD)
        user['password'] = await bcrypt.hash(PASSWORD, salt);
});

