---
description: How I implement Redux Toolkit in my React workflow.
public: true
layout: ../../layouts/BlogPost.astro
title: React + Redux Toolkit
createdAt: 1663138523829
updatedAt: 1663138544074
tags:
  - Blog
heroImage: /posts/redux0.png
slug: setup-node-project
fbImage: /posts/redux0.png
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

To have a smooth application which requires the least amount of reloads, a state management system is really essential in a React app. I use Redux Toolkit for this and find it extremely easy and smooth to implement. This article is about just how I go about doing this.

<hr></hr>

I will be using the backend server with MongoDb integration that I build using Node and Express in one of my previous [article](https://nazmusashrafi.netlify.app/posts/setup-node-project/), so make sure you give that a read.

<hr></hr>

## Setup

<hr></hr>

- In the project folder run 'npx create-react-app client' to create a React app in a folder named "client"
- Make sure in the package.json you add, so we will hit the backend routes later which are running at 5000
<hr></hr>

```json
// client/package.json
  "proxy": "http://localhost:5000",
```

<hr></hr>

- Install redux toolkit and redux by running 'npm install @reduxjs/toolkit react-redux' in the client folder.

<br></br>

## Configure Redux Toolkit

<hr></hr>

- Now that we are done with the initial setup, we will setup our Redux store.
- In the src folder make another folder named app.
- In the app folder make a file named store.js. This file will contain our reducers will will be registered to the store.

<hr></hr>

```javascript
// client/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/postSlice"; // will create later

export const store = configureStore({
  reducer: {
    post: postReducer,
  },
});
```

<hr></hr>

- Wrap the app with the store in index.js

<hr></hr>

```javascript
// client/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { store } from "./app/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

<br></br>

## Add the Service and the Slice

<hr></hr>

- Next we make a folder called features, with another folder called post in it to seperate logic of the post (redux) state.
- In post folder make a file called postService.js. This file will make the axios request to the server side.
- Install axios using 'npm install axios'

<hr></hr>

```javascript
// client/features/post/postService.js
import axios from "axios";

const API_URL = "/api/post/"; // should match the server side

// Get all posts
// @route   GET api/post/getPosts
// @access  Public
const getPosts = async (userId) => {
  const response = await axios.get(API_URL + "getPosts");

  return response.data;
};

const postService = {
  getPosts,
};

export default postService;
```

<hr></hr>

- We make a file called postSlice.js in a post folder (in the features folder). This will:
  - Define initial state of the redux state
  - Call functions in postService.js and populate the redux state with appropiate response.

<hr></hr>

```javascript
// client/features/post/postSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const posts = [];

const initialState = {
  // the initial state

  posts: posts ? posts : null,
};

// Get all posts
export const getPosts = createAsyncThunk(
  // this function calls the service
  "post/getPosts",
  async (userId, thunkAPI) => {
    try {
      return await postService.getPosts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      // cases which define what to do with state for different situations
      // getPosts
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.posts = null;
      });
    //
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
```

<br></br>

## useDispatch and useSelector

<hr></hr>

- We are almost done. Lets test it out in our App.js file.

<hr></hr>

```javascript
// client/App.js

import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "./features/post/postSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return <></>;
}

export default App;
```

<br></br>

- We have dispatched the getPost() and filled out post state using useDispatch. If everything goes right we should see our state update in our Redux Devtools

<br></br>
![redux1.png](/posts/redux1.png)
<br></br>

- Now lets use the useSelector hook to grab the contents of the state and display it.

<br></br>

```javascript
// client/App.js
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "./features/post/postSlice";

function App() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  return (
    <>
      <h1>Post list</h1>

      {posts &&
        posts.map((post) => (
          <div key={post._id}>
            <h3>{post.description}</h3>
          </div>
        ))}
    </>
  );
}

export default App;
```

<br></br>

To conclude, I want to say yeah, maybe Redux Toolkit initial implementation might be a bit lengthy, but trust me on the smoothness and modern feel it gives to an app. That makes it totally worth it!

<br></br>
