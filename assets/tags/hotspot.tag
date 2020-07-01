<hotspot>
    <div class="visuallyhidden" aria-hidden="true" tabindex="-1">This is a hotspot pattern.</div>

    <div class="hotspot_widget_demo animation_this  word_count">
        <div class="hotspot_widget_wrapper">
            <img src="{url}" alt="Hotspot image" class="hotspot_widget_image" />
        </div>
        <div class="hotspot_text">
        </div>
    </div>
    
    <script>
if (typeof isScormPackage !== "undefined" && isScormPackage === true) this.url = '.' + $courseJson.courseDirPath + opts.settings.image_url;

if (typeof scormVer !== "undefined" && (scormVer == "scorm12" || scormVer == "scorm2004")) {
  this.url = $courseJson.courseDirPath + opts.settings.image_url;
} else if (typeof trivPrevPage !== "undefined") {
  this.url = opts.settings.image_url;
} else this.url = $courseJson.courseDirPath + opts.settings.image_url;

this.on("mount", function () {
  var $parent = $("#" + opts.widgetId);
  opts.settings.spots.forEach(function (item) {
    if (item === null) return;
    $parent.find(".hotspot_widget_wrapper").append("\n                    <div tabindex=0 aria-label=\"hotspot\" class='spot' id='".concat(item.id, "' style=\"left: ").concat(item.left, "%; top: ").concat(item.top, "%\">\n                    </div>\n                "));
  });
  $parent.find(".hotspot_widget_demo").on("click", ".spot", function (ev) {
    if ($(ev.target).hasClass("spot_cross")) return;
    $parent.find('.selected_spot').removeClass("selected_spot");
    $(this).addClass("selected_spot");
    $parent.find(".hotspot_text").html('');
    var spotId = $(this).attr("id");
    $parent.find(".hotspot_text").html(opts.settings.spots[spotId].html);
    $parent.find(".hotspot_text").attr("data-spotid", spotId);
  });

  if ($globalScope[opts.widgetId] == undefined) {
    FixedLayout.fixWidgetRowHeight(opts.widgetId);
  }

  WidgetEvents.mounted(opts.widgetId);
});

    </script>

    <style>
        .hotspot_image {
            width:100%
        }

        .hotspot_widget_wrapper {
            position: relative;
        }
        
        .spot {
            width: 17px;
            height: 17px;
            border-radius: 10px;
            border: 1px dashed #928888;
            margin-left: -9px;
            margin-top: -9px;
            position: absolute;
            background-color: white;
            cursor: pointer;
        }

        .spot:hover .spot_cross {
            display: inline-block;
        }

        .spot:before {
            content: '';
            left: 5px;
            position: relative;
            top: 5px;
            width: 6px;
            height: 6px;
            display: block;
            border: 1px solid #796a6a96;
            border-radius: 8px;
        }

        #hotspot_text {
            width: 65%;
        }

        #hotspot_text, .hotspot_text {
            height: 100px;
            border: 1px solid #b8c4c7;
            padding: 7px;
            overflow: auto;
            font-size: 14px;
            text-align: justify;
        }

        .spot.selected_spot {
            background-color: #555;
        }

        .spot_cross {
            display: none;
            margin-top: -17px;
            position: absolute;
            margin-left: 12px;
            font-size: 14px;
            color: #484848;
        }

        .hotspot_widget_image {
            width: 100%;
        }
    </style>

</hotspot>