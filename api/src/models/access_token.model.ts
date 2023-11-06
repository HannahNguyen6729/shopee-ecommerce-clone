import mongoose from 'mongoose';

const AccessTokenSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.SchemaTypes.ObjectId, ref: 'users' },
    token: { type: String, unique: true },
  },
  {
    timestamps: true,
  },
);

export const AccessTokenModel = mongoose.model(
  'access_tokens',
  AccessTokenSchema,
);
