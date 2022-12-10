---
description: How to create a responsive timeline (with a sub timeline) in Flutter 
public: true
layout: ../../layouts/BlogPost.astro
title: Flutter Custom Timeline Widget
createdAt: 1663138523831
updatedAt: 1663138544076
tags:
  - Blog
heroImage: /posts/flutter-timeline0.png
fbImage: /posts/flutter-timeline0.png
slug: keto
---

<style>
    #badge {
        box-sizing: border-box;
        display: inline-block;
        
        color: #F0F8FF;

        border-radius: 0.2rem; 
        text-align: center;

        font-size: 1rem;
        font-weight: 400;
        padding: 0.05rem 0.8rem 0.1rem;
        line-height: inherit;
        background-color: #2c3e50;
    
    }
    

</style>


<br/><br/>

|                                                                  |     |
| ---------------------------------------------------------------- | --- |
| <span id='badge'>Platform</span> Android, IOS, multi-screen                       |
| <span id='badge'>Stack</span> Flutter             |


<br>

This article will explain how to create a responsive timeline widget in Flutter. The timeline widget will take a list of maps which will be fetched from a data source usually through an API fetch. The widget will also generate a sub timeline inside the main timeline depending on how the maps in the list are structured.

Additionally the widget responsiveness will depend on the aspect ratio of our device screen width relative to our screen width mentioned in our Figma design. Our screen in this case will have a width of 360 pixel.

Now lets begin to create this widget. 

## Step 1 - Initial Setup

Create a new Flutter project and do the necessary clean up to to make the app minimalistic. A main.dart file should contain a ListView with out widget "TimelineTimelines" in it. Our TimelineTimelines widget will take a parameter called padding which will control the padding between internal elements of our timeline.
The presize implementation of the main file is shown below. 

<br></br>
```dart
import 'package:flutter/material.dart';
import 'package:timeline_pstar_clean/Widgets/TimelineTimelines.dart';

void main() {//from main
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          leading: const Icon(Icons.arrow_back_ios_new_outlined),
          title: const Text("Parcel Track"),
        ),
        body: ListView(
          padding: const EdgeInsets.all(8),
          children: [
            const SizedBox(
              height: 20,
            ),
            TimelineTimelines(
              padding: 10,
            ),
            const SizedBox(
              height: 20,
            ),
          ],
        )
        );
  }
}

```
<br></br>

## Step 3 - Implementing the globalSize function 

This function's job is to calculate the aspect ratio depending on the width of the screen and the initial width value provided by us. This function will be used in our TimelineTimelines widget to calculate all internal paddings between the elements in our TimelineTimelines widget.

## Step 3 - Implementing the TimelineTimelines widget







<br></br>
![flutterResponsiveComponent1.png](/posts/flutterResponsiveComponent1.png)
<br></br>

  
  
  
    
