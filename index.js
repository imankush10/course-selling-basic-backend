const express = require('express')
const app = express();
const port = 3000;
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

app.use('/admin', adminRoutes);
app.use('/users', userRoutes);

app.listen(port,()=>{
    console.log('Express server listening at port ', port);
})