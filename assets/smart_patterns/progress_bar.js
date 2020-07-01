function Progress_bar() {
  this.init = function () {
    this.settings = {
      'progressBarType': 'responsive',
      'verticalCenter': false,
      'defaultWidth': 'inherit',
      // 'currentProgress': this.getTotalProgress(),
      'progressFixed': {
        'width': 'inherit',
        'height': 'inherit',
        'alignment': 'left'
      },
      "background": {
        'backgroundColor': '#dbdfdf',
        'progressFillColor': '#17a2b8'
      },
      "border": {
        'borderColor': 'tranparent',
        'borderWidth': '0px',
        'borderRadius': '15px'
      },
      "text": {
        'size': '12px',
        'bold': 'normal',
        'italic': 'italic',
        'color': '#fff'
      }
    };
    this.widget = new Widget(this.settings);
    this.widget.insert(this.settings); //this.updateCourseJson();

    this.widget.openEditPanel(this.getFormHTML());
    this.bindEditFormEvents();
    this.custom();
    return this.widget.getWidgetId();
  };

  this.updateCourseJson = function () {
    $courseJson.index.forEach(function (element) {
      element.isVisited = 'false';
      element.pages.forEach(function (ele) {
        ele.isVisited = 'false';
      });
    });
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
    var html = "\n            <div id=\"currentModalBox\">\n                <form id=\"progress_bar_widget_form\" class=\"form-settings\">\n                    <div class=\"form-group paddlr15 mt30\">\n                        <label class=\"radio-container margin0 form-element-label custom-label-box4\">Responsive\n                            <input type=\"radio\" name=\"progress-bar-type\" value=\"responsive\" class=\"widgetType\"  ".concat(this.settings.progressBarType == 'responsive' ? 'checked' : '', " >\n                            <span class=\"circlemark\"></span>\n                        </label>\n                        <label class=\"radio-container margin0 form-element-label custom-label-box4\">Fixed\n                            <input type=\"radio\" name=\"progress-bar-type\" value=\"fixed\" class=\"widgetType\" ").concat(this.settings.progressBarType == 'fixed' ? 'checked' : '', " >\n                            <span class=\"circlemark\"></span>\n                        </label>\n                    </div>\n                    <!--<div id=\"accordion1\" class=\"advance-setting-accordion\">\n                        <div class=\"card\">\n                            <div class=\"card-header advance_setting_hedaer\" id=\"headingOne\">\n                                <h2 class=\"mb-0\">\n                                    <button type =\"button\" class=\"d-flex  btn btn-link collapsed\" data-toggle=\"collapse\" data-target=\"#progressbar-gallery\" aria-expanded=\"false\" aria-controls=\"collapseOne\">\n                                    Progress Bar Gallery\n                                    </button>\n                                </h2>\n                                <span class=\"advance-accordian-arrow collapsed\" data-toggle=\"collapse\" data-target=\"#collapseimage\" aria-expanded=\"false\" aria-controls=\"collapseOne\"><i class=\"fa fa-angle-down rotate-icon\"></i></span>\n                            </div>\n                            <div id=\"progressbar-gallery\" class=\"collapse\" aria-labelledby=\"headingOne\" data-parent=\"#accordion1\">\n                                <div class=\"card-body advance_setting_body\">\n                                    <p>Select Progres Bar</p>\n                                </div>\n                            </div>\n                        </div>\n                    </div>-->\n                    <div id=\"accordion\" class=\"advance-setting-accordion\">\n                        <div class=\"card\">\n                            <div class=\"card-header advance_setting_hedaer\" id=\"headingOne\">\n                                <h2 class=\"mb-0\">\n                                    <button type =\"button\" class=\"d-flex  btn btn-link collapsed\" data-toggle=\"collapse\" data-target=\"#collapseimage\" aria-expanded=\"false\" aria-controls=\"collapseOne\">\n                                    More Settings \n                                    </button>\n                                </h2>\n                                <span class=\"advance-accordian-arrow collapsed\" data-toggle=\"collapse\" data-target=\"#collapseimage\" aria-expanded=\"false\" aria-controls=\"collapseOne\"><i class=\"fa fa-angle-down rotate-icon\"></i></span>\n                            </div>\n                            <div id=\"collapseimage\" class=\"collapse\" aria-labelledby=\"headingOne\" data-parent=\"#accordion\">\n                                <div class=\"card-body advance_setting_body\">\n                                    <div class=\"if_actual_image\">\n                                        <div class=\"row margin0 collapse-group fixed-option\" id=\"group1\" style=\"display: flex;\">\n                                            <div class=\"col-md-6 pl-0\">\n                                                <label class=\"form-element-label custom-label-box4\">Width</label>\n                                                <input class=\"form-element\" type=\"text\" id=\"progress-bar-width\" name=\"width\" placeholder=\"Width\" value=\"").concat(this.settings.progressFixed['width'], "\">\n                                                <span class=\"input-inst-msg\">e.g, 100px or 50%</span>\n                                            </div>\n                                            <div class=\"col-md-6 px-0\">\n                                                <label class=\"form-element-label custom-label-box4\">Height</label>\n                                                <input class=\"form-element\" type=\"text\" id=\"progress-bar-height\" name=\"height\" placeholder=\"Height\" value=\"").concat(this.settings.progressFixed['height'], "\">\n                                                <span class=\"input-inst-msg\">e.g, 100px or 50%</span>\n                                            </div>\n                                            <div class=\"col-md-12 pl-0\">\n                                                <div class=\"row form-group mt35\">\n                                                    <div class=\"col-md-12\">\n                                                        <label class=\"form-element-label custom-label-box4\">Alignment</label>\n                                                        <div class=\"row margin0\">\n                                                            <label class=\"radio-container width-33 custom-label-box4\">Left\n                                                                <input type=\"radio\"  name=\"alignment\" value=\"left\" ").concat(this.settings.progressFixed['alignment'] == 'left' ? 'checked' : '', ">\n                                                                <span class=\"circlemark\"></span>\n                                                            </label>\n                                                            <label class=\"radio-container width-33 custom-label-box4\">Center\n                                                                <input type=\"radio\"  name=\"alignment\" value=\"center\" ").concat(this.settings.progressFixed['center'] == 'center' ? 'checked' : '', ">\n                                                                <span class=\"circlemark\"></span>\n                                                            </label>\n                                                            <label class=\"radio-container width-30 custom-label-box4\">Right\n                                                                <input type=\"radio\"  name=\"alignment\" value=\"right\" ").concat(this.settings.progressFixed['right'] == 'right' ? 'checked' : '', ">\n                                                                <span class=\"circlemark\"></span>\n                                                            </label>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class=\"row\">\n                                        <div class=\"form-group col-md-12\">\n                                            <label class=\"form-element-label custom-label-box4\">Background color</label>\n                                            <input type=\"text\" id=\"progress-bar-background-color\" class=\"form-control form-file-element color-picker-element\" required name=\"background-color\" value=\"").concat(this.settings.background['backgroundColor'], "\">\n                                        </div>\n                                        <div class=\"form-group col-md-6\">\n                                            <label class=\"form-element-label custom-label-box4\">Progress fill color</label>\n                                            <input type=\"text\" id=\"progress-bar-fill-color\" class=\"form-control form-file-element color-picker-element\" name=\"progress-fill-color\" value=\"").concat(this.settings.background['progressFillColor'], "\">\n                                        </div>\n                                        <div class=\"form-group col-md-6\">\n                                            <label class=\"form-element-label custom-label-box4\">Border color</label>\n                                            <input type=\"text\" id=\"progress-bar-border-color\" class=\"form-control form-file-element color-picker-element\" name=\"border-color\" value=\"").concat(this.settings.border['borderColor'], "\">\n                                        </div>\n                                        <div class=\"form-group col-md-6\">\n                                            <label class=\"form-element-label custom-label-box4\">Border width</label>\n                                            <input type=\"text\" id=\"progress-bar-border-width\" class=\"form-control form-file-element\" name=\"border-width\" value=\"").concat(this.settings.border['borderWidth'], "\">\n                                            <span class=\"input-inst-msg\">e.g, 2px</span>\n                                        </div>\n                                        \n                                        <div class=\"form-group col-md-6\">\n                                            <label class=\"form-element-label custom-label-box4\">Rounded Corner</label>\n                                            <input type=\"text\" id=\"progress-bar-border-radius\" class=\"form-control form-file-element\" name=\"border-radius\" value=\"").concat(this.settings.border['borderRadius'], "\">\n                                            <span class=\"input-inst-msg\">e.g, 10px or 50%</span>\n                                        </div>\n                                        <div class=\"form-group col-md-6\">\n                                            <label class=\"form-element-label custom-label-box4\">Text size</label>\n                                            <input type=\"text\" id=\"progress-bar-text-size\" class=\"form-control form-file-element\" name=\"text-size\" value=\"").concat(this.settings.text['size'], "\">\n                                            <span class=\"input-inst-msg\">e.g, 10px</span>\n                                        </div>\n                                        <div class=\"form-group col-md-6\">\n                                            <label class=\"form-element-label custom-label-box4\">Text Color</label>\n                                            <input type=\"text\" id=\"progress-bar-text-color\" class=\"form-control form-file-element color-picker-element\" name=\"rotation_angle\" value=\"").concat(this.settings.text['color'], "\">\n                                        </div>\n                                        \n                                        <div class=\"form-group col-md-4\">\n                                            <label class=\"form-element-label custom-label-box4\">Bold</label>  \n                                            <label class=\"switch switch-flat\">\n                                                <input class=\"switch-input\" type=\"checkbox\" id=\"progress-bar-text-bold\" value=\"yes\" ").concat(this.settings.text['bold'] === 'bold' ? 'checked' : '', "/>\n                                                <span class=\"switch-label\"  data-on=\"Yes\" data-off=\"No\"></span> \n                                                <span class=\"switch-handle\"></span> \n                                            </label>\n                                        </div>\n                                        <div class=\"col-md-4\">\n                                            <label class=\"form-element-label custom-label-box4\">Italic</label>\n                                            <label class=\"switch switch-flat\">\n                                                <input class=\"switch-input\" type=\"checkbox\" id=\"progress-bar-text-italic\" value=\"yes\" ").concat(this.settings.text['italic'] === 'italic' ? 'checked' : '', "/>\n                                                <span class=\"switch-label\" data-on=\"Yes\" data-off=\"No\"></span> \n                                                <span class=\"switch-handle\"></span> \n                                            </label>\n                                        </div>\n                                        <div class=\"col-md-4\">\n                                            <label class=\"form-element-label custom-label-box4\"><span><i class=\"fa fa-arrows-v\"></i></span> center</label>\n                                            <label class=\"switch switch-flat\">\n                                                <input class=\"switch-input\" type=\"checkbox\" id=\"progress-bar-vertical-center\" value=\"yes\" ").concat(this.settings.verticalCenter ? 'checked' : '', "/>\n                                                <span class=\"switch-label\" data-on=\"Yes\" data-off=\"No\"></span> \n                                                <span class=\"switch-handle\"></span> \n                                            </label>\n                                        </div>\n                                        \n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"form-group text-right px-3\">\n                        <button type=\"submit\" class=\"formBtn yesBtn\">Apply</button>\n                    </div>\n                </form>\n            </div>              \n        ");
    return html;
  };
  
  this.initColorPicker = function () {
    var that = this;
    var selectElement = document.querySelectorAll('.color-picker-element');
    var groupOfSelectedColor = [that.settings.background['backgroundColor'],that.settings.background['progressFillColor'],that.settings.border['borderColor'],that.settings.text['color']];
    var colorPalette = [
      ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
      ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
      ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
      ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
      ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
      ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
      ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
      ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
    ];
    selectElement.forEach(function (value, index) {
      return $(value).spectrum({
        color: groupOfSelectedColor[index],
        showInput: true,
        showInitial: true,
        showPalette: true,
        showAlpha: true,
        preferredFormat: "rgb",
        togglePaletteMoreText: 'More Colors...',
        togglePaletteLessText: 'less',
        showPaletteOnly: true,
        togglePaletteOnly: true,
        palette: colorPalette
    });
    });
  }; // this.getTotalProgress = function(){
  //     debugger
  //     let totalPages=0,currentPage =0;
  //     let courseClone = JSON.parse(JSON.stringify($courseJson));
  //     let totalChapter = courseClone['index'].length;
  //     courseClone['index'].forEach((value,index)=>{
  //         totalPages += value.pages.length;
  //         currentPage = Object.keys(value.pages).filter(k=>value.pages[k].active === true);
  //     });
  // }


  this.bindEditFormEvents = function () {
    var that = this;
    widgetSettingPanelOpenSetIcon();
    that.initColorPicker();
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

    if (this.settings.progressBarType == 'fixed') {
      $(".if_actual_image").show();
      $('#width,#height').prop('required', 'required');
    } else {
      $(".if_actual_image").hide();
      $('#width,#height').removeAttr('required');
    }

    $("#progress_bar_widget_form").on("submit", function (e) {
      e.preventDefault();
      debugger
      that.settings.progressBarType = document.getElementsByName('progress-bar-type')[0].checked ? 'responsive' : 'fixed';

      if (that.settings.progressBarType === 'fixed') {
        that.settings.progressFixed['width'] = document.getElementById('progress-bar-width').value;
        that.settings.progressFixed['height'] = document.getElementById('progress-bar-height').value;
        that.settings.progressFixed['alignment'] = document.getElementsByName('alignment')[0].checked ? 'left' : document.getElementsByName('alignment')[1].checked ? 'center' : 'right';
      }

      that.settings.background['backgroundColor'] = document.getElementById('progress-bar-background-color').value;
      that.settings.background['progressFillColor'] = document.getElementById('progress-bar-fill-color').value;
      that.settings.border['borderColor'] = document.getElementById('progress-bar-border-color').value;
      that.settings.border['borderWidth'] = document.getElementById('progress-bar-border-width').value;
      that.settings.border['borderRadius'] = document.getElementById('progress-bar-border-radius').value;
      that.settings.text['size'] = document.getElementById('progress-bar-text-size').value;
      that.settings.text['bold'] = document.getElementById('progress-bar-text-bold').checked ? 'bold' : 'normal';
      that.settings.text['italic'] = document.getElementById('progress-bar-text-italic').checked ? 'italic' : 'normal';
      that.settings.text['color'] = document.getElementById('progress-bar-text-color').value;
      that.settings.verticalCenter = document.getElementById('progress-bar-vertical-center').checked ? true : false;
      that.widget.reMount(that.settings);
    });
  };
}

Progress_bar.prototype = Object.create(MainWidget.prototype);