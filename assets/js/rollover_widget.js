function Rollover_widget() {
  this.init = function () {
    this.settings = {
      "images": ['./assets/img/rollover1.jpg', './assets/img/rollover2.jpg'],
      "width": "400",
      "height": "300",
      "alt": "rollover image",
      "isMediaLibrary": false
    };
    this.widget = new Widget(this.settings);
    this.widget.openEditPanel(this.getFormHTML());
    this.widget.insert(this.settings);
    this.bindEditFormEvents();
    return this.widget.getWidgetId();
  };

  this.edit = function () {
    this.widget.openEditPanel(this.getFormHTML());
    this.bindEditFormEvents();
  };

  this.getFormHTML = function () {
    var html = '<div class=""> <form id="rollover_widget_form1" class="form-settings rollover_modal"> <div class="form-group p_20"> <label class="form-element-label custom-label-box4">Select First Image</label> <input type="file" id="rollover_img1" input-attr-id="1" class="form-control form-file-element" name="filename" accept="image/*"> </div><div class="text-center"> <span class="font12">OR</span> </div><div class="form-group img-lib p_20"> <div class="form-group"> <button type="button" id="showImageLibrary1" data-btn-attr="1" class="width100 font12 formBtn yesBtn showImageLibrarybtn">Select from Image Library</button> <span class="showImageLibraryFileName"></span> <span class="showImageLibraryFullFilePath hide"></span> </div></div><div class="form-group px_20 mt20"> <label class="form-element-label custom-label-box4">Select Second Image</label> <input type="file" id="rollover_img2" input-attr-id="2" class="form-control form-file-element" name="filename" accept="image/*"> </div><div class="text-center"> <span class="font12">OR</span> </div><div class="form-group img-lib p_20"> <div class="form-group"> <button type="button" id="showImageLibrary2" data-btn-attr="2" class="width100 font12 formBtn yesBtn showImageLibrarybtn">Select from Image Library</button> <span class="showImageLibraryFileName"></span> <span class="showImageLibraryFullFilePath hide"></span> </div></div><div class="form-group text-right px-3"> <button type="submit" class="modalBtn yesBtn">Apply</button> </div></form></div>';
    return html;
  };

  this.bindEditFormEvents = function () {
    var that = this;
    $("#rollover_widget_form1").on("submit", function (e) {
      var isMediaLibImageSelected = false;
      $(".showImageLibraryFileName").filter(function () {
        if ($(this).text() != "") {
          isMediaLibImageSelected = true;
        }
      });

      if (isMediaLibImageSelected) {
        mediaLibObj = imageLibraryHandler();
        that.settings.images = mediaLibObj.url;
        that.settings.isMediaLibrary = mediaLibObj.isMediaLib;
      }

      that.UploadImage(e);
      $("#rollover_widget_form1 input[type='file']").val();
      that.widget.reMount(that.settings);
      that.widget.closeAddModal();
    });
    $('#rollover_widget_form1 input[type="file"]').change(function () {
      var fileID = $(this).attr("input-attr-id");
      $("#showImageLibrary" + fileID + "+ .showImageLibraryFileName").text("").hide();
      $("#showImageLibrary" + fileID + "+ .showImageLibraryFileName + .showImageLibraryFullFilePath").text("").hide();
      that.settings.images[parseInt(fileID) - 1] = "";
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
    var that = this;
    var formData = new FormData(document.getElementById('rollover_widget_form1'));
    var inputTypeImgIdArr = [];
    var inputTypeImgLen = $("#rollover_widget_form1 [name='filename']").filter(function () {
      if ($(this).val() != "") {
        inputTypeImgIdArr.push(parseInt($(this).attr("input-attr-id") - 1));
      }

      return $(this).val();
    }).length;

    if ($(".showImageLibraryFileName").filter(function () {
      return $(this).text();
    }).length == 0) {
      that.settings.isMediaLibrary = false;
    } else {
      that.settings.isMediaLibrary = true;
    }
    if (inputTypeImgLen > 0) {
      $('#loader').show();
      axios.post(appUrl + '/multiUpload', formData, {
        headers: {
          "course_path": $courseJson.courseDirPath,
          "token": localStorage.getItem('token'),
          "keys": inputTypeImgIdArr
        }
      }).then(function (result) {
        var imgLen = result.data.data.length;

        if (result.data && result.data.data && imgLen > 0) {
          for (var i = 0; i < imgLen; i++) {
            if (result.data.data[i] != null && result.data.data[i] != "") {
              that.settings.images[i] = result.data.data[i];
              that.widget.reMount(that.settings);
            }
          }
        }

        $('#loader').hide();
      });
    }

    if (that.settings.isMediaLibrary == true) {
      var arbitaryFileData = that.settings;
      var mediLibImgIdArr = [];
      var mediLibImgLen = $(".showImageLibraryFileName").filter(function () {
        if ($(this).is(':visible')) {
          mediLibImgIdArr.push(parseInt($(this).prev().attr("data-btn-attr")) -1);
        }
      }).length;

      $('#loader').show();
      console.log(arbitaryFileData);
      axios.post(appUrl + '/multiple-image-from-gallery', arbitaryFileData, {
        headers: {
          "course_path": $courseJson.courseDirPath,
          "token": localStorage.getItem('token'),
          "keys": mediLibImgIdArr
        }
      }).then(function (result) {
        if (result.data.data.target_path && result.data.data.target_path.length > 0) {
          for (var i = 0; i < result.data.data.target_path.length; i++) {
            if (result.data.data.target_path[i] != null && result.data.data.target_path[i] != "") {
              that.settings.images[i] = result.data.data.target_path[i];
            }
          }
        }

        setTimeout(function () {
          that.widget.reMount(that.settings);
          $('.showImageLibraryFileName').hide();
          $('#loader').hide();
        }, 300);
      });
    } else {// that.widget.reMount(that.settings);
    }
  };
}

Rollover_widget.prototype = Object.create(MainWidget.prototype);