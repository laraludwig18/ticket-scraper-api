import { Document, Schema, Model, model } from 'mongoose';
import IUserDTO from '../../../dtos/IUserDTO';

export interface IUserModel extends IUserDTO, Document {}

const UserSchema = new Schema(
  {
    email: String,
    ticketId: String,
    accessToken: String,
  },
  {
    timestamps: true,
  },
);

const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);

export default User;
