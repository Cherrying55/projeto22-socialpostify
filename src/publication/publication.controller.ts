import { Controller, Get, Body, Post, Param, Put, Delete } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationDTO } from './PublicationDTO';

@Controller('publications')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Get()
  getAllPublications(){
    return this.publicationService.getAllPublications()
  }

  @Post()
  postPublication(@Body() body: PublicationDTO){
    return this.publicationService.createpublication(body)
  }

  @Get(':id')
  getpublicationById(@Param('id') id: string){
    return this.publicationService.getPublicationById(Number(id));
  }

  @Put(':id')
  updatepublication(@Param('id') id: string, @Body() body : PublicationDTO){
    return this.publicationService.updatePublication(Number(id), Number(body.mediaId), body.postId, body.date);
  }

  @Delete(':id')
  deletepublication(@Param('id') id: string){
    return this.publicationService.deletepublication(Number(id));
  }
}
