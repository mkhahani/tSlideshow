/**
 * tSlideshow - Tiny DHTML/Javascript Slideshow, v1.1
 * © 2011-2013 Mohsen Khahani
 *
 * Licensed under the MIT license
 * Created on June 10, 2011
 *
 * v1.1  July 18, 2012
 *     - Added new fade effect
 *     - Added pause on mouse over
 *     - Added support for image subtitle
 *     - Added start index option
 *     - Many code improvements
 *
 * http://mohsenkhahani.ir/tslideshow
 */


/**
 * Default configuration
 */
var tSlideshowOptions = {
    pagination : true,
    subtitles  : false,
    startIndex : 1,      /* Index of the start slide */
    interval   : 5,      /* Time interval between slides transition in seconds */
    duration   : 15,     /* Number of steps for a slide to be transformed */
    effect     : 'fade'  /* The slider effect. Currently 2 effects are supported {slide, fade} */
}


/**
 * tSlideshow base class
 */
function tSlideshow(elementId, options) {
    var opts = tSlideshowOptions,
        pagination,
        start;

    options        = options || {};
    pagination     = (typeof options.pagination === 'undefined')? opts.pagination : options.pagination;
    start          = (typeof options.startIndex === 'undefined')? opts.startIndex : options.startIndex;
    this.subtitles = (typeof options.subtitles  === 'undefined')? opts.subtitles  : options.subtitles;
    this.duration  = (typeof options.duration   === 'undefined')? opts.duration   : options.duration;
    this.interval  = (typeof options.interval   === 'undefined')? opts.interval   : options.interval;
    this.effect    = (typeof options.effect     === 'undefined')? opts.effect     : options.effect;
    this.timer     = null;
    this.playing   = false;
    this.reset     = false;
    this.skips     = 0;

    this.init(elementId, pagination, start)
}


/**
 * Initiates the slideshow
 */
tSlideshow.prototype.init = function(id, pagination, start) {
    var self = this,
        i;

    if (document.readyState != 'complete') {
        setTimeout(function() { self.init(id, pagination, start); }, 100);
        return;
    }

    this.slider  = document.getElementById(id);
    this.slides  = this.slider.children;
    this.count   = this.slides.length;
    this.currIdx = (this.slides[start - 1]) ? start - 1 : 0;
    this.slider.style.height = this.slides[0].clientHeight + 'px';

    if (this.subtitles) {
        this.images = this.slider.getElementsByTagName('img');
        for (i = 0; i < this.count; i++) {
            this.images[i].alt = this.images[i].alt;
        }
        this.overlay = document.createElement('div');
        this.overlay.className = this.slider.className + '-subtitle';
        this.slider.parentNode.appendChild(this.overlay);
        this.overlay.innerHTML = this.images[this.currIdx].alt;
    }

    if (this.effect === 'slide') {
        this.hiddenState = this.slider.clientWidth;
        //this.hiddenState = -this.slider.clientWidth; (reverse direction)
        this.visibleState = 0;
    } else if (this.effect === 'fade') {
        this.hiddenState = 0;
        this.visibleState = 1;
    }

    for (i = 0; i < this.count; i++) {
        this.slides[i].style.display = 'none';
        this.slides[i].style.position = 'absolute';
        this.setAttrib(this.slides[i], -this.hiddenState);
        //this.slides[i].style.left = '0'; // for chrome
    }
    this.slides[this.currIdx].style.display = '';
    this.setAttrib(this.slides[this.currIdx], this.visibleState);

    if (typeof pagination === 'undefined') { pagination = tSlideshowOptions.pagination; }
    if (pagination) {
        this.pager = this.getPagination();
        this.pager.children[this.currIdx].className = 'current';
    }

    this.play();
    this.addHoverEvent(this.slider);
}


/**
 * Starts playing the slideshow
 */
tSlideshow.prototype.play = function() {
    if (this.slider && this.count > 1 && !this.playing) {
        var self = this;
        this.reset = true;
        this.timer = setTimeout(function() { self.next(); }, (self.interval * 1000));
        this.playing = true;
    }
};


/**
 * Pauses the slideshow
 */
tSlideshow.prototype.pause = function() {
    clearTimeout(this.timer);
    this.playing = false;
};


/**
 * Goes to the next slide
 */
