var initialGlobalSettings = {
  "primary_color": "rgb(25, 171, 204)",
  "image_type": "Center",
  "h1_font_size": "",
  "text_font_size": "",
  "h1_font_family": "",
  "text_font_family": "",
  "bg_color": "rgb(255, 255, 255)",
  "bg_effect": "Color",
  "filePath": "",
  "extantion": "",
  "button_hover_color": "rgb(49, 146, 177)",
  "button_border_color": "rgb(25, 171, 204)",
  "is_btn_setting_changed": "false",
  "custom_setting_widgets": []
};

function applyGlobalSettings(pageType) {
  if (!$courseJson) {
    $courseJson = {};
  }

  if ($courseJson && !$courseJson.globalSettings) {
    $courseJson.globalSettings = {};
  }

  $courseJson.globalSettings = {
    "primary_color": $courseJson.globalSettings["primary_color"] ? $courseJson.globalSettings["primary_color"] : initialGlobalSettings.primary_color,
    "image_type": $courseJson.globalSettings["image_type"] ? $courseJson.globalSettings["image_type"] : initialGlobalSettings.image_type,
    "h1_font_size": $courseJson.globalSettings["h1_font_size"] ? $courseJson.globalSettings["h1_font_size"] : initialGlobalSettings.h1_font_size,
    "text_font_size": $courseJson.globalSettings["text_font_size"] ? $courseJson.globalSettings["text_font_size"] : initialGlobalSettings.text_font_size,
    "h1_font_family": $courseJson.globalSettings["h1_font_family"] ? $courseJson.globalSettings["h1_font_family"] : initialGlobalSettings.h1_font_family,
    "text_font_family": $courseJson.globalSettings["text_font_family"] ? $courseJson.globalSettings["text_font_family"] : initialGlobalSettings.text_font_family,
    "bg_color": $courseJson.globalSettings["bg_color"] ? $courseJson.globalSettings["bg_color"] : initialGlobalSettings.bg_color,
    "filePath": $courseJson.globalSettings["filePath"] ? $courseJson.globalSettings["filePath"] : initialGlobalSettings.filePath,
    "extantion": $courseJson.globalSettings["extantion"] ? $courseJson.globalSettings["extantion"] : initialGlobalSettings.extantion,
    "bg_effect": $courseJson.globalSettings["bg_effect"] ? $courseJson.globalSettings["bg_effect"] : initialGlobalSettings.bg_effect,
    "button_hover_color": $courseJson.globalSettings["button_hover_color"] ? $courseJson.globalSettings["button_hover_color"] : initialGlobalSettings.button_hover_color,
    "button_border_color": $courseJson.globalSettings["button_border_color"] ? $courseJson.globalSettings["button_border_color"] : initialGlobalSettings.button_border_color,
    "is_btn_setting_changed": $courseJson.globalSettings["is_btn_setting_changed"] ? $courseJson.globalSettings["is_btn_setting_changed"] : initialGlobalSettings.is_btn_setting_changed,
    "custom_setting_widgets": $courseJson.globalSettings["custom_setting_widgets"] ? $courseJson.globalSettings["custom_setting_widgets"] : initialGlobalSettings.custom_setting_widgets
  };

  if (pageType === 'Editor') {
    if ($courseJson.globalSettings && $courseJson.globalSettings.extantion.trim() == 'mp4') {
      $('.editor-container').append("<video autoplay=\"autoplay\" class=\"gloVideo\"  loop=\"loop\" muted style=\"min-width: calc(100% - 50px); max-width: calc(100% - 50px); position: absolute; left: 25px; right: 0; top: 15px; bottom: 0; z-index: -1; height: 100%; object-fit: fill;\">\n            <source src=\"".concat($courseJson.globalSettings.filePath, "\"></source>\n             </video>"));
    }

    var css = formDataToStyle('Editor');
    $('head').append(css);
  }

  if (pageType === 'Preview') {
    if ($courseJson.globalSettings.bg_effect == 'Color') {
      var css = formDataToStyle(pageType);
      $('#previewFrame').contents().find("head").append(css);
    } else if ($courseJson.globalSettings.bg_effect == 'Image') {
      var css = formDataToStyle(pageType);
      $('#previewFrame').contents().find("head").append(css);
    } else if ($courseJson.globalSettings.bg_effect == 'Video') {
      $('body > main').append("<video autoplay=\"autoplay\" loop=\"loop\" muted style=\"min-width: 100%; position: absolute; left: 0px; right: 0; top: 0px; bottom: 0; z-index: -1; height: 100%; object-fit: fill;\">\n            <source src=\"".concat($courseJson.globalSettings.filePath, "\"></source>\n             </video>"));
      var css = formDataToStyle(pageType);
      $('#previewFrame').contents().find("head").append(css);
    }
  }

  if (pageType === 'Package' || pageType === 'Scorm') {
    var selector, pathPrefix;

    if ($courseJson.globalSettings.bg_effect == 'Color') {
      var css = formDataToStyle(pageType);
      $("head").append(css);
    } else if ($courseJson.globalSettings.bg_effect == 'Image') {
      var css = formDataToStyle(pageType);
      $("head").append(css);
    } else if (pageType === 'Package' && $courseJson.globalSettings.bg_effect == 'Video') {
      selector = "main";
      pathPrefix = "";
    } else if (pageType === 'Scorm' && $courseJson.globalSettings.bg_effect == 'Video') {
      selector = ".package_container";
      pathPrefix = ".";
    }

    if (pageType === 'Scorm' || pageType === 'Package') {
      $(selector).append("<video autoplay=\"autoplay\" loop=\"loop\" muted style=\"width:100%;height:100%; position: absolute; left: 0px; right: 0; top: 0px; bottom: 0; z-index: -1; object-fit: fill;\">\n            <source src=\"".concat(pathPrefix + $courseJson.globalSettings.filePath, "\"></source>\n           </video>"));
      var css = formDataToStyle(pageType);
      $("head").append(css);
    }
  }

  if (pageType === 'reset') {
    var css = formDataToStyle(pageType);
    $("head").append(css);
    savePackage("auto");
    setTimeout(function () {
      location.reload();
    }, 500);
  }
}

