import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UseFilters,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagsService } from './tags.service';
import { AuthGuard } from '@nestjs/passport';
import { MongoExceptionFilter } from 'src/utils/mongo-exception.filter';
import { TagDto } from './dto/tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  @UseFilters(MongoExceptionFilter)
  @UseInterceptors(ClassSerializerInterceptor)
  async getTags(): Promise<TagDto[]> {
    const tags = await this.tagsService.findAll();
    return tags.map(tag => new TagDto(tag));
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseFilters(MongoExceptionFilter)
  postItem(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }
}
