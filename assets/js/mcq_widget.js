function Mcq_widget() {
  this.init = function () {
    this.settings = {
      "question": "",
      "options": ['', ''],
      "correct_answer": [],
      "feedback_box": "",
      "Total_attempt": "2",
      "seeWhy": "",
      "submitColor": "#6A6C6D",
      "submitHover": "#000000",
      "bgColor": "#ffffff",
      "optionColor": "#dadada",
      //"globalfeedbackselect": "",
      "feedbackoption": ['', '']
    };
    this.widget = new Widget(this.settings);
    this.widget.openAddModal(this.getFormHTML());
    this.bindAddFormEvents();
    return this.widget.getWidgetId();
  };

  this.edit = function () {
    this.widget.openAddModal(this.getFormHTML());
    var that = this;
    $('#btnColor').spectrum(getColorPickerForSpectrum(that.settings.submitColor));
    $('#btnHover').spectrum(getColorPickerForSpectrum(that.settings.submitHover));
    $('#backgroundColor').spectrum(getColorPickerForSpectrum(that.settings.bgColor));
    $('#optionColor').spectrum(getColorPickerForSpectrum(that.settings.optionColor));
    for (var i = 0; i < this.settings.options.length; i++) {
      enableCkeditor("id" + i);
    }

    $(".add_option").click(function (e) {
      e.preventDefault();
      var newid = makeid();
      $("#mcq_widget_form .options").append("<div class=\"col-sm-6\" id=\"".concat(that.settings.id, "\">\n                    <div class=\"option\">\n                        <label class=\"modalLabel custom-label-box4\">Option text:</label>\n                        <div class=\"posRel pr30\">\n                            <div contenteditable=\"true\" class=\"fw-input form-control option_text\" id=\"id_").concat(newid, "\"></div>\n                            <a class=\"delete_button\" href=\"javascript:void(0)\" id=\"").concat(that.settings.id, "\">\n                                <i class=\"fa fa-trash\"></i>\n                            </a>\n                        </div>\n                        <a class=\"correct_button\" href=\"javascript:void(0);\">Mark as correct</a>\n                        <label class=\"modalLabel custom-label-box4\">Feedback Option:</label>\n                        <div class=\"posRel pr30\">\n                            <textarea name=\"feedbackbox\" class=\"feedbackbox fw-input form-control\"></textarea>\n                        </div>\n                    </div>\n            </div>"));
      enableCkeditor("id_"+newid)
    });
    $('.mcq_modal').find('#saveData').removeClass('disabled');
    $('#mcq_widget_form').on("mouseover", ".option", function () {
      $(this).find(".correct_button").show();
    });
    $('#mcq_widget_form').on("mouseleave", ".option", function (e) {
      $(this).find(".correct_button").hide();
    });
    $('#mcq_widget_form').on("click", ".delete_button", function (e) {
      e.preventDefault();
      var optionLength = $("#mcq_widget_form").find(".col-sm-6").length;

      if (optionLength == 2) {
        displayNotification("Please add at-least 2 option");
      } else {
        $(this).closest('.col-sm-6').remove();
      } //$(this).closest('.option').parent().remove();

    });
    $('#mcq_widget_form').on("click", ".correct_button", function (e) {
      e.preventDefault();
      $(this).parent().toggleClass("correct_answer");

      if ($('#mcq_widget_form').parent().find('.correct_answer').length > 0) {
        $('.mcq_modal').find('#saveData').removeClass('disabled');
      } else {
        $('.mcq_modal').find('#saveData').addClass('disabled');
      }
    }); //  save the button to show the editor

    $("#mcq_widget_form").on("submit", function (e) {
      e.preventDefault();
      var isValid = true;
      $("#mcq_widget_form .option .option_text").each(function (item) {
        if ($(this).text() == '') {
          isValid = false;
        }
      });

      if (!isValid) {
        alert("Please input a Value");
        return;
      }

      totalTryCount = 0;
      that.settings.question = $(e.target).find("#ques_title").html();
      that.settings.Total_attempt = $(e.target).find("[name='total_attempt']").val();
      that.settings.seeWhy = $(e.target).find("[name='seewhy']:checked").val();
      that.settings.bgColor = $('.backgroundColor').find('.sp-preview-inner').css("background-color");
      that.settings.optionColor = $('.optionColor').find('.sp-preview-inner').css("background-color");
      that.settings.submitColor = $('.buttonColor').find('.sp-preview-inner').css("background-color");
      that.settings.submitHover = $('.buttonHover').find('.sp-preview-inner').css("background-color");

      if (that.settings.options.length == 2 && that.settings.options[0] == '' && that.settings.options[1] == '') {
        that.settings.options = [];
      }

      that.settings.options = [];
      $("#mcq_widget_form .option .option_text").each(function (item) {
        if ($(this).html() != '') {
          //  that.settings.options.push($(this).val());
          var textareaVal = $(this).parent().parent().find('textarea').val();
          that.settings.options.push({
            "textValue": $(this).html(),
            "feedbackoption": textareaVal
          });
        }
      });
      that.settings.correct_answer = [];
      $("#mcq_widget_form .correct_answer.option .option_text").each(function (item2) {
        that.settings.correct_answer.push({
          correctAns: $(this).html(),
          optIndex: $(this).closest('.col-sm-6').index()
        });
      });
      that.widget.reMount(that.settings);
      that.widget.closeAddModal();
    });
    enableCkeditor("ques_title");
  };

  this.getFormHTML = function () {
    var that = this;
    var html = $("\n            <div class=\"widget-settings-wrapper mdwrap mcq-widget-modal\">\n                <form id=\"mcq_widget_form\" class=\"form-settings mcq_modal modalBody\">\n                 <div class=\"row\">  \n                    <div class=\"col-sm-12 form-group\">\n                        <label class=\"modalLabel custom-label-box4\">Question stem</label>\n                        <div contenteditable=\"true\" name=\"title\" id=\"ques_title\" class=\"fw-textarea form-control form-element\" required>".concat(this.settings.question, "</div>\n                    </div>\n                    <div class=\"col-md-12 form-group mb-0\">\n                        <div class=\"text-right\">\n                            <label class=\"modalLabel custom-label-box4\"> Max Total Attempts </label>\n                            <label class=\"pl-2\"> <input type=\"number\" class=\"form-control form-file-element width87px\" name=\"total_attempt\" min=\"1\" max=\"10\" required value=\"").concat(this.settings.Total_attempt, "\"></input>\n                            </label>\n                        </div>\n                    </div>\n                  </div>\n                  <div class=\"row mb-2\" >\n                    <div class=\"col-sm-12\">\n                        <label class=\"modalLabel custom-label-box4\">See Why</label>\n                        <label class=\"switch switch-flat\"> \n                            <input class=\"switch-input seeWhyOption\" type=\"checkbox\" name=\"seewhy\" value=\"yes\" ").concat(this.settings.seeWhy ? 'checked' : '', "/>\n                            <span class=\"switch-label\" data-on=\"Yes\" data-off=\"No\">\n                            </span> \n                            <span class=\"switch-handle\"></span> \n                        </label>\n                    </div>\n                  </div>\n          <div id=\"accordion2\" class=\"advance-setting-accordion\">\n                        <div class=\"card\">\n                            <div class=\"card-header advance_setting_hedaer\" id=\"heading_One\">\n                                <h2 class=\"mb-0\">\n                                    <span class=\"advanceSetting d-flex  btn btn-link collapsed ml-0\" data-toggle=\"collapse\" data-target=\"#collapsesettings\" aria-expanded=\"false\" aria-controls=\"collapseOne\">\n                                    More Settings \n                                    </span>\n                                </h2>\n                                <span class=\"advance-accordian-arrow collapsed\" data-toggle=\"collapse\" data-target=\"#collapsesettings\" aria-expanded=\"false\" aria-controls=\"collapseOne\"><i class=\"fa fa-angle-down rotate-icon\"></i></span>\n                            </div>\n                            <div id=\"collapsesettings\" class=\"collapse\" aria-labelledby=\"heading_One\" data-parent=\"#accordion2\">\n                                <div class=\"card-body advance_setting_body\">\n                                <div class=\"row\">\n                                    <div class=\"col-sm-3\">\n                                        <div class=\"form-group\">\n                                            <label class=\"form-element-label custom-label-box4\">Background Color</label>\n                                                <div class=\"backgroundColor\"><input type=\"text\" id=\"backgroundColor\" class=\"form-control  form-element\"  name=\"bg-color\" value=\"").concat(this.settings.bgColor, "\">\n                                        </div>\n                                    </div>\n</div>  <div class=\"col-sm-3\">\n                                        <div class=\"form-group\">\n                                            <label class=\"form-element-label custom-label-box4\">Button Color</label>\n                                                <div class=\"buttonColor\"><input type=\"text\" id=\"btnColor\" class=\"form-control  form-element\"  name=\"btn-color\" value=\"").concat(this.settings.submitColor, "\">\n                                        </div>\n                                    </div>\n       </div> \n  <div class=\"col-sm-3\">\n                                        <div class=\"form-group\">\n                                            <label class=\"form-element-label custom-label-box4\">Button Hover</label>\n                                                <div class=\"buttonHover\"><input type=\"text\" id=\"btnHover\" class=\"form-control  form-element\"  name=\"btn-border-color\" value=\"").concat(this.settings.submitHover, "\">\n                                        </div>\n                                    </div>\n       </div>   \n<div class=\"col-sm-3\">\n                                        <div class=\"form-group\">\n                                            <label class=\"form-element-label custom-label-box4\">Option Color</label>\n                                                <div class=\"optionColor\"><input type=\"text\" id=\"optionColor\" class=\"form-control  form-element\"  name=\"option-color\" value=\"").concat(this.settings.optionColor, "\">\n                                        </div>\n                                    </div>\n       </div>                        </div> \n                                 </div>     \n</div>     <div class=\"row options\">\n                        <div class=\"col-sm-6\">\n                            <div class='option'>\n                                <label class=\"modalLabel custom-label-box4\">Option text:</label>\n                                <div class=\"posRel pr30\">\n                                    <input type=\"text\" class=\"fw-input form-control form-element\" required value=''></input>\n                                    <a class='delete_button' href='javascript:void(0)'> \n                                        <i class=\"fa fa-trash\"></i>\n                                    </a>\n                                </div>\n                                <a class='correct_button' href='javascript:void(0);'>Mark as correct</a>\n                            </div>\n                        </div>\n                        <div class=\"col-sm-6\">\n                            <div class='option'>\n                                <label class=\"modalLabel custom-label-box4\">Option text:</label>\n                                <div class=\"posRel pr30\">\n                                    <input type=\"text\" class=\"fw-input form-control form-element\" required value=''></input>\n                                    <a class='delete_button' href='javascript:void(0)'>\n                                        <i class=\"fa fa-trash\"></i>\n                                    </a>\n                                </div>\n                                <a class='correct_button' href='javascript:void(0);'>Mark as correct</a>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"text-right\">\n                        <button  class=\"modalBtn cancelBtn add_option\"><i class=\"fa fa-plus\"></i>&nbsp;Add Option</button>\n                        <button type=\"submit\" class=\"modalBtn yesBtn disabled\" id=\"saveData\">Apply</button>\n                    </div>\n                </form>\n            </div>\n\n        "));
    $(html).find('.options').html('');
    var correctindices = [];

    for (i = 0; i < this.settings.options.length; i++) {
      for (j = 0; j < this.settings.correct_answer.length; j++) {
        if (this.settings.options[i].textValue === this.settings.correct_answer[j].correctAns) {
          correctindices[j] = i;
        }
      }
    }

    this.settings.options.forEach(function (option, index) {
      var isCorrect = false;

      if (correctindices.indexOf(index) !== -1) {
        isCorrect = true;
      }

      if (!option || !option.textValue) {
        option = {};
        option['textValue'] = "";

        if (!option || !option.feedbackoption) {
          option['feedbackoption'] = "";
        }
      }

      $(html).find('.options').append("\n            <div class=\"col-sm-6\">\n            <div class=\"option ".concat(isCorrect ? 'correct_answer' : '', "\">\n                 <label class=\"modalLabel custom-label-box4\">Option text:</label>\n                 <div class=\"posRel pr30\">\n                     <div contenteditable=\"true\" id=\"id").concat(index, "\" type=\"text\" class=\"option_text fw-input form-control form-element\" required>").concat(option.textValue, "</div>\n                     <a class=\"delete_button\" href=\"javascript:void(0)\">\n                         <i class=\"fa fa-trash\"></i>\n                     </a>\n                 </div>\n                 <label class=\"modalLabel custom-label-box4\">Feedback Option:</label>\n                  <div class=\"posRel pr30\">\n                     <textarea name=\"feedbackbox\" class=\"feedbackbox fw-input form-control\">").concat(option.feedbackoption, "</textarea>\n                 </div>\n                 <a class=\"correct_button\" style=\"display:none;\" href=\"javascript:void(0);\">Mark as correct</a>\n                </div>\n            </div>"));
    });
    return html;
  };

  this.bindAddFormEvents = function () {
    enableCkeditor("ques_title");
    

    for (var i = 0; i < this.settings.options.length; i++) {
      enableCkeditor("id" + i);
    }

    var that = this;
    $('#btnColor').spectrum(getColorPickerForSpectrum(that.settings.submitColor));
    $('#btnHover').spectrum(getColorPickerForSpectrum(that.settings.submitHover));
    $('#backgroundColor').spectrum(getColorPickerForSpectrum(that.settings.bgColor));
    $('#optionColor').spectrum(getColorPickerForSpectrum(that.settings.optionColor));
    $(".add_option").click(function (e) {
      e.preventDefault();
      var newid = makeid();
      $("#mcq_widget_form .options").append("<div class=\"col-sm-6\" id=\"".concat(that.settings.id, "\">\n                    <div class=\"option\">\n                        <label class=\"modalLabel custom-label-box4\">Option text:</label>\n                        <div class=\"posRel pr30\">\n                            <div contenteditable=\"true\" class=\"fw-input form-control form-element option_text\" id=\"id_").concat(newid, "\"></div>\n                            <a class=\"delete_button\" href=\"javascript:void(0)\" id=\"").concat(that.settings.id, "\">\n                                <i class=\"fa fa-trash\"></i>\n                            </a>\n                        </div>\n                        <a class=\"correct_button\" href=\"javascript:void(0);\">Mark as correct</a>\n                        <label class=\"modalLabel custom-label-box4\">Feedback Option:</label>\n                        <div class=\"posRel pr30\">\n                            <textarea name=\"feedbackbox\" class=\"feedbackbox fw-input form-control\"></textarea>\n                        </div>\n                    </div>\n                </div>"));
      enableCkeditor("id_" + newid);
    });
    var $defaultRadioButtonVal = $('input:radio[name=globalfeedbackbox]');

    if ($defaultRadioButtonVal.is(':checked') === false) {
      $defaultRadioButtonVal.filter('[value=No]').prop('checked', true);
    }

    var radioValue = $("input[name='globalfeedbackbox']:checked").val();

    if (radioValue == 'No') {
      $('#feedback').prop("required", false);
    }

    $('#mcq_widget_form').on("mouseover", ".option", function () {
      $(this).find(".correct_button").show();
    });
    $('#mcq_widget_form').on("mouseleave", ".option", function (e) {
      $(this).find(".correct_button").hide();
    });
    $('#mcq_widget_form').on("click", ".delete_button", function (e) {
      e.preventDefault();
      var optionLength = $("#mcq_widget_form").find(".col-sm-6").length;

      if (optionLength == 2) {
        displayNotification("Please add at-least 2 option");
      } else {
        $(this).closest('.col-sm-6').remove();
      }
    });
    $('#mcq_widget_form').on("click", ".correct_button", function (e) {
      e.preventDefault();
      $(this).parent().toggleClass("correct_answer");

      if ($('#mcq_widget_form').parent().find('.correct_answer').length > 0) {
        $('.mcq_modal').find('#saveData').removeClass('disabled');
      } else {
        $('.mcq_modal').find('#saveData').addClass('disabled');
      }
    }); // $('#mcq_widget_form').on("click", ".delete_button", function (e) {
    //     e.preventDefault();
    //     var delIndex = $(this).closest('.col-sm-6').index()
    //     delete that.settings.options[delIndex];
    //     $(this).parents('.option').remove();
    // });

    $("#mcq_widget_form").on("submit", function (e) {
      e.preventDefault();

      if ($('#mcq_widget_form').parent().find('.correct_answer').length <= 0) {
        return;
      }

      if ($('#mcq_widget_form').parent().find('.correct_answer').length > 1) {
        if ($("#mcq_widget_form").find(".col-sm-6").length < 4) {
          displayNotification("Please add at-least 4 options");
          return;
        }
      }

      var isValid = true;
      $("#mcq_widget_form .option .option_text").each(function (item) {
        if ($(this).text() == '') {
          isValid = false;
        }
      });

      if (!isValid) {
        displayNotification("Please input a Value", 'error');
        return;
      }

      that.settings.question = $(e.target).find("#ques_title").html();
      that.settings.Total_attempt = $(e.target).find("[name='total_attempt']").val();
      that.settings.seeWhy = $(e.target).find("[name='seewhy']:checked").val();
      that.settings.bgColor = $('.backgroundColor').find('.sp-preview-inner').css("background-color");
      that.settings.optionColor = $('.optionColor').find('.sp-preview-inner').css("background-color");
      that.settings.submitColor = $('.buttonColor').find('.sp-preview-inner').css("background-color");
      that.settings.submitHover = $('.buttonHover').find('.sp-preview-inner').css("background-color");

      if (that.settings.options.length == 2 && that.settings.options[0] == '' && that.settings.options[1] == '') {
        that.settings.options = [];
      }

      $("#mcq_widget_form .option .option_text").each(function (item) {
        if ($(this).html() != '') {
          var textareaVal = $(this).parent().parent().find('textarea').val();
          that.settings.options.push({
            "textValue": $(this).html(),
            "feedbackoption": textareaVal
          });
        }
      });
      $("#mcq_widget_form .correct_answer.option .option_text").each(function (item2) {
        that.settings.correct_answer.push({
          correctAns: $(this).html(),
          optIndex: $(this).closest('.col-sm-6').index()
        });
      });
      that.widget.insert(that.settings);
      that.widget.closeAddModal();
    });
  };
}

Mcq_widget.prototype = Object.create(MainWidget.prototype);