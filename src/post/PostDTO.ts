import { IsNotEmpty, IsString, IsStrongPassword, IsUrl } from "class-validator";

export class PostDTO {

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  text: string;

  image: string;
}