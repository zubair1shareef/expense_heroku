const Expense=require('../models/expense')
const User = require('../models/user')
const Sequelize=require('sequelize')
const AWS=require('aws-sdk')

exports.addExpense=(req,res,next)=>{
    const {expenseamount,category,description}=req.body

    console.log(req.body)
    req.user.createExpense({expenseamount,category,description}).then((expense)=>{
         res.status(200).json({expense,success:true})
    })
    .catch(err=>{
        res.status(402).json({sucess:false,error:err})
    })

}



exports.getExpense=(req,res,next)=>{


    const pageno=req.query.page||1
    const totalRows=req.query.rowno
    console.log("---------row-------",totalRows)
    const Iteam_Per_Page=parseInt(totalRows)
    var totalpages,totalexpense;

    req.user.getExpenses().then(expense=>{
        console.log(typeof Number(JSON.stringify( expense[0].expenseamount)))
        var expencedata= expense
        totalpages=Math.ceil(expencedata.length/Iteam_Per_Page)
        
      
    })
    req.user.getExpenses().then(expense=>{
        console.log(typeof Number(JSON.stringify( expense[0].expenseamount)))
        var expencedata= expense
       
        var totalexpense=0;
        // console.log(expencedata[0].expenseamount);
        for(let i=0;i<expencedata.length;i++){

            totalexpense=totalexpense+expencedata[i].expenseamount
        }
      return totalexpense
        // res.json({expense,totalexpense,totalpages})
    })
    .then((totalexpense)=>{
        req.user.getExpenses({offset:(pageno-1)*Iteam_Per_Page,limit:Iteam_Per_Page}).then(expense=>{
            res.json({expense,totalexpense,totalpages})
        })
        .catch(err=>{
            console.log(err)
        })
    }).catch(err=>{
        console.log(err)
    })
    

   




  

}

exports.getAllExpense=async(req,res)=>{
    Expense.findAll().then(data=>{

        var k={...data[0],total:423}
       
       
        console.log(k)
        res.json(k)
    }).catch(err=>{
        console.log(err)
    })
}
exports.getExpenseById=(req,res)=>{
    const id=req.params.userId;
    console.log(id)

    Expense.findAll({where:{userId:id}}).then(expense=>{

        User.findByPk(id).then((user)=>{
            res.json({expense,name:user.name})

        }).catch(err=>{
            console.log(err)
        })

       
    }).catch(err=>{
        console.log(err)
    })

}
const moment = require('moment');

const Op = Sequelize.Op;
const TODAY_START = new Date().setHours(0, 0, 0, 0);
const NOW = new Date();

console.log(typeof moment().format(`DD`))
var date= parseInt( moment().format(`DD`))-1
console.log(date.toString());
console.log(moment().format(`YYYY-MM-${+date} 23:59`))

exports.thisMonthExpense=(req,res)=>{
    req.user.getExpenses({
        where: {
           
            createdAt : { [Op.gt] : date},
            createdAt : { [Op.lte] : moment().format('YYYY-MM-DD 23:59')}
            
          },
    })
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        console.log(err);
    })
}

function uploadToS3(data,filename,user){
    const Bucket_Name=process.env.BUCKET_NAME
    const IAM_USER_KEY=process.env.AWS_S3_ACESS_KEY
    const IAM_USER_SECRET=process.env.AWS_S3_SECRET_ACESS_KEY

    let s3bucket=new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET,
      
    })

 
        var params={
            Bucket:'expensetrackerapp1',
            Key:filename,
            Body:data,
            ACL:'public-read'
        }

        return new Promise((resolve,reject)=>{
            s3bucket.upload(params,async(err,s3response)=>{
                if(err){
                    console.log("error happen ",err)
                    reject(err)
                }
                else{
                    console.log('success',s3response)
                    user.createDownloadList({url:s3response.Location})
                    resolve (s3response.Location)
                   
                }
            })

        })
       
   
}
exports.downloadExpense=async(req,res)=>{

    try{ 
         const expense=await req.user.getExpenses();
        const stringifyExpenses=JSON.stringify(expense)
    
        const filename=`Expense${req.user.id}/${new Date()}.txt`;
        const user=req.user
         
    
        const fileURL= await uploadToS3(stringifyExpenses,filename,user)
        

       
    
        res.status(200).json({fileURL,success:true})

    }
    catch(err){
        res.status(200).json({fileURL:"",success:false,error:err})
    }

}