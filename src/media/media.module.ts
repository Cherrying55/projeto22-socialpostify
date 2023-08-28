import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MediaRepository } from './media.repository';
import { PublicationRepository } from 'src/publication/publication.repository';

@Module({
  controllers: [MediaController],
  providers: [MediaService, MediaRepository, PublicationRepository],
})
export class MediaModule {}
