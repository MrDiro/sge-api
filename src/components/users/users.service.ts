import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectConnection } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { CreateUser } from "./dto/createUser.entity";
import { UsersEntity } from "./entity/users.entity";

@Injectable()
export class UsersService {

  constructor (@InjectConnection("sge_prev") private sequelize: Sequelize) {}

  public async createUser(user: CreateUser): Promise<UsersEntity> {

    const transaction = await this.sequelize.transaction();

    try {
      const result = await UsersEntity.create({ ...user }, { transaction });
      await transaction.commit();
      return result;
    } catch (err) {
      transaction.rollback();
      console.error(err?.message);
      throw new InternalServerErrorException(err?.message);
    }
  }

  public async getAllUser(): Promise<UsersEntity[]> {

    const transaction = await this.sequelize.transaction();

    try {
      const result = await UsersEntity.findAll({ transaction });
      await transaction.commit();
      return result;
    } catch (err) {
      transaction.rollback();
      console.error(err?.message);
      throw new InternalServerErrorException(err?.message);
    }
  }

  public async getOneUser(userId:number): Promise<UsersEntity|null|undefined> {

    const transaction = await this.sequelize.transaction();
    
    try {
      const result = await UsersEntity.findOne({ where: { userId }, transaction});
      await transaction.commit();
      return result;
    } catch (err) {
      transaction.rollback();
      console.error(err?.message);
      throw new InternalServerErrorException(err?.message);
    }
  }
}