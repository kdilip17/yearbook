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

exports.deleteBudget = async function(req, res, next){
  try {
    const budget = await Budget.findById(req.query.id);
    if(budget.isUsed){
      return res.status(500).send({ success: false, message: 'Budget already used!' });
    }else{
      let deleteBudget = await Budget.findByIdAndDelete(req.query.id);
      if(deleteBudget){
        return res.status(200).send({ success: false, message: 'Budget deleted successfully!' });
      }
    }
  } catch (err) {
    return next(err)
  }
};

exports.getBudget = async function(req, res, next){
  try {
    const budget = await Budget.findById(req.query.id);
    res.send(budget)
  } catch (err) {
    return next(err)
  }
};

exports.getBudgetList = async function(req, res, next){
  try {
    let month = req.query.month;
    let budgets;
    if(month){
      budgets = await Budget.find({month:month});
    }else{
      budgets = await Budget.find();
    }
    res.send(budgets)
  } catch (err) {
    return next(err)
  }
}