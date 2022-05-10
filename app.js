require('dotenv').config()
const https=require('https');
const path = require('path');

const express=require('express');
const sequelize=require('./util/database')
const app=express()
const userRoutes=require('./routes/user')
const expenseRoutes=require('./routes/expense')
const purchaseRoutes=require('./routes/purchase')
const forgetPasswordRoutes=require('./routes/forgotPassword')
const downloadlistRoutes=require('./routes/downloadlist')
const helmet = require("helmet");
var cors = require('cors')
var compression = require('compression')
const fs = require('fs')
var morgan = require('morgan')



const acessLogStream=fs.createWriteStream(path.join(__dirname,'acess.log'),{
    flags:'a'
})
const privateKey=fs.readFileSync('server.key')
const certificate=fs.readFileSync('server.cert')

app.use(cors())
app.use(express.json());
app.use(userRoutes)
app.use(expenseRoutes)
app.use(purchaseRoutes)
app.use(forgetPasswordRoutes)
app.use(downloadlistRoutes)
// app.use(helmet());
app.use(compression())
app.use(morgan('combined',{stream:acessLogStream}))

const User=require('./models/user')
const Expense=require('./models/expense')
const Order=require('./models/order')
const forgetPassword=require('./models/forgotpassword')
const DownloadList=require('./models/downloadList')

app.use(express.static(path.join(__dirname, 'public')))

app.use((req,res)=>{
     res.sendFile(path.join(__dirname,`public/${req.url}`))
})

User.hasMany(Expense)
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(forgetPassword)
forgetPassword.belongsTo(User)

User.hasMany(DownloadList)
DownloadList.belongsTo(User)



// sequelize.sync({force:true})
sequelize.sync()

.then(()=>{
    console.log('database is connected')
})
.catch(err=>{
    console.log(err)})
app.listen(3000)
// https.createServer({key:privateKey,cert:certificate},app).listen(3000)