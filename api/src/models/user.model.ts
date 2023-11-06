import mongoose from 'mongoose';
import { ROLE } from '../constants/role';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 150,
    },
    roles: { type: [String], required: true, default: [ROLE.USER] },
    name: { type: String, maxlength: 160 },
    password: { type: String, required: true, minlength: 8, maxlength: 160 },
    date_of_birth: { type: Date, maxlength: 160 },
    address: { type: String, maxlength: 160 },
    phone: { type: String, minlength: 8, maxlength: 20 },
    avatar: { type: String, maxlength: 1000 },
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model('users', UserSchema);
