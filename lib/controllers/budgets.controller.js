const Budget = require("../models/budgets.model");

exports.addBuget = function(req,res,next){
//   let payload = req.body;
  console.log(req.body.category);
//   let budgetObj = new Budget({
//     type : payload.type,
//     createdBy : payload.createdBy,
//     updatedBy : payload.createdBy
//   });
//   budgetObj.save(function(err,budgetRes){
//     if(err){
//       if (err.name === 'MongoError' && err.code === 11000) {
//         // Duplicate username
//         return res.status(500).send({ success: false, message: 'budgetObj already exist!' });
//       }
//       return next(err)
//     }else{
//       res.send(budgetRes)
//     }
//   })
};
