import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './shared/jwt.strategy';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './shared/local.strategy';
import { UserService } from './../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './shared/auth.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
