---
description: How to create a custom responsive Widget in Flutter
public: true
layout: ../../layouts/BlogPost.astro
title: Flutter Custom Responsive Widget
createdAt: 1663138523830
updatedAt: 1663138544075
tags:
  - Blog
heroImage: /posts/flutter0.png
fbImage: /posts/flutter0.png
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

This article will explain how to create a design system and implement it in a component in Flutter so that the component becomes fully responsive in all mobile screen size. This means not only will the component increase in size (height and width) according to the size of the mobile screen, it will also increase the font size of the text contained in the Widget. The related padding will also increase and decrease depending on the screen size giving the Widget a truly responsive feel.

The Widget responsiveness will depend on the aspect ratio of our device screen width relative to our screen width mentioned in our Figma design. In the screen below we can see that the width of the screen in the Figma design in 360px.


<br></br>
![flutterResponsiveComponent1.png](/posts/flutterResponsiveComponent1.png)
<br></br>

We will start writing the widget. The widget takes the box width, height, padding and radius as parameters.
<br></br>

```dart
class Tracking extends StatelessWidget {
  const Tracking({
    Key? key,
    required this.boxWidth,
    required this.boxHeight,
    required this.internalPadding,
    required this.borderRadius,
  }) : super(key: key);

  final double boxWidth;
  final double boxHeight;
  final double internalPadding;
  final double borderRadius;
```
<br></br>

Next we will write a function to calculate the ratio. This ratio will be used to make the component responsive. 

<br></br>

```dart
// Calculating aspect ratio based on width of our Figma design
  static double globalSize(double size, double width){
    // size is the size of the Widget in Figma file
    // width is the screen width of the device
    const int figBaseWidth = 360;

    double ratio = size/figBaseWidth;
    return ratio * width;
  }

```

<br></br>

We will use the device screen width to calculate the ratio which will make this Widget parameters responsive.

<br></br>

```dart
final width = globalSize(boxWidth, MediaQuery.of(context).size.width);
final height = globalSize(boxHeight, MediaQuery.of(context).size.width);
final padding = globalSize(internalPadding, MediaQuery.of(context).size.width);
```

<br></br>

Depending on the parameter calculated by our function, we will pass it in our widget to make it responsive.

<br></br>

```dart
return Container(
        width: width,
        height: height,
        decoration: BoxDecoration(
        color: const Color(0xfff4f5f5),
        borderRadius: BorderRadius.circular(borderRadius),
      ),
      child: Padding(
        padding: EdgeInsets.all(padding),
        child: Column(
          children: [
            Text(
              "Order tracking information  /",
              style: TextStyle(fontSize: (25 *padding/25)  ),
            ),
            SizedBox(height: padding * 2),
            Text(
              "Tracking ID : 21188289288",
              style: TextStyle(
                fontSize: (25 *padding/25),
                color: Colors.redAccent,
                fontWeight: FontWeight.bold,
              ),
            )
          ],
        ),
      ),
    );
    
  ```
  
  <br></br>
  ![flutterResponsiveComponent2.png](/posts/flutterResponsiveComponent2.png)
  <br></br>
  
  
  
  
    
