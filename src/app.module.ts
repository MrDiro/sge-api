import { Module } from '@nestjs/common';
import { UsersModule } from './components/users/users.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { rateConfig } from './core/security/rate.config';
import { APP_GUARD } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { connection } from './core/database/connection.config';
import { AuthModel } from './core/auth/auth.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot( { isGlobal: true }),
    ThrottlerModule.forRoot(rateConfig),
    SequelizeModule.forRoot({ dialect: 'postgres', ... connection.sge_prev }),
    SequelizeModule.forRoot({ dialect: 'postgres', ... connection.sge_log }),
    JwtModule.register({ global: true, secret: process.env.SECRET, signOptions: { expiresIn: '2h'} }),
    AuthModel,
    UsersModule
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard }
  ]
})
export class AppModule {}