function openGlobalSetting() {
  
  $('.sidebar-global-setting-wrapper').addClass("open").removeClass("close");
  $(".sidebar-global-setting-wrapper .global_form").html(getGlobalForm());
   // colorpicker
   $('#primaryColor').spectrum(getColorPickerForSpectrum($courseJson.globalSettings.primary_color));

   $('#buttonHoverColor').spectrum(getColorPickerForSpectrum($courseJson.globalSettings.button_hover_color));

   $('#buttonBorderColor').spectrum(getColorPickerForSpectrum($courseJson.globalSettings.button_border_color));

   $('#globalBgColor').spectrum(getColorPickerForSpectrum($courseJson.globalSettings.bg_color));
  
  $("#imageTypeSelect option[value=\"".concat($courseJson.globalSettings.image_type, "\"]")).attr("selected", "selected");
  $("#hiFontFamily option[value=\"".concat($courseJson.globalSettings.h1_font_family, "\"]")).attr("selected", "selected");
  $("#textFontFamily option[value=\"".concat($courseJson.globalSettings.text_font_family, "\"]")).attr("selected", "selected");

}

function CloseGlobalSettingPanel() {
  $('.sidebar-global-setting-wrapper').removeClass("open").addClass("close");
} // formdata to json


function formDataToJson(formData) {
  var object = {};
  formData.forEach(function (value, key) {
    object[key] = value;
  });
  return object;
}

