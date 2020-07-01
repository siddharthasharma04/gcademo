function Image_with_text() {
  this.init = function () {
    this.settings = {
      "image_url": "",
      texts: [],
      singelShape: [],
      bgColor: "white",
      "imageShapeUrl": ""
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

  this.getFormHTML = function () {
    var html = $("\n            <div class=\"widget-settings-wrapper mdwrap\">\n                <form id=\"iwt_widget_form\" class=\"form-settings mcq_modal modalBody mt20\">\n                    <div class=\"row\">\n                        <div class=\"col-md-10\">\n                            <div class=\"form-group\">\n                                <label class=\"form-element-label\">Select image</label>\n                                <input type=\"file\" name=\"filename\" class=\"form-control form-file-element\" />\n                            </div>\n                        </div>\n                        <div class=\"col-md-2\">\n                            <div class=\"form-group\">\n                                <label class=\"form-element-label visibleHidden\">Select image</label>\n                                <button type=\"submit\" class=\"modalBtn yesBtn pull-right\" id=\"addimage\">Add Image</button>\n                            </div>\n                        </div>\n                    </div>\n                </form>\n                <div id=\"addShapes\" class=\"modalBody pt0\">\n                    <div class=\"form-group row\">\n                        <div class=\"col-sm-12\">\n                            <label class=\"modalLabel\">Add Shapes</label>\n                            <div class=\"shapes-wrapper\">\n                                <a class=\"shape-item\">\n                                    <img src=\"assets/img/circle.png\" width=\"25\" data-drag-item=\"icon\" data-shape-type=\"circle\">\n                                </a>\n                                <a class=\"shape-item\">\n                                    <img src=\"assets/img/text-icon.png\" width=\"17\" data-drag-item=\"icon\" data-shape-type=\"text\">\n                                </a>\n                                <a class=\"shape-item\">\n                                    <img src=\"assets/img/image.png\" width=\"23\" data-drag-item=\"icon\" data-shape-type=\"image\">\n                                </a>\n                                <a class=\"shape-item\">\n                                    <img src=\"assets/img/rectangle.png\" width=\"25\" data-drag-item=\"icon\" data-shape-type=\"rectangle\">\n                                </a>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div id=\"iwt_widget_demo\" class=\"modalBody pt0\" style=\"display:none\">\n                    <!--<div class=\"form-group row\">\n                        <div class=\"col-sm-12\">\n                            <label class=\"modalLabel\">Shape background color</label>\n                            <input id=\"text_bg\" type=\"text\" class=\"form-control modalInput\" value=\"rgb(255, 128, 0)\" />\n                        </div>\n                    </div>-->\n                    <div id=\"iwt_widget_wrapper\"></div>\n                    <div class=\"modalBody\">\n                        <div class=\"row\">\n                            <div class=\"col-md-12\">\n                                <button type=\"button\" class=\"modalBtn yesBtn pull-right\" id=\"saveiwt\" value=\"Save\">Save</button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ");
    return html;
  };

  this.bindAddFormEvents = function () {
    var that = this;
    $('#iwt_widget_form').on("click", "#addimage", function (ev) {
      ev.preventDefault();
      var obj = {};
      obj.formName = 'iwt_widget_form';
      that.UploadImage(ev, obj);
    });
  };

  this.bindEditFormEvents = function (type) {
    $('#iwt_widget_wrapper').html("<img src=\"".concat($courseJson.courseDirPath + this.settings.image_url, "\" alt=\"Avatar\" class=\"iwt_image\" />")).show();
    $("#iwt_widget_demo, #saveiwt, #iwt_widget_form").show();
    this.loadTexts();
    this.dummySettings = Helpers.cloneObject(this.settings);
    this.bindImageEvents(type);
    var that = this;
    $('#iwt_widget_form').on("click", "#addimage", function (ev) {
      ev.preventDefault();
      var obj = {};
      obj.formName = 'iwt_widget_form';
      that.UploadImage(ev, obj, type);
    });
  };

  this.loadTexts = function () {
    //change to load iwt
    var that = this;
    var iwtHeight = $("#iwt_widget_wrapper").height();
    var iwtWidth = $("#iwt_widget_wrapper").width();
    that.settings.texts.forEach(function (item, index) {
      if (item === null) {
        return;
      } else {
        var tempShapeWidth = iwtWidth * item.width * .01;
        var tempShapeHeight = iwtHeight * item.height * .01;
      }

      if (item.shapetype == 'text') {
        $("#iwt_widget_wrapper").append("\n                <div class=\"iwt_text_wrapper shape-wrapper\" data-drag-item=\"shape\" data-id='".concat(item.id, "' draggable=\"true\" style=\"width:").concat(tempShapeWidth, "px;height:").concat(tempShapeHeight, "px;left: ").concat(item.left, "%; top: ").concat(item.top, "%;\">\n                    <div class=\"iwt_controls row margin0\">\n                        <div class=\"col-md-1 padding0\">\n                            <div class=\"iwt_control_drag\">\n                                <i class=\"fa fa-arrows\" title=\"Move\"></i>\n                            </div>\n                        </div>\n                        <div class=\"col-md-10 text-center padding0\">\n                            <div class=\"iwt_control_backgroundColor\">\n                                <input type=\"text\" data-id=\"background_color_picker\" title=\"Background color\" class=\"iwt_set_backgroundColor\" style=\"background-color:").concat(item.shapeBackgroundColor, "\">\n                                <i class=\"fa fa-eyedropper\" title=\"Background color\"></i>    \n                            </div>\n                            <!--<div class=\"iwt_control_borderColor ml5\">\n                                <input type=\"text\" data-id=\"border_color_picker\" class=\"iwt_set_borderColor\" title=\"Border color\" style=\"background-color:transparent;border:1px solid ").concat(item.shapeBorderColor, ";\">\n                                <i class=\"fa fa-eyedropper\" title=\"Border color\"></i>    \n                            </div>-->\n                        </div>\n                        <div class=\"col-md-1 text-right padding0\">\n                            <div class=\"iwt_control_delete\">\n                                <i class=\"fa fa-trash\" title=\"Delete\"></i>\n                            </div>\n                        </div>\n                    </div>\n                    <div contenteditable=\"true\" id=\"").concat(item.id, "\" class='iwt_text' draggable=\"true\" style=\"width:").concat(tempShapeWidth, "px;height:").concat(tempShapeHeight, "px;border:1px solid ").concat(item.shapeBorderColor, ";background-color:").concat(item.shapeBackgroundColor, "\">").concat(item.html, "</div>\n                </div>\n            "));
      } else if (item.shapetype == 'circle') {
        $("#iwt_widget_wrapper").append("\n                    <div class=\"iwt_circle_wrapper shape-wrapper\" data-drag-item=\"shape\" data-id=\"".concat(item.id, "\" draggable=\"true\" style=\"width:").concat(tempShapeWidth, "px;height:").concat(tempShapeHeight, "px;left: ").concat(item.left, "%; top: ").concat(item.top, "%\">\n                        <div class=\"iwt_controls row margin0\">\n                            <div class=\"col-md-1 padding0\">\n                                <div class=\"iwt_control_drag\">\n                                    <i class=\"fa fa-arrows\" title=\"Move\"></i>\n                                </div>\n                            </div>\n                            <div class=\"col-md-10 text-center padding0\">\n                                <div class=\"iwt_control_backgroundColor\">\n                                <input type=\"text\" data-id=\"background_color_picker\" class=\"iwt_set_backgroundColor\" title=\"Background color\" style=\"background-color:").concat(item.shapeBackgroundColor, "\">\n                                    <i class=\"fa fa-eyedropper\" title=\"Background color\"></i>    \n                                </div>\n                                <!--<div class=\"iwt_control_borderColor ml5\">\n                                    <input type=\"text\" data-id=\"border_color_picker\" class=\"iwt_set_borderColor\" title=\"Border color\" style=\"background-color:transparent;border:1px solid ").concat(item.shapeBorderColor, ";\">\n                                    <i class=\"fa fa-eyedropper\" title=\"Background color\"></i>    \n                                </div>-->\n                            </div>\n                            <div class=\"col-md-1 text-right padding0\">\n                                <div class=\"iwt_control_delete\">\n                                    <i class=\"fa fa-trash\" title=\"Delete\"></i>\n                                </div>\n                            </div>\n                        </div>\n                        <div contenteditable=\"true\" id='").concat(item.id, "' class='iwt_text iwt_circle text-center' draggable=\"true\" style=\"width:").concat(tempShapeWidth, "px;height:").concat(tempShapeHeight, "px;border-radius:50%;border:1px solid ").concat(item.shapeBorderColor, ";background-color:").concat(item.shapeBackgroundColor, ";\">").concat(item.html, "</div>\n                    </div>\n                "));
      } else if (item.shapetype == 'rectangle') {
        $("#iwt_widget_wrapper").append("\n                <div class=\"iwt_rectangle_wrapper shape-wrapper\" data-drag-item=\"shape\" data-id='".concat(item.id, "' draggable=\"true\" style=\"width:").concat(tempShapeWidth, "px;height:").concat(tempShapeHeight, "px;left:").concat(item.left, "%; top: ").concat(item.top, "%\">\n                    <div class=\"iwt_controls row margin0\">\n                        <div class=\"col-md-1 padding0\">\n                            <div class=\"iwt_control_drag\">\n                                <i class=\"fa fa-arrows\" title=\"Move\"></i>\n                            </div>\n                        </div>\n                        <div class=\"col-md-10 text-center padding0\">\n                            <div class=\"iwt_control_backgroundColor\">\n                            <input type=\"text\" data-id=\"background_color_picker\" class=\"iwt_set_backgroundColor\" title=\"Background color\" style=\"background-color:").concat(item.shapeBackgroundColor, "\">\n                                <i class=\"fa fa-eyedropper\" title=\"Background Color\"></i>    \n                            </div>\n                            <!--<div class=\"iwt_control_borderColor ml5\">\n                                <input type=\"text\" data-id=\"border_color_picker\" class=\"iwt_set_backgroundColor\" title=\"Border color\" style=\"background-color:transparent;border:1px solid ").concat(item.shapeBorderColor, ";\">\n                                <i class=\"fa fa-eyedropper\" title=\"Border Color\"></i>    \n                            </div>-->\n                        </div>\n                        <div class=\"col-md-1 text-right padding0\">\n                            <div class=\"iwt_control_delete\">\n                                <i class=\"fa fa-trash\" title=\"Delete\"></i>\n                            </div>\n                        </div>\n                    </div>\n                    <div contenteditable=\"true\" id='").concat(item.id, "' class='iwt_text iwt_rectangle' draggable=\"true\"\" style=\"width:").concat(tempShapeWidth, "px;height:").concat(tempShapeHeight, "px;border:1px solid ").concat(item.shapeBorderColor, ";background-color:").concat(item.shapeBackgroundColor, ";\">").concat(item.html, "</div>\n                </div>\n            "));
      } else if (item.shapetype == 'image') {
        $("#iwt_widget_wrapper").append("\n                    <div class=\"iwt_image_wrapper shape-wrapper\" data-drag-item=\"shape\" data-id='".concat(item.id, "' draggable=\"true\" style=\"width:").concat(tempShapeWidth, "px;height:").concat(tempShapeHeight, "px;left: ").concat(item.left, "%; top: ").concat(item.top, "%\">\n                        <div class=\"iwt_controls row margin0\">\n                            <div class=\"col-md-6 padding0\">\n                                <div class=\"iwt_control_drag\">\n                                    <i class=\"fa fa-arrows\" title=\"Move\"></i>\n                                </div>\n                            </div>\n                            <!--<div class=\"col-md-6 text-center padding0\">\n                                <div class=\"iwt_shapes\">\n                                    <span data-image-type=\"circle\"></span>\n                                    <span data-image-type=\"rectangle\"></span>\n                                </div>\n                            </div>-->\n                            <div class=\"col-md-6 text-right padding0\">\n                                <div class=\"iwt_control_delete\">\n                                    <i class=\"fa fa-trash\" title=\"Delete\"></i>\n                                </div>\n                            </div>\n                        </div>\n                        <div id='").concat(item.id, "' class='iwt_text iwt_image' draggable='true' style='width:").concat(tempShapeWidth, "px;height:").concat(tempShapeHeight, "px;").concat(item.otherStyle, "'>\n                            ").concat(item.html, "\n                        </div>\n                    </div>\n                "));
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

          item.otherStyle = shapeStyle;
        });
      }

      item.shapetype != 'image' ? enableCkeditor(index.toString()) : '';
    });
    $('.iwt_set_backgroundColor,.iwt_set_borderColor').colorpicker({
      format: 'rgba'
    }).on('change', function (e) {
      var el = $(this).data('id');
      var id = $(this).closest('.shape-wrapper').data('id');

      if (el == 'background_color_picker') {
        $(this).css({
          backgroundColor: e.value.toString()
        });
        $(this).closest('.shape-wrapper').find('.iwt_text').css({
          backgroundColor: e.value.toString()
        });
        that.settings.texts[id].shapeBackgroundColor = e.value.toString();
      } else {
        $(this).css({
          borderColor: e.value.toString()
        });
        $(this).closest('.shape-wrapper').find('.iwt_text').css({
          borderColor: e.value.toString()
        });
        that.settings.texts[id].shapeBorderColor = e.value.toString();
      }
    });
    $(".shape-wrapper").resizable({
      stop: function stop(event, ui) {
        var currId = $(this).find('.iwt_text').attr('id');
        $('#' + $(this).find('.iwt_text').attr('id')).width(ui.size.width - 8).height(ui.size.height - 8);
        that.settings.texts[currId].width = (ui.size.width - 8) / iwtWidth * 100;
        that.settings.texts[currId].height = (ui.size.height - 8) / iwtHeight * 100;
      }
    });
  };

  this.UploadImage = function (ev, obj, type) {
    ev.preventDefault();
    var that = this;
    var formData = new FormData(document.getElementById(obj.formName));
    var imagePath = '';

    if (obj.formName == 'imageOnImageForm') {
      axios.post(appUrl + '/new-image', formData, {
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
      }, function (data) {
        alert('Some Problem Occurred');
      });
    } else {
      axios.post(appUrl + '/new-image', formData, {
        headers: {
          "course_path": $courseJson.courseDirPath,
          "token": localStorage.getItem('token')
        }
      }).then(function (result) {
        if (result.data.status == 'Success') {
          displayNotification("Image uploaded", 'success');
          $('#iwt_widget_wrapper').html("\n                        <img src=\"".concat($courseJson.courseDirPath + result.data.data, "\" alt=\"Avatar\" class=\"iwt_image\" />\n                    "));
          $("#iwt_widget_demo, #saveiwt").show();
          that.bindImageEvents(type);
          that.settings.image_url = result.data.data;
          that.settings.texts = [];
          that.dummySettings.texts = [];
        } else {
          displayNotification(result.data.message, 'error');
        }
      }, function (data) {
        alert('Some Problem Occurred');
      });
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

      if (el == 'background_color_picker') {
        $(this).css({
          backgroundColor: e.value.toString()
        });
        $(this).closest('.shape-wrapper').find('.iwt_text').css({
          backgroundColor: e.value.toString()
        });
        that.dummySettings.texts[id].shapeBackgroundColor = e.value.toString();
      } else {
        $(this).css({
          borderColor: e.value.toString()
        });
        $(this).closest('.shape-wrapper').find('.iwt_text').css({
          borderColor: e.value.toString()
        });
        that.dummySettings.texts[id].shapeBorderColor = e.value.toString();
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
        that.dummySettings.texts[textId].html = $('#' + textId).html();
      });
      that.settings.texts = Helpers.cloneArray(that.dummySettings.texts);

      if (type === "edit") {
        that.widget.reMount(that.settings);
      } else {
        that.widget.insert(that.settings);
      }

      that.widget.closeAddModal();
    });
    $("#iwt_widget_demo").off("click", ".iwt_control_delete").on("click", ".iwt_control_delete", function () {
      var textId = $(this).closest(".shape-wrapper").attr("data-id");
      $(this).closest(".shape-wrapper").remove();
      that.dummySettings.texts[textId] = null;
    });
    $("#iwt_widget_demo").on("drop", function (ev) {
      ev.preventDefault();
      var offset = $("#iwt_widget_wrapper").offset();
      var fromLeft = ev.pageX - offset.left;
      var fromTop = ev.pageY - offset.top;
      fromLeft += -10;
      fromTop += -10;
      var iwtWidth = $("#iwt_widget_wrapper").width();
      var iwtHeight = $("#iwt_widget_wrapper").height();
      var fromLeftPercent = fromLeft / iwtWidth * 100;
      var fromTopPercent = fromTop / iwtHeight * 100;

      if ($globalScope.iwtDraggedItem == 'icon') {
        var shapeCount = that.dummySettings.texts.length;
        var shapeType = $globalScope.iwtDraggedShape;
        var shapeWidth = Math.floor(200 / iwtWidth * 100);
        var shapeHeight = Math.floor(200 / iwtHeight * 100);
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
        shapeInfo.shapetype == 'image' ? '' : enableCkeditor(shapeInfo.id.toString());
        shapeCount++;
      } else {
        $($globalScope.iwtDragged).css({
          left: fromLeftPercent + "%",
          top: fromTopPercent + "%"
        });
        var textId = $($globalScope.iwtDragged).attr("data-id");
        that.dummySettings.texts[textId].left = fromLeftPercent;
        that.dummySettings.texts[textId].top = fromTopPercent;
      }
    });

    function renderShape(shapeInfo, iwtWidth, iwtHeight) {
      if (shapeInfo.shapetype == 'text') {
        $("#iwt_widget_wrapper").append("\n                <div class=\"iwt_text_wrapper shape-wrapper\" data-drag-item=\"shape\" data-id='".concat(shapeInfo.id, "' draggable=\"true\" \n                    style=\"width:").concat(shapeInfo.width, "%;height:").concat(shapeInfo.height, "%;left:").concat(shapeInfo.left, "%; top:").concat(shapeInfo.top, "%;\">\n                    <div class=\"iwt_controls row margin0\">\n                        <div class=\"col-md-1 padding0\">\n                            <div class=\"iwt_control_drag\">\n                                <i class=\"fa fa-arrows\" title=\"Move\"></i>\n                            </div>\n                        </div>\n                        <div class=\"col-md-10 text-center padding0\">\n                            <div class=\"iwt_control_backgroundColor\">\n                                <input type=\"text\" data-id=\"background_color_picker\" title=\"Background Color\" class=\"iwt_set_backgroundColor\" style=\"background-color:").concat(shapeInfo.shapeBackgroundColor, "\">\n                                <i class=\"fa fa-eyedropper\" title=\"Background color\"></i>    \n                            </div>\n                            <!--<div class=\"iwt_control_borderColor ml5\">\n                                <input type=\"text\" data-id=\"border_color_picker\" title=\"Border color\" class=\"iwt_set_borderColor\" style=\"background-color:transparent;border:1px solid ").concat(shapeInfo.shapeBorderColor, ";\">\n                                <i class=\"fa fa-eyedropper\" title=\"Border color\"></i>    \n                            </div>\n                            <div class=\"iwt_control_borderColor ml5\">\n                                <select class=\"border-width-dropdown\" title=\"Border width\">\n                                    <option>1px</option>\n                                    <option>2px</option>\n                                    <option>3px</option>\n                                    <option>4px</option>\n                                    <option>5px</option>\n                                </select>\n                            </div>-->\n                        </div>\n                        <div class=\"col-md-1 text-right padding0\">\n                            <div class=\"iwt_control_delete\">\n                                <i class=\"fa fa-trash\" title=\"Delete\"></i>\n                            </div>\n                        </div>\n                    </div>\n                    <div contenteditable=\"true\" id='").concat(shapeInfo.id, "' class='iwt_text' draggable=\"true\" style=\"width:100%;height:100%;border:1px solid ").concat(shapeInfo.shapeBorderColor, ";background-color:").concat(shapeInfo.shapeBackgroundColor, "\"></div>\n                </div>\n            "));
      } else if (shapeInfo.shapetype == 'circle') {
        $("#iwt_widget_wrapper").append("\n                <div class=\"iwt_circle_wrapper shape-wrapper text-center\" data-drag-item=\"shape\" data-id='".concat(shapeInfo.id, "' draggable=\"true\" \n                    style=\"width:").concat(shapeInfo.width, "%;height:").concat(shapeInfo.height, "%;left: ").concat(shapeInfo.left, "%; top: ").concat(shapeInfo.top, "%\">\n                    <div class=\"iwt_controls row margin0\">\n                        <div class=\"col-md-1 padding0\">\n                            <div class=\"iwt_control_drag\">\n                                <i class=\"fa fa-arrows\" title=\"Move\"></i>\n                            </div>\n                        </div>\n                        <div class=\"col-md-10 text-center padding0\">\n                            <div class=\"iwt_control_backgroundColor\">\n                                <input type=\"text\" data-id=\"background_color_picker\" title=\"Background Color\" class=\"iwt_set_backgroundColor\" style=\"background-color:").concat(shapeInfo.shapeBackgroundColor, "\">\n                                <i class=\"fa fa-eyedropper\" title=\"Background color\"></i>    \n                            </div>\n                            <!--<div class=\"iwt_control_borderColor ml5\">\n                                <input type=\"text\" data-id=\"border_color_picker\" title=\"Border color\" class=\"iwt_set_borderColor\" style=\"background-color:transparent;border:1px solid ").concat(shapeInfo.shapeBorderColor, ";\">\n                                <i class=\"fa fa-eyedropper\" title=\"Border color\"></i>    \n                            </div>-->\n                        </div>\n                        <div class=\"col-md-1 text-right padding0\">\n                            <div class=\"iwt_control_delete\">\n                                <i class=\"fa fa-trash\" title=\"Delete\"></i>\n                            </div>\n                        </div>\n                    </div>\n                    <div contenteditable=\"true\" id='").concat(shapeInfo.id, "' class='iwt_text iwt_circle' draggable=\"true\" style=\"border-radius:50%;border:1px solid #fff; width:100%;height:100%;border:1px solid ").concat(shapeInfo.shapeBorderColor, ";background-color:").concat(shapeInfo.shapeBackgroundColor, "\"></div>\n                </div>\n            "));
      } else if (shapeInfo.shapetype == 'rectangle') {
        $("#iwt_widget_wrapper").append("\n                <div class=\"iwt_rectangle_wrapper shape-wrapper\" data-drag-item=\"shape\" data-id='".concat(shapeInfo.id, "' draggable=\"true\" \n                    style=\"width:").concat(shapeInfo.width, "%;height:").concat(shapeInfo.height, "%;left: ").concat(shapeInfo.left, "%; top: ").concat(shapeInfo.top, "%\">\n                    <div class=\"iwt_controls row margin0\">\n                        <div class=\"col-md-1 padding0\">\n                            <div class=\"iwt_control_drag\">\n                                <i class=\"fa fa-arrows\" title=\"Move\"></i>\n                            </div>\n                        </div>\n                        <div class=\"col-md-10 text-center padding0\">\n                            <div class=\"iwt_control_backgroundColor\">\n                                <input type=\"text\" data-id=\"background_color_picker\"  class=\"iwt_set_backgroundColor\" style=\"background-color:").concat(shapeInfo.shapeBackgroundColor, "\" title=\"Background color\">\n                                <i class=\"fa fa-eyedropper\" title=\"Background color\"></i>    \n                            </div>\n                            <!--<div class=\"iwt_control_borderColor ml5\">\n                                <input type=\"text\" data-id=\"border_color_picker\" title=\"Border color\" class=\"iwt_set_borderColor\" style=\"background-color:transparent;border:1px solid ").concat(shapeInfo.shapeBorderColor, ";\">\n                                <i class=\"fa fa-eyedropper\" title=\"Border color\"></i>    \n                            </div>-->\n                        </div>\n                        <div class=\"col-md-1 text-right padding0\">\n                            <div class=\"iwt_control_delete\">\n                                <i class=\"fa fa-trash\" title=\"Delete\"></i>\n                            </div>\n                        </div>\n                    </div>\n                    <div contenteditable=\"true\" id='").concat(shapeInfo.id, "' class='iwt_text iwt_rectangle' draggable=\"true\"\" style=\"width:100%;height:100%;border:1px solid ").concat(shapeInfo.shapeBorderColor, ";background-color:").concat(shapeInfo.shapeBackgroundColor, "\"></div>\n                </div>\n            "));
      } else if (shapeInfo.shapetype == 'image') {
        $("#addShapes").append("\n                        <form id=\"imageOnImageForm\">\n                            <div class=\"row\">\n                                <div class=\"col-md-10\">\n                                    <div class=\"form-group\">\n                                        <label class=\"form-element-label\">Select image</label>\n                                        <input type=\"file\" name=\"filename\" class=\"form-control form-file-element padding0\" />\n                                    </div>\n                                </div>\n                                <div class=\"col-md-2\">\n                                    <div class=\"form-group\">\n                                        <label class=\"form-element-label visibleHidden\">Select image</label>\n                                        <button type=\"button\" class=\"modalBtn yesBtn pull-right\" id=\"addImageOnImage\">Add Image</button>\n                                    </div>\n                                </div>\n                            </div>\n                        </form>\n                ");
        $('#imageOnImageForm').on("click", "#addImageOnImage", function (ev) {
          ev.preventDefault();
          var obj = {};
          $("#iwt_widget_wrapper").append("\n                        <div class=\"iwt_image_wrapper shape-wrapper\" data-drag-item=\"shape\" data-id=\"".concat(shapeInfo.id, "\" draggable=\"true\" \n                            style=\"width:").concat(shapeInfo.width, "%;height:").concat(shapeInfo.height, "%;left: ").concat(shapeInfo.left, "%; top: ").concat(shapeInfo.top, "%\">\n                            <div class=\"iwt_controls row margin0\">\n                                <div class=\"col-md-6 padding0\">\n                                    <div class=\"iwt_control_drag\">\n                                        <i class=\"fa fa-arrows\" title=\"Move\"></i>\n                                    </div>\n                                </div>\n                                <!--<div class=\"col-md-6 text-center padding0\">\n                                    <div class=\"iwt_shapes\">\n                                        <span data-image-type=\"circle\"></span>\n                                        <span data-image-type=\"rectangle\"></span>\n                                    </div>\n                                </div>-->\n                                <div class=\"col-md-6 text-right padding0\">\n                                    <div class=\"iwt_control_delete\">\n                                        <i class=\"fa fa-trash\" title=\"Delete\"></i>\n                                    </div>\n                                </div>\n                            </div>\n                            <div id=\"").concat(shapeInfo.id, "\" class=\"iwt_text iwt_image\" draggable=\"true\" style=\"border:1px solid #fff; width:100%;height:100%;").concat(shapeInfo.otherStyle, "\">\n                            </div>\n                        </div>\n                    "));
          obj.formName = 'imageOnImageForm';
          obj.shapeInfo = shapeInfo;
          that.UploadImage(ev, obj);
          $('#imageOnImageForm').remove();
          $(".shape-wrapper").resizable({
            stop: function stop(event, ui) {
              $('#' + $(this).find('.iwt_text').attr('id')).width(ui.size.width).height(ui.size.height);
              shapeInfo.width = ui.size.width / iwtWidth * 100;
              shapeInfo.height = ui.size.height / iwtHeight * 100;
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

            shapeInfo.otherStyle = shapeStyle;
          });
        });
      }

      $(".shape-wrapper").resizable({
        stop: function stop(event, ui) {
          $('#' + $(this).find('.iwt_text').attr('id')).width(ui.size.width - 8).height(ui.size.height - 8);
          shapeInfo.width = ui.size.width / iwtWidth * 100;
          shapeInfo.height = ui.size.height / iwtHeight * 100;
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

Image_with_text.prototype = Object.create(MainWidget.prototype);