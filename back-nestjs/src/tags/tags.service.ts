import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from './interfaces/tag.interface';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(@InjectModel('Tag') private readonly tagModel: Model<Tag>) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const createdTag = new this.tagModel({
      _id: createTagDto.name,
      ...createTagDto,
    });
    return createdTag.save();
  }
  async findAll(): Promise<Tag[]> {
    return this.tagModel
      .find()
      .lean()
      .exec();
  }
  async checkIfTagsExist(tagNames: string[]): Promise<void> {
    const tags = await this.tagModel
      .where('tag')
      .in(tagNames)
      .find()
      .exec();
    if (tags.length !== tagNames.length) {
      const dbTagNames = tags.map(tag => tag._id);
      const missingTags = [];
      tagNames.forEach(tagName => {
        if (!dbTagNames.includes(tagName)) {
          missingTags.push(tagName);
        }
      });
      throw new Error('Missing tags in db : ' + missingTags.join(','));
    }
  }
}
