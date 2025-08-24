import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmailDocument = Email & Document;

@Schema()
export class ReceivingHop {
  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop()
  delay: string;

  @Prop()
  protocol: string;

  @Prop()
  time: string;
}

@Schema()
export class Email {
  @Prop({ required: true })
  rawHeaders: string;

  @Prop({ type: [ReceivingHop], default: [] })
  receivingChain: ReceivingHop[];

  @Prop()
  espType: string;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
