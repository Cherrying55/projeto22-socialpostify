import { IsNotEmpty, IsString, IsStrongPassword, IsUrl } from "class-validator";

export class PostMediaDTO {

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  username: string;
}