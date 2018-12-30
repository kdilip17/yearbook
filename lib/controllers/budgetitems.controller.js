const BudgetItems = require("../models/budgetitems.model");
const utils = require("../utils/util");
const Budget = require("../models/budget.model");
const Category = require("../models/category.model");

const deleteBudgetItem = exports.deleteBudgetItem = async function (req, res, next) {
    try {
      let budgetId = req.query.budgetId;
      let getBudgetItem = await BudgetItems.findById(budgetId);
      if(getBudgetItem){
        let budgetAmount = getBudgetItem.amount;
        let budgetType = getBudgetItem.type;
        let budgetMonth = getBudgetItem.month;
        let deleteBudget = await BudgetItems.findOneAndDelete(budgetId);
        if(deleteBudget){
          let budget = await Budget.findOne({month: budgetMonth});
          if(budget){
            if(budgetType == "DEBT"){
              budget.totalIOwe = budget.totalIOwe - budgetAmount;
            }else{
              budget.totalOweMe = budget.totalOweMe - budgetAmount;
            }
            budget.updatedDate = new Date();
            let budgetObjId = budget._id;
            delete budget._id;
            let budgetupdate = await Budget.findByIdAndUpdate(budgetObjId,budget);
            if(budgetupdate){
              if(req.query.isEdit){
                next(null,true);
              }else{
                res.status(200).send({"message":"Success"});
              }
            }
          }
        }
      }
      
    } catch (error) {
      res.status(500).send(error)
    }
};

const addBugetItem = exports.addBugetItem = async function(req, res, next){
  try{
    let payload = req.body;
    let query = {
      isEdit : false
    };
    if(req.query){
      query = req.query
    }
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
          if(query.isEdit){
            next(null,budgetItemSave)
          }else{
            res.send(budgetItemSave);
          }
        }
      }
    }
  }catch (err){
    res.status(500).send(err)
  }
};

exports.editBudgetItem = function (req, res, next) {
  try {
    let deleteObj = {
      query : {
        budgetId : req.query.budgetId,
        isEdit : true
      }
    }
    deleteBudgetItem(deleteObj,res,function (err2,res2) {
      if(res2){
        let addBudgetObj = {
          query: {
            budgetId : req.query.budgetId,
            isEdit : true
          },
          body: req.body
        }
        addBugetItem(addBudgetObj,res,function(err1,budgetItemRes) {
          res.send(budgetItemRes);
        });
      }
    });
  } catch (error) {
    res.status(500).send(error)
  }
}

exports.getBudgetItem = async function(req, res, next){
  try {
    const BudgetItem = await BudgetItems.findById(req.query.id);
    res.send(BudgetItem)
  } catch (err) {
    return next(err)
  }
};

exports.getBudgetItemList = async function(req, res, next){
  try {
    let month = req.query.month;
    const budgetItems = await BudgetItems.find({month:month});
    res.send(budgetItems)
  } catch (err) {
    return next(err)
  }
}