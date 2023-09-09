import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ForbiddenException} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Action, CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { User } from './entities/user.entity';


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private caslFactory:CaslAbilityFactory,
    ){}

  
  @Post()
  create(@Request() req, @Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    const user = req['user'];
    //console.log(user);
    const ability = this.caslFactory.createForUser(user);
    const isAllowed = ability.can(Action.Read,User);
    if(!isAllowed)
    {
      throw new ForbiddenException();
    }
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {

    const userfind = new User();
    userfind.username = id;
    const user = req['user'];
    //console.log(user);
    const ability = this.caslFactory.createForUser(user);
    const isAllowed = ability.can(Action.Read,userfind);
      
    if(!isAllowed)
    {
      throw new ForbiddenException();
    }
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto,  @Request() req) {
    const userfind = new User();
    userfind.username = id;
    const user = req['user'];
    const ability = this.caslFactory.createForUser(user);
    const isAllowed = ability.can(Action.Update,userfind);
    if(!isAllowed)
    {
      throw new ForbiddenException();
    }
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string,  @Request() req) {
    const userfind = new User();
    userfind.username = id;
    const user = req['user'];
    const ability = this.caslFactory.createForUser(user);
    const isAllowed = ability.can(Action.Delete,userfind);
    if(!isAllowed)
    {
      throw new ForbiddenException();
    }
    return this.usersService.remove(id);
  }
}
