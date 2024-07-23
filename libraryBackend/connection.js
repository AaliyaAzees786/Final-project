const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://azeesaaliya786:aaliya12@cluster1.gm9a8qn.mongodb.net/libraryDB?retryWrites=true&w=majority&appName=Cluster1').then((res)=>{
    console.log('DB is connected');
}).catch((error)=>{
    console.log('Error in connection')
})