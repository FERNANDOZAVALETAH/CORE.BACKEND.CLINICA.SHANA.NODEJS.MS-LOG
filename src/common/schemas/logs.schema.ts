import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { SCHEMAS } from '../../const/schema.name.const';

export type LogsDocument = Logs & mongoose.Document;

@Schema({ collection: SCHEMAS.LOGS, autoIndex: true })
export class Logs {

  @Prop({ required: true })
  type: string;

  @Prop({
    type: mongoose.Types.ObjectId,
  })
  idConsulting: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Types.ObjectId,
  })
  idUser: mongoose.Types.ObjectId;

  @Prop({ })
  consultingNumber: string

  @Prop({ })
  createdUser: string

  @Prop({ required: true })
  status: number;

  @Prop({ required: true, default: mongoose.now() })
  createdAt: Date;

  @Prop({ required: true, default: mongoose.now() })
  updatedAt: Date;
}

export const LogsSchema = SchemaFactory.createForClass(Logs);
