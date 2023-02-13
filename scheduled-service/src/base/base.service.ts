import { Document, Model } from 'mongoose';
import { ResponseDto } from 'src/response/response';

export class BaseService<Entity, CreateDto, UpdateDto> {
  constructor(private entityModel: Model<Entity & Document>) {}

  async create(createDto: CreateDto): Promise<ResponseDto> {
    const entity = await this.entityModel.create(createDto);
    if (entity) {
      return new ResponseDto(0, 200, entity);
    }
  }

  async findAll(): Promise<ResponseDto> {
    const entities = await this.entityModel.find().sort([['updatedAt', -1]]);
    if (entities) {
      return new ResponseDto(0, 200, entities);
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    const entity = await this.entityModel.findOne({ id: id });
    if (entity) {
      return new ResponseDto(0, 200, entity);
    }
  }

  async update(id: number, updateDto: UpdateDto): Promise<ResponseDto> {
    const entity = await this.entityModel.findByIdAndUpdate(id, updateDto, {
      new: true,
    });
    if (entity) {
      return new ResponseDto(0, 200, entity);
    }
  }

  async remove(id: number): Promise<ResponseDto> {
    const entity = await this.entityModel.deleteOne({ id: id });
    if (entity) {
      return new ResponseDto(0, 200, entity);
    }
  }
}
