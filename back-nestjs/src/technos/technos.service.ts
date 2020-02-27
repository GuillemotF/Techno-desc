import { Model } from 'mongoose';
import {
  Injectable,
  HttpService,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as FormData from 'form-data';
import { Techno } from './interfaces/techno.interface';
import { CreateTechnoDto } from './dto/create-techno.dto';
import { UpdateTechnoDto } from './dto/update-techno.dto';

@Injectable()
export class TechnosService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel('Techno') private readonly technoModel: Model<Techno>,
  ) {}

  async create(
    createTechnoDto: CreateTechnoDto,
    imgFile: Express.Multer.File,
  ): Promise<Techno> {
    const form = new FormData();
    form.append('image', imgFile.buffer, { filename: imgFile.originalname });
    const resp = await this.httpService
      .post(
        'https://api.imgbb.com/1/upload?key=' + process.env.IMGBB_KEY,
        form,
        {
          headers: form.getHeaders(),
        },
      )
      .toPromise()
      .catch(err => {
        console.error(err);
      });
    if (resp && resp.data && resp.data.data) {
      createTechnoDto.imgUrl = resp.data.data.url;
    } else {
      throw new InternalServerErrorException('img upload failed');
    }
    const createdTechno = new this.technoModel(createTechnoDto);
    return createdTechno.save();
  }

  async updateById(
    id: string,
    udpateTechnoDto: UpdateTechnoDto,
    imgFile: Express.Multer.File,
  ): Promise<Techno> {
    if (imgFile) {
      const form = new FormData();
      form.append('image', imgFile.buffer, { filename: imgFile.originalname });
      const resp = await this.httpService
        .post(
          'https://api.imgbb.com/1/upload?key=' + process.env.IMGBB_KEY,
          form,
          {
            headers: form.getHeaders(),
          },
        )
        .toPromise();
      if (resp && resp.data && resp.data.data) {
        udpateTechnoDto.imgUrl = resp.data.data.url;
      } else {
        throw new Error('img upload failed');
      }
    }
    await this.technoModel.updateOne({ _id: id }, udpateTechnoDto);
    return this.technoModel.findById(id);
  }

  async findAll(): Promise<Techno[]> {
    return this.technoModel.find().exec();
  }
  async findWithFilters({
    type,
    tags,
  }: {
    type: string;
    tags: string[];
  }): Promise<Techno[]> {
    let query = this.technoModel.find();
    if (type) {
      query = query.where('type', type);
    }
    if (tags.length > 0) {
      query = query.where('tags').in(tags);
    }
    return query.exec();
  }
}
