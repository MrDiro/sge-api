import { BeforeCreate, Column, DataType, Table, Model } from "sequelize-typescript";
import { createHmac } from 'node:crypto';
import { ConfigModule } from "@nestjs/config";

ConfigModule.forRoot();

@Table({ tableName: "users" })
export class UsersEntity extends Model {
  @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true})
  userId:number;
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  userName:string;
  @Column({ type: DataType.STRING, allowNull: false })
  description:string;
  @Column({ type: DataType.TEXT, allowNull: false })
  userPass:string;
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isAdmin:boolean;
  @Column({ type: DataType.ENUM, values: ['active', 'pending', 'deleted'], defaultValue: 'active' })
  status:string;

  @BeforeCreate
  static passwordEncrypt(instance: UsersEntity) {
    
    const secret = process.env.SECRET;
    const hash = createHmac('sha256', secret).update(instance.userPass).digest('hex');
    instance.userPass = hash;
  }
}