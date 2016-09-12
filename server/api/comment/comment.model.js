'use strict';

import mongoose from 'mongoose';

var CommentSchema = new mongoose.Schema({
  email: String,
  message: String,
  created: { type: Date, default: Date.now }
});

export default mongoose.model('Comment', CommentSchema);
