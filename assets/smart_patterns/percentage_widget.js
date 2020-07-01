function Percentage_widget() {
  this.init = function () {
    this.settings = {
      "question": "",
      "feedback": "",
      "yesresponse": "",
      "answer": "",
      "onewordans": "",
      "noresponse": "",
      "orignalanswer": "",
      "questiontxt": "",
      "feedbacktxt": "",
      "yesresponsetxt": "",
      "noresponsetxt": ""
    };
    this.widget = new Widget(this.settings);
    this.widget.openAddModal(this.getFormHTML());
    this.bindAddFormEvents();
    return this.widget.getWidgetId();
  };

  this.edit = function () {
    this.widget.openAddModal(this.getFormHTML());
    /* enableCkeditor("expfeedback");
    enableCkeditor("expresponse_yes"); */

    this.bindEditFormEvents();
  };

  this.getFormHTML = function () {
    var html = $("\n        <div class=\"widget-settings-wrapper percentage-widget-modal mdwrap\">\n            <form id=\"percentage_widget_form\" class=\"form-settings modalBody percentage_widget_form\">\n                <div class=\"form-group row\">\n                    <div class=\"col-sm-12\">\n                        <label class=\"modalLabel custom-label-box4\">Question stem</label>\n                        <div id=\"ques\" class=\"fw-input form-element form-control\" contenteditable=\"true\">".concat(this.settings.question, "</div>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                <!--<div>\n                        <label class=\"modalLabel custom-label-box4\"> Is it one word answer? </label>\n                        <input type=\"radio\" name=\"oneword\" value=\"yes\"> Yes\n                        <input type=\"radio\" name=\"oneword\" value=\"no\"> No\n                    </div> -->\n                     \n                    <div class=\"\">\n                        <label class=\"modalLabel custom-label-box4\">Is it one word answer?</label>\n                        <label class=\"switch switch-flat custom-label-box4\">\n                            <input class=\"switch-input\" type=\"checkbox\" id=\"oneword\" value=\"yes\" ").concat(this.settings.onewordans ? 'checked' : '', "/>\n                            <span class=\"switch-label\" data-on=\"Yes\" data-off=\"No\"></span> \n                            <span class=\"switch-handle\"></span> \n                        </label>\n                    </div>\n\n\n                </div>\n                <div class=\"outputdom\"></div>\n                \n            </form>\n        </div> \n        "));
    var that = this;
    var no_html = "\n            <div class=\"form-group row exp-response\">\n                <div class=\"col-sm-12\">\n                    <label class=\"modalLabel custom-label-box4\">Expert Response</label>\n                    <div id=\"expresponse_no\" class=\"fw-input form-element form-control\" contenteditable=\"true\">".concat(that.settings.noresponse, "</div>\n                </div>\n            </div>\n            <div class=\" float-right\"><button type=\"submit\" class=\"modalBtn yesBtn\">Apply</button></div>\n        ");
    var yes_html = "\n            <div class=\"form-group row answer\">\n                <div class=\"col-sm-12\">\n                    <label class=\"modalLabel custom-label-box4\">One Word Answer</label>\n                    <input type=\"text\" id=\"answer\" class=\"fw-input form-element form-control\" pattern=\"^[A-Za-z0-9][A-Za-z0-9]*$\" title=\"Please enter one word only.\" autocomplete=\"off\" value=\"".concat(that.settings.orignalanswer, "\" />\n                </div>\n            </div>\n            <div class=\"form-group row feedback\">\n                <div class=\"col-sm-12\">\n                <label class=\"modalLabel custom-label-box4\">Feedback</label>\n                <div id=\"expfeedback\" class=\"fw-input\" contenteditable=\"true\">").concat(that.settings.feedback, "</div>\n                </div>\n            </div>\n            <div class=\"form-group row exp-response\">\n                <div class=\"col-sm-12\">\n                <label class=\"modalLabel custom-label-box4\">Expert Response</label>\n                <div id=\"expresponse_yes\" class=\"fw-input form-element form-control\" contenteditable=\"true\">").concat(that.settings.yesresponse, "</div>\n                </div>\n            </div>\n            <div class=\" float-right\"><button type=\"submit\" class=\"modalBtn yesBtn\">Apply</button></div>\n        ");
    html.find("#oneword").click(function () {
      if ($("#oneword:checked").val() === 'yes') {
        html.find(".outputdom").html(yes_html);
        enableCkeditor("expfeedback");
        enableCkeditor("expresponse_yes");
      } else {
        html.find(".outputdom").html(no_html);
        enableCkeditor('expresponse_no');
      }
    });

    if (that.settings.onewordans === "yes") {
      html.find(".outputdom").html(yes_html);
    } else {
      html.find(".outputdom").html(no_html);
    }

    return html;
  };

  this.bindAddFormEvents = function () {
    var that = this;
    enableCkeditor('ques');

    if ($('#expresponse_no').length > 0) {
      enableCkeditor('expresponse_no');
    }

    if ($('#expresponse_yes').length > 0) {
      enableCkeditor("expfeedback");
      enableCkeditor("expresponse_yes");
    }

    $(".percentage_widget_form").on("submit", function (e) {
      e.preventDefault();
      that.settings.question = $("#ques").html();
      that.settings.feedback = $("#expfeedback").html();
      that.settings.yesresponse = $("#expresponse_yes").html();
      that.settings.noresponse = $("#expresponse_no").html();
      that.settings.orignalanswer = $("#answer").val();
      that.settings.questiontxt = $("#ques").text();
      that.settings.feedbacktxt = $("#expfeedback").text();
      that.settings.yesresponsetxt = $("#expresponse_yes").text();
      that.settings.noresponsetxt = $("#expresponse_no").text(); //that.settings.onewordans = $("input[name='oneword']:checked").val();

      that.settings.onewordans = $("#oneword:checked").val();

      if ($("#oneword:checked").val() === 'yes') {
        that.settings.noresponse = '';
        that.settings.answer = $("#answer").val().toLowerCase();

        if (that.settings.questiontxt && that.settings.feedbacktxt && that.settings.yesresponsetxt && that.settings.answer) {
          that.widget.insert(that.settings);
          that.widget.closeAddModal();
        } else {
          displayNotification("Please fill all the fields", 'error');
          return false;
        }
      } else {
        that.settings.feedback = '';
        that.settings.yesresponse = '';
        that.settings.orignalanswer = '';

        if (that.settings.questiontxt && that.settings.noresponsetxt) {
          //return true;
          that.widget.insert(that.settings);
          that.widget.closeAddModal();
        } else {
          displayNotification("Please fill all the fields", 'error');
          return false;
        }
      }
    });
  };

  this.bindEditFormEvents = function () {
    var that = this;
    enableCkeditor('ques');

    if ($('#expresponse_no').length > 0) {
      enableCkeditor('expresponse_no');
    }

    if ($('#expresponse_yes').length > 0) {
      enableCkeditor("expfeedback");
      enableCkeditor("expresponse_yes");
    }

    $(".percentage_widget_form").on("submit", function (e) {
      e.preventDefault();
      that.settings.question = $("#ques").html();
      that.settings.feedback = $("#expfeedback").html();
      that.settings.yesresponse = $("#expresponse_yes").html();
      that.settings.noresponse = $("#expresponse_no").html();
      that.settings.orignalanswer = $("#answer").val();
      that.settings.questiontxt = $("#ques").text();
      that.settings.feedbacktxt = $("#expfeedback").text();
      that.settings.yesresponsetxt = $("#expresponse_yes").text();
      that.settings.noresponsetxt = $("#expresponse_no").text(); //that.settings.onewordans = $("input[name='oneword']:checked").val();

      that.settings.onewordans = $("#oneword:checked").val();

      if ($("#oneword:checked").val() === 'yes') {
        that.settings.noresponse = '';
        that.settings.answer = $("#answer").val().toLowerCase();

        if (that.settings.questiontxt && that.settings.feedbacktxt && that.settings.yesresponsetxt && that.settings.answer) {
          that.widget.reMount(that.settings);
          that.widget.closeAddModal();
        } else {
          displayNotification("Please fill all the fields", 'error');
          return false;
        }
      } else {
        that.settings.feedback = '';
        that.settings.yesresponse = '';
        that.settings.orignalanswer = '';

        if (that.settings.questiontxt && that.settings.noresponsetxt) {
          //return true;
          that.widget.reMount(that.settings);
          that.widget.closeAddModal();
        } else {
          displayNotification("Please fill all the fields", 'error');
          return false;
        }
      }
    });
  };
}

Percentage_widget.prototype = Object.create(MainWidget.prototype);