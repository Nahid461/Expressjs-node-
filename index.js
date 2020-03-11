let express = require("express");
let app = express();
let joi = require("@hapi/joi");
app.use(express.json()); 
//console.log(process);
let port = process.env.PORT || 4500;
//console.log(express);




let songs = [
    {
      id:1,    
      song_name:"shape of you",
      singre_name:"Ed Sheeran",
      album_name:"shape of you"
    },

    {
        id:2,   
        Song_name:"Despacito",
        singre_name:"luis fonsi/justin bieber",
        album_name:"despacito"

    },

    {
        id:3,   
        song_name:"love yourself",
        singre_name:"justin bieber",
        album_name:"purpose"
    },
     
    {
        id:4,  
        song_name:"on my way",
        singre_name:"Alan Walker",
      album_name:"on my way"
    },
    {
        id:5,  
        song_name:"let me love you",
        singre_name:"DJ Snake",
        album_name:"Encore"
    }

];

app.get("/api/songs/all_list", (req, res) =>{
       res.send(songs)
});


app.get("/api/songs/song_by_id/:id", (req, res) =>{
    let song = songs.find(item => item.id === parseInt( req.params.id));
    if(!song) { return res.status(404).send({message:"invalid song"})};
    res.send(song);
})

//create a new song
app.post("/api/songs/create_song/", ( req, res) => {
    let schema = joi.object({
        song_name: joi.string().min(3).max(100).required(),
        singre_name: joi.string().min(3).max(100).required(),
        album_name: joi.string().min(3).max(100).required(),

      });
      let result = validationError(req.body);
      let {error} = result;
      console.log(result); 
      if(error) {return res.send(error.details[0].message)}
    let song = {
        id:songs.length + 1,
        song_name:req.body.song_name,
        singre_name:req.body.singre_name,
        album_name:req.body.album_name
    
    };
    songs.push(song);
    res.send(songs);
});

//update a song
app.put("/api/songs/update_song/:id", ( req, res) => {
    let song = songs.find(item => item.id === parseInt( req.params.id));
    if(!song) { return res.status(404).send({message:"invalid song"})};
    let schema = joi.object({
        song_name: joi.string().min(3).max(100).required(),
        singre_name: joi.string().min(3).max(100).required(),
        album_name: joi.string().min(3).max(100).required()

      });
      
    let result = validationError(req.body);
    let {error} = result;
    if(error) {return res.send(error.details[0].message)};
    song.song_name = req.body.song_name;
    res.send(songs);


})

//Delete the song
app.delete("/api/songs/remove_song/:id", ( req, res ) => {
    let song = songs.find(data => data.id === parseInt(req.params.id));
    if (!song) { return res.status(404).send({ message:"Invalid id"})};
    let index = songs.indexOf(song);
    console.log(index); 
    songs.splice( index, 1); 
    res.send(songs); 
});

function  validationError(error){
    let schema = joi.object({
        song_name: joi.string().min(3).max(100).required(),
        singre_name: joi.string().min(3).max(100).required(),
        album_name: joi.string().min(3).max(100).required()
  });

  return schema.validate(error);
}

//
app.listen(port, () => console.log(`port is working on ${port}`)); 