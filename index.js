let express = require("express");
let app = express();
let joi = require("@hapi/joi");
app.use(express.json()); 
//console.log(process);
let port = process.env.PORT || 4500;
//console.log(express);


let users =[
    {
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


//create a new user
app.post("/api/users/newuser",(req, res) =>  {
    let schema = joi.object({
        name: joi.string().min(3).max(100).required().regex(),
  });
    let result = validationError(req.body);
    let {error} = result;
   //console.log(result); 
   if(error) {return res.send(error.details[0].message)}
    let user = {
        id:users.length + 1,
        name:req.body.name
    
    };
    users.push(user);
    res.send(users);
}); 


//update the user
app.put("api/user/updateuser/id", (req, res) => {
    let user = users.find(data => data.id === parseInt (req.params.id));
    if(!user){return res.status(404).send(
        { message:"Invalid user id"}) };
    let schema = joi.object({
        name: joi.string().min(3).max(100).required().regex(),
  });

    let result = validationError(req.body);
    let {error} = result;
    //console.log(result); 
     if(error) {return res.send(error.details[0].message)}
    user.name = req.body.name;
    res.send(users);

});

function  validationError(error){
    let schema = joi.object({
        name: joi.string().min(3).max(100).required().regex(),
  });

  return schema.validate(error);
}

app.listen(port, () => console.log(`port is working on ${port}`)); 