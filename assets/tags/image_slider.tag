<image_slider>
    <div class="visuallyhidden" aria-hidden="true" tabindex="-1">This is an image slider pattern.</div>

    <div id="{opts.widgetId}_slider" class="carousel slide animation_this word_count" data-ride="carousel">
        <!-- Indicators -->
        <ul class="carousel-indicators">
        </ul>

        <!-- The slideshow -->
        <div class="carousel-inner">
        </div>

        <!-- Left and right controls -->
        <a class="carousel-control-prev" aria-label="previous" tabindex=0 href="#{opts.widgetId}_slider" data-slide="prev">
            <span class="carousel-control-prev-icon"></span>
        </a>
        <a class="carousel-control-next" tabindex=0 aria-label="next" href="#{opts.widgetId}_slider" data-slide="next">
            <span class="carousel-control-next-icon"></span>
        </a>
    </div>

    <script>
this.on("mount", function () {
  var $parent = $("#" + opts.widgetId);
  opts.settings.slides.forEach(function (slide, index) {
    var url = "";
    if (typeof isScormPackage !== "undefined" && isScormPackage === true) url = '.' + slide.url;

    if (typeof scormVer !== "undefined" && (scormVer == "scorm12" || scormVer == "scorm2004")) {
      url = slide.url;
    } else url = slide.url;

    $parent.find(".carousel-inner").append("\n                    <div class=\"carousel-item ".concat(index == 0 ? 'active' : '', "\">\n                        <img src=\"").concat(url, "\" alt=\"Slider Image ").concat(index, "\" width=\"1100\" height=\"500\" tabindex=0>\n                        <div class=\"carousel-caption\">\n                            <p>\n                            ").concat(slide.caption, "\n                            </p>\n                        </div>\n                    </div>\n                "));
    $parent.find(".carousel-indicators").append("\n                    <li data-target=\"#".concat(opts.widgetId, "_slider\" data-slide-to=\"").concat(index, "\" class=\"").concat(index == 0 ? 'active' : '', "\"></li>\n                "));
  });
  var interval = opts.settings.autoplay ? parseInt(opts.settings.duration) : 9999999999;
  $parent.find('.slide').carousel({
    interval: interval,
    caption: opts.settings.caption
  });

  if (opts.settings.navigation) {
    $parent.find('.carousel-indicators').css('display', 'block');
  } else {
    $parent.find('.carousel-indicators').css('display', 'none');
  }

  if ($globalScope[opts.widgetId] == undefined) {
    FixedLayout.fixWidgetRowHeight(opts.widgetId);
  }

  WidgetEvents.mounted(opts.widgetId);
});
this.on("update", function () {});
    </script>

    <style>
        .carousel-indicators {
            text-align: center;
        }
        .carousel-indicators li {
            display: inline-block;
        }
    </style>
</image_slider>