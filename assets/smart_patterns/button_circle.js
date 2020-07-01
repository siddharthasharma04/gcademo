function Button_circle() {
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
      "align": "left",
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
      "buttonImage": "",
      "imageWidth": "",
      "buttonRadius": "100",
      "buttonBorder": "#3a3a3a",
      "borderStyle": "solid",
      "borderWidth": "1",
      "horizontalDistance": "0",
      "verticalDistance": "6",
      "spreaddistance": "-5",
      "buttonImageOrigName": '',
      "isBtnConfigured": 'false',
      "buttonWidth": '100px',
      "buttonHeight": "100px"
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
    var html = "\n            <div class=\"\">\n                <div id=\"currentModalBox\">\n                    <form id=\"button_widget_form\" class=\"form-settings button_modal button_widget_form\">\n                        <div class=\"form-group p_20\">\n                            <label class=\"form-element-label custom-label-box4\">Button Label:</label>\n                            <div contenteditable=\"true\" id=\"buttonName\" type=\"text\" class=\"form-control form-file-element buttonName\" value=\"\" required>".concat(that.settings.name, "\n                            </div>\n                        </div>\n                        <div class=\"form-group px_20 mt20\">\n                            <label class=\"form-element-label\">Alignment:</label>\n                            <select class=\"form-control form-file-element button-align\" id=\"button_align\">\n                                <option value=\"left\">Left Align</option>\n                                <option value=\"center\">Center Align</option>\n                                <option value=\"right\">Right Align</option>\n                            </select>\n                        </div>\n                        <div class=\"form-group px_20 mt20\">\n                            <label class=\"form-element-label custom-label-box4\">Link to<span style=\"color:#FF0000\">*</span></label>\n                                <select class=\"form-control form-file-element selectbox\" id=\"button_select\">\n                                    <option value=\"\">Select</option>\n                                    <option value=\"externalurl\">External URL</option>\n                                    <option value=\"nextpage\">Next Page</option>\n                                    <option value=\"prevpage\">Previous Page</option>\n                                    <option value=\"specificpage\">Specific Page</option>\n                                    <option value=\"specificwidget\">Specific Widget</option>\n                                    <option value=\"popup\">Pop-up</option>\n                                </select>\n                        </div>\n                     <div class=\"form-group px-3 outputhtml\">\n                        \n                     </div>  \n                        <div id=\"accordion2\" class=\"advance-setting-accordion\">\n                        <div class=\"card\">\n                            <div class=\"card-header advance_setting_hedaer\" id=\"heading_One\">\n                                <h2 class=\"mb-0\">\n                                    <span class=\"advanceSetting d-flex  btn btn-link collapsed\" data-toggle=\"collapse\" data-target=\"#collapsesettings\" aria-expanded=\"false\" aria-controls=\"collapseOne\">\n                                    More Settings \n                                    <span class=\"advance-accordian-arrow collapsed\" data-toggle=\"collapse\" data-target=\"#collapsesettings\" aria-expanded=\"false\" aria-controls=\"collapseOne\"><i class=\"fa fa-angle-down rotate-icon\"></i></span\n                                    </span>\n                                </h2>\n                            </div>\n                            <div id=\"collapsesettings\" class=\"collapse\" aria-labelledby=\"heading_One\" data-parent=\"#accordion2\">\n                                <div class=\"card-body advance_setting_body\">\n                                \n                                \n                                    <div class=\"row\">\n                                        <div class=\"col-sm-6\">\n                                            <div class=\"mt10 mb15\">\n                                                <label class=\"form-element-label fs11 custom-label-box4\">Button Width</label>\n                                                <input class=\"form-element btnWidth\" type=\"text\" id=\"btnWidth\" name=\"button width\" placeholder=\"Width\" autocomplete=\"off\" value=\"").concat(that.settings.buttonWidth, "\">\n                                                <span class=\"inputbtn-inst-msg\">e.g, 100px or 50%</span>\n                                            </div>\n                                        </div>\n                                    <div class=\"col-sm-6\">\n                                    <div class=\"mt10 mb15\">\n                                            <label class=\"form-element-label fs11 custom-label-box4\">Button Height</label>\n                                            <input type=\"text\" class=\"form-element btnHeight\" id=\"btnHeight\" name=\"button height\" value=\"").concat(that.settings.buttonHeight, "\"> \n                                            <span class=\"inputbtn-inst-msg\">e.g, 100px or 50%</span>\n                                        </div>\n                                    </div>  \n                                </div>\n                                 <div class=\"row\">\n                                    <div class=\"col-md-12\">\n                                        <label class=\"form-element-label column-setting-heading\">Border Style</label>\n                                    </div>\n                                </div>\n                                 <div class=\"row\">\n                                        <div class=\"col-sm-6\">\n                                            <div class=\"form-group\">\n                                                <div class=\"posRel inblockVmiddle\">\n                                                    <label class=\"form-element-label custom-label-box4\">Border Color</label>\n                                                    <input tyoe=\"color\" id=\"btnBorderColor\" class=\"form-control  form-element jscolor\"  name=\" border color\" value=\"").concat(that.settings.buttonBorder, "\">\n                                                </div>\n                                            </div>\n                                        </div>\n                                        <div class=\"col-sm-6\">\n                                            <div class=\"form-group\"> \n                                                <div class=\"posRel inblockVmiddle\">\n                                                    <label class=\"form-element-label custom-label-box4\">Border style</label>\n                                                    <select class=\"form-control form-file-element\" id=\"borderstyle\" value=\"").concat(that.settings.borderStyle, "\">\n                                                    <option value=\"none\">none</option>\n                                                    <option value=\"solid\">hidden</option>\n                                                    <option value=\"dotted\">dotted</option>\n                                                    <option value=\"dashed\">dashed</option>\n                                                    <option value=\"solid\">solid</option>\n                                                    <option value=\"double\">double</option>\n                                                    <option value=\"groove\">groove</option>\n                                                    <option value=\"ridge\">ridge</option>\n                                                    <option value=\"inset\">inset</option>\n                                                    <option value=\"outset\">outset</option>\n                                                </select>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class=\"row mt20\">\n                                        <div class=\"col-sm-6\">\n                                            <div class=\"form-group\">\n                                                <label class=\"form-element-label custom-label-box4\">Border Width</label>\n                                                <input type=\"number\" min = \"0\" max = \"10\" class=\"form-element\" id=\"borderWidth\" name=\"border Width\" value=\"").concat(that.settings.borderWidth, "\"><span class=\"form-units\">px</span>\n                                            </div>\n                                        </div>\n                                        <div class=\"col-sm-6\">\n                                       <div class=\"form-group\">\n                                            <label class=\"form-element-label custom-label-box4\">Border Radius</label>\n                                            <input type=\"number\" min = \"0\" max = \"100\" class=\"form-element\" id=\"btnBorderRadius\" name=\"btn_border_radius\" value=\"").concat(that.settings.buttonRadius, "\"><span class=\"form-units\">px</span>\n                                        </div>\n                                    </div> \n                                    </div>\n                                <div class=\"row\">\n                                    <div class=\"col-md-12\">\n                                        <label class=\"form-element-label column-setting-heading\">Border Shadow Style</label>\n                                    </div>\n                                </div> \n                                <div class=\"row\">\n                                    <div class=\"col-sm-4 p-right\">\n                                        <div class=\"form-group\">\n                                            <label class=\"form-element-label custom-label-box4\">Horizontal Distance</label>\n                                            <input type=\"number\" min = \"0\" max = \"6\" class=\"form-element\" id=\"horizontalDistance\" name=\"horizontal Distance\" value=\"").concat(that.settings.horizontalDistance, "\"><span class=\"form-units\">px</span>\n                                        </div>\n                                    </div>\n                                    <div class=\"col-sm-4 p-right\">\n                                        <div class=\"form-group\">\n                                            <label class=\"form-element-label custom-label-box4\">Vertical Distance</label>\n                                            <input type=\"number\" min = \"0\" max = \"6\" class=\"form-element\" id=\"verticalDistance\" name=\"vertical Distance\" value=\"").concat(that.settings.verticalDistance, "\"><span class=\"form-units\">px</span>\n                                        </div>\n                                    </div>\n                                    <div class=\"col-sm-4 p-right\">\n                                        <div class=\"form-group\">\n                                            <label class=\"form-element-label custom-label-box4\">Spread Distance</label>\n                                            <input type=\"number\" min = \"-5\" max = \"6\" class=\"form-element\" id=\"spreaddistance\" name=\"spread\" value=\"").concat(that.settings.spreaddistance, "\"><span class=\"form-units\">px</span>\n                                        </div>\n                                    </div>\n                                </div> \n                               \n                                 <div class=\"showOnlyButton\">   \n                                    <div class=\"row\">\n                                        <div class=\"col-md-12\">\n                                            <label class=\"form-element-label column-setting-heading\">Button Color Style</label>\n                                        </div>\n                                    </div>\n                                    <div class=\"row\">\n                                        <div class=\"col-sm-6\">\n                                            <div class=\"form-group\">\n                                                <label class=\"form-element-label custom-label-box4\">Button Color</label>\n                                                <input type=\"text\" id=\"btnColor\" class=\"form-control  form-element\"  name=\"btn-color\" value=\"").concat(that.settings.buttonColor, "\">\n                                            </div>\n                                        </div>\n                                        <div class=\"col-sm-6\">\n                                            <div class=\"form-group\">\n                                                <label class=\"form-element-label custom-label-box4\">Hover Color</label>\n                                                <input type=\"text\" id=\"btnHoverColor\" class=\"form-control  form-element\"  name=\"btn-color\" value=\"").concat(that.settings.buttonColorHover, "\">\n                                            </div>\n                                        </div>\n                                     </div>     \n                                  </div>\n                                </div>\n                            </div>\n                            </div> \n                        </div>\n                      \n                        <div class=\"form-group px-3\">\n                            <div class=\"button-widget-submit button-margin text-right\">\n                                <button type=\"submit\" class=\"formBtn yesBtn activeButton disabled  float-right\">Apply</button>\n                            </div>\n                            <div class=\"blankselect\"></div>\n                        </div>\n                    </form>\n                </div>   \n            </div>           \n        ");
    return html;
  };

  this.bindAddFormEvents = function () {
    var that = this;
    $('#btnColor').colorpicker({
      format: 'hex'
    });
    $('#btnBorderColor').colorpicker({
      format: 'hex'
    });
    $('#btnHoverColor').colorpicker({
      format: 'hex'
    });
    enableCkeditor("buttonName");
    $(".selectbox").change(function () {
      that.settings.selectvalue = $(this).children("option:selected").val(); // console.log(that.settings);

      if (that.settings.selectvalue == 'externalurl') {
        var externalurlhtml = $("\n                <div class=\"form-group\">\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Insert URL:</label>\n                        <input type=\"text\" class=\"form-control form-file-element externalurlval\" value=\"\" required>\n                    </div>\n                </div>\n                ");
        $('.outputhtml').html($(externalurlhtml).html());
        $('.outputhtml').show();
        $('.button-widget-submit').show();
        $('.blankselect').hide();
      } else if (that.settings.selectvalue == 'specificpage') {
        var specifichtml = $("\n                <div class=\"form-group\">\n                   \n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Select Chapter:</label>\n                        <select class=\"form-control form-file-element selectbox inputChapter\" required>\n                           <option value=\"\">Select Chapter</option>\n                        </select>\n                    </div>\n\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Select Page:</label>\n                        <select class=\"form-control form-file-element selectbox inputPage\" required>\n                           <option value=\"\">Select Page</option>\n                        </select>\n                    </div>\n                </div>\n                ");
        $(".outputhtml").html($(specifichtml).html());
        $('.outputhtml').show();
        $('.button-widget-submit').show();
        $('.blankselect').hide();
      } else if (that.settings.selectvalue == 'nextpage') {
        var nexthtml = $("\n                <div class=\"form-group\">\n                    <input style=\"display:none\" value=\"next\" class=\"nextval\">\n                </div>\n                ");
        $('.outputhtml').html($(nexthtml).html());
        $('.outputhtml').show();
        $('.button-widget-submit').show();
        $('.blankselect').hide();
      } else if (that.settings.selectvalue == 'prevpage') {
        var prevhtml = $("\n                <div class=\"form-group\">\n                    <input style=\"display:none\" value=\"previous\" class=\"prevval\">\n                </div>\n                ");
        $(".outputhtml").html($(prevhtml).html());
        $('.outputhtml').show();
        $('.button-widget-submit').show();
        $('.blankselect').hide();
      } else if (that.settings.selectvalue == 'specificwidget') {
        var specificwidgethtml = $("\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Select Widget:</label>\n                        <select class=\"form-control form-file-element selectbox inputWidget\" required>\n                           <option value=\"\">Select Widget</option>\n                        </select>\n                    </div>\n\n                ");
        $(".outputhtml").html($(specificwidgethtml).html());
        $('.outputhtml').show();
        $('.button-widget-submit').show();
        $('.blankselect').hide();
      } else if (that.settings.selectvalue == 'popup') {
        var popuphtml = $("\n                <div class=\"form-group\">\n                   \n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Insert Pop-up Title:</label>\n                        <div contenteditable=\"true\" name=\"title\" id=\"popup_title\" class=\"form-control form-file-element popuptitle\" required value=\"".concat(that.settings.popuptitle, "\">").concat(that.settings.popuptitle, "</div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Insert Pop-up Content:</label>\n                        <div contenteditable=\"true\" name=\"title\" id=\"popup_content\" class=\"fw-textarea form-control popupcontent\" required value=\"").concat(that.settings.popupcontent, "\">").concat(that.settings.popupcontent, "</div>\n                    </div>\n\n\n                    <!--specific chapter/page drop-down -->\n                    <div class=\"mb-2\">\n                        <label class=\"form-element-label\">Select Ok button link below:</label>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Select Chapter:</label>\n                        <select class=\"form-control form-file-element selectbox inputChapterpopup\" required>\n                           <option value=\"\">Select Chapter</option>\n                        </select>\n                    </div>\n\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Select Page:</label>\n                        <select class=\"form-control form-file-element selectbox inputPagepopup\" required>\n                           <option value=\"\">Select Page</option>\n                        </select>\n                    </div>\n\n                </div>\n                "));
        $(".outputhtml").html($(popuphtml).html());
        $('.outputhtml').show();
        $('.button-widget-submit').show();
        $('.blankselect').hide();
        enableCkeditor("popup_content");
        enableCkeditor("popup_title");
      } else if (that.settings.selectvalue === '') {
        var nonehtml = $("  \n                    <div class=\"button-margin text-right\">\n                        <button type=\"button\" class=\"formBtn yesBtn disabled float-right\">Apply</button>\n                    </div>    \n                ");
        $(".blankselect").html($(nonehtml).html());
        $('.button-widget-submit').hide();
        $('.outputhtml').hide();
        $('.blankselect').show();
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
        widget_name = widgetsJson[$widgets[widget_id].widgetType].label;
        widget_names.push(widget_name);
        if (!count[widget_name]) count[widget_name] = 1;else count[widget_name]++;
        widget_label = widget_name + " " + count[widget_name];
        option_html = "<option value='" + widget_id + "'>" + widget_label + "</option>";
        $(".inputWidget").append(option_html);
      });
    });
    /*remove submit button disable code*/

    $(document).on('input', '.externalurlval', function () {
      // console.log("external url");
      $('.activeButton').removeClass("disabled");
    });
    $(document).on('change', '.inputChapter', function () {
      // console.log("specific page");
      $('.activeButton').removeClass("disabled");
    });
    $(document).on('change', '.inputWidget', function () {
      // console.log("specific widget");
      $('.activeButton').removeClass("disabled");
    });
    $(document).on('keypress', '.popuptitle', function () {
      // console.log("pop-up");
      $('.activeButton').removeClass("disabled");
    });
    $('#btnImage').click(function () {
      if ($('#btnImage').val() == "" || $('#btnImage').val() != "") {
        $('.showOnlyButton').hide();
      }
    });
    $(".button_widget_form").on("submit", function (e) {
      debugger;
      e.preventDefault(); // console.log("add form submit");

      that.settings.buttonImage = $('#btnImage').val();
      that.settings.buttonColor = $('#btnColor').val();

      if (!(that.settings.buttonColor == that.original_Btn_color)) {
        that.settings.isBtnConfigured = "true";
      }

      that.settings.buttonWidth = $('.btnWidth').val();
      that.settings.buttonHeight = $('.btnHeight').val();
      that.settings.buttonBorder = $('#btnBorderColor').val();

      if (!(that.settings.buttonBorder == that.original_border_color)) {
        that.settings.isBtnConfigured = "true";
      }

      that.settings.buttonRadius = $('#btnBorderRadius').val();
      that.settings.buttonColorHover = $('#btnHoverColor').val();

      if (!(that.settings.buttonColorHover == that.original_Btn_hover_color)) {
        that.settings.isBtnConfigured = "true";
      }

      that.settings.selectbox = $(".selectbox").val();
      that.settings.imageWidth = $('#imageWidth').val();
      that.settings.borderStyle = $('#borderstyle').val();
      that.settings.borderWidth = $('#borderWidth').val();
      that.settings.horizontalDistance = $('#horizontalDistance').val();
      that.settings.verticalDistance = $('#verticalDistance').val();
      that.settings.spreaddistance = $('#spreaddistance').val();

      if (that.settings.isBtnConfigured == "true") {
        checkandSaveGlobalSettingwidgets(that.widget.id);
      }

      $("#borderstyle  option[value=" + that.settings.borderStyle + "]").attr("selected", "selected"); // if(that.settings.buttonImage != ""){
      //     that.settings.buttonImageOrigName = that.settings.buttonImage.split('fakepath')[1].split('.')[0].substr(1);
      //     that.UploadImage(e)
      // }
      // $('#button_widget_form input[type="file"]').change(function() {
      //     var ext = this.value.match(/\.(.+)$/)[1];
      //     var extSplit = ext.split('.');
      //     var lastExt = extSplit[extSplit.length - 1]
      //     switch (lastExt.toLowerCase()) {
      //         case 'jpg':
      //         case 'jpeg':
      //         case 'png':
      //         case 'gif':
      //         case 'svg':
      //         case 'bmp':
      //             $('#btnImage').attr('disabled', false);
      //             break;
      //         default:
      //             displayNotification("This is not an allowed file type.", 'error');
      //             this.value = '';
      //     }
      // });

      if ($.trim($(".buttonName").html()) === "") {// displayNotification("Please fill the button name field", 'error');
        // return false;
      } else {
        //that.widget.insert(that.settings);
        if ($(".externalurlval").val()) {
          that.saveurl(e);
        } else if ($(".inputChapter").val() && $(".inputPage").val()) {
          that.specificnumber(e);
        } else if ($(".nextval").val()) {
          that.nextfunc(e);
        } else if ($(".prevval").val()) {
          that.previousfunc(e);
        } else if ($(".inputWidget").val()) {
          that.specificwidget(e);
        } else if ($(".popuptitle").html()) {
          that.popupwidget(e);
        }

        console.log(that.settings);
        that.widget.reMount(that.settings);
      }
    });
  };

  this.bindEditFormEvents = function () {
    var that = this;
    widgetSettingPanelOpenSetIcon();
    $('#btnColor').colorpicker({
      format: 'hex'
    });
    $('#btnBorderColor').colorpicker({
      format: 'hex'
    });
    $('#btnHoverColor').colorpicker({
      format: 'hex'
    });
    enableCkeditor("buttonName"); // console.log(that.settings);

    $("#borderstyle  option[value=" + that.settings.borderStyle + "]").attr("selected", "selected");
    $(".selectbox").change(function () {
      that.settings.selectvalue = $(this).children("option:selected").val(); // console.log(that.settings);
      //$("#firstval").empty(); 

      if (that.settings.selectvalue == 'externalurl') {
        var externalurlhtml = $("\n                <div class=\"form-group\">\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Insert URL:</label> \n                        <input type=\"text\" class=\"form-control form-file-element externalurlval\" value=\"".concat(that.settings.url, "\" required>\n                    </div>\n                </div>\n                "));
        $(".outputhtml").html($(externalurlhtml).html());
        $('.outputhtml').show();
        $('.activeButton').removeClass("disabled");
        $('.button-widget-submit').show();
        $('.blankselect').hide();
      } else if (that.settings.selectvalue == 'specificpage') {
        var specifichtml = $("\n                <div class=\"form-group\">\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Select Chapter:</label>\n                        <select class=\"form-control form-file-element selectbox inputChapter\" required>\n                            <option value=\"\">Select Chapter</option>\n                        </select>\n                    </div>\n\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Select Page:</label>\n                        <select class=\"form-control form-file-element selectbox inputPage\" required>\n                            <option value=\"\">Select Page</option>\n                        </select>\n                    </div>\n                </div>\n                ");
        $(".outputhtml").html($(specifichtml).html());
        $('.outputhtml').show();
        $('.activeButton').removeClass("disabled");
        $('.button-widget-submit').show();
        $('.blankselect').hide();
      } else if (that.settings.selectvalue === 'nextpage') {
        var nexthtml = $("\n                <div class=\"form-group\">\n                    <input style=\"display:none\" value=\"next\" class=\"nextval\">\n                </div>\n                ");
        $(".outputhtml").html($(nexthtml).html());
        $('.outputhtml').show();
        $('.activeButton').removeClass("disabled");
        $('.button-widget-submit').show();
        $('.blankselect').hide();
      } else if (that.settings.selectvalue === 'prevpage') {
        var prevhtml = $("\n                <div class=\"form-group\">\n                    <input style=\"display:none\" value=\"previous\" class=\"prevval\">\n                </div>\n                ");
        $(".outputhtml").html($(prevhtml).html());
        $('.outputhtml').show();
        $('.activeButton').removeClass("disabled");
        $('.button-widget-submit').show();
        $('.blankselect').hide();
      } else if (that.settings.selectvalue == 'specificwidget') {
        var specificwidgethtml = $("\n                <div class=\"form-group\">\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Select Widget:</label>\n                        <select class=\"form-control form-file-element selectbox inputWidget\" required>\n                           <option value=\"\">Select Widget</option>\n                        </select>\n                    </div>\n                </div>\n                ");
        $(".outputhtml").html($(specificwidgethtml).html());
        $('.outputhtml').show();
        $('.activeButton').removeClass("disabled");
        $('.button-widget-submit').show();
        $('.blankselect').hide();
      } else if (that.settings.selectvalue == 'popup') {
        var popuphtml = $("\n                <div class=\"form-group\">\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Insert Pop-up Title:</label>\n                        <div contenteditable=\"true\" name=\"title\" id=\"popup_title\" class=\"form-control form-file-element popuptitle\" required value=\"".concat(that.settings.popuptitle, "\">").concat(that.settings.popuptitle, "</div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Insert Pop-up Content:</label>\n                        <div contenteditable=\"true\" name=\"title\" id=\"popup_content\" class=\"fw-textarea form-control popupcontent\" required value=\"").concat(that.settings.popupcontent, "\">").concat(that.settings.popupcontent, "</div>\n                    </div>\n\n\n                    <!--specific chapter/page drop-down -->\n                    <div class=\"mb-2\">\n                        <label class=\"form-element-label\">Select Ok button link below:</label>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Select Chapter:</label>\n                        <select class=\"form-control form-file-element selectbox inputChapterpopup\" required>\n                           <option value=\"\">Select Chapter</option>\n                        </select>\n                    </div>\n\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Select Page:</label>\n                        <select class=\"form-control form-file-element selectbox inputPagepopup\" required>\n                           <option value=\"\">Select Page</option>    \n                        </select>\n                    </div>\n\n                </div>\n                "));
        $(".outputhtml").html($(popuphtml).html());
        $('.outputhtml').show();
        $('.activeButton').removeClass("disabled");
        $('.button-widget-submit').show();
        $('.blankselect').hide();
        enableCkeditor("popup_content");
        enableCkeditor("popup_title");
      } else if (that.settings.selectvalue === '') {
        var nonehtml = $("  \n                    <div class=\"button-margin text-right\">\n                        <button type=\"button\" class=\"formBtn yesBtn disabled float-right\">Apply</button>\n                    </div>    \n                ");
        $(".blankselect").html($(nonehtml).html());
        $('.button-widget-submit').hide();
        $('.outputhtml').hide();
        $('.blankselect').show();
      }

      if (that.settings.selectbox == "nextpage" || that.settings.selectbox == "prevpage") {
        $('.activeButton').removeClass("disabled");
      }

      $(".inputChapter").empty();
      $(".inputChapterpopup").empty(); //$(specifichtml).find('#inputChapter').append('<option value=""></option>')

      $courseJson.index.forEach(function (chapter, index) {
        // console.log(chapter);
        //// console.log(chapter.name);
        //// console.log(chapter.pages);
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
        widget_name = widgetsJson[$widgets[widget_id].widgetType].label;
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
      // console.log("external url");
      $('.activeButton').removeClass("disabled");
    });
    $(document).on('change', '.inputChapter', function () {
      // console.log("specific page");
      $('.activeButton').removeClass("disabled");
    });
    $(document).on('change', '.inputWidget', function () {
      // console.log("specific widget");
      $('.activeButton').removeClass("disabled");
    });
    $(document).on('keypress', '.popuptitle', function () {
      // console.log("pop-up");
      $('.activeButton').removeClass("disabled");
    });
    $('#btnImage').click(function () {
      if ($('#btnImage').val() == "" || $('#btnImage').val() != "") {
        $('.showOnlyButton').hide();
      }
    });
    $(".button_widget_form").on("submit", function (e) {
      e.preventDefault(); // console.log("edit form submit");

      that.settings.buttonImage = $('#btnImage').val();
      that.settings.buttonColor = $('#btnColor').val();

      if (!(that.settings.buttonColor == that.original_Btn_color)) {
        that.settings.isBtnConfigured = "true";
      }

      that.settings.buttonWidth = $('.btnWidth').val();
      that.settings.buttonHeight = $('.btnHeight').val();
      that.settings.buttonBorder = $('#btnBorderColor').val();

      if (!(that.settings.buttonBorder == that.original_border_color)) {
        that.settings.isBtnConfigured = "true";
      }

      that.settings.buttonRadius = $('#btnBorderRadius').val();
      that.settings.buttonColorHover = $('#btnHoverColor').val();

      if (!(that.settings.buttonColorHover == that.original_Btn_hover_color)) {
        that.settings.isBtnConfigured = "true";
      }

      that.settings.selectbox = $(".selectbox").val();
      that.settings.imageWidth = $('#imageWidth').val();
      that.settings.borderStyle = $('#borderstyle').val();
      that.settings.borderWidth = $('#borderWidth').val();
      that.settings.horizontalDistance = $('#horizontalDistance').val();
      that.settings.verticalDistance = $('#verticalDistance').val();
      that.settings.spreaddistance = $('#spreaddistance').val();

      if (that.settings.isBtnConfigured == "true") {
        checkandSaveGlobalSettingwidgets(that.widget.id);
      }

      $("#borderstyle  option[value=" + that.settings.borderStyle + "]").attr("selected", "selected");

      if (that.settings.buttonImage != "") {
        that.settings.buttonImageOrigName = that.settings.buttonImage.split('fakepath')[1].split('.')[0].substr(1);
        that.UploadImage(e);
      }

      $('#button_widget_form input[type="file"]').change(function () {
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
            $('#btnImage').attr('disabled', false);
            break;

          default:
            displayNotification("This is not an allowed file type.", 'error');
            this.value = '';
        }
      });
      that.settings.selectbox = $(".selectbox").val(); //that.widget.reMount(that.settings);

      if ($.trim($(".buttonName").html()) === "") {// displayNotification("Please fill the button name field", 'error');
        // return false;
      } else {
        if ($(".externalurlval").val()) {
          that.saveurl(e);
        } else if ($(".inputChapter").val() && $(".inputPage").val()) {
          that.specificnumber(e);
        } else if ($(".nextval").val()) {
          that.nextfunc(e);
        } else if ($(".prevval").val()) {
          that.previousfunc(e);
        } else if ($(".inputWidget").val()) {
          that.specificwidget(e);
        } else if ($(".popuptitle").html()) {
          that.popupwidget(e);
        }

        that.widget.reMount(that.settings);
        console.log(that.settings);
        that.widget.closeAddModal();
      }
    });
  };

  this.saveurl = function (ev) {
    var that = this;
    ev.preventDefault(); //this.settings.url= $(this).find("externalurlval").val();

    that.settings.url = $(".externalurlval").val();
    that.settings.name = $(".buttonName").html();
    that.settings.align = $(".button-align option:selected").val();
    that.settings.target = "_blank";
    that.settings.specifipage = "";
    that.settings.nextval = "";
    that.settings.prevval = "";
    that.settings.specificwidget = "";
    that.settings.popuptitle = "";
    that.settings.popupcontent = "";
    displayNotification("successfully submitted");
  };

  this.specificnumber = function (ev) {
    var that = this;
    ev.preventDefault(); //this.settings.specificnumber= $(this).find("specificnum").val();

    that.settings.specifichapter = $(".inputChapter").val();
    that.settings.specifipage = $(".inputPage").val();
    that.settings.name = $(".buttonName").html();
    that.settings.align = $(".button-align option:selected").val();
    that.settings.target = "_self"; // console.log(that.settings.specifichapter + ' - ' + that.settings.specifipage);

    that.settings.specifichapterid = $courseJson.index[that.settings.specifichapter].id;
    that.settings.url = "";
    that.settings.nextval = "";
    that.settings.prevval = "";
    that.settings.specificwidget = "";
    that.settings.popuptitle = "";
    that.settings.popupcontent = ""; // displayNotification("successfully submitted");
  };

  this.nextfunc = function (e) {
    var that = this;
    e.preventDefault();
    that.settings.name = $(".buttonName").html();
    that.settings.align = $(".button-align option:selected").val();
    that.settings.target = "_self";
    that.settings.nextval = $(".nextval").val();
    that.settings.url = "";
    that.settings.specifipage = "";
    that.settings.prevval = "";
    that.settings.specificwidget = "";
    that.settings.popuptitle = "";
    that.settings.popupcontent = ""; // displayNotification("successfully submitted");
  };

  this.previousfunc = function (e) {
    var that = this;
    e.preventDefault();
    that.settings.name = $(".buttonName").html();
    that.settings.align = $(".button-align option:selected").val();
    that.settings.target = "_self";
    that.settings.prevval = $(".prevval").val();
    that.settings.url = "";
    that.settings.specifipage = "";
    that.settings.nextval = "";
    that.settings.specificwidget = "";
    that.settings.popuptitle = "";
    that.settings.popupcontent = ""; // displayNotification("successfully submitted");
  };

  this.specificwidget = function (e) {
    var that = this;
    e.preventDefault();
    that.settings.name = $(".buttonName").html();
    that.settings.align = $(".button-align option:selected").val();
    that.settings.specificwidget = $(".inputWidget").val();
    that.settings.target = "_self";
    that.settings.url = "";
    that.settings.specifipage = "";
    that.settings.nextval = "";
    that.settings.prevval = "";
    that.settings.popuptitle = "";
    that.settings.popupcontent = ""; //    displayNotification("successfully submitted");
  };

  this.popupwidget = function (e) {
    var that = this;
    e.preventDefault();
    that.settings.name = $(".buttonName").html();
    that.settings.align = $(".button-align option:selected").val();
    that.settings.popuptitle = $(".popuptitle").html();
    that.settings.popupcontent = $(".popupcontent").html();
    that.settings.target = "_self";
    /* for specific page */

    that.settings.specifichapterpopup = $(".inputChapterpopup").val();
    that.settings.specifipagepopup = $(".inputPagepopup").val(); // console.log(that.settings.specifichapterpopup + ' - ' + that.settings.specifipagepopup);

    that.settings.specifichapteridpopup = $courseJson.index[that.settings.specifichapterpopup].id;
    that.settings.url = "";
    that.settings.specifipage = "";
    that.settings.nextval = "";
    that.settings.prevval = "";
    that.settings.specificwidget = ""; // displayNotification("successfully submitted");
  };

  this.UploadImage = function (ev) {
    ev.preventDefault();
    var that = this;
    var formData = new FormData(document.getElementById('button_widget_form'));

    if ($("#button_widget_form [name='filename']").val() != '') {
      // $('#loader').show();
      axios.post(appUrl + '/new-image', formData, {
        headers: {
          "course_path": $courseJson.courseDirPath,
          "token": localStorage.getItem('token')
        }
      }).then(function (result) {
        var imagePath = $courseJson.courseDirPath + result.data.data;
        that.settings.buttonImage = encodeURIComponent(imagePath);
        that.widget.reMount(that.settings); // $('#loader').hide();
      });
    } else {
      that.widget.reMount(that.settings);
    }
  };

  function checkandSaveGlobalSettingwidgets(widgetID) {
    var checkExistence = $courseJson.globalSettings.custom_setting_widgets.includes(widgetID);

    if (!checkExistence) {
      $courseJson.globalSettings.custom_setting_widgets.push(widgetID);
    }
  }
}

Button_circle.prototype = Object.create(MainWidget.prototype);