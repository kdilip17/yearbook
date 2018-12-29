const BudgetItems = require("../models/budgetitems.model");
const utils = require("../utils/util");
const Budget = require("../models/budget.model");
const Category = require("../models/category.model");

exports.deleteBudgetItem = async function (req, res, next) {
    try {
      let budgetId = req.query.budgetId;
      let budgetAmount = req.query.amount;
      let budgetType = req.query.type;
      let budgetMonth = req.query.month;
      let deleteBudget = await BudgetItems.findByIdAndDelete(budgetId);
      if(deleteBudget){
        let budget = await Budget.findOne({month: budgetMonth});
        if(budget){
          if(budgetType == "DEBT"){
            budget.totalIOwe = budget.totalIOwe - budgetAmount;
          }else{
            budget.totalOweMe = budget.totalOweMe - budgetAmount;
          }
          budget.updatedDate = new Date();
          budget.updatedBy = budgetItemObjObj.updatedBy;
          budget.isUsed = true;
          let budgetupdate = await Budget.update(budget);
          if(budgetupdate){
            res.status(200).send({"message":"Success"});
          }
        }
      }
    } catch (error) {
      res.status(500).send(error)
    }
};

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
          await Category.findByIdAndUpdate(payload.category.id,{$set:{isUsed:true}});
          res.send(budgetItemSave);
        }
      }
    }
  }catch (err){
    res.status(500).send(error)
  }
};
