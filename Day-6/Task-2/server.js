const express=require('express');
const app=express();

const port=process.env.PORT || 3000;

const users=[
    {id1:1 , name1:"vk"},
     {id2:2 ,  name2:"sk"}
];

app.get('/', (req, res) => {
    res.send(users);
});

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
});