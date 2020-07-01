<image_headingcontent>
    <div class="visuallyhidden" aria-hidden="true" tabindex="-1">This is an image pattern.</div>
    <div class="animation_this word_count count_media" id="img_align_{opts.widgetId}" style="text-align:{opts.settings.alignment};height:100%; position: relative;">
        <img data-enlargable tabindex=0 id="{this.image_id}" src="{url}" style="{opts.settings.css}" alt="{opts.settings.alt}" />
        <div class="imageContent">
        </div>
    </div>
    <style>
        .imageContent h1{
            margin: 5px 0px 0 0;
            font-size: 14px;
        }
        .imageContent div {
            font-size: 12px;
            margin-bottom: 4px;
        }
        img {
            max-width: 100%;
        }
        
        .image-library-container ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .image-library-container ul li {
            margin: 0;
            padding: 0;
            display: inline-block;
        }
       
        .copyImageText {
            position: absolute;
            right: -13px;
            bottom: 0px;
            background-color: #fbfbfb;
            border-radius: 3px;
            font-size: 13px;
            cursor: pointer;
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            color: #000;
        }
        .copyImageText:hover {
             background-color: #05bfe8;
             color: #fff;
             transition: 0.5s ease;
             
        }
        .copyImageText i {
            display: block;
            width: 100%;
            height: 100%;
            line-height: 30px;
        }
        .hiddenText {
            opacity:0;
            position: absolute;
            top: 0;
        }
        /* alignment set */
      .verticalCenter{
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
      }
       
       
    </style>

    <script>
        this.image_id = opts.widgetId + "_img";
        if (typeof isScormPackage !== "undefined" && isScormPackage === true) this.url = '.' + opts.settings.url;
        if (typeof scormVer !== "undefined" && (scormVer == "scorm12" || scormVer == "scorm2004")) {
        this.url = opts.settings.url;
        } else {
        this.url = opts.settings.url;
        }
        this.on("mount", function () {
            if (opts.settings.alignment == "Vertical Center") {
                $("#img_align_" + opts.widgetId).addClass('verticalCenter');
            }else {
                $("#img_align_" + opts.widgetId).removeClass('verticalCenter');
            }
            var $parent = $("#" + opts.widgetId);
            $parent.find('.imageContent').append("<h1>".concat(opts.settings.heading, "</h1>"));
            $parent.find('.imageContent').append("<div>".concat(opts.settings.description, "</div>"));
        
        $("#".concat(opts.widgetId, "_img")).off("load").on("load", function () {//FixedLayout.fixWidgetRowHeight(opts.widgetId);
        });
        WidgetEvents.mounted(opts.widgetId);
        // add zoom out and zoom in
        if(opts.settings.imageZoomOut ==  true){
            $("#".concat(opts.widgetId, "_img")).addClass('img-enlargable').click(function () {
            var src = $(this).attr('src');
            $('<div>').css({
            background: 'RGBA(0,0,0,.5) url(' + src + ') no-repeat center',
            backgroundSize: 'contain',
            width: '100%',
            height: '100%',
            position: 'fixed',
            zIndex: '10000',
            top: '0',
            left: '0',
            cursor: 'zoom-out'
            }).click(function () {
            $(this).remove();
            }).appendTo('.editor');
        }); 
        }
        
        });
    </script>

</image_headingcontent>
