import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'users' })
export class User extends Document {
  
    @Prop({ required: true })
    userId: Number;

    @Prop({ required: true })
    username: string;
  
    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    isAdmin: Boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);