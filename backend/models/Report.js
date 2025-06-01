const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  dataSources: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'DataSource',
      required: true,
    },
  ],
  visualizations: [
    {
      type: {
        type: String,
        required: true,
        enum: ['bar', 'line', 'pie', 'scatter', 'area', 'table'],
      },
      title: String,
      description: String,
      config: Object,
      data: Object,
    },
  ],
  narratives: [
    {
      title: String,
      content: String,
      insights: [String],
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Report', ReportSchema);