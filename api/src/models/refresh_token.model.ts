import mongoose from 'mongoose';

const RefreshTokenSchema = new mongoose.Schema(
  {
    user_id: { type: String, ref: 'users' },
    token: { type: String, unique: true },
  },
  {
    timestamps: true,
  },
);

export const RefreshTokenModel = mongoose.model(
  'refresh_tokens',
  RefreshTokenSchema,
);
