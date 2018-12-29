const BudgetItems = require("../models/budgetitems.model");
const utils = require("../utils/util");
const Budget = require("../models/budget.model");

exports.addBugetItem = async function(req, res, next){
  try{
    let payload = req.body;
    let budgetItemObjObj = new BudgetItems({
      category  : payload.category,
      month     : utils.getMonthYear(),
      amount    : payload.amount,
      type      : payload.type,
      createdBy : payload.createdBy,
      updatedBy : payload.createdBy
    });
    let budgetItemSave = await budgetItemObjObj.save(budgetItemObjObj);
    if(budgetItemSave){
      let budget = await Budget.findOne({month: budgetItemObjObj.month});
      if(budget){
        if(budgetItemObjObj.type == "DEBT"){
          budget.totalIOwe = budget.totalIOwe + budgetItemObjObj.amount;
        }else{
          budget.totalOweMe = budget.totalOweMe + budgetItemObjObj.amount;
        }
        budget.updatedDate = new Date();
        budget.updatedBy = budgetItemObjObj.updatedBy;
        budget.isUsed = true;
        let budgetupdate = await Budget.update(budget);
        if(budgetupdate){
          res.send(budgetItemSave);
        }
      }
    }
  }catch (err){
    return next(err);
  }
};