function updateGlobalSettingNew(ev, pageType) {
  $('#loader').show();
  var formData = new FormData(document.getElementById('globalForm'));
  $courseJson.globalSettings = formDataToJson(formData);
  $courseJson.globalSettings.is_btn_setting_changed = "true";
  $courseJson.globalSettings.custom_setting_widgets = [];
  var isSettingsApplied = false;

  if ($('#colorChecked').is(":checked")) {
    $('#loader').show();
    isSettingsApplied = true;
    $(".gloVideo").remove();
    var css = formDataToStyle('Editor');
    $('head').append(css);
    savePackage("auto");
    $(".globalForm").find("#applyGlobalSetting").addClass("disabled");
    reloadSecond();
  } else {
    // image and video uploaded
    $('#loader').show();
    isSettingsApplied = true;
    axios.post(appUrl + '/bgimage', formData, {
      headers: {
        "course_path": $courseJson.courseDirPath,
        "token": localStorage.getItem('token')
      }
    }).then(function (result) {
      if (result.data.status == 'Success') {
        var last_dot = result.data.data.lastIndexOf('.');
        $courseJson.globalSettings.extantion = result.data.data.slice(last_dot + 1).toLowerCase();
        $courseJson.globalSettings.filePath = $courseJson.courseDirPath + result.data.data;

        if ($courseJson.globalSettings.extantion == 'mp4') {
          var css = formDataToStyle('Editor');
          $('.editor-container').append("<video autoplay=\"autoplay\" id=\"videoType\" class=\"gloVideo\" loop=\"loop\" muted style=\"min-width: calc(100% - 50px); max-width: calc(100% - 50px); position: absolute; left: 25px; right: 0; top: 15px; bottom: 0; z-index: -1; height: 100%; object-fit: fill;\">\n                      <source src=\"".concat($courseJson.globalSettings.filePath, "\"></source>\n                       </video>"));
          $('head').append(css);
          savePackage("auto");
          $('.sidebar-global-setting-wrapper').removeClass("open").addClass("close");
        } else {
          $(".gloVideo").remove();
          var css = formDataToStyle('Editor');
          $('head').append(css);
          savePackage("auto");
        }
      }

      reloadSecond();
    }, function (data) {
      alert('Some Problem Occurred');
    });
  }

  function reloadSecond() {
    if (isSettingsApplied) {
      setTimeout(function () {
        location.reload();
      }, 750);
    }
  }
} // preview Parallex


function globalParallax() {
  if ($courseJson.globalSettings.image_type === 'parallax') {
    $('body > main').css('background', 'none');
    $(".parallax-mirror").show();
    $('body > main').parallax({
      imageSrc: $courseJson.globalSettings.filePath
    });
    jQuery(window).trigger('resize').trigger('scroll');
  } else {
    $(".parallax-mirror").hide();
  }
} //reset global Setting


function resetGlobalSettings(e) {
  $courseJson.globalSettings = Helpers.cloneObject(initialGlobalSettings);
  applyGlobalSettings('reset');
} // create to css


