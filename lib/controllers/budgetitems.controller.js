const BudgetItems = require("../models/budgetitems.model");

exports.addBugetItem = function(req,res,next){
  let payload = req.body;
  let budgetItemObjObj = new BudgetItems({
    category  : payload.category,
    amount    : payload.amount,
    type      : payload.type,
    createdBy : payload.createdBy,
    updatedBy : payload.createdBy
  });
  console.log(budgetItemObjObj)
  budgetItemObjObj.save(function(err,budgetRes){
    if(err){
      if (err.name === 'MongoError' && err.code === 11000) {
        // Duplicate username
        return res.status(500).send({ success: false, message: 'Budget item already exist!' });
      }
      return next(err)
    }else{
      res.send(budgetRes)
    }
  })
};
