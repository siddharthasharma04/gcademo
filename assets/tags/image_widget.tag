<image_widget>
    <div class="visuallyhidden" aria-hidden="true" tabindex='-1'>This is an image pattern.</div>

    <div class="animation_this word_count count_media" id="img_align_{opts.widgetId}" style="text-align:{opts.settings.alignment};height:100%; position: relative;">
        <img data-enlargable tabindex="0" id="{this.image_id}" src="{url}" style="{opts.settings.css}" alt="{opts.settings.alt}" />
        <!--  <div id="mainOcr">
            <div class="hiddendiv">
            </div>
            <span class="inline-block copy-link copyImageText" id="copyImageText" title="copy" >
                <i class="fa fa-clone"></i>
            </span>
        </div>  -->
        <div id="imagezoom_{opts.widgetId}">
        </div>
    </div>
    <style>
   
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
		} 
    else {
			$("#img_align_" + opts.widgetId).removeClass('verticalCenter');
		}
  
  //   var $parent = $("#" + opts.widgetId);
  //   var copyImage = opts.widgetId + "_copyImg";
  // OCR Functionality
  //  const worker = Tesseract.createWorker();
  //    Tesseract.setLogging(false);
  //  work();
  //  async function work() {
  //    await worker.load();
  //   await worker.loadLanguage('eng');
  //   await worker.initialize('eng');
  //   imageText = await worker.detect(opts.settings.url);
  ///    imageText = await worker.recognize(opts.settings.url);
  //  $parent.find(".hiddendiv").append(`<input type="text"  class="hiddenText"  value="${imageText.data.text}" id="${copyImage}" /> `)
  //    await worker.terminate();
  //    }
  // Copy Text 
  // $parent.find('.copyImageText').click(function(){
  ///     var copyText1 = document.getElementById(copyImage);
  //     copyText1.select();
  //     document.execCommand("copy");
  //     displayNotification("Image Text copied successfully", 'success');
  //     console.log("Image Text copied successfully");
  // }); 
  $("#".concat(opts.widgetId, "_img")).off("load").on("load", function () {//FixedLayout.fixWidgetRowHeight(opts.widgetId);
  });
  WidgetEvents.mounted(opts.widgetId);
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
  
  
  //  preview and package
  // if(typeof isPreviewPage != "undefined"){
  //  $('#mainOcr').attr('style', 'display: none !important');
  //   }   
  //  if (typeof isVendorPage != "undefined"){
  //      $('#mainOcr').attr('style', 'display: none !important');
  //  }   
});
    </script>

</image_widget>