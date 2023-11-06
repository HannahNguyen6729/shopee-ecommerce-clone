import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

export const CategoryModel = mongoose.model('categories', CategorySchema);
