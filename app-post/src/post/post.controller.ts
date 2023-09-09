import { Controller, Get, Post, Body, Patch, Param, Delete,Req, ForbiddenException, UseGuards, ParseIntPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from './entities/post.entity';
import { Action, CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
@UseGuards(AuthGuard)
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private caslFactory:CaslAbilityFactory,) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req:Request) {
    const user = req['user'];
    console.log(user);
    createPostDto.userID = user.userId;
    return this.postService.create(createPostDto);
  }

  @Get()
  async findAll( @Req() req:Request) {
    const user = req['user'];
    if(!user.isAdmin)
    {
      throw new ForbiddenException();
    }
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id',ParseIntPipe) id: Number, @Req() req:Request) {
    const user = req['user'];
    const postfind = new Posts();
    const postData = await this.postService.findOne(id);
    //console.log(user);
    postfind.userID = postData.userID;
    const ability = this.caslFactory.createForUser(user);
    const isAllowed = ability.can(Action.Read,postfind);
    if(!isAllowed)
    {
      throw new ForbiddenException();
    }
    return this.postService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: Number, @Body() updatePostDto: UpdatePostDto, @Req() req:Request) {
    const user = req['user'];
    const postfind = new Posts();
    const postData = await this.postService.findOne(id);
    postfind.userID = postData.userID;
    const ability = this.caslFactory.createForUser(user);
    const isAllowed = ability.can(Action.Read,postfind);
    if(!isAllowed)
    {
      throw new ForbiddenException();
    }
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id',  ParseIntPipe) id: Number,@Req() req:Request) {
    const user = req['user'];
    const postfind = new Posts();
    const postData = await this.postService.findOne(id);
    postfind.userID = postData.userID;
    const ability = this.caslFactory.createForUser(user);
    const isAllowed = ability.can(Action.Read,postfind);
    if(!isAllowed)
    {
      throw new ForbiddenException();
    }
    return this.postService.remove(id);
  }
}
