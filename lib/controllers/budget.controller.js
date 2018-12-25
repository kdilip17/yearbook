const Budget = require("../models/budget.model");

exports.addBuget = function(req,res,next){
  let payload = req.body;
  let budgetObj = new Budget({
    totalBudget : payload.totalBudget,
    createdBy   : payload.createdBy,
    updatedBy   : payload.createdBy
  });
  budgetObj.save(function(err,budgetRes){
    if(err){
      if (err.name === 'MongoError' && err.code === 11000) {
        // Duplicate username
        return res.status(500).send({ success: false, message: 'budget already exist!' });
      }
      return next(err)
    }else{
      res.send(budgetRes)
    }
  })
};

exports.editBuget = function(req,res,next){
  let payload = req.body;
  let budgetObj = new Budget({
    totalBudget : payload.totalBudget,
    createdBy   : payload.createdBy,
    updatedBy   : payload.createdBy
  });
  budgetObj.save(function(err,budgetRes){
    if(err){
      if (err.name === 'MongoError' && err.code === 11000) {
        // Duplicate username
        return res.status(500).send({ success: false, message: 'budget already exist!' });
      }
      return next(err)
    }else{
      res.send(budgetRes)
    }
  })
};