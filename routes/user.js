const { response } = require('express');
var express = require('express');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers')
const userHelpers = require('../helpers/user-helper')
const verifyLogin=(req,res,next)=>{
  if(req.session.user){
    next()                                    //-----> this is the function checking user availability 
  }else{
    res.redirect('/login')
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  let user = req.session.user
  // console.log(user);
  productHelpers.getAllProducts().then((pdt)=>{
    // console.log(pdt);
    res.render('user/view-products',{admin:false,pdt,user});
  })
  
});

router.get('/login',(req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/')
  }else{
    res.render('user/login',{"LoginErr":req.session.loginErr})
    req.session.loginErr=false
  }
})

router.get('/signup',(req,res)=>{
  res.render('user/signup')
})

router.post('/signup',(req,res)=>{
  userHelpers.doSignup(req.body).then((response)=>{
    // console.log(response);
    let user = req.session.user
  res.render('user/login',{user})
  })
  
})

router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/')
    }else{
      req.session.loginErr="Password"
      res.redirect('/login')
    }
  })
})

router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})

// router.get('/cart',(req,res)=>{
//   if(req.session.loggedIn){
//     let user = req.session.user
//     res.render('user/cart',{user})
//   }else{
//     res.redirect('/login')
//   }  
// })                     ------------------->>>>>>>>  same purpose with diff func using const for chrcking user is there or not is above with name verifyLogin

router.get('/cart',verifyLogin,(req,res)=>{
let user = req.session.user
  res.render('user/cart',{user})
})


module.exports = router;
