require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const morgan = require("morgan"); // used to see requests
const db = require("./models");
const PORT = process.env.PORT || 3001;

const isAuthenticated = require("./config/isAuthenticated");
const auth = require("./config/auth");

// Setting CORS so that any website can
// Access our API
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  next();
});

//log all requests to the console
app.use(morgan("dev"));

// Setting up express to use json and set it to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/appDB", { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.error(err));


// LOGIN ROUTE
app.post("/auth/api/login", (req, res) => {
  auth
    .logUserIn(req.body.email, req.body.password)
    .then(dbUser => {
      console.log("user data" + dbUser);
      res.json(dbUser);
    })
    .catch(err => res.status(400).json(err));
});

// SIGNUP ROUTE
app.post("/auth/api/signup", (req, res) => {
  db.User.create(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

// Any route with isAuthenticated is protected and you need a valid token
// to access
app.get("/api/user/:id", /* isAuthenticated, */ (req, res) => {
  db.User
    .findOne({_id: req.params.id})
    .populate("children")
    .then(data => {
      if (data) {
        console.log(data);
        res.json(data);
      } else {
        res.status(404).send({ success: false, message: "No user found" });
      }
    }).catch(err => res.status(400).send(err));
});


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//-------------------OUR ROUTES-----------------//
//--CHILD--/
app.get("/api/child", function (req, res) {
  // GET ALL CHILDREN
  db.Child
    .find({})
    .populate("sessions")
    .then(function (dbChild) {
      res.json(dbChild);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// Gets a single child by ID
app.get("/api/child/:id", function (req, res) {
  db.Child
    .findOne({ _id: req.params.id })
    .populate("sessions")
    .then(function (dbChild) {
      res.json(dbChild);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// Creates a child
app.post("/api/user/:id/children", function (req, res) {
  console.log(" child'S BODY", req.body);
  db.Child
    .create(req.body)
    .then(function (dbChild) {
      return db.User
        .findOneAndUpdate(
          { _id: req.params.id },
          { $push: { children: dbChild._id } },
          { new: true });
    })
    .then(function (dbChild) {
      res.json(dbChild);
    })
    .catch(function (err) {
      res.json(err);
    });
});

//--SESSION--//
app.post("/api/child/:id/sessions", function (req, res) {
  //takes a while on postman
  console.log("SESSION'S BODY", req.body)
  db.Session
    .create(req.body)
    .then(function (dbSession) {
      return db.Child
        .findOneAndUpdate(
          { _id: req.params.id },
          { $push: { sessions: dbSession } },
          { new: true });
    })
    .then(function (dbChild) {
      res.json(dbChild);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// Gets single session by id
app.get("/api/session/:id", function (req, res) {
  db.Session
    .findOne({ _id: req.params.id })
    .populate("notes")
    .then(function (dbSession) {
      res.json(dbSession);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// Gets all sessions of a child by child's ID
app.get("/api/child/:id/sessions", function (req, res) {
  db.Child
    .findOne({_id: req.params.id})
    .populate("sessions")
    .then(function (dbChild) {
      res.json(dbChild.sessions);
    })
    .catch(function (err) {
      res.json(err);
    });
});


//---NOTES---//

app.post("/api/session/:id/note", function (req, res) {
  //takes a while on postman
  console.log("NOTE'S BODY", req.body);
  db.Note
    .create(req.body)
    .then(function (dbNote) {
      return db.Session
        .findOneAndUpdate(
          { _id: req.params.id },
          { $push: { notes: dbNote } },
          { new: true });
    })
    .then(function (dbSession) {
      res.json(dbSession);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// Gets note by id
app.get("/api/note/:id", function (req, res) {
  db.Note
    .findOne({ _id: req.params.id })
    .then(function (dbNote) {
      res.json(dbNote);
    })
    .catch(function (err) {
      res.json(err);
    });
});


// Find all sessions of a specific child

//----------------end of OUR NOTES---------------//

//---- Events ----//

// Creates an event
app.post("/api/user/:id/event", function (req, res) {
  db.Event
    .create(req.body)
    .then(function (dbEvent) {
      return db.User
        .findOneAndUpdate(
          { _id: req.params.id },
          { $push: { events: dbEvent._id } },
          { new: true}
        );
    })
    .then(function (dbEvent) {
      res.json(dbEvent);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// Gets an event by its id
app.get("/api/event/:id", function (req, res) {
  db.Event
    .findOne({ _id: req.params.id })
    .then(function(dbEvent) {
      res.json(dbEvent);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// Gets all events of a user by the user ID
app.get("api/user/:id/events", function (req, res) {
  db.User
    .findOne({ _id: req.params.id})
    .populate("events")
    .then(function (dbUser) {
      res.json(dbUser.events);
    })
    .catch(function (err) {
      res.json(err);
    });
});


app.get("/", isAuthenticated /* Using the express jwt MW here */, (req, res) => {
  res.send("You are authenticated"); //Sending some response when authenticated
});

// Error handling
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") { // Send the error rather than to show it on the console
    res.status(401).send(err);
  }
  else {
    next(err);
  }
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
