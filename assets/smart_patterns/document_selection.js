function Document_selection() {
  this.init = function () {
    this.settings = {
      "slides": [],
      "pdfUrl": [],
      "doc_heading": ''
    };
    this.widget = new Widget(this.settings);
    this.widget.openAddModal(this.getFormHTML());
    this.bindAddFormEvents("add");
    return this.widget.getWidgetId();
  };

  var count = 0;

  this.edit = function () {
    this.widget.openAddModal(this.getFormHTML());
    this.bindAddFormEvents("edit");

    if ($('.slide_settings').length > 0) {
      $('.insert_document').removeClass('hidden');
    } else {
      $('.insert_document').addClass('hidden');
    }
  };

  this.getFormHTML = function () {
    var html = $("\n        <div class=\"widget-settings-wrapper document-widget mdwrap\">\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <div class=\"create_selection\">\n                    <form id=\"pdf_id\" name=\"myForm\" class=\"form-settings\">\n                    <div class=\"form-group\">\n                         <label class=\"modalLabel custom-label-box4\">Document heading</label>\n                         <textarea class=\"form-textarea form-control form-element\" id=\"doc_text\"required=\"\">".concat(this.settings.doc_heading, " </textarea>\n                    </div> \n                    <div class=\"row\" id=\"rowSlider\"></div>\n                    </form>\n                    </div>\n                </div>\n            </div> \n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <div class=\"form-group mt20 mb0\">\n                        <form action=\"/file-upload\" name=\"filename\" class=\"dropzone\" id=\"dropZone\">\n                            <div class=\"fallback\">\n                                <input name=\"filename\" type=\"file\" class=\"form-control form-file-element\" multiple  required=\"\"/>\n                            </div>\n                        </form>\n                    </div>\n                    <form id=\"image_slider\">\n                            <button id=\"close_modal\" class=\"modalBtn pull-right yesBtn insert_document hidden\">Apply</button>\n                    </form>\n                </div>\n            </div>\n        </div>\n        "));
    var that = this;
    count = 0;
    this.settings.slides.forEach(function (slide, index) {
      // count = 0;
      that.loadSlideSettings(slide, html.find('#rowSlider'));
    });
    return html;
  };

  this.bindAddFormEvents = function (type) {
    var that = this;
    that.settings.url = $(e.target).find(".select-file").val();
    that.SliderDroZoneEvent();
    $("#image_slider").on("submit", function (e) {
      e.preventDefault();

      if (type === "add") {
        if (document.querySelector("#pdf_id").reportValidity() == false) {
          return false;
        }
      }

      that.settings.slides = []; //  that.settings.pdfUrl = [];

      var isMount = false;
      var inputTypeImgIdArr = [];
      var inputTypeImgLen = $("#pdf_id [name='filename']").filter(function () {
        if ($(this).val() != "") {
          inputTypeImgIdArr.push(parseInt($(this).attr("input-attr-id") - 1));
        }

        return $(this).val();
      }).length;
      var formData = new FormData(document.getElementById('pdf_id'));
      axios.post(appUrl + '/multiUpload', formData, {
        headers: {
          "course_path": $courseJson.courseDirPath,
          "token": localStorage.getItem('token'),
          "keys": inputTypeImgIdArr
        }
      }).then(function (result) {
        if (!isMount) {
          that.settings.doc_heading = $('#doc_text').val();

          if (type === "add") {
            that.settings.pdfUrl = [];
            that.settings.pdfUrl = result.data.data;
            that.widget.insert(that.settings);
          } else {
            var imgLen = result.data.data.length;

            if (result.data && result.data.data && imgLen > 0) {
              for (var i = 0; i < imgLen; i++) {
                if (result.data.data[i] != null && result.data.data[i] != "") {
                  that.settings.pdfUrl[i] = result.data.data[i];
                  console.log(' that.settings.pdfUrl === ', that.settings.pdfUrl);
                  that.widget.closeAddModal();
                  that.widget.reMount(that.settings);
                }
              }
            }
          }

          isMount = true;
        }

        that.widget.closeAddModal();
        $('#loader').hide();
      });
      $(".slide_settings").each(function (index, slide_settings) {
        var id = $(this).attr("id");
        var url = $(this).find("img").attr("src");
        var caption = $(this).find("textarea").val();
        var formData = new FormData(document.getElementById('pdf_id'));
        var pdfUrl = [];
        $('#loader').show();
        that.settings.slides.push({
          id: id,
          url: url,
          caption: caption,
          pdfUrl: pdfUrl
        });
      });
    });
    $('.create_selection').on('click', '.close_slide', function () {
      var indexvalue = $(".slide_settings").index($(this).closest(".slide_settings"));
      $(this).closest(".slide_settings").remove();

      if (indexvalue > 0) {
        $('.insert_document').removeClass('hidden');
      } else {
        $('.insert_document').addClass('hidden');
      }
    });
  };

  this.showAddModal = function () {};

  this.SliderDroZoneEvent = function () {
    var that = this;
    var myDropzone = new Dropzone("#dropZone", {
      acceptedFiles: ".jpeg,.jpg,.png,.gif",

      /*is this correct?*/
      url: appUrl + '/new-image',
      paramName: 'filename',
      dictDefaultMessage: 'Drop images to upload as thumbnails',
      "headers": {
        "course_path": $courseJson.courseDirPath,
        "token": localStorage.getItem('token')
      }
    });
    myDropzone.on("complete", function (result) {
      var xhrRes = JSON.parse(result.xhr.response);
      var imgUrl = $courseJson.courseDirPath + xhrRes.data;
      var slide = {
        'id': makeid(),
        'url': imgUrl,
        caption: ''
      }; //count = 0;

      that.loadSlideSettings(slide, $('#rowSlider'));
      setTimeout(function () {
        myDropzone.removeAllFiles();
        $('.insert_document').removeClass('hidden');
        $('.upload_para').html('');
      }, 1000);
    });
  };

  this.loadSlideSettings = function (slide, $target) {
    count++;
    $target.append("\n            <div class=\"col-md-12 delete_slide slide_settings\" id=\"".concat(slide.id, "\">\n            <div class=\"document_section\">\n                <span class=\"close_slide\" data-id=\"").concat(slide.id, "\" ><i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n                </span>\n                <div class=\"row\">\n                    <div class=\"col-md-2 image-slider-list\">\n                        <img src=\"").concat(slide.url, "\" class=\"img-fluid\" />\n                    </div>\n                   <div class=\"col-md-5\"> \n                    <label class=\"form-element-label custom-label-box4\">Document caption</label>\n                        <textarea class=\"form-textarea form-control form-element\" id=\"").concat(slide.id, "_caption\"  required=\"\">").concat(slide.caption, "</textarea>\n                    </div>\n                    <div class=\"col-md-5\">\n                    <div class=\"form-group\">\n                    <label class=\"form-element-label custom-label-box4\">Upload document</label>\n                        <input type=\"file\"  input-attr-id=\"").concat(count, "\" class=\"form-control form-file-element\" name=\"filename\" value=\"\" id=\"").concat(slide.id, "_pdfUrl\"  required=\"\">   \n                    </div>\n                    </div>\n                    </div>\n                    </div>\n                </div>\n        "));
  };
}

Document_selection.prototype = Object.create(MainWidget.prototype);