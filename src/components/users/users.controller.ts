import { Body, Controller, Get, InternalServerErrorException, NotFoundException, Post, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UsersEntity } from "./entity/users.entity";
import { CreateUser } from "./dto/createUser.entity";
import { AuthGuard } from "src/core/security/auth.guard";

@ApiBearerAuth()
@ApiTags("users")
@UseGuards(AuthGuard)
@Controller("users")
export class UsersController {

  constructor(private userService: UsersService) {}

  // Retorna un arreglo de usuarios
  @Get("getAllUser")
  public async getAllUser(): Promise<UsersEntity[]> {

    const response = await this.userService.getAllUser();
    return response;
  }

  // Retorna un usuario
  @Get("getUser")
  public async getUser(@Query("id") id:number): Promise<UsersEntity> {

    const response = await this.userService.getOneUser(id);

    if (response === null) {
      throw new NotFoundException("User not found");
    }
    
    return response;
  }

  // Crea un usuario
  @Post("createUser")
  public async createUser(@Body() createUser: CreateUser): Promise<UsersEntity> {

    const response = await this.userService.createUser(createUser);
    return response;
  }
}