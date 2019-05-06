const express = require("express");
const app = express();
const massive = require("massive");
const bcrypt = require("bcrypt");
const session = require("express-session");
const uC = require("./controllers/usersController");
const cC = require("./controllers/contentController");
const cloudinary = require('cloudinary');
const stripe = require("stripe")("sk_test_Wwio3QGI6SOr28hlbribTV2l00cxN5y3Tq");
require("dotenv").config();


const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
app.use(express.json());

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 14
        }
    })
    );
    massive(CONNECTION_STRING).then(dbInstance => {
        app.set("db", dbInstance);
        // dbInstance.init();
        console.log("db..pf pf pf... is connected")
    });
    // users
    app.post("/api/signin", uC.signIn);
    app.post("/api/register", uC.register);
    
// stripe payment
app.post('/api/stripe', function (req, res, next){
    console.log(req.body, "reqin da bodies")
    const stripeToken = req.body.body;
    console.log(stripeToken, "StripeToken")
    stripe.charges.create({
        amount: 500,
        currency: 'usd',   
        description: 'Example charge',
        source: stripeToken.id,
        metadata: {order_id: 6735},
      }, function (err, charge) {
          console.log('charge');
          console.log(charge)
          console.log(err, "error")
          if (err) {

              res.send({
                  success: false,
                  message: "error"
                });
            } else {
                      res.send({
                          success: true,
                          message: "success"
      });
    }
    })
})

app.use( express.static( `${__dirname}/../build` ) );
// pilot logout

app.post("/api/logout", (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
});

app.put("/api/users", (req, res) => {
res.status(200).send(req.session.user);
})

app.get("/api/users", (req, res) => {
    res.status(200).send(req.session.user);
});

// content
app.get("/api/content", cC.getAll);
app.post("/api/content",cC.upload);
app.get("/api/pilotContent/", cC.getOne);
app.put("/api/content/:id", cC.updateVideo);
app.put("/api/content", cC.updateVideo);
app.delete("/api/content/:id", cC.deleteVideo);



app.get('/api/upload', (req, res) => {
    const timestamp = Math.round((new Date()).getTime() / 1000);
    const api_secret  = process.env.CLOUDINARY_SECRET_API;
    const signature = cloudinary.utils.api_sign_request({ timestamp: timestamp }, api_secret);

    const payload = {
        signature: signature,
        timestamp: timestamp
    };
        res.json(payload);

})
const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

app.listen(SERVER_PORT || 4000, () => console.log(`Riding the ${SERVER_PORT} heat wave`))