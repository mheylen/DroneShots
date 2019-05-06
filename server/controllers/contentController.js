module.exports = {
   getAll: (req, res) => {
       const db = req.app.get("db");
       console.log("first");

       db.get_content().then(content =>{
           console.log(content);
           res.status(200).json(content);
       })
       .catch(err => console.log(err.detail));
   },
   upload: (req, res) => {
       const db = req.app.get("db");
       const { title, tag, description, video, id } = req.body;
       console.log(req.body,"Lets see what werrr gettin down, ya know?")
       db.upload_content([title, description, tag,  video, id])
       .then(response => {
           res.status(200).json(response);
       })
       .catch(err => {
           console.log(err);
           res.status(400).send("Whatcho Whatcho Whatcho Want.")
       })
   },
//    editVideo: (req, res) => {
//     let { id } = req.params;
//     if (!id) {
//         id = req.query.id;
//     }
//     if (!id) {
//         return res.status(400)
//         .send({ message: "Invalid or missing 'id' on request"});
//     }

//     const db = req.app.get("db");
//     const { title, description, tag} = req.body;
//     db.update_video([title, description, tag])
//     .then(products => {
//         res.status(200).send(videos);
//     })
//    },
   deleteVideo: (req, res, next) => {
    //    const db = req.params;
       console.log(req.params, 'please delete already')
       const db = req.app.get("db")
       console.log(db, "Delete")
       db.delete_video([req.params.id, req.session.user.id]).then ((videos) => res.status(200).send(videos)).catch(err => {
        //    console.log(err,"Is it hitting")
       })
   },
   getOne: (req, res) => {
       const db = req.app.get("db")
        console.log(req.session,"GetOne")
       db.get_one(req.session.user.id).then( content => {
           console.log(content,"Content LABEL");
          res.status(200).json(content);
    })
    .catch(err => console.log(err))
   },
   
   updateVideo(req, res){
        const db = req.app.get("db");
        const { title, description, tag} = req.body;
        const { id } = req.params
        console.log("-------------------------------")
        db.update_video([title, description, tag, id])
        .then(videos => {
            res.status(200).send(videos);
        })
        .catch(err => {
            res
            .status(500)
            .send({ message: "An errir has occured on the server", err})
        });
    }
    
}