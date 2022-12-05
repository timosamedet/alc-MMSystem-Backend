import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreatePostDto } from './dto/createpos.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { PostsService } from './Post.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postservice: PostsService) {}
  @Post()
  createpost(@Body() createpostDto: CreatePostDto) {
    return this.postservice.createPost(createpostDto);
  }

  @Get()
  findAllPosts() {
    return this.postservice.findAllPosts();
  }
  @Get(':id')
  findOnePostByID(@Param('id') id: number) {
    return this.postservice.findOnePost(id);
  }

  @Patch(':id')
  updatePost(@Param('id') id: number, @Body() updatepostDto: UpdatePostDto) {
    return this.postservice.updatePost(id, updatepostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postservice.remove(id);
  }
}
