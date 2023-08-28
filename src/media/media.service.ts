import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PublicationRepository } from 'src/publication/publication.repository';
import { MediaRepository } from './media.repository';
import { PostMediaDTO } from './PostMediaDTO';

@Injectable()
export class MediaService {

    constructor(private readonly mediaRepository: MediaRepository, private readonly publicationRepository: PublicationRepository) {}

    async createMedia(data: PostMediaDTO){
        const medias = await this.mediaRepository.getAllMedias()
        for(const i of medias){
          if(i.title === data.title && i.username === data.username){
            throw new HttpException('Media with that combination of title and username already exists', HttpStatus.CONFLICT);
          }
        }
        const created = await this.mediaRepository.postMedia(data)
        return created;
    }

    async getAllMedias(){
      const medias = await this.mediaRepository.getAllMedias();
      return medias;
    }

    async getMediaById(id: number){
      const media = await this.mediaRepository.getMediaById(id);
      if (!media) throw new HttpException('Media not found', HttpStatus.NOT_FOUND);
      return media;
      
    }

    async updateMedia(id: number, title: string, username: string){
      const medias = await this.mediaRepository.getAllMedias();
      let hasid = false;
      for(const i of medias){
        if(i.id === id){
          hasid = true;
        }
      }
      if(!hasid){
        throw new HttpException("", HttpStatus.NOT_FOUND)
      }
        for(const i of medias){
          if(i.title === title && i.username === username){
            throw new HttpException('Media with that combination of title and username already exists', HttpStatus.CONFLICT);
          }
        }
      const updated = await this.mediaRepository.updateMedia(id, title, username);
      return updated;
    }

    async deleteMedia(id: number){
      const media = await this.mediaRepository.getMediaById(id);
      if (!media) throw new HttpException('Media not found', HttpStatus.NOT_FOUND);
      const publication = await this.publicationRepository.getByMediaId(id);
      if(publication){
        throw new HttpException("Forbbiden", HttpStatus.FORBIDDEN)
      }
      const deleted = await this.mediaRepository.deleteMedia(id);
      return deleted;
    }
}

