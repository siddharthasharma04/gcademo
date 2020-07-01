"use strict";

function Button_widget3() {
  this.init = function () {
    this.settings = {
      "selectvalue": "",
      "url": "",
      "specifichapter": "",
      "specifipage": "",
      "name": "Sample Button",
      "nextval": "",
      "prevval": "",
      "specifichapterid": "",
      "align": "center",
      "target": "",
      "specificwidget": "",
      "popuptitle": "",
      "popupcontent": "",
      "selectbox": "",
      "specifichapterpopup": "",
      "specifipagepopup": "",
      "specifichapteridpopup": "",
      "buttonColor": "#6A6C6D",
      "buttonColorHover": "#bebfbf",
      "buttonColorActive": "#ff0000",
      "buttonBorder": "#3a3a3a",
      "borderStyle": "solid",
      "buttonWidth": "auto",
      "buttonHeight": "auto",
      "buttonRadius": "0",
      "borderWidth": "1",
      "horizontalDistance": "0",
      "verticalDistance": "5",
      "spreaddistance": "-5",
      "isBtnConfigured": 'false',
      "buttonShap": "rectangle button",
      "buttonState": "hover"
    };
    this.widget = new Widget(this.settings);
    this.widget.insert(this.settings);
    this.original_Btn_color = this.settings.buttonColor;
    this.original_Btn_hover_color = this.settings.buttonColorHover;
    this.original_border_color = this.settings.buttonBorder;
    this.widget.openEditPanel(this.getFormHTML());
    this.bindAddFormEvents();
    return this.widget.getWidgetId();
  };

  this.edit = function () {
    this.widget.openEditPanel(this.getFormHTML());
    this.bindEditFormEvents();
  };

  this.getFormHTML = function () {
    var that = this;
    var html = "\n            <div class=\"\">\n                <div id=\"currentModalBox\">\n                    <form id=\"button_widget_form\" class=\"form-settings button_modal button_widget_form\">\n                        <div class=\"form-group p_20\">\n                            <label class=\"form-element-label custom-label-box4\">Button Label:</label>\n                            <div contenteditable=\"true\" id=\"buttonName\" type=\"text\" class=\"h-auto form-control form-file-element buttonName\" value=\"\" required>".concat(that.settings.name, "\n                            </div>\n                        </div>\n                        <div class=\"form-group px_20 mt20\">\n                            <label class=\"form-element-label custom-label-box4\">Alignment:</label>\n                            <select class=\"form-control form-file-element button-align\" id=\"button_align\" value=\"").concat(that.settings.align, "\">\n                                <option value=\"left\">Left</option>\n                                <option value=\"center\" selected>Center</option>\n                                <option value=\"right\">Right</option>\n                                <option value=\"vertical center\">Vertical Center</option>\n                            </select>\n                        </div>\n                        <div class=\"form-group px_20 mt20\">\n                            <label class=\"form-element-label custom-label-box4\">Link to<span style=\"color:#FF0000\">*</span></label>\n                                <select class=\"form-control form-file-element selectbox\" id=\"button_select\" value=\"").concat(that.settings.selectvalue, "\">\n                                    <option value=\"\">Select</option>\n                                    <option value=\"externalurl\">External URL</option>\n                                    <option value=\"nextpage\">Next Page</option>\n                                    <option value=\"prevpage\">Previous Page</option>\n                                    <option value=\"specificpage\">Specific Page</option>\n                                    <option value=\"specificwidget\">Specific Widget</option>\n                                    <option value=\"popup\">Pop-up</option>\n                                </select>\n                        </div>\n                        <div class=\"form-group px-3 outputhtml\">\n                        </div>\n                        <div class=\"form-group px_20 mt20\">\n                            <label class=\"form-element-label custom-label-box4\">Button Shape:</label>\n                                <select class=\"form-control form-file-element buttonShap\" id=\"buttonShap\" value=\"").concat(that.settings.buttonShap, "\">\n                                    <option value=\"rectangle button\">Rectangle Button</option>\n                                    <option value=\"square button\">Square Button</option>\n                                    <option value=\"circle button\">Circle Button</option>\n                                </select>\n                        </div>\n                        <div id=\"accordion2\" class=\"advance-setting-accordion\">\n                        <div class=\"card\">\n                            <div class=\"card-header advance_setting_hedaer\" id=\"heading_One\">\n                                <h2 class=\"mb-0\">\n                                    <span class=\"advanceSetting d-flex  btn btn-link collapsed\" data-toggle=\"collapse\" data-target=\"#collapsesettings\" aria-expanded=\"false\" aria-controls=\"collapseOne\">\n                                    More Settings \n                                    </span>\n                                </h2>\n                                <span class=\"advance-accordian-arrow collapsed\" data-toggle=\"collapse\" data-target=\"#collapsesettings\" aria-expanded=\"false\" aria-controls=\"collapseOne\"><i class=\"fa fa-angle-down rotate-icon\"></i></span>\n                            </div>\n                            <div id=\"collapsesettings\" class=\"collapse\" aria-labelledby=\"heading_One\" data-parent=\"#accordion2\">\n                                <div class=\"card-body advance_setting_body\">\n                                 <div class=\"row\">\n                                    <div class=\"col-sm-6\">\n                                        <div class=\"mt10 mb15\">\n                                            <label class=\"form-element-label fs11 custom-label-box4\">Button Width</label>\n                                            <input class=\"form-element btnWidth\" type=\"text\" id=\"buttonWidth\" name=\"button width\" placeholder=\"Width\" autocomplete=\"off\" value=\"").concat(that.settings.buttonWidth, "\">\n                                            <span class=\"inputbtn-inst-msg\">e.g, 100px or 50%</span>\n                                        </div>\n                                    </div>\n                                    <div class=\"col-sm-6 buttonheightHideShow\">\n                                        <div class=\"mt10 mb15\">\n                                            <label class=\"form-element-label fs11 custom-label-box4\">Button Height</label>\n                                            <input type=\"text\" class=\"form-element btnHeight\" id=\"buttonHeight\" name=\"button height\" placeholder=\"Height\" autocomplete=\"off\" value=\"").concat(that.settings.buttonHeight, "\"> \n                                            <span class=\"inputbtn-inst-msg\">e.g, 100px or 50%</span>\n                                        </div>\n                                    </div>  \n                                 </div>  \n                                    <div class=\"row\">\n                                        <div class=\"col-md-12\">\n                                            <label class=\"form-element-label column-setting-heading\">Button Color Style</label>\n                                        </div>\n                                    </div>\n                                    <div class=\"row\">\n                                        <div class=\"col-sm-6\">\n                                            <div class=\"form-group btnColorSpectrum\">\n                                                <label class=\"form-element-label custom-label-box4\">Button Color</label>\n                                                <input type=\"text\" id=\"btnColor\" class=\"form-control  form-element\"  name=\"btn-color\" value=\"\">\n                                            </div>\n                                        </div>\n                                        <div class=\"col-sm-6\">\n                                            <div class=\"form-group btnHoverColorSpectrum\">\n                                                <label class=\"form-element-label custom-label-box4\"><span class=\"hoverColor\">Hover Color</span>\n                                                <span class=\"activeColor\" style=\"display:none;\">Active Color</span>\n                                                </label>\n                                                <input type=\"text\" id=\"btnHoverColor\" class=\"form-control  form-element\"    name=\"btn-color\" value=\"\">\n                                            </div>\n                                        </div>\n                                     </div>     \n                                 <div class=\"row\">\n                                    <div class=\"col-md-12\">\n                                        <label class=\"form-element-label column-setting-heading\">Border Style</label>\n                                    </div>\n                                </div>\n                                 <div class=\"row\">\n                                        <div class=\"col-sm-6\">\n                                            <div class=\"form-group\">\n                                                <div class=\"borderColorSpectrum\">\n                                                    <label class=\"form-element-label custom-label-box4\">Border Color</label>\n                                                    <input type=\"input\" id=\"btnBorderColor\" class=\"form-control  form-element\" name=\" border color\" value=\"\">\n                                                </div>\n                                            </div>\n                                        </div>\n                                        <div class=\"col-sm-6\">\n                                            <div class=\"form-group\"> \n                                                    <label class=\"form-element-label custom-label-box4\">Border style</label>\n                                                    <select class=\"form-control form-file-element\" id=\"borderstyle\" value=\"").concat(that.settings.borderStyle, "\">\n                                                    <option value=\"dotted\">dotted</option>\n                                                    <option value=\"dashed\">dashed</option>\n                                                    <option value=\"solid\" selected>solid</option>\n                                                    <option value=\"double\">double</option>\n                                                    <option value=\"groove\">groove</option>\n                                                    <option value=\"ridge\">ridge</option>\n                                                    <option value=\"inset\">inset</option>\n                                                    <option value=\"outset\">outset</option>\n                                                </select>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    <div class=\"row mt20\">\n                                        <div class=\"col-sm-6\">\n                                            <div class=\"form-group\">\n                                                <label class=\"form-element-label custom-label-box4\">Border Width</label>\n                                                <div class=\"radiusSelect\">\n                                                    <select onchange=\"this.nextElementSibling.value=this.value\" class=\"borderWidth\" id=\"borderWidth\" value=\"").concat(that.settings.borderWidth, "\">\n                                                        <option value=\"0\">0</option>\n                                                        <option value=\"1\" selected>1</option>\n                                                        <option value=\"2\">2</option>\n                                                        <option value=\"3\">3</option>\n                                                        <option value=\"4\">4</option>\n                                                        <option value=\"5\">5</option>\n                                                    </select>\n                                                    <input type=\"text\" class=\"btnWidthInputBox\" id=\"btnWidthInputBox\" value=\"").concat(that.settings.borderWidth, "\" />\n                                                </div>\n                                            </div>\n                                        </div>\n                                        <div class=\"col-sm-6\">\n                                            <div class=\"form-group\">\n                                                <label class=\"form-element-label custom-label-box4\">Border Radius</label>\n                                                <div class=\"radiusSelect\">\n                                                    <select  onchange=\"this.nextElementSibling.value=this.value\" class=\"btnBorderRadius\" id=\"btnBorderRadius\" value=\"").concat(that.settings.buttonRadius, "\">\n                                                    <option value=\"0\" selected>0</option>\n                                                    <option value=\"1\">1</option>\n                                                    <option value=\"2\">2</option>\n                                                    <option value=\"3\">3</option>\n                                                    <option value=\"4\">4</option>\n                                                    <option value=\"5\">5</option>\n                                                    </select>\n                                                    <input type=\"text\" class=\"radiousInputBox\" id=\"radiousInputBox\" value=\"").concat(that.settings.buttonRadius, "\" />\n                                                </div>\n                                            </div> \n                                        </div>\n                                    </div>    \n                                <div class=\"row\">\n                                    <div class=\"col-md-12\">\n                                        <label class=\"form-element-label column-setting-heading\">Border Shadow Style</label>\n                                    </div>\n                                </div> \n                                <div class=\"row\">\n                                    <div class=\"col-sm-6\">\n                                        <div class=\"form-group\">\n                                            <label class=\"form-element-label custom-label-box4\">Vertical Distance</label>\n                                            <div class=\"radiusSelect\">\n                                                <select onchange=\"this.nextElementSibling.value=this.value\" class=\"verticalDistance\" id=\"verticalDistance\" name=\"vertical Distance\" value=\"").concat(that.settings.verticalDistance, "\">\n                                                    <option value=\"0\">0</option>\n                                                    <option value=\"1\">1</option>\n                                                    <option value=\"2\">2</option>\n                                                    <option value=\"3\">3</option>\n                                                    <option value=\"4\">4</option>\n                                                    <option value=\"5\" selected>5</option>\n                                                </select>\n                                                <input type=\"text\"  class=\"vertiiDisInputBox\" id=\"vertiiDisInputBox\" value=\"").concat(that.settings.verticalDistance, "\" />\n                                            </div>    \n                                        </div>\n                                    </div>\n                                    <div class=\"col-sm-6\">\n                                        <div class=\"form-group\">\n                                            <label class=\"form-element-label custom-label-box4\">Spread Distance</label>\n                                            <div class=\"radiusSelect\">\n                                                <select onchange=\"this.nextElementSibling.value=this.value\" class=\"spreaddistance\" id=\"spreaddistance\" name=\"spread Distance\" value=\"").concat(that.settings.spreaddistance, "\">\n                                                <option value=\"-5\" selected>-5</option>\n                                                <option value=\"-4\">-4</option>\n                                                <option value=\"-3\">-3</option>\n                                                <option value=\"-2\">-2</option>\n                                                <option value=\"-1\">-1</option>\n                                                <option value=\"0\">0</option>\n                                                <option value=\"1\">1</option>\n                                                <option value=\"2\">2</option>\n                                                <option value=\"3\">3</option>\n                                                <option value=\"4\">4</option>\n                                                <option value=\"5\">5</option>\n                                                </select> \n                                                <input type=\"text\"  class=\"spreadiDisInputBox\" id=\"spreadiDisInputBox\" value=\"").concat(that.settings.spreaddistance, "\" />\n                                            </div>\n                                        </div>\n                                    </div>\n                                    </div>\n                                    <div class=\"row mt20\">\n                                        <div class=\"col-sm-12\">\n                                            <div class=\"form-group\">\n                                                <label class=\"form-element-label custom-label-box4\">Horizontal Distance</label>\n                                                <div class=\"radiusSelect\">\n                                                    <select onchange=\"this.nextElementSibling.value=this.value\" class=\"horizontalDistance\" id=\"horizontalDistance\" name=\"horizontal Distance\" value=\"").concat(that.settings.horizontalDistance, "\">\n                                                        <option value=\"0\" selected>0</option>\n                                                        <option value=\"1\">1</option>\n                                                        <option value=\"2\">2</option>\n                                                        <option value=\"3\">3</option>\n                                                        <option value=\"4\">4</option>\n                                                        <option value=\"5\">5</option>\n                                                        <option value=\"6\">6</option>\n                                                    </select>\n                                                    <input type=\"text\"  class=\"horiDisInputBox\" id=\"horiDisInputBox\" value=\"").concat(that.settings.horizontalDistance, "\" />\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </div> \n                               \n                                 \n                                </div>\n                            </div>\n                            </div> \n                        </div>\n                      \n                        <div class=\"form-group px-3\">\n                            <div class=\"button-widget-submit button-margin text-right\">\n                                <button type=\"submit\" class=\"formBtn yesBtn activeButton disabled  float-right\">Apply</button>\n                            </div>\n                        </div>\n                    </form>\n                </div>   \n            </div>           \n        ");
    return html;
  };

  this.bindAddFormEvents = function () {
    var that = this; // colorpicker

    $('#btnBorderColor').spectrum(getColorPickerForSpectrum(that.settings.buttonBorder));
    $('#btnColor').spectrum(getColorPickerForSpectrum(that.settings.buttonColor));
    $('#btnHoverColor').spectrum(getColorPickerForSpectrum(that.settings.buttonColorHover));
    enableCkeditor("buttonName");
    $(".selectbox").change(function () {
      that.settings.selectvalue = $(this).children("option:selected").val();

      if (that.settings.selectvalue == 'externalurl') {
        var externalurlhtml = $("\n                <div class=\"form-group mt20\">\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Insert URL:</label>\n                        <input type=\"text\" class=\"form-control form-file-element externalurlval\" value=\"\" required>\n                    </div>\n                </div>\n                ");
        $('.outputhtml').html($(externalurlhtml).html());
        $('.outputhtml').show();
      } else if (that.settings.selectvalue == 'specificpage') {
        var specifichtml = $("\n                <div class=\"form-group\">\n                   \n                    <div class=\"form-group mt20\">\n                        <label class=\"form-element-label\">Select Chapter:</label>\n                        <select class=\"form-control form-file-element selectbox inputChapter\" required>\n                           <option value=\"\">Select Chapter</option>\n                        </select>\n                    </div>\n\n                    <div class=\"form-group mt20\">\n                        <label class=\"form-element-label\">Select Page:</label>\n                        <select class=\"form-control form-file-element selectbox inputPage\" required>\n                           <option value=\"\">Select Page</option>\n                        </select>\n                    </div>\n                </div>\n                ");
        $(".outputhtml").html($(specifichtml).html());
        $('.outputhtml').show();
      } else if (that.settings.selectvalue == 'nextpage') {
        var nexthtml = $("\n                <div class=\"form-group\">\n                    <input style=\"display:none\" value=\"next\" class=\"nextval\">\n                </div>\n                ");
        $('.outputhtml').html($(nexthtml).html());
        $('.outputhtml').show();
      } else if (that.settings.selectvalue == 'prevpage') {
        var prevhtml = $("\n                <div class=\"form-group\">\n                    <input style=\"display:none\" value=\"previous\" class=\"prevval\">\n                </div>\n                ");
        $(".outputhtml").html($(prevhtml).html());
        $('.outputhtml').show();
      } else if (that.settings.selectvalue == 'specificwidget') {
        var specificwidgethtml = $("\n                    <div class=\"form-group mt20\">\n                        <label class=\"form-element-label\">Select Widget:</label>\n                        <select class=\"form-control form-file-element selectbox inputWidget\" required>\n                           <option value=\"\">Select Widget</option>\n                        </select>\n                    </div>\n\n                ");
        $(".outputhtml").html($(specificwidgethtml).html());
        $('.outputhtml').show();
      } else if (that.settings.selectvalue == 'popup') {
        var popuphtml = $("\n                <div class=\"form-group\">\n                    <div class=\"form-group mt20\">\n                        <label class=\"form-element-label\">Insert Pop-up Title:</label>\n                        <div contenteditable=\"true\" name=\"title\" id=\"popup_title\" class=\"form-control form-file-element popuptitle\" required value=\"".concat(that.settings.popuptitle, "\">").concat(that.settings.popuptitle, "</div>\n                    </div>\n                    <div class=\"form-group mt20\">\n                        <label class=\"form-element-label\">Insert Pop-up Content:</label>\n                        <div contenteditable=\"true\" name=\"title\" id=\"popup_content\" class=\"fw-textarea form-control popupcontent\" required value=\"").concat(that.settings.popupcontent, "\">").concat(that.settings.popupcontent, "</div>\n                    </div>\n\n                    <!--specific chapter/page drop-down -->\n                    <div class=\"mb-2\">\n                        <label class=\"form-element-label\">Select Ok button link below:</label>\n                    </div>\n                    <div class=\"form-group mt20\">\n                        <label class=\"form-element-label\">Select Chapter:</label>\n                        <select class=\"form-control form-file-element selectbox inputChapterpopup\" required>\n                           <option value=\"\">Select Chapter</option>\n                        </select>\n                    </div>\n\n                    <div class=\"form-group mt20\">\n                        <label class=\"form-element-label\">Select Page:</label>\n                        <select class=\"form-control form-file-element selectbox inputPagepopup\" required>\n                           <option value=\"\">Select Page</option>\n                        </select>\n                    </div>\n\n                </div>\n                "));
        $(".outputhtml").html($(popuphtml).html());
        $('.outputhtml').show();
        enableCkeditor("popup_content");
        enableCkeditor("popup_title");
      } else if (that.settings.selectvalue === '') {
        var nonehtml = $("  \n                    <div class=\"button-margin text-right\">\n                        <button type=\"button\" class=\"formBtn yesBtn disabled float-right\">Apply</button>\n                    </div>    \n                ");
        $(".blankselect").html($(nonehtml).html());
        $('.outputhtml').hide();
      }

      if (that.settings.selectvalue == "nextpage" || that.settings.selectvalue == "prevpage") {
        $('.activeButton').removeClass("disabled");
      } else {
        $('.activeButton').addClass("disabled");
      }

      $courseJson.index.forEach(function (chapter, index) {
        // console.log(chapter);
        $(".inputChapter").append("<option value=\"".concat(index, "\">").concat(chapter.name, "</option>"));
        $(".inputChapterpopup").append("<option value=\"".concat(index, "\">").concat(chapter.name, "</option>"));
      });
      $(".inputChapter").on("change", function () {
        var optionSelected = $(this).find("option:selected");
        var valueSelected = optionSelected.val();
        $(".inputPage").empty();
        $courseJson.index[valueSelected].pages.forEach(function (page, index) {
          //$("#inputPage").append(`<option value="${index}">${index.title}</option>`);
          $(".inputPage").append("<option value=\"".concat(page.id, "\">").concat(page.title, "</option>"));
        });
      });
      $(".inputChapterpopup").on("change", function () {
        var optionSelected = $(this).find("option:selected");
        var valueSelected = optionSelected.val();
        $(".inputPagepopup").empty();
        $courseJson.index[valueSelected].pages.forEach(function (page, index) {
          //$("#inputPage").append(`<option value="${index}">${index.title}</option>`);
          $(".inputPagepopup").append("<option value=\"".concat(page.id, "\">").concat(page.title, "</option>"));
        });
      });
      var widget_names = [];
      var widget_id, option_html, widget_index;
      widget_index = 0;
      var count = [],
          widget_label;
      $(".ice_widget").each(function (index) {
        //// console.log( index + ": " + $( this ).text() );
        //widget_id = $(this).attr("id")
        widget_id = $(this).attr("id");
        var widget_name = widgetsJson[$widgets[widget_id].widgetType].label;
        widget_names.push(widget_name);
        if (!count[widget_name]) count[widget_name] = 1;else count[widget_name]++;
        widget_label = widget_name + " " + count[widget_name];
        option_html = "<option value='" + widget_id + "'>" + widget_label + "</option>";
        $(".inputWidget").append(option_html);
      });
    }); // chnage button shap and default set button radius val

    $(".buttonShap").change(function () {
      $(".buttonShap").find("option[value='" + that.settings.buttonShap + "']").removeAttr('selected');
      $("#btnBorderRadius").find("option[value='" + that.settings.buttonRadius + "']").removeAttr('selected');
      that.settings.buttonShap = $(this).children("option:selected").val();

      if (that.settings.buttonShap == "rectangle button") {
        that.settings.buttonRadius = "0";
        that.settings.buttonWidth = "auto";
        that.settings.buttonHeight = "auto";
        $('.buttonheightHideShow').show();
      } else if (that.settings.buttonShap == "circle button") {
        that.settings.buttonRadius = "50";
        that.settings.buttonWidth = "100px";
        $('.buttonheightHideShow').hide();
      } else if (that.settings.buttonShap == "square button") {
        that.settings.buttonRadius = "4";
        that.settings.buttonWidth = "100px";
        $('.buttonheightHideShow').hide();
      }

      $("#buttonShap").find("option[value='" + that.settings.buttonShap + "']").attr("selected", "selected");
      $("#btnBorderRadius").find("option[value='" + that.settings.buttonRadius + "']").attr("selected", "selected");
      document.getElementById("btnBorderRadius").value = that.settings.buttonRadius;
      document.getElementById("radiousInputBox").value = that.settings.buttonRadius;
      document.getElementById("buttonWidth").value = that.settings.buttonWidth;
      document.getElementById("buttonHeight").value = that.settings.buttonHeight;
      $("#btnBorderRadius").attr('value', that.settings.buttonRadius);
      $("#radiousInputBox").attr('value', that.settings.buttonRadius);
      $(".buttonShap").attr('value', that.settings.buttonShap);
      $('#buttonWidth').attr('value', that.settings.buttonWidth);
      $('#buttonHeight').attr('value', that.settings.buttonHeight);
    }); // selcted button radius nd custom radius add

    $(".btnBorderRadius").change(function () {
      $("#btnBorderRadius").find("option[value='" + that.settings.buttonRadius + "']").removeAttr('selected');
      that.settings.buttonRadius = $(this).children("option:selected").val();
      $("#btnBorderRadius").find("option[value='" + that.settings.buttonRadius + "']").attr("selected", "selected");
      $("#btnBorderRadius").attr('value', that.settings.buttonRadius);
      $("#radiousInputBox").attr('value', that.settings.buttonRadius);
      ;
    }); // select button width

    $(".borderWidth").change(function () {
      $("#borderWidth").find("option[value='" + that.settings.buttonWidth + "']").removeAttr('selected');
      that.settings.buttonWidth = $(this).children("option:selected").val();
      $("#btnBorderRadius").find("option[value='" + that.settings.buttonWidth + "']").attr("selected", "selected");
      $("#borderWidth").attr('value', that.settings.buttonWidth);
      $("#btnWidthInputBox").attr('value', that.settings.buttonWidth);
      ;
    }); // select horizontal distance

    $(".horizontalDistance").change(function () {
      $("#horizontalDistance").find("option[value='" + that.settings.horizontalDistance + "']").removeAttr('selected');
      that.settings.horizontalDistance = $(this).children("option:selected").val();
      $("#horizontalDistance").find("option[value='" + that.settings.horizontalDistance + "']").attr("selected", "selected");
      $("#horizontalDistance").attr('value', that.settings.horizontalDistance);
      $("#horiDisInputBox").attr('value', that.settings.horizontalDistance);
      ;
    }); // vartical distance

    $(".spreaddistance").change(function () {
      $("#spreaddistance").find("option[value='" + that.settings.verticalDistance + "']").removeAttr('selected');
      that.settings.verticalDistance = $(this).children("option:selected").val();
      $("#spreaddistance").find("option[value='" + that.settings.verticalDistance + "']").attr("selected", "selected");
      $("#spreaddistance").attr('value', that.settings.verticalDistance);
      $("#vertiiDisInputBox").attr('value', that.settings.verticalDistance);
      ;
    }); // spread distance

    $(".spreaddistance").change(function () {
      $("#spreaddistance").find("option[value='" + that.settings.spreaddistance + "']").removeAttr('selected');
      that.settings.spreaddistance = $(this).children("option:selected").val();
      $("#spreaddistance").find("option[value='" + that.settings.spreaddistance + "']").attr("selected", "selected");
      $("#spreaddistance").attr('value', that.settings.spreaddistance);
      $("#spreadiDisInputBox").attr('value', that.settings.spreaddistance);
      ;
    }); // alignment

    $("#button_align").change(function () {
      $("#button_align").find("option[value='" + that.settings.align + "']").removeAttr('selected');
      that.settings.align = $(this).children("option:selected").val();
      $("#button_align").find("option[value='" + that.settings.align + "']").attr("selected", "selected");
    }); // button shape

    $("#borderstyle").change(function () {
      $("#borderstyle  option[value='" + that.settings.borderStyle + "']").removeAttr('selected');
      that.settings.borderStyle = $(this).children("option:selected").val();
      $("#borderstyle").find("option[value='" + that.settings.borderStyle + "']").attr("selected", "selected");
    });
    /*remove submit button disable code*/

    $(document).on('input', '.externalurlval', function () {
      $('.activeButton').removeClass("disabled");
    });
    $(document).on('change', '.inputChapter', function () {
      $('.activeButton').removeClass("disabled");
    });
    $(document).on('change', '.inputWidget', function () {
      $('.activeButton').removeClass("disabled");
    });
    $(document).on('keypress keyup change cut paste', '.popuptitle', function () {
      $('.activeButton').removeClass("disabled");
    });
    $(".button_widget_form").on("submit", function (e) {
      e.preventDefault();

      if ($("#radiousInputBox").val()) {
        that.settings.buttonRadius = $("#radiousInputBox").val();
        $("#radiousInputBox").attr('value', that.settings.buttonRadius);
        ;
      }

      if ($('.btnWidthInputBox').val()) {
        that.settings.buttonWidth = $("#btnWidthInputBox").val();
        $("#btnWidthInputBox").attr('value', that.settings.buttonWidth);
        ;
      }

      if ($("#horiDisInputBox").val()) {
        that.settings.horizontalDistance = $("#horiDisInputBox").val();
        $("#horiDisInputBox").attr('value', that.settings.horizontalDistance);
        ;
      }

      if ($('.vertiiDisInputBox').val()) {
        that.settings.verticalDistance = $("#vertiiDisInputBox").val();
        $("#vertiiDisInputBox").attr('value', that.settings.verticalDistance);
        ;
      }

      if ($("#spreadiDisInputBox").val()) {
        that.settings.spreaddistance = $("#spreadiDisInputBox").val();
        $("#spreadiDisInputBox").attr('value', that.settings.spreaddistance);
        ;
      }

      that.settings.name = $('.buttonName').html();
      that.settings.align = $('.button-align').val();
      that.settings.selectbox = $('.selectbox').val();
      that.settings.buttonShap = $("#buttonShap").val();
      that.settings.buttonState = $("#buttonState").val();
      that.settings.buttonWidth = $('#buttonWidth').val();
      that.settings.buttonHeight = $('#buttonHeight').val();
      that.settings.buttonBorder = $('.borderColorSpectrum').find('.sp-preview-inner').css("background-color");
      that.settings.borderStyle = $('#borderstyle').val();
      that.settings.borderWidth = $('#btnWidthInputBox').val();
      that.settings.buttonRadius = $("#radiousInputBox").val();
      that.settings.horizontalDistance = $('#horiDisInputBox').val();
      that.settings.verticalDistance = $('#vertiiDisInputBox').val();
      that.settings.spreaddistance = $('#spreadiDisInputBox').val();
      that.settings.buttonColor = $('.btnColorSpectrum').find('.sp-preview-inner').css("background-color");
      that.settings.buttonColorHover = $('.btnHoverColorSpectrum').find('.sp-preview-inner').css("background-color");
      that.settings.buttonColorActive = $('.btnHoverColorSpectrum').find('.sp-preview-inner').css("background-color");

      if (!(that.settings.buttonColor == that.original_Btn_color)) {
        that.settings.isBtnConfigured = "true";
      }

      if (!(that.settings.buttonBorder == that.original_border_color)) {
        that.settings.isBtnConfigured = "true";
      }

      if (!(that.settings.buttonColorHover == that.original_Btn_hover_color)) {
        that.settings.isBtnConfigured = "true";
      }

      if (that.settings.isBtnConfigured == "true") {
        checkandSaveGlobalSettingwidgets(that.widget.id);
      }

      if ($(".externalurlval").val()) {
        that.settings.url = $(".externalurlval").val();
        that.settings.target = "_blank";
        displayNotification("successfully submitted");
      } else if ($(".inputChapter").val() && $(".inputPage").val()) {
        that.settings.specifichapter = $(".inputChapter").val();
        that.settings.specifipage = $(".inputPage").val();
        that.settings.specifichapterid = $courseJson.index[that.settings.specifichapter].id;
      } else if ($(".nextval").val()) {
        that.settings.nextval = $(".nextval").val();
      } else if ($(".prevval").val()) {
        that.settings.prevval = $(".prevval").val();
      } else if ($(".inputWidget").val()) {
        that.settings.specificwidget = $(".inputWidget").val();
      } else if ($(".popuptitle").html()) {
        that.settings.popuptitle = $(".popuptitle").html();
        that.settings.popupcontent = $(".popupcontent").html();
        that.settings.target = "_self";
        /* for specific page */

        that.settings.specifichapterpopup = $(".inputChapterpopup").val();
        that.settings.specifipagepopup = $(".inputPagepopup").val();
        console.log(that.settings.specifichapterpopup + ' - ' + that.settings.specifipagepopup);
        that.settings.specifichapteridpopup = $courseJson.index[that.settings.specifichapterpopup].id;
      }

      that.widget.reMount(that.settings);
    });
  };

  this.bindEditFormEvents = function () {
    var that = this;
    widgetSettingPanelOpenSetIcon();
    $('#btnBorderColor').spectrum(getColorPickerForSpectrum(that.settings.buttonBorder));
    $('#btnColor').spectrum(getColorPickerForSpectrum(that.settings.buttonColor));
    $('#btnHoverColor').spectrum(getColorPickerForSpectrum(that.settings.buttonColorHover));
    enableCkeditor("buttonName");
    $("#button_align  option[value='" + that.settings.align + "']").attr("selected", "selected");
    $("#borderstyle  option[value='" + that.settings.borderStyle + "']").attr("selected", "selected");
    $("#buttonShap").find("option[value='" + that.settings.buttonShap + "']").attr("selected", "selected"); // chnage button shap and default set button radius val

    $(".buttonShap").change(function () {
      $(".buttonShap").find("option[value='" + that.settings.buttonShap + "']").removeAttr('selected');
      $("#btnBorderRadius").find("option[value='" + that.settings.buttonRadius + "']").removeAttr('selected');
      that.settings.buttonShap = $(this).children("option:selected").val();

      if (that.settings.buttonShap == "rectangle button") {
        that.settings.buttonRadius = "0";
        that.settings.buttonWidth = "auto";
        that.settings.buttonHeight = "auto";
        $('.buttonheightHideShow').show();
      } else if (that.settings.buttonShap == "circle button") {
        that.settings.buttonRadius = "50";
        that.settings.buttonWidth = "100px";
        $('.buttonheightHideShow').hide();
      } else if (that.settings.buttonShap == "square button") {
        that.settings.buttonRadius = "4";
        that.settings.buttonWidth = "100px";
        $('.buttonheightHideShow').hide();
      }

      $("#buttonShap").find("option[value='" + that.settings.buttonShap + "']").attr("selected", "selected");
      $("#btnBorderRadius").find("option[value='" + that.settings.buttonRadius + "']").attr("selected", "selected");
      document.getElementById("btnBorderRadius").value = that.settings.buttonRadius;
      document.getElementById("radiousInputBox").value = that.settings.buttonRadius;
      document.getElementById("buttonWidth").value = that.settings.buttonWidth;
      document.getElementById("buttonHeight").value = that.settings.buttonHeight;
      $("#btnBorderRadius").attr('value', that.settings.buttonRadius);
      $("#radiousInputBox").attr('value', that.settings.buttonRadius);
      $(".buttonShap").attr('value', that.settings.buttonShap);
      $('#buttonWidth').attr('value', that.settings.buttonWidth);
      $('#buttonHeight').attr('value', that.settings.buttonHeight);
    }); // selcted button radius nd custom radius add

    $(".btnBorderRadius").change(function () {
      $("#btnBorderRadius").find("option[value='" + that.settings.buttonRadius + "']").removeAttr('selected');
      that.settings.buttonRadius = $(this).children("option:selected").val();
      $("#btnBorderRadius").find("option[value='" + that.settings.buttonRadius + "']").attr("selected", "selected");
      $("#btnBorderRadius").attr('value', that.settings.buttonRadius);
      $("#radiousInputBox").attr('value', that.settings.buttonRadius);
      ;
    }); // select button width

    $(".borderWidth").change(function () {
      $("#borderWidth").find("option[value='" + that.settings.buttonWidth + "']").removeAttr('selected');
      that.settings.buttonWidth = $(this).children("option:selected").val();
      $("#btnBorderRadius").find("option[value='" + that.settings.buttonWidth + "']").attr("selected", "selected");
      $("#borderWidth").attr('value', that.settings.buttonWidth);
      $("#btnWidthInputBox").attr('value', that.settings.buttonWidth);
      ;
    }); // select horizontal distance

    $(".horizontalDistance").change(function () {
      $("#horizontalDistance").find("option[value='" + that.settings.horizontalDistance + "']").removeAttr('selected');
      that.settings.horizontalDistance = $(this).children("option:selected").val();
      $("#horizontalDistance").find("option[value='" + that.settings.horizontalDistance + "']").attr("selected", "selected");
      $("#horizontalDistance").attr('value', that.settings.horizontalDistance);
      $("#horiDisInputBox").attr('value', that.settings.horizontalDistance);
      ;
    }); // vartical distance

    $(".spreaddistance").change(function () {
      $("#spreaddistance").find("option[value='" + that.settings.verticalDistance + "']").removeAttr('selected');
      that.settings.verticalDistance = $(this).children("option:selected").val();
      $("#spreaddistance").find("option[value='" + that.settings.verticalDistance + "']").attr("selected", "selected");
      $("#spreaddistance").attr('value', that.settings.verticalDistance);
      $("#vertiiDisInputBox").attr('value', that.settings.verticalDistance);
      ;
    }); // spread distance

    $(".spreaddistance").change(function () {
      $("#spreaddistance").find("option[value='" + that.settings.spreaddistance + "']").removeAttr('selected');
      that.settings.spreaddistance = $(this).children("option:selected").val();
      $("#spreaddistance").find("option[value='" + that.settings.spreaddistance + "']").attr("selected", "selected");
      $("#spreaddistance").attr('value', that.settings.spreaddistance);
      $("#spreadiDisInputBox").attr('value', that.settings.spreaddistance);
      ;
    }); // alignment

    $("#button_align").change(function () {
      $("#button_align").find("option[value='" + that.settings.align + "']").removeAttr('selected');
      that.settings.align = $(this).children("option:selected").val();
      $("#button_align").find("option[value='" + that.settings.align + "']").attr("selected", "selected");
    }); // button shape

    $("#borderstyle").change(function () {
      $("#borderstyle  option[value='" + that.settings.borderStyle + "']").removeAttr('selected');
      that.settings.borderStyle = $(this).children("option:selected").val();
      $("#borderstyle").find("option[value='" + that.settings.borderStyle + "']").attr("selected", "selected");
    });
    $(".selectbox").change(function () {
      that.settings.selectvalue = $(this).children("option:selected").val();

      if (that.settings.selectvalue == 'externalurl') {
        var externalurlhtml = $("\n                <div class=\"form-group mt20\">\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Insert URL:</label> \n                        <input type=\"text\" class=\"form-control form-file-element externalurlval\" value=\"".concat(that.settings.url, "\" required>\n                    </div>\n                </div>\n                "));
        $(".outputhtml").html($(externalurlhtml).html());
        $('.outputhtml').show();
        $('.activeButton').removeClass("disabled");
      } else if (that.settings.selectvalue == 'specificpage') {
        var specifichtml = $("\n                <div class=\"form-group\">\n                    <div class=\"form-group mt20\">\n                        <label class=\"form-element-label\">Select Chapter:</label>\n                        <select class=\"form-control form-file-element selectbox inputChapter\" required>\n                            <option value=\"\">Select Chapter</option>\n                        </select>\n                    </div>\n\n                    <div class=\"form-group mt20\">\n                        <label class=\"form-element-label\">Select Page:</label>\n                        <select class=\"form-control form-file-element selectbox inputPage\" required>\n                            <option value=\"\">Select Page</option>\n                        </select>\n                    </div>\n                </div>\n                ");
        $(".outputhtml").html($(specifichtml).html());
        $('.outputhtml').show();
        $('.activeButton').removeClass("disabled");
      } else if (that.settings.selectvalue === 'nextpage') {
        var nexthtml = $("\n                <div class=\"form-group\">\n                    <input style=\"display:none\" value=\"next\" class=\"nextval\">\n                </div>\n                ");
        $(".outputhtml").html($(nexthtml).html());
        $('.outputhtml').show();
        $('.activeButton').removeClass("disabled");
      } else if (that.settings.selectvalue === 'prevpage') {
        var prevhtml = $("\n                <div class=\"form-group\">\n                    <input style=\"display:none\" value=\"previous\" class=\"prevval\">\n                </div>\n                ");
        $(".outputhtml").html($(prevhtml).html());
        $('.outputhtml').show();
        $('.activeButton').removeClass("disabled");
      } else if (that.settings.selectvalue == 'specificwidget') {
        var specificwidgethtml = $("\n                <div class=\"form-group\">\n                    <div class=\"form-group mt20\">\n                        <label class=\"form-element-label\">Select Widget:</label>\n                        <select class=\"form-control form-file-element selectbox inputWidget\" required>\n                           <option value=\"\">Select Widget</option>\n                        </select>\n                    </div>\n                </div>\n                ");
        $(".outputhtml").html($(specificwidgethtml).html());
        $('.outputhtml').show();
        $('.activeButton').removeClass("disabled");
      } else if (that.settings.selectvalue == 'popup') {
        var popuphtml = $("\n                <div class=\"form-group\">\n                    <div class=\"form-group mt20\">\n                        <label class=\"form-element-label\">Insert Pop-up Title:</label>\n                        <div contenteditable=\"true\" name=\"title\" id=\"popup_title\" class=\"form-control form-file-element popuptitle\" required value=\"".concat(that.settings.popuptitle, "\">").concat(that.settings.popuptitle, "</div>\n                    </div>\n                    <div class=\"form-group mt20\">\n                        <label class=\"form-element-label\">Insert Pop-up Content:</label>\n                        <div contenteditable=\"true\" name=\"title\" id=\"popup_content\" class=\"fw-textarea form-control popupcontent\" required value=\"").concat(that.settings.popupcontent, "\">").concat(that.settings.popupcontent, "</div>\n                    </div>\n\n\n                    <!--specific chapter/page drop-down -->\n                    <div class=\"mb-2\">\n                        <label class=\"form-element-label\">Select Ok button link below:</label>\n                    </div>\n                    <div class=\"form-group mt20\">\n                        <label class=\"form-element-label\">Select Chapter:</label>\n                        <select class=\"form-control form-file-element selectbox inputChapterpopup\" required>\n                           <option value=\"\">Select Chapter</option>\n                        </select>\n                    </div>\n\n                    <div class=\"form-group mt20\">\n                        <label class=\"form-element-label\">Select Page:</label>\n                        <select class=\"form-control form-file-element selectbox inputPagepopup\" required>\n                           <option value=\"\">Select Page</option>    \n                        </select>\n                    </div>\n\n                </div>\n                "));
        $(".outputhtml").html($(popuphtml).html());
        $('.outputhtml').show();
        $('.activeButton').removeClass("disabled");
        enableCkeditor("popup_content");
        enableCkeditor("popup_title");
      } else if (that.settings.selectvalue === '') {
        var nonehtml = $("  \n                    <div class=\"button-margin text-right\">\n                        <button type=\"button\" class=\"formBtn yesBtn disabled float-right\">Apply</button>\n                    </div>    \n                ");
        $(".blankselect").html($(nonehtml).html());
        $('.outputhtml').hide();
      }

      if (that.settings.selectbox == "nextpage" || that.settings.selectbox == "prevpage") {
        $('.activeButton').removeClass("disabled");
      }

      $(".inputChapter").empty();
      $(".inputChapterpopup").empty();
      $courseJson.index.forEach(function (chapter, index) {
        //$(specifichtml).find('#inputChapter').append(`<option value="val">options</option>`);
        $(".inputChapter").append("<option>Select Chapter</option>");
        $(".inputChapter").append("<option value=\"".concat(index, "\">").concat(chapter.name, "</option>"));
        $(".inputChapterpopup").append("<option>Select Chapter</option>");
        $(".inputChapterpopup").append("<option value=\"".concat(index, "\">").concat(chapter.name, "</option>"));
      });
      $(".inputChapter").on("change", function () {
        var optionSelected = $(this).find("option:selected");
        var valueSelected = optionSelected.val();
        $(".inputPage").empty();
        $courseJson.index[valueSelected].pages.forEach(function (page, index) {
          //$("#inputPage").append(`<option value="${index}">${index.title}</option>`);
          $(".inputPage").append("<option value=\"".concat(page.id, "\">").concat(page.title, "</option>"));
        });
      });
      $(".inputChapterpopup").on("change", function () {
        var optionSelected = $(this).find("option:selected");
        var valueSelected = optionSelected.val();
        $(".inputPagepopup").empty();
        $courseJson.index[valueSelected].pages.forEach(function (page, index) {
          //$("#inputPage").append(`<option value="${index}">${index.title}</option>`);
          $(".inputPagepopup").append("<option value=\"".concat(page.id, "\">").concat(page.title, "</option>"));
        });
      });
      var widget_names = [];
      var widget_id, option_html, widget_index;
      widget_index = 0;
      var count = [],
          widget_label;
      $('.inputWidget').empty();
      $(".ice_widget").each(function (index) {
        //// console.log( index + ": " + $( this ).text() );
        //widget_id = $(this).attr("id")
        widget_id = $(this).attr("id");
        var widget_name = widgetsJson[$widgets[widget_id].widgetType].label;
        widget_names.push(widget_name);
        if (!count[widget_name]) count[widget_name] = 1;else count[widget_name]++;
        widget_label = widget_name + " " + count[widget_name];
        option_html = "<option value='" + widget_id + "'>" + widget_label + "</option>";
        $(".inputWidget").append(option_html);
      });
    });
    $('.selectbox').val(that.settings.selectbox).trigger('change');
    /*remove submit button disable code*/

    $(document).on('input', '.externalurlval', function () {
      $('.activeButton').removeClass("disabled");
    });
    $(document).on('change', '.inputChapter', function () {
      $('.activeButton').removeClass("disabled");
    });
    $(document).on('change', '.inputWidget', function () {
      $('.activeButton').removeClass("disabled");
    });
    $(document).on('keypress keyup change cut paste', '.popuptitle', function () {
      $('.activeButton').removeClass("disabled");
    });
    $(".button_widget_form").on("submit", function (e) {
      e.preventDefault();
      that.settings.name = $('.buttonName').html();
      that.settings.align = $('.button-align').val();
      that.settings.selectbox = $('.selectbox').val();
      that.settings.buttonShap = $("#buttonShap").val();
      that.settings.buttonState = $("#buttonState").val();
      that.settings.buttonWidth = $('#buttonWidth').val();
      that.settings.buttonHeight = $('#buttonHeight').val();
      that.settings.buttonBorder = $('.borderColorSpectrum').find('.sp-preview-inner').css("background-color");
      that.settings.borderStyle = $('#borderstyle').val();
      that.settings.borderWidth = $('#btnWidthInputBox').val();
      that.settings.buttonRadius = $("#radiousInputBox").val();
      that.settings.horizontalDistance = $('#horiDisInputBox').val();
      that.settings.verticalDistance = $('#vertiiDisInputBox').val();
      that.settings.spreaddistance = $('#spreadiDisInputBox').val();
      that.settings.buttonColor = $('.btnColorSpectrum').find('.sp-preview-inner').css("background-color");
      that.settings.buttonColorHover = $('.btnHoverColorSpectrum').find('.sp-preview-inner').css("background-color");
      that.settings.buttonColorActive = $('.btnHoverColorSpectrum').find('.sp-preview-inner').css("background-color");

      if (!(that.settings.buttonColor == that.original_Btn_color)) {
        that.settings.isBtnConfigured = "true";
      }

      if (!(that.settings.buttonBorder == that.original_border_color)) {
        that.settings.isBtnConfigured = "true";
      }

      if (!(that.settings.buttonColorHover == that.original_Btn_hover_color)) {
        that.settings.isBtnConfigured = "true";
      }

      if (that.settings.isBtnConfigured == "true") {
        checkandSaveGlobalSettingwidgets(that.widget.id);
      }

      that.settings.selectbox = $(".selectbox").val(); //that.widget.reMount(that.settings);

      if ($(".externalurlval").val()) {
        that.settings.url = $(".externalurlval").val();
        that.settings.target = "_blank";
        displayNotification("successfully submitted");
      } else if ($(".inputChapter").val() && $(".inputPage").val()) {
        that.settings.specifichapter = $(".inputChapter").val();
        that.settings.specifipage = $(".inputPage").val();
        that.settings.specifichapterid = $courseJson.index[that.settings.specifichapter].id;
      } else if ($(".nextval").val()) {
        that.settings.nextval = $(".nextval").val();
      } else if ($(".prevval").val()) {
        that.settings.prevval = $(".prevval").val();
      } else if ($(".inputWidget").val()) {
        that.settings.specificwidget = $(".inputWidget").val();
      } else if ($(".popuptitle").html()) {
        that.settings.popuptitle = $(".popuptitle").html();
        that.settings.popupcontent = $(".popupcontent").html();
        that.settings.target = "_self";
        /* for specific page */

        that.settings.specifichapterpopup = $(".inputChapterpopup").val();
        that.settings.specifipagepopup = $(".inputPagepopup").val();
        console.log(that.settings.specifichapterpopup + ' - ' + that.settings.specifipagepopup);
        that.settings.specifichapteridpopup = $courseJson.index[that.settings.specifichapterpopup].id;
      }

      that.widget.reMount(that.settings);
    });
  };

  function checkandSaveGlobalSettingwidgets(widgetID) {
    var checkExistence = $courseJson.globalSettings.custom_setting_widgets.includes(widgetID);

    if (!checkExistence) {
      $courseJson.globalSettings.custom_setting_widgets.push(widgetID);
    }
  }
}

Button_widget3.prototype = Object.create(MainWidget.prototype);