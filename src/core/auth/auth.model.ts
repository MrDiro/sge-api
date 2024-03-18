import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersEntity } from "src/components/users/entity/users.entity";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    SequelizeModule.forFeature([UsersEntity], "sge_prev"),
    JwtModule.register({ global: true, secret: process.env.SECRET, signOptions: { expiresIn: '60s' }})
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModel {}