function Video_w() {
  var fileSize = 0;

  this.init = function () {
    this.settings = {
      "url": "./assets/video/default_video.mp4",
      "width": "auto",
      "height": "auto",
      "alignment": "left",
      "videoType": "responsive",
      "autoplay": false,
      "loop": false,
      "mute": true,
      "css": "width: 100%; height: initial; margin: 0 !important; display: inline-block;"
    };
    this.widget = new Widget(this.settings);
    this.widget.insert(this.settings);
    this.widget.openEditPanel(this.getFormHTML());
    this.bindEditFormEvents();
    this.custom(); //
    // $('#file').bind('change', function () {
    //        //     fileSize = 0;
    //     if (this.files && this.files.length > 0) {
    //         fileSize = this.files[0].size / 1024 / 1024;
    //         fileSize = fileSize.toFixed(2);
    //     }
    //     console.log(fileSize);
    // });

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
    var html = "\n            <div id=\"currentModalBox\">\n                <form id=\"video_widget_form\" class=\"form-settings\" >\n                    <div class=\"form-group p_20\">\n                        <label class=\"form-element-label\">File Upload</label>\n                        <input type=\"file\" id=\"file\" class=\"form-control form-file-element\" name=\"filename\" accept=\"video/*\">\n                        <label class=\"form-element-label alert-danger\">*Maximum upload file size: 200 MB</label>\n                    </div>\n                    <div id=\"accordion\" class=\"advance-setting-accordion\">\n                        <div class=\"card\">\n                            <div class=\"card-header advance_setting_hedaer\" id=\"headingOne\">\n                                <h2 class=\"mb-0\">\n                                    <span class=\"d-flex advance_flipcart btn btn-link collapsed\" data-toggle=\"collapse\" data-target=\"#collapsevideo\" aria-expanded=\"false\" aria-controls=\"collapseOne\">\n                                    More Settings </span>\n                                    </h2>\n                                <span class=\"advance-accordian-arrow collapsed\" data-toggle=\"collapse\" data-target=\"#collapsevideo\" aria-expanded=\"false\" aria-controls=\"collapseOne\"><i class=\"fa fa-angle-down rotate-icon\"></i></span>\n                            </div>\n                    <div id=\"collapsevideo\" class=\"collapse\" aria-labelledby=\"headingOne\" data-parent=\"#accordion\">\n                        <div class=\"card-body advance_setting_body\">\n                            <div class=\"form-group paddlr15\">\n                                <div class=\"row\">\n                                    <label class=\"radio-container col form-element-label margin0\">Responsive\n                                        <input type=\"radio\" name=\"videoType\" value=\"responsive\" class=\"margin0 widgetType\" ".concat(this.settings.videoType == 'responsive' ? 'checked' : '', ">\n                                        <span class=\"circlemark\"></span>\n                                    </label>\n                                    <label class=\"radio-container col form-element-label margin0\">Fixed\n                                        <input type=\"radio\" name=\"videoType\" value=\"fixed\" class=\"margin0 widgetType\" ").concat(this.settings.videoType == 'fixed' ? 'checked' : '', ">\n                                        <span class=\"circlemark\"></span>\n                                    </label>\n                                </div>\n                            </div>\n                            <div class=\"if_actual_image\">\n                                <div class=\"row margin0 collapse-group fixed-option\" id=\"group1\" style=\"display: flex;\">        \n                                    <div class=\"col-md-6 pl-0\">\n                                        <label class=\"form-element-label\">Width</label>\n                                        <input class=\"form-element\" id=\"width\" type=\"text\" name=\"width\" placeholder=\"Width\" value=\"").concat(this.settings.width, "\">\n                                        <span class=\"input-inst-msg\">e.g, 100px or 50%</span>\n                                    </div>\n                                    <div class=\"col-md-6 px-0\">\n                                        <label class=\"form-element-label\">Height</label>\n                                        <input class=\"form-element\" id=\"height\" type=\"text\" name=\"height\" placeholder=\"Height\" value=\"").concat(this.settings.height, "\">\n                                        <span class=\"input-inst-msg\">e.g, 100px or 50%</span>\n                                    </div>\n                                    <div class=\"col-md-12 pl-0\">\n                                        <div class=\"row form-group mt35\">\n                                            <div class=\"col-md-12\">\n                                                <label class=\"form-element-label\">Alignment</label>\n                                                <div class=\"row margin0\">\n                                                        <label class=\"radio-container width-33\">Left\n                                                            <input type=\"radio\" name=\"alignment\" value=\"left\" ").concat(this.settings.alignment == 'left' ? 'checked' : '', ">\n                                                            <span class=\"circlemark\"></span>\n                                                        </label>\n                                                        <label class=\"radio-container width-33\">Center\n                                                            <input type=\"radio\" name=\"alignment\" value=\"center\" ").concat(this.settings.alignment == 'center' ? 'checked' : '', ">\n                                                            <span class=\"circlemark\"></span>\n                                                        </label>\n                                                        <label class=\"radio-container width-30\">Right\n                                                            <input type=\"radio\" name=\"alignment\" value=\"right\" ").concat(this.settings.alignment == 'right' ? 'checked' : '', ">\n                                                            <span class=\"circlemark\"></span>\n                                                    </label>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col\">\n                                    <label class=\"form-element-label\">AutoPlay</label>\n                                    <label class=\"switch switch-flat\">\n                                        <input class=\"switch-input\" type=\"checkbox\" id=\"autoplay\" value=\"autoplay\" ").concat(this.settings.autoplay ? 'checked' : '', "/>\n                                        <span class=\"switch-label\" data-on=\"Yes\" data-off=\"No\"></span> \n                                        <span class=\"switch-handle\"></span> \n                                    </label>\n                                </div>\n                                <div class=\"col\">\n                                    <label class=\"form-element-label\">Loop</label>  \n                                    <label class=\"switch switch-flat\">\n                                        <input class=\"switch-input\" type=\"checkbox\" id=\"loop\" value=\"loop\" ").concat(this.settings.loop ? 'checked' : '', "/>\n                                        <span class=\"switch-label\" data-on=\"Yes\" data-off=\"No\"></span> \n                                        <span class=\"switch-handle\"></span> \n                                    </label>\n                                </div>\n                                <div class=\"col\">\n                                    <label class=\"form-element-label\">Mute</label>\n                                    <label class=\"switch switch-flat\">\n                                        <input class=\"switch-input\" type=\"checkbox\" id=\"muted\" value=\"muted\" ").concat(this.settings.mute ? 'checked' : '', "/>\n                                        <span class=\"switch-label\" data-on=\"Yes\" data-off=\"No\"></span> \n                                        <span class=\"switch-handle\"></span> \n                                    </label>\n                                </div>\n                            </div>\n                           </div>\n                         </div>\n                       </div>\n                    </div>\n                    <div class=\"form-group text-right px-3\">\n                        <button type=\"submit\" class=\"modalBtn yesBtn\">Apply</button>\n                    </div>\n                </form>\n            </div>             \n        ");
    return html;
  };

  this.bindEditFormEvents = function () {
    var that = this;
    widgetSettingPanelOpenSetIcon();
    $(function () {
      $('input[type=file]').change(function () {
        var val = $(this).val().toLowerCase(),
            regex = new RegExp("(.*?)\.(mp4|wmv|3gp|ogg|webm|flv|avi|quicktime|hdv|mxf|mgep-ts|mgep-2 ps|wav|broadcast wav|lxf|gxf|vob )$");

        if (!regex.test(val)) {
          $(this).val('');
          displayNotification("Please Choose Video Format");
          fileSize = 0;
          return;
        }
      });
    });
    $("#video_widget_form").on("submit", function (e) {
      e.preventDefault();
      widgetSettingPanelOpenSetIcon();
      that.settings.videoType = $(e.target).find("[name='videoType']:checked").val();
      that.settings.autoplay = $(e.target).find("#autoplay").is(':checked');
      that.settings.loop = $(e.target).find("#loop").is(':checked');
      that.settings.mute = $(e.target).find("#muted").is(':checked');

      if (that.settings.videoType == 'fixed') {
        var getWidthvalue = $("#width").val();
        var getEndPercentWidth = getWidthvalue.endsWith("%");
        var getEndPixelWidth = getWidthvalue.endsWith("px");
        var getHeightvalue = $("#height").val();
        var getEndPercentHeight = getHeightvalue.endsWith("%");
        var getEndPixelHeight = getHeightvalue.endsWith("px");

        if (getEndPercentWidth) {
          var removePercentageWidth = getWidthvalue.substring(0, getWidthvalue.length - 1);
          var isNumericWidth = removePercentageWidth.match(/^-{0,1}\d+$/);

          if (isNumericWidth == null) {
            displayNotification("Please Enter Valid Pattern Of Width");
            $("#width").css("background", "red");
            return;
          }

          if (removePercentageWidth > 100) {
            displayNotification("Please Enter Width between 0-100%");
            $("#width").css("background", "white");
            return;
          } else {
            that.settings.width = $(e.target).find("[name='width']").val();
            that.settings.height = $(e.target).find("[name='height']").val();
            that.settings.alignment = $(e.target).find("[name='alignment']:checked").val();
            $("#width").css("background", "white");
          }
        } else if (getEndPixelWidth) {
          var removePixelWidth = getWidthvalue.substring(0, getWidthvalue.length - 2);
          var isNumericWidthpixel = removePixelWidth.match(/^-{0,1}\d+$/);

          if (isNumericWidthpixel == null) {
            displayNotification("Please Enter Valid Pattern Of Width");
            $("#width").css("background", "red");
            return;
          } else {
            that.settings.width = $(e.target).find("[name='width']").val();
            that.settings.height = $(e.target).find("[name='height']").val();
            that.settings.alignment = $(e.target).find("[name='alignment']:checked").val();
            $("#width").css("background", "white");
          }
        } else if (getWidthvalue != "auto") {
          displayNotification("Please Enter Valid Pattern Of Width");
          $("#width").css("background", "red");
          return;
        } else {
          that.settings.width = $(e.target).find("[name='width']").val();
          that.settings.height = $(e.target).find("[name='height']").val();
          that.settings.alignment = $(e.target).find("[name='alignment']:checked").val();
          $("#width").css("background", "white");
        }

        if (getEndPercentHeight) {
          var removePercentageHeight = getHeightvalue.substring(0, getHeightvalue.length - 1);
          var isNumericHeight = removePercentageHeight.match(/^-{0,1}\d+$/);

          if (isNumericHeight == null) {
            displayNotification("Please Enter Valid Pattern Of Height");
            $("#height").css("background", "red");
            return;
          }

          if (removePercentageHeight > 100) {
            displayNotification("Please Enter Height between 0-100%");
            $("#height").css("background", "white");
            return;
          } else {
            that.settings.width = $(e.target).find("[name='width']").val();
            that.settings.height = $(e.target).find("[name='height']").val();
            that.settings.alignment = $(e.target).find("[name='alignment']:checked").val();
            $("#height").css("background", "white");
          }
        } else if (getEndPixelHeight) {
          var removePixelHeight = getHeightvalue.substring(0, getHeightvalue.length - 2);
          var isNumericHeightpixel = removePixelHeight.match(/^-{0,1}\d+$/);

          if (isNumericHeightpixel == null) {
            displayNotification("Please Enter Valid Pattern Of Height");
            $("#height").css("background", "red");
            return;
          } else {
            that.settings.width = $(e.target).find("[name='width']").val();
            that.settings.height = $(e.target).find("[name='height']").val();
            that.settings.alignment = $(e.target).find("[name='alignment']:checked").val();
            $("#height").css("background", "white");
          }
        } else if (getHeightvalue != "auto") {
          displayNotification("Please Enter Valid Pattern Of Height");
          $("#height").css("background", "red");
          return;
        } else {
          that.settings.width = $(e.target).find("[name='width']").val();
          that.settings.height = $(e.target).find("[name='height']").val();
          that.settings.alignment = $(e.target).find("[name='alignment']:checked").val();
          $("#height").css("background", "white");
        }
      }

      if (fileSize > 25) {
        $('#pageLogoutPopUp').html("");
        $('#pageLogoutPopUp').append(fileSizeWarning(e, fileSize));
        $("#pageLogoutPopUp").modal("show");
        $('#yesBtn').bind('click', function (e) {
          that.UploadVideo(e);
          fileSize = 0;
          $("#video_widget_form")[0].reset();
        });
      } else {
        that.UploadVideo(e);
        fileSize = 0;
        $("#video_widget_form")[0].reset();
      }
    }); // get file size before uploading

    $('#file').bind('change', function () {
      fileSize = 0;

      if (this.files && this.files.length > 0) {
        fileSize = this.files[0].size / 1024 / 1024;
        fileSize = fileSize.toFixed(2);
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
        var css = "width: ".concat(that.settings.width, "; \n                height: ").concat(that.settings.height, "; \n                margin: 0 !important;");
      } else {
        var css = "width: 100%; \n                height: 100%; \n                max-width: 100%;\n                margin: 0 !important;";
      }

      that.settings.css = css;

      if ($("#video_widget_form [name='filename']").val() != '') {
        $('#loader').show();
        axios.post(appUrl + '/new-image', formData, {
          headers: {
            "course_path": $courseJson.courseDirPath,
            "token": localStorage.getItem('token')
          }
        }).then(function (result) {
          that.settings.url = $courseJson.courseDirPath + result.data.data;
          that.widget.reMount(that.settings);
          $('#loader').hide();
        }).catch(function (error) {
          $('#loader').hide(); // handle error

          if (error.response) {
            if (error.response.data.toLowerCase().includes("file too large")) {
              $('#pageLogoutPopUp').append(fileSizeLargeMsg("File size too large"));
              $("#pageLogoutPopUp").modal("show");
            }
          }
        });
      } else {
        that.widget.reMount(that.settings);
      }
    }
  };
}

{
  /* <p>The file is ${filesize}MB exceeding the maximum file size 25MB</p> */
}

function fileSizeWarning(event, filesize) {
  return "<div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\n\t<div class=\"modal-content modalContent\">\n\t\t<div class=\"modal-header modalHeader\">\n\t\t\t<h5 class=\"modal-title\">File Size warning!!!</h5>\n\t\t\t<button type=\"button\" class=\"close modalClose\" data-dismiss=\"modal\" aria-label=\"Close\">\n\t\t\t\t<span class=\"modalCloseIcon\"></span>\n\t\t\t\t<span class=\"modalCloseIcon\"></span>\n\t\t\t</button>\n\t\t</div>\n\t\t<div class=\"modal-body modalBody\">\n            <p>The file is ".concat(filesize, "MB large it will enhance your final package size</p>\n            <p>Do you want to proceed?</p>  \n\t\t</div>\n\t\t<div class=\"modal-footer modalFooter\">\n            <button type=\"submit\" class=\"modalBtn NoBtn\" data-dismiss=\"modal\" aria-label=\"Close\">No</button>\n            <button type=\"submit\" id=\"yesBtn\" class=\"modalBtn yesBtn\" data-dismiss=\"modal\" aria-label=\"Close\">Yes</button>\n\t\t</div>\n\t</div>\n</div>");
}

function fileSizeLargeMsg(errorMsg) {
  return "<div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\n\t<div class=\"modal-content modalContent\">\n\t\t<div class=\"modal-header modalHeader\">\n\t\t\t<h5 class=\"modal-title\">File Size Error!!!</h5>\n\t\t\t<button type=\"button\" class=\"close modalClose\" data-dismiss=\"modal\" aria-label=\"Close\">\n\t\t\t\t<span class=\"modalCloseIcon\"></span>\n\t\t\t\t<span class=\"modalCloseIcon\"></span>\n\t\t\t</button>\n\t\t</div>\n\t\t<div class=\"modal-body modalBody\">\n            <p>".concat(errorMsg, "</p>\n\t\t</div>\n\t\t<div class=\"modal-footer modalFooter\">\n            <button type=\"submit\" class=\"modalBtn NoBtn\" data-dismiss=\"modal\" aria-label=\"Close\">Ok</button>\n\t\t</div>\n\t</div>\n</div>");
}

Video_w.prototype = Object.create(MainWidget.prototype);