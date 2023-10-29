const express=require('express')
const bodyparser=require('body-parser')

const cors=require('cors')

const usersRoute=require('./routes/users')
const sequelize=require('./util/database')
const app=express()
app.use(bodyparser.json())
app.use(cors())
app.use('/user',usersRoute)

sequelize.sync({force:false}).then(()=>{
    console.log('model sucessfully synchronised')
    app.listen(3000)
})