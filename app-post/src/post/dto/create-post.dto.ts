import { IsString, IsInt } from 'class-validator';

export class CreatePostDto {

    @IsInt()
    userID : Number;

    @IsInt()
    id : Number;

    @IsString()
    title: string;

    @IsString()
    content : string;
}
