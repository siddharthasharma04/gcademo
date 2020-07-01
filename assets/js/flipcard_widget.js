function Flipcard_widget() {
  this.init = function () {
    this.settings = {
      "url": "./assets/img/image-placeholder-350x350.png",
      "width": "300px",
      "height": "auto",
      "alignment": "center",
      "imgtype": "responsive",
      "alt": "image",
      "title": "Title comes here",
      "description": "Description comes here.",
      "css": "max-width: 100%; height: auto; margin: 0 !important; display: inline-block;",
      "backdropColor": "#9eddf1",
      "isMediaLibrary": false
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
    var html = "\n            <div id=\"currentModalBox\">\n            <form id=\"image_widget_form\" class=\"form-settings\" >\n                <div class=\"form-group p_20\">\n\t\t\t\t\t<label class=\"form-element-label custom-label-box4\">File Upload</label>\n\t\t\t\t\t<input type=\"file\" id=\"file\" class=\"form-control form-file-element\" name=\"filename\"  accept=\"image/*\">\n                </div>\n                <div class=\"text-center\">\n                    <span class=\"font12\">OR</span>\n                </div>\n                <div class=\"form-group p_20\">\n                        <div class=\"form-group\">\n                            <button type=\"button\" id=\"showImageLibrary1\" class=\"width100 font12 formBtn yesBtn showImageLibrarybtn\">Select from Image Library</button>\n                            <span class=\"showImageLibraryFileName\"></span>\n                        </div>\n                </div>\n                <div class=\"form-group px_20 mt20\">\n\t\t\t\t\t<label class=\"form-element-label custom-label-box4\">Title</label>\n\t\t\t\t\t<div contenteditable=\"true\" type=\"text\" id=\"fp-title\" class=\"h-auto form-control  form-file-element\" required name=\"fp-title\" data-maxlength=\"50\">".concat(this.settings.title, "</div>\n\t\t\t\t</div>\n                <div class=\"form-group px_20 mt20\">\n\t\t\t\t\t<label class=\"form-element-label custom-label-box4\">Description</label>\n\t\t\t\t\t<div contenteditable=\"true\" type=\"text\" id=\"fp-description\" class=\"h-auto  form-control form-file-element\" required name=\"fp-description\">").concat(this.settings.description, "</div>\n\t\t\t\t</div>\n                <div class=\"form-group px_20 mt20\">\n\t\t\t\t\t<label class=\"form-element-label custom-label-box4\">Backdrop Color</label>\n\t\t\t\t\t<div class=\"flipcadBackDrop\"><input type=\"text\" id=\"fp-backdropColor\" class=\"form-control form-file-element\" required name=\"backdropColor\" value=\"").concat(this.settings.backdropColor, "\">\n\t\t\t\t</div>\n  </div>              <div class=\"form-group px_20 mt20\">\n\t\t\t\t\t<label class=\"form-element-label custom-label-box4\">Alt Text</label>\n\t\t\t\t\t<input type=\"text\" id=\"alt-text\" class=\"form-control form-file-element\" name=\"alt-text\" required value=\"").concat(this.settings.alt, "\">\n\t\t\t\t</div>\n                <div id=\"accordion\" class=\"advance-setting-accordion\">\n                    <div class=\"card\">\n                        <div class=\"card-header advance_setting_hedaer\" id=\"headingOne\">\n                            <h2 class=\"mb-0\">\n                                <span class=\"advanceSetting advance_flipcart d-flex  btn btn-link collapsed\" data-toggle=\"collapse\" data-target=\"#collapseimage\" aria-expanded=\"false\" aria-controls=\"collapseOne\">\n                                More Settings \n                                 <span class=\"advance-accordian-arrow collapsed\" data-toggle=\"collapse\" data-target=\"#collapseimage\" aria-expanded=\"false\" aria-controls=\"collapseOne\"><i class=\"fa fa-angle-down rotate-icon\"></i></span>\n                                </span>\n                            </h2>\n                          \n                        </div>\n                        <div id=\"collapseimage\" class=\"collapse\" aria-labelledby=\"headingOne\" data-parent=\"#accordion\">\n                            <div class=\"card-body advance_setting_body\">\n                                <div class=\"paddlr15\">\n                                    <div class=\"row\">\n                                        <label class=\"radio-container col form-element-label margin0 custom-label-box4\">Responsive\n                                            <input type=\"radio\" name=\"imgType\" value=\"responsive\" class=\"margin0 widgetType\" ").concat(this.settings.imgtype == 'responsive' ? 'checked' : '', " >\n                                            <span class=\"circlemark\"></span>\n                                        </label>\n                                        <label class=\"radio-container col form-element-label margin0 custom-label-box4\">Fixed\n                                            <input type=\"radio\"  name=\"imgType\" value=\"fixed\" class=\"margin0 widgetType\" ").concat(this.settings.imgtype == 'fixed' ? 'checked' : '', " >\n                                            <span class=\"circlemark\"></span>\n                                        </label>\n                                    </div>\n                \t\t\t\t</div>\n                                <div class=\"if_actual_image mt20\">\n                                    <div class=\"row margin0 fixed-option collapse-group\" id=\"group1\" style=\"display: flex;\">\n                                        <div class=\"col-md-6 pl-0 mt20\">\n                                            <label class=\"form-element-label custom-label-box4\">Width</label>\n                                            <input class=\"form-element\" type=\"text\" id=\"width\" name=\"width\" placeholder=\"Width\" value=\"").concat(this.settings.width, "\">\n                                            <span class=\"input-inst-msg\">e.g, 100px or 50%</span>\n                                        </div>\n                                        <div class=\"col-md-6 px-0 mt20\">\n                                            <label class=\"form-element-label custom-label-box4\">Height</label>\n                                            <input class=\"form-element\" type=\"text\" id=\"height\" name=\"height\" placeholder=\"Height\" value=\"").concat(this.settings.height, "\">\n                                            <span class=\"input-inst-msg\">e.g, 100px or 50%</span>\n                                        </div>\n                                        <div class=\"col-md-12 pl-0\">\n                                            <div class=\"row\">\n                                                <div class=\"col-md-12\">\n                                                    <label class=\"form-element-label column-setting-heading\">Alignment</label>\n                                                    <div class=\"row margin0\">\n                                                        <label class=\"radio-container width-33 custom-label-box4\">Left\n                                                            <input type=\"radio\"  name=\"alignment\" value=\"left\" ").concat(this.settings.alignment == 'left' ? 'checked' : '', ">\n                                                            <span class=\"circlemark\"></span>\n                                                        </label>\n                                                        <label class=\"radio-container width-33 custom-label-box4\">Center\n                                                            <input type=\"radio\"  name=\"alignment\" value=\"center\" ").concat(this.settings.alignment == 'center' ? 'checked' : '', ">\n                                                            <span class=\"circlemark\"></span>\n                                                        </label>\n                                                        <label class=\"radio-container width-30 custom-label-box4\">Right\n                                                            <input type=\"radio\"  name=\"alignment\" value=\"right\" ").concat(this.settings.alignment == 'right' ? 'checked' : '', ">\n                                                            <span class=\"circlemark\"></span>\n                                                        </label>\n                                                    </div>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\t\t\t\t<div class=\"form-group text-right px-3\">\n\t\t\t\t\t<button type=\"submit\" class=\"formBtn yesBtn\" id=\"apply_flipcart\">Apply</button>\n\t\t\t\t</div>\n            </form>\n            </div>              \n        ");
    return html;
  };

  this.bindEditFormEvents = function (type) {
    var that = this;
    widgetSettingPanelOpenSetIcon();
      // colorpicker
      $('#fp-backdropColor').spectrum(getColorPickerForSpectrum(that.settings.backdropColor));
  
    title = document.querySelector('#fp-title');
    description = document.querySelector('#fp-description');
    Length = {
      titleLength: 50,
      descriptionLength: 150
    };
    keys = {
      'backspace': 8,
      'shift': 16,
      'ctrl': 17,
      'alt': 18,
      'delete': 46,
      // 'cmd':
      'leftArrow': 37,
      'upArrow': 38,
      'rightArrow': 39,
      'downArrow': 40
    };
    utils = {
      special: {},
      navigational: {},
      isSpecial: function isSpecial(e) {
        return typeof this.special[e.keyCode] !== 'undefined';
      },
      isNavigational: function isNavigational(e) {
        return typeof this.navigational[e.keyCode] !== 'undefined';
      }
    };
    utils.special[keys['backspace']] = true;
    utils.special[keys['shift']] = true;
    utils.special[keys['ctrl']] = true;
    utils.special[keys['alt']] = true;
    utils.special[keys['delete']] = true;
    utils.navigational[keys['upArrow']] = true;
    utils.navigational[keys['downArrow']] = true;
    utils.navigational[keys['leftArrow']] = true;
    utils.navigational[keys['rightArrow']] = true;
    title.addEventListener('keydown', function (event) {
      var len = event.target.innerText.trim().length;
      hasSelection = false;
      selection = window.getSelection();
      isSpecial = utils.isSpecial(event);
      isNavigational = utils.isNavigational(event);

      if (selection) {
        hasSelection = !!selection.toString();
      }

      if (isSpecial || isNavigational) {
        return true;
      }

      if (len >= Length.titleLength && !hasSelection) {
        event.preventDefault();
        displayNotification("Title can not be more than 50 characters", 'error');
        return false;
      }
    });
    description.addEventListener('keydown', function (event) {
      var len = event.target.innerText.trim().length;
      hasSelection = false;
      selection = window.getSelection();
      isSpecial = utils.isSpecial(event);
      isNavigational = utils.isNavigational(event);

      if (selection) {
        hasSelection = !!selection.toString();
      }

      if (isSpecial || isNavigational) {
        return true;
      }

      if (len >= Length.descriptionLength && !hasSelection) {
        event.preventDefault();
        displayNotification("Description can not be more than 159 characters", 'error');
        return false;
      }
    });
   
  
    $("#image_widget_form").on("submit", function (e) {
      e.preventDefault();
      that.settings.imgtype = $(e.target).find("[name='imgType']:checked").val();
      that.settings.alt = $(e.target).find('#alt-text').val();
      that.settings.title = $(e.target).find('#fp-title').html();
      that.settings.description = $(e.target).find('#fp-description').html();
      that.settings.backdropColor = $(e.target).find('.flipcadBackDrop').find('.sp-preview-inner').css("background-color");

      if ($('.showImageLibraryFileName').css("display") == "block") {
        mediaLibObj = imageLibraryHandler();
        that.settings.url = mediaLibObj.url;
        that.settings.isMediaLibrary = mediaLibObj.isMediaLib;
      }

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

    enableCkeditor("fp-title");
    enableCkeditor("fp-description");
    $('#image_widget_form input[type="file"]').change(function () {
      that.settings.isMediaLibrary = false;
      $('.showImageLibraryFileName').text("").hide();
      var ext = this.value.match(/\.(.+)$/)[1];

      switch (ext.toLowerCase()) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
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
    var that = this; // var flagKey = false

    var formData = new FormData(document.getElementById('image_widget_form'));
    if (that.settings.imgtype == 'fixed') {
      that.settings.width = $(ev.target).find("[name='width']").val();
      that.settings.height = $(ev.target).find("[name='height']").val();
      that.settings.alignment = $(ev.target).find("[name='alignment']:checked").val(); // } else{
      //     that.settings.width         = '100%';
      //     that.settings.height        = $(ev.target).find("[name='imgHeight']:checked").val();
      //     if(that.settings.height == 'auto'){
      //         flagKey = true
      //         that.settings.height = '100%';
      //     }
      //     else{
      //         flagKey = true
      //         that.settings.height = $(ev.target).find("[name='responsiveHeight']").val() + 'px';
      //     }
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

    if (that.settings.imgtype === 'fixed') //fixed
      {
        that.settings.css = "width: ".concat(that.settings.width, "; \n                height: ").concat(that.settings.height, "; \n                margin: 0 !important;\n                max-width: 100%;\n                display: inline-block;");
      } else {
      //responsive
      that.settings.css = "width: 100%; \n                height: initial; \n                margin: 0 !important;\n                max-width: 100%;\n                display: inline-block;";
    }

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

Flipcard_widget.prototype = Object.create(MainWidget.prototype);