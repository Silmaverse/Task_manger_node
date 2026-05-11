const mongoose = require("mongoose");

const subtaskSchema=new mongoose.Schema({
   
   title:String,

   isCompleted:{
     type:Boolean,
     default:false
   }

})

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
  status:{
    type:String,
    enum:["Planning","Processing","Completed"],
    default:"Planning"

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
  },
  progress:{
    type:Number,
    default:0
  },
  subtasks:[subtaskSchema]

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
