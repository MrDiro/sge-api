import { CanActivate, ExecutionContext, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

ConfigModule.forRoot();

@Injectable()
export class AuthGuard implements CanActivate {

  constructor (
    private jwtService: JwtService
  ) {}

  public canActivate(context: ExecutionContext): boolean {

    const request = (context.switchToHttp().getRequest() as Request);
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (type === 'Bearer' && token.length > 0) {
      try {
        const payload = this.jwtService.verify(token, { secret: process.env.SECRET });
        request["user"] = payload;
      } catch (err) {
        throw new ForbiddenException(err?.message);
      }
    } else {
      throw new UnauthorizedException();
    }

    return true;
  }
}