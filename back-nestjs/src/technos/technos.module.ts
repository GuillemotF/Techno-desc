import { Module, HttpModule } from '@nestjs/common';
import { TechnosController } from './technos.controller';
import { TechnosService } from './technos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TechnoSchema } from './schemas/techno.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'Techno', schema: TechnoSchema }]),
  ],
  controllers: [TechnosController],
  providers: [TechnosService],
  exports: [TechnosService],
})
export class TechnosModule {}
