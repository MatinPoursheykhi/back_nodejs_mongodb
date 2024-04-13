import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { VehicleModule } from './vehicle/vehicle.module';

const connectStr: string = `mongodb://localhost/project`;
// 'mongodb://username:password@localhost/test' -> if database needed auth

@Module({
  imports: [
    MongooseModule.forRoot(connectStr),

    // it makes a database which its name is (any), so we can use multy databases
    // MongooseModule.forRoot('mongodb://localhost/any'),

    // handle the limitation of requests
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000, // 1 sec
        limit: 3, // 3 req per 1 sec
      },
      {
        name: 'long',
        ttl: 60000, // 1 min
        limit: 100, // 100 req per 1 min
      },
    ]),
    UsersModule,
    AuthModule,
    VehicleModule,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    }
  ],
})
export class AppModule { }
