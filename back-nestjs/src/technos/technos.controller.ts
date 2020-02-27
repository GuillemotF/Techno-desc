import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UseFilters,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
  UploadedFile,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateTechnoDto } from './dto/create-techno.dto';
import { TechnosService } from './technos.service';
import { AuthGuard } from '@nestjs/passport';
import { MongoExceptionFilter } from 'src/utils/mongo-exception.filter';
import { TechnoDto } from './dto/techno.dto';
import { GetTechnosQuery } from './validation/get-technos.validation';
import { UpdateTechnoDto } from './dto/update-techno.dto';

@Controller('technos')
export class TechnosController {
  constructor(private readonly technosService: TechnosService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getTechnos(@Query() getTechnosQuery: GetTechnosQuery) {
    const filters = {
      tags: JSON.parse(getTechnosQuery.tags),
      type: getTechnosQuery.type,
    };
    const technos = await this.technosService.findWithFilters(filters);
    return technos.map(techno => new TechnoDto(techno));
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(FileInterceptor('img'))
  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(MongoExceptionFilter)
  async createTechno(
    @Body() createTechnoDto: CreateTechnoDto,
    @UploadedFile() imgFile: Express.Multer.File,
  ) {
    if (!imgFile) {
      throw new BadRequestException('Missing img file\n');
    }
    const newTechno = await this.technosService.create(
      createTechnoDto,
      imgFile,
    );
    return new TechnoDto(newTechno);
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  @UseInterceptors(FileInterceptor('img'))
  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(MongoExceptionFilter)
  async updateTechno(
    @Body() updateTechnoDto: UpdateTechnoDto,
    @Param('id') id: string,
    @UploadedFile('img') imgFile: Express.Multer.File,
  ) {
    const updatedTechno = await this.technosService.updateById(
      id,
      updateTechnoDto,
      imgFile,
    );
    return new TechnoDto(updatedTechno);
  }
}
