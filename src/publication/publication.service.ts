import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PublicationRepository } from './publication.repository';
import { MediaRepository } from 'src/media/media.repository';
import { PostRepository } from 'src/post/post.repository';
import { PublicationDTO } from './PublicationDTO';
import * as dayjs from 'dayjs';

@Injectable()
export class PublicationService {

    constructor(private readonly publicationRepository: PublicationRepository, private readonly mediaRepository: MediaRepository, private readonly postRepository : PostRepository) {}

    async createpublication(data: PublicationDTO){
        const hasmedia = await this.mediaRepository.getMediaById(data.mediaId);
        const haspost = await this.postRepository.getPostById(data.postId);
        if(!hasmedia || !haspost){
            throw new HttpException("", HttpStatus.NOT_FOUND)
        }
        const created = await this.publicationRepository.postPublication(data)
        return created;
    }

    async getAllPublications(){
      const publications = await this.publicationRepository.getAllPublications();
      return publications;
    }

    async getPublicationById(id: number){
      const publication = await this.publicationRepository.getPublicationById(id);
      if (!publication) throw new HttpException('publication not found', HttpStatus.NOT_FOUND);
      return publication;
      
    }

    async updatePublication(id: number, mediaId: number, postId: number, date: Date){
      const publication = await this.publicationRepository.getPublicationById(id);
      const hasmedia = await this.mediaRepository.getMediaById(mediaId);
      const haspost = await this.postRepository.getPostById(postId);
      if (!hasmedia || !haspost || !publication) throw new HttpException('publication not found', HttpStatus.NOT_FOUND);
      //check for date
      const pubdate = dayjs(date);
      let to = dayjs(publication.date);
      if(pubdate.diff(to) <= 0){
        throw new HttpException('Forbbiden', HttpStatus.FORBIDDEN)
      }
      const updated = await this.publicationRepository.updatePublication(id, postId, mediaId, date);
      return updated;
    }

    async deletepublication(id: number){
      const publication = await this.publicationRepository.getPublicationById(id);
      if (!publication) throw new HttpException('publication not found', HttpStatus.NOT_FOUND);
      const deleted = await this.publicationRepository.deletePublication(id);
      return deleted;
    }
}