function Fillinblank_widget_2() {
    this.init = function () {
      this.settings = {
        "question": '',
        "inputbox": [],
        "itemlist": [],
        "correct_answer": [],
        "correct":"This is Correct",
        "inCorrect":"This is Incorrect",
        "bgColor":"#ffffff",
        "submitColor":"#6A6C6D",
        "submitHover":"#000000",
        "optionColor":"#ffffff",
        "url":"",
        "backgroundColorSelected":"0",
        "questionBackground":"#ffffff",
        "submitText":"#ffffff",
        "submitAlign":"right"
      };
      this.widget = new Widget(this.settings);
      this.widget.openAddModal(this.getFormHTML());
      this.bindAddFormEvents('add');
      enableCkeditor("glbCorrFeed");
      enableCkeditor("glbIncorrFeed");
      //enableCkeditor("fill_in_text");
      this.stopPasteWithFormatting();
      return this.widget.getWidgetId();
    };
  
    this.edit = function () {
      this.widget.openAddModal(this.getFormHTML());
      $("#fill_in_form .fill-blank-input").each(function () {
         $(this).removeAttr("value");
         $(this).val($(this).attr("data-correct"));
        
      });
      enableCkeditor("glbCorrFeed");
      enableCkeditor("glbIncorrFeed");
      //enableCkeditorOnElem("fill_in_text");
      this.bindAddFormEvents('edit');
    };
  
    this.getFormHTML = function () {
      var html = $("\n        <div class=\"widget-settings-wrapper fill-in-blank-widget-modal mdwrap\"> \n            <form id=\"fill_in_form\" class=\"modalBody form-settings\">\n                <div class=\"form-group\">\n                    <label class=\"modalLabel custom-label-box4\">Enter your question</label>\n                    <div id=\"fill_in_text\" class=\"fw-textarea form-control\" contenteditable=\"true\">".concat(this.settings.question, "</div>\n <div id=\"accordion2\" class=\"advance-setting-accordion\">\n                        <div class=\"card\">\n                            <div class=\"card-header advance_setting_hedaer\" id=\"heading_One\">\n                                <h2 class=\"mb-0\">\n                                    <span class=\"advanceSetting d-flex  btn btn-link collapsed ml-0\" data-toggle=\"collapse\" data-target=\"#collapsesettings\" aria-expanded=\"false\" aria-controls=\"collapseOne\">\n                                    More Settings \n                                    </span>\n                                </h2>\n                                <span class=\"advance-accordian-arrow collapsed\" data-toggle=\"collapse\" data-target=\"#collapsesettings\" aria-expanded=\"false\" aria-controls=\"collapseOne\"><i class=\"fa fa-angle-down rotate-icon\"></i></span>\n                            </div>\n                            <div id=\"collapsesettings\" class=\"collapse\" aria-labelledby=\"heading_One\" data-parent=\"#accordion2\">\n                                <div class=\"card-body advance_setting_body\">\n                                <div class=\"row\">\n                                    <div class=\"col-sm-3\">\n                                        <div class=\"form-group\">\n                                            <label class=\"form-element-label custom-label-box4\">Background Color</label>\n                                                <div class=\"backgroundColor\"><input type=\"text\" id=\"backgroundColor\" class=\"form-control  form-element\"  name=\"bg-color\" value=\"").concat(this.settings.bgColor, "\">\n                                        </div>\n                                    </div>\n</div>  <div class=\"col-sm-3\">\n                                        <div class=\"form-group\">\n                                            <label class=\"form-element-label custom-label-box4\">Button Color</label>\n                                                <div class=\"buttonColor\"><input type=\"text\" id=\"btnColor\" class=\"form-control  form-element\"  name=\"btn-color\" value=\"").concat(this.settings.submitColor, "\">\n                                        </div>\n                                    </div>\n       </div> \n  <div class=\"col-sm-3\">\n                                        <div class=\"form-group\">\n                                            <label class=\"form-element-label custom-label-box4\">Button Hover</label>\n                                                <div class=\"buttonHover\"><input type=\"text\" id=\"btnHover\" class=\"form-control  form-element\"  name=\"btn-border-color\" value=\"").concat(this.settings.submitHover, "\">\n                                        </div>\n                                    </div>\n       </div>   \n<div class=\"col-sm-3\">\n                                        <div class=\"form-group\">\n                                            <label class=\"form-element-label custom-label-box4\">Option Color</label>\n                                                <div class=\"optionColor\"><input type=\"text\" id=\"optionColor\" class=\"form-control  form-element\"  name=\"option-color\" value=\"").concat(this.settings.optionColor, "\">\n                                        </div>\n                                    </div>\n       </div>                        </div> \n     <div class=\"row\"><div class=\"col-sm-3 dispnone\">\n                                        <div class=\"form-group\">\n                                            <label class=\"form-element-label custom-label-box4\">Question Background</label>\n                                                <div class=\"questionBg\"><input type=\"text\" id=\"questionbg\" class=\"form-control  form-element\"  name=\"question-color\" value=\"").concat(this.settings.questionBackground, "\">\n                                        </div>\n                                    </div>\n       </div>  <div class=\"col-sm-3\">\n                                        <div class=\"form-group\">\n                                            <label class=\"form-element-label custom-label-box4\">Submit Text</label>\n                                                <div class=\"submitText\"><input type=\"text\" id=\"submitText\" class=\"form-control  form-element\"  name=\"submitText-color\" value=\"").concat(this.settings.submitText, "\">\n                                        </div>\n                                    </div>\n       </div>  <div class=\"form-group posRel pl0 col-md-3\">\n\t\t\t\t\t<label class=\"form-element-label custom-label-box4\">Background Image</label>\n                    <input type=\"file\" id=\"file\" input-attr-id=\"2\" class=\"form-control form-file-element\"  name=\"filename\" accept=\"image/*\">\n                </div>\n  <div class=\"form-group col-md-3\">\n                            <label class=\"form-element-label custom-label-box4\">Submit Alignment:</label>\n                            <select class=\"form-control form-file-element button-align\" id=\"button_align\">\n                                <option value=\"left\">Left Align</option>\n                                <option value=\"center\">Center Align</option>\n                                <option value=\"right\">Right Align</option>\n                            </select>\n                        </div>\n    </div></div>                        </div>     \n</div>      </div> <div class=\"row mt-10\">\n                        <div class=\"col-sm-6\">\n                            <div class='glbCorrFeed'>\n                                <label class=\"modalLabel custom-label-box4\">Correct Feedback</label>\n                                <div class=\"posRel pr30\">\n                                    <div type=\"text\" class=\"fw-input form-control form-element\" id = \"glbCorrFeed\" required contenteditable=\"true\">").concat(this.settings.correct,"</div>\n </div></div></div><div class=\"col-sm-6\">\n                            <div class='glbIncorrFeed'>\n                                <label class=\"modalLabel custom-label-box4\">Incorrect Feedback</label>\n                                <div class=\"posRel pr30\">\n                                    <div type=\"text\" class=\"fw-input form-control form-element\" id = \"glbIncorrFeed\" required contenteditable =\"true\">").concat(this.settings.inCorrect,"</div>\n </div></div></div></div></div> <div class=\"form-group text-right mb0\">\n                    <button id=\"createblankBtn\" type=\"button\" class=\"modalBtn cancelBtn onblank mr10\" value=\"Insert a blank\">Insert a blank</button>\n                    <button id=\"fill_in_submit\" type=\"submit\" class=\"modalBtn yesBtn pull-right\">Apply</button>\n                </div>\n            </form>\n        </div>        \n     </div>\n   "));                              
      return html;
    };
  
    this.bindAddFormEvents = function (type) {
      var that = this;
      $("#button_align").val(that.settings.submitAlign);
     
      $('#btnColor').spectrum(getColorPickerForSpectrum(that.settings.submitColor));
      $('#btnHover').spectrum(getColorPickerForSpectrum(that.settings.submitHover));
      $('#backgroundColor').spectrum(getColorPickerForSpectrum(that.settings.bgColor));
      $('#optionColor').spectrum(getColorPickerForSpectrum(that.settings.optionColor));
      $('#questionbg').spectrum(getColorPickerForSpectrum(that.settings.questionBackground));
      $('#submitText').spectrum(getColorPickerForSpectrum(that.settings.submitText));
      $('.backgroundColor').find('.sp-preview-inner').parent().on("click",function(){
        that.settings.backgroundColorSelected = "1";
      })
      $('.backgroundColor').find('.sp-dd').parent().on("click",function(){
        that.settings.backgroundColorSelected = "1";
      })
      $('#fill_in_form input[type="file"]').change(function () {
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
      $("#fill_in_form").on("submit", function (e) {
        e.preventDefault();
        var formData = new FormData(document.getElementById('fill_in_form'));
        that.settings.bgColor = $('.backgroundColor').find('.sp-preview-inner').css("background-color");
        that.settings.optionColor = $('.optionColor').find('.sp-preview-inner').css("background-color");
        that.settings.submitColor = $('.buttonColor').find('.sp-preview-inner').css("background-color");
        that.settings.submitHover = $('.buttonHover').find('.sp-preview-inner').css("background-color");
        that.settings.questionBackground = $('.questionBg').find('.sp-preview-inner').css("background-color");
        that.settings.submitText = $('.submitText').find('.sp-preview-inner').css("background-color");
        that.settings.submitAlign = $("#button_align").val();
        axios.post(appUrl + '/new-image', formData, {
          headers: {
            "course_path": $courseJson.courseDirPath,
            "token": localStorage.getItem('token')
          }
        }).then(function (result) {
          
          that.settings.url = $courseJson.courseDirPath + result.data.data;
          that.widget.reMount(that.settings);
        });
        $("#fill_in_form .fill-blank-input").each(function () {
          $(this).attr("data-correct", $(this).val());
        });
        that.settings.question = $(e.target).find("#fill_in_text").html();
        that.settings.inputbox = $(e.target).find(".fill-blank-input").val();
        that.settings.correct = $("#glbCorrFeed").html();
        that.settings.inCorrect = $("#glbIncorrFeed").html();
  
        if (type === "add") {
          if (!(that.settings.question == '') && $('.fill-blank-input').length > 0) {
            that.widget.closeAddModal();
            that.widget.insert(that.settings);
          } else {
            return;
          }
        } else {
          if (!(that.settings.question == '') && $('.fill-blank-input').length > 0) {
            that.widget.closeAddModal();
            that.widget.reMount(that.settings);
          } else {
            return;
          }
        }
      });
      $("#createblankBtn").on("click", function () {
        $('#fill_in_text').focus();
        that.pasteHtmlAtCaret();
      });

      $(document).on("click", "#fill_in_text > div > .fill-blank-input", function (e) {
          e.preventDefault();
          var elemID = $(this).attr("id");
          // disableCkeditorOnElem(elemID);
      });
    };
  
    this.pasteHtmlAtCaret = function () {
      var newElId = makeid();
      var inputBoxHTML = "<input name='nm' tabindex=0 role=\"textbox\" class=\"fill-blank-input\" aria-required=\"true\" aria-label=\"blank\" alt=\"blank\" required type='text' id='".concat(newElId, "'  />");
      var sel, range;
      var anchorID = window.getSelection().anchorNode.id;
      var anchorParentID = window.getSelection().anchorNode.parentNode.id;
      if(anchorParentID == ""){
          anchorParentID = window.getSelection().anchorNode.parentNode.parentNode.id;
      }
  
      if (window.getSelection && (anchorID === 'fill_in_text' || anchorParentID === "fill_in_text")) {
        sel = window.getSelection();
  
        if (sel.getRangeAt && sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();
          var el = document.createElement("div");
          el.innerHTML = inputBoxHTML;
          var frag = document.createDocumentFragment(),
              node,
              lastNode;
  
          while (node = el.firstChild) {
            lastNode = frag.appendChild(node);
          }
  
          range.insertNode(frag);
  
          if (lastNode) {
            range = range.cloneRange();
            range.setStartAfter(lastNode);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(inputBoxHTML);
      }
  
      $("input[id=".concat(newElId, "]")).focus();
    };
  
    this.stopPasteWithFormatting = function () {
      $('#fill_in_text').on('paste', function (e) {
        e.preventDefault();
        document.execCommand('inserttext', false, e.originalEvent.clipboardData.getData("text/plain"));
      });
    };
  }
  
  Fillinblank_widget_2.prototype = Object.create(MainWidget.prototype);