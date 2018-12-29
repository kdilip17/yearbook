const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const utils = require("../utils/util");

let budgetSchema = new Schema({
      month     : {
        type    : String, 
        required: true,
        default : utils.getMonthYear()
      },
      amount   : {
          type: Number,
          required: true,
          default : 0
      },
      totalIOwe : {
        type: Number,
        required: true,
        default : 0
      },
      totalOweMe : {
        type: Number,
        required: true,
        default : 0
      },
      remaining : {
        type: Number,
        required: true,
        default : 0
      },
      isUsed      : {type: Boolean,required:true,default:false},
      createdDate : {type:Date,default:Date.now},
      updatedDate : {type:Date,default:Date.now},
      createdBy   : {type: String},
      updatedBy   : {type: String}
})

module.exports = mongoose.model("Budget",budgetSchema);