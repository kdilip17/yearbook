const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categorySchema = new Schema({
      name        : {type: String,required:true,max:255},
      isUsed      : {type: Boolean,required:true,default:false},
      createdDate : {type:Date,default:Date.now},
      updatedDate : {type:Date,default:Date.now},
      createdBy   : {type: String,required:true},
      updatedBy   : {type: String,required:true}
})

module.exports = mongoose.model("Category",categorySchema);
