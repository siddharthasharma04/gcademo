<video_w_v2>
    <div class="visuallyhidden" aria-hidden="true" tabindex="-1">This is a video pattern.</div>
    <div class="animation_this word_count count_media" id='video_align_{opts.widgetId}'  style="text-align:{opts.settings.alignment};">
        <video aria-label="video" id={video_id} style="object-fit: fill;max-width:100%; {opts.settings.css}" controls controlsList="nodownload" autoplay loop muted id="{newWidgetId}" poster={opts.settings.posterImageUrl}
            playsinline webkit-playsinline>
            <source src="{url}" type="video/mp4">
        </video>
    </div>
    <style>
        /* video {
            max-width: 100%;
            width: 100% !important;
            height: 100% !important;
        } */
        
        .mejs__time-slider-overlay {
            position: absolute;
            width: 100%;
            height: 10px;
            z-index: 10;
            left: 0;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            background-color: transparent;
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
      this.video_id = opts.widgetId + "_video";
      var externalPageUrl, name, page, nextval, prevval, chapterid, specificwidgetid, popuptitle, popupcontent, pagepo, chapteridpo, playerEndBtnAction;
      externalPageUrl = opts.settings.externalPageUrl;
      page = opts.settings.specifipage;
      nextval = opts.settings.nextval;
      prevval = opts.settings.prevval;
      chapterid = opts.settings.specifichapterid;
      specificwidgetid = opts.settings.specificwidget;
      popuptitle = opts.settings.popuptitle;
      popupcontent = opts.settings.popupcontent;
      pagepo = opts.settings.specifipagepopup;
      chapteridpo = opts.settings.specifichapteridpopup;
      playerEndBtnAction = opts.settings.playerEndBtnAction;
      this.url = opts.settings.url;
      if (typeof isScormPackage !== "undefined" && isScormPackage === true) this.url = '.' + opts.settings.url;

      if (typeof scormVer !== "undefined" && (scormVer == "scorm12" || scormVer == "scorm2004")) {
        this.url = opts.settings.url;
      }

      this.on("mount", function () {
        $("#".concat(opts.widgetId, "_vdo")).off("load").on("load", function () {//FixedLayout.fixWidgetRowHeight(opts.widgetId)
        });

        if (opts.settings.alignment == "Vertical Center") {
            $("#video_align_" + opts.widgetId).addClass('verticalCenter');
        } 
        else {
            $("#video_align_" + opts.widgetId).removeClass('verticalCenter');
        }

        if (specificwidgetid != '' && playerEndBtnAction == "true") {
          $("#".concat(specificwidgetid)).parentsUntil().find('.gridCol').css("border-width", "0px");
          $("#".concat(specificwidgetid)).css("display", "none");
        } else {} // $(`#${specificwidgetid}`).parentsUntil().find('.gridCol').css("border-width","1px");
        // $(`#${specificwidgetid}`).css("display","block");
        // console.log(opts.settings);
        // console.log(this.video_id); 

        if (opts.settings.autoplay == "false") {
          $("#"+this.video_id).removeAttr('autoplay');
          $(".mejs__overlay.mejs__layer.mejs__overlay-play").css("display", "none");
        } else {
          $(".mejs__overlay.mejs__layer.mejs__overlay-play").css("display", "flex");
          //$("#"+this.video_id).play();
        }
        
        if (opts.settings.loop == "false") {
          $("#"+this.video_id).removeAttr('loop');
        }

        if (opts.settings.mute == "false") {
          $("#"+this.video_id).removeAttr('muted');
          $("#"+this.video_id)[0].volume = 1;
          $("#"+this.video_id)[0].muted = false;
        }

        if (opts.settings.addMediaElementPlayer == "true") {
          var mediaElement = $("#"+this.video_id);

          if (opts.settings.CCTextUrl != "" && opts.settings.mediaElementPlayerCC == "true") {
            mejs.i18n.language('en'); // Setting English language

            $("#"+this.video_id).append("<track id=\"subtitles\" srclang=\"en\" kind=\"subtitles\" src=\"".concat(opts.settings.CCTextUrl, "\" type=\"text/plain\" />"));
          }

          this.mediaElementPlayerSettings();
        }else{
          var mediaElement = $("#"+this.video_id);
          var videoWidth = opts.settings.width != "" ? opts.settings.width : "100%";
          var videoHeight = opts.settings.height != "" ? opts.settings.height : "100%"; 
          if (opts.settings.videoType == 'fixed') {
              //mediaElement.remove(true);
              $(mediaElement).removeClass('mejs__container_fullscreen');

              if (opts.settings.alignment == "right") {
                $(mediaElement).css({
                  "float": "right",
                  "width": videoWidth,
                  "height": videoHeight
                });
              } else if (opts.settings.alignment == "center") {
                $(mediaElement).css({
                  "float": "none",
                  "width": videoWidth,
                  "height": videoHeight,
                  "margin": "0 auto"
                });
              } else {
                $(mediaElement).css({
                  "float": "left",
                  "width": videoWidth,
                  "height": videoHeight
                });
              }
            } else {
              //mediaElement.remove(true);
              // $(mediaElement).css({
              //   "float": "left",
              // });
              //$("#"+targetElementId).addClass('mejs__container_fullscreen');
              $("#video_align_"+opts.widgetId).css("text-align","center");
            }
        }

        WidgetEvents.mounted(opts.widgetId);

        if (typeof isPreviewPage != "undefined") {
          if (opts.settings.autoplay == "false") {
            var video = document.getElementById(this.video_id);
            video.pause();
          } //this.mediaElementPlayerSettings();

        }
      });

      this.mediaElementPlayerSettings = function () {
        //console.log(opts.settings);
        var mediaElement = $("#"+this.video_id);
        var mediaElementPlayerCC = opts.settings.mediaElementPlayerCC == "true" ? "tracks" : "";
        var mediaElementPlayerDuration = opts.settings.mediaElementPlayerDuration == "true" ? "duration" : "";
        var mediaElementPlayerVolume = opts.settings.mediaElementPlayerVolume == "true" ? "volume" : "";
        var mediaElementPlayerFullScreen = opts.settings.mediaElementPlayerFullScreen == "true" ? "fullscreen" : "";
        var mediaElementPlayerSeekBar = opts.settings.mediaElementPlayerSeekBar == "true" ? true : false;
        var videoWidth = opts.settings.width != "" ? opts.settings.width : "100%";
        var videoHeight = opts.settings.height != "" ? opts.settings.height : "100%"; 
        //console.log("mediaElementPlayerCC " + mediaElementPlayerCC + ", mediaElementPlayerDuration " + mediaElementPlayerDuration + " ,mediaElementPlayerVolume " + mediaElementPlayerVolume + " ,mediaElementPlayerFullScreen " + mediaElementPlayerFullScreen + " ,mediaElementPlayerSeekBar " + mediaElementPlayerSeekBar)
        mediaElement.mediaelementplayer({
          features: ['playpause', 'progress', 'current', mediaElementPlayerDuration, mediaElementPlayerCC, mediaElementPlayerVolume, mediaElementPlayerFullScreen],
          videoWidth: videoWidth,
          videoHeight: videoHeight,
          enableAutosize: true,
          success: function success(media, node, instance) {
            var targetElementId = $(media).attr('id').split('_video')[0];
            //console.log(targetElementId);
            if (opts.settings.videoType == 'fixed') {
              //mediaElement.remove(true);
              $("#".concat(targetElementId, " .mejs__container")).removeClass('mejs__container_fullscreen');

              if (opts.settings.alignment == "right") {
                $("#".concat(targetElementId, " .mejs__container.mejs__video")).css({
                  "float": "right",
                  "width": videoWidth,
                  "height": videoHeight
                });
              } else if (opts.settings.alignment == "center") {
                $("#".concat(targetElementId, " .mejs__container.mejs__video")).css({
                  "float": "none",
                  "width": videoWidth,
                  "height": videoHeight,
                  "margin": "0 auto"
                });
              } else {
                $("#".concat(targetElementId, " .mejs__container.mejs__video")).css({
                  "float": "left",
                  "width": videoWidth,
                  "height": videoHeight
                });
              }
            } else {
              //mediaElement.remove(true);
              $("#".concat(targetElementId, " .mejs__container.mejs__video")).css({
                "float": "left",
                "width": "100% !important"
              });
              $("#".concat(targetElementId, " .mejs__container")).addClass('mejs__container_fullscreen');
            }

            if (!mediaElementPlayerSeekBar) {
              $('.mejs__time-rail').on('mouseenter', function () {
                return false;
              });

              if (!$('.mejs__time-slider-overlay').length) {
                $("#".concat(targetElementId)).find('.mejs__time-rail').append("<span class=\"mejs__time-slider-overlay\"></span>");
              } else {
                $("#".concat(targetElementId)).find('.mejs__time-rail .mejs__time-slider-overlay').remove();
              }
            }

            $(media).closest('.mejs__container').attr('lang', mejs.i18n.language());
            media.addEventListener("play", function (e) {
              if (specificwidgetid != '' && playerEndBtnAction == "true") {
                $("#".concat(specificwidgetid)).css("display", "none");
                $(".goToPreviousPage,.goToNextPage").parent().filter('li').addClass("disableNextPre_forced");
                $("#goToPreviousPage, #goToNextPage").addClass("disableNextPre_forced");

                if (typeof isPreviewPage != "undefined") {
                  previewPagePrevBtn = window.parent.document.getElementById('previewPreBtn');
                  previewPageNextBtn = window.parent.document.getElementById('previewNextBtn');
                  previewPagePrevBtn1 = window.parent.document.getElementById('previewPreBtn1');
                  previewPageNextBtn1 = window.parent.document.getElementById('previewNextBtn1');
                  previewPagePrevBtn.classList.add("disableNextPre_forced");
                  previewPageNextBtn.classList.add("disableNextPre_forced");
                  previewPagePrevBtn1.classList.add("disableNextPre_forced");
                  previewPageNextBtn1.classList.add("disableNextPre_forced");
                }
              }
            });
            media.addEventListener("ended", function (e) {
              if (externalPageUrl) {
                $('.widget-setting-close').trigger('click');
                window.open(externalPageUrl);
              }

              if (specificwidgetid != '' && playerEndBtnAction == "true") {
                $("#".concat(specificwidgetid)).css("display", "block");
                $(".goToPreviousPage,.goToNextPage").parent().filter('li').removeClass("disableNextPre_forced");
                $("#goToPreviousPage, #goToNextPage").removeClass("disableNextPre_forced");

                if (typeof isPreviewPage != "undefined") {
                  previewPagePrevBtn = window.parent.document.getElementById('previewPreBtn');
                  previewPageNextBtn = window.parent.document.getElementById('previewNextBtn');
                  previewPagePrevBtn1 = window.parent.document.getElementById('previewPreBtn1');
                  previewPageNextBtn1 = window.parent.document.getElementById('previewNextBtn1');
                  previewPagePrevBtn.classList.remove("disableNextPre_forced");
                  previewPageNextBtn.classList.remove("disableNextPre_forced");
                  previewPagePrevBtn1.classList.remove("disableNextPre_forced");
                  previewPageNextBtn1.classList.remove("disableNextPre_forced");
                }
              }

              if (typeof isPreviewPage === "undefined" && typeof isVendorPage === "undefined") {
                //editor
                if (nextval) {
                  $('.widget-setting-close').trigger('click');
                  goToNextPage();
                }

                if (prevval) {
                  $('.widget-setting-close').trigger('click');
                  goToPreviousPage();
                }

                if (page) {
                  $('.widget-setting-close').trigger('click');
                  $("[data-id = \"".concat(page, "\"]")).click();
                  iocnSetOpenClosePanel();
                }

                if (specificwidgetid) {
                  $('html, body').animate({
                    scrollTop: $('#' + specificwidgetid).offset().top
                  }, 1000);
                  var getChildrenLength = $('#' + specificwidgetid).find('.animation_this').children().length;

                  if (getChildrenLength > 1 || getChildrenLength == 0) {
                    // $('#' + specificwidgetid).find('.animation_this').css({
                    //     "animation": "blink 1.0s linear infinite"
                    // });
                    setTimeout(function () {
                      $('#' + specificwidgetid).find('.animation_this').css("animation", "none");
                    }, 3000);
                  } else {
                    // $('#' + specificwidgetid).find('.animation_this').children().css({
                    //     "animation": "blink 1.0s linear infinite"
                    // });
                    setTimeout(function () {
                      $('#' + specificwidgetid).find('.animation_this').children().css("animation", "none");
                    }, 3000);
                  } // $('#' + specificwidgetid).find('iframe').css({
                  //     "animation": "blink 1.0s linear infinite"
                  // });
                  // setTimeout(function() {
                  //     $('#' + specificwidgetid).find('iframe').css("animation", "none");
                  // }, 3000)

                }

                if (popuptitle) {
                  $('#page-top').find('.popupcontent').empty();
                  $('#page-top').find('.popuptitle').empty();
                  $('#page-top').find('.popupcontent').append("<label id=\"modalcontent\">".concat(opts.settings.popupcontent, "</label>"));
                  $('#page-top').find('.popuptitle').append(popuptitle);
                  $('#buttonwidgetModal').modal('show');
                  $("#popup_ok").click(function () {
                    $('#buttonwidgetModal').modal('hide');
                    $('.widget-setting-close').trigger('click');
                    $("[data-id = \"".concat(pagepo, "\"]")).click();
                  });
                }
              } else if (typeof trivPrevPage !== "undefined" && typeof isPreviewPage === "undefined" && typeof isVendorPage !== "undefined") {
                //AWT
                if (nextval) {
                  trivNextPage();
                }

                if (prevval) {
                  trivPrevPage();
                }

                if (page) {
                  e.preventDefault();
                  var indices = getChapPageIndex(page, chapterid);
                  if (indices.pageIndex === 0 && indices.chapIndex === 0) document.location = "index.html";else document.location = indices.chapIndex + 1 + '_' + (indices.pageIndex + 1) + ".html";
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
                  var buttonWidgetPopUp = "<div class=\"modal \" id=\"buttonwidgetModal1\" tabindex=\"-1\" role=\"dialog\">\n                                                <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\n                                                    <div class=\"modal-content modalContent\">\n                                                    <div class=\"modal-header modalHeader\">\n                                                        <h5 class=\"modal-title popuptitle\"></h5>\n                                                        <button type=\"button\" class=\"close modalClose\" data-dismiss=\"modal\" aria-label=\"Close\">\n                                                            <span class=\"modalCloseIcon\"></span>\n                                                            <span class=\"modalCloseIcon\"></span>\n                                                        </button>\n                                                    </div>\n                                                    <div class=\"modal-body modalBody popupcontent\"></div>\n                                                    <div class=\"modal-footer modalFooter\">\n                                                        <button class=\"modalBtn cancelBtn\" id=\"popup_ok\">Ok</button>\n                                                    </div>\n                                                </div>\n                                            </div>\n                                        </div>";
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
                //packag
                if (nextval) {
                  incPage();
                }

                if (prevval) {
                  decPage();
                }

                if (page) {
                  var indices = getChapPageIndex(page, chapterid);
                  loadPage('chap_' + chapterid, indices.chapIndex + '_' + indices.pageIndex, indices.chapIndex, indices.pageIndex);
                  iocnSetOpenClosePanel();
                }

                if (specificwidgetid) {
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

                if (nextval) {
                  window.top.nextPreview();
                }

                if (prevval) {
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
            }, false);
          }
        });
      };
    </script>
</video_w_v2>