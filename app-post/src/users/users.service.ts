import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto):Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save() ;
  }

  async findAll():Promise<User[]> {
    try{
      const users = await this.userModel.find();
      return users;
    } catch (error){
      throw new Error("Could not fetch users");
    }
  }

  async findOne(userName: String):Promise<User|null> {
    try {
      const user = await this.userModel.findOne({username:userName});
      if (!user) {
        throw new NotFoundException('Post not found');
      }
      
      return user;
    } catch (error) {
      throw new Error('Could not fetch post');
    }
  }

  async update(userName: String, updateUserDto: UpdateUserDto) {
    try{
      const user = await this.userModel.updateOne({username:userName},{$set:updateUserDto});
      return user.acknowledged;
    } catch (error){
      throw new Error("Could not update this post");
    }
  }

  async remove(userName: String) {
    try{
      const post = await this.userModel.deleteOne({username:userName});
      return post.acknowledged;
    } catch (error){
      throw new Error("Could not update this post");
    }
  }
}
