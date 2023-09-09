import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post, PostSchema } from './schemas/post.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports:[MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  CaslModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
