---
description: Why I choose Astro to create my new blog/portfolio.
public: true
layout: ../../layouts/BlogPost.astro
title: Astro Goodness
createdAt: 1663138523826
updatedAt: 1663138544071
tags:
  - Blog
heroImage: /posts/new-website0.png
slug: new-portfolio-website
---

A solid portfolio is nessasity for all in this day and age. And to design a solid portfolio the information that the portfolio presents shoud be well organized and detailed. This is why I have decided that it was time to upgrade my portfolio website to a blog + portfolio website. The blog will allow me to write details about the project and present it in a fashion taht is detailed and more readed friendly. It will also present me with the opportunity to write short fun blogs about random thing in my life that I find noteworthy like this piece about why I choose Astro to built the website.
<br></br>

![new-website1.png](/posts/new-website1.png)

<br></br>
You can clearly see in the above image, how much better I can present a project using a blog style portfolio. The image on the left is taken from my [old portfolio website](https://nazmussashrafi.netlify.app/).
<br></br>

Now, on to why I chose Astro to built the blog.
<br></br>

## Astro ships with no Javascript by default.

Astro has file based routing, components, and prop sending and much more of what is present in a modern Javascript framework all without the Javascript being shipped to the browser. This makes page loads super fast. There is no component sharing between pages but that is not nessasary for a blog page lke mine.

<br>
However my website needed Javascript like all modern websites do. To implement Javascript, Astro uses the island archtecture. This lets only the components that need the JS load in the JS. This means the JS is loaded only when we get down to that component and the component is visible on screen. Components only hydrate when they scroll into view and this make the page load superfast. This might be the future of web development and I am super excited about it!
<br></br>

## Built in markdown support

Markdown integration is out of the box with Astro. This means you can write beautifully decorated blogs without the headache of needing to add extentions or plugins.
Querying those mardown files what you have created for you blog is also extremely easy using the glob function provided by Astro. Defining blog component layout is possible and Astro also allows for blog tags which can be used to sort the blogs easily.

<br></br>

## Bring your own frameworks

Astro allows for React integration among many others. I needed to React and [react-three-fiber](https://github.com/pmndrs/react-three-fiber) to produce a 3d model on my landing page. This was no problem in Astro and it was even easy and smooth.

<br></br>
![new-website2.png](/posts/new-website2.png)
<br></br>

<!-- I’ve been sitting on a chair from Herman Miller called [Aeron Chair](https://amzn.to/3mzPwFZ) for more than 5 years now. You may know this chair because it’s so popular around the world. I bought it at Rakuten Ichiba. I was using a very cheap chair before buying it. I found myself not so tired since I switched to this chair. It’s so durable and hasn’t broken at all even after 5 years of use. So, I think it’s worth the price. Take care of your back.

![aaron_chair_2.jpeg](/posts/aaron-chair-by-herman-miller_aaron-chair-2-jpeg.jpeg) -->
