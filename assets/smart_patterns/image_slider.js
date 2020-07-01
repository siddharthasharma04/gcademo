function Image_slider() {
  this.init = function () {
    this.settings = {
      "slides": [],
      "autoplay": true,
      "caption": false,
      "caption_text": "",
      "navigation": true,
      "duration": 3000,
      "url": '',
      "isMediaLibrary": false,
      "images": []
    };
    this.widget = new Widget(this.settings);
    this.widget.openAddModal(this.getFormHTML());
    this.bindAddFormEvents("add");
    return this.widget.getWidgetId();
  };

  this.edit = function () {
    this.widget.openAddModal(this.getFormHTML());
    this.bindAddFormEvents("edit");
  };

  this.getFormHTML = function () {
    var html = $("\n        <div class=\"widget-settings-wrapper image-slider-widget mdwrap p-4 modalBody\">\n            <div class=\"row\">\n                <div class=\"col-md-7\">\n                    <div class=\"create_slider\">\n                        <div class=\"row\" id=\"rowSlider\"></div>\n                    </div>\n                </div>\n                <div class=\"col-md-5\">\n                    <div class=\"settings_slider\">\n                        <h4 class=\"title_slider d-none\">Slider settings</h4>\n                        <form id=\"image_slider\" class=\"row\">\n                            <div class=\"form-group col-sm-6\">\n                                <label class=\"modalLabel custom-label-box4\">Autoplay</label>\n                                <label class=\"switch switch-flat\">\n                                    <input class=\"switch-input\" type=\"checkbox\" id=\"autoplay\" value=\"autoplay\" ".concat(this.settings.autoplay ? 'checked' : '', ">\n                                    <span class=\"switch-label\" data-on=\"Yes\" data-off=\"No\"></span>\n                                    <span class=\"switch-handle\"></span>\n                                </label>\n                            </div>\n                            <!--<div class=\"form-group col-sm-6\">\n                                <label class=\"form-element-label custom-label-box4\">Caption text</label>\n                                <label class=\"switch switch-flat\">\n                                    <input class=\"switch-input\" type=\"checkbox\" id=\"caption\" value=\"autoplay\" ").concat(this.settings.caption ? 'checked' : '', ">\n                                    <span class=\"switch-label label_caption\" data-on=\"Yes\" data-off=\"No\"></span>\n                                    <span class=\"switch-handle\"></span>\n                                </label>\n                            </div>-->\n                            <!--<div class=\"form-group caption_section col-sm-12\">\n                                <label class=\"form-element-label custom-label-box4\">Caption text discription</label>\n                                <textarea class=\"form-control form-element\" rows=\"2\" id=\"caption_text\" value=\"").concat(this.settings.caption_text, "\"> ").concat(this.settings.caption_text, "</textarea>\n                            </div>-->\n                            <div class=\"form-group col-sm-6\">\n                                <label class=\"modalLabel custom-label-box4\">Navigation dots</label>\n                                <label class=\"switch switch-flat\">\n                                    <input class=\"switch-input\" type=\"checkbox\" id=\"navigation\" value=\"navigation\" ").concat(this.settings.navigation ? 'checked' : '', ">\n                                    <span class=\"switch-label\" data-on=\"Yes\" data-off=\"No\"></span>\n                                    <span class=\"switch-handle\"></span>\n                                </label>\n                            </div>\n                            <div class=\"form-group col-sm-6\">\n                                <label class=\"modalLabel custom-label-box4\">Slide duration</label>\n                                <input type=\"text\" class=\"form-control form-element fw-input\" id=\"duration\" name=\"\" value=\"").concat(this.settings.duration, "\">\n                            </div>\n                            <div class=\"col-md-12\">\n                                <button id=\"close_modal\" class=\"modalBtn pull-left yesBtn insert_slider\">Apply</button>\n                            </div>\n                        </form>\n                    </div>\n                </div> \n            </div> \n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <div class=\"form-group mt20 mb0\">\n                        <form action=\"/file-upload\" name=\"filename\" class=\"dropzone\" id=\"dropZone\" >\n                            <div class=\"fallback\">\n                                <input name=\"filename\" type=\"file\" multiple />\n                            </div>\n                        </form>\n                    </div>\n                    <div class=\"text-center mb20 mt20\">\n                        <span class=\"font12\">OR</span>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"form-group\">\n                            <button type=\"button\" id=\"showImageLibrary\" data-btn-attr=\"1\" data-lib-selection-type=\"multiple\" class=\"width100 font14 formBtn yesBtn showImageLibrarybtn no-border-radius no-border-radius height70\">Select from Image Library</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <!--<div class=\"row\">\n                <div class=\"col-md-12\">\n                    <button id=\"close_modal\" class=\"modalBtn pull-left yesBtn insert_slider\"Apply</button>\n                </div>\n            </div>-->\n            <br />\n            <span>Please ensure that all the uploaded images are of same resolution.</span>\n            <div class=\"modal\" id=\"imageAspectRatioPopUp\" tabindex=\"-1\" role=\"dialog\">\n            </div>\n        </div>\n        "));
    var that = this;
    this.settings.slides.forEach(function (slide, index) {
      that.loadSlideSettings(slide, html.find('#rowSlider')); // enableCkeditor(slide.id+"_caption"); 
    });
    that.callAddImageUsingMediaLibrary();
    $(document).on('click', '.insert_slider', function () {
      $(document).off('click', '.apply-selected-image-btn');
    });
    return html;
  };

  this.callAddImageUsingMediaLibrary = function () {
    var that = this;
    $(document).on('click', '.apply-selected-image-btn', function (e) {
      if (e.handled !== true) {
        that.addImageUsingMediaLibrary(e);
        e.handled = true;
      }
    });
  };

  this.bindAddFormEvents = function (type) {
    var that = this;
    that.settings.url = $(e.target).find(".select-file").val();
    that.SliderDroZoneEvent();
    this.settings.slides.forEach(function (slide, index) {
      enableCkeditor(slide.id + "_caption");
    });
    $("#image_slider").on("submit", function (e) {
      e.preventDefault();
      that.settings.duration = $(e.target).find('#duration').val(); // that.settings.caption_text = $(e.target).find('#caption_text').val(); 

      that.settings.autoplay = $(e.target).find('#autoplay').prop('checked') ? true : false; // that.settings.caption = ($(e.target).find('#caption').prop('checked')) ? true : false;

      that.settings.navigation = $(e.target).find('#navigation').prop('checked') ? true : false;
      that.settings.slides = [];

      if ($(".slide_settings").length < 2) {
        displayNotification("Required at least two images.", 'error');
        return;
      }

      $(".slide_settings").each(function (index, slide_settings) {
        var id = $(this).attr("id");
        var url = $(this).find("img").attr("src");
        var caption = $(this).find(".form-textarea").html();
        var imgWidth = $(this).find("img").width();
        var imgHeight = $(this).find("img").height();
        console.log(imgWidth, imgHeight);
        that.settings.slides.push({
          id: id,
          url: url,
          caption: caption
        });
      });

      if (type === "add") {
        that.widget.insert(that.settings);
      } else {
        that.widget.reMount(that.settings);
      }

      that.widget.closeAddModal();
    });
    $('.create_slider').on('click', '.close_slide', function () {
      $(this).closest(".slide_settings").remove();
    });
  };

  var imageHeight = 0;
  var imageWidth = 0;
  var aspectRatio = 0;

  this.SliderDroZoneEvent = function () {
    var that = this;
    var myDropzone = new Dropzone("#dropZone", {
      acceptedFiles: ".jpeg,.jpg,.png,.gif",

      /*is this correct?*/
      url: appUrl + '/new-image',
      paramName: 'filename',
      "headers": {
        "course_path": $courseJson.courseDirPath,
        "token": localStorage.getItem('token')
      }
    });
    myDropzone.on("thumbnail", function (file) {
      // Do the dimension checks you want to do
      if (imageWidth == 0 && imageHeight == 0) {
        imageWidth = file.width;
        imageHeight = file.height;
        aspectRatio = (imageWidth / imageHeight).toFixed(2);
      } else {
        var curImageWidth = file.width;
        var curImageHeight = file.height;
        var curAspectRatio = (curImageWidth / curImageHeight).toFixed(2);

        if (curAspectRatio != aspectRatio) {
          $('#imageAspectRatioPopUp').html('');
          $('#imageAspectRatioPopUp').append(uploadImageAspectRatio(curImageWidth, curImageHeight));
          $("#imageAspectRatioPopUp").modal("show");
          $('#dropZone div:eq(1)').remove();
          $('#dropZone div:eq(0)').show();
          myDropzone.removeAllFiles(true);
        }
      }
    });
    myDropzone.on("complete", function (result) {
      if (!result.xhr.response || result.xhr.response.trim().length == 0) {
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
      enableCkeditor(slide.id + "_caption");
      setTimeout(function () {
        myDropzone.removeAllFiles();
      }, 1000);
    });
  };

  this.addImageUsingMediaLibrary = function (event) {
    var that = this;
    mediaLibObj = imageLibraryHandler();
    var validImagesUrl = [],
        invalidImagesUrl = [],
        curImageWidth,
        curImageHeight;
    $.each(mediaLibObj.image, function (index, item) {
      if (imageWidth == 0 && imageHeight == 0) {
        imageWidth = item[0].width;
        imageHeight = item[0].height;
        validImagesUrl.push(mediaLibObj.url[index]);
      } else {
        if (imageWidth == item[0].width && imageHeight == item[0].height) {
          validImagesUrl.push(mediaLibObj.url[index]);
        } else {
          curImageWidth = item[0].width;
          curImageHeight = item[0].height;
          invalidImagesUrl.push(mediaLibObj.url[index]);
        }
      }
    });

    if (invalidImagesUrl.length > 0) {
      $('#imageAspectRatioPopUp').html('');
      $('#imageAspectRatioPopUp').append(uploadImageAspectRatio(curImageWidth, curImageHeight));
      $("#imageAspectRatioPopUp").modal("show");
    }
      that.settings.images = that.settings.url = validImagesUrl;
      that.settings.isMediaLibrary = mediaLibObj.isMediaLib;
      that.UploadImage(event);
    $('.image-library-container li').removeClass('image-selected');
  };

  this.UploadImage = function (ev) {
    ev.preventDefault();
    var mediLibImgIdArr = [];
    var that = this;
    var arbitaryFileData = that.settings;
    mediLibImgIdArr = Object.keys(that.settings.images);
    $('#loader').show();
    axios.post(appUrl + '/multiple-image-from-gallery', arbitaryFileData, {
      headers: {
        "course_path": $courseJson.courseDirPath,
        "token": localStorage.getItem('token'),
        "keys": mediLibImgIdArr
      }
    }).then(function (result) {

      if (result.data.data.target_path && result.data.data.target_path.length > 0) {
        setTimeout(function(){
        for (var i = 0; i < result.data.data.target_path.length; i++) {
          if (result.data.data.target_path[i] != null && result.data.data.target_path[i] != "") {
            that.settings.images[i] = result.data.data.target_path[i];
            var slide1 = {
              'id': makeid(),
              'url': that.settings.images[i],
              caption: ''
            };
            that.loadSlideSettings(slide1, $('#rowSlider'));
            enableCkeditor(slide1.id + "_caption");
          }
        }
      },1000);  
      }

      setTimeout(function () {
        //that.widget.reMount(that.settings);
        $('#loader').hide();
      }, 300);
    });
  };

  this.loadSlideSettings = function (slide, $target) {
    $target.append("\n            <div class=\"col-md-12 delete_slide slide_settings\" id=\"".concat(slide.id, "\">\n                <span class=\"close_slide\" data-id=\"").concat(slide.id, "\" ><i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n                </span>\n                <div class=\"row\">\n                    <div class=\"col-md-2 image-slider-list\">\n                        <img src=\"").concat(slide.url, "\" class=\"img-fluid\" />\n                    </div>\n                    <div class=\"col-md-10\">\n                    <div contenteditable=\"true\" class=\"form-textarea form-control\" id=\"").concat(slide.id, "_caption\">").concat(slide.caption, "</div>\n                    </div>\n                    </div>\n            </div>\n        "));
  };
}

function uploadImageAspectRatio(curImageWidth, curImageHeight) {
  return "<div class=\"modal-dialog modal-dialog-centered\" role=\"document\">\n\t<div class=\"modal-content modalContent\">\n\t\t<div class=\"modal-header modalHeader\">\n\t\t\t<h5 class=\"modal-title\">Image Upload Error</h5>\n\t\t\t<button type=\"button\" class=\"close modalClose\" data-dismiss=\"modal\" aria-label=\"Close\">\n\t\t\t\t<span class=\"modalCloseIcon\"></span>\n\t\t\t\t<span class=\"modalCloseIcon\"></span>\n\t\t\t</button>\n\t\t</div>\n\t\t<div class=\"modal-body modalBody\">\n\t\t\t<p> Please upload / select  an image having ".concat(curImageWidth, "x").concat(curImageHeight, " resolution. It should be same as first image resolution.</p>\n\t\t</div>\n\t\t<div class=\"modal-footer modalFooter\">\n\t\t\t<button type=\"submit\" class=\"modalBtn NoBtn cancelBtn\" data-dismiss=\"modal\"  onClick=\"popupClose()\" aria-label=\"Close\">OK</button>\n\t\t</div>\n\t</div>\n</div>");
}

Image_slider.prototype = Object.create(MainWidget.prototype);