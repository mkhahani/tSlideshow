tSlideshow
==========
#### Tiny Javascript Slideshow ####

tSlideshow is a standalone & lightweight javascript slider brings a simple slideshow to your website.

tSlideshow is full featured DHTML anables you to create photo, text or html slideshows with a simple slide effect. It is based on XHTML 1.0 and is compatible with all major browsers (Opera, Firefox, Chrome & IE).

tSlideshow is free for personal or commerical use and publishes under the MIT license.

Features
--------
* Standalone (no usage of JS framewoks such as prototype, jquery, mootools, ...)
* Incredibly lightweight with optimized source code (< 3kb)
* Full featured DHTML
* Compatible with all browsers
* Customizable using CSS
* Easy setup
* Pagination
* Simple slide transition effect
* Multi instance support
* Configurable per instanse
* Free to use (MIT license)

### Live Demo ###
http://khahani.com/demo/tslideshow

Usage
-----
Simply use tSlideshow in two steps
1- Add related JS and CSS files to your page:
    <link type="text/css" rel="stylesheet" href="tslideshow.css" />
    <script type="text/javascript" src="tslideshow.js"></script>

2- Run it by a line of code:
    new tSlideshow(elementID, pagination, autoPlay, startIndex);

The first parameter, `elementID`, is the ID of the inner container. Indeed tSlideshow layout consists of two nested containers, naturally `<div>` tag, and slides inside them. Slides can be any html tag such as `<img>`, `<div>`, `<p>`, `<span>` or `<li>`.

The function also takes three optional parameters, the boolean `pagination` & `autoPlay` and the integer `startIndex`. tSlideshow profits two useful functions, `play` & `pause`. In addition you can set playing `interval` manually.

Example
-------
<html lang="en">
<head>
   <link type="text/css" rel="stylesheet" href="tslideshow.css" />
   <script type="text/javascript" src="tslideshow.js"></script>
</head>
<body>
   <div id="container">
  
     <div class="tslideshow-container">
       <div id="slideshow1" class="tslideshow" style="width:500px; height:250px">
         <img src="pics/slide-1.jpg" />
         <img src="pics/slide-2.jpg" />
         <img src="pics/slide-3.jpg" />
         <img src="pics/slide-4.jpg" />
         <img src="pics/slide-5.jpg" />
       </div>
     </div>
  
   </div>
</body>
  
<script type="text/javascript">
   tSlideshowConfig.interval = 4000;
   s = new tSlideshow('slideshow1', true, false);
   s.play(5000);
</script>
  
</html>