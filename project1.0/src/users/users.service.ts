import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: number): Promise<User | null> {
    return this.userModel.findOne({ id }).exec();
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try{
      const user = await this.userModel.updateOne({username:id},{$set:updateUserDto});
      return user.acknowledged;
    } catch (error){
      throw new Error("Could not update this post");
    }
  }

  async remove(id: string) {
    try{
      const user = await this.userModel.deleteOne({username:id});
      return user.acknowledged;
    } catch (error){
      throw new Error("Could not update this post");
    }
  }
}
