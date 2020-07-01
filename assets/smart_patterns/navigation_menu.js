"use strict";

function Navigation_menu() {
  this.init = function () {
    this.settings = {
      "selctedType": "right",
      "contentType": "pages",
      "forceNavigation": false,
      "navigationAlign": "left",
      "navigationColor": "rgb(0,0,0)",
      "iconColor": "rgb(255,255,255)",
      "dropmenuColor": "rgba(97, 95, 95, 0.65)",
      "dropmenuHover": "rgba(97, 95, 95, 0.84)",
      "dropsubmenuColor": "rgba(97, 95, 95, 0.65)",
      "dropsubmenuHover": "rgba(97, 95, 95, 0.84)"
    };
    this.widget = new Widget(this.settings);
    this.widget.insert(this.settings);
    this.widget.openEditPanel(this.getFormHTML());
    this.bindEditFormEvents();
    return this.widget.getWidgetId();
  };

  this.edit = function () {
    this.widget.openEditPanel(this.getFormHTML());
    this.bindEditFormEvents();
  };

  this.getFormHTML = function () {
    var that = this;
    var html = "\n        <div id=\"currentModalBox\">\n            <form id=\"navigation_form\" class=\"form-settings\" >\n                <div class=\"form-group p_20\">\n                    <label class=\"form-element-label column-setting-heading\">Navigation Type</label>\n                    <input type=\"radio\" name=\"submenuContent\" value=\"pages\" checked><label class=\"fs_13 ml_5_mr_20\">Chapter with pages</label><br>\n                    <input type=\"radio\" name=\"submenuContent\" value=\"chapters\"><label class=\"fs_13 ml_5_mr_20\">Chapters only</label><br>\n                </div>\n\n                <div class=\"form-group px_20 mt20\">\n                    <label class=\"form-element-label column-setting-heading\">Navigation Submenu Alignment</label>\n                    <input type=\"radio\" name=\"submenuOption\" value=\"right\" checked><label class=\"fs_13 ml_5_mr_20\"> Right</label>\n                    <input type=\"radio\" name=\"submenuOption\" value=\"left\"><label class=\"fs_13 ml_5_mr_20\"> Left</label>\n                    <input type=\"radio\" name=\"submenuOption\" value=\"acc\"><label class=\"fs_13 ml_5_mr_20\"> Accordion</label>\n                </div>\n               \n                <div class=\"form-group px_20 mt20\">\n                    <label class=\"form-element-label column-setting-heading\"><span></i></span> Force Navigation(Chapters)</label>\n                    <label class=\"switch switch-flat\">\n                        <input class=\"switch-input\" type=\"checkbox\" id=\"forcenavigation_navigationMenu\" value=\"yes\" ".concat(this.settings.forceNavigation ? 'checked' : ' ', "/>\n                        <span class=\"switch-label\" data-on=\"Yes\" data-off=\"No\"></span> \n                        <span class=\"switch-handle\"></span> \n                    </label>\n                </div>\n                <div class=\"form-group px_20\">\n                    <label class=\"form-element-label column-setting-heading\">Alignment:</label>\n                    <select class=\"form-control form-file-element button-align\" id=\"navigation_align\">\n                        <option value=\"left\">Left Align</option>\n                        <option value=\"center\">Center Align</option>\n                        <option value=\"right\">Right Align</option>\n                    </select>\n                </div>\n\n                \n                <div id=\"accordion2\" class=\"advance-setting-accordion\">\n                <div class=\"card\">\n                    <div class=\"card-header advance_setting_hedaer\" id=\"heading_One\">\n                        <h2 class=\"mb-0\">\n                            <span class=\"advanceSetting d-flex  btn btn-link collapsed\" data-toggle=\"collapse\" data-target=\"#collapsesettings\" aria-expanded=\"false\" aria-controls=\"collapseOne\">\n                            More Settings \n                                <span class=\"advance-accordian-arrow collapsed\" data-toggle=\"collapse\" data-target=\"#collapsesettings\" aria-expanded=\"false\" aria-controls=\"collapseOne\"><i class=\"fa fa-angle-down rotate-icon\"></i></span>\n                            </span>\n                        </h2>\n                      \n                    </div>\n                    <div id=\"collapsesettings\" class=\"collapse\" aria-labelledby=\"heading_One\" data-parent=\"#accordion2\">\n                        <div class=\"card-body advance_setting_body\">    \n                        <div class=\"row\">\n                            <div class=\"col-sm-6\">\n                                <div class=\"form-group\">\n                                    <div class=\"posRel inblockVmiddle\">\n                                        <label class=\"form-element-label custom-label-box4\">Background Color</label>\n       <div class=\"navBGColor\"><input type=\"input\" id=\"navigationbgColor\" class=\"form-control  form-element\" name=\"Background color\" value=\"").concat(that.settings.navigationColor, "\"></div>\n                                    </div>\n                                </div>\n                            </div>  \n                            <div class=\"col-sm-6\">\n                                <div class=\"form-group\">\n                                    <div class=\"posRel inblockVmiddle\">\n                                        <label class=\"form-element-label custom-label-box4\">Icon Color</label>\n         <div class=\"navIconColor\"><input type=\"input\" id=\"navigationiconColor\" class=\"form-control  form-element\" name=\"Icon color\" value=\"").concat(that.settings.iconColor, "\"></div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row mt20\">\n                            <div class=\"col-sm-6\">\n                                <div class=\"form-group\">\n                                    <div class=\"posRel inblockVmiddle\">\n                                        <label class=\"form-element-label custom-label-box4\">Dropdown Menu Color</label>\n             <div class=\"navDropdownColor\"><input type=\"input\" id=\"navigationmenuColor\" class=\"form-control  form-element\" name=\"Icon color\" value=\"").concat(that.settings.dropmenuColor, "\"></div>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"col-sm-6\">\n                                <div class=\"form-group\">\n                                    <div class=\"posRel inblockVmiddle\">\n                                        <label class=\"form-element-label custom-label-box4\">Dropdown Menu Hover</label>\n            <div class=\"navHoverColor\"><input type=\"input\" id=\"navigationmenuHover\" class=\"form-control  form-element\" name=\"Icon color\" value=\"").concat(that.settings.dropmenuHover, "\"></div>\n                                    </div>\n                                </div>\n                            </div>                      \n                        </div>\n                        \n                        <div class=\"row mt20\">\n                            <div class=\"col-sm-6\">\n                                <div class=\"form-group\">\n                                    <div class=\"posRel inblockVmiddle\">\n                                        <label class=\"form-element-label custom-label-box4\">Dropdown Submenu Color</label>\n        <div class=\"navSubmenuColor\"><input type=\"input\" id=\"navigationsubmenuColor\" class=\"form-control  form-element\" name=\"Icon color\" value=\"").concat(that.settings.dropsubmenuColor, "\"></div>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"col-sm-6\">\n                                <div class=\"form-group\">\n                                    <div class=\"posRel inblockVmiddle\">\n                                        <label class=\"form-element-label custom-label-box4\">Dropdown Submenu Hover</label>\n        <div class=\"navSubmenuHoverColor\"><input type=\"input\" id=\"navigationsubmenuHover\" class=\"form-control  form-element\" name=\"Icon color\" value=\"").concat(that.settings.dropsubmenuHover, "\"></div>\n                                    </div>\n                                </div>\n                            </div>                      \n                        </div>\n\n                    </div>    \n                    </div>\n\n                <div class=\"form-group text-right px-3 mt20\">\n\t\t\t\t\t<button type=\"submit\" class=\"formBtn yesBtn\" id=\"apply_navigation\">Apply</button>\n\t\t\t\t</div>\n            </form>\n        </div>\n        ");
    return html;
  };

  this.bindEditFormEvents = function () {
    var that = this; // colorpicker

    $('#navigationbgColor').spectrum(getColorPickerForSpectrum(that.settings.navigationColor));
    $('#navigationiconColor').spectrum(getColorPickerForSpectrum(that.settings.iconColor));
    $('#navigationmenuColor').spectrum(getColorPickerForSpectrum(that.settings.dropmenuColor));
    $('#navigationmenuHover').spectrum(getColorPickerForSpectrum(that.settings.dropmenuHover));
    $('#navigationsubmenuColor').spectrum(getColorPickerForSpectrum(that.settings.dropsubmenuColor));
    $('#navigationsubmenuHover').spectrum(getColorPickerForSpectrum(that.settings.dropsubmenuHover));
    widgetSettingPanelOpenSetIcon();
    $('input[value="pages"]').click(function () {
      $('input[name="submenuOption"]').parent("div").removeClass("dispnone");
    });
    $('input[value="chapters"]').click(function () {
      $('input[name="submenuOption"]').parent("div").addClass("dispnone");
    });
    $("#navigation_form").on("submit", function (e) {
      e.preventDefault();
      var getSelectedType = $('input[name="submenuOption"]:checked').val();
      var getContentType = $('input[name="submenuContent"]:checked').val();
      var getnavigationAlign = $("#navigation_align option:selected").val();
      var getnavigationColor = $('.navBGColor').find('.sp-preview-inner').css("background-color");
      var geticonColor = $('.navIconColor').find('.sp-preview-inner').css("background-color");
      var getdropmenuColor = $('.navDropdownColor').find('.sp-preview-inner').css("background-color");
      var getdropmenuHover = $('.navHoverColor').find('.sp-preview-inner').css("background-color");
      var getdropsubmenuColor = $('.navSubmenuColor').find('.sp-preview-inner').css("background-color");
      var getdropsubmenuHover = $('.navSubmenuHoverColor').find('.sp-preview-inner').css("background-color");

      if (getSelectedType == "" || getSelectedType == undefined) {
        displayNotification("Please Select Submenu Type");
        return;
      } else if (getContentType == "" || getContentType == undefined) {
        displayNotification("Please Select Submenu Type");
        return;
      } else {
        that.settings.selctedType = getSelectedType;
        that.settings.contentType = getContentType;
        that.settings.forceNavigation = document.getElementById('forcenavigation_navigationMenu').checked ? true : false;
        that.settings.navigationAlign = getnavigationAlign;
        that.settings.navigationColor = getnavigationColor;
        that.settings.iconColor = geticonColor;
        that.settings.dropmenuColor = getdropmenuColor;
        that.settings.dropmenuHover = getdropmenuHover;
        that.settings.dropsubmenuColor = getdropsubmenuColor;
        that.settings.dropsubmenuHover = getdropsubmenuHover;
        $(".navbarDropdown").css({
          "background-color": getnavigationColor,
          "color": geticonColor
        });
        $(".navigation-widget .dropdown").css("text-align", getnavigationAlign);
        $(".accordian li.dropdown-submenu").css("background-color", getdropmenuColor);
        $(".accordian li.dropdown-submenu").hover(function () {
          $(this).css("background-color", getdropmenuHover);
        }, function () {
          $(this).css({
            "background-color": getdropmenuColor
          });
        });
        $(".dropdown-submenu .dropdown-menu li").hover(function () {
          $(this).css("background-color", getdropsubmenuHover);
        }, function () {
          $(this).css({
            "background-color": getdropsubmenuColor
          });
        });
        displayNotification("Submitted successfully");
      }
    });
  };
}

Navigation_menu.prototype = Object.create(MainWidget.prototype);