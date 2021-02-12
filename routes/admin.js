var express = require('express');
var router = express.Router();
var db = require('../config/connection')
var productHelpers = require('../helpers/product-helpers')
/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((pdt)=>{
    // console.log(pdt);
    res.render('admin/view-products',{admin:true,pdt});
  })
  
});

router.get('/view-products',(req,res)=>{
  res.redirect('/admin')
})

router.get('/add-product',(req,res)=>{
  res.render('admin/add-product',{admin:true})
})

router.post('/add-product',(req,res)=>{
  // console.log(req.body);
  // console.log(req.files.Image);
  productHelpers.addProduct(req.body,(id)=>{
    let image = req.files.Image
    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.redirect('/admin')
      }else{
        // console.log(err);
      }
    })
    
  })
})
module.exports = router;