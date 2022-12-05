import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { CommentService } from './Comment.Service';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('Comments')
export class CommentController {
  constructor(private readonly commentservice: CommentService) {}
  @Post()
  createComment(@Body() createcommentDto: CreateCommentDto) {
    this.commentservice.createComment(createcommentDto);
  }

  @Get()
  findAllPosts() {
    return this.commentservice.findAllComments();
  }
  @Get(':id')
  findOneComment(@Param('id') id: number) {
    return this.commentservice.findOneComment(id);
  }

  @Patch(':id')
  updateComment(
    @Param('id') id: number,
    @Body() updatecommentDto: UpdateCommentDto,
  ) {
    return this.commentservice.updateComment(id, updatecommentDto);
  }

  @Delete(':id')
  removeComment(@Param('id') id: number) {
    return this.commentservice.removeComment(id);
  }
}
