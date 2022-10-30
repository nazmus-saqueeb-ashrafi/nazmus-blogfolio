---
description: How to setup a Node server with Express and connect to a database in MongoDB to save data
public: true
layout: ../../layouts/BlogPost.astro
title: Node + Express Server + MongoDB
createdAt: 1663138523827
updatedAt: 1663138544072
tags:
  - Blog
heroImage: /posts/node0.png
slug: setup-node-project
fbImage: /posts/node0.png
---

<style>

ul li {
  list-style-type: circle;
}

ul li li {
 list-style-type: square;
  margin-left: 20px;
}


 hr {
  height:10px; 
  visibility:hidden;
 }
</style>

To setup a Node server with Express we will initialize project folder with some of the dependencies needed to start the project. We will also learn how to set up routes and push the project to a git repository.
<br></br>

## Setup

<hr></hr>

- Make a directory (with project name) and open VScode in it.
- Make a folder called 'server' in the root. Create file called 'index.js' in the backend folder.
- Run 'npm init' in the server folder
  - set 'index.js' as entry point
  - this will create a 'package.json' in the root
- Create a '.gitignore' file in the root and include (optional)

<hr></hr>

```.gitignore
node_modules
.env
```

<hr></hr>

- Run 'npm i express dotenv mongoose colors'
- Run 'npm i -D nodemon' to install nodemon as a dev dependency
- Run these scripts in 'package.json'

<hr></hr>

```json
"scripts": {
    "start": "node server/index.js",
    "server": "nodemon server/index.js"
},
```

<hr></hr>

- Run 'npm run server'

<hr></hr>

And voila, you are all done setting up.

<br></br>

## Setting up routes

<hr></hr>

- Now in the 'index.js' file, we will listen for a port and set up a pointer to out routes.

<hr></hr>

```javascript
// server/index.js
const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;

const app = express();

// our route pointer
app.use("/api/post", require("./routes/postRoutes"));

// listening
app.listen(port, () => console.log(`Server started on port ${port}`));
```

<hr></hr>

- Create the .env

<hr></hr>

```.env;

NODE_ENV = development
PORT = 3000

```

<hr></hr>

- Create a folder named 'routes' and a file named 'postRoutes.js' in it.
  We keep our routes seperated from the 'index.js' file because we want to keep our routes in an organized fashion.
- Do not forget to add the type to package.json so that it accept the module import statement.
<hr></hr>

```json

"type": "module",

```

<br></br>

```javascript
// server/routes/postRoutes.js
import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  res.status(200).json({ message: "set post" });
});

export default router;
```

<hr></hr>

- Once all this is done run the command "npm run server". The server should connect and be listening to port 3000.
- Next we can use a http client like Postman or Insomnia to access our route. Just use the GET, POST, PUT, DELETE request _'http://localhost:3000/api/post'_. To test send a post request to get a message of "set post" back.

<br></br>

## Modify index.js to connect a Mongo Database

<hr></hr>
Create a new project in Mongodb.com and create a new database in it. Once you get a connection string use that to connect you app to the database using Express.

<hr></hr>

Update the env file.

<hr></hr>

```.env;

NODE_ENV = development
PORT = 3000
MONGO_DB = "the connection string"
```

<br></br>

```javascript
// server/index.js

import express from "express"; // needs to be installed
import cors from "cors"; // needs to be installed
import bodyParser from "body-parser"; // needs to be installed
import dotenv from "dotenv"; // needs to be installed
import mongoose from "mongoose";
import PostRoute from "./Routes/PostRoute.js";

// Routes

const app = express();
app.use(cors());

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

dotenv.config();

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Listening at ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error));

// usage of routes

app.use("/post", PostRoute);
```

<br></br>

## Making a Model

<hr></hr>
Now we will create a model/schema which will be used to save the posts in our database.
<hr></hr>

```javascript
// server/Models/postModel.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
});

// we register the model with mongoose
var PostModel = mongoose.model("Posts", postSchema);

export default PostModel;
```

<br></br>

## Modify routes to save data in database

<hr></hr>
To make things less complex and more organized we will seperate the routes and the works the routes do in a seperate folder called controller.
<hr></hr>
Modify the route file.
<br></br>

```javascript
// server/routes/postRoutes.js
import express from "express";
const router = express.Router();

import { createPost, getPosts } from "../Controllers/PostController.js";

router.post("/", createPost);
router.get("/get-all-posts", getPosts);

export default router;
```

<br></br>
Import the model and define the activities the routes should perform when hit. Do this in the controller file.

<hr></hr>

```javascript
// server/Controllers/PostController.js
import PostModel from "../Models/postModel.js";

// Create new Post
export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get all Posts
export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};
```

<br></br>

Thats it, you are set. Hit the route _'http://localhost:3000/api/post'_ with a POST request and a description in the body (using Postman). Your post should be saved in the database.

<br></br>
![node1.png](/posts/node1.png)
<br></br>

## Git repository (optional)

<hr></hr>

Run the following commands and create the initial commit.

- 'git init'
- 'git add .'
- 'git commit -m 'Initial commit'

<br></br>

<!-- The front end part of the workflow will be continued in my article about Redux Toolkit. -->

<br></br>
