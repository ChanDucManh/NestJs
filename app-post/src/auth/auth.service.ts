import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class AuthService {
    constructor(
      private usersService: UsersService,
      private jwtService: JwtService
      ) {}

    async signIn(userName: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(userName);
        if (user?.password !== pass) {
          throw new UnauthorizedException();
        }
        const {userId,username, isAdmin} = user;
        const payload =  { userId: user.userId, username: user.username,isAdmin:user.isAdmin};
        return {
          access_token: await this.jwtService.signAsync(payload),
        }
        
    }
}