function formDataToStyle(pageType) {
  var parent = "";

  if (pageType === 'Editor') {
    parent = "#editorPage.editor";
    $("#globalsetting_css").remove();
  } else if (pageType === 'Preview') {
    parent = "main";
  } else if (pageType === 'Package' || pageType === 'Scorm') {
    parent = ".package_container";
  }

  var cssString = "<style type='text/css' id=\"globalsetting_css\">";

  if ($courseJson.globalSettings.primary_color || $courseJson.globalSettings.button_border_color) {
    cssString += ".ice_widget button { background-color: ".concat($courseJson.globalSettings.primary_color, "!important;\n        border : 1px solid ").concat($courseJson.globalSettings.button_border_color, "!important;}\n");
  }

  if ($courseJson.globalSettings.button_hover_color) {
    cssString += ".ice_widget .formBtn.yesBtn:hover {background-color : ".concat($courseJson.globalSettings.button_hover_color, "!important;}\n");
  }

  if ($courseJson.globalSettings.h1_font_family) {
    cssString += ".ice_widget h1 {font-family : ".concat($courseJson.globalSettings.h1_font_family, ";}\n");
  }

  if ($courseJson.globalSettings.h1_font_size) {
    cssString += ".ice_widget h1 {font-size : ".concat($courseJson.globalSettings.h1_font_size, " ;}\n");
  }

  if ($courseJson.globalSettings.text_font_family) {
    cssString += ".ice_widget p, .ice_widget div {font-family : ".concat($courseJson.globalSettings.text_font_family, " ;}\n");
  }

  if ($courseJson.globalSettings.text_font_size) {
    cssString += ".ice_widget p, .ice_widget div {font-size : ".concat($courseJson.globalSettings.text_font_size, " ;}\n");
  }

  if ($courseJson.globalSettings.bg_effect == "Color") {
    cssString += "".concat(parent, " { background-color: ").concat($courseJson.globalSettings.bg_color, ";}\n");
  }

  if ($courseJson.globalSettings.bg_effect == 'Image' && (pageType === 'Editor' || pageType === 'Preview' || pageType === 'Package')) {
    cssString += "".concat(parent, " { background-image: \n            url('").concat($courseJson.globalSettings.filePath, "');}\n");
  }

  if ($courseJson.globalSettings.bg_effect == 'Video') {
    cssString += "".concat(parent, " { background-color:  transparent!important ;}\n");
    Helpers.hideParallax();
  }

  if ($courseJson.globalSettings.bg_effect == 'Image' && $courseJson.globalSettings.image_type == 'stretch') {
    cssString += "".concat(parent, " { background-size : cover ;\n            background-position:  top left ;}\n");
    Helpers.hideParallax();
  }

  if ($courseJson.globalSettings.bg_effect == 'Image' && $courseJson.globalSettings.image_type == 'center') {
    cssString += "".concat(parent, " { background-position  : center ;}\n");
    Helpers.hideParallax();
  }

  if ($courseJson.globalSettings.bg_effect == 'Image' && $courseJson.globalSettings.image_type == 'parallax' && pageType === 'Editor') {
    cssString += "".concat(parent, " { background : none ;}\n");
    Helpers.setParallax($courseJson.globalSettings.filePath);
  } // if ($courseJson.globalSettings.bg_effect == 'Image' && $courseJson.globalSettings.image_type == 'parallax' && pageType === 'Preview') {
  //     globalParallax()
  // }


  if ($courseJson.globalSettings.bg_effect == 'Image' && $courseJson.globalSettings.image_type == 'parallax' && (pageType === 'Package' || pageType === 'Scorm')) {
    cssString += "".concat(parent, " { background : none ;\n}");
    globalHandleParallaxPackage();
  }

  if ("".concat($courseJson.globalSettings.bg_effect) == 'Image' && pageType === 'Scorm') {
    cssString += ".package_container { background-image: \n            url('.".concat($courseJson.globalSettings.filePath, "');\n}");
  }

  if ($courseJson.globalSettings.bg_effect == 'Image' && $courseJson.globalSettings.image_type == 'default') {
    cssString += "".concat(parent, " { background-size  : auto };");
    Helpers.hideParallax();
  }

  cssString += "</style>";

  if (pageType === 'reset') {
    $("#globalsetting_css").remove();
    cssString = "<style type='text/css'>";
    cssString += ".ice_widget button { background-color: ".concat($courseJson.globalSettings.primary_color, "!important ;}\n \n         #editorPage { background-color: ").concat($courseJson.globalSettings.bg_color, ";}\n\n        .formBtn.yesBtn:hover:before {background-color : ").concat($courseJson.globalSettings.button_hover_color, ";}\n\n        border : 1px solid ").concat($courseJson.globalSettings.button_border_color, ";}\n");
    cssString += "</style>";
  }

  return cssString;
} // click radio button color image and video


