<button_widget>
    <div class="visuallyhidden" aria-hidden="true" tabindex='-1'>This is a button pattern.</div>
    <div class="button-align animation_this word_count" style="text-align:{opts.settings.align}">
        <!--  <input type="button" class="formBtn yesBtn" value="{opts.settings.name}" refs="button" id="button_widget_{opts.widgetId}" target="{opts.settings.target}"/>  -->
        <a href="#" tabindex="0" id="button_widget_{opts.widgetId}" target="{opts.settings.target}"> 
            <button id="{opts.settings.id}" class="formBtn yesBtn" type="button" >{opts.settings.name}</button>
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
       .button-align{ 
          padding: 10px 0;
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
  var $parent = $("#" + opts.widgetId);
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
        $("[data-id = \"".concat(page, "\"]")).click();
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
</button_widget>
