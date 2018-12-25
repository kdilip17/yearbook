const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const utils = require("../utils/util");

let categoryObjectId = mongoose.Schema.Types.ObjectId;

let budgetItemSchema = new Schema({
      category    : {
          categoryId : categoryObjectId,
          name       : {
            type: String,
            required:true
          }
      },
      month     : {
        type    : String, 
        required: true,
        default : utils.getMonthYear()
      },
      type        : {
          type    : String, 
          required: true,
          enum    : ['DEBT','LEND']
      },
      amount : {
        type: Number,
        required: true,
        default : 0
      },
      paid : {
        type: Number,
        required: true,
        default : 0
      },
      remaining : {
        type: Number,
        required: true,
        default : 0
      },
      status    : {
        type    : String, 
        required: true,
        default : 'PEN',
        enum    : ['PAID','PPAID','PEN']
      },
      createdDate : {type:Date,default:Date.now},
      updatedDate : {type:Date,default:Date.now},
      createdBy   : {type: String},
      updatedBy   : {type: String}
})

module.exports = mongoose.model("BudgetItems",budgetItemSchema);