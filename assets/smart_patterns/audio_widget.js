"use strict";

function Audio_widget() {
  this.init = function () {
    this.settings = {
      "url": "./assets/audio/file_example_MP3_700KB.mp3",
      "autoplay": false,
      "loop": false,
      "mute": true,
      "layoutType": 'responsive',
      "css": '',
      "alignment": 'center',
      "width": 'auto'
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
    this.custom();
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
    var elm = $('#width');

    if (!($(that).val() == 'responsive')) {
      $('#' + $(that).data('target')).slideDown();
      $('#width').prop('required', 'required');
    } else {
      $('#' + $(that).data('target')).slideUp();
      $('#width').removeAttr('required');
    }
  };

  this.getFormHTML = function () {
    var html = "\n            <form id=\"audio_widget_form\" class=\"form-settings\">\n                <div class=\"form-group p_20\">\n\t\t\t\t\t<label class=\"form-element-label custom-label-box4\">File Upload</label>\n\t\t\t\t\t<input type=\"file\" id=\"url\" class=\"form-control form-file-element\" name=\"filename\" accept=\"audio/mp3,audio/*;capture=microphone\">\n\t\t\t\t</div>\n                <div id=\"accordion\" class=\"advance-setting-accordion\">\n                <div class=\"card\">\n                    <div class=\"card-header advance_setting_hedaer\" id=\"headingOne\">\n                        <h2 class=\"mb-0\">\n                            <span class=\"advanceSetting d-flex advance_flipcart btn btn-link collapsed\" data-toggle=\"collapse\" data-target=\"#collapseaudio\" aria-expanded=\"false\" aria-controls=\"collapseOne\">\n                            More Settings\n                                <span class=\"advance-accordian-arrow\" data-toggle=\"collapse\" data-target=\"#collapseaudio\" aria-expanded=\"false\" aria-controls=\"collapseOne\"><i class=\"fa fa-angle-down\"></i></span>\n                            </span>\n                            </h2>\n                        \n                    </div>\n                    <div id=\"collapseaudio\" class=\"collapse\" aria-labelledby=\"headingOne\" data-parent=\"#accordion\">\n                        <div class=\"card-body advance_setting_body\">\n                        <div class=\"form-group paddlr15\">\n                            <div class=\"row mb25\">\n                                <label class=\"radio-container col form-element-label margin0 custom-label-box4\">Responsive\n                                    <input class=\"collapse-input\" type=\"radio\" name=\"responsive\" value=\"responsive\" data-target=\"group1\" ".concat(this.settings.layoutType == 'responsive' ? 'checked' : '', ">\n                                    <span class=\"circlemark\"></span>\n                                </label>\n                                <label class=\"radio-container col form-element-label margin0 custom-label-box4\">Fixed\n                                    <input class=\"collapse-input\" type=\"radio\" name=\"responsive\" value=\"fixed\" data-target=\"group1\" ").concat(this.settings.layoutType == 'fixed' ? 'checked' : '', ">\n                                    <span class=\"circlemark\"></span>\n                                </label>\n                            </div>\n                        <div class=\"if-fixed\">\n                            <div class=\"row collapse-group fixed-option\" id=\"group1\">\n                                <div class=\"col-md-12\">\n                                    <label class=\"form-element-label custom-label-box4\">Width</label>  \n                                    <input class=\"form-element form-control\" id=\"width\" type=\"text\" name=\"width\" autocomplete=\"off\" placeholder=\"Width\" value=\"").concat(this.settings.width, "\">\n                                    <span class=\"input-inst-msg\">e.g, 100px</span>\n                                </div>\n                                <div class=\"col-md-12 mt35\">\n                                    <label class=\"form-element-label column-setting-heading\">Alignment</label>\n                                    <div class=\"row margin0\">\n                                        <label class=\"radio-container width-30 form-element-label custom-label-box4\">Left\n                                            <input type=\"radio\" name=\"alignment\" value=\"left\" ").concat(this.settings.alignment == 'left' ? 'checked' : '', ">\n                                            <span class=\"circlemark\"></span>\n                                        </label>\n                                        <label class=\"radio-container width-30 form-element-label custom-label-box4\">Center\n                                            <input type=\"radio\" name=\"alignment\" value=\"center\" ").concat(this.settings.alignment == 'center' ? 'checked' : '', ">\n                                            <span class=\"circlemark\"></span>\n                                        </label>\n                                        <label class=\"radio-container width-30 form-element-label custom-label-box4\">Right\n                                            <input type=\"radio\" name=\"alignment\" value=\"right\" ").concat(this.settings.alignment == 'right' ? 'checked' : '', ">\n                                            <span class=\"circlemark\"></span>\n                                        </label>\n      <label class=\"radio-container mt20 col form-element-label custom-label-box4\">Vertical Center\n                                            <input type=\"radio\" name=\"alignment\" value=\"Vertical Center\" ").concat(this.settings.alignment == 'Vertical Center' ? 'checked' : '', ">\n                                            <span class=\"circlemark\"></span>\n                                        </label>\n                                                                 </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col width-30\">\n                            <label class=\"form-element-label\">AutoPlay</label>\n                            <label class=\"switch switch-flat\">\n                                <input class=\"switch-input\" type=\"checkbox\" id=\"autoplay\" value=\"autoplay\" ").concat(this.settings.autoplay ? 'checked' : '', "/>\n                                <span class=\"switch-label\" data-on=\"Yes\" data-off=\"No\"></span> \n                                <span class=\"switch-handle\"></span> \n                            </label>\n                        </div>\n                        <div class=\"col width-30\">\n                            <label class=\"form-element-label\">Loop</label>  \n                            <label class=\"switch switch-flat\">\n                                <input class=\"switch-input\" type=\"checkbox\" id=\"loop\" value=\"loop\" ").concat(this.settings.loop ? 'checked' : '', "/>\n                                <span class=\"switch-label\" data-on=\"Yes\" data-off=\"No\"></span> \n                                <span class=\"switch-handle\"></span> \n                            </label>\n                        </div>\n                        <div class=\"col width-30\">\n                            <label class=\"form-element-label\">Mute</label>\n                            <label class=\"switch switch-flat\">\n                                <input class=\"switch-input\" type=\"checkbox\" id=\"muted\" value=\"muted\" ").concat(this.settings.mute ? 'checked' : '', "/>\n                                <span class=\"switch-label\" data-on=\"Yes\" data-off=\"No\"></span> \n                                <span class=\"switch-handle\"></span> \n                            </label>\n                        </div>\n                    </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n                <div class=\"form-group text-right px-3\">\n                    <button type=\"submit\" class=\"formBtn yesBtn\">Apply</button>\n                </div>\n            </form>\n        ");
    return html;
  };

  this.uploadAudio = function (ev) {
    ev.preventDefault();
    debugger
    var that = this;
    var flagKey = false;
    var formData = new FormData(document.getElementById('audio_widget_form'));
    that.settings.layoutType = $(ev.target).find("[name='responsive']:checked").val();
    that.settings.autoplay = $(ev.target).find("#autoplay").is(':checked');
    that.settings.loop = $(ev.target).find("#loop").is(':checked');
    that.settings.muted = $(ev.target).find("#muted").is(':checked');
    
    if (that.settings.layoutType == 'fixed') {
      that.settings.width = $(ev.target).find("[name='width']").val();
      that.settings.alignment = $(ev.target).find("[name='alignment']:checked").val();
    } else {
      flagKey = true;
    }
   
    var h_position = "";

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

    if(that.settings.width == "auto"){
      that.settings.width = '100%';
    }

    if (!flagKey) {
      var css = "width: ".concat(that.settings.width, "; \n                margin: 0 !important; ");
    } else {
      var css = "width: 100%; \n                margin: 0 !important;";
    }
    that.settings.css = css;
    var audio_name = $("#audio_widget_form [name='filename']").val();
    var audio_name_ext = audio_name.split(".")[audio_name.split(".").length - 1];
    console.log(audio_name_ext);

    if (audio_name_ext === 'mp3' || audio_name_ext === 'ogg' || audio_name_ext === 'wav') {
      displayNotification("audio file selected");
    } else {
      displayNotification("Please select only audio file");
      return false;
    }

    

    if ($("#audio_widget_form [name='filename']").val() != '') {
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
      }, function (data) {});
    } else {
      that.widget.reMount(that.settings);
    }
  };

  this.bindEditFormEvents = function () {
    var that = this;
    widgetSettingPanelOpenSetIcon();
    $(document).on('keypress keyup', '#width', function () {
      var $th = $(this);
      $th.val( $th.val().replace(/[^a-zA-Z0-9]/g, function(str) { 
      displayNotification('Please Enter Valid Pattern Width'); return '';} ) );  
    });
    $("#audio_widget_form").on("submit", function (e) {
      e.preventDefault();
      that.uploadAudio(e);
      $("#audio_widget_form input[type='file']").val('');
      that.settings.autoplay = $(e.target).find('#autoplay').prop('checked') ? true : false;
      that.settings.controls = $(e.target).find('#controls').prop('checked') ? true : false;
      that.settings.loop = $(e.target).find('#loop').prop('checked') ? true : false;
      that.settings.mute = $(e.target).find('#muted').prop('checked') ? true : false;
      that.widget.reMount(that.settings);
    });
  };
}

Audio_widget.prototype = Object.create(MainWidget.prototype);