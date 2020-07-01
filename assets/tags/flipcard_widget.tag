<flipcard_widget>
    <div class="visuallyhidden" aria-hidden="true" tabindex="-1">This is a flipcard pattern.</div>

    <div style="text-align:{opts.settings.alignment};height:100%;" class="flip-card animation_this word_count">
        <div class="flip-card-inner" style="{opts.settings.css}">
            <div class="flip-card-front">
                <img tabindex=0 src="{url}" style="{opts.settings.css}" alt="{opts.settings.alt}" />
            </div>
            <div class="flip-card-back" style="background-color: {opts.settings.backdropColor}">
                <div tabindex=0>
                </div>
            </div>
        </div>
    </div>

    <style>
        img {
            max-width: 100%;
        }
        
        .flip-card {
            margin: 0 auto;
            background-color: transparent;
            perspective: 1000px;
            /* Remove this if you don't want the 3D effect */
        }
        /* This container is needed to position the front and back side */
        
        .flip-card-inner {
            position: relative;
            height: 100%;
            text-align: center;
            transition: transform 0.8s;
            transform-style: preserve-3d;
        }
        /* Do an horizontal flip when you move the mouse over the flip box container */
        
        .flip-card:hover .flip-card-inner {
            transform: perspective(0px) rotateY(180deg);
        }
		.flip-card:hover .flip-card-back{
			backface-visibility: visible;
		}
        /* Position the front and back side */
        
        .flip-card-front,
        .flip-card-back {
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            background-color: beige;
        }
        /* Style the front side (fallback if image is missing) */
        
        .flip-card-front {
            background-color: transparent;
            color: black;
        }
        /* Style the back side */
        
        .flip-card-back {
            height: 100%;
            text-align: center;
            position: absolute;
            top: 0;
            background-color: dodgerblue;
            color: white;
            transform: perspective(0px) rotateY(180deg);
            overflow-y: auto;
        }
    </style>

    <script>
if (typeof isScormPackage !== "undefined" && isScormPackage === true) this.url = '.' + opts.settings.url;

if (typeof scormVer !== "undefined" && (scormVer == "scorm12" || scormVer == "scorm2004")) {
  this.url = opts.settings.url;
} else this.url = opts.settings.url;

this.on("mount", function () {
  var $parent = $("#" + opts.widgetId);
  $parent.find('.flip-card-back').append("<div>".concat(opts.settings.title, "</div>"));
  $parent.find('.flip-card-back').append("<div>".concat(opts.settings.description, "</div>"));

  if ($globalScope[opts.widgetId] == undefined) {
    FixedLayout.fixWidgetRowHeight(opts.widgetId);
  }

  WidgetEvents.mounted(opts.widgetId);
});
    </script>

</flipcard_widget>