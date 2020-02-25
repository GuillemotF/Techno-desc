import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Techno } from './interfaces/techno.interface';
import { CreateTechnoDto } from './dto/create-techno.dto';

@Injectable()
export class TechnosService {
  constructor(
    @InjectModel('Techno') private readonly technoModel: Model<Techno>,
  ) {}

  async create(createTechnoDto: CreateTechnoDto): Promise<Techno> {
    const createdTechno = new this.technoModel({
      _id: createTechnoDto.id,
      ...createTechnoDto,
    });
    return createdTechno.save();
  }

  async findAll(): Promise<Techno[]> {
    return this.technoModel.find().exec();
  }
  async findByType(type: string): Promise<Techno[]> {
    return this.technoModel
      .where('type', type)
      .find()
      .exec();
  }
}
