import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDocument = Post & Document;

@Schema()
export class Post {
    @Prop() 
    userID : Number;
    @Prop()
    id : Number;
    @Prop()
    title: string;
    @Prop()
    content : string;
}

export const PostSchema = SchemaFactory.createForClass(Post)