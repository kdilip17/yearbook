const Category = require("../models/category.model");

exports.addCategory = function(req,res,next){
  let category = new Category({
    name : req.body.name,
    isUsed : false,
    createdBy : req.body.createdBy,
    updatedBy : req.body.createdBy
  });
  category.save(function(err,categoryRes){
    if(err){
      if (err.name === 'MongoError' && err.code === 11000) {
        // Duplicate username
        return res.status(500).send({ success: false, message: 'Category already exist!' });
      }
      return next(err)
    }else{
      res.send(categoryRes)
    }
  })
};

exports.getCategory = async function(req, res, next){
  try {
    const category = await Category.findById(req.params.id);
    res.send(category)
  } catch (err) {
    return next(err)
  }
};

exports.listCategory = async function(req, res, next){
  try {
    const categorys = await Category.find({});
    res.send(categorys)
  } catch (err) {
    return next(err)
  }
}

exports.deleteCategory = function(req, res, next){
  Category.findById(req.params.id,function(err,categoryData){
    if(err){
      return next(err)
    }else{
      if(categoryData.isUsed){
        res.send('Category cannot be deleted as it is used already')
      }else{
        Category.findByIdAndRemove(req.params.id,function(err){
          if(err){
            return next(err)
          }else{
            res.send('Category Deleted successfully')
          }
        })
      }      
    }
  })
};



exports.editCategory = function(req,res,next){
  Category.findById(req.params.id,function(err,categoryData){
    if(err){
      return next(err)
    }else{
      let payload = req.body;
      // has own property not working so commented
      // if(payload.hasOwnProperty("name")){
        
      // }
      // if(payload.hasOwnProperty("isUsed")){
        
      // }
      categoryData.name = payload.name
      categoryData.isUsed = payload.isUsed
      categoryData.updatedDate = new Date()
      categoryData.updatedBy = payload.updatedBy
      categoryData.save(function(err,updatedRes){
        if(err){
          return next(err)
        }else{
          res.send(updatedRes)
        }
      })
    }
  })
};
