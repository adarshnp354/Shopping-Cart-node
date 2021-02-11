var db = require('../config/connection')
var collection=require('../config/collections')
const bcrypt = require('bcrypt')
const { response } = require('express')
module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.Password=await bcrypt.hash(userData.Password,10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((response)=>{
                // console.log(response);
                resolve(response.ops[0])
            })
        })
        
    },
    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false
            let responce={}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({Email:userData.Email})
            if(user){
                bcrypt.compare(userData.Password,user.Password).then((status)=>{
                    if(status){
                        // console.log('LOGIN SUCCESS');
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        // console.log(('LOGIN FAILED'));
                        resolve({status:false})
                    }
                })
            }else{
                console.log('LOGIN FAILED');
                resolve({status:false})
            }

        })
    }

}