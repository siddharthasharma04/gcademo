function Image_headingcontent() {
    this.init = function () {
      this.settings = {
        "url"               : "./assets/img/image-placeholdercontent-350x350.png",
        "width"             : "auto",
        "height"            : "auto",
        "alignment"         : "center",
        "imgtype"           : "responsive",
        "alt"               : "image",
        "rotation_angle"    : 0,
        "css"               : "max-width: 100%;width:200px; height: 200px; margin: 0 !important; display: inline-block;",
        "isMediaLibrary"    : false,
        "imageZoomOut"      : false,
        "heading"           : "Heading",
        "description"       : "Description comes here.",
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
      $('#image_widget_form').find('.collapse-input:checked').each(function () {
        that.collapseElement(this);
      });
      $('#image_widget_form').on('change', '.collapse-input', function () {
        that.collapseElement(this);
      });
    };
  
    this.collapseElement = function (that) {
      if (!($(that).val() == 'responsive' || $(that).val() == 'auto')) {
        $('#' + $(that).data('target')).hide().css('display', 'flex');
      } else {
        $('#' + $(that).data('target')).show().css('display', 'none');
      }
    };
  
    this.getFormHTML = function () {
      var html = "\n            <div id=\"currentModalBox\">\n            <form id=\"image_widget_form\" class=\"form-settings\">\n                <div class=\"form-group p_20 posRel\">\n\t\t\t\t\t<label class=\"form-element-label custom-label-box4\">File Upload</label>\n                    <input type=\"file\" id=\"file\" input-attr-id=\"2\" class=\"form-control form-file-element\"  name=\"filename\" accept=\"image/*\">\n                </div>\n                <div class=\"text-center\">\n                    <span class=\"font12\">OR</span>\n                </div>\n                <div class=\"form-group p_20\">\n                        <div class=\"form-group\">\n                            <button type=\"button\" id=\"showImageLibrary1\" data-btn-attr=\"1\"  class=\"width100 font12 formBtn yesBtn showImageLibrarybtn\">Select from Image Library</button>\n                            <span class=\"showImageLibraryFileName\"></span>\n                        </div>\n                </div>\n\n     <div class=\"form-group px_20 mt20\">\n\t\t\t\t\t<label class=\"form-element-label custom-label-box4\">Heading</label>\n\t\t\t\t\t<div contenteditable=\"true\" type=\"text\" id=\"ImageHeading\" class=\"h-auto form-control  form-file-element\" required name=\"Image Heading\">".concat(this.settings.heading, "</div>\n\t\t\t\t</div>\n                <div class=\"form-group px_20 mt20\">\n\t\t\t\t\t<label class=\"form-element-label custom-label-box4\">Description</label>\n\t\t\t\t\t<div contenteditable=\"true\" type=\"text\" id=\"imageDescription\" class=\"h-auto  form-control form-file-element\" required name=\"description\">").concat(this.settings.description, "</div>\n\t\t\t\t</div>\n             <div id=\"accordion\" class=\"advance-setting-accordion\">\n                    <div class=\"card\">\n                        <div class=\"card-header advance_setting_hedaer\" id=\"headingOne\">\n                            <h2 class=\"mb-0\">\n                                <button type =\"button\" class=\"d-flex  btn btn-link collapsed\" data-toggle=\"collapse\" data-target=\"#collapseimage\" aria-expanded=\"false\" aria-controls=\"collapseOne\">\n                                More Settings  \n                                </button>\n                            </h2>\n                            <span class=\"advance-accordian-arrow collapsed\" data-toggle=\"collapse\" data-target=\"#collapseimage\" aria-expanded=\"false\" aria-controls=\"collapseOne\"><i class=\"fa fa-angle-down rotate-icon\"></i></span>\n                        </div>\n                        <div id=\"collapseimage\" class=\"collapse\" aria-labelledby=\"headingOne\" data-parent=\"#accordion\">\n                        <div class=\"card-body advance_setting_body\">\n                        <div class=\"form-group paddlr15\">\n                            <div class=\"row\">\n                                <label class=\"radio-container col margin0 form-element-label custom-label-box4\">Responsive\n                                    <input type=\"radio\" name=\"imgType\" value=\"responsive\" class=\"widgetType\"  ").concat(this.settings.imgtype == 'responsive' ? 'checked' : '', " >\n                                    <span class=\"circlemark\"></span>\n                                </label>\n                                <label class=\"radio-container col margin0 form-element-label custom-label-box4\">Fixed\n                                    <input type=\"radio\"  name=\"imgType\" value=\"fixed\" class=\"widgetType\" ").concat(this.settings.imgtype == 'fixed' ? 'checked' : '', " >\n                                    <span class=\"circlemark\"></span>\n                                </label>\n                            </div>\n    \t\t\t\t    </div>\n                        <div class=\"if_actual_image mt20\">\n                            <div class=\"row margin0 collapse-group fixed-option\" id=\"group1\" style=\"display: flex;\">\n                                <div class=\"col-md-6 pl-0\">\n                                    <label class=\"form-element-label custom-label-box4\">Width</label>\n                                    <input class=\"form-element\" type=\"text\" id=\"width\" name=\"width\" placeholder=\"Width\" value=\"").concat(this.settings.width, "\">\n                                    <span class=\"input-inst-msg\">e.g, 100px or 50%</span>\n                                </div>\n                                <div class=\"col-md-6 px-0\">\n                                    <label class=\"form-element-label custom-label-box4\">Height</label>\n                                    <input class=\"form-element\" type=\"text\" id=\"height\" name=\"height\" placeholder=\"Height\" value=\"").concat(this.settings.height, "\">\n                                    <span class=\"input-inst-msg\">e.g, 100px or 50%</span>\n                                </div>\n                                <div class=\"col-md-12 pl-0\">\n                                    <div class=\"row form-group\">\n                                        <div class=\"col-md-12\">\n                                            <label class=\"form-element-label column-setting-heading\">Alignment</label>\n                                            <div class=\"row margin0\">\n                                                <label class=\"radio-container width-33 custom-label-box4\">Left\n                                                    <input type=\"radio\"  name=\"alignment\" value=\"left\" ").concat(this.settings.alignment == 'left' ? 'checked' : '', ">\n                                                    <span class=\"circlemark\"></span>\n                                                </label>\n                                                <label class=\"radio-container width-33 custom-label-box4\">Center\n                                                    <input type=\"radio\"  name=\"alignment\" value=\"center\" ").concat(this.settings.alignment == 'center' ? 'checked' : '', ">\n                                                    <span class=\"circlemark\"></span>\n                                                </label>\n                                                <label class=\"radio-container width-30 custom-label-box4\">Right\n                                                    <input type=\"radio\"  name=\"alignment\" value=\"right\" ").concat(this.settings.alignment == 'right' ? 'checked' : '', ">\n                                                    <span class=\"circlemark\"></span>\n                                                </label>\n                                            <label class=\"radio-container mt20 custom-label-box4\">Vertical Center\n                                                    <input type=\"radio\"  name=\"alignment\" value=\"Vertical Center\" ").concat(this.settings.alignment == 'Vertical Center' ? 'checked' : '', ">\n                                                    <span class=\"circlemark\"></span>\n                                                </label>\n                                                </div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n        \t\t\t\t\t<label class=\"form-element-label column-setting-heading custom-label-box4\">Alt Text</label>\n        \t\t\t\t\t<input type=\"text\" id=\"alt-text\" class=\"form-control form-file-element\" required name=\"alt-text\" value=\"").concat(this.settings.alt, "\">\n        \t\t\t\t</div>\n                        <div class=\"form-group \">\n                            <label class=\"form-element-label column-setting-heading custom-label-box4\">Rotation angle (deg)</label>\n                            <input type=\"number\" id=\"rotation_angle\" class=\"form-control form-file-element\" name=\"rotation_angle\" value=\"").concat(this.settings.rotation_angle, "\">\n                        </div>\n<div class=\"form-group\"><label class=\"form-element-label custom-label-box4 column-setting-heading\"><span></span> Image Zoom </label><label class=\"switch switch-flat\"><input class=\"switch-input\" type=\"checkbox\" id=\"imageZoomOut\" value=\"yes\" ").concat(this.settings.imageZoomOut ? 'checked' : ' ', "/><span class=\"switch-label\" data-on=\"Yes\" data-off=\"No\"></span><span class=\"switch-handle\"></span></label></div>                        </div>\n                        </div>\n                    </div>\n                </div>\n\t\t\t\t<div class=\"form-group text-right px-3\">\n\t\t\t\t\t<button type=\"submit\" class=\"formBtn yesBtn\">Apply</button>\n\t\t\t\t</div>\n            </form>\n            </div>              \n        ");
      return html;
    };
  
    this.bindEditFormEvents = function () {
      var that = this;
      widgetSettingPanelOpenSetIcon();
      enableCkeditor("ImageHeading");
      enableCkeditor("imageDescription");
      $("#image_widget_form").on("submit", function (e) {
        e.preventDefault();
        //image library
        if ($('.showImageLibraryFileName').css("display") == "block") {
          mediaLibObj = imageLibraryHandler();
          that.settings.url = mediaLibObj.url;
          that.settings.isMediaLibrary = mediaLibObj.isMediaLib;
        }
        // image upload
        that.UploadImage(e);
  
        if (success) {
          $("#image_widget_form input[type='file']").val('');
          $('.image-library-container li').removeClass('image-selected');
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
  
      if (this.settings.imgtype == 'fixed') {
        $(".if_actual_image").show();
        $('#width,#height').prop('required', 'required');
      } else {
        $(".if_actual_image").hide();
        $('#width,#height').removeAttr('required');
      }
  
      $('#image_widget_form input[type="file"]').change(function () {
        that.settings.isMediaLibrary = false;
        $('.showImageLibraryFileName').text("").hide();
        var ext = this.value.match(/\.(.+)$/)[1];
        var extSplit = ext.split('.');
        var lastExt = extSplit[extSplit.length - 1];
  
        switch (lastExt.toLowerCase()) {
          case 'jpg':
          case 'jpeg':
          case 'png':
          case 'gif':
          case 'svg':
          case 'bmp':
            $('#file').attr('disabled', false);
            break;
  
          default:
            displayNotification("This is not an allowed file type.", 'error');
            this.value = '';
        }
      });
    };
  
    this.UploadImage = function (ev) {
      ev.preventDefault();
      var that = this;
      var flagKey = false;
      var formData = new FormData(document.getElementById('image_widget_form'));
      that.settings.imgtype = $(ev.target).find("[name='imgType']:checked").val();
      that.settings.alt = $(ev.target).find('#alt-text').val();
      that.settings.rotation_angle = $(ev.target).find('#rotation_angle').val();
      that.settings.heading = $(ev.target).find('#ImageHeading').html();
      that.settings.description = $(ev.target).find('#imageDescription').html();
      that.settings.imageZoomOut =document.getElementById('imageZoomOut').checked ? true : false;
      if (that.settings.imgtype == 'fixed') {
        var getWidthvalue = $("#width").val();
        var getEndWidth = getWidthvalue.endsWith("%");
        var getHeightvalue = $("#height").val();
        var getEndHeight = getHeightvalue.endsWith("%");
  
        if (getEndWidth) {
          var removePercebtageWidth = getWidthvalue.substring(0, getWidthvalue.length - 1);
  
          if (removePercebtageWidth > 100) {
            displayNotification("Please Enter Width between 0-100%");
            success = false;
            return;
          } else {
            that.settings.width = $(ev.target).find("[name='width']").val();
            that.settings.height = $(ev.target).find("[name='height']").val();
            that.settings.alignment = $(ev.target).find("[name='alignment']:checked").val();
            success = true;
          }
        } else {
          that.settings.width = $(ev.target).find("[name='width']").val();
          that.settings.height = $(ev.target).find("[name='height']").val();
          that.settings.alignment = $(ev.target).find("[name='alignment']:checked").val();
          success = true;
        }
  
        if (getEndHeight) {
          var removePercebtageHeight = getHeightvalue.substring(0, getHeightvalue.length - 1);
  
          if (removePercebtageHeight > 100) {
            displayNotification("Please Enter Height between 0-100%");
            success = false;
            return;
          } else {
            that.settings.width = $(ev.target).find("[name='width']").val();
            that.settings.height = $(ev.target).find("[name='height']").val();
            that.settings.alignment = $(ev.target).find("[name='alignment']:checked").val();
            success = true;
          }
        } else {
          that.settings.width = $(ev.target).find("[name='width']").val();
          that.settings.height = $(ev.target).find("[name='height']").val();
          that.settings.alignment = $(ev.target).find("[name='alignment']:checked").val();
          success = true;
        }
      } else {
        flagKey = true;
        success = true;
      }
  
      switch (that.settings.alignment) {
        case "left":
          that.settings.alignment = "left";
          break;
  
        case "right":
          that.settings.alignment = "right";
          break;
  
        case "center":
          that.settings.alignment = "center";
          break;
      }
  
      if (!flagKey) {
        var css = "  width: ".concat(that.settings.width, "; \n                height: ").concat(that.settings.height, "; \n                margin: 0 !important; \n                transform: rotate(").concat(that.settings.rotation_angle, "deg);");
      } else {
        var css = "max-width: 100%; \n                height: initial; \n                margin: 0 !important;\n                transform: rotate(".concat(that.settings.rotation_angle, "deg);");
      }
  
      that.settings.css = css;
  
      if ($("#image_widget_form [name='filename']").val() != '') {
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
        });
      } else if (that.settings.isMediaLibrary == true) {
        var arbitaryFileData = that.settings;
        $('#loader').show();
        axios.post(appUrl + '/new-image-from-gallery', arbitaryFileData, {
          headers: {
            "course_path": $courseJson.courseDirPath,
            "token": localStorage.getItem('token')
          }
        }).then(function (result) {
          that.settings.url = $courseJson.courseDirPath + result.data.data;
          setTimeout(function () {
            that.widget.reMount(that.settings);
            $('.showImageLibraryFileName').hide();
            $('#loader').hide();
          }, 300);
        });
      } else {
        that.widget.reMount(that.settings);
      }
    };
  }
  
  Image_headingcontent.prototype = Object.create(MainWidget.prototype);
  
