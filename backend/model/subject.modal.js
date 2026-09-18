import mongoose from 'mongoose';

const paperSchema = new mongoose.Schema({
    year : {
      type : Number,
      required : true
    },
    name : {
      type : String,
      required : true,
      trim : true
    },
    text : {
      type : String,
      required : true
    },
    pages : {
      type : Number,
      required : true
    },
},{timestamps : true});

const subjectSchema = new mongoose.Schema({
  subject : {
    type : String,
    required : true,
    trim : true
  },
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Users',
    required : true
  },
  papers  : [paperSchema]
}, {timestamps : true});

const Subject = mongoose.model("Subjects", subjectSchema);

export default Subject;