tSlideshow.prototype.next = function() {
    var nextIndex = (this.currIdx === this.count - 1) ? 0 : this.currIdx + 1,
        start1 = this.visibleState,
        start2 = this.hiddenState,
        move1, move2;

    if (this.skips) {
        if (this.effect === 'slide' && this.skips < 0) {
            start2 = -start2;
        } 
        nextIndex = this.currIdx + this.skips;
        this.skips = 0;
    }

    if (this.effect === 'slide') {
        move1 = move2 = -start2;
    } else if (this.effect === 'fade') {
        move1 = -(move2 = start1);
    }

    if (this.pager) {
        this.pager.children[this.currIdx].className = '';
        this.pager.children[nextIndex].className = 'current';
    }
    this.reset = false;

    this.slides[nextIndex].style.display = '';
    this.transform(this.slides[this.currIdx], start1, move1); // Disappears
    this.transform(this.slides[nextIndex], start2, move2, true); // Appears
    this.currIdx = nextIndex;
    if (this.overlay) {
        this.overlay.innerHTML = this.images[this.currIdx].alt;
    }
};


/**
 * Switches to the next slide with givven effect
 */
tSlideshow.prototype.transform = function(slide, start, movement, doCall) {
    var interval = this.interval,
        duration = this.duration,
        loop = 1,
        time = 1,
        self = this;
    function nextFrame(newPos) {
        if (self.reset) {
            if (self.effect === 'slide') {
                slide.style.left = start - self.hiddenState + 'px';
            } else if (self.effect === 'fade') {
                var value = self.visibleState - start;
                slide.style.opacity = value;
                slide.style.filter = 'alpha(opacity=' + value * 100 +')';
            }
            return;
        }
        self.setAttrib(slide, newPos);
        if (loop <= duration) {
            time = loop;
            newPos = -movement * (time /= duration) * (time - 2) + start;
            //setTimeout(function() { nextFrame(Math.round(newPos)); }, 30);
            setTimeout(function() { nextFrame(newPos); }, 30);
            loop++;
        } else {
            if (doCall && self.playing) {
                self.timer = setTimeout(function() { self.next(); }, interval * 1000);
            } else if (!doCall) {
                slide.style.display = 'none';
            }
        }
    }

    nextFrame(start);
};


/**
 * Switches to the selected slide index
 */
tSlideshow.prototype.goToSlide = function(span) {
    var index = span.id.replace(this.pager.id, ''),
        self;
    if (index != this.currIdx) {
        self = this;
        this.reset = true;
        clearTimeout(this.timer);
        this.skips = index - this.currIdx;
        this.timer = setTimeout(function() { self.next(); }, 50);
    }
};


/**
 * Creates the pagination buttons
 */
tSlideshow.prototype.getPagination = function() {
    var pageBox = document.createElement('div'),
        span, i;
    pageBox.id = this.slider.id + '_pagination';
    pageBox.className = this.slider.className + '-pagination';
    for (i = 0; i < this.count; i++) {
        span = document.createElement('span');
        span.id = pageBox.id + i;
        span.innerHTML = '&nbsp;';
        this.addClickEvent(span);
        pageBox.appendChild(span);
    }
    this.slider.parentNode.appendChild(pageBox);
    return pageBox;
};


/**
 * Adds click functionality to the pagination buttons
 */
tSlideshow.prototype.addClickEvent = function(el) {
    var self = this;
    if (el.addEventListener) {
        el.addEventListener('click', function() { self.goToSlide(el); }, false);
    } else {
        el.attachEvent('onclick', function() { self.goToSlide(el); });
    }
};


/**
 * Adds pause & play functionality on mouse move
 */
tSlideshow.prototype.addHoverEvent = function(el) {
    var self = this;
    if (el.addEventListener) {
        el.addEventListener('mouseover', function() { self.pause(); }, false);
        el.addEventListener('mouseout', function() { self.play(); }, false);
    } else {
        el.attachEvent('onmouseover', function() { self.pause(); });
        el.attachEvent('onmouseout', function() { self.play(); });
    }
};


/**
 * Changes related style to simulate the effect
 */
tSlideshow.prototype.setAttrib = function(el, value) {
    switch (this.effect) {
        case 'slide':
            el.style.left = value + 'px';
            break;
        case 'fade':
            el.style.opacity = value;
            el.style.filter = 'alpha(opacity=' + value * 100 +')';
            break;
    }
};