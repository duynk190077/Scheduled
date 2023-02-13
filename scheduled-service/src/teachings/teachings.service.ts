import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';
import { CreateTeachingDto } from './dto/create-teaching.dto';
import { UpdateTeachingDto } from './dto/update-teaching.dto';
import { Teaching } from './entities/teaching.entity';

@Injectable()
export class TeachingsService extends BaseService<
  Teaching,
  CreateTeachingDto,
  UpdateTeachingDto
> {
  constructor(
    @InjectModel('Teaching')
    private readonly teachingModel: Model<Teaching & Document>,
  ) {
    super(teachingModel);
  }
}
