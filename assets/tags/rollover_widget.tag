<rollover_widget>

    <div class="visuallyhidden" aria-hidden="true" tabindex="-1">This is a roll over pattern.</div>

    <div class="img-comp-container animation_this word_count" style="width: 400px; height: 300px;">
        <div class="img-comp-img">
            <img src="{url0}" width="{opts.settings.width}" height="{opts.settings.height}" alt="{opts.settings.alt}" />
        </div>
        <div class="img-comp-img img-comp-overlay overlay-{opts.widgetId}">
            <img src="{url1}" width="{opts.settings.width}" height="{opts.settings.height}" alt="{opts.settings.alt}">
        </div>
    </div>

<style>

* {box-sizing: border-box;}

.img-comp-container {
  position: relative;
  height: 200px; /*should be the same height as the images*/
}

.img-comp-img {
  position: absolute;
  width: auto;
  height: auto;
  overflow:hidden;
}

.img-comp-img img {
  display:block;
  vertical-align:middle;
  max-width: inherit;
  height: -webkit-fill-available;
}

.img-comp-slider {
  position: absolute;
  z-index:9;
  cursor: ew-resize;
  /*set the appearance of the slider:*/
  width: 40px;
  height: 40px;
  background-color: #2196F3;
  opacity: 0.7;
  border-radius: 50%;
  top: calc(50% - 20px) !important;
  padding: 10px 10px;
}

.img-comp-img img:hover {
  filter: none;
}

.img-comp-slider .fa-arrows-h {
  color: #fff;
  font-size: 20px;
}

</style>


<script>
if (typeof isScormPackage !== "undefined" && isScormPackage === true) {
  this.url0 = '.' + opts.settings.images[0];
  this.url1 = '.' + opts.settings.images[1];

  if (typeof scormVer !== "undefined" && (scormVer == "scorm12" || scormVer == "scorm2004")) {
    this.url0 = opts.settings.images[0];
    this.url1 = opts.settings.images[1];
  }
} else {
  this.url0 = opts.settings.images[0];
  this.url1 = opts.settings.images[1];
}

function initComparisons() {
  var x, i;
  /*find all elements with an "overlay" class:*/

  x = document.getElementsByClassName("overlay-" + opts.widgetId);

  for (i = 0; i < x.length; i++) {
    /*once for each "overlay" element:
    pass the "overlay" element as a parameter when executing the compareImages function:*/
    compareImages(x[i]);
  }

  function compareImages(img) {
    var slider,
        img,
        clicked = 0,
        w,
        h;
    /*get the width and height of the img element*/

    w = img.offsetWidth;
    h = img.offsetHeight;
    /*set the width of the img element to 50%:*/

    img.style.width = w / 2 + "px";
    /*create slider:*/

    slider = document.createElement("DIV");
    slider.setAttribute("class", "img-comp-slider");
    /*insert slider*/

    img.parentElement.insertBefore(slider, img);
    /*create arrow icon:*/

    slidericon = document.createElement("i");
    slidericon.setAttribute("class", "fa fa-arrows-h");
    /*insert arrow icon*/

    slider.appendChild(slidericon, slider);
    /*position the slider in the middle:*/

    slider.style.top = h / 2 - slider.offsetHeight / 2 + "px";
    slider.style.left = w / 2 - slider.offsetWidth / 2 + "px";
    /*execute a function when the mouse button is pressed:*/

    slider.addEventListener("mousedown", slideReady);
    /*and another function when the mouse button is released:*/

    window.addEventListener("mouseup", slideFinish);
    /*or touched (for touch screens:*/

    slider.addEventListener("touchstart", slideReady);
    /*and released (for touch screens:*/

    window.addEventListener("touchstop", slideFinish);

    function slideReady(e) {
      /*prevent any other actions that may occur when moving over the image:*/
      e.preventDefault();
      /*the slider is now clicked and ready to move:*/

      clicked = 1;
      /*execute a function when the slider is moved:*/

      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }

    function slideFinish() {
      /*the slider is no longer clicked:*/
      clicked = 0;
    }

    function slideMove(e) {
      var pos;
      /*if the slider is no longer clicked, exit this function:*/

      if (clicked == 0) return false;
      /*get the cursor's x position:*/

      pos = getCursorPos(e);
      /*prevent the slider from being positioned outside the image:*/

      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      /*execute a function that will resize the overlay image according to the cursor:*/

      slide(pos);
    }

    function getCursorPos(e) {
      var a,
          x = 0;
      e = e || window.event;
      /*get the x positions of the image:*/

      a = img.getBoundingClientRect();
      /*calculate the cursor's x coordinate, relative to the image:*/

      x = e.pageX - a.left;
      /*consider any page scrolling:*/

      x = x - window.pageXOffset;
      return x;
    }

    function slide(x) {
      /*resize the image:*/
      img.style.width = x + "px";
      /*position the slider:*/

      slider.style.left = img.offsetWidth - slider.offsetWidth / 2 + "px";
    }
  }
}

this.editor_id = opts.widgetId + "_editor";
this.on("mount", function () {
  initComparisons();
  WidgetEvents.mounted(opts.widgetId);
});
</script>


</rollover_widget>