const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const Expense = require("../models/expense");
const saltRounds = 10;

exports.createUser = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phonenumber = req.body.phonenumber;
  const password = req.body.password;
  console.log(typeof phonenumber);

  await User.findAll({ where: { email } })
    .then((ress) => {
      if (ress.length > 0) {
        res.json({ msg: "User already exists, Please Login" });
      }
      
      bcrypt.hash(password, saltRounds, function (err, hash) {
        
        User.create({
            name: name,
            email: email,
            phonenumber: 5645,
            password: hash,
          })
            .then(() => {
              res.json({
                name: req.body.name,
                email: req.body.email,
               
                msg: "Successfuly signed up",
              });
            })
            .catch((err) => {
              console.log(err);
            });
      });
     
    })
    .catch((err) => {
      console.log(err);
    });
};


exports.loginUser=(req,res)=>{
    const email=req.body.email
    const password=req.body.password;

    User.findOne({where:{email}}).then((user)=>{
        
        if(user){
            pass=user.password
            const email=user.email;
            const id=user.id;
            const name=user.name;

            bcrypt.compare(password,pass).then((ress)=>{
                if(ress){
                    var token = jwt.sign({id: id },'jsddsfjk83bsjfbh87bdskfj');
                    res.status(200).json({msg:"login sucessfull",token:token,email:email,name:name})
                }
                else{
                    res.status(401).json({msg:"login failed"})
                }
 
            })
             
        }
        else{
            res.status(404).json({msg:"user not found"})
        }
       
    })
    .catch((err)=>{
        console.log(err);
    })


}

exports.getAllUserWithExpense=async(req,res)=>{
  User.findAll().then(async(users)=>{
    var UserAndExpense=[]
    var alldata={};
    for(let i=0;i<users.length;i++){
    await  Expense.findAll({where:{userId:users[i].id}}).then(expense=>{
      var totalexpense=0;
      for(let i=0;i<expense.length;i++){
        totalexpense=totalexpense+expense[i].expenseamount

      }
        alldata={
          ...users[i].dataValues,
          
          totalexpense
        }
        console.log(alldata);
      })
      UserAndExpense.push(alldata)
      

    }
    

    res.json(UserAndExpense)

    
    
  })
}