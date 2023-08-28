import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PublicationRepository } from 'src/publication/publication.repository';
import { PostRepository } from './post.repository';
import { PostDTO } from './PostDTO';

@Injectable()
export class PostService {

    constructor(private readonly postRepository: PostRepository, private readonly publicationRepository: PublicationRepository) {}

    async createPost(data: PostDTO){
        const created = await this.postRepository.postPost(data)
        return created;
    }

    async getAllPosts(){
      const posts = await this.postRepository.getAllPosts();
      return posts;
    }

    async getPostById(id: number){
      const post = await this.postRepository.getPostById(id);
      if (!post) throw new HttpException('Media not found', HttpStatus.NOT_FOUND);
      return post;
      
    }

    async updatePost(id: number, title: string, text: string, image: string){
      const post = await this.postRepository.getPostById(id);
      const updated = await this.postRepository.updatePost(id, title, text, image)
      return updated;
    }

    async deletePost(id: number){
      const post = await this.postRepository.getPostById(id);
      if (!post) throw new HttpException('Media not found', HttpStatus.NOT_FOUND);
      const publication = await this.publicationRepository.getByPostId(id);
      if(publication){
        throw new HttpException("Forbbiden", HttpStatus.FORBIDDEN)
      }
      const deleted = await this.postRepository.deletePost(id);
      return deleted;
    }
}
