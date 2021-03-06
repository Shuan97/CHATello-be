import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '../../core/guards/jwtAuth.guard';
import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { UsersModule } from './../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        // secret: configService.get('JWT_SECRET'),
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: 604800, // TODO
          // expiresIn: configService.get('JWT_EXPIRATION_TIME'),
        },
      }),
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    /**
     * Enable authentication globally
     *
     * Learn more - [NestJS/auth](https://docs.nestjs.com/security/authentication#enable-authentication-globally)
     */
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
