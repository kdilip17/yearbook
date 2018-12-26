const BudgetItems = require("../models/budgetitems.model");
const utils = require("../utils/util");
const BudgetController = require("./budget.controller");

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
  
    // console.log(budgetItemObjObj)
  
    // let budgetItemSave = await budgetItemObjObj.save(budgetItemObjObj);
    let budgetItemSave = payload;
    if(budgetItemSave){
      let debtAmount = 0, lendAmount = 0;
      if(budgetItemSave.type == "DEBT"){
        debtAmount = debtAmount + budgetItemSave.amount;
      }else{
        lendAmount = lendAmount + budgetItemSave.amount;
      }
      let budgetArr = await BudgetItems.aggregate([
        {
          $lookup:{
            from:"budgets",
            localField:"month",
            foreignField:"month",
            as: "budgetdocs"            
          }
        },
        {
          $project: {
            "amount":1,
            "month":1,
            "totalIOwe":1,
            "totalOweMe":1,
            "remaining":1,
            "createdBy":1,
            "updatedBy":1,
            "remaining":1,
            "_id":1
          }
        }
      ])
      let reqObj = {
        body : budgetArr[0]
      }
      console.log(reqObj)
      
    }
  }catch (err){
    return next(err);
  }
};
