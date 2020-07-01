<document_selection>
    <div class="visuallyhidden" aria-hidden="true" tabindex="-1">This is a document selection pattern.</div>

    <div id="{opts.widgetId}_slider" class="document_select animation_this word_count">
        <p class="text_head" tabindex="0">{opts.settings.doc_heading}</p>
        <!-- Indicators -->
        <!-- The slideshow -->
        <div class="document-content row" tabindex="0">
        </div>
    </div>

    <Style>
        .document-widget .bottom_para {
            padding: 20px;
        }
        
        .circle_pdf {
            width: 52%;
            ;
            position: absolute;
            height: 52%;
            background: #000;
            border-radius: 100%;
            margin: 0 auto;
            text-align: center;
            left: 50%;
            transform: translate(-50%, 0);
            top: -34px;
            overflow: hidden;
            background-size: cover !important;
            background-repeat: no-repeat !important;
        }
        
        .document-content .block_section {
            position: relative;
            height: 100px;
            background: #fff;
            border-radius: 4px;
            box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.50);
        }
        
        .text_document p {
            color: #0a94b3;
            padding: 49px 15px 10px;
            font-size: 13px;
            word-break: break-all;
            text-align: center;
            padding: 20px;
        }
        
        .document_select {
            padding: 20px 0;
        }
        
        .document_select p {
            padding: 20px 0;
        }
        
        .document-content .outer_pdf {
            width: 126px;
            float: left;
            margin: 23px;
        }
        
        .text_document {
            padding: 19px 5px;
        }
        
        .text_document p {
            display: -webkit-box;
            max-width: 400px;
            height: 61.2px;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 1.525;
        }
    </Style>

    <script>
this.on("mount", function () {
  var $parent = $("#" + opts.widgetId);
  opts.settings.slides.forEach(function (slide, index, pdfUrl) {
    var docURL = opts.settings.pdfUrl[index];
    var styleImgUrl = slide.url;

    if (typeof isScormPackage !== "undefined" && isScormPackage === true) {
      if (typeof scormVer !== "undefined" && (scormVer == "scorm12" || scormVer == "scorm2004")) {
        docURL = opts.settings.pdfUrl[index];
        styleImgUrl = slide.url;
      }
    }

    $parent.find(".document-content").append("\n                     <div class=\"outer_pdf\">\n                     <div class=\"block_section\">\n                     <div class=\"circle_pdf\" Style=\"background:url('".concat(styleImgUrl, "')\">\n                      </div>  \n                        <div class=\"text_document\">\n                            <p>\n                               <a href=\"").concat(docURL, "\" target=\"_blank\"> ").concat(slide.caption, "</a>\n                            </p>\n                        </div>\n                          </div>\n                     </div>\n                "));
  });

  if ($globalScope[opts.widgetId] == undefined) {
    FixedLayout.fixWidgetRowHeight(opts.widgetId);
  }

  WidgetEvents.mounted(opts.widgetId);
});
this.on("update", function () {});
    </script>


</document_selection>