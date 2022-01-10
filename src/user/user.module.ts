import { CacheModule, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AddressService } from 'src/services/address.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([User]),
    HttpModule,
  ],
  controllers: [UserController],
  providers: [UserService, AddressService],
  exports: [UserService, AddressService],
})
export class UserModule {}
