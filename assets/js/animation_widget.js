"use strict";

function Animation_widget() {
  this.slideIds = [];

  this.init = function () {
    this.settings = {
      "slides": [],
      "textSlides": [],
      "autoplay": true,
      "caption": false,
      "caption_text": "",
      "navigation": true,
      "duration": 3000,
      "imageOverlay": false,
      "textPosition": "",
      "alreadyMounted": false,
      "isAudio": false
    };
    this.widget = new Widget(this.settings);
    this.widget.openEditPanel(this.getFormHTML());
    this.bindAddFormEvents("add");
    return this.widget.getWidgetId();
  };

  this.edit = function () {
    this.widget.openEditPanel(this.getFormHTML());
    this.addCkeditor(this.slideIds);
    this.bindAddFormEvents("edit");
  };

  this.addCkeditor = function (objectArray) {
    var i;

    if (objectArray.length > 0) {
      for (i = 0; i < objectArray.length; i++) {
        enableCkeditor(objectArray[i]);
      }
    }
  };

  this.getFormHTML = function () {
    var html = $("\n        <div id=\"currentModalBox\">\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <div id=\"animation-setting-wrapper\" class=\"animation-setting-wrapper\">\n                        <div class=\"card\">\n                            <div class=\"card-header advance_setting_hedaer\">\n                                \n                                <h2 class=\"mb-0\">\n                                    <span class=\"d-flex btn btn-link advance_flipcart collapsed\" data-toggle=\"collapse\" data-target=\"#imageAnimation\" aria-expanded=\"false\">\n                                    Upload Images\n                                    </span>\n                                </h2>\n                                <span class=\"advance-accordian-arrow\" data-toggle=\"collapse\" data-target=\"#imageAnimation\" aria-expanded=\"true\">\n                                    <i class=\"fa fa-angle-down rotate-icon\"></i>\n                                </span>\n                            </div>\n                            <div id=\"imageAnimation\" class=\"collapse show \" data-parent=\"#animation-setting-wrapper\">\n                                <div class=\"animation-list-settings\">\n                                    <form action=\"/file-upload\" name=\"filename\" class=\"dropzone\" id=\"dropZone\">\n                                        <div class=\"fallback\">\n                                            <input name=\"filename\" type=\"file\" multiple id=\"addImageInput\" />\n                                        </div>\n                                    </form>\n                                    <div class=\"create_slider\">\n                                        <div class=\"row\" id=\"rowSlider\"></div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"card mt-3\">\n                            <div class=\"card-header advance_setting_hedaer\">\n                                \n                                <h2 class=\"mb-0\">\n                                    <span class=\"d-flex btn btn-link advance_flipcart collapsed\" data-toggle=\"collapse\" data-target=\"#textAnimation\" aria-expanded=\"false\">\n                                    Write Text\n                                    </span>\n                                </h2>\n                                <span class=\"advance-accordian-arrow collapsed\" data-toggle=\"collapse\" data-target=\"#textAnimation\" aria-expanded=\"true\">\n                                    <i class=\"fa fa-angle-down rotate-icon\"></i>\n                                </span>\n                            </div>\n                            <div id=\"textAnimation\" class=\"advance_setting_body collapse\" data-parent=\"#animation-setting-wrapper\">\n                                <div class=\"animation-list-settings\">\n                                    <div class=\"text-animation-wrapper\" id=\"text-animation-wrapper\"></div>\n                                    <button id=\"addText\" type=\"button\" class=\"modalBtn yesBtn form-control mt10\">Add Text</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"form-group p_20 d-none\">\n                    <div class=\"col-md-12\">\n                        <label class=\"form-element-label custom-label-box4\">Audio</label>\n                        <label class=\"switch switch-flat\">\n                            <input class=\"switch-input\" type=\"checkbox\" id=\"isAudio\" value=\"yes\" ".concat(this.settings.isAudio ? 'checked' : '', "/>\n                            <span class=\"switch-label\" data-on=\"Yes\" data-off=\"No\"></span> \n                            <span class=\"switch-handle\"></span> \n                        </label>\n                    </div>\n                </div>\n            </div>\n            <div class=\"row mt-3\">\n                <div class=\"col-md-12\">\n                    <div class=\"settings_slider\">\n                        <form id=\"image_slider\" class=\"row\">\n                            <div class=\"col-md-12\">\n                                <button id=\"close_modal\" class=\"modalBtn yesBtn insert_slider form-control\">Save</button>\n                            </div>\n                        </form>\n                    </div>\n                </div> \n            </div> \n        </div>\n        "));
    var that = this;
    this.settings.slides.forEach(function (slide, index) {
      that.loadSlideSettings(slide, html.find('#rowSlider'));
    });
    that.settings.textSlides.forEach(function (slide, index) {
      that.loadTextSettings(slide, html.find('#text-animation-wrapper'));
    });
    return html;
  };

  this.bindAddFormEvents = function (type) {
    var that = this;
    that.settings.url = $(e.target).find(".select-file").val();
    that.SliderDroZoneEvent();
    $('#addText').on('click', function () {
      var slide = {
        'id': makeid()
      };
      that.loadTextSettings(slide, $('#text-animation-wrapper'));
      enableCkeditor('textArea_' + slide.id);
    });
    $("#image_slider").on("submit", function (e) {
      e.preventDefault();
      that.settings.duration = $(e.target).find('#duration').val();
      that.settings.autoplay = $(e.target).find('#autoplay').prop('checked') ? true : false;
      that.settings.navigation = $(e.target).find('#navigation').prop('checked') ? true : false;
      that.settings.slides = [];
      that.settings.textSlides = [];
      $(".slide_settings").each(function (index, slide_settings) {
        var id = $(this).attr("id");
        var url = $(this).find("img").attr("src");
        var caption = $(this).find("textarea").val();
        var image_animation_type = $(this).find(".image_animation_type").val();
        var image_start_time = $(this).find(".image_start_time").val();
        var image_transition_duration = $(this).find(".image_transition_duration").val();
        var image_end_time = $(this).find(".image_end_time").val();
        var overlay = $(this).find("#overlay").prop('checked') ? true : false;
        that.settings.slides.push({
          id: id,
          url: url,
          caption: caption,
          image_animation_type: image_animation_type,
          image_start_time: image_start_time,
          image_transition_duration: image_transition_duration,
          image_end_time: image_end_time,
          overlay: overlay
        });
      });
      $('.text-slide').each(function (index, text_slide) {
        var id = $(this).attr("id");
        var textCaption = $(this).find(".textarea").html();
        var text_animation_type = $(this).find('.text_animation_type').val();
        var text_start_time = $(this).find('.text_start_time').val();
        var text_transition_duration = $(this).find('.text_transition_duration').val();
        var text_end_time = $(this).find('.text_end_time').val();
        var textPosition = $(this).find('.text-position:checked').val() || 'topleft';
        var neverHide = $(this).find("#neverHide").prop('checked') ? true : false;
        that.settings.textSlides.push({
          id: id,
          textCaption: textCaption,
          text_animation_type: text_animation_type,
          text_start_time: text_start_time,
          text_transition_duration: text_transition_duration,
          text_end_time: text_end_time,
          textPosition: textPosition,
          neverHide: neverHide
        });
      });

      if (type === "add" && !that.settings.alreadyMounted) {
        that.widget.insert(that.settings);
        that.settings.alreadyMounted = true; //that.bindAddFormEvents("edit");
      } else {
        that.widget.reMount(that.settings);
      }

      that.widget.closeAddModal();
    });
    $('.create_slider').on('click', '.close_slide', function () {
      $(this).closest(".slide_settings").remove();
    });
    $('.text-animation-wrapper').on('click', '.close_slide', function () {
      $(this).closest(".text-slide").remove();
    });
    $('.addImage').on('click', function () {
      $(".addImageInput").trigger();
    });
  };

  this.SliderDroZoneEvent = function () {
    var that = this;
    var myDropzone = new Dropzone("#dropZone", {
      url: appUrl + '/new-image',
      paramName: 'filename',
      "headers": {
        "token": localStorage.getItem('token'),
        "course_path": $courseJson.courseDirPath
      }
    });
    myDropzone.on("complete", function (result) {
      var ext = result.name.split(".");
      var checkExtension = ext[ext.length - 1];

      switch (checkExtension.toLowerCase()) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'svg':
        case 'tif':
        case 'bmp':
          break;

        default:
          displayNotification("Please Choose Image Format.", 'error');
          myDropzone.removeAllFiles();
          return;
      }

      var xhrRes = JSON.parse(result.xhr.response);
      var imgUrl = $courseJson.courseDirPath + xhrRes.data;
      var slide = {
        'id': makeid(),
        'url': imgUrl,
        caption: ''
      };
      that.loadSlideSettings(slide, $('#rowSlider'));
      setTimeout(function () {
        myDropzone.removeAllFiles();
      }, 1000);
    });
  };

  this.loadSlideSettings = function (slide, $target) {
    $target.append("\n            <div class=\"row delete_slide slide_settings\" id=\"".concat(slide.id, "\">\n                <span class=\"close_slide\" data-id=\"").concat(slide.id, "\" ><i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n                </span>\n                <div class=\"\">\n                    <div class=\"col-md-12 image-slider-list\">\n                        <img src=\"").concat(slide.url, "\" class=\"img-fluid\" />\n                    </div>\n                    <div class=\"col-md-12\">\n                        <ul class=\"row list-inline\">\n                            <li class=\"col-md-7 mt10 mb15\">\n                                <label class=\"form-element-label custom-label-box4\">Animation Type</label>\n                                <select class=\"form-control form-element image_animation_type\" id=\"").concat(slide.id, "_caption_animation_type\">\n                                    <option ").concat(slide.image_animation_type == 'left' ? 'selected' : '', " value=\"left\">Slide Left</option>\n                                    <option ").concat(slide.image_animation_type == 'right' ? 'selected' : '', " value=\"right\">Slide Right</option>\n                                    <option ").concat(slide.image_animation_type == 'top' ? 'selected' : '', " value=\"top\">Slide Top</option>\n                                    <option ").concat(slide.image_animation_type == 'bottom' ? 'selected' : '', " value=\"bottom\">Slide Bottom</option>\n                                </select>\n                            </li>\n                            <li class=\"col-md-5 mt10 mb15\">\n                                <label class=\"form-element-label custom-label-box4\">Start Time<span class=\"in-sec\">(s)</span></label>\n                                <input type=\"text\" id=\"").concat(slide.id, "_image_start_time\" class=\"image_start_time form-element form-control\" value=\"").concat(slide.image_start_time || '1', "\">\n                            </li>\n                            <li class=\"col-md-7 mt10 mb15\">\n                                <label class=\"form-element-label custom-label-box4\">Animation Time<span class=\"in_sec\">(s)</span></label>\n                                <input type=\"text\" id=\"").concat(slide.id, "_image_transition_duration\" class=\"image_transition_duration form-element form-control\" value=\"").concat(slide.image_transition_duration || '1', "\">\n                            </li>\n                            <li class=\"col-md-5 mt10 mb15\">\n                                <label class=\"form-element-label custom-label-box4\">End Time<span class=\"in_sec\">(s)</span></label>\n                                <input type=\"text\" id=\"").concat(slide.id, "_image_end_time\" class=\"image_end_time form-element form-control\" value=\"").concat(slide.image_end_time || '1', "\">\n                            </li>\n                            <li class=\"col-md-5 mt10\">\n                                <label class=\"form-element-label custom-label-box4\">Overlay</label>\n                                <label class=\"switch switch-flat\">\n                                    <input class=\"switch-input\" type=\"checkbox\" id=\"overlay\" value=\"overlay\" ").concat(slide.overlay ? 'checked' : '', "/>\n                                    <span class=\"switch-label\" data-on=\"Yes\" data-off=\"No\"></span> \n                                    <span class=\"switch-handle\"></span> \n                                </label>\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n        "));
  };

  this.loadTextSettings = function (slide, $target) {
    var that = this;
    var setVar = slide.id;
    $target.append("\n        <div class=\"row text-slide\" id=\"".concat(slide.id, "\">\n            <span class=\"close_slide\" data-id=\"").concat(slide.id, "\" ><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span>\n            <div class=\"col-md-12\">\n                <div class=\"form-textarea form-control textarea\" contenteditable=\"true\" id=\"textArea_").concat(setVar, "\">").concat(slide.textCaption || '', "</div>\n            </div>\n            <div class=\"col-md-12 padding0\">\n                <ul class=\"row list-inline\">\n                    <li class=\"col-md-7 mt10 mb15\">\n                        <label class=\"form-element-label custom-label-box4\">Animation Type</label>\n                        <select class=\"form-control form-element text_animation_type\" id=\"").concat(slide.id, "text_animation_type\">\n                            <option ").concat(slide.text_animation_type == 'left' ? 'selected' : '', " value=\"left\">Slide Left</option>\n                            <option ").concat(slide.text_animation_type == 'right' ? 'selected' : '', " value=\"right\">Slide Right</option>\n                            <option ").concat(slide.text_animation_type == 'top' ? 'selected' : '', " value=\"top\">Slide Top</option>\n                            <option ").concat(slide.text_animation_type == 'bottom' ? 'selected' : '', " value=\"bottom\">Slide Bottom</option>\n                        </select>\n                    </li>\n                    <li class=\"col-md-5 mt10 mb15\">\n                        <label class=\"form-element-label custom-label-box4\">Start Time<span class=\"in-sec\">(s)</span></label>\n                        <input type=\"text\" id=\"").concat(slide.id, "_text_start_time\" class=\"text_start_time form-element form-control\" value=\"").concat(slide.text_start_time || '1', "\">\n                    </li>\n                    <li class=\"col-md-7 mt10\">\n                        <label class=\"form-element-label custom-label-box4\">Animation Time<span class=\"in_sec\">(s)</span></label>\n                        <input type=\"text\" id=\"").concat(slide.id, "_text_transition_duration\" class=\"text_transition_duration form-element form-control\" value=\"").concat(slide.text_transition_duration || '1', "\">\n                    </li>\n                    <li class=\"col-md-5 mt10\">\n                        <label class=\"form-element-label custom-label-box4\">End Time<span class=\"in_sec\">(s)</span></label>\n                        <input type=\"text\" id=\"").concat(slide.id, "_text_end_time\" class=\"text_end_time form-element form-control\" ").concat(slide.neverHide ? 'disabled' : '', " value=\"").concat(slide.text_end_time || '1', "\">\n                    </li>\n                </ul>\n            </div>\n            <div class=\"col-md-12\">\n                <div class=\"advance-setting-button\">\n                    <button data-toggle=\"collapse\" data-target=\"#text-animation-advanced-settings_").concat(setVar, "\" class=\"collapsed\">More Settings</button>\n                </div>\n                <div id=\"text-animation-advanced-settings_").concat(setVar, "\" class=\"text-animation-advanced-settings collapse\">\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Never hide</label>\n                        <label class=\"switch switch-flat\">\n                            <input class=\"switch-input\" type=\"checkbox\" id=\"neverHide\" ").concat(slide.neverHide ? 'checked' : '', "/>\n                            <span class=\"switch-label\" data-on=\"Yes\" data-off=\"No\"></span> \n                            <span class=\"switch-handle\"></span> \n                        </label>\n                    </div>\n                    <div class=\"form-group mb-2\">\n                        <label class=\"form-element-label column-setting-heading\">Text alignment:</label>\n                    </div>\n                    <div class=\"row mb25 margin0\">\n                        <label class=\"radio-container col-md-6 form-element-label mb20 custom-label-box4\">Top Left\n                            <input class=\"collapse-input text-position\" type=\"radio\" name=\"text-position-").concat(setVar, "\" value=\"topleft\" data-target=\"group1\" ").concat(slide.textPosition == 'topleft' ? 'checked' : '', ">\n                            <span class=\"circlemark\"></span>\n                        </label>\n                        <label class=\"radio-container col-md-6 form-element-label mb20 custom-label-box4\">Top Right\n                            <input class=\"collapse-input text-position\" type=\"radio\" name=\"text-position-").concat(setVar, "\" value=\"topright\" data-target=\"group1\" ").concat(slide.textPosition == 'topright' ? 'checked' : '', ">\n                            <span class=\"circlemark\"></span>\n                        </label>\n                        <label class=\"radio-container col-md-6 form-element-label mb20 custom-label-box4\">Top Center\n                            <input class=\"collapse-input text-position\" type=\"radio\" name=\"text-position-").concat(setVar, "\" value=\"topcenter\" data-target=\"group1\" ").concat(slide.textPosition == 'topcenter' ? 'checked' : '', ">\n                            <span class=\"circlemark\"></span>\n                        </label>\n                        <label class=\"radio-container col-md-6 form-element-label mb20 custom-label-box4\">Center Left\n                            <input class=\"collapse-input text-position\" type=\"radio\" name=\"text-position-").concat(setVar, "\" value=\"centerleft\" data-target=\"group1\" ").concat(slide.textPosition == 'centerleft' ? 'checked' : '', ">\n                            <span class=\"circlemark\"></span>\n                        </label>\n                        <label class=\"radio-container col-md-6 form-element-label mb20 custom-label-box4\">Center Right\n                            <input class=\"collapse-input text-position\" type=\"radio\" name=\"text-position-").concat(setVar, "\" value=\"centerright\" data-target=\"group1\" ").concat(slide.textPosition == 'centerright' ? 'checked' : '', ">\n                            <span class=\"circlemark\"></span>\n                        </label>\n                        <label class=\"radio-container col-md-6 form-element-label mb20 custom-label-box4\">Center Center\n                            <input class=\"collapse-input text-position\" type=\"radio\" name=\"text-position-").concat(setVar, "\" value=\"centercenter\" data-target=\"group1\" ").concat(slide.textPosition == 'centercenter' ? 'checked' : '', ">\n                            <span class=\"circlemark\"></span>\n                        </label>\n                        <div class=\"d-none\">\n                        <label class=\"radio-container col-md-6 form-element-label mb20 custom-label-box4\">Bottom Left\n                            <input class=\"collapse-input text-position\" type=\"radio\" name=\"text-position-").concat(setVar, "\" value=\"bottomleft\" data-target=\"group1\" ").concat(slide.textPosition == 'bottomleft' ? 'checked' : '', ">\n                            <span class=\"circlemark\"></span>\n                        </label>\n                        <label class=\"radio-container col-md-6 form-element-label mb20 custom-label-box4\">Bottom Center\n                            <input class=\"collapse-input text-position\" type=\"radio\" name=\"text-position-").concat(setVar, "\" value=\"bottomcenter\" data-target=\"group1\" ").concat(slide.textPosition == 'bottomcenter' ? 'checked' : '', ">\n                            <span class=\"circlemark\"></span>\n                        </label>\n                        <label class=\"radio-container col-md-6 form-element-label mb20 custom-label-box4\">Bottom Right\n                            <input class=\"collapse-input text-position\" type=\"radio\" name=\"text-position-").concat(setVar, "\" value=\"bottomright\" data-target=\"group1\" ").concat(slide.textPosition == 'bottomright' ? 'checked' : '', ">\n                            <span class=\"circlemark\"></span>\n                        </label>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        "));
    this.slideIds.push('textArea_' + setVar);
    return this.slideIds;
  };
}

Animation_widget.prototype = Object.create(MainWidget.prototype);