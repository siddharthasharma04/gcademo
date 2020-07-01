function Video_w_v2() {
  var fileSize = 0;
  var posterfileSize = 0;
  var captionfileSize = 0;
  this.init = function () {
    this.settings = {
      "url": "./assets/video/default_video.mp4",
      "posterImageUrl": "",
      "CCTextUrl": "",
      "width": "auto",
      "height": "auto",
      "alignment": "center",
      "videoType": "responsive",
      "autoplay": "false",
      "loop": "false",
      "mute": "false",
      "css": "width: auto; height: initial;max-height: 70vh;margin: 0 !important; display: inline-block;",
      "addMediaElementPlayer": "false",
      "mediaElementPlayerVolume": "false",
      "mediaElementPlayerSeekBar": "true",
      "mediaElementPlayerFullScreen": "false",
      "mediaElementPlayerDuration": "false",
      "mediaElementPlayerCC": "false",
      "mediaElementPlayerEndTrackTo": "",
      "selectvalue": "",
      "externalPageUrl": "",
      "specifichapter": "",
      "specifipage": "",
      "nextval": "",
      "prevval": "",
      "specifichapterid": "",
      "target": "",
      "specificwidget": "",
      "playerEndBtnAction": "",
      "popuptitle": "",
      "popupcontent": "",
      "specifichapterpopup": "",
      "specifipagepopup": "",
      "specifichapteridpopup": ""
    };
    this.widget = new Widget(this.settings);
    this.widget.insert(this.settings);
    this.widget.openEditPanel(this.getFormHTML());
    this.bindEditFormEvents();
    this.custom();
    return this.widget.getWidgetId();
  };

  this.edit = function () {
    this.widget.openEditPanel(this.getFormHTML());
    this.bindEditFormEvents();
  };

  this.custom = function () {
    var that = this;
    $('#audio_widget_form').find('.collapse-input:checked').each(function () {
      that.collapseElement(this);
    });
    $('#audio_widget_form').on('change', '.collapse-input', function () {
      that.collapseElement(this);
    });
  };

  this.collapseElement = function (that) {
    if (!($(that).val() == 'responsive')) {
      $('#' + $(that).data('target')).hide().css('display', 'flex');
    } else {
      $('#' + $(that).data('target')).show().css('display', 'none');
    }
  };

  this.getFormHTML = function () {
    var html = "\n        <div id=\"currentModalBox\">\n        <form id=\"video_widget_form\" class=\"form-settings\" >\n            <div class=\"p_20\">\n                <label class=\"form-element-label custom-label-box4\">File Upload</label>\n                <input type=\"file\" id=\"file\" class=\"form-control form-file-element\" name=\"filename\" accept=\"video/*\">\n                <label class=\"form-element-label alert-danger\">*Maximum upload file size: 200 MB</label>\n            </div>\n<div id=\"accordion\" class=\"advance-setting-accordion\">\n                <div class=\"card\">\n                    <div class=\"card-header advance_setting_hedaer\" id=\"headingOne\">\n                        <h2 class=\"mb-0\">\n                            <span class=\"advanceSetting  d-flex advance_flipcart btn btn-link collapsed\" data-toggle=\"collapse\" data-target=\"#collapsevideo\" aria-expanded=\"false\" aria-controls=\"collapseOne\">\n                            More Settings \n                            <span class=\"advance-accordian-arrow collapsed\" data-toggle=\"collapse\" data-target=\"#collapsevideo\" aria-expanded=\"false\" aria-controls=\"collapseOne\"><i class=\"fa fa-angle-down rotate-icon\"></i></span>\n                            </span>\n                            </h2>\n                    </div>\n                    <div id=\"collapsevideo\" class=\"collapse\" aria-labelledby=\"headingOne\" data-parent=\"#accordion\">\n                        <div class=\"card-body advance_setting_body\">\n                            <div class=\"form-group paddlr15\">\n                                <div class=\"row\">\n                                    <label class=\"radio-container col form-element-label margin0 custom-label-box4\">Responsive\n                                        <input type=\"radio\" name=\"videoType\" value=\"responsive\" class=\"margin0 widgetType\" ".concat(this.settings.videoType == 'responsive' ? 'checked' : '', ">\n                                        <span class=\"circlemark\"></span>\n                                    </label>\n                                    <label class=\"radio-container col form-element-label margin0 custom-label-box4\">Fixed\n                                        <input type=\"radio\" name=\"videoType\" value=\"fixed\" class=\"margin0 widgetType\" ").concat(this.settings.videoType == 'fixed' ? 'checked' : '', ">\n                                        <span class=\"circlemark\"></span>\n                                    </label>\n                                </div>\n                            </div>\n                            <div class=\"if_actual_image\">\n                                <div class=\"row margin0 collapse-group fixed-option\" id=\"group1\" style=\"display: flex;\">        \n                                    <div class=\"col-md-6 pl-0 mt20\">\n                                        <label class=\"form-element-label custom-label-box4\">Width</label>\n                                        <input class=\"form-element\" id=\"width\" type=\"text\" name=\"width\" autocomplete=\"off\"  placeholder=\"Width\" value=\"" ).concat(this.settings.width, "\">\n                                        <span class=\"input-inst-msg\">e.g, 100% ,500px ...</span>\n                                    </div>\n                                    <div class=\"col-md-6 px-0 mt20\">\n                                        <label class=\"form-element-label custom-label-box4\">Height</label>\n                                        <input class=\"form-element\" id=\"height\" type=\"text\" name=\"height\" autocomplete=\"off\" placeholder=\"Height\" value=\"").concat(this.settings.height, "\">\n                                        <span class=\"input-inst-msg\">e.g, 100px ,500px ...</span>\n                                    </div>\n                                    <div class=\"col-md-12 pl-0\">\n                                        <div class=\"row form-group\">\n                                            <div class=\"col-md-12\">\n                                                <label class=\"form-element-label column-setting-heading\">Alignment</label>\n                                                <div class=\"row margin0\">\n                                                    <label class=\"radio-container width-33 custom-label-box4\">Left\n                                                        <input type=\"radio\" name=\"alignment\" value=\"left\" ").concat(this.settings.alignment == 'left' ? 'checked' : '', ">\n                                                        <span class=\"circlemark\"></span>\n                                                    </label>\n                                                    <label class=\"radio-container width-33 custom-label-box4\">Center\n                                                        <input type=\"radio\" name=\"alignment\" value=\"center\" ").concat(this.settings.alignment == 'center' ? 'checked' : '', ">\n                                                        <span class=\"circlemark\"></span>\n                                                    </label>\n                                                    <label class=\"radio-container width-30 custom-label-box4\">Right\n                                                        <input type=\"radio\" name=\"alignment\" value=\"right\" ").concat(this.settings.alignment == 'right' ? 'checked' : '', ">\n                                                        <span class=\"circlemark\"></span>\n                                                    </label>\n                                                 <label class=\"radio-container mt20 custom-label-box4\">Vertical Center\n                                                    <input type=\"radio\"  name=\"alignment\" value=\"Vertical Center\" ").concat(this.settings.alignment == 'Vertical Center' ? 'checked' : '', ">\n                                                    <span class=\"circlemark\"></span>\n                                                </label>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"row mt20\">\n                                <div class=\"col width-30\">\n                                    <label class=\"form-element-label custom-label-box4\">AutoPlay</label>\n                                    <label class=\"switch switch-flat custom-label-box4\">\n                                        <input class=\"switch-input\" type=\"checkbox\" id=\"autoplay\" value=\"autoplay\" ").concat(this.settings.autoplay == "true" ? 'checked' : '', "/>\n                                        <span class=\"switch-label\" data-on=\"Yes\" data-off=\"No\"></span> \n                                        <span class=\"switch-handle\"></span> \n                                    </label>\n                                </div>\n                                <div class=\"col width-30\">\n                                    <label class=\"form-element-label custom-label-box4\">Loop</label>  \n                                    <label class=\"switch switch-flat\">\n                                        <input class=\"switch-input\" type=\"checkbox\" id=\"loop\" value=\"loop\" ").concat(this.settings.loop == "true" ? 'checked' : '', "/>\n                                        <span class=\"switch-label\" data-on=\"Yes\" data-off=\"No\"></span> \n                                        <span class=\"switch-handle\"></span> \n                                    </label>\n                                </div>\n                                <div class=\"col width-30\">\n                                    <label class=\"form-element-label custom-label-box4\">Mute</label>\n                                    <label class=\"switch switch-flat\">\n                                        <input class=\"switch-input\" type=\"checkbox\" id=\"muted\" value=\"muted\" ").concat(this.settings.mute == "true" ? 'checked' : '', "/>\n                                        <span class=\"switch-label\" data-on=\"Yes\" data-off=\"No\"></span> \n                                        <span class=\"switch-handle\"></span> \n                                    </label>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"row p_20 no-top-padding mt20\">\n                <div class=\"col\">\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label custom-label-box4\">Media Element Player</label>\n                        <label class=\"switch switch-flat\">\n                            <input class=\"switch-input media-element-controls\" type=\"checkbox\" id=\"mediElement_player\" value=\"mediElement_player\" ").concat(this.settings.addMediaElementPlayer == "true" ? 'checked' : '', "/>\n                            <span class=\"switch-label\" data-on=\"Yes\" data-off=\"No\"></span> \n                            <span class=\"switch-handle\"></span> \n                        </label>\n                    </div>\n                </div>\n            </div>\n            <div class=\"row p_20 no-top-padding mediElement_player\">\n <div class=\"form-group p_20 posRel\">\n\t\t\t\t<label class=\"form-element-label custom-label-box4\">Upload Poster Image</label>\n                <input type=\"file\" id=\"poster_file\" input-attr-id=\"2\" class=\"form-control form-file-element\" name=\"filename\" accept=\"image/*\">\n            </div>\n <div class=\"col-sm-12\">\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label custom-label-box4\">Enable Captions & Subtitles</label>\n                        <label class=\"switch switch-flat\">\n                            <input class=\"switch-input media-element-controls\" type=\"checkbox\" data-target-element=\"mediElement_player_cc\" id=\"mediElement_player_cc\" value=\"mediElement_player_cc\" ").concat(this.settings.mediaElementPlayerCC == "true" ? 'checked' : '', "/>\n                            <span class=\"switch-label\" data-on=\"Yes\" data-off=\"No\"></span> \n                            <span class=\"switch-handle\"></span> \n                        </label>\n                    </div>\n                </div>\n                <div class=\"col-sm-12 media-element-cationsText mediElement_player_cc\">\n                    <div class=\"form-group posRel\">\n                        <label class=\"form-element-label custom-label-box4\">Upload Caption / subtitle Text</label>\n                        <input type=\"file\" id=\"caption_file\" input-attr-id=\"3\" class=\"form-control form-file-element\" name=\"filename\" accept=\".vtt,.srt,.txt\">\n                    </div>\n                </div>\n                <div class=\"col-sm-6\">\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label custom-label-box4\">Enable Volume</label>\n                        <label class=\"switch switch-flat\">\n                            <input class=\"switch-input media-element-controls\" type=\"checkbox\" data-target-element=\"mediElement_player_volume\" id=\"mediElement_player_volume\" value=\"mediElement_player\" ").concat(this.settings.mediaElementPlayerVolume == "true" ? 'checked' : '', "/>\n                            <span class=\"switch-label\" data-on=\"Yes\" data-off=\"No\"></span> \n                            <span class=\"switch-handle\"></span> \n                        </label>\n                    </div>\n                </div>\n                <div class=\"col-sm-6\">\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label custom-label-box4\">Enable Seek Bar</label>\n                        <label class=\"switch switch-flat\">\n                            <input class=\"switch-input media-element-controls\" type=\"checkbox\" data-target-element=\"mediElement_player_seekbar\" id=\"mediElement_player_seekbar\" value=\"mediElement_player\" ").concat(this.settings.mediaElementPlayerSeekBar == "true" ? 'checked' : '', "/>\n                            <span class=\"switch-label\" data-on=\"Yes\" data-off=\"No\"></span> \n                            <span class=\"switch-handle\"></span> \n                        </label>\n                    </div>\n                </div>\n                <div class=\"col-sm-6\" style=\"padding-right:5px;\">\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label custom-label-box4\">Enable Full Screen</label>\n                        <label class=\"switch switch-flat\">\n                            <input class=\"switch-input media-element-controls\" type=\"checkbox\" data-target-element=\"mediElement_player_fullscreen\" id=\"mediElement_player_fullscreen\" value=\"mediElement_player\" ").concat(this.settings.mediaElementPlayerFullScreen == "true" ? 'checked' : '', "/>\n                            <span class=\"switch-label\" data-on=\"Yes\" data-off=\"No\"></span> \n                            <span class=\"switch-handle\"></span> \n                        </label>\n                    </div>\n                </div>\n                <div class=\"col-sm-6\">\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label custom-label-box4\">Enable Duration</label>\n                        <label class=\"switch switch-flat\">\n                            <input class=\"switch-input media-element-controls\" type=\"checkbox\" data-target-element=\"mediElement_player_duration\" id=\"mediElement_player_duration\" value=\"mediElement_player\" ").concat(this.settings.mediaElementPlayerDuration == "true" ? 'checked' : '', "/>\n                            <span class=\"switch-label\" data-on=\"Yes\" data-off=\"No\"></span> \n                            <span class=\"switch-handle\"></span> \n                        </label>\n                    </div>\n                </div>\n                <div class=\"col-sm-12\">\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label custom-label-box4\">Media End-track Action<span style=\"color:#FF0000\">*</span></label>\n                        <select class=\"form-control form-file-element media-element-next-action-selectbox\" id=\"button_select\">\n                            <option value=\"\">Select</option>\n                            <option value=\"externalurl\">External URL</option>\n                            <option value=\"nextpage\">Next Page</option>\n                            <option value=\"prevpage\">Previous Page</option>\n                            <option value=\"specificwidget\">Specific Widget</option>\n                            <option value=\"specificpage\">Specific Page</option>\n                            <option value=\"popup\">Pop-up</option>\n                        </select>\n                    </div>\n                </div>\n                <div class=\"col-sm-12\">\n                <div class=\"form-group outputhtml\"></div>\n                </div>  \n            </div>\n            <div class=\"form-group text-right px-3\">\n                <button type=\"submit\" class=\"modalBtn yesBtn\">Apply</button>\n            </div>\n        </form>\n    </div>");
    return html;
  };

  this.setVisibility = function (isVisible) {
    isVisible ? $('.mediElement_player').css('display', 'flex') : $('.mediElement_player').css('display', 'none');
  };

  this.bindEditFormEvents = function () {
    var that = this;
    widgetSettingPanelOpenSetIcon();
    that.settings.addMediaElementPlayer == "true" ? that.setVisibility(true) : that.setVisibility(false);
    that.settings.mediaElementPlayerCC == "true" ? $('.mediElement_player_cc').css('display', 'flex') : $('.mediElement_player_cc').css('display', 'none');

    // $(document).on('keypress keyup', '#width', function () {
    //   var $th = $(this);
    //   $th.val( $th.val().replace(/[^a-zA-Z0-9]/g, function(str) { 
    //   displayNotification('Please Enter Valid Pattern Width'); return '';} ) );  
    // });

    $(document).on('keypress keyup', '#height', function () {
      var $th = $(this);
      $th.val( $th.val().replace(/[^a-zA-Z0-9]/g, function(str) { 
      displayNotification('Please Enter Valid Pattern height'); return '';} ) );  
    });
  


    $(function () {
      $('#file').change(function () {
        var val = $(this).val().toLowerCase(),
            regex = new RegExp("(.*?)\.(mp4|mpeg|wmv|3gp|ogg|webm|flv|avi|quicktime|hdv|mxf|mgep-ts|mgep-2 ps|wav|broadcast wav|lxf|gxf|vob|mpeg )$");

        if (!regex.test(val)) {
          $(this).val('');
          displayNotification("Please Choose Video Format");
          fileSize = 0;
          return;
        }
      });
      $('.media-element-controls').change(function () {
        var inputTd = $(this).attr('id');
        var isMediaElementPlayer = false;
        if (inputTd == 'mediElement_player') {
          isMediaElementPlayer = true;
        }

        if ($(this).prop('checked') == true) {
          if (isMediaElementPlayer) {
            that.settings.addMediaElementPlayer = "true";
          }

          $('.' + inputTd).css('display', 'flex');
        } else if ($(this).prop('checked') == false) {
          if (isMediaElementPlayer) {
            that.settings.addMediaElementPlayer = "false";
            that.redetMediaElementConfig();
            that.resetMediaElementEndTrackAction();
              $('#mediElement_player_volume, #mediElement_player_fullscreen, #mediElement_player_duration, #mediElement_player_cc').prop('checked',false);
              $('#button_select').val($("#button_select option:first").val());
              $('.outputhtml').html();            
          }

          $('.' + inputTd).css('display', 'none');
        }
      });

      $('#loop').change(function(){
        var isLoopEnabled = ($(this).is(':checked') == true ) ? "true" : "false";
        that.settings.loop = isLoopEnabled;
        if(isLoopEnabled == "true" && that.settings.mediaElementPlayerEndTrackTo != ""){
          displayNotification("Please Disable Media next Action feature to apply Autoplay loop ");
          $(this).prop("checked",false);
          $(this).removeAttr('checked');
          that.settings.loop = false;
          $(this).trigger('click');
          return false;
        }
      });

    });
    $("#video_widget_form").on("submit", function (e) {
      e.preventDefault();
      that.settings.videoType = $(e.target).find("[name='videoType']:checked").val();
      that.settings.autoplay = $(e.target).find("#autoplay").is(':checked') == true ? "true" : "false";
      that.settings.loop = $(e.target).find("#loop").is(':checked') == true ? "true" : "false";
      that.settings.mute = $(e.target).find("#muted").is(':checked') == true ? "true" : "false";
      that.settings.addMediaElementPlayer = $(e.target).find("#mediElement_player").is(':checked') == true ? "true" : "false";

      if (that.settings.addMediaElementPlayer == "true") {
        that.settings.mediaElementPlayerVolume = $(e.target).find("#mediElement_player_volume").is(':checked') == true ? "true" : "false";
        that.settings.mediaElementPlayerSeekBar = $(e.target).find("#mediElement_player_seekbar").is(':checked') == true ? "true" : "false";
        that.settings.mediaElementPlayerFullScreen = $(e.target).find("#mediElement_player_fullscreen").is(':checked') == true ? "true" : "false";
        that.settings.mediaElementPlayerDuration = $(e.target).find("#mediElement_player_duration").is(':checked') == true ? "true" : "false";
        that.settings.mediaElementPlayerCC = $(e.target).find("#mediElement_player_cc").is(':checked') == true ? "true" : "false";
        that.settings.playerEndBtnAction = $(e.target).find("#mediElement_player_end_action").is(':checked') == true ? "true" : "";
      } else if (that.settings.addMediaElementPlayer == "false") {
        that.redetMediaElementConfig();
        that.resetMediaElementEndTrackAction();
        $('#mediElement_player_volume, #mediElement_player_fullscreen, #mediElement_player_duration, #mediElement_player_cc').prop('checked',false);
        $('#button_select').val($("#button_select option:first").val());
        $('.outputhtml').html();
      }

      if (that.settings.videoType == 'fixed') {
        var getWidthvalue = $("#width").val();
        var getEndPercentWidth = getWidthvalue.endsWith("%");
        var getEndPixelWidth = getWidthvalue.endsWith("px");
        var getHeightvalue = $("#height").val();
        var getEndPercentHeight = getHeightvalue.endsWith("%");
        var getEndPixelHeight = getHeightvalue.endsWith("px");

        if (getEndPercentWidth) {
          var removePercentageWidth = getWidthvalue.substring(0, getWidthvalue.length - 1);
          //var isNumericWidth = removePercentageWidth.match(/^-{0,1}\d+$/)
          if (removePercentageWidth > 100) {
              displayNotification("Please Enter Width between 0-100%")
              $("#width").css("background", "white");
              return
          } else {
              that.settings.width = $(e.target).find("[name='width']").val();
              that.settings.height = $(e.target).find("[name='height']").val();
              that.settings.alignment = $(e.target).find("[name='alignment']:checked").val();
              $("#width").css("background", "white");
          }
        } else if (getEndPixelWidth) {
          //var removePixelWidth = getWidthvalue.substring(0, getWidthvalue.length - 2);
          //var isNumericWidthpixel = removePixelWidth.match(/^-{0,1}\d+$/);

          // if (isNumericWidthpixel == null) {
          //   displayNotification("Please Enter Valid Pattern Width");
          //   //$("#width").css("background", "red");
          //   return;
          // } else {
            that.settings.width = $(e.target).find("[name='width']").val();
            that.settings.height = $(e.target).find("[name='height']").val();
            that.settings.alignment = $(e.target).find("[name='alignment']:checked").val();
            $("#width").css("background", "white");
          //}
        } else if (getWidthvalue != "auto") {
          displayNotification("Please Enter Valid Pattern Width");
          //$("#width").css("background", "red");
          return;
        } else {
          that.settings.width = $(e.target).find("[name='width']").val();
          that.settings.height = $(e.target).find("[name='height']").val();
          that.settings.alignment = $(e.target).find("[name='alignment']:checked").val();
          $("#width").css("background", "white");
        }

        if (getEndPercentHeight) {
          var removePercentageHeight = getHeightvalue.substring(0, getHeightvalue.length - 1);
          //var isNumericHeight = removePercentageHeight.match(/^-{0,1}\d+$/);

          if (removePercentageHeight > 100) {
              displayNotification("Please Enter Height between 0-100%")
              $("#height").css("background", "white");
              return
          } else {
              that.settings.width = $(e.target).find("[name='width']").val();
              that.settings.height = $(e.target).find("[name='height']").val();
              that.settings.alignment = $(e.target).find("[name='alignment']:checked").val();
              $("#height").css("background", "white");
          }
        } else if (getEndPixelHeight) {
          // var removePixelHeight = getHeightvalue.substring(0, getHeightvalue.length - 2);
          // var isNumericHeightpixel = removePixelHeight.match(/^-{0,1}\d+$/);

          // if (isNumericHeightpixel == null) {
          //   displayNotification("Please Enter Valid Pattern Height");
          //   //$("#height").css("background", "red");
          //   return;
          // } else {
            that.settings.width = $(e.target).find("[name='width']").val();
            that.settings.height = $(e.target).find("[name='height']").val();
            that.settings.alignment = $(e.target).find("[name='alignment']:checked").val();
            $("#height").css("background", "white");
          //}
        } else if (getHeightvalue != "auto") {
          displayNotification("Please Enter Valid Pattern Height");
          //$("#height").css("background", "red");
          return;
        } else {
          that.settings.width = $(e.target).find("[name='width']").val();
          that.settings.height = $(e.target).find("[name='height']").val();
          that.settings.alignment = $(e.target).find("[name='alignment']:checked").val();
          $("#height").css("background", "white");
        }
      } else {
        that.settings.width = "100%";
        that.settings.height = "100%";
        that.settings.alignment = "left";
      }

      if (fileSize > 25) {
        $('#pageLogoutPopUp').html("");
        $('#pageLogoutPopUp').append(fileSizeWarning(e, fileSize));
        $("#pageLogoutPopUp").modal("show");
        $('#yesBtn').bind('click', function (e) {
          that.UploadVideo(e);
          fileSize = 0; // $("#video_widget_form")[0].reset();
          // $('input[type = checkbox]').prop("checked", false)

          $('input[type=file]').val(null);
        });
      } else {
        that.UploadVideo(e);
        fileSize = 0; //$("#video_widget_form")[0].reset();
        //$('input[type = checkbox]').prop("checked", false)

        $('input[type=file]').val(null);
      }
    }); // get file size before uploading

    $('#file').bind('change', function () {
      fileSize = 0;

      if (this.files && this.files.length > 0) {
        fileSize = this.files[0].size / 1024 / 1024;
        fileSize = fileSize.toFixed(2);
      }

      if (fileSize > 0) {//setButtonState();
      }
    });
    $('.widgetType').on('click', function () {
      var elm = $('#width,#height');
      var elm1 = $(".if_actual_image");

      if ($(this).val() == 'fixed') {
        elm1.slideDown();
        elm.prop('required', 'required');
      } else {
        elm1.slideUp();
        elm.removeAttr('required');
      }
    });

    if (this.settings.videoType == 'fixed') {
      $(".if_actual_image").show();
      $('#width,#height').prop('required', 'required');
    } else {
      $(".if_actual_image").hide();
      $('#width,#height').removeAttr('required');
    }

    $('#poster_file').change(function () {
      var ext = this.value.match(/\.(.+)$/)[1];
      var extSplit = ext.split('.');
      var lastExt = extSplit[extSplit.length - 1];

      switch (lastExt.toLowerCase()) {
        case 'jpg':
        case 'jpeg':
        case 'png':
          $('#poster_file').attr('disabled', false);
          posterfileSize = 0;

          if (this.files && this.files.length > 0) {
            posterfileSize = this.files[0].size / 1024 / 1024;
            posterfileSize = posterfileSize.toFixed(2);
          }
          break;

        default:
          displayNotification("This is not an allowed file type.", 'error');
          this.value = '';
      }

      if (posterfileSize > 0) {//setButtonState();
      }
    });
    $('#caption_file').change(function () {
      var ext = this.value.match(/\.(.+)$/)[1];
      var extSplit = ext.split('.');
      var lastExt = extSplit[extSplit.length - 1];

      switch (lastExt.toLowerCase()) {
        case 'txt':
        case 'srt':
        case 'vtt':
          $('#caption_file').attr('disabled', false);
          captionfileSize = 0;

          if (this.files && this.files.length > 0) {
            captionfileSize = this.files[0].size / 1024 / 1024;
            captionfileSize = captionfileSize.toFixed(2);
          }

          break;

        default:
          displayNotification("This is not an allowed file type.", 'error');
          this.value = '';
      }

      if (captionfileSize > 0) {//setButtonState();
      }
    });
    $('.media-element-next-action-selectbox').off("change").on('change', function () {
      var selectvalue = $(this).children("option:selected").val();
      if(selectvalue != "" && that.settings.loop == "true"){
        displayNotification("Please Disable Autoplay loop to apply Media next Action feature");
        $(this).val($("#button_select option:first").val());
        return false;
      }

      that.settings.mediaElementPlayerEndTrackTo = selectvalue;
      if (selectvalue == 'externalurl') {
        var urlval = that.settings.externalPageUrl ? that.settings.externalPageUrl : "";
        var externalurlhtml = $("\n                <div class=\"form-group\">\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Insert URL:</label>\n                        <input type=\"text\" class=\"form-control form-file-element externalurlval\" value=\"".concat(urlval, "\" required>\n                    </div>\n                </div>"));
        $('.outputhtml').html($(externalurlhtml).html());
        $('.outputhtml').show();
      } else if (selectvalue == 'specificpage') {
        var specifichtml = $("\n                <div class=\"form-group\">\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Select Chapter:</label>\n                        <select class=\"form-control form-file-element inputChapter\" required>\n                           <option value=\"\">Select Chapter</option>\n                        </select>\n                    </div>\n    \n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Select Page:</label>\n                        <select class=\"form-control form-file-element inputPage\" required>\n                           <option value=\"\">Select Page</option>\n                        </select>\n                    </div>\n                </div>");
        $(".outputhtml").html($(specifichtml).html());
        $('.outputhtml').show();
      } else if (selectvalue == 'nextpage') {
        var nexthtml = $("\n                <div class=\"form-group\">\n                    <input style=\"display:none\" value=\"next\" class=\"nextval\">\n                </div>");
        $('.outputhtml').html($(nexthtml).html());
        $('.outputhtml').show();
      } else if (selectvalue == 'prevpage') {
        var prevhtml = $("\n                <div class=\"form-group\">\n                    <input style=\"display:none\" value=\"previous\" class=\"prevval\">\n                </div>");
        $(".outputhtml").html($(prevhtml).html());
        $('.outputhtml').show();
      } else if (selectvalue == 'specificwidget') {
        var specificwidgethtml = $("\n                <div class=\"form-group\">\n                    <div class=\"form-group playerEndBtnAction\">\n                        <label class=\"form-element-label\">Show After Media Ends <span>:</span></label>\n                        <label class=\"switch switch-flat\">\n                            <input class=\"switch-input media-element-controls\" type=\"checkbox\" data-target-element=\"mediElement_player_end_action\" id=\"mediElement_player_end_action\" value=\"mediElement_player_end_action\" ".concat(that.settings.playerEndBtnAction == "true" ? 'checked' : '', "/>\n                            <span class=\"switch-label\" data-on=\"Yes\" data-off=\"No\"></span> \n                            <span class=\"switch-handle\"></span> \n                        </label>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Select Widget:</label>\n                        <select class=\"form-control form-file-element inputWidget\" required>\n                           <option value=\"\">Select Widget</option>\n                        </select>\n                    </div>\n                </div>"));
        $(".outputhtml").html($(specificwidgethtml).html());
        $('.outputhtml').show();
      } else if (selectvalue == 'popup') {
        var popuphtml = $("\n                <div class=\"form-group\">\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Insert Pop-up Title:</label>\n                        <div contenteditable=\"true\" name=\"title\" id=\"popup_title\" class=\"form-control form-file-element popuptitle\" required value=\"".concat(that.settings.popuptitle, "\">").concat(that.settings.popuptitle, "</div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Insert Pop-up Content:</label>\n                        <div contenteditable=\"true\" name=\"title\" id=\"popup_content\" class=\"fw-textarea form-control popupcontent\" required value=\"").concat(that.settings.popupcontent, "\">").concat(that.settings.popupcontent, "</div>\n                    </div>\n    \n                    <!--specific chapter/page drop-down -->\n                    <div class=\"mb-2\">\n                        <label class=\"form-element-label\">Select Ok button link below:</label>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Select Chapter:</label>\n                        <select class=\"form-control form-file-element inputChapterpopup\" required>\n                           <option value=\"\">Select Chapter</option>\n                        </select>\n                    </div>\n    \n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Select Page:</label>\n                        <select class=\"form-control form-file-element inputPagepopup\" required>\n                           <option value=\"\">Select Page</option>\n                        </select>\n                    </div>\n                </div>"));
        $(".outputhtml").html($(popuphtml).html());
        $('.outputhtml').show();
        enableCkeditor("popup_content");
        enableCkeditor("popup_title");
      } else if (selectvalue == '') {
        $('.outputhtml').html("").hide();
        that.resetMediaElementEndTrackAction();
      }

      var currentWidgetId = that.widget.getWidgetId();
      var isChapterChanged = false;
      var isPopupChapterChanged = false;
      $courseJson.index.forEach(function (chapter, index) {
        if (selectvalue == "specificpage") {
          if (that.settings.specifichapter !== "" && that.settings.specifichapter == index) {
            $(".inputChapter").append("<option value=\"".concat(index, "\" selected='selected'>").concat(chapter.name, "</option>"));
            isChapterChanged = true;
          } else {
            $(".inputChapter").append("<option value=\"".concat(index, "\">").concat(chapter.name, "</option>"));
          }
        }

        if (selectvalue == "popup") {
          if (that.settings.specifichapterpopup !== "" && that.settings.specifichapterpopup == index) {
            $(".inputChapterpopup").append("<option value=\"".concat(index, "\" selected='selected'>").concat(chapter.name, "</option>"));
            isPopupChapterChanged = true;
          } else {
            $(".inputChapterpopup").append("<option value=\"".concat(index, "\">").concat(chapter.name, "</option>"));
          }
        }
      });

      if (isChapterChanged) {
        var optionSelected = $('.inputChapter').find("option:selected").val();
        that.onchangeSelectVal('inputPage', 'specifipage', optionSelected);
      }

      if (isPopupChapterChanged) {
        var optionSelected = $('.inputChapterpopup').find("option:selected").val();
        that.onchangeSelectVal('inputPagepopup', 'specifipagepopup', optionSelected);
      }

      $(".inputChapter").on('change', function () {
        var optionSelected = $(this).find("option:selected");
        var valueSelected = optionSelected.val();
        that.onchangeSelectVal('inputPage', 'specifipage', valueSelected);
      });
      $(".inputChapterpopup").on('change', function () {
        var optionSelected = $(this).find("option:selected");
        var valueSelected = optionSelected.val();
        that.onchangeSelectVal('inputPagepopup', 'specifipagepopup', valueSelected);
      });
      var widget_names = [];
      var widget_id, option_html, widget_index;
      widget_index = 0;
      var count = [],
          widget_label;
      $('.inputWidget').empty();
      $(".ice_widget").each(function (index) {
        widget_id = $(this).attr("id");
        widget_name = widgetsJson[$widgets[widget_id].widgetType].label;
        widget_names.push(widget_name);

        if (!count[widget_name]) {
          count[widget_name] = 1;
        } else {
          count[widget_name]++;
        }

        widget_label = widget_name + " " + count[widget_name];

        if (that.settings.specificwidget !== "" && that.settings.specificwidget == widget_id) {
          option_html = "<option selected='selected' value='" + widget_id + "'>" + widget_label + "</option>";
        } else if (widget_id != currentWidgetId) {
          option_html = "<option value='" + widget_id + "'>" + widget_label + "</option>";
        }

        $(".inputWidget").append(option_html);
      });
    });
    var selectedVal = that.settings.mediaElementPlayerEndTrackTo;

    if (selectedVal != "") {
      $('#button_select').val(selectedVal).trigger('change');
    }
  };

  this.onchangeSelectVal = function (selectorVal, settingsVar, valueSelected) {
    valueSelected = valueSelected != "" ? valueSelected : 0;
    var that = this;
    $("." + selectorVal).empty();
    var selectedVal = "";

    if (settingsVar !== "" && settingsVar == 'specifipage') {
      selectedVal = that.settings.specifipage;
    } else if (settingsVar !== "" && settingsVar == 'specifipagepopup') {
      selectedVal = that.settings.specifipagepopup;
    } else {
      selectedVal = '';
    }

    $courseJson.index[valueSelected].pages.forEach(function (page, index) {
      if (selectedVal == page.id) {
        $("." + selectorVal).append("<option value=\"".concat(page.id, "\" selected='selected'>").concat(page.title, "</option>"));
      } else {
        $("." + selectorVal).append("<option value=\"".concat(page.id, "\">").concat(page.title, "</option>"));
      }
    });
  };

  this.UploadVideo = function (ev) {
    ev.preventDefault();
    var that = this;
    var flagKey = false;
    var formData = new FormData(document.getElementById('video_widget_form'));
    var findEndName = that.settings.url.endsWith("default_video.mp4");

    if (fileSize == 0 && findEndName) {
      displayNotification("Please Select File");
      return;
    } else if (fileSize > 200) {
      $('#pageLogoutPopUp').html("");
      $('#pageLogoutPopUp').append(fileSizeLargeMsg("Please Select a File Less Then 200 MB"));
      $("#pageLogoutPopUp").modal("show");
      return;
    } else {
      if (that.settings.addMediaElementPlayer == "true") {
        if (posterfileSize == 0 && that.settings.posterImageUrl == "") {
          $('#pageLogoutPopUp').html("");
          $('#pageLogoutPopUp').append(fileSizeLargeMsg("Please Select a Poster Image "));
          $("#pageLogoutPopUp").modal("show");
          return;
        }
      }
      if (this.settings.mediaElementPlayerCC == "true" && captionfileSize == 0 && that.settings.CCTextUrl == "") {
        $('#pageLogoutPopUp').html("");
        $('#pageLogoutPopUp').append(fileSizeLargeMsg("Please Select a caption Text File "));
        $("#pageLogoutPopUp").modal("show");
        return;
      }

      $('#loader').show();

      if (that.settings.videoType != 'fixed') {
        flagKey = true;
      }

      switch (that.settings.alignment) {
        case "left":
          that.settings.alignment = "left";
          break;

        case "right":
          that.settings.alignment = "right";
          break;

        case "center":
          that.settings.alignment = 'center';
          break;
      }

      if (!flagKey) {
        var css = "width: ".concat(that.settings.width, ";height: ").concat(that.settings.height, "; margin: 0 !important;");
      } else {
        if (that.settings.addMediaElementPlayer == "true") {
          var css = "width: 100%; height: 100%; max-width: 100%; margin: 0 !important;";
        }else{
           var css = "width: auto; height: 100%; max-width: 100%; margin: 0 !important; max-height:70vh";
        }
        
      }

      that.settings.css = css;

      if ($('#button_select').val() !== "" && typeof $("#button_select").val() != undefined) {
        if ($(".externalurlval").val()) {
          that.saveurl(e);
        } else if ($(".inputChapter").val() && $(".inputPage").val()) {
          that.specificnumber(e);
        } else if ($(".nextval").val()) {
          that.nextfunc(e);
        } else if ($(".prevval").val()) {
          that.previousfunc(e);
        } else if ($(".inputWidget").val()) {
          that.specificwidget(e);
          that.settings.playerEndBtnAction = $(ev.target).find("#mediElement_player_end_action").is(':checked') == true ? "true" : "";
        } else if ($(".popuptitle").html()) {
          that.popupwidget(e);
        }
      }
      var inputTypeImgIdArr = [];
      var inputTypeImgLen = $("#video_widget_form [name='filename']").filter(function () {
        if ($(this).val() != "") {
          inputTypeImgIdArr.push($(this).val());
        }
        return $(this).val();
      }).length;
      
      if (inputTypeImgLen > 0) {
        axios.post(appUrl + '/multiUpload', formData, {
          headers: {
            "course_path": $courseJson.courseDirPath,
            "token": localStorage.getItem('token')
          }
        }).then(function (result) {
          var imgLen = result.data.data.length;
          if (result.data && result.data.data && imgLen > 0) {
            for (var i = 0; i < imgLen; i++) {
              if (result.data.data[i] != null && result.data.data[i] != "") {
                var fileExt = result.data.data[i].split('.')[result.data.data[i].split('.').length - 1].toLowerCase();

                if (fileExt == "jpg" || fileExt == "jpeg" || fileExt == "png") {
                  that.settings.posterImageUrl = result.data.data[i];
                } else if (fileExt == "txt" || fileExt == "vtt" || fileExt == "srt") {
                  that.settings.CCTextUrl = result.data.data[i];
                } else {
                  that.settings.url = result.data.data[i];
                }
              }
            }
          }

          that.widget.reMount(that.settings);
          fileSize = 0;
          posterfileSize = 0;
          captionfileSize = 0;
          $('input[type=file]').val(null);
          $('#loader').hide();
        }).catch(function (error) {
          $('#loader').hide();

          if (error.response) {
            if (error.response.data.toLowerCase().includes("file too large")) {
              $('#pageLogoutPopUp').append(fileSizeLargeMsg("File size too large"));
              $("#pageLogoutPopUp").modal("show");
            }
          }
        });
      } else {
        console.log(that.settings);
        that.widget.reMount(that.settings);
        $('#loader').hide();
      }
    }
  };

  this.saveurl = function (ev) {
    var that = this;
    that.resetMediaElementEndTrackAction();
    that.settings.externalPageUrl = $(".externalurlval").val();
    that.settings.target = "_blank";
  };

  this.specificnumber = function (ev) {
    var that = this;
    that.resetMediaElementEndTrackAction();
    that.settings.specifichapter = $(".inputChapter").val();
    that.settings.specifipage = $(".inputPage").val();
    that.settings.target = "_self";
    that.settings.specifichapterid = $courseJson.index[that.settings.specifichapter].id;
  };

  this.nextfunc = function (e) {
    var that = this;
    that.resetMediaElementEndTrackAction();
    that.settings.target = "_self";
    that.settings.nextval = $(".nextval").val();
  };

  this.previousfunc = function (e) {
    var that = this;
    that.resetMediaElementEndTrackAction();
    that.settings.target = "_self";
    that.settings.prevval = $(".prevval").val();
  };

  this.specificwidget = function (e) {
    var that = this;
    that.resetMediaElementEndTrackAction();
    that.settings.specificwidget = $(".inputWidget").val();
    that.settings.target = "_self";
  };

  this.popupwidget = function (e) {
    var that = this;
    that.resetMediaElementEndTrackAction();
    that.settings.popuptitle = $(".popuptitle").html();
    that.settings.popupcontent = $(".popupcontent").html();
    that.settings.target = "_self";
    /* for specific page */

    that.settings.specifichapterpopup = $(".inputChapterpopup").val();
    that.settings.specifipagepopup = $(".inputPagepopup").val();
    that.settings.specifichapteridpopup = $courseJson.index[that.settings.specifichapterpopup].id;
  };

  this.resetMediaElementEndTrackAction = function () {
    var that = this;
    that.settings.specifichapter = "";
    that.settings.specifichapterid = "";
    that.settings.specifipage = "";
    that.settings.popuptitle = "";
    that.settings.popupcontent = "";
    that.settings.target = "";
    that.settings.externalPageUrl = "";
    that.settings.nextval = "";
    that.settings.prevval = "";
    that.settings.specificwidget = "";
    that.settings.playerEndBtnAction = "";
    that.settings.specifichapterpopup = "";
    that.settings.specifipagepopup = "";
    that.settings.specifichapteridpopup = "";
  };

  this.redetMediaElementConfig = function () {
    var that = this;
    that.settings.addMediaElementPlayer = "false";
    that.settings.mediaElementPlayerVolume = "false";
    that.settings.mediaElementPlayerSeekBar = "true";
    that.settings.mediaElementPlayerFullScreen = "false";
    that.settings.mediaElementPlayerDuration = "false";
    that.settings.mediaElementPlayerCC = "false";
    that.settings.mediaElementPlayerEndTrackTo = "";
  };
}

