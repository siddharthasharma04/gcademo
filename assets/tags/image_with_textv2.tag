<image_with_textv2>
    <div class="visuallyhidden" aria-hidden="true" tabindex="-1">This is an image with text pattern.</div>
    <div></div>
    <div class="iwt_widget_demo animation_this word_count">
        <div class="iwt_widget_wrapper" style="">
            <img src="{url}" alt="image" class="iwt_widget_image" />
        </div>
    </div>
   <style>
   
   </style> 
    <script>
if (typeof isScormPackage !== "undefined" && isScormPackage === true) this.url = '.' + $courseJson.courseDirPath + opts.settings.image_url;

if (typeof scormVer !== "undefined" && (scormVer == "scorm12" || scormVer == "scorm2004")) {
  this.url = $courseJson.courseDirPath + opts.settings.image_url;
} else if (typeof trivPrevPage !== "undefined") {
  this.url = opts.settings.image_url;
} else this.url = $courseJson.courseDirPath + opts.settings.image_url;

this.on("mount", function () {
  var $parent = $("#" + opts.widgetId);
  $parent.closest('.gridCol').addClass('gridRemove')
  var iwtTextHeaderHeight = 0;

  if (opts.settings.texts) {
    opts.settings.texts.forEach(function (item) {
      if (item === null) return;
      if (item.shapetype == 'circle') {
        $parent.find(".iwt_widget_wrapper").append("\n                    <div data-id='".concat(item.id, "' class='iwt_text text-center iwt_circle' draggable=\"true\" \n                        style=\"background-color:").concat(item.shapeBackgroundColor, ";border:1px solid ").concat(item.shapeBorderColor, ";border-radius:50%;width:").concat(parseInt(item.width), "%;height:").concat(parseInt(item.height), "%;\n                        left:").concat(parseInt(item.left), "%; top:calc(").concat(parseInt(item.top), "% + ").concat(iwtTextHeaderHeight, "px); word-break: break-word;\">\n                        ").concat(item.html, "\n                    </div>\n                "));
      } else if (item.shapetype == 'image') {
        $parent.find(".iwt_widget_wrapper").append("\n                    <div data-id='".concat(item.id, "' class='iwt_text' draggable=\"true\" style=\"width:").concat(item.width, "%;height:").concat(item.height, "%; left:").concat(parseInt(item.left), "%; top:calc(").concat(parseInt(item.top), "% + ").concat(iwtTextHeaderHeight, "px)\">\n                        ").concat(item.html, "\n                    </div>\n                "));
      } else {
        $parent.find(".iwt_widget_wrapper").append("\n                    <div data-id='".concat(item.id, "' class='iwt_text' draggable=\"true\" \n                        style=\"border:1px solid ").concat(item.shapeBorderColor, ";background-color:").concat(item.shapeBackgroundColor, ";width:").concat(parseInt(item.width), "%;height:").concat(parseInt(item.height), "%;\n                        left:").concat(parseInt(item.left), "%; top:calc(").concat(parseInt(item.top), "% + ").concat(iwtTextHeaderHeight, "px); overflow-y: auto; word-break:break-word;\">\n                       ").concat(item.html, "\n                    </div>\n                "));
      }
    });
  }

  if ($globalScope[opts.widgetId] == undefined) {
    FixedLayout.fixWidgetRowHeight(opts.widgetId);
  }

  WidgetEvents.mounted(opts.widgetId);
});
    </script>

    <style>
   
    .iwt_widget_demo{
          height: 100%;
      }
      .iwt_image {
          width:100%;
          overflow:hidden;
      }

      .iwt_text {
          position: absolute;
          resize: none;
          background-color: transparent;
          border: 0px;
      }
      .iwt_circle {
          width:200px;
          height:200px;
          border-radius:100px;
          border:1px solid #fff;
          overflow-y: auto;
          overflow-x: hidden;
          margin: 0 auto;
          padding: 0;
          font-weight:normal;
      }
      .iwt_rectangle {
          width:200px;
          height:200px;
          border-radius:100px;
          border:1px solid #fff;
      }
      .iwt_widget_wrapper {
          position: relative;
          display: block;
          overflow: hidden;
          font-size:24px;
          height:100%;
      }
      .iwt_widget_image{
          border:0!important;
          width: 100%;
      }
      .iwt_text p {
          margin-bottom: 0;
      }
      .iwt_circle div, .iwt_text div{
          font-size: 0.85rem;
      }  


    </style>

</image_with_textv2>