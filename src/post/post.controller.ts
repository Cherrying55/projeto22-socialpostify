import { Controller, Get, Body, Post, Param, Put, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDTO } from './PostDTO';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAllPosts(){
    return this.postService.getAllPosts()
  }

  @Post()
  postpost(@Body() body: PostDTO){
    return this.postService.createPost(body)
  }

  @Get(':id')
  getpostById(@Param('id') id: string){
    return this.postService.getPostById(Number(id));
  }

  @Put(':id')
  updatepost(@Param('id') id: string, @Body() body : PostDTO){
    return this.postService.updatePost(Number(id), body.title, body.text, body.image);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string){
    return this.postService.deletePost(Number(id));
  }
}