function globalCheckBackgroundImageVideo(e) {
  if ($(e.target).val() == 'Image') {
    $('#globalBg_input').html("<div class=\"form-group backgroundImage col-md-12\">\n\t\t\t\t\t\t\t\t\t\t<label class=\"form-element-label custom-label-box4\">Background image</label>\n                                        <input type=\"file\" name=\"filename\"  id=\"glBgImg\" class=\"form-control form-file-element\" accept=\".jpg,.gif,.png\" \n                                        value =\"".concat($courseJson.globalSettings.filePath, "\"/>\n                                    </div>"));
    $(".imageType").css("display", "block");
  } else if ($(e.target).val() == 'Video') {
    $('#globalBg_input').html("<div class=\"form-group backgroundVideo col-md-12\">\n\t\t\t\t\t\t\t\t\t\t<label class=\"form-element-label custom-label-box4\">Background video</label>\n\t\t\t\t\t\t\t\t\t\t<input type=\"file\" name=\"filename\" id=\"glBgVideo\" class=\"form-control form-file-element\" accept=\".mp4\" />\n                                    </div>");
    $(".imageType").css("display", "none");
  } else {
    $('#globalBg_input').html("<div class=\"form-group backgroundColor col-md-12\">\n        <label class=\"form-element-label custom-label-box4\" style =\"width: 100%;\">Background color</label>\n        <input id=\"globalBgColor\"  type=\"text\" name=\"bg_color\"  class=\"form-control modalInput\" value=\"".concat($courseJson.globalSettings.bg_color, "\" />\n    </div>"));
    $('#globalBgColor').spectrum(getColorPickerForSpectrum("rgb(255, 255, 255)"));
    $(".imageType").css("display", "none");
  }
} // Form


