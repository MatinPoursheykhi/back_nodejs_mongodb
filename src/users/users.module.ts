import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/users/schema/users.schema';

@Module({
  imports: [MongooseModule.forFeature([{
    // use the name of the class (Users)
    // and also point to all of the properties of the class via (.name)
    name: Users.name, 
    schema: UsersSchema // the real schema
  }])],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule { }
