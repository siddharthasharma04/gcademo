function Hotspot() {
  this.init = function () {
    this.settings = {
      "image_url": "",
      spots: []
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
    var html = $("\n            <div class=\"widget-settings-wrapper mdwrap\">\n                <form id=\"hotspot_widget_form\" class=\"form-settings mcq_modal modalBody\">\n                    <div class=\"modal-body\">\n                        <input type=\"file\" name=\"filename\" class=\"form-control form-group\" accept=\"image/*\"/>\n                        <button type=\"submit\" class=\"modalBtn yesBtn pull-right mb-4\" id=\"addimage\">Add Image</button>\n                    </div>\n                </form>\n\n                <div id=\"hotspot_widget_demo\">\n                    <div id=\"hotspot_widget_wrapper\">\n                        \n                    </div>\n                    <div id=\"hotspot_text\" class=\"hotspot_text\" contenteditable=\"true\">\n                    </div>\n                    <div class=\"form-group\">\n                        <button type=\"button\" class=\"modalBtn yesBtn pull-right\" id=\"saveHotspot\" value=\"Save\">Apply</button>\n                    </div>\n                </div>\n                \n            </div>\n        ");
    return html;
  };

  this.bindAddFormEvents = function () {
    var that = this;
    $('#hotspot_widget_form').on("click", "#addimage", function (ev) {
      ev.preventDefault();
      that.UploadImage(ev);
    });
    $('#hotspot_widget_form input[type="file"]').change(function () {
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

  this.bindEditFormEvents = function (type) {
    $('#hotspot_widget_wrapper').html("\n\n            <img src=\"".concat($courseJson.courseDirPath + this.settings.image_url, "\" alt=\"Avatar\" class=\"hotspot_image\" />\n\n        ")).show();
    $("#hotspot_widget_demo, #saveHotspot, #hotspot_widget_form").show();
    this.loadSpots();
    this.dummySettings = Helpers.cloneObject(this.settings);
    this.bindEvents(type);
    var that = this;
    $('#hotspot_widget_form').on("click", "#addimage", function (ev) {
      ev.preventDefault();
      that.UploadImage(ev, type);
    });
    $('#hotspot_widget_form input[type="file"]').change(function () {
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

  this.loadSpots = function () {
    this.settings.spots.forEach(function (item, index) {
      if (item === null) return;
      $("#hotspot_widget_wrapper").append("\n                <div class='spot' draggable=\"true\" id='".concat(item.id, "' style=\"left: ").concat(item.left, "%; top: ").concat(item.top, "%\">\n                    <div class='spot_cross fa fa-close' data-spotid='").concat(item.id, "'></div>\n                </div>\n            "));

      if (index === 0) {
        $("#hotspot_widget_wrapper .spot#" + item.id).click();
      }
    });
  }, this.UploadImage = function (ev, type) {
    ev.preventDefault();
    var that = this;
    var formData = new FormData(document.getElementById('hotspot_widget_form'));
    axios.post(appUrl + '/new-image', formData, {
      headers: {
        "course_path": $courseJson.courseDirPath,
        "token": localStorage.getItem('token')
      }
    }).then(function (result) {
      if (result.data.status == 'Success') {
        displayNotification("Image uploaded", 'success');
        $('#hotspot_widget_wrapper').html("\n                    <img src=\"".concat($courseJson.courseDirPath + result.data.data, "\" alt=\"Avatar\" class=\"hotspot_image\" />\n                "));
        $("#hotspot_widget_demo, #saveHotspot").show();
        that.bindEvents(type);
        that.settings.image_url = result.data.data;
        that.settings.spots = [];
        that.dummySettings.spots = [];
      } else {
        displayNotification(result.data.message, 'error');
      }
    }, function (data) {
      alert('Some Problem Occurred');
    });
  };

  this.bindEvents = function (type) {
    enableCkeditor("hotspot_text");
    var that = this;
    var spotId = "";
    $(".hotspot_image").off("click").on("click", function (ev) {
      var spotCount = that.dummySettings.spots.length;
      var offset = $(this).offset();
      var fromLeft = ev.pageX - offset.left;
      var fromTop = ev.pageY - offset.top;
      var hotspotHeight = $(".hotspot_image").height();
      var hotspotWidth = $(".hotspot_image").width();
      var fromLeftPercent = fromLeft / hotspotWidth * 100;
      var fromTopPercent = fromTop / hotspotHeight * 100;
      var spot = {
        id: spotCount,
        left: fromLeftPercent,
        top: fromTopPercent,
        html: ""
      };
      $('.selected_spot').removeClass("selected_spot");
      $("#hotspot_widget_wrapper").append("\n                <div class='spot selected_spot' id='".concat(spotCount, "' draggable=\"true\">\n                    <div class='spot_cross fa fa-close' data-spotid='").concat(spotCount, "'></div>\n                </div>\n            ")); //$('#hotspot_widget_wrapper .selected_spot').removeClass("selected_spot")

      $("#hotspot_text").css("border", "1px solid #b8c4c7");
      spotId = spotCount;
      $("#hotspot_widget_wrapper .spot#".concat(spotCount)).css({
        "top": fromTopPercent + "%",
        "left": fromLeftPercent + "%"
      }); //.addClass("selected_spot")

      $("#hotspot_text").html("").attr("data-spotid", spotCount);
      spotCount++; //$("#hotspot_text").css("border","2px solid #B22222")
      //$('#hotspot_text').animate({"border-color": "#B22222"}, "slow");

      $('#hotspot_text').addClass("highlight_hotspot");
      setTimeout(function () {
        $('#hotspot_text').removeClass("highlight_hotspot");
      }, 2000);
      that.dummySettings.spots.push(spot);
      $("#hotspot_widget_wrapper").off("click").on("click", ".spot", function () {
        spotId = $(this)[0].id;
      });
    });
    $("#hotspot_text").bind("click keyup change cut paste", function (ev) {
      that.dummySettings.spots[spotId].html = $("#hotspot_text").html();

      if (spotId) {
        that.dummySettings.spots[spotId].html = $("#hotspot_text").html();
      }
    });
    $("#hotspot_text").bind("DOMNodeInserted", function (ev) {
      if ($("#hotspot_text").text()) {
        that.dummySettings.spots[spotId].html = $("#hotspot_text").html();
      }
    });
    $("#saveHotspot").off("click").on("click", function () {
      that.settings.spots = Helpers.cloneArray(that.dummySettings.spots);

      if (type === "edit") {
        that.widget.reMount(that.settings);
      } else {
        that.widget.insert(that.settings);
      }

      that.widget.closeAddModal();
    });
    $("#hotspot_widget_demo").off("click", ".spot").on("click", ".spot", function (ev) {
      if ($(ev.target).hasClass("spot_cross")) return;
      $('.selected_spot').removeClass("selected_spot");
      $(this).addClass("selected_spot"); //$("#hotspot_text").css("border","2px solid #B22222")
      //$('#hotspot_text').animate({"border-color": "#B22222"}, "slow");

      $('#hotspot_text').addClass("highlight_hotspot");
      setTimeout(function () {
        $('#hotspot_text').removeClass("highlight_hotspot");
      }, 2000);
      $("#hotspot_text").html('');
      spotId = $(this).attr("id");
      $("#hotspot_text").html(that.dummySettings.spots[spotId].html);
      $("#hotspot_text").attr("data-spotid", spotId); // $("#hotspot_text").attr("id", spotId + "_id")
    });
    $("#hotspot_widget_demo").off("click", ".spot_cross").on("click", ".spot_cross", function () {
      spotId = $(this).attr("data-spotid"); // that.dummySettings.spots[spotId]

      $("#hotspot_widget_demo .spot[id=\"".concat(spotId, "\"]")).remove();
      $("#hotspot_text").html('');
      that.dummySettings.spots[spotId] = null;
    }); //$("#hotspot_widget_wrapper .spot#0").click();
  };
}

Hotspot.prototype = Object.create(MainWidget.prototype);