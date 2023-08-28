import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediaModule } from './media/media.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './post/post.module';
import { PublicationModule } from './publication/publication.module';

@Module({
  imports: [MediaModule, PrismaModule, PostModule, PublicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
