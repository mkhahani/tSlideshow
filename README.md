tSlideshow
==========
#### Tiny Javascript Slideshow ####

tSlideshow is a standalone & lightweight javascript slider brings a simple slideshow to your website. By tSlideshow you will be able to create photo, text or html slideshows with a simple slide effect. It is compatible with all major browsers (Opera, Firefox, Chrome & IE).

tSlideshow is free to use and publishes under the MIT license.

Features
--------
* Standalone (no JS framewok or third party library usage)
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

Live Demo
---------
* <a href="http://khahani.com/demo/tslideshow" target="_blank">Simple Image Slider</a>

Usage
-----
Use tSlideshow simply in two steps:

1. Add related JS and CSS files to your page:

        <link type="text/css" rel="stylesheet" href="tslideshow.css" />
        <script type="text/javascript" src="tslideshow.js"></script>

2. Run it by a line of code:

        new tSlideshow(elementID, pagination, autoPlay, startIndex);

The first parameter, `elementID`, is the ID of the inner container. Indeed the layout of tSlideshow consists of two nested containers, naturally `<div>` tag, and slides inside them. Slides would be any html tag such as `<img>`, `<div>`, `<p>`, `<span>` or `<li>`.

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

