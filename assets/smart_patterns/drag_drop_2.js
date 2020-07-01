function Drag_drop_2() {
    this.init = function () {
      this.settings = {
        "question": "",
        "stepsAnswer": [],
        "stepsOption": [],
        "feedbackOption":[],
        "align": "",
        "submit":"yes",
        "bgColor":"#ffffff",
        "submitColor":"#6A6C6D",
        "submitHover":"#000000",
        "optionColor":"#ffffff",
        "questionBackground":"#ffffff",
        "submitText":"#ffffff",
        "url":"",
        "backgroundColorSelected":"0",
        "submitAlign":"right"
      };
      this.widget = new Widget(this.settings);
      this.widget.openAddModal(this.getFormHTML());
      this.bindAddFormEvents();
      return this.widget.getWidgetId();
    }; // https://www.w3schools.com/html/mov_bbb.mp4
    // https://www.html5rocks.com/en/tutorials/video/basics/devstories.webm
  
  
    this.edit = function () {
      this.widget.openAddModal(this.getFormHTML());
      this.bindEditFormEvents();
    };
  
    this.getFormHTML = function () {
      var html = $("\n        <div class=\"widget-settings-wrapper mdwrap dd-widget-modal\">\n        <form id=\"dragdrop_widget_form\" class=\"form-settings dd_modal modalBody\">\n            <div class=\"row\">  \n                <div class=\"col-sm-12 form-group\">\n                    <label class=\"modalLabel\">Question Stem</label>\n                    <div contenteditable=\"true\" name=\"title\" id=\"ques_title\" class=\"fw-textarea form-control\"  required>".concat(this.settings.question, "</div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-sm-12 form-group mbot-0\">\n                    <label class=\"modalLabeldnd\"> Alignment </label>\n                    <div>\n                        <label class=\"radio-container col margin0 d-inline form-element-label\">Horizontal\n                        <input id=\"horizontal\" type=\"radio\" name=\"align\" value=\"1\" checked=\"\">\n                            <span class=\"circlemark\"></span>\n                        </label>\n\n                        <label class=\"radio-container col margin0 d-inline form-element-label\">Vertical\n                        <input id=\"vertical\" type=\"radio\" name=\"align\" value=\"2\" checked=\"\">\n                            <span class=\"circlemark\"></span>\n                        </label>\n                    </div>\n                    \n                </div>\n            </div>\n    <div id=\"accordion2\" class=\"advance-setting-accordion\">\n                        <div class=\"card\">\n                            <div class=\"card-header advance_setting_hedaer\" id=\"heading_One\">\n                                <h2 class=\"mb-0\">\n                                    <span class=\"advanceSetting d-flex  btn btn-link collapsed ml-0\" data-toggle=\"collapse\" data-target=\"#collapsesettings\" aria-expanded=\"false\" aria-controls=\"collapseOne\">\n                                    More Settings \n                                    </span>\n                                </h2>\n                                <span class=\"advance-accordian-arrow collapsed\" data-toggle=\"collapse\" data-target=\"#collapsesettings\" aria-expanded=\"false\" aria-controls=\"collapseOne\"><i class=\"fa fa-angle-down rotate-icon\"></i></span>\n                            </div>\n                            <div id=\"collapsesettings\" class=\"collapse\" aria-labelledby=\"heading_One\" data-parent=\"#accordion2\">\n                                <div class=\"card-body advance_setting_body\">\n                                <div class=\"row\">\n                                    <div class=\"col-sm-3\">\n                                        <div class=\"form-group\">\n                                            <label class=\"form-element-label custom-label-box4\">Background Color</label>\n                                                <div class=\"backgroundColor\"><input type=\"text\" id=\"backgroundColor\" class=\"form-control  form-element\"  name=\"bg-color\" value=\"").concat(this.settings.bgColor, "\">\n                                        </div>\n                                    </div>\n</div>  <div class=\"col-sm-3\">\n                                        <div class=\"form-group\">\n                                            <label class=\"form-element-label custom-label-box4\">Button Color</label>\n                                                <div class=\"buttonColor\"><input type=\"text\" id=\"btnColor\" class=\"form-control  form-element\"  name=\"btn-color\" value=\"").concat(this.settings.submitColor, "\">\n                                        </div>\n                                    </div>\n       </div> \n  <div class=\"col-sm-3\">\n                                        <div class=\"form-group\">\n                                            <label class=\"form-element-label custom-label-box4\">Button Hover</label>\n                                                <div class=\"buttonHover\"><input type=\"text\" id=\"btnHover\" class=\"form-control  form-element\"  name=\"btn-border-color\" value=\"").concat(this.settings.submitHover, "\">\n                                        </div>\n                                    </div>\n       </div>   \n<div class=\"col-sm-3\">\n                                        <div class=\"form-group\">\n                                            <label class=\"form-element-label custom-label-box4\">Option Color</label>\n                                                <div class=\"optionColor\"><input type=\"text\" id=\"optionColor\" class=\"form-control  form-element\"  name=\"option-color\" value=\"").concat(this.settings.optionColor, "\">\n                                        </div>\n                                    </div>\n       </div>                        </div> \n  <div class=\"row\"><div class=\"col-sm-3\">\n                                        <div class=\"form-group\">\n                                            <label class=\"form-element-label custom-label-box4\">Question Background</label>\n                                                <div class=\"questionBg\"><input type=\"text\" id=\"questionbg\" class=\"form-control  form-element\"  name=\"question-color\" value=\"").concat(this.settings.questionBackground, "\">\n                                        </div>\n                                    </div>\n       </div>  <div class=\"col-sm-3\">\n                                        <div class=\"form-group\">\n                                            <label class=\"form-element-label custom-label-box4\">Submit Text</label>\n                                                <div class=\"submitText\"><input type=\"text\" id=\"submitText\" class=\"form-control  form-element\"  name=\"submitText-color\" value=\"").concat(this.settings.submitText, "\">\n                                        </div>\n                                    </div>\n       </div>   <div class=\"form-group posRel_dnd pl0 col-md-3\">\n\t\t\t\t\t<label class=\"form-element-label custom-label-box4\">Background Image</label>\n                    <input type=\"file\" id=\"file\" input-attr-id=\"2\" class=\"form-control form-file-element\"  name=\"filename\" accept=\"image/*\">\n                </div>\n    <div class=\"form-group col-md-3\">\n                            <label class=\"form-element-label custom-label-box4\">Submit Alignment:</label>\n                            <select class=\"form-control form-file-element button-align\" id=\"button_align\">\n                                <option value=\"left\">Left Align</option>\n                                <option value=\"center\">Center Align</option>\n                                <option value=\"right\">Right Align</option>\n                            </select>\n                        </div>\n    </div>   </div>                        </div>     \n</div>      </div>   <div class=\"row stepsOption\">\n                <div class=\"col-md-12\">\n                    <div class=\"row ques_opt_row\">\n                        <div class=\"col-sm-4\" >\n                            <div class='Q_option'>\n                                <label class=\"modalLabel\">Option Text:</label>\n                                    <div class=\"posRel\">\n                                        <input type=\"text\" class=\"fw-input form-control\" required></input>\n                                    </div>\n                            </div>\n                        </div>\n    <div class=\"col-sm-4\" >\n                            <div class='Q_feed'>\n                                <label class=\"modalLabel\">Feedback Text:</label>\n                                    <div class=\"posRel\">\n                                        <input type=\"text\" class=\"fw-input form-control\" required></input>\n                                    </div>\n                            </div>\n                        </div>\n                    <div class=\"col-sm-4\">\n                            <div class='option'>\n                                <label class=\"modalLabel\">Answer Text:</label>\n                                <div class=\"posRel\">\n                                    <input type=\"text\" class=\"fw-input form-control\" required></input>\n                                    <a class=\"delete_button\" href=\"javascript:void(0)\">\n                                         <i class=\"fa fa-trash\"></i>\n                                    </a>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>     \n            </div> \n            <div class=\"text-right mt-4 mb-2\">\n                <button  class=\"modalBtn cancelBtn add_option\"><i class=\"fa fa-plus\"></i>&nbsp;Add Option</button>\n                <button type=\"submit\" class=\"modalBtn yesBtn \">Apply</button>\n            </div>\n        </form>    \n        ")); 
      //  $(html).find('.stepsOption').html('');
      
  
      $(html).find('.stepsOption').html('');
      $(html).find('.stepsOption').append("\n        <div class=\"col-md-12\">\n                <div class=\"row ques_opt_row\">\n                    <div class=\"col-sm-4\" >\n                            <label class=\"modalLabel\">Option Text:</label>\n                                <div class=\"posRel\">\n                                <div contenteditable=\"true\" id=\"id1\" type=\"text\" class=\"fw-input form-control option_text\" required></div>                                                 \n                                </div>\n                    </div>\n            <div class=\"col-sm-4\" >\n                            <label class=\"modalLabel\">Feedback Text:</label>\n                                <div class=\"posRel\">\n                                <div contenteditable=\"true\" id=\"id3\" type=\"text\" class=\"fw-input form-control feedback_text\" required></div>                                                 \n                                </div>\n                    </div>\n         <div class=\"col-sm-4\">\n                        <div class='option'>\n                            <label class=\"modalLabel\">Answer Text:</label>\n                            <div class=\"posRel\">\n                            <div contenteditable=\"true\" id=\"id2\"  class=\"answertText fw-input form-control \" required></div>             \n                                <a class=\"delete_button\" href=\"javascript:void(0)\">\n                                     <i class=\"fa fa-trash\"></i>\n                                </a>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div> ");
      /* var that = this;
      if(that.settings.align === "1") {
          $("#dragdrop_widget_form").find("input[name='align'][value='1']").prop("checked", true);
          
          //$("input[name='align'][value='1']").prop("checked", true);
      }
      else {
          $("#dragdrop_widget_form").find("input[name='align'][value='2']").prop("checked", true);
          
          //$("input[name='align'][value='2']").prop("checked", true);
      } */
  
      return html;
    };
  
    this.bindAddFormEvents = function () {
      enableCkeditor("ques_title");
      
      enableCkeditor("id1");
      enableCkeditor("id2");
      enableCkeditor("id3"); // for (var i = 0; i < this.settings.stepsOption.length; i++) {
      //     enableCkeditor("id" + i);
      // }
  
      var that = this;
      $('#btnColor').spectrum(getColorPickerForSpectrum(that.settings.submitColor));
      $('#btnHover').spectrum(getColorPickerForSpectrum(that.settings.submitHover));
      $('#backgroundColor').spectrum(getColorPickerForSpectrum(that.settings.bgColor));
      $('#optionColor').spectrum(getColorPickerForSpectrum(that.settings.optionColor));
      $('#questionbg').spectrum(getColorPickerForSpectrum(that.settings.questionBackground));
      $('#submitText').spectrum(getColorPickerForSpectrum(that.settings.submitText));
      $("#button_align").val(that.settings.submitAlign);
      $('.backgroundColor').find('.sp-preview-inner').parent().on("click",function(){
        that.settings.backgroundColorSelected = "1";
      })
      $('.backgroundColor').find('.sp-dd').parent().on("click",function(){
        that.settings.backgroundColorSelected = "1";
      })
      $('#dragdrop_widget_form input[type="file"]').change(function () {
        var ext = this.value.match(/\.(.+)$/)[1];
        var extSplit = ext.split('.');
        var lastExt = extSplit[extSplit.length - 1];
        that.settings.backgroundColorSelected = "0"
  
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
      $("#dragdrop_widget_form").on("submit", function (e) {
        e.preventDefault();
        var formData = new FormData(document.getElementById('dragdrop_widget_form'));
        that.settings.question = $(e.target).find("#ques_title").html();
        that.settings.stepsAnswer = [];
        that.settings.stepsOption = [];
        that.settings.feedbackOption = [];
        that.settings.bgColor = $('.backgroundColor').find('.sp-preview-inner').css("background-color");
        that.settings.optionColor = $('.optionColor').find('.sp-preview-inner').css("background-color");
        that.settings.submitColor = $('.buttonColor').find('.sp-preview-inner').css("background-color");
        that.settings.submitHover = $('.buttonHover').find('.sp-preview-inner').css("background-color");
        that.settings.questionBackground = $('.questionBg').find('.sp-preview-inner').css("background-color");
        that.settings.submitText = $('.submitText').find('.sp-preview-inner').css("background-color");
        that.settings.submitAlign = $("#button_align").val();
        var isValid = true;
        axios.post(appUrl + '/new-image', formData, {
          headers: {
            "course_path": $courseJson.courseDirPath,
            "token": localStorage.getItem('token')
          }
        }).then(function (result) {
          
          that.settings.url = $courseJson.courseDirPath + result.data.data;
          that.widget.reMount(that.settings);
        });
             
        if ($("#ques_title").text() == '') {
          isValid = false;
        }
  
        $("dragdrop_widget_form .stepsOption .option_text").each(function (item) {
          if ($(this).text() == '') {
            isValid = false;
          }
        });
        $("#dragdrop_widget_form .posRel .answertText").each(function (item) {
          if ($(this).text() == '') {
            isValid = false;
          }
        });
  
        if (!isValid) {
          displayNotification("Please Fill Blank Value");
          return;
        }
  
        var rowCount = $(".stepsOption").find(".ques_opt_row").length;
        
  
        // if (rowCount < 3) {
        //   displayNotification("Please add at-least 3 option");
        //   return false;
        // }
  
        $("#dragdrop_widget_form .stepsOption .option_text").each(function (item) {
          if ($(this).html() != '') {
            
            that.settings.stepsOption.push({
              "textValueOpt": $(this).html(),
              "correct": item
            });
          }
        });
        $("#dragdrop_widget_form .posRel .answertText").each(function (item) {
          if ($(this).html() != '') {
            that.settings.stepsAnswer.push({
              "textValue": $(this).html(),
              "correct": item
            });
          }
        });
        $("#dragdrop_widget_form .stepsOption .feedback_text").each(function (item) {
            if ($(this).html() != '') {
              that.settings.feedbackOption.push({
                "feedbackOptValue": $(this).html(),
                "correct": item
              });
            }
          });
        that.settings.align = $("input[name='align']:checked").val();
        
        that.widget.insert(that.settings);
        
        that.widget.closeAddModal();
     /*    debugger
        if(that.settings.submit == "checkSubmit"){
          debugger
          $(".clearfix").append(`<button type="submit" class="modalBtn yesBtn dndSubmitAnswer  disabled pull-right" id="submit_dndfeedback">Submit</button>`)
        } */
      });
      $('#dragdrop_widget_form').on("click", ".delete_button", function (e) {
        e.preventDefault();
        $(this).closest('.ques_opt_row').remove();
      });
      $(".add_option").click(function (e) {
        var that = this;
        e.preventDefault();
        var newid = makeid();
        $("#dragdrop_widget_form .stepsOption").append("\n            <div class=\"col-md-12\">\n                <div class=\"row ques_opt_row\">\n                    <div class=\"col-sm-4\" >\n                        <div class=\"Q_option\">\n                            <label class=\"modalLabel\">Option Text:</label>\n                                <div class=\"posRel\">\n                                    <div contenteditable=\"true\" class=\"fw-input form-control option_text\" id=\"id_".concat(newid, "\"></div>\n                                    \n                                </div>\n                        </div>\n                    </div> \n     <div class=\"col-sm-4\" >\n                        <div class=\"Q_feedback\">\n                            <label class=\"modalLabel\">Feedback Text:</label>\n                                <div class=\"posRel\">\n                                    <div contenteditable=\"true\" class=\"fw-input form-control feedback_text\" id=\"id3_").concat(newid, "\"></div>\n                                    \n                                </div>\n                        </div>\n                    </div> \n             <div class=\"col-sm-4\" >\n                        <div class=\"option\">\n                            <label class=\"modalLabel\">Answer Text:</label>\n                            <div class=\"posRel\">\n                                 <div contenteditable=\"true\" class=\"answertText fw-input form-control\" id=\"id1_").concat(newid, "\"></div>\n                               \n                                <a class=\"delete_button\" href=\"javascript:void(0)\">\n                                    <i class=\"fa fa-trash\"></i>\n                                </a>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n                    ")); //   $("#dragdrop_widget_form .stepsOption").append('<div class="col-sm-6" id="${that.settings.id}"><div class="Q_option"><label class="modalLabel">Option text:</label><div class="posRel pr30"><input type="text" class="fw-input form-control"></input></div>')
  
        enableCkeditor("id_" + newid);
        enableCkeditor("id1_" + newid);
        enableCkeditor("id3_" + newid);
      });
    };
  
    this.bindEditFormEvents = function () {
      enableCkeditor("ques_title");
  
      Array.prototype.clean = function (deleteValue) {
        for (var i = 0; i < this.length; i++) {
          if (this[i] == deleteValue) {
            this.splice(i, 1);
            i--;
          }
        }
  
        return this;
      };
  
      this.settings.stepsOption.clean(undefined);
      this.settings.feedbackOption.clean(undefined);
      this.settings.stepsAnswer.clean(undefined);
  
    
      if ($('.posRel').is(':visible')) {
        $('.posRel').remove();
      }
  
      if ($('.modalLabel').is(':visible')) {
        $('.modalLabel').remove();
      }
  
      var that = this;
      $('#btnColor').spectrum(getColorPickerForSpectrum(that.settings.submitColor));
      $('#btnHover').spectrum(getColorPickerForSpectrum(that.settings.submitHover));
      $('#backgroundColor').spectrum(getColorPickerForSpectrum(that.settings.bgColor));
      $('#optionColor').spectrum(getColorPickerForSpectrum(that.settings.optionColor));
      $('#questionbg').spectrum(getColorPickerForSpectrum(that.settings.questionBackground));
      $('#submitText').spectrum(getColorPickerForSpectrum(that.settings.submitText));
      $("#button_align").val(that.settings.submitAlign)
  
      this.settings.stepsOption.forEach(function (item, index) {
        
        // }
  
        var newid = makeid();
        $("#dragdrop_widget_form .stepsOption .col-md-12").append("\n                <div class=\"row ques_opt_row\">\n                    <div class=\"col-sm-4\">\n                        <div class=\"Q_option\">\n                        <label class=\"modalLabel\">Option Text:</label>\n                            <div class=\"posRel\">\n                                 <div contenteditable=\"true\" type=\"text\" class=\"fw-input form-control option_text\" id=\"id_".concat(newid, "\" >").concat(item.textValueOpt, "</div>\n                            </div>\n                        </div>\n                    </div>\n      <div class=\"col-sm-4\">\n                        <div class=\"Q_feedback\">\n                        <label class=\"modalLabel\">Feedback Text:</label>\n                            <div class=\"posRel\">\n                                 <div contenteditable=\"true\" type=\"text\" class=\"fw-input form-control feedback_text\" id=\"id3_").concat(newid, "\" >").concat(that.settings.feedbackOption[index].feedbackOptValue, "</div>\n                            </div>\n                        </div>\n                    </div>\n                 <div class=\"col-sm-4\">\n                        <div class=\"option\">\n                        <label class=\"modalLabel\">Answer Text:</label>\n                            <div class=\"posRel\">\n                                <div contenteditable=\"true\" type=\"text\" class=\"answertText fw-input form-control\" id=\"id1_").concat(newid, "\" >").concat(that.settings.stepsAnswer[index].textValue, "</div>\n                                <a class=\"delete_button\" href=\"javascript:void(0)\">\n                                     <i class=\"fa fa-trash\"></i>\n                                </a>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            ")); //     $("#dragdrop_widget_form .stepsOption .option").append(`
        // `); 
  
        enableCkeditor("id_" + newid);
        enableCkeditor("id1_" + newid);
        enableCkeditor("id3_" + newid);
      });
      /*$("#dragdrop_widget_form").on("submit", function(e){
          e.preventDefault();
          that.settings.question = $(e.target).find("#ques_title").val()
          that.settings.stepsAnswer = [];
          that.settings.stepsOption = [];
          
          $("#dragdrop_widget_form .option input").each(function (item) {
              if ($(this).val() != ''){
                that.settings.stepsAnswer.push({ "textValue": $(this).val(), "correct": item});
              }    
          });
           $("#dragdrop_widget_form .Q_option input").each(function (item) {
              if ($(this).val() != ''){
                that.settings.stepsOption.push({ "textValueOpt": $(this).val(), "correct": item});
              }
          });
          that.widget.reMount(that.settings);
          that.widget.closeAddModal();
      });*/
  
      $('#dragdrop_widget_form').on("click", ".delete_button", function (e) {
        e.preventDefault();
        $(this).closest('.ques_opt_row').remove();
      });
  
      if (that.settings.align === "1") {
        $("#dragdrop_widget_form").find("input[name='align'][value='1']").prop("checked", true);
        
      } else {
        $("#dragdrop_widget_form").find("input[name='align'][value='2']").prop("checked", true);
        
      }
      $('.backgroundColor').find('.sp-preview-inner').parent().on("click",function(){
        that.settings.backgroundColorSelected = "1";
      })
      $('.backgroundColor').find('.sp-dd').parent().on("click",function(){
        that.settings.backgroundColorSelected = "1";
      })
      $('#dragdrop_widget_form input[type="file"]').change(function () {
        var ext = this.value.match(/\.(.+)$/)[1];
        var extSplit = ext.split('.');
        var lastExt = extSplit[extSplit.length - 1];
        that.settings.backgroundColorSelected = "0"
  
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
  
      $("#dragdrop_widget_form").on("submit", function (e) {
        e.preventDefault();
        var formData = new FormData(document.getElementById('dragdrop_widget_form'));
        that.settings.question = $(e.target).find("#ques_title").html();
        that.settings.stepsAnswer = [];
        that.settings.stepsOption = [];
        that.settings.feedbackOption = [];
        that.settings.bgColor = $('.backgroundColor').find('.sp-preview-inner').css("background-color");
        that.settings.optionColor = $('.optionColor').find('.sp-preview-inner').css("background-color");
        that.settings.submitColor = $('.buttonColor').find('.sp-preview-inner').css("background-color");
        that.settings.submitHover = $('.buttonHover').find('.sp-preview-inner').css("background-color");
        that.settings.questionBackground = $('.questionBg').find('.sp-preview-inner').css("background-color");
        that.settings.submitText = $('.submitText').find('.sp-preview-inner').css("background-color");
        that.settings.submitAlign = $("#button_align").val();
        var isValid = true;
        axios.post(appUrl + '/new-image', formData, {
          headers: {
            "course_path": $courseJson.courseDirPath,
            "token": localStorage.getItem('token')
          }
        }).then(function (result) {
          
          that.settings.url = $courseJson.courseDirPath + result.data.data;
          that.widget.reMount(that.settings);
        });
  
        if ($("#ques_title").text() == '') {
          isValid = false;
        }
  
        $("dragdrop_widget_form .stepsOption .option_text").each(function (item) {
          if ($(this).text() == '') {
            isValid = false;
          }
        });
        $("#dragdrop_widget_form .posRel .answertText").each(function (item) {
          if ($(this).text() == '') {
            isValid = false;
          }
        });
  
        if (!isValid) {
          displayNotification("Please Fill Blank Value");
          return;
        }
  
        var rowCount = $(".stepsOption").find(".ques_opt_row").length;
        
  
        // if (rowCount == 3) {
        //   displayNotification("Please add at-least 3 option");
        //   return false;
        // }
  
        $("#dragdrop_widget_form .stepsOption .option_text").each(function (item) {
          if ($(this).html() != '') {
            
            that.settings.stepsOption.push({
              "textValueOpt": $(this).html(),
              "correct": item
            });
          }
        });
        $("#dragdrop_widget_form .posRel .answertText").each(function (item) {
          if ($(this).html() != '') {
            that.settings.stepsAnswer.push({
              "textValue": $(this).html(),
              "correct": item
            });
          }
        });
        $("#dragdrop_widget_form .stepsOption .feedback_text").each(function (item) {
            if ($(this).html() != '') {
              that.settings.feedbackOption.push({
                "feedbackOptValue": $(this).html(),
                "correct": item
              });
            }
          });
        
        that.settings.align = $("input[name='align']:checked").val();
        
        that.widget.reMount(that.settings);
        that.widget.closeAddModal();
      });
      $(".add_option").click(function (e) {
        var that = this;
        e.preventDefault();
        var newid = makeid();
        $("#dragdrop_widget_form .stepsOption").append("\n                <div class=\"col-md-12\">\n                    <div class=\"row ques_opt_row\">\n                        <div class=\"col-sm-4\" >\n                            <div class=\"Q_option\">\n                                <label class=\"modalLabel\">Option text:</label>\n                                    <div class=\"posRel\">\n                                    <div contenteditable=\"true\" class=\"fw-input form-control option_text\" id=\"id_".concat(newid, "\"></div>\n                                    </div>\n                            </div>\n                        </div> \n          <div class=\"col-sm-4\" >\n                            <div class=\"Q_feedback\">\n                                <label class=\"modalLabel\">Feedback text:</label>\n                                    <div class=\"posRel\">\n                                    <div contenteditable=\"true\" class=\"fw-input form-control feedback_text\" id=\"id3_").concat(newid, "\"></div>\n                                    </div>\n                            </div>\n                        </div> \n                  <div class=\"col-sm-4\" >\n                            <div class=\"option\">\n                                <label class=\"modalLabel\">Answer text:</label>\n                                <div class=\"posRel\">\n                                <div contenteditable=\"true\" class=\"answertText fw-input form-control\" id=\"id1_").concat(newid, "\"></div>\n                                    <a class=\"delete_button\" href=\"javascript:void(0)\">\n                                         <i class=\"fa fa-trash\"></i>\n                                    </a>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                    ")); //   $("#dragdrop_widget_form .stepsOption").append('<div class="col-sm-6" id="${that.settings.id}"><div class="Q_option"><label class="modalLabel">Option text:</label><div class="posRel pr30"><input type="text" class="fw-input form-control"></input></div>')
  
        enableCkeditor("id_".concat(newid));
        enableCkeditor("id1_".concat(newid));
        enableCkeditor("id3_".concat(newid));
      }); // that.widget.reMount(that.settings);
      // that.widget.hideSettingsPanel();
    };
  }
  
  Drag_drop_2.prototype = Object.create(MainWidget.prototype);