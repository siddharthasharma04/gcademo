<button_widget2>
    <div class="visuallyhidden" aria-hidden="true" tabindex='-1'>This is a button pattern.</div>
    <div class="button-align animation_this word_count" style="text-align:{opts.settings.align}">
        <!--  <input type="button" class="formBtn yesBtn" value="{opts.settings.name}" refs="button" id="button_widget_{opts.widgetId}" target="{opts.settings.target}"/>  -->
        <a href="#" tabindex="0" id="button_widget_{opts.widgetId}" class="posRel buttonParent" data-action="{opts.settings.selectbox}" target="{opts.settings.target}">
            <div id="button_{opts.widgetId}"></div>
            <div id="buttonImg_{opts.widgetId}"></div>
        </a>
    </div>


    <!-- The Modal -->
    <!--  <div class="modal " id="buttonwidgetModal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content modalContent">
                <div class="modal-header modalHeader">
                    <h5 class="modal-title popuptitle">{opts.settings.popuptitle}</h5>
                    <button type="button" class="close modalClose" data-dismiss="modal" aria-label="Close">
                        
                        <span class="modalCloseIcon"></span>
                        <span class="modalCloseIcon"></span>

                    </button>
                </div>
                <div class="modal-body modalBody popupcontent">
                    
                </div>
                <div class="modal-footer modalFooter">
                    <button class="modalBtn cancelBtn" onclick='$("#buttonwidgetModal").modal("hide")'>Ok</button>
                </div>
            </div>
        </div>
    </div>  -->


    <style>
        .button-align {
            padding: 10px 0;
        }
        
        .buttonText:hover:before {
            content: none;
        }
        
        .btnHoverAnimation {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 0;
            z-index: -1;
            -webkit-transition: 0.5s ease;
            -moz-transition: 0.5s ease;
            -ms-transition: 0.5s ease;
            transition: 0.5s ease;
        }
        
        .buttonParent:hover .btnHoverAnimation {
            width: 100%;
        }
        
        button_widget2 strong {
            font-weight: bold!important;
        }
    </style>
    <script>