function getGlobalForm() {
  var html = "\n    <form id=\"globalForm\" class=\"form-settings\" onsubmit=\"return false\">\n    <div class=\"modal-body globalSetting\">\n        <div class=\"form-group row\">\n            <div class=\"col-sm-12\">\n                <label class=\"form-element-label custom-label-box4\">Button Primary color</label>\n                <div class=\"btnPrimaryColor\"><input id=\"primaryColor\" type=\"text\" name=\"primary_color\" class=\"form-control modalInput\"\n                    value=\"".concat($courseJson.globalSettings.primary_color, "\" ></div>\n            </div>\n        </div>\n        <div class=\"form-group row\">\n            <div class=\"col-sm-12\">\n                <label class=\"form-element-label custom-label-box4\">Button hover color</label>\n <div class=\"btnHoverColor\"><input id=\"buttonHoverColor\" type=\"text\" name=\"button_hover_color\" class=\"form-control modalInput\"\n                    value=\"").concat($courseJson.globalSettings.button_hover_color, "\" ></div>\n            </div>\n        </div>\n        <div class=\"form-group row\">\n            <div class=\"col-sm-12\">\n                <label class=\"form-element-label custom-label-box4\">Button border color</label>\n   <div class=\"btnBorderColor\"><input id=\"buttonBorderColor\" type=\"text\" name=\"button_border_color\" class=\"form-control modalInput\"\n                    value=\"").concat($courseJson.globalSettings.button_border_color, "\" ></div>\n            </div>\n        </div>\n        <div class=\"form-group row\">\n            <div class=\"col-sm-12\">\n                <label class=\"form-element-label\">Background Type</label>\n                <label class=\"radio-container width-30 custom-label-box4\">Color\n                    <input type=\"radio\" class=\"form-control modalInput\" id=\"colorChecked\" name=\"bg_effect\"\n                        onclick=\"globalCheckBackgroundImageVideo(event)\" value=\"Color\" checked").concat(">\n                    <span class=\"circlemark\"></span>\n                </label>\n                <label class=\"radio-container width-33 custom-label-box4\">Image\n                    <input type=\"radio\" class=\"form-control modalInput\"  name=\"bg_effect\"\n                      id=\"image_effect\"  onclick=\"globalCheckBackgroundImageVideo(event)\" value=\"Image\" ").concat( ">\n                    <span class=\"circlemark\"></span>\n                </label>\n                <label class=\"radio-container width-30 custom-label-box4\">Video\n                    <input type=\"radio\" class=\"form-control modalInput\" name=\"bg_effect\" id=\"video_effect\" \n                        onclick=\"globalCheckBackgroundImageVideo(event)\" value=\"Video\" ").concat( ">\n                    <span class=\"circlemark\"></span>\n                </label>\n            </div>\n        </div>\n        <div id=\"globalBg_input\" class=\"row\">\n             <div class=\"form-group col-md-12  defalutField\">\n                <label class=\"form-element-label custom-label-box4\">Background color</label>\n   <div class=\"backgroundGlobalColor\"><input id=\"globalBgColor\"  type=\"text\" name=\"bg_color\"  class=\"form-control modalInput\" value=\"").concat($courseJson.globalSettings.bg_color, "\" /></div>\n            </div>\n        </div>\n        <div class=\"form-group imageType\" style=\"display:none;\">\n            <label class=\"form-element-label custom-label-box4\">Image type</label>\n            <select id=\"imageTypeSelect\" name=\"image_type\" class=\"form-control modalInput\" value='").concat($courseJson.globalSettings.image_type, "'>\n                <option value=\"\">None</option>\n                <option value=\"default\">Fixed</option>\n                <option value=\"stretch\">Stretch</option>\n                <option value=\"center\" selected>Center</option>\n                <option value=\"repeat\">Repeat</option>\n                <option value=\"parallax\">Parallax</option>\n            </select>\n        </div>\n        <div class=\"form-group px_20 row\">\n            <label class=\"form-element-label custom-label-box4\">H1 font-family</label>\n            <select id=\"hiFontFamily\" name=\"h1_font_family\" class=\"form-control modalInput\" value='").concat($courseJson.globalSettings.h1_font_family, "'>\n                <option value=\"\">None</option>\n                <option value=\"Open Sans\">Open Sans</option>\n                <option value=\"Georgia\">Georgia</option>\n                <option value=\"Times New Roman\">Times New Roman\n                </option>\n                <option value=\"Arial\">Arial</option>\n                <option value=\"Tahoma\">Tahoma</option>\n                <option value=\"Trebuchet MS\">Trebuchet MS</option>\n                <option value=\"Verdana\">Verdana</option>\n            </select>\n        </div>\n        <div class=\"form-group px_20 row\">\n            <label class=\"form-element-label custom-label-box4\">H1 font-Size</label>\n            <input type=\"text\" id=\"globalFontsize\" name=\"h1_font_size\" class=\"form-control modalInput\" autocomplete=\"off\" value='").concat($courseJson.globalSettings.h1_font_size, "' >\n            <span class=\"input-inst-msg\">e.g, 100px</span>\n        </div>\n        <div class=\"form-group px_20 row\">\n            <label class=\"form-element-label custom-label-box4\">Text font-family</label>\n            <select id=\"textFontFamily\" name=\"text_font_family\" class=\"form-control modalInput\" value='").concat($courseJson.globalSettings.text_font_family, "'>\n                <option value=\"\">None</option>\n                <option value=\"Open Sans\">Open Sans</option>\n                <option value=\"Georgia\">Georgia</option>\n                <option value=\"Times New Roman\">Times New Roman\n                </option>\n                <option value=\"Arial\">Arial</option>\n                <option value=\"Tahoma\">Tahoma</option>\n                <option value=\"Trebuchet MS\">Trebuchet MS</option>\n                <option value=\"Verdana\">Verdana</option>\n            </select>\n        </div>\n        <div class=\"form-group px_20 row\">\n        <label class=\"form-element-label custom-label-box4\">Text font-Size</label>\n        <input type=\"text\" id=\"globalFontsizeText\" name=\"text_font_size\" class=\"form-control modalInput form-element\" autocomplete=\"off\" value='").concat($courseJson.globalSettings.text_font_size, "' >\n        <span class=\"input-inst-msg\">e.g, 100px</span>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-md-6\">\n                <button type=\"submit\" id=\"applyGlobalSetting\" onclick=\"updateGlobalSettingNew(event)\" class=\"yesBtn modalBtn form-control mt-3\">Apply</button>\n            </div>\n            <div class=\"col-md-6\">\n                <button type=\"submit\" id=\"resetSetting\" onclick=\"resetGlobalSettings(event)\" class=\"cancelBtn modalBtn form-control mt-3\">Reset</button>\n            </div>\n        </div>\n        \n    \n    \n    </div>\n</form>\n    ");
  return html;
}