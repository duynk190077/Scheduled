import { Module } from '@nestjs/common';
import { TeachingsService } from './teachings.service';
import { TeachingsController } from './teachings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Teaching, TeachingSchema } from './entities/teaching.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Teaching.name, schema: TeachingSchema },
    ]),
  ],
  controllers: [TeachingsController],
  providers: [TeachingsService],
  exports: [TeachingsService],
})
export class TeachingsModule {}
