const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let categoryObjectId = mongoose.Schema.Types.ObjectId;
let budgetSchema = new Schema({
      category    : {
          categoryId : categoryObjectId,
          name       : {type: String,required:true}
      },
    //   month     : {
    //     type    : String, 
    //     required: true
    //   },
    //   type        : {
    //       type    : String, 
    //       required: true,
    //       enum    : ['DEBT','LEND']
    //   },
    //   paid : {
    //     type: Number,
    //     required: true
    //   },
    //   remaining : {
    //     type: Number,
    //     required: true
    //   },
    //   type        : {
    //     type    : String, 
    //     required: true,
    //     enum    : ['PAID','PPAID','PEN']
    //   },
      createdDate : {type:Date,default:Date.now},
      updatedDate : {type:Date,default:Date.now},
      createdBy   : {type: String},
      updatedBy   : {type: String}
})

module.exports = mongoose.model("Budget",budgetSchema);