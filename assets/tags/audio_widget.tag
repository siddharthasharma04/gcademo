<audio_widget>
  <div class="visuallyhidden" aria-hidden="true" tabindex="-1">This is an audio pattern.</div>
  <div class="animation_this word_count count_media" id='audio_align_{opts.widgetId}'  style="text-align:{opts.settings.alignment};height:40px;">
        <audio id="audio_id_{opts.widgetId}" class="audio-widget" style="height:40px;" controls controlsList="nodownload" autoplay={opts.settings.autoplay} loop={opts.settings.loop} muted={opts.settings.mute} style="{opts.settings.css}">      
          <source src="{url}" type="audio/mpeg">
        </audio>
  </div>
	<style>
	.audio-widget{
	  width: 100%;
	  height: 100%;
	}
  .audioVerticalCenter {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
   }
	</style>
   
  <script>
this.audio_id = "audio_id_"+opts.widgetId;
if (typeof isScormPackage !== "undefined" && isScormPackage === true) this.url = '.' + opts.settings.url;

if (typeof scormVer !== "undefined" && (scormVer == "scorm12" || scormVer == "scorm2004")) {
  this.url = opts.settings.url;
} else this.url = opts.settings.url;

this.on("mount", function () {
  if ($globalScope[opts.widgetId] == undefined) {
    FixedLayout.fixWidgetRowHeight(opts.widgetId);
  }

    if (opts.settings.alignment == "Vertical Center") {
			$("#audio_align_" + opts.widgetId).addClass('audioVerticalCenter');
		} 
    else {
			$("#audio_align_" + opts.widgetId).removeClass('audioVerticalCenter');
    }
    
    WidgetEvents.mounted(opts.widgetId);
    // console.log(opts.settings);
    // console.log(this.audio_id);
    if (typeof isPreviewPage != "undefined") {
      if (opts.settings.autoplay == "false") {
        var audio = document.getElementById(this.audio_id);
        audio.pause();
      }
    }
}); 
  </script>

</audio_widget>