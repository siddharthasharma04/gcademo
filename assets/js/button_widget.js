function Button_widget() {
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
      "specifichapteridpopup": ""
    };
    this.widget = new Widget(this.settings);
    this.widget.insert(this.settings);
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
    var html = "\n            <div class=\"\">\n                <div id=\"currentModalBox\">\n                    <form id=\"button_widget_form\" class=\"form-settings button_modal button_widget_form\">\n                        <div class=\"form-group p_20\">\n                            <label class=\"form-element-label\">Button Label:</label>\n                            <input type=\"text\" class=\"form-control form-file-element buttonName\" value=\"".concat(that.settings.name, "\">\n                        </div>\n                        <div class=\"form-group px_20\">\n                            <label class=\"form-element-label\">Alignment:</label>\n                            <select class=\"form-control form-file-element button-align\" id=\"button_align\">\n                                <option value=\"left\">Left Align</option>\n                                <option value=\"center\">Center Align</option>\n                                <option value=\"right\">Right Align</option>\n                            </select>\n                        </div>\n                        <div class=\"form-group px_20\">\n                            <label class=\"form-element-label\">Link to<span style=\"color:#FF0000\">*</span></label>\n                                <select class=\"form-control form-file-element selectbox\" id=\"button_select\">\n                                    <option value=\"\">Select</option>\n                                    <option value=\"externalurl\">External URL</option>\n                                    <option value=\"nextpage\">Next Page</option>\n                                    <option value=\"prevpage\">Previous Page</option>\n                                    <option value=\"specificpage\">Specific Page</option>\n                                    <option value=\"specificwidget\">Specific Widget</option>\n                                    <option value=\"popup\">Pop-up</option>\n                                </select>\n                        </div>\n                        <div class=\"form-group px-3 outputhtml\">\n                            <button type=\"button\" class=\"formBtn yesBtn disabled float-right\">Apply</button>\n                        </div>\n                    </form>\n                </div>   \n            </div>           \n        ");
    return html;
  };

  this.bindAddFormEvents = function () {
    var that = this;
    $(".selectbox").change(function () {
      that.settings.selectvalue = $(this).children("option:selected").val();
      console.log(that.settings); //$("#firstval").empty();

      if (that.settings.selectvalue == 'externalurl') {
        var externalurlhtml = $("\n                <div class=\"form-group\">\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Insert URL:</label>\n                        <input type=\"text\" class=\"form-control form-file-element externalurlval\" value=\"\" required>\n                    </div>\n                    \n                    <div class=\"button-widget-submit button-margin text-right\">\n                        <button type=\"submit\" class=\"formBtn yesBtn externalurlsubmit disabled\">Apply</button>\n                    </div>\n                </div>\n                ");
        $(".outputhtml").html($(externalurlhtml).html());
      } else if (that.settings.selectvalue == 'specificpage') {
        var specifichtml = $("\n                <div class=\"form-group\">\n                   \n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Select Chapter:</label>\n                        <select class=\"form-control form-file-element selectbox inputChapter\" required>\n                           <option value=\"\">Select Chapter</option>\n                        </select>\n                    </div>\n\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Select Page:</label>\n                        <select class=\"form-control form-file-element selectbox inputPage\" required>\n                           <option value=\"\">Select Page</option>\n                        </select>\n                    </div>\n                    <div class=\"button-widget-submit button-margin text-right\">\n                        <button type=\"submit\" class=\"formBtn yesBtn specificpagesubmit disabled\">Apply</button>\n                    </div>\n                </div>\n                ");
        $(".outputhtml").html($(specifichtml).html());
      } else if (that.settings.selectvalue === 'nextpage') {
        /*  that.settings.name = 'Next';
         that.widget.reMount(that.settings);
         that.widget.closeAddModal(); */
        var nexthtml = $("\n                <div class=\"form-group\">\n\n                    \n                    <input style=\"visibility: hidden\" value=\"next\" class=\"nextval\">\n                    \n                    <div class=\"button-widget-submit button-margin text-right\">\n                        <button type=\"submit\" class=\"formBtn yesBtn nextpagesubmit\">Apply</button>\n                    </div>\n                </div>\n                ");
        $(".outputhtml").html($(nexthtml).html());
      } else if (that.settings.selectvalue === 'prevpage') {
        /* that.settings.name = 'Previous';
        that.widget.reMount(that.settings);
        that.widget.closeAddModal(); */
        var prevhtml = $("\n                <div class=\"form-group\">\n                    <input style=\"visibility: hidden\" value=\"previous\" class=\"prevval\">\n                    \n                    <div class=\"button-widget-submit button-margin text-right\">\n                        <button type=\"submit\" class=\"formBtn yesBtn prevpagesubmit\">Apply</button>\n                    </div>\n                </div>\n                ");
        $(".outputhtml").html($(prevhtml).html());
      } else if (that.settings.selectvalue == 'specificwidget') {
        var specificwidgethtml = $("\n                <div class=\"form-group\">\n                   \n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Select Widget:</label>\n                        <select class=\"form-control form-file-element selectbox inputWidget\" required>\n                           <option value=\"\">Select Widget</option>\n                        </select>\n                    </div>\n\n                    <div class=\"button-widget-submit button-margin text-right\">\n                        <button type=\"submit\" class=\"formBtn yesBtn specificwidgetsubmit disabled\">Apply</button>\n                    </div>\n                </div>\n                ");
        $(".outputhtml").html($(specificwidgethtml).html());
      } else if (that.settings.selectvalue == 'popup') {
        var popuphtml = $("\n                <div class=\"form-group\">\n                   \n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Insert Pop-up Title:</label>\n                        <div contenteditable=\"true\" name=\"title\" id=\"popup_title\" class=\"form-control form-file-element popuptitle\" required value=\"".concat(that.settings.popuptitle, "\">").concat(that.settings.popuptitle, "</div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Insert Pop-up Content:</label>\n                        <div contenteditable=\"true\" name=\"title\" id=\"popup_content\" class=\"fw-textarea form-control popupcontent\" required value=\"").concat(that.settings.popupcontent, "\">").concat(that.settings.popupcontent, "</div>\n                    </div>\n\n\n                    <!--specific chapter/page drop-down -->\n                    <div class=\"mb-2\">\n                        <label class=\"form-element-label\">Select Ok button link below:</label>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Select Chapter:</label>\n                        <select class=\"form-control form-file-element selectbox inputChapterpopup\" required>\n                           <option value=\"\">Select Chapter</option>\n                        </select>\n                    </div>\n\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Select Page:</label>\n                        <select class=\"form-control form-file-element selectbox inputPagepopup\" required>\n                           <option value=\"\">Select Page</option>\n                        </select>\n                    </div>\n\n\n                    <div class=\"button-widget-submit button-margin text-right\">\n                        <button type=\"submit\" class=\"formBtn yesBtn popupsubmit disabled\">Apply</button>\n                    </div>\n                </div>\n                "));
        $(".outputhtml").html($(popuphtml).html());
        enableCkeditor("popup_content");
        enableCkeditor("popup_title");
      } else if (that.settings.selectvalue === '') {
        /* that.settings.name = 'Previous';
        that.widget.reMount(that.settings);
        that.widget.closeAddModal(); */
        var nonehtml = $("  \n                    <div class=\"button-margin text-right\">\n                        <button type=\"button\" class=\"formBtn yesBtn disabled float-right\">Apply</button>\n                    </div>    \n                ");
        $(".outputhtml").html($(nonehtml).html());
      } //$(specifichtml).find('#inputChapter').append('<option value=""></option>')


      $courseJson.index.forEach(function (chapter, index) {
        console.log(chapter); //console.log(chapter.name);
        //console.log(chapter.pages);
        //$(specifichtml).find('#inputChapter').append(`<option value="val">options</option>`);

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
        //console.log( index + ": " + $( this ).text() );
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
      console.log("external url");
      $('.externalurlsubmit').removeClass("disabled");
    });
    $(document).on('change', '.inputChapter', function () {
      console.log("specific page");
      $('.specificpagesubmit').removeClass("disabled");
    });
    $(document).on('change', '.inputWidget', function () {
      console.log("specific widget");
      $('.specificwidgetsubmit').removeClass("disabled");
    });
    $(document).on('keypress', '.popuptitle', function () {
      console.log("pop-up");
      $('.popupsubmit').removeClass("disabled");
    });
    $(".button_widget_form").on("submit", function (e) {
      e.preventDefault();
      console.log("add form submit");
      that.settings.selectbox = $(".selectbox").val();

      if ($.trim($(".buttonName").val()) === "") {
        displayNotification("Please fill the button name field", 'error');
        return false;
      } else {
        //that.widget.insert(that.settings);
        that.widget.reMount(that.settings);

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
      }
    });
  };

  this.bindEditFormEvents = function () {
    var that = this;
    $(".selectbox").change(function () {
      that.settings.selectvalue = $(this).children("option:selected").val();
      console.log(that.settings); //$("#firstval").empty(); 

      if (that.settings.selectvalue == 'externalurl') {
        var externalurlhtml = $("\n                <div class=\"form-group\">\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Insert URL:</label> \n                        <input type=\"text\" class=\"form-control form-file-element externalurlval\" value=\"".concat(that.settings.url, "\" required>\n                    </div>\n                    \n                    <div class=\"button-widget-submit button-margin text-right\">\n                        <button type=\"submit\" class=\"formBtn yesBtn externalurlsubmit\">Apply</button>\n                    </div>\n                </div>\n                "));
        $(".outputhtml").html($(externalurlhtml).html());
      } else if (that.settings.selectvalue == 'specificpage') {
        var specifichtml = $("\n                <div class=\"form-group\">\n                    \n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Select Chapter:</label>\n                        <select class=\"form-control form-file-element selectbox inputChapter\" required>\n                            <option value=\"\">Select Chapter</option>\n                        </select>\n                    </div>\n\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Select Page:</label>\n                        <select class=\"form-control form-file-element selectbox inputPage\" required>\n                            <option value=\"\">Select Page</option>\n                        </select>\n                    </div>\n                    <div class=\"button-widget-submit button-margin text-right\">\n                        <button type=\"submit\" class=\"formBtn yesBtn specificpagesubmit\">Apply</button>\n                    </div>\n                </div>\n                ");
        $(".outputhtml").html($(specifichtml).html());
      } else if (that.settings.selectvalue === 'nextpage') {
        /*  that.settings.name = 'Next';
         that.widget.reMount(that.settings);
         that.widget.closeAddModal(); */
        var nexthtml = $("\n                <div class=\"form-group\">\n\n                    \n                    <input style=\"visibility: hidden\" value=\"next\" class=\"nextval\">\n                    \n                    <div class=\"button-widget-submit button-margin text-right\">\n                        <button type=\"submit\" class=\"formBtn yesBtn\">Apply</button>\n                    </div>\n                </div>\n                ");
        $(".outputhtml").html($(nexthtml).html());
      } else if (that.settings.selectvalue === 'prevpage') {
        /* that.settings.name = 'Previous';
        that.widget.reMount(that.settings);
        that.widget.closeAddModal(); */
        var prevhtml = $("\n                <div class=\"form-group\">\n                    <input style=\"visibility: hidden\" value=\"previous\" class=\"prevval\">\n                    \n                    <div class=\"button-widget-submit button-margin text-right\">\n                        <button type=\"submit\" class=\"formBtn yesBtn\">Apply</button>\n                    </div>\n                </div>\n                ");
        $(".outputhtml").html($(prevhtml).html());
      } else if (that.settings.selectvalue == 'specificwidget') {
        var specificwidgethtml = $("\n                <div class=\"form-group\">\n                   \n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Select Widget:</label>\n                        <select class=\"form-control form-file-element selectbox inputWidget\" required>\n                           <option value=\"\">Select Widget</option>\n                        </select>\n                    </div>\n\n                    <div class=\"button-widget-submit button-margin text-right\">\n                        <button type=\"submit\" class=\"formBtn yesBtn specificwidgetsubmit\">Apply</button>\n                    </div>\n                </div>\n                ");
        $(".outputhtml").html($(specificwidgethtml).html());
      } else if (that.settings.selectvalue == 'popup') {
        var popuphtml = $("\n                <div class=\"form-group\">\n                   \n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Insert Pop-up Title:</label>\n                        <div contenteditable=\"true\" name=\"title\" id=\"popup_title\" class=\"form-control form-file-element popuptitle\" required value=\"".concat(that.settings.popuptitle, "\">").concat(that.settings.popuptitle, "</div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Insert Pop-up Content:</label>\n                        <div contenteditable=\"true\" name=\"title\" id=\"popup_content\" class=\"fw-textarea form-control popupcontent\" required value=\"").concat(that.settings.popupcontent, "\">").concat(that.settings.popupcontent, "</div>\n                    </div>\n\n\n                    <!--specific chapter/page drop-down -->\n                    <div class=\"mb-2\">\n                        <label class=\"form-element-label\">Select Ok button link below:</label>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Select Chapter:</label>\n                        <select class=\"form-control form-file-element selectbox inputChapterpopup\" required>\n                           <option value=\"\">Select Chapter</option>\n                        </select>\n                    </div>\n\n                    <div class=\"form-group\">\n                        <label class=\"form-element-label\">Select Page:</label>\n                        <select class=\"form-control form-file-element selectbox inputPagepopup\" required>\n                           <option value=\"\">Select Page</option>    \n                        </select>\n                    </div>\n\n\n                    <div class=\"button-widget-submit button-margin text-right\">\n                        <button type=\"submit\" class=\"formBtn yesBtn popupsubmit\">Apply</button>\n                    </div>\n                </div>\n                "));
        $(".outputhtml").html($(popuphtml).html());
        enableCkeditor("popup_content");
        enableCkeditor("popup_title");
      } else if (that.settings.selectvalue === '') {
        var nonehtml = $("  \n                    <div class=\"button-margin text-right\">\n                        <button type=\"button\" class=\"formBtn yesBtn disabled float-right\">Apply</button>\n                    </div>    \n                ");
        $(".outputhtml").html($(nonehtml).html());
      }

      $(".inputChapter").empty();
      $(".inputChapterpopup").empty(); //$(specifichtml).find('#inputChapter').append('<option value=""></option>')

      $courseJson.index.forEach(function (chapter, index) {
        console.log(chapter); //console.log(chapter.name);
        //console.log(chapter.pages);
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
        //console.log( index + ": " + $( this ).text() );
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
      console.log("external url");
      $('.externalurlsubmit').removeClass("disabled");
    });
    $(document).on('change', '.inputChapter', function () {
      console.log("specific page");
      $('.specificpagesubmit').removeClass("disabled");
    });
    $(document).on('change', '.inputWidget', function () {
      console.log("specific widget");
      $('.specificwidgetsubmit').removeClass("disabled");
    });
    $(document).on('keypress', '.popuptitle', function () {
      console.log("pop-up");
      $('.popupsubmit').removeClass("disabled");
    });
    $(".button_widget_form").on("submit", function (e) {
      e.preventDefault();
      console.log("edit form submit");
      that.settings.selectbox = $(".selectbox").val(); //that.widget.reMount(that.settings);

      if ($.trim($(".buttonName").val()) === "") {
        displayNotification("Please fill the button name field", 'error');
        return false;
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
      }
    });
  };

  this.saveurl = function (ev) {
    var that = this;
    ev.preventDefault(); //this.settings.url= $(this).find("externalurlval").val();

    that.settings.url = $(".externalurlval").val();
    that.settings.name = $(".buttonName").val();
    that.settings.align = $(".button-align option:selected").val();
    that.settings.target = "_blank";
    that.settings.specifipage = "";
    that.settings.nextval = "";
    that.settings.prevval = "";
    that.settings.specificwidget = "";
    that.settings.popuptitle = "";
    that.settings.popupcontent = "";
    displayNotification("successfully submitted");
    that.widget.reMount(that.settings);
    that.widget.closeAddModal();
  };

  this.specificnumber = function (ev) {
    var that = this;
    ev.preventDefault(); //this.settings.specificnumber= $(this).find("specificnum").val();

    that.settings.specifichapter = $(".inputChapter").val();
    that.settings.specifipage = $(".inputPage").val();
    that.settings.name = $(".buttonName").val();
    that.settings.align = $(".button-align option:selected").val();
    that.settings.target = "_self";
    console.log(that.settings.specifichapter + ' - ' + that.settings.specifipage);
    that.settings.specifichapterid = $courseJson.index[that.settings.specifichapter].id;
    that.settings.url = "";
    that.settings.nextval = "";
    that.settings.prevval = "";
    that.settings.specificwidget = "";
    that.settings.popuptitle = "";
    that.settings.popupcontent = "";
    displayNotification("successfully submitted");
    that.widget.reMount(that.settings);
    that.widget.closeAddModal(); //$(`[data-id = "${that.settings.specifipage}"]`).click();
  };

  this.nextfunc = function (e) {
    var that = this;
    e.preventDefault();
    that.settings.name = $(".buttonName").val();
    that.settings.align = $(".button-align option:selected").val();
    that.settings.target = "_self";
    that.settings.nextval = $(".nextval").val();
    that.settings.url = "";
    that.settings.specifipage = "";
    that.settings.prevval = "";
    that.settings.specificwidget = "";
    that.settings.popuptitle = "";
    that.settings.popupcontent = "";
    displayNotification("successfully submitted");
    that.widget.reMount(that.settings);
    that.widget.closeAddModal();
  };

  this.previousfunc = function (e) {
    var that = this;
    e.preventDefault();
    that.settings.name = $(".buttonName").val();
    that.settings.align = $(".button-align option:selected").val();
    that.settings.target = "_self";
    that.settings.prevval = $(".prevval").val();
    that.settings.url = "";
    that.settings.specifipage = "";
    that.settings.nextval = "";
    that.settings.specificwidget = "";
    that.settings.popuptitle = "";
    that.settings.popupcontent = "";
    displayNotification("successfully submitted");
    that.widget.reMount(that.settings);
    that.widget.closeAddModal();
  };

  this.specificwidget = function (e) {
    var that = this;
    e.preventDefault();
    that.settings.name = $(".buttonName").val();
    that.settings.align = $(".button-align option:selected").val();
    that.settings.specificwidget = $(".inputWidget").val();
    that.settings.target = "_self";
    that.settings.url = "";
    that.settings.specifipage = "";
    that.settings.nextval = "";
    that.settings.prevval = "";
    that.settings.popuptitle = "";
    that.settings.popupcontent = "";
    displayNotification("successfully submitted");
    that.widget.reMount(that.settings);
    that.widget.closeAddModal();
  };

  this.popupwidget = function (e) {
    var that = this;
    e.preventDefault();
    that.settings.name = $(".buttonName").val();
    that.settings.align = $(".button-align option:selected").val();
    that.settings.popuptitle = $(".popuptitle").html();
    that.settings.popupcontent = $(".popupcontent").html();
    that.settings.target = "_self";
    /* for specific page */

    that.settings.specifichapterpopup = $(".inputChapterpopup").val();
    that.settings.specifipagepopup = $(".inputPagepopup").val();
    console.log(that.settings.specifichapterpopup + ' - ' + that.settings.specifipagepopup);
    that.settings.specifichapteridpopup = $courseJson.index[that.settings.specifichapterpopup].id;
    that.settings.url = "";
    that.settings.specifipage = "";
    that.settings.nextval = "";
    that.settings.prevval = "";
    that.settings.specificwidget = "";
    displayNotification("successfully submitted");
    that.widget.reMount(that.settings);
    that.widget.closeAddModal();
  };
}

Button_widget.prototype = Object.create(MainWidget.prototype);