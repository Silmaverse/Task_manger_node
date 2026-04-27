const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  priority:{
     type:String,
     default:"medium",
     enum:["high","medium","low"]
  },
  assignedTo:[
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    }
  ],
  isComplete:{
    type:Boolean,
    default:false,
  }

});

const projectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  slug:{
     type:String,
     required:true,
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  members: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],
  tasks: [taskSchema],
});

module.exports = mongoose.model("project", projectSchema);
