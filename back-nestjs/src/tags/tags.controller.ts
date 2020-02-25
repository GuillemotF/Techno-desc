import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagsService } from './tags.service';
import { AuthGuard } from '@nestjs/passport';
import { MongoExceptionFilter } from 'src/utils/mongo-exception.filter';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  @UseFilters(MongoExceptionFilter)
  getTags() {
    return this.tagsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseFilters(MongoExceptionFilter)
  postItem(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }
}
