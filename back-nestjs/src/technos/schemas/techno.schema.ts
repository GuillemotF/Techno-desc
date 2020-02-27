import * as mongoose from 'mongoose';
import { UpdateTechnoDto } from '../dto/update-techno.dto';

const TechnoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  imgUrl: { type: String, required: true },
  desc: { type: String, required: true },
  tags: { type: [String], required: true, default: [] },
});
TechnoSchema.static({
  async findWithFilters(filters: { [key: string]: any }) {
    return this.find(filters);
  },
  async updateById(id: string, techno: UpdateTechnoDto) {
    const result = await this.findByIdAndUpdate(id, techno, {
      new: true,
    });
    return result;
  },
});

export { TechnoSchema };
