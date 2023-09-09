import { IsString, IsInt } from 'class-validator';

export class CreateUserDto {

    @IsInt()
    userId:Number;

    @IsString()
    username: string;

    @IsString()
    password: string;

    
    isAdmin: Boolean;
}