function fileSizeWarning(event, filesize) {
  return "<div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\n\t<div class=\"modal-content modalContent\">\n\t\t<div class=\"modal-header modalHeader\">\n\t\t\t<h5 class=\"modal-title\">File Size warning!!!</h5>\n\t\t\t<button type=\"button\" class=\"close modalClose\" data-dismiss=\"modal\" aria-label=\"Close\">\n\t\t\t\t<span class=\"modalCloseIcon\"></span>\n\t\t\t\t<span class=\"modalCloseIcon\"></span>\n\t\t\t</button>\n\t\t</div>\n\t\t<div class=\"modal-body modalBody\">\n            <p>The file is ".concat(filesize, "MB exceeding the maximum file size 25MB</p>\n            <p>Do you want to proceed?</p>\n\t\t</div>\n\t\t<div class=\"modal-footer modalFooter\">\n            <button type=\"submit\" class=\"modalBtn NoBtn\" data-dismiss=\"modal\" aria-label=\"Close\">No</button>\n            <button type=\"submit\" id=\"yesBtn\" class=\"modalBtn yesBtn\" data-dismiss=\"modal\" aria-label=\"Close\">Yes</button>\n\t\t</div>\n\t</div>\n</div>");
}

function fileSizeLargeMsg(errorMsg) {
  return "<div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\n\t<div class=\"modal-content modalContent\">\n\t\t<div class=\"modal-header modalHeader\">\n\t\t\t<h5 class=\"modal-title\">File Size Error!!!</h5>\n\t\t\t<button type=\"button\" class=\"close modalClose\" data-dismiss=\"modal\" aria-label=\"Close\">\n\t\t\t\t<span class=\"modalCloseIcon\"></span>\n\t\t\t\t<span class=\"modalCloseIcon\"></span>\n\t\t\t</button>\n\t\t</div>\n\t\t<div class=\"modal-body modalBody\">\n            <p>".concat(errorMsg, "</p>\n\t\t</div>\n\t\t<div class=\"modal-footer modalFooter\">\n            <button type=\"submit\" class=\"modalBtn NoBtn\" data-dismiss=\"modal\" aria-label=\"Close\">Ok</button>\n\t\t</div>\n\t</div>\n</div>");
}

var setButtonState = function setButtonState() {
  if ($('#poster_file').val() !== "" && $('#file').val() !== "") {
    $('#video_widget_form button[type=submit]').removeClass("disabled");
  } else {
    $('#video_widget_form button[type=submit]').addClass("disabled");
  }
};


Video_w_v2.prototype = Object.create(MainWidget.prototype);