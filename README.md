tSlideshow
==========
#### Tiny DHTML/Javascript Slideshow ####

tSlideshow is a standalone & lightweight javascript slider brings a simple slideshow to your website. By tSlideshow you will be able to create photo, text or html slideshows with an effect (i.e. fade or slide). It is compatible with all major browsers (Opera, Firefox, Chrome, Safari & IE).

tSlideshow is free and publishes under the MIT license.

Features
--------
* Standalone (no JS framewok or third party library usage)
* Incredibly lightweight with optimized source code (< 5kb)
* Full featured DHTML
* Compatible with all browsers
* Customizable using CSS
* Easy setup
* Multi instance support
* Configurable per instance
* 2 transition effects (i.e. fade, slide)
* Pagination support
* Support for image subtitles
* Pause & play functionality on mouse moves
* Free to use (MIT license)

Live Demo
---------
* <a href="http://mohsen.khahani.com/demo/tslideshow/sample.html" target="_blank">Simple Image Slider</a>

Usage
-----
Use tSlideshow simply in two steps:

1. Add related JS and CSS files to your page:

        <link type="text/css" rel="stylesheet" href="tslideshow.css" />
        <script type="text/javascript" src="tslideshow.js"></script>

2. Run it by a single line of code:

        new tSlideshow(elementID, options);

The first parameter, `elementID`, is the ID of the inner container. Indeed the layout of tSlideshow consists of two nested containers, usually `<div>` tags, and slides inside them. Slides would be any html tag such as `<img>`, `<div>`, `<p>`, `<span>` or `<li>`.

The second and optional parameter, `options`, configures the slideshow. Default options are as follow:
* **pagination** : Boolean [true, false] default to true
* **subtitles**  : Boolean [true, false] default to false
* **startIndex** : Integer default to 1 (Index of the start slide)
* **interval**   : Integer default to 5 (Time interval between slides transition in seconds)
* **duration**   : Integer default to 15 (Number of steps for a slide to be transformed)
* **effect**     : String ['fade', 'slide'] default to 'fade'

So you may change default options by setting global variable tSlideshowOptions that affects on all created slideshow instances:

    tSlideshowConfig.interval = 4;

Also you can pass desired options to slideshow. See the example below.

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
           <div id="slideshow1" class="tslideshow" style="height:250px">
             <img src="pics/slide-1.jpg" alt="Slide #1" />
             <img src="pics/slide-2.jpg" alt="Slide #2" />
             <img src="pics/slide-3.jpg" alt="Slide #3" />
             <img src="pics/slide-4.jpg" alt="Slide #4" />
             <img src="pics/slide-5.jpg" alt="Slide #5" />
           </div>
         </div>
      
       </div>
    </body>
      
    <script type="text/javascript">
       var options = {effect:'slide', pagination:false, duration:30};
       new tSlideshow('slideshow1', options);
    </script>
  
    </html>

In order to add subtitle to slides, set the subtitles option of the slideshow to true. The alt attribute of images is used as subtitle.

######Note:######
In the time of loading the page and just before the slideshow to be initialized, there is a delay which cause all images of the slideshow are seen on the page for a bit of second (depends on your Internet connection speed). The solution is to set the height of the slideshow manually. I hope I could add **image preloading** feature in the next version.