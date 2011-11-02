/**
 *  tSlideshow - Tiny DHTML/Javascript Slideshow, v1.0
 *  © 2011 Mohsen Khahani
 *
 *  Licensed under the MIT license
 *  Created on June 10, 2011
 *
 *  http://mohsenkhahani.com/tslideshow
 */


/**
 *  Default Configuration
 */
var tSlideshowConfig = {
    pagination : true,
    autoPlay   : true,
    interval   : 5000,   /* Time interval for slide transition in milliseconds */
    duration   : 15      /* Number of steps for a slide to be transformed */
};


/**
 *  tSlideshow base Class
 */
function tSlideshow(elementID, pagination, autoPlay, startIndex) {
    if (!(this.slider = document.getElementById(elementID))) { return; }
    this.slides = this.slider.children;
    if (!(this.count = this.slides.length)) { this.slider = null; return; }
    this.currIdx = (this.slides[startIndex - 1]) ? startIndex - 1 : 0;
    this.timer = null;
    this.interval = tSlideshowConfig.interval;
    this.duration = tSlideshowConfig.duration;
    this.width = this.slider.clientWidth;
    this.playing = false;
    this.reset = false;
    this.skips = 0;

    var i;
    for (i = 0; i < this.count; i++) {
        this.slides[i].style.position = 'absolute';
        this.slides[i].style.left = this.width + 'px';
    }
    this.slides[this.currIdx].style.left = 0;

    if (typeof pagination === 'undefined') { pagination = tSlideshowConfig.pagination; }
    if (pagination) {
        this.pagination = this.getPagination();
        this.pagination.children[this.currIdx].className = 'current';
    }

    if (typeof autoPlay === 'undefined') { autoPlay = tSlideshowConfig.autoPlay; }
    if (autoPlay) {
        this.play(this.interval);
    }
}


/**
 *  Starts playing the slideshow
 */
tSlideshow.prototype.play = function (delay) {
    if (this.slider && this.count > 1 && !this.playing) {
        var _this = this;
        this.timer = setTimeout(function () { _this.next(); }, (delay || _this.interval));
        this.playing = true;
    }
};


/**
 *  Pauses the slideshow
 */
tSlideshow.prototype.pause = function () {
    clearTimeout(this.timer);
    this.reset = true;
    this.playing = false;
};


/**
 * Goes to the next slide
 */
tSlideshow.prototype.next = function () {
    var nextIndex = (this.currIdx === this.count - 1) ? 0 : this.currIdx + 1,
        interval = this.interval,
        duration = this.duration,
        start = this.width,
        effect = true,
        distanse;

    if (this.skips >= 1) {
        this.skips--;
    } else if (this.skips <= -1) {
        nextIndex = (this.currIdx === 0) ? this.count - 1 : this.currIdx - 1;
        start = -start;
        this.skips++;
    } 
    if (this.skips) {
        interval = 0;
        duration = 5;
        effect = false;
    }
    distanse = -start;

    if (this.pagination) {
        this.pagination.children[this.currIdx].className = '';
        this.pagination.children[nextIndex].className = 'current';
    }
    this.reset = false;
    this.transform(this.slides[nextIndex], start, distanse, interval, duration, effect, (this.skips !== 0 || this.playing));
    this.transform(this.slides[this.currIdx], 0, distanse, interval, duration, effect);
    this.currIdx = nextIndex;
};


/**
 *  Switches to the next slide with a simple slide effect
 */
tSlideshow.prototype.transform = function (slide, start, distance, interval, duration, effect, doCall) {
    var loop = 1,
        time = 1,
        _this = this;
    function nextFrame(newPos) {
        if (_this.reset) {
            slide.style.left = start - _this.width + 'px';
            return;
        }
        slide.style.left = newPos + 'px';
        if (loop <= duration) {
            time = loop;
            if (effect) {
                newPos = -distance * (time /= duration) * (time - 2) + start;
            } else {
                newPos = distance * loop / duration + start;
            }
            setTimeout(function () { nextFrame(Math.round(newPos)); }, 30);
            loop++;
        } else {
            if (doCall) {
                if (interval) {
                    _this.timer = setTimeout(function () { _this.next(); }, interval);
                } else {
                    _this.next();
                }
            }
        }
    }

    nextFrame(start);
};


/**
 *  Switches to selected slide index
 */
tSlideshow.prototype.goToSlide = function (span) {
    var index = span.id.replace(this.pagination.id, ''),
        _this;
    if (index != this.currIdx) {
        _this = this;
        this.reset = true;
        clearTimeout(this.timer);
        this.skips = index - this.currIdx;
        this.timer = setTimeout(function () { _this.next(); }, 50);
    }
};


/**
 *  Creates the pagination buttons
 */
tSlideshow.prototype.getPagination = function () {
    var pageBox = document.createElement('div'),
        span, i;
    pageBox.id = this.slider.id + '-pagination';
    pageBox.className = this.slider.className + '-pagination';
    for (i = 0; i < this.count; i++) {
        span = document.createElement('span');
        span.id = pageBox.id + i;
        span.innerHTML = '&nbsp;';
        this.addEvent(span);
        pageBox.appendChild(span);
    }
    this.slider.parentNode.appendChild(pageBox);
    return pageBox;
};


/**
 *  Adds click functionality to the pagination buttons
 */
tSlideshow.prototype.addEvent = function (el) {
    var _this = this;
    if (el.addEventListener) {
        el.addEventListener('click', function () { _this.goToSlide(el); }, false);
    } else {
        el.attachEvent('onclick', function () { _this.goToSlide(el); });
    }
};