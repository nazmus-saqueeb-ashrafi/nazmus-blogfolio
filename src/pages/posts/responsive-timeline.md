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

<br>

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

<br>

```dart

/// responsive app dimension file for calculating aspect ratio based on width of our Figma design
double globalSize(double size, double width){
// size is the size of the Widget in Figma file
// width is the screen width of the device
  const int figBaseWidth = 360;

  double ratio = size/figBaseWidth;
  return ratio * width;
}

```

<br>

## Step 3 - Implementing the TimelineTimelines widget

Now we will implement the widget responsible for generating the timeline. I will explain part by part and the total code will be shown at the end the the article, so scroll to the if you do not need the explanation.

Our timeline widget will require a list of maps which it will iterate over and generate the timeline. Here list is called apiData in my example. A single map contains 3 texts, a message array which can also take in null if required. A node color which takes in Color and can also take null if required. You can also modify the widget to take in a nodeIcon which can be used to set the icons of each node of the timeline.

<br>

```dart

final List<Map?>? apiData =
  [
    {
      "text1": "15 Aug 2022",
      "text2": "12:24 am",
      "text3": "Delivery Pending",
      "messages": null,
      "nodeColor": null,
    },
    {
      "text1": "15 Aug 2022",
      "text2": "12:24 am",
      "text3":
      "Parcel transfer to nearest hub in (Khilgaon Office). Go to head office. ",
      "messages": [
        "Delivery Run Attempt 1,Rider Momen miah 199287837723",
        "Delivery Run Attempt 1,Rider Sujon miah 199287837723",
        "Delivery successfully by Sujon Miah"
      ],
      "nodeColor": null,
    },
    {
      "text1": "15 Aug 2022",
      "text2": "12:24 am",
      "text3": "Delivery Complete",
      "messages": null,
      "nodeColor": Color(0xFF0B4461),
    }
  ];

```

<br>

<br>

```dart
final apiLength = apiData?.length ?? 0;

    List<Widget> iterateItems() {
      List<Widget> items = [];
      for (var i = 0; i < apiLength; i++) {
        var item = SingleRow(
          text1: apiData![i]!["text1"].toString(),
          text2: apiData![i]!["text2"].toString(),
          text3: apiData![i]!["text3"].toString(),
          start: i == 0 ? true : false,
          end: i == apiLength - 1 ? true : false,
          messages: apiData![i]!["messages"],
          nodeColor: apiData![i]!["nodeColor"] ,
          internalPadding: padding, // getting this using a constructor
        );
        items.add(item);
      }

      return items;
    }

```

<br>








<br></br>
![flutterResponsiveComponent1.png](/posts/flutterResponsiveComponent1.png)
<br></br>

  
  
  
    
