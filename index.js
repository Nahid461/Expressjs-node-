let express = require("express");
let app = express();
//console.log(process);
let port = process.env.PORT || 4600;
//console.log(express);


let users =[{
    id:1,
    name:"John Doe"
},
    {

          id:2,
          name:"Emma Doe"
    },

    {
        id:3,
        name:"Ajay Doe"
    },
    {
        id:4,
        name:"MANISH CHANDWANI"

    }

];




//get

app.get("/api/user", (req,res) => {
    res.send("hello user")
});

app.get("/api/courses",(req,res) => {
    res.send(["Angular","reactjs","nodejs"])
});


//app.get("/api/:year/:month",(req,res) => {
//  res.send(req.params);
//});


app.get("/api/users", (req, res) => {
    res.send(users);
});

app.get("/api/users/:id", (req, res) =>{
    let user = users.find(item =>item.id === parseInt( req.params.id));
    if(!user) { return res.status(404).send({message:"invalid user"})};
    res.send(user);
});



app.listen(port, () => console.log(`port is working on ${port}`)); 