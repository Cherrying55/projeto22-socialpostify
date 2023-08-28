import { Controller, Get, Body, Post, Param, Put, Delete } from '@nestjs/common';
import { MediaService } from './media.service';
import { PostMediaDTO } from './PostMediaDTO';

@Controller('medias')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  getAllMedias(){
    return this.mediaService.getAllMedias()
  }

  @Post()
  postMedia(@Body() body: PostMediaDTO){
    return this.mediaService.createMedia(body)
  }

  @Get(':id')
  getMediaById(@Param('id') id: string){
    return this.mediaService.getMediaById(Number(id));
  }

  @Put(':id')
  updateMedia(@Param('id') id: string, @Body() body : PostMediaDTO){
    return this.mediaService.updateMedia(Number(id), body.title, body.username);
  }

  @Delete(':id')
  DeleteMedia(@Param('id') id: string){
    return this.mediaService.deleteMedia(Number(id));
  }
}
