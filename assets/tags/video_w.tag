<video_w>
    <div class="visuallyhidden" aria-hidden="true" tabindex="-1">This is a video pattern.</div>
    <div class="animation_this word_count count_media" style="text-align:{opts.settings.alignment};">
        <video aria-label="video" id={video_id} style="object-fit: fill; {opts.settings.css}" controls controlsList="nodownload" autoplay={opts.settings.autoplay} loop={opts.settings.loop} muted={opts.settings.mute}  id="{newWidgetId}">
            <source src="{url}" type="video/mp4">
        </video>
        
    </div>
    </div>
    <style>
        video{
            max-width:100%;
            width:100%;
            height:100%;
        }
    </style>  
    <script>

this.video_id = opts.widgetId + "_video";
if (typeof isScormPackage !== "undefined" && isScormPackage === true) this.url = '.' + opts.settings.url;

if (typeof scormVer !== "undefined" && (scormVer == "scorm12" || scormVer == "scorm2004")) {
  this.url = opts.settings.url;
} else this.url = opts.settings.url;

this.on("mount", function () {
  $("#".concat(opts.widgetId, "_vdo")).off("load").on("load", function () {
    cl("Video loaded");
    FixedLayout.fixWidgetRowHeight(opts.widgetId);
  });
  WidgetEvents.mounted(opts.widgetId);

  if (typeof isPreviewPage != "undefined") {
    if (opts.settings.autoplay == "false") {
      var video = document.getElementById(this.video_id);
      video.pause();
    }
  }
});
    </script>


</video_w>