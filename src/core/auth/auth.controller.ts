import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserAuth } from "./dto/userAuth.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { createHmac } from 'node:crypto';
import { JwtService } from "@nestjs/jwt";

@ApiTags("authentication")
@Controller("auth")
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  public async getAuthentication(@Body() body: UserAuth): Promise<object> {

    const response = await this.authService.authentication(body);
    const password_hash = createHmac('sha256', process.env.SECRET).update(body.password).digest('hex');

    if (response === null) {
      throw new UnauthorizedException("Username Invalid");
    }

    if (password_hash !== response.userPass) {
      throw new UnauthorizedException("Password Invalid");
    }

    const access_token = this.jwtService.sign({ sub: response.userId, name: response.userName });

    return { access_token };
  }
}