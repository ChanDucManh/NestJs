import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schemas';

@Injectable()
export class PostService {

  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}
  
  async create(createPostDto: CreatePostDto):Promise<Post> {

    const createdPost = new this.postModel(createPostDto);
    return createdPost.save() ;
  }

  async findAll():Promise<Post[]> {
    try{
      const posts = await this.postModel.find();
      return posts;
    } catch (error){
      throw new Error("Could not fetch posts");
    }
  }

  async findOne(id: Number):Promise<Post | null> {
    try {
      const post = await this.postModel.findOne({id:id});
      if (!post) {
        throw new NotFoundException('Post not found');
      }
      return post;
    } catch (error) {
      throw new Error('Could not fetch post');
    }
  }

  async update(id: Number, updatePostDto: UpdatePostDto):Promise<Boolean> {
    try{
      const post = await this.postModel.updateOne({id:id},{$set:updatePostDto});
      return post.acknowledged;
    } catch (error){
      throw new Error("Could not update this post");
    }

  }

  async remove(id: Number):Promise<Boolean>{
    try{
      const post = await this.postModel.deleteOne({id:id});
      return post.acknowledged;
    } catch (error){
      throw new Error("Could not update this post");
    }
  }
}
