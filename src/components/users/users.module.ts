import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersEntity } from "./entity/users.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  imports: [SequelizeModule.forFeature([UsersEntity], "sge_prev")],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}