this.on("mount", function (e) {
  var url, name, page, nextval, prevval, chapterid, specificwidgetid, popuptitle, popupcontent, pagepo, chapteridpo;
  url = opts.settings.url;
  name = opts.settings.name;
  page = opts.settings.specifipage;
  nextval = opts.settings.nextval;
  prevval = opts.settings.prevval;
  chapterid = opts.settings.specifichapterid;
  specificwidgetid = opts.settings.specificwidget;
  popuptitle = opts.settings.popuptitle; //popupcontent = opts.settings.popupcontent;

  pagepo = opts.settings.specifipagepopup;
  chapteridpo = opts.settings.specifichapteridpopup;
  var def_ButtonColor = opts.settings.buttonColor;
  var def_ButtonHoverColor = opts.settings.buttonColorHover;
  var def_BorderColor = opts.settings.buttonBorder;
  var checkExistence = false;

  if ($courseJson.globalSettings.hasOwnProperty("custom_setting_widgets")) {
	checkExistence =  $courseJson.globalSettings.custom_setting_widgets.indexOf(opts.id) !== -1;
  }

  if ($courseJson.globalSettings.is_btn_setting_changed != "false" && !checkExistence) {
    def_ButtonColor = $courseJson.globalSettings.primary_color;
    def_ButtonHoverColor = $courseJson.globalSettings.button_hover_color;
    def_BorderColor = $courseJson.globalSettings.button_border_color;
  }

  if (opts.settings.isBtnConfigured != "false" && checkExistence) {
    def_ButtonColor = opts.settings.buttonColor;
    def_ButtonHoverColor = opts.settings.buttonColorHover;
    def_BorderColor = opts.settings.buttonBorder;
  }

  if (opts.settings.buttonImage != "") {
    $("#buttonImg_" + opts.widgetId).append("<img data-button-image=\"".concat(opts.settings.buttonImageOrigName, "\" src=").concat(opts.settings.buttonImage, " style=\"width:").concat(opts.settings.imageWidth, ";border-radius:").concat(opts.settings.buttonRadius, "px; border:").concat(opts.settings.borderWidth, "px ").concat(opts.settings.borderStyle, " ").concat(def_BorderColor, "!important; box-shadow: ").concat(opts.settings.horizontalDistance, "px ").concat(opts.settings.verticalDistance, "px 5px ").concat(opts.settings.spreaddistance, "px #ccc; \"/>"));
  } else {
    $("#button_" + opts.id).append("<button id=\"cust_".concat(opts.id, "\" class=\"formBtn yesBtn "+opts.settings.class+" buttonText\" type=\"button\" \n                data-hover-style=\"background-color:").concat(def_ButtonHoverColor, "!important;\n                border-radius:").concat(opts.settings.buttonRadius, "px; \n                border:").concat(opts.settings.borderWidth, "px ").concat(opts.settings.borderStyle, " ").concat(def_BorderColor, "!important; \n                box-shadow: ").concat(opts.settings.horizontalDistance, "px ").concat(opts.settings.verticalDistance, "px 5px ").concat(opts.settings.spreaddistance, "px #ccc;\" \n                \n                data-nonHover-style=\n                \"background-color:").concat(def_ButtonColor, "!important;  \n                border-radius:").concat(opts.settings.buttonRadius, "px; \n                border: ").concat(opts.settings.borderWidth, "px ").concat(opts.settings.borderStyle, " ").concat(def_BorderColor, "!important; box-shadow: ").concat(opts.settings.horizontalDistance, "px ").concat(opts.settings.verticalDistance, "px 5px \n                ").concat(opts.settings.spreaddistance, "px #ccc;\" \n                \n                style=\"background-color:").concat(def_ButtonColor, "!important;\n                border-radius:").concat(opts.settings.buttonRadius, "px;\n                border: ").concat(opts.settings.borderWidth, "px ").concat(opts.settings.borderStyle, " ").concat(def_BorderColor, "!important; box-shadow: ").concat(opts.settings.horizontalDistance, "px ").concat(opts.settings.verticalDistance, "px 5px ").concat(opts.settings.spreaddistance, "px #ccc; \"> ").concat(opts.settings.name, " \n                </button>\n                <span class=\"btnHoverAnimation\"></span>"));
  } //$(`#cust_${opts.id}`).css({"background-color":`${def_ButtonColor}`,"border-radius":`${opts.settings.buttonRadius}px`,"border":`${opts.settings.borderWidth}px ${opts.settings.borderStyle} ${opts.settings.buttonBorder}!important;`,"box-shadow":`${opts.settings.horizontalDistance}px ${opts.settings.verticalDistance}px 5px ${opts.settings.spreaddistance}px #ccc;`});


  $(".buttonText").mouseenter(function () {
    var hoverStyle = $(this).attr("data-hover-style");
    $(this).removeAttr("style").attr("style", hoverStyle);
  }).mouseleave(function () {
    var nonHoverStyle = $(this).attr("data-nonHover-style");
    $(this).removeAttr("style").attr("style", nonHoverStyle);
  });
  $("#button_widget_" + opts.widgetId).click(function (e) {
    e.preventDefault();

    if (typeof isPreviewPage === "undefined" && typeof isVendorPage === "undefined") {
      //editor
      if (url) {
        window.open(url);
      }

      if (nextval) {
        e.preventDefault();
        goToNextPage();
      }

      if (prevval) {
        e.preventDefault();
        goToPreviousPage();
      }

      if (page) {
        debugger;
        $("[data-id = \"".concat(page, "\"]")).click();
        iocnSetOpenClosePanel();
      }

      if (specificwidgetid) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: $('#' + specificwidgetid).offset().top
        }, 1000);
        console.log('#' + specificwidgetid);
        var getChildrenLength = $('#' + specificwidgetid).find('.animation_this').children().length;

        if (getChildrenLength > 1 || getChildrenLength == 0) {
          $('#' + specificwidgetid).find('.animation_this').css({
            "animation": "blink 1.0s linear infinite"
          });
          setTimeout(function () {
            $('#' + specificwidgetid).find('.animation_this').css("animation", "none");
          }, 3000);
        } else {
          $('#' + specificwidgetid).find('.animation_this').children().css({
            "animation": "blink 1.0s linear infinite"
          });
          setTimeout(function () {
            $('#' + specificwidgetid).find('.animation_this').children().css("animation", "none");
          }, 3000);
        }

        $('#' + specificwidgetid).find('iframe').css({
          "animation": "blink 1.0s linear infinite"
        });
        setTimeout(function () {
          $('#' + specificwidgetid).find('iframe').css("animation", "none");
        }, 3000);
      }

      if (popuptitle) {
        $('#page-top').find('.popupcontent').empty();
        $('#page-top').find('.popuptitle').empty();
        $('#page-top').find('.popupcontent').append("<label id=\"modalcontent\">".concat(opts.settings.popupcontent, "</label>"));
        $('#page-top').find('.popuptitle').append(popuptitle);
        $('#buttonwidgetModal').modal('show');
        $("#popup_ok").click(function () {
          $('#buttonwidgetModal').modal('hide');
          $("[data-id = \"".concat(pagepo, "\"]")).click();
        });
      }
    } else if (typeof trivPrevPage !== "undefined" && typeof isPreviewPage === "undefined" && typeof isVendorPage !== "undefined") {
      //AWT
      if (url) {
        window.open(url);
      }

      if (nextval) {
        e.preventDefault();
        trivNextPage();
      }

      if (prevval) {
        e.preventDefault();
        trivPrevPage();
      }

      if (page) {
        e.preventDefault();
        var indices = getChapPageIndex(page, chapterid);
        if (indices.pageIndex === 0 && indices.chapIndex === 0) document.location = "index.html";else document.location = indices.chapIndex + 1 + '_' + (indices.pageIndex + 1) + ".html"; //var indices = getChapPageIndex(page, chapterid);
        //loadPage('chap_' + chapterid, indices.chapIndex + '_' + indices.pageIndex, indices.chapIndex, indices.pageIndex);
      }

      if (specificwidgetid) {
        e.preventDefault();
        var specificWidgetid = '';

        if ($('#' + specificwidgetid).length) {
          specificWidgetid = '#' + specificwidgetid;
        } else {
          specificWidgetid = '.' + specificwidgetid;
        }

        $('html, body').animate({
          scrollTop: $(specificWidgetid).offset().top
        }, 1000);
      }

      if (popuptitle) {
        var buttonWidgetPopUp = "<div class=\"modal \" id=\"buttonwidgetModal1\" tabindex=\"-1\" role=\"dialog\">\n\t\t                        <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\n\t\t\t                        <div class=\"modal-content modalContent\">\n\t\t\t\t                    <div class=\"modal-header modalHeader\">\n\t\t\t\t\t                    <h5 class=\"modal-title popuptitle\"></h5>\n\t\t\t\t\t                    <button type=\"button\" class=\"close modalClose\" data-dismiss=\"modal\" aria-label=\"Close\">\n\n\t\t\t\t\t\t                    <span class=\"modalCloseIcon\"></span>\n\t\t\t\t\t\t                    <span class=\"modalCloseIcon\"></span>\n\n\t\t\t\t\t                    </button>\n\t\t\t\t            </div>\n\t\t\t\t            <div class=\"modal-body modalBody popupcontent\">\n\n\t\t\t\t            </div>\n\t\t\t\t            <div class=\"modal-footer modalFooter\">\n\t\t\t\t\t        <!-- <button class=\"modalBtn cancelBtn\" onclick='$(\"#buttonwidgetModal1\").modal(\"hide\")'>Ok</button> -->\n\t\t\t\t\t            <button class=\"modalBtn cancelBtn\" id=\"popup_ok\">Ok</button>\n\t\t\t\t            </div>\n\t\t\t                </div>\n\t\t                </div>\n\t                    </div>";
        $('body').append(buttonWidgetPopUp);
        $('#buttonwidgetModal1').find('.popupcontent').empty();
        $('#buttonwidgetModal1').find('.popuptitle').empty();
        $('#buttonwidgetModal1').find('.popupcontent').append("<label id=\"modalcontent\">".concat(opts.settings.popupcontent, "</label>"));
        $('#buttonwidgetModal1').find('.popuptitle').append(popuptitle);
        $('#buttonwidgetModal1').modal('show');
        $('#buttonwidgetModal1').find("#popup_ok").click(function () {
          $('body').find('#buttonwidgetModal1').modal('hide');
          var indices = getChapPageIndex(pagepo, chapteridpo);
          $courseJson.index[indices.chapIndex].pages.forEach(function (value, index) {
            if (value.id == pagepo) {
              if (value.title.includes(' ')) {
                pagetitle = value.title.toLowerCase().replace(' ', '_');
              } else {
                pagetitle = value.title.toLowerCase();
              }
            }
          });
          if (indices.pageIndex === 0 && indices.chapIndex === 0) document.location = "index.html";else document.location = indices.chapIndex + 1 + '_' + pagetitle + ".html";
        });
      }
    } else if (typeof isPreviewPage === "undefined" && typeof isVendorPage !== "undefined") {
      //package
      if (url) {
        //
        window.open(url);
      }

      if (nextval) {
        //
        e.preventDefault();
        incPage();
      }

      if (prevval) {
        //
        e.preventDefault();
        decPage();
      }

      if (page) {
        //
        var indices = getChapPageIndex(page, chapterid);
        loadPage('chap_' + chapterid, indices.chapIndex + '_' + indices.pageIndex, indices.chapIndex, indices.pageIndex);
        iocnSetOpenClosePanel();
      }

      if (specificwidgetid) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: $('#' + specificwidgetid).offset().top
        }, 1000);
      }

      if (popuptitle) {
        $('#buttonwidgetModal').find('.popupcontent').empty();
        $('#buttonwidgetModal').find('.popuptitle').empty();
        $('#buttonwidgetModal').find('.popupcontent').append("<label id=\"modalcontent\">".concat(opts.settings.popupcontent, "</label>"));
        $('#buttonwidgetModal').find('.popuptitle').append(popuptitle);
        $('#buttonwidgetModal').modal('show');
        $("#popup_ok").click(function () {
          $('#buttonwidgetModal').modal('hide');
          $("[data-id = \"".concat(pagepo, "\"]")).click();
          var indices = getChapPageIndex(pagepo, chapteridpo);
          loadPage('chap_' + chapteridpo, indices.chapIndex + '_' + indices.pageIndex, indices.chapIndex, indices.pageIndex);
        });
      }
    } else {
      //preview
      var $previewFrame = $(window.frameElement);
      var $mainContainer = $previewFrame.closest("#page-top");

      if (url) {
        //window.open(url, '_blank');  
        window.open(url);
      }

      if (nextval) {
        e.preventDefault();
        window.top.nextPreview();
      }

      if (prevval) {
        e.preventDefault();
        window.top.prevPreview();
      }

      if (page) {
        $("[data-id = \"".concat(page, "\"]")).click();
        window.top.showPage(chapterid, page);
      }

      if (specificwidgetid) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: $('#' + specificwidgetid).offset().top
        }, 1000);
      }

      if (popuptitle) {
        $('#buttonwidgetModal').find('.popupcontent').empty();
        $('#buttonwidgetModal').find('.popuptitle').empty();
        $('#buttonwidgetModal').find('.popupcontent').append("<label id=\"modalcontent\">".concat(opts.settings.popupcontent, "</label>"));
        $('#buttonwidgetModal').find('.popuptitle').append(popuptitle);
        $('#buttonwidgetModal').modal('show');
        $("#popup_ok").click(function () {
          $('#buttonwidgetModal').modal('hide');
          $("[data-id = \"".concat(pagepo, "\"]")).click();
          window.top.showPage(chapteridpo, pagepo);
        });
      }
    }
  });
  WidgetEvents.mounted(opts.widgetId);
});
    </script>
</button_widget2>