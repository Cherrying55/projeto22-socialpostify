import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { PublicationRepository } from './publication.repository';
import { MediaRepository } from 'src/media/media.repository';
import { PostRepository } from 'src/post/post.repository';

@Module({
  controllers: [PublicationController],
  providers: [PublicationService, PublicationRepository, MediaRepository, PostRepository],
})
export class PublicationModule {}
