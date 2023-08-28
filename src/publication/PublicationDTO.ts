import { IsDate, IsNotEmpty, IsNumber, IsString, IsStrongPassword, IsUrl } from "class-validator";

export class PublicationDTO {

  @IsNumber()
  mediaId: number;

  @IsNumber()
  postId: number;

  @IsDate()
  date: Date;
}