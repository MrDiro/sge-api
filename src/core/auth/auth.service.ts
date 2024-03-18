import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectConnection } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { UserAuth } from "./dto/userAuth.dto";
import { UsersEntity } from "src/components/users/entity/users.entity";


@Injectable()
export class AuthService {

  constructor(@InjectConnection('sge_prev') private sequelize:Sequelize) {}

  public async authentication(data:UserAuth): Promise<UsersEntity|null|undefined> {

    const transaction = await this.sequelize.transaction();

    try {
      const result = await UsersEntity.findOne({
        where: { userName: data.username },
        transaction
      });

      await transaction.commit();
      return result;
    } catch (err) {
      transaction.rollback();
      console.error(err?.message);
      throw new InternalServerErrorException(err?.message);
    }
  }
}