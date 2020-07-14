import { Document, Schema, Model, model } from 'mongoose';
import IUser from '../interfaces/User';

export interface IUserModel extends IUser, Document {}

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
