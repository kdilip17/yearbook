const Budget = require("../models/budget.model");

exports.addBuget = async function(req,res,next){
  try {
    let payload = req.body;
    let budgetObj = new Budget({
      amount      : payload.amount,
      createdBy   : payload.createdBy,
      updatedBy   : payload.createdBy
    });
    let budgetRes = await budgetObj.save();
    res.send(budgetRes);
  } catch (error) {
    res.status(500).send(error)
  }
};

exports.editBuget = async function(req,res,next){
  try {
    let payload          = req.body;
    payload.updatedBy    = payload.createdBy;
    payload.updatedDate  = new Date();
    let budgetRes = await Budget.findByIdAndUpdate(req.query.budgetId,payload,{new: true});
    if(budgetRes){
      res.send(budgetRes)
    }
  } catch (error) {
    res.status(500).send(error)
  }
};