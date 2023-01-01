import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ String, required: true, unique: true })
  email: string;

  @Prop({ String, required: true })
  name: string;

  @Prop({ String, required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
