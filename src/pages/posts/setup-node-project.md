---
description: How to setup a Node server with Express.
public: true
layout: ../../layouts/BlogPost.astro
title: Node + Express Server
createdAt: 1663138523827
updatedAt: 1663138544072
tags:
  - Blog
heroImage: /posts/node-express.png
slug: setup-node-project
fbImage: /posts/node-express.png
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
- Make a folder called 'backend' in the root. Create file called 'server.js' in the backend folder.
- Run 'npm init'
  - set 'server.js' as entry point
  - this will create a 'package.json' in the root
- Create a '.gitignore' file in the root and include

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
    "start": "node backend/server.js",
    "server": "nodemon backend/server.js"
},
```

<hr></hr>

- Run 'npm run server'

<hr></hr>

And voila, you are all done setting up.

<br></br>

## Setting up routes

<hr></hr>

- Now in the 'server.js' file, we will listen for a port and set up a pointer to out routes.

<hr></hr>

```javascript
// backend/server.js
const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;

const app = express();

// our route pointer
app.use("/api/posts", require("./routes/postRoutes"));

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

- create a folder named 'routes' and a file named 'postRoutes.js' in it.
  We keep our routes seperated from the 'server.js' file because we want to keep our routes in an organized fashion.

<hr></hr>

```javascript
// backend/routes/postRoutes.js
const express = require("express");
const router = express.Router();

module.exports = router;

router.get("/", (req, res) => {
  res.status(200).json({ message: "get post" });
});

router.post("/", (req, res) => {
  res.status(200).json({ message: "set post" });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ message: `update post ${req.params.id}` });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({ message: `delete post ${req.params.id}` });
});
```

<hr></hr>

- Next we can use a http client like Postman to access our route. Just use the GET,POST,PUT,DELETE request _'http://localhost:5000/api/posts'_.

<br></br>

## Git repository

<hr></hr>

Run the following commands and create the initial commit.

- 'git init'
- 'git add .'
- 'git commit -m 'Initial commit'
