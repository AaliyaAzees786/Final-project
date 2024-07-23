const express=require('express');
const UserData=require('./connection')
const app=new express();
const cors=require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
app.use(cors());
const secretKey = '5e870ead1c4fbe469a320a7c5f2b288ac0c1166be51adc9fe2cacc8e5baa59edba2b093ffffd3bd501d7e85a62023d619035482264632d910f2274486de0ba9f';

app.use(cors());
app.use(bodyParser.json());

//CONNECT DB 
require('./connection');

//MODEL FILE
const UserModel=require('./model/UserData')
app.use(express.json())

const BookModel=require('./model/BookData')
app.use(express.json())


//GET API
app.get('/book', async (req,res)=>{
    try {
        const data = await BookModel.find();
        res.send(data);
    } catch (error) {
        res.send('Data not found');
    }
})

//POST API
app.post('/addbook', async(req,res)=>{
    try {
        var item = req.body;
        const datasave = new BookModel(item);
        const saveddata= await datasave.save();
        res.send('Post succesful')
    } catch (error) {
        console.log(error)
    }
})

//UPDATE API
app.put('/bookedit/:id',async(req,res)=>{
    try {
        const data=await BookModel.findByIdAndUpdate(req.params.id,req.body);
        res.send('Updated successfully');
    } catch (error) {
        console.log(error)
    }
})

//DELETE API
app.delete('/removebook/:id',async(req,res)=>{
    try {
        await BookModel.findByIdAndDelete(req.params.id);
        res.send('Deleted Successfully');
    } catch (error) {
        console.log(error)
    }
    
})


//GET API
app.get('/user', async (req,res)=>{
    try {
        const data = await UserModel.find();  //find() is To fetch all the data, await is used to wait for sometime
        res.send(data);
    } catch (error) {
        res.send('Data not found');
    }
})

//POST API
app.post('/adduser', async(req,res)=>{
    try {
        var item = req.body;
        const datasave = new UserModel(item);
        const saveddata= await datasave.save();
        res.send('Post succesful')
    } catch (error) {
        console.log(error)
    }
})

//UPDATE API
app.put('/useredit/:id',async(req,res)=>{
    try {
        const data=await UserModel.findByIdAndUpdate(req.params.id,req.body);
        res.send('Updated successfully');
    } catch (error) {
        console.log(error)
    }
})

//DELETE API
app.delete('/removeuser/:id',async(req,res)=>{
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.send('Deleted Successfully');
    } catch (error) {
        console.log(error)
    }
    
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(404).send({ message: 'User not found. Please sign up.' });
    }

    if (user.password !== password) {
        return res.status(401).send({ message: 'Incorrect password.' });
    }

    // Generate a JWT
    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

    res.send({ message: 'Login successful', token });
});

app.listen(3000,()=>{
    console.log('The server is running on port 3000')
})