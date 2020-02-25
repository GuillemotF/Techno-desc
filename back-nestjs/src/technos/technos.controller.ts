import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  UseFilters,
  Query,
} from '@nestjs/common';
import { CreateTechnoDto } from './dto/create-techno.dto';
import { TechnosService } from './technos.service';
import { AuthGuard } from '@nestjs/passport';
import { MongoExceptionFilter } from 'src/utils/mongo-exception.filter';

@Controller('technos')
export class TechnosController {
  constructor(private readonly technosService: TechnosService) {}

  @Post()
  async create(@Body() createTechnoDto: CreateTechnoDto) {
    this.technosService.create(createTechnoDto);
  }

  @Get()
  getTechnos(@Query('type') type) {
    console.log('get technos');
    if (type) {
      console.log(type);
      return this.technosService.findByType(type);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('technos')
  @UseFilters(MongoExceptionFilter)
  postItem(@Body() createTechnoDto: CreateTechnoDto) {
    return this.technosService.create(createTechnoDto);
  }
}
