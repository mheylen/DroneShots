const bcrypt = require('bcrypt')
module.exports = {
    // Very similar to how it should be set up but we are not usig bcrypt, (HINT: ALWAYS HASH PASSWORDS)
    signIn: async (req, res) => {
      const { email, password } = req.body;
      const db = req.app.get("db");
      let find_users = await db.find_users(email);
      if(!find_users[0]){
        res.status(200).send("Incorrect email, please try again");
    }
    let result = bcrypt.compare(password, find_users[0].user_password)
    if(result){
        req.session.user = {id: find_users[0].id, email: find_users[0].email};
        res.status(200).send(req.session.user);
    }else {
        res.status(200).send("Incorrect email/password, please try again....Unless you're a hacker.")
    }
},




    //   db.find_users(email).then(users => {
    //     if (users[0]) {
    //       if (password === users[0].password) {
    //         req.session.users = {
    //           email: users[0].email,
    //           id: users[0].id
    //         };
    //         res.status(200).send(req.session.users);
    //       } else {
    //         res.status(401).send({errorMessage:"Password do not match!"});
    //       }
    //     } else {
    //       res
    //         .status(404)
    //         .send({errorMessage:"email doesnt exist, please register to continue"});
    //     }
    //   });
    // },

    register: (req, res) => {
      const db = req.app.get("db");
      
      const { email, password} = req.body;
      
      db.find_users(email).then(users => {
        
        if (users.length) {
          console.log(users, "it exists")
          res.status(200).send("That user already exists");
        } else {
          let saltRounds = 12;
          bcrypt.genSalt(saltRounds).then(salt => {
            bcrypt.hash(password,salt).then((hashPassword) => {

              db.create_users([email, hashPassword]).then(users => {
                console.log(users, "this is awesome")
                req.session.users = {
                  id: users[0].id,
                  email: users[0].email
                };
                res.status(200).send(req.session.users);
              });
            });
          });
        }
      });
    }
  };
  