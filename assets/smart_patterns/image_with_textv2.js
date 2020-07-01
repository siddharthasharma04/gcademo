function Image_with_textv2() {
  this.init = function () {
    this.settings = {
      "url": "",
      "image_url": "",
      "imageShapeUrl": "",
      "tempUrl": '',
      texts: [],
      singelShape: [],
      bgColor: "white"
    };
    this.dummySettings = Helpers.cloneObject(this.settings);
    this.widget = new Widget(this.settings);
    this.widget.openAddModal(this.getFormHTML());
    this.bindAddFormEvents();
    return this.widget.getWidgetId();
  };

  this.edit = function () {
    this.widget.openAddModal(this.getFormHTML());
    this.bindEditFormEvents("edit");
  };

  this.setFormValueEmpty = function (e) {
    $(e.currentTarget).closest('form').find('#file').val('');
  };

  this.getButtonEnabled = function (element) {
    $(element).prop('disabled') ? $(element).removeAttr('disabled') : '';
  };

  this.getButtonDisabled = function (element) {
    !$(element).prop('disabled') ? $(element).attr('disabled', 'disabled') : '';
  };

  this.getFormHTML = function () {
    var html = $("\n            <div class=\"widget-settings-wrapper mdwrap\">\n                <form id=\"iwt_widget_form\" class=\"form-settings mcq_modal modalBody\">\n                    <div class=\"row\">\n                        <div class=\"col-md-5\">\n                            <div class=\"form-group\">\n                                <label class=\"modalLabel custom-label-box4\">Select image</label>\n                                <input id=\"file\" type=\"file\" name=\"filename\" class=\"form-control form-file-element\" accept=\"image/*\"/>\n                            </div>\n                        </div>\n                        <div class=\"col-md-2\">\n                            <div class=\"mt30 text-center\">\n                                <label class=\"modalLabel custom-label-box4\">OR</label>\n                            </div>\n                        </div>\n                        <div class=\"col-md-5\">\n                            <div class=\"form-group\">\n                                <label class=\"form-element-label visibleHidden\">Select image</label>\n                                <button type=\"button\" class=\"modalBtn yesBtn width100 showImageLibrarybtn\" id=\"showImageLibrary\">Select from Image Library</button>\n                                <span class=\"showImageLibraryFileName\"></span>\n                            </div>\n                        </div>\n                        <div class=\"col-md-12\">\n                            <div class=\"form-group text-center top-grey-border pt30\">\n                                <button type=\"submit\" class=\"modalBtn yesBtn\" id=\"addimage\" disabled>Add Image</button>\n                            </div>\n                        </div>\n                    </div>\n                    <div id=\"addShapes\">\n                        <div class=\"form-group row\">\n                            <div class=\"col-sm-12\">\n                                <label class=\"modalLabel custom-label-box4\">Add Shapes</label>\n                                <div class=\"shapes-wrapper\">\n                                    <a class=\"shape-item\">\n                                        <img src=\"assets/img/circle.png\" width=\"25\" data-drag-item=\"icon\" data-shape-type=\"circle\" title=\"Circle\">\n                                    </a>\n                                    <a class=\"shape-item\">\n                                        <img src=\"assets/img/image.png\" width=\"23\" data-drag-item=\"icon\" data-shape-type=\"image\" title=\"Image\">\n                                    </a>\n                                    <a class=\"shape-item\">\n                                        <img src=\"assets/img/rectangle.png\" width=\"25\" data-drag-item=\"icon\" data-shape-type=\"rectangle\" title=\"Rectangle\">\n                                    </a>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div id=\"iwt_widget_demo\" class=\"\" style=\"display:none\">\n                        <!--<div class=\"form-group row\">\n                            <div class=\"col-sm-12\">\n                                <label class=\"modalLabel custom-label-box4\">Shape background color</label>\n                                <input id=\"text_bg\" type=\"text\" class=\"form-control modalInput\" value=\"rgb(255, 128, 0)\" />\n                            </div>\n                        </div>-->\n                        <div id=\"iwt_widget_wrapper\"></div>\n                        <div class=\"pt-3\">\n                            <div class=\"row\">\n                                <div class=\"col-md-12\">\n                                    <button type=\"button\" class=\"modalBtn yesBtn pull-right\" id=\"saveiwt\" value=\"Save\">Apply</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </form>\n                \n                \n            </div>\n        ");
    return html;
  };

  this.bindAddFormEvents = function () {
    var that = this;
    var dataForm = new FormData(document.getElementById('iwt_widget_form'));
    $('#iwt_widget_form').on("click", "#addimage", function (ev) {
      ev.preventDefault();
      var obj = {};
      obj.formName = 'iwt_widget_form';
      var localFileInput = $(this).closest('form').find('input[type="file"]').val();
      that.getButtonDisabled('#addimage');
      dataForm.append('inputFileName', $(this).closest('form').find('input[type="file"]').val());

      if (localFileInput) {
        that.UploadImage(ev, obj);
        that.settings.image_url = '';
        that.dummySettings.url = '';
      } else {
        if ($('.showImageLibraryFileName').css("display") == "block") {
          mediaLibObj = imageLibraryHandler();
          that.dummySettings.url = that.settings.url;
          that.settings.url = that.settings.image_url = mediaLibObj.url;
          that.settings.isMediaLibrary = mediaLibObj.isMediaLib;
          that.UploadImage(ev, obj);
        }
      }
    });
    $('#iwt_widget_form input[type="file"]').change(function () {
      that.settings.isMediaLibrary = false;
      $('.showImageLibraryFileName').text("").hide();
      that.getButtonEnabled('#addimage');
      var ext = this.value.match(/\.(.+)$/)[1];
      var extSplit = ext.split('.');
      var lastExt = extSplit[extSplit.length - 1];

      switch (lastExt.toLowerCase()) {
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
    $(document).on('change', '#imageOnImageForm input[type="file"]', function () {
      that.getButtonEnabled('#addImageOnImage');
    });
  };

  this.bindEditFormEvents = function (type) {
    
    $('#iwt_widget_wrapper').html("<img src=\"".concat($courseJson.courseDirPath + this.settings.image_url, "\" alt=\"Avatar\" class=\"iwt_image\" draggable=\"false\"/>")).show();
    $("#iwt_widget_demo, #saveiwt, #iwt_widget_form").show();
    this.loadTexts();
    this.dummySettings = Helpers.cloneObject(this.settings);
    this.bindImageEvents(type);
    var that = this;
    $('#iwt_widget_form').off('click').on("click", "#addimage", function (ev) {
      var dataForm = new FormData(document.getElementById('iwt_widget_form'));
      ev.preventDefault();
      var obj = {};
      obj.formName = 'iwt_widget_form';
      var localFileInput = $(this).closest('form').find('input[type="file"]').val();
      dataForm.append('inputFileName', $(this).closest('form').find('input[type="file"]').val());
      that.getButtonDisabled('#addimage');

      if (localFileInput) {
        that.settings.isMediaLibrary = false;
        that.UploadImage(ev, obj, type); // that.settings.image_url = '';

        that.dummySettings.url = '';
      } else {
        if ($('.showImageLibraryFileName').css("display") == "block") {
          mediaLibObj = imageLibraryHandler();
          that.dummySettings.url = that.settings.url;
          that.settings.url = mediaLibObj.url;
          that.settings.isMediaLibrary = mediaLibObj.isMediaLib;
        }

        that.UploadImage(ev, obj, type);
      }
    });
    $('#iwt_widget_form input[type="file"]').change(function () {
      that.settings.isMediaLibrary = false;
      $('.showImageLibraryFileName').text("").hide();
      that.getButtonEnabled('#addimage');
      var ext1 = this.value.match(/\.(.+)$/)[1];
      var extSplit1 = ext1.split('.');
      var lastExt1 = extSplit1[extSplit1.length - 1];

      switch (lastExt1.toLowerCase()) {
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
    $(document).on('change', '#imageOnImageForm input[type="file"]', function () {
      that.getButtonEnabled('#addImageOnImage');
    });
  };

  this.loadTexts = function () {
    
    //change to load iwt
    var that = this;
    var iwtHeight = 0;
    var iwtWidth = 0;

    if (!that.settings[that.widget.id] && that.settings["newWidget"]) {
      that.settings[that.widget.id] = that.settings["newWidget"];
    }

    if (!that.settings[that.widget.id]) {
      that.settings[that.widget.id] = {};
      iwtHeight = $("#iwt_widget_wrapper").height();
      iwtWidth = $("#iwt_widget_wrapper").width();
      that.settings[that.widget.id].iwtHeight = iwtHeight;
      that.settings[that.widget.id].iwtWidth = iwtWidth;
    } else {
      iwtHeight = that.settings[that.widget.id].iwtHeight;
      iwtWidth = that.settings[that.widget.id].iwtWidth;
      delete that.settings[that.widget.id];
    }

    that.settings.texts.forEach(function (item, index) {
      if (item === null) {
        return;
      } else {
        var tempShapeWidth = iwtWidth * item.width * .01;
        var tempShapeHeight = iwtHeight * item.height * .01;
      }

      if (item.shapetype == 'text') {
        $("#iwt_widget_wrapper").append("\n                <div class=\"iwt_text_wrapper shape-wrapper\" data-drag-item=\"shape\" data-id='".concat(item.id, "' draggable=\"true\" style=\"width:").concat(tempShapeWidth, "px;height:").concat(tempShapeHeight, "px;left: ").concat(item.left, "%; top: ").concat(item.top, "%;\">\n                    <div class=\"iwt_controls row margin0\">\n                        <div class=\"col-md-1 padding0\">\n                            <div class=\"iwt_control_drag\">\n                                <i class=\"fa fa-arrows\" title=\"Move\"></i>\n                            </div>\n                        </div>\n                        <div class=\"col-md-10 text-center padding0\">\n                            <div class=\"iwt_control_backgroundColor\">\n                                <input type=\"text\" data-id=\"background_color_picker\" title=\"Background color\" class=\"iwt_set_backgroundColor\" style=\"background-color:").concat(item.shapeBackgroundColor, "\">\n                                <i class=\"fa fa-eyedropper\" title=\"Background color\"></i>    \n                            </div>\n                            <div class=\"iwt_control_borderColor ml5\">\n                                <input type=\"text\" data-id=\"border_color_picker\" class=\"iwt_set_borderColor\" title=\"Border color\" style=\"background-color:transparent;border:1px solid ").concat(item.shapeBorderColor, ";\">\n                                <i class=\"fa fa-eyedropper\" title=\"Border color\"></i>    \n                            </div>\n                        </div>\n                        <div class=\"col-md-1 text-right padding0\">\n                            <div class=\"iwt_control_delete\">\n                                <i class=\"fa fa-trash\" title=\"Delete\"></i>\n                            </div>\n                        </div>\n                    </div>\n                    <div contenteditable=\"true\" id=\"").concat(item.id, "\" class='iwt_text text_shap' draggable=\"true\" style=\"width:").concat(tempShapeWidth, "px;height:").concat(tempShapeHeight, "px;border:1px solid ").concat(item.shapeBorderColor, ";background-color:").concat(item.shapeBackgroundColor, "; overflow-y: auto;\" >").concat(item.html, "</div>\n                </div>\n            "));
      } else if (item.shapetype == 'circle') {
        $("#iwt_widget_wrapper").append("\n                    <div class=\"iwt_circle_wrapper shape-wrapper\" data-drag-item=\"shape\" data-id=\"".concat(item.id, "\" draggable=\"true\" style=\"width:").concat(tempShapeWidth, "px;height:").concat(tempShapeHeight, "px;left: ").concat(item.left, "%; top: ").concat(item.top, "%\">\n                        <div class=\"iwt_controls row margin0\">\n                            <div class=\"col-md-1 padding0\">\n                                <div class=\"iwt_control_drag\">\n                                    <i class=\"fa fa-arrows\" title=\"Move\"></i>\n                                </div>\n                            </div>\n                            <div class=\"col-md-10 text-center padding0\">\n                                <div class=\"iwt_control_backgroundColor\">\n                                <input type=\"text\" data-id=\"background_color_picker\"   class=\"iwt_set_backgroundColor\" title=\"Background color\" style=\"background-color:").concat(item.shapeBackgroundColor, "\">\n                                    <i class=\"fa fa-eyedropper\" title=\"Background color\"></i>    \n                                </div>\n                                <div class=\"iwt_control_borderColor ml5\">\n                                    <input type=\"text\" data-id=\"border_color_picker\" class=\"iwt_set_borderColor\" title=\"Border color\" style=\"background-color:transparent;border:1px solid ").concat(item.shapeBorderColor, ";\">\n                                    <i class=\"fa fa-eyedropper\" title=\"Background color\"></i>    \n                                </div>\n                            </div>\n                            <div class=\"col-md-1 text-right padding0\">\n                                <div class=\"iwt_control_delete\">\n                                    <i class=\"fa fa-trash\" title=\"Delete\"></i>\n                                </div>\n                            </div>\n                        </div>\n                        <div contenteditable=\"true\" id='").concat(item.id, "' class='iwt_text iwt_circle text-center' draggable=\"true\" style=\"width:").concat(tempShapeWidth, "px;height:").concat(tempShapeHeight, "px;border-radius:50%;border:1px solid ").concat(item.shapeBorderColor, ";background-color:").concat(item.shapeBackgroundColor, ";\">").concat(item.html, "</div>\n                    </div>\n                "));
      } else if (item.shapetype == 'rectangle') {
        $("#iwt_widget_wrapper").append("\n                <div class=\"iwt_rectangle_wrapper shape-wrapper\" data-drag-item=\"shape\" data-id='".concat(item.id, "' draggable=\"true\" style=\"width:").concat(tempShapeWidth, "px;height:").concat(tempShapeHeight, "px;left:").concat(item.left, "%; top: ").concat(item.top, "%\">\n                    <div class=\"iwt_controls row margin0\">\n                        <div class=\"col-md-1 padding0\">\n                            <div class=\"iwt_control_drag\">\n                                <i class=\"fa fa-arrows\" title=\"Move\"></i>\n                            </div>\n                        </div>\n                        <div class=\"col-md-10 text-center padding0\">\n                            <div class=\"iwt_control_backgroundColor\">\n                            <input type=\"text\" data-id=\"background_color_picker\" class=\"iwt_set_backgroundColor\" title=\"Background color\" style=\"background-color:").concat(item.shapeBackgroundColor, "\">\n                                <i class=\"fa fa-eyedropper\" title=\"Background Color\"></i>    \n                            </div>\n                            <div class=\"iwt_control_borderColor ml5\">\n                                <input type=\"text\" data-id=\"border_color_picker\" class=\"iwt_set_backgroundColor\" title=\"Border color\" style=\"background-color:transparent;border:1px solid ").concat(item.shapeBorderColor, ";\">\n                                <i class=\"fa fa-eyedropper\" title=\"Border Color\"></i>    \n                            </div>\n                        </div>\n                        <div class=\"col-md-1 text-right padding0\">\n                            <div class=\"iwt_control_delete\">\n                                <i class=\"fa fa-trash\" title=\"Delete\"></i>\n                            </div>\n                        </div>\n                    </div>\n                    <div contenteditable=\"true\" id='").concat(item.id, "' class='iwt_text iwt_rectangle' draggable=\"true\"\" style=\"width:").concat(tempShapeWidth, "px;height:").concat(tempShapeHeight, "px;border:1px solid ").concat(item.shapeBorderColor, ";background-color:").concat(item.shapeBackgroundColor, "; overflow-y: auto;\">").concat(item.html, "</div>\n                </div>\n            "));
      } else if (item.shapetype == 'image' && item.html != "") {
        $("#iwt_widget_wrapper").append("\n                    <div class=\"iwt_image_wrapper shape-wrapper\" data-drag-item=\"shape\" data-id='".concat(item.id, "' draggable=\"true\" style=\"width:").concat(tempShapeWidth, "px;height:").concat(tempShapeHeight, "px;left: ").concat(item.left, "%; top: ").concat(item.top, "%\">\n                        <div class=\"iwt_controls row margin0\">\n                            <div class=\"col-md-6 padding0\">\n                                <div class=\"iwt_control_drag\">\n                                    <i class=\"fa fa-arrows\" title=\"Move\"></i>\n                                </div>\n                            </div>\n                            <!--<div class=\"col-md-6 text-center padding0\">\n                                <div class=\"iwt_shapes\">\n                                    <span data-image-type=\"circle\"></span>\n                                    <span data-image-type=\"rectangle\"></span>\n                                </div>\n                            </div>-->\n                            <div class=\"col-md-6 text-right padding0\">\n                                <div class=\"iwt_control_delete\">\n                                    <i class=\"fa fa-trash\" title=\"Delete\"></i>\n                                </div>\n                            </div>\n                        </div>\n                        <div id='").concat(item.id, "' class='iwt_text iwt_image' draggable='true' style='width:").concat(tempShapeWidth, "px;height:").concat(tempShapeHeight, "px;").concat(item.otherStyle, "'>\n                            ").concat(item.html, "\n                        </div>\n                    </div>\n                "));
        $('.iwt_shapes span').on('click', function () {
          var imageShapeType = $(this).data('image-type');
          var shapeStyle = '';

          if (imageShapeType == 'circle') {
            $(this).closest('.iwt_controls').siblings('.iwt_image').css({
              // 'border-radius': '50%'
            });
            $(this).closest('.iwt_controls').siblings('.iwt_image').find('img').css({
              // 'border-radius': '50%'
            });
            shapeStyle = 'border-radius:50%;';
          } else {
            $(this).closest('.iwt_controls').siblings('.iwt_image').css({
              'border-radius': '0'
            });
            $(this).closest('.iwt_controls').siblings('.iwt_image').find('img').css({
              'border-radius': '0'
            });
            shapeStyle = 'border-radius:0;';
          }

          item.otherStyle = shapeStyle;
        });
      }

      if (item.shapetype != 'image') {
        enableCkeditor(item.id);
      }
    });
    $('.iwt_set_backgroundColor,.iwt_set_borderColor').colorpicker({
      format: 'rgba'
    }).on('change', function (e) {
      var el = $(this).data('id');
      var id = $(this).closest('.shape-wrapper').data('id');
      var index = id.split("_")[1];

      if (el == 'background_color_picker') {
        $(this).css({
          backgroundColor: e.value.toString()
        });
        $(this).closest('.shape-wrapper').find('.iwt_text').css({
          backgroundColor: e.value.toString()
        });
        that.settings.texts[index].shapeBackgroundColor = e.value.toString();
      } else {
        $(this).css({
          borderColor: e.value.toString()
        });
        $(this).closest('.shape-wrapper').find('.iwt_text').css({
          borderColor: e.value.toString()
        });
        that.settings.texts[index].shapeBorderColor = e.value.toString();
      }
    });
    $(".shape-wrapper").resizable({
      stop: function stop(event, ui) {
        var currId = $(this).find('.iwt_text').attr('id');
        var index = currId.split("_")[1];
        $('#' + $(this).find('.iwt_text').attr('id')).width(ui.size.width - 8).height(ui.size.height - 8);
        
        that.settings.texts[index].width = ((ui.size.width) / iwtWidth * 100) + (100/iwtWidth);;
        that.settings.texts[index].height = ((ui.size.height) / iwtHeight * 100) + (100/iwtHeight);;
      }
    });
  };

  this.UploadImage = function (ev, obj, type) {
    ev.preventDefault();
    var that = this;
    var formData, formData1;
    obj.formName == 'imageOnImageForm' ? formData1 = new FormData(document.getElementById(obj.formName)) : formData = new FormData(document.getElementById(obj.formName));
    $('#loader').show();

    if (obj.formName == 'imageOnImageForm') {
      if (that.settings.isMediaLibrary == true) {
        var arbitaryFileData = that.settings;
        $('#loader').show();
        axios.post(appUrl + '/new-image-from-gallery', arbitaryFileData, {
          headers: {
            "course_path": $courseJson.courseDirPath,
            "token": localStorage.getItem('token')
          }
        }).then(function (result) {
          if (result.data.status == 'Success') {
            displayNotification("Image uploaded", 'success');
            that.settings.imageShapeUrl = $courseJson.courseDirPath + result.data.data;
            $('.shape-wrapper').find('#' + obj.shapeInfo.id).append("<img src=\"".concat(that.settings.imageShapeUrl, "\" alt=\"Image\" style=\"max-width:100%;max-height:100%;\">"));
            that.bindImageEvents(type);
          } else {
            displayNotification(result.data.message, 'error');
          }

          $('.showImageLibraryFileName').hide();
          $('#loader').hide();
        });
      } else {
        axios.post(appUrl + '/new-image', formData1, {
          headers: {
            "course_path": $courseJson.courseDirPath,
            "token": localStorage.getItem('token')
          }
        }).then(function (result) {
          if (result.data.status == 'Success') {
            displayNotification("Image uploaded", 'success');
            that.settings.imageShapeUrl = $courseJson.courseDirPath + result.data.data;
            $('.shape-wrapper').find('#' + obj.shapeInfo.id).append("<img src=\"".concat(that.settings.imageShapeUrl, "\" alt=\"Image\" style=\"max-width:100%;max-height:100%;\">"));
          } else {
            displayNotification(result.data.message, 'error');
          }

          $('#loader').hide();
        }, function (data) {
          alert('Some Problem Occurred');
        });
      }
    } else {
      if (that.settings.isMediaLibrary == true) {
        var arbitaryFileData = that.settings;
        $('#loader').show();
        axios.post(appUrl + '/new-image-from-gallery', arbitaryFileData, {
          headers: {
            "course_path": $courseJson.courseDirPath,
            "token": localStorage.getItem('token')
          }
        }).then(function (result) {
          if (result.data.status == 'Success') {
            displayNotification("Image uploaded", 'success');
            $('#iwt_widget_wrapper').html("\n                            <img src=\"".concat(that.settings.url, "\" alt=\"Avatar\" class=\"iwt_image\" draggable=\"false\"/>\n                        "));
            $("#iwt_widget_demo, #saveiwt").show(); //that.dummySettings.url = that.settings.url;

            that.settings.image_url = that.settings.url = result.data.data;
            that.settings.texts = [];
            that.dummySettings.texts = [];
            that.bindImageEvents(type);
          } else {
            displayNotification(result.data.message, 'error');
          }

          $('.showImageLibraryFileName').hide();
          $('#loader').hide();
        });
      } else {
        $('#loader').show();
        axios.post(appUrl + '/new-image', formData, {
          headers: {
            "course_path": $courseJson.courseDirPath,
            "token": localStorage.getItem('token')
          }
        }).then(function (result) {
          if (result.data.status == 'Success') {
            displayNotification("Image uploaded", 'success');
            $('#iwt_widget_wrapper').html("<img src=\"".concat($courseJson.courseDirPath + result.data.data, "\" alt=\"Avatar\" class=\"iwt_image\" draggable=\"false\" />"));
            $("#iwt_widget_demo, #saveiwt").show();
            that.bindImageEvents(type);
            that.settings.image_url = that.settings.url = result.data.data;
            that.settings.texts = [];
            that.dummySettings.texts = [];
          } else {
            displayNotification(result.data.message, 'error');
          }

          $('#loader').hide();
        }, function (data) {
          alert('Some Problem Occurred');
        });
      }
    }
  };

  this.initColorPicker = function () {
    var singelShape = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var that = this;
    $('.iwt_set_backgroundColor,.iwt_set_borderColor').colorpicker({
      format: 'rgba'
    });
    $(document).on('change', '.iwt_set_backgroundColor, .iwt_set_borderColor', function (e) {
      var el = $(this).data('id');
      var id = $(this).closest('.shape-wrapper').data('id');
      var index = id.split("_")[1];

      if (el == 'background_color_picker') {
        $(this).css({
          backgroundColor: e.value.toString()
        });
        $(this).closest('.shape-wrapper').find('.iwt_text').css({
          backgroundColor: e.value.toString()
        });
        that.dummySettings.texts[index].shapeBackgroundColor = e.value.toString();
      } else {
        $(this).css({
          borderColor: e.value.toString()
        });
        $(this).closest('.shape-wrapper').find('.iwt_text').css({
          borderColor: e.value.toString()
        });
        that.dummySettings.texts[index].shapeBorderColor = e.value.toString();
      }
    });
  };

  this.bindImageEvents = function (type) {
    
    var that = this;
    var shapeCount = 0;
    var shapeInfo = [];
    $('#text_bg').on("change", function () {
      var bgColor = $('#text_bg').val();
      $("#iwt_widget_wrapper .iwt_text").css({
        "background-color": bgColor
      });
      that.settings.bgColor = bgColor;
    });
    $("#saveiwt").off("click").on("click", function () {
      $("#iwt_widget_wrapper .shape-wrapper").each(function () {
        
        var textId = $(this).find(".iwt_text").attr("id");
        var index = textId.split("_")[1];
        that.dummySettings.texts[index].html = $('#' + textId).html();
      });

      if (that.dummySettings.url) {
        that.settings.url = that.dummySettings.url;
      }

      that.settings.texts = Helpers.cloneArray(that.dummySettings.texts);

      if (type === "edit") {
        that.widget.reMount(that.settings);
      } else {
        that.widget.insert(that.settings);
      }

      that.settings["newWidget"] = {};
      that.settings["newWidget"].iwtHeight = $("#iwt_widget_wrapper").height();
      that.settings["newWidget"].iwtWidth = $("#iwt_widget_wrapper").width();
      that.widget.closeAddModal();
      
    });
    $(document).on("click", ".iwt_control_delete", function () {
      var textId = $(this).closest(".shape-wrapper").attr("data-id");
      var index = textId.split("_")[1];
      $(this).closest(".shape-wrapper").remove();
      that.dummySettings.texts[index] = null;
    });
    $("#iwt_widget_demo").off().on("drop", function (ev) {
      ev.preventDefault();
      var offset = $("#iwt_widget_wrapper").offset();
      var fromLeft = ev.pageX - offset.left;
      var fromTop = ev.pageY - offset.top;
      fromLeft += -1;
      fromTop += -1;
      var iwtWidth = $("#iwt_widget_wrapper").width();
      var iwtHeight = $("#iwt_widget_wrapper").height();
      var fromLeftPercent = fromLeft / iwtWidth * 100;
      var fromTopPercent = fromTop / iwtHeight * 100;

      if ($globalScope.iwtDraggedItem == 'icon') {
        var shapeCount = that.dummySettings.texts.length;
        var shapeType = $globalScope.iwtDraggedShape;
        var shapeWidth = (200 / iwtWidth * 100);
        var shapeHeight =(200 / iwtHeight * 100);

        if (shapeType == 'circle') {
          shapeCount = 'circle_' + shapeCount;
        } else if (shapeType == 'rectangle') {
          shapeCount = 'rectangle_' + shapeCount;
        } else if (shapeType == 'image') {
          shapeCount = 'image_' + shapeCount;
        }

        shapeInfo = {
          id: shapeCount,
          shapetype: shapeType,
          left: fromLeftPercent,
          top: fromTopPercent,
          width: shapeWidth,
          height: shapeHeight,
          html: '',
          shapeBackgroundColor: 'rgba(255,255,255,1)',
          shapeBorderColor: 'rgba(255,255,255,1)',
          otherStyle: ''
        };
        renderShape(shapeInfo, iwtWidth, iwtHeight);
        that.dummySettings.texts.push(shapeInfo);
        that.initColorPicker(shapeInfo);

        if (shapeInfo.shapetype != 'image') {
          enableCkeditor(shapeInfo.id);
        }

        shapeCount++;
      } else {
        $($globalScope.iwtDragged).css({
          left: fromLeftPercent + "%",
          top: fromTopPercent + "%"
        });
        var textId = $($globalScope.iwtDragged).attr("data-id");
        var index = textId.split("_")[1];
        that.dummySettings.texts[index].left = fromLeftPercent;
        that.dummySettings.texts[index].top = fromTopPercent;
      }

      $(".iwt_control_backgroundColor input").attr('title', 'Background Color');
      $(".iwt_control_borderColor input").attr('title', 'Border Color');
    });

    function renderShape(shapeInfo, iwtWidth, iwtHeight) {
      if (shapeInfo.shapetype == 'text') {
        $("#iwt_widget_wrapper").append("\n                <div class=\"iwt_text_wrapper shape-wrapper\" data-drag-item=\"shape\" data-id='".concat(shapeInfo.id, "' draggable=\"true\" \n                    style=\"width:").concat(shapeInfo.width, "%;height:").concat(shapeInfo.height, "%;left:").concat(shapeInfo.left, "%; top:").concat(shapeInfo.top, "%;\">\n                    <div class=\"iwt_controls row margin0\">\n                        <div class=\"col-md-1 padding0\">\n                            <div class=\"iwt_control_drag\">\n                                <i class=\"fa fa-arrows\" title=\"Move\"></i>\n                            </div>\n                        </div>\n                        <div class=\"col-md-10 text-center padding0\">\n                            <div class=\"iwt_control_backgroundColor\">\n                                <input type=\"text\" data-id=\"background_color_picker\" title=\"Background color\"  class=\"iwt_set_backgroundColor\" style=\"background-color:").concat(shapeInfo.shapeBackgroundColor, "\">\n                                <i class=\"fa fa-eyedropper\" title=\"Background color\"></i>    \n                            </div>\n                             <div class=\"iwt_control_borderColor ml5\">\n                                <input type=\"text\" data-id=\"border_color_picker\" title=\"Border color\" class=\"iwt_set_borderColor\" style=\"background-color:transparent;border:1px solid ").concat(shapeInfo.shapeBorderColor, ";\">\n                                <i class=\"fa fa-eyedropper\" title=\"Border color\"></i>    \n                            </div>\n                            <!--<div class=\"iwt_control_borderColor ml5\">\n                                <select class=\"border-width-dropdown\" title=\"Border width\">\n                                    <option>1px</option>\n                                    <option>2px</option>\n                                    <option>3px</option>\n                                    <option>4px</option>\n                                    <option>5px</option>\n                                </select>\n                            </div>-->\n                        </div>\n                        <div class=\"col-md-1 text-right padding0\">\n                            <div class=\"iwt_control_delete\">\n                                <i class=\"fa fa-trash\" title=\"Delete\"></i>\n                            </div>\n                        </div>\n                    </div>\n                    <div contenteditable=\"true\" id='").concat(shapeInfo.id, "' class='iwt_text' draggable=\"true\" style=\"width:100%;height:100%;border:1px solid ").concat(shapeInfo.shapeBorderColor, ";background-color:").concat(shapeInfo.shapeBackgroundColor, "; overflow-y: auto;\"></div>\n                </div>\n            "));
      } else if (shapeInfo.shapetype == 'circle') {
        $("#iwt_widget_wrapper").append("\n                <div class=\"iwt_circle_wrapper shape-wrapper text-center\" data-drag-item=\"shape\" data-id='".concat(shapeInfo.id, "' draggable=\"true\" \n                    style=\"width:").concat(shapeInfo.width, "%;height:").concat(shapeInfo.height, "%;left: ").concat(shapeInfo.left, "%; top: ").concat(shapeInfo.top, "%\">\n                    <div class=\"iwt_controls row margin0\">\n                        <div class=\"col-md-1 padding0\">\n                            <div class=\"iwt_control_drag\">\n                                <i class=\"fa fa-arrows\" title=\"Move\"></i>\n                            </div>\n                        </div>\n                        <div class=\"col-md-10 text-center padding0\">\n                            <div class=\"iwt_control_backgroundColor\">\n                                <input type=\"text\" data-id=\"background_color_picker\" title=\"Background Color\" class=\"iwt_set_backgroundColor\" style=\"background-color:").concat(shapeInfo.shapeBackgroundColor, "\">\n                                <i class=\"fa fa-eyedropper\" title=\"Background color\"></i>    \n                            </div>\n                            <div class=\"iwt_control_borderColor ml5\">\n                                <input type=\"text\" data-id=\"border_color_picker\" title=\"Border color\" class=\"iwt_set_borderColor\" style=\"background-color:transparent;border:1px solid ").concat(shapeInfo.shapeBorderColor, ";\">\n                                <i class=\"fa fa-eyedropper\" title=\"Border color\"></i>    \n                            </div>\n                        </div>\n                        <div class=\"col-md-1 text-right padding0\">\n                            <div class=\"iwt_control_delete\">\n                                <i class=\"fa fa-trash\" title=\"Delete\"></i>\n                            </div>\n                        </div>\n                    </div>\n                    <div contenteditable=\"true\" id='").concat(shapeInfo.id, "' class='iwt_text iwt_circle' draggable=\"true\" style=\"border-radius:50%;border:1px solid #fff; width:100%;height:100%;border:1px solid ").concat(shapeInfo.shapeBorderColor, ";background-color:").concat(shapeInfo.shapeBackgroundColor, "\"></div>\n                </div>\n            "));
      } else if (shapeInfo.shapetype == 'rectangle') {
        $("#iwt_widget_wrapper").append("\n                <div class=\"iwt_rectangle_wrapper shape-wrapper\" data-drag-item=\"shape\" data-id='".concat(shapeInfo.id, "' draggable=\"true\" \n                    style=\"width:").concat(shapeInfo.width, "%;height:").concat(shapeInfo.height, "%;left: ").concat(shapeInfo.left, "%; top: ").concat(shapeInfo.top, "%\">\n                    <div class=\"iwt_controls row margin0\">\n                        <div class=\"col-md-1 padding0\">\n                            <div class=\"iwt_control_drag\">\n                                <i class=\"fa fa-arrows\" title=\"Move\"></i>\n                            </div>\n                        </div>\n                        <div class=\"col-md-10 text-center padding0\">\n                            <div class=\"iwt_control_backgroundColor\">\n                                <input type=\"text\" data-id=\"background_color_picker\" title=\"Background color\" class=\"iwt_set_backgroundColor\" style=\"background-color:").concat(shapeInfo.shapeBackgroundColor, "\">\n                                <i class=\"fa fa-eyedropper\" title=\"Background color\"></i>    \n                            </div>\n                           <div class=\"iwt_control_borderColor ml5\">\n                                <input type=\"text\" data-id=\"border_color_picker\" title=\"Border color\" class=\"iwt_set_borderColor\" style=\"background-color:transparent;border:1px solid ").concat(shapeInfo.shapeBorderColor, ";\">\n                                <i class=\"fa fa-eyedropper\" title=\"Border color\"></i>    \n                            </div>\n                        </div>\n                        <div class=\"col-md-1 text-right padding0\">\n                            <div class=\"iwt_control_delete\">\n                                <i class=\"fa fa-trash\" title=\"Delete\"></i>\n                            </div>\n                        </div>\n                    </div>\n                    <div contenteditable=\"true\" id='").concat(shapeInfo.id, "' class='iwt_text iwt_rectangle' draggable=\"true\"\" style=\"width:100%;height:100%;border:1px solid ").concat(shapeInfo.shapeBorderColor, ";background-color:").concat(shapeInfo.shapeBackgroundColor, ";overflow-y: auto;\"></div>\n                </div>\n            "));
      } else if (shapeInfo.shapetype == 'image') {
        var checkChildren = $("#addShapes").find("form").length;

        if (checkChildren == 0) {
          $('.shapes-wrapper').find('.shape-item').find('img').addClass('disabled');
          $("#addShapes").append("\n                            <form id=\"imageOnImageForm\" enctype=\"multipart/form-data\">\n                                <div class=\"row\">\n                                    <div class=\"col-md-5\">\n                                        <div class=\"form-group\">\n                                            <label class=\"modalLabel custom-label-box4\">Select image</label>\n                                            <input type=\"file\" name=\"filename\" id=\"chooseImage\" class=\"form-control form-file-element padding0\" accept=\"image/*\"/>\n                                        </div>\n                                    </div>\n                                    <div class=\"col-md-2\">\n                                        <div class=\"mt30 text-center\">\n                                            <label class=\"modalLabel custom-label-box4\">OR</label>\n                                        </div>\n                                    </div>\n                                    <div class=\"col-md-5\">\n                                        <div class=\"form-group\">\n                                            <label class=\"form-element-label custom-label-box4 visibleHidden\">Select image</label>\n                                            <button type=\"button\" class=\"modalBtn yesBtn width100 showImageLibrarybtn\" id=\"imageOnImageShowImageLibrary\">Select from Image Library</button>\n                                            <span class=\"showImageLibraryFileName show-image-on-image\"></span>\n                                        </div>\n                                    </div>\n                                    <div class=\"col-md-12\">\n                                        <div class=\"form-group text-center top-grey-border pt30\">\n                                            <button type=\"button\" class=\"modalBtn yesBtn mlr30\" id=\"addImageOnImage\" disabled>Add Image</button>\n                                            <button type=\"button\" class=\"modalBtn yesBtn\" id=\"deleteImageOnImage\">Remove Image</button>\n                                            <!--<a href=\"javascript:void(0)\" id=\"deleteImageOnImage\">\n                                                <i class=\"fa fa-close\"></i>\n                                            </a>-->\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </form>\n                ");
        } else {
          shapeInfo.shapetype = '';
          return false;
        }

        $('#imageOnImageForm').on("click", "#deleteImageOnImage", function (ev) {
          $('#imageOnImageForm').remove();
          $('.shapes-wrapper').find('.shape-item').find('img').removeClass('disabled');
          $globalScope.iwtDragged = undefined;
          $globalScope.iwtDraggedItem = undefined;
          $globalScope.iwtDraggedShape = undefined;
        });
        $('#imageOnImageForm').on("click", "#addImageOnImage", function (ev) {
          ev.preventDefault();
          var obj = {};
          var imageValue = $('#chooseImage').val();
          that.getButtonDisabled('#addImageOnImage');
          $('.shapes-wrapper').find('.shape-item').find('img').removeClass('disabled');
          $("#iwt_widget_wrapper").append("\n                        <div class=\"iwt_image_wrapper shape-wrapper\" data-drag-item=\"shape\" data-id=\"".concat(shapeInfo.id, "\" draggable=\"true\" \n                            style=\"width:").concat(shapeInfo.width, "%;height:").concat(shapeInfo.height, "%;left: ").concat(shapeInfo.left, "%; top: ").concat(shapeInfo.top, "%\">\n                            <div class=\"iwt_controls row margin0\">\n                                <div class=\"col-md-6 padding0\">\n                                    <div class=\"iwt_control_drag\">\n                                        <i class=\"fa fa-arrows\" title=\"Move\"></i>\n                                    </div>\n                                </div>\n                                <!--<div class=\"col-md-6 text-center padding0\">\n                                    <div class=\"iwt_shapes\">\n                                        <span data-image-type=\"circle\"></span>\n                                        <span data-image-type=\"rectangle\"></span>\n                                    </div>\n                                </div>-->\n                                <div class=\"col-md-6 text-right padding0\">\n                                    <div class=\"iwt_control_delete\">\n                                        <i class=\"fa fa-trash\" title=\"Delete\"></i>\n                                    </div>\n                                </div>\n                            </div>\n                            <div id=\"").concat(shapeInfo.id, "\" class=\"iwt_text iwt_image\" draggable=\"true\" style=\"border:1px solid #fff; width:100%;height:100%;").concat(shapeInfo.otherStyle, "\">\n                            </div>\n                        </div>\n                    "));
          obj.formName = 'imageOnImageForm';
          obj.shapeInfo = shapeInfo;
          var dataForm2 = new FormData(document.getElementById('imageOnImageForm'));
          dataForm2.append('inputFileName', imageValue);

          if (dataForm2.get('inputFileName')) {
            that.settings.isMediaLibrary = false;
            that.dummySettings.url = '';
            that.UploadImage(ev, obj, type); //that.settings.image_url = '';
          } else {
            if ($('.show-image-on-image').css("display") == "block") {
              that.settings.isMediaLibrary = true;
              mediaLibObj = imageLibraryHandler();
              that.dummySettings.url = that.settings.url;
              that.settings.url = that.settings.imageShapeUrl = mediaLibObj.url;
              that.settings.isMediaLibrary = mediaLibObj.isMediaLib;
            }

            that.UploadImage(ev, obj, type);
          }

          $('#imageOnImageForm').remove();
          $(".shape-wrapper").resizable({
            stop: function stop(event, ui) {
              $('#' + $(this).find('.iwt_text').attr('id')).width(ui.size.width - 8).height(ui.size.height - 8);
              shapeInfo.width = ((ui.size.width) / iwtWidth * 100) + (100/iwtWidth);
              shapeInfo.height = ((ui.size.height) / iwtHeight * 100) + (100/iwtHeight);
            }
          });
          $('.iwt_shapes span').on('click', function () {
            var imageShapeType = $(this).data('image-type');
            var shapeStyle = '';

            if (imageShapeType == 'circle') {
              $(this).closest('.iwt_controls').siblings('.iwt_image').css({
                'border-radius': '50%'
              });
              $(this).closest('.iwt_controls').siblings('.iwt_image').find('img').css({
                'border-radius': '50%'
              });
              shapeStyle = 'border-radius:50%;';
            } else {
              $(this).closest('.iwt_controls').siblings('.iwt_image').css({
                'border-radius': '0'
              });
              $(this).closest('.iwt_controls').siblings('.iwt_image').find('img').css({
                'border-radius': '0'
              });
              shapeStyle = 'border-radius:0;';
            }

            shapeInfo.otherStyle = shapeStyle;imageShapeType_
          });
        });
      }

      $(".shape-wrapper").resizable({
        stop: function stop(event, ui) {
          $('#' + $(this).find('.iwt_text').attr('id')).width(ui.size.width - 8).height(ui.size.height - 8);

          shapeInfo.width = ((ui.size.width) / iwtWidth * 100) + (100/iwtWidth);
          shapeInfo.height = ((ui.size.height) / iwtHeight * 100) + (100/iwtHeight);
        }
      });
    }

    $("#iwt_widget_demo").on("dragover", function (ev) {
      ev.preventDefault();
    });
    $("#iwt_widget_wrapper").on("dragstart", ".shape-wrapper", function (ev) {
      $globalScope.iwtDragged = ev.target;
      $globalScope.iwtDraggedItem = $($globalScope.iwtDragged).data('drag-item');
    });
    $(".shapes-wrapper").on("dragstart", ".shape-item", function (ev) {
      $globalScope.iwtDragged = ev.target;
      $globalScope.iwtDraggedShape = $($globalScope.iwtDragged).data('shape-type');
      $globalScope.iwtDraggedItem = $($globalScope.iwtDragged).data('drag-item');
    });
  };
}

Image_with_textv2.prototype = Object.create(MainWidget.prototype);