function Click_tab() {
  this.init = function () {
    this.settings = {
      "items": [],
      "tabtype": "horizontal",
      "tab_background": "rgb(238, 238, 238)",
      "tab_activeBackground": "#383838",
      "tab_activeText": "rgb(255, 255, 255)",
      "tab_text": "rgb(0, 0, 0)",
      "content_background": "#fbfbfb",
      "content_text": "rgb(0, 0, 0)",
      "tab_width": "100%",
      "tab_height": "38px"
    };
    this.widget = new Widget(this.settings);
    this.widget.openAddModal(this.getFormHTML());
    this.bindAddFormEvents();
    this.custom();
    return this.widget.getWidgetId();
  };

  this.edit = function () {
    this.widget.openAddModal(this.getFormHTML());
    this.bindEditFormEvents();
  };

  this.custom = function () {
    var that = this;
    $('#clicktab_form').find('.radio_input').find('input:checked').each(function () {
      that.tabElement(this);
    });
    $('#clicktab_form .radio_input').on('change', 'input:checked', function () {
      that.tabElement(this);
    });
  };

  this.tabElement = function (that) {};

  this.clicktabValidation = function () {
    $('#clicktab_widget_heading,#clicktab_widget_body').on('keyup', function () {
      if ($('#clicktab_widget_heading').text().trim() != '' && $('#clicktab_widget_body').text().trim() != '') {
        $('#clicktab_widget_button').removeClass('disabled');
      } else {
        $('#clicktab_widget_button').addClass('disabled');
        return;
      }
    });
  };

  this.getFormHTML = function () {
    var html = $("\n        <div class=\"widget-settings-wrapper mdwrap clicktab-widget-modal clicktab_height p-4 modalBody\"> \n            <form id=\"clicktab_form\" class=\"clicktab_form pl15\">\n                <div class=\"row\">\n                    <div class=\"col-md-5\">    \n                        <div class=\"items\">\n                                <div class='item'>\n                                    <div class=\"form-group\">\n                                        <label class=\"modalLabel custom-label-box4\">Heading</label>\n                                        <div contenteditable=\"true\" name=\"title\" id=\"clicktab_widget_heading\" class=\"fw-input form-control cke_editable cke_editable_inline cke_contents_ltr\"  required></div>\n                                    </div>\n                                    <div class=\"form-group\">\n                                        <label class=\"modalLabel custom-label-box4\">Text</label>\n                                        <div contenteditable=\"true\" name=\"body\" id=\"clicktab_widget_body\" class=\"fw-input form-control cke_editable cke_editable_inline cke_contents_ltr\"  required></div>\n                                    </div>\n                                </div>\n                                <div>\n                                    <button type=\"submit\" id=\"clicktab_widget_button\" class=\"btn disabled modalBtn add_section yesBtn pull-right\">Add</button>\n                                </div>\n                        </div>\n                    </div>  \n                    <div class=\"col-md-7\">  \n                    <form name=\"right_tab\">\n\n                    <div class=\"row margin0 radio_input\">\n                        \n                        <div class=\"form-group col-md-12\">\n                            <div class=\"col-md-12\">\n                                <label class=\"modalLabel non-capitalize custom-label-box4\">Select a Tab Style</label>\n                            </div>\n                            <div class=\"row mb20 px-3\">\n                                <div class=\"col-md-3\">\n                                    <label class=\"radio-container col-sm-4 vertical-lbl custom-label-box4\" id=\"vertical_tabs\">Vertical\n                                        <input type=\"radio\" name=\"tabtype\" value=\"vertical\" required>\n                                        <span class=\"circlemark\"></span>\n                                    </label>\n                                </div>\n                               <div class=\"col-md-4\">\n                                    <label class=\"radio-container col-sm-4 horizontal-lbl custom-label-box4\">Horizontal\n                                        <input type=\"radio\" name=\"tabtype\" value=\"horizontal\" required checked>\n                                        <span class=\"circlemark\"></span>\n                                    </label>\n                                </div>\n                                <div class=\"col-md-5\">\n                                    <label class=\"radio-container col-sm-4 horizontal-lbl custom-label-box4\">Horizontal Bottom\n                                        <input type=\"radio\" name=\"tabtype\" value=\"horizontal_bottom\" required>\n                                        <span class=\"circlemark\"></span>\n                                    </label>\n                                </div>\n                            </div>\n                           \n                        <div class=\"form-group col-md-12\">\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <label class=\"horizontal-lbl modalLabel custom-label-box4\">Tab background\n                                        <div class=\"tabBgColor\"><input type=\"text\" value=\"".concat(this.settings.tab_background, "\" id=\"tab_background\" class=\"fw-input form-control mt5 form-element\" autocomplete=\"off\" required=\"\"></div>\n                                    </label>\n                                </div>\n                                <div class=\"col-md-6\">\n                                <label class=\"horizontal-lbl modalLabel custom-label-box4\">Active tab background\n                                    <div class=\"activeTabBgColor\"><input type=\"text\" name=\"\" value=\"").concat(this.settings.tab_activeBackground, "\" id=\"tab_activeBackground\" class=\"fw-input form-control mt5 form-element\" autocomplete=\"off\" required=\"\"></div>\n                               </label>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"form-group col-md-12\">\n                        <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <label class=\"horizontal-lbl modalLabel custom-label-box4\">Active tab  text\n                                <div class=\"activeTabText\"><input type=\"text\" name=\"\" value=\"").concat(this.settings.tab_activeText, "\" id=\"tab_textActive\" class=\"fw-input form-control mt5 form-element\" autocomplete=\"off\"></div>\n                            </label>\n                        </div>\n                        <div class=\"col-md-6\">\n                        <label class=\"horizontal-lbl modalLabel custom-label-box4\">Tab text color\n                             <div class=\"tabTextColor\"><input type=\"text\" name=\"\" value=\"").concat(this.settings.tab_text, "\" id=\"tab_text\" class=\"fw-input form-control mt5 form-element\" autocomplete=\"off\" required=\"\"></div>\n                        </label>\n                        </div>\n                        </div>\n                        </div>\n\n                        <div class=\"form-group col-md-12\">\n                            <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <label class=\"horizontal-lbl modalLabel custom-label-box4\">Content background\n                                    <div class=\"contentBg\"><input type=\"text\" name=\"\" value=\"").concat(this.settings.content_background, "\" id=\"content_background\" class=\"fw-input form-control mt5 form-element\" autocomplete=\"off\" required=\"\"></div>\n                                </label>\n                            </div>\n                            <div class=\"col-md-6\">\n                            <label class=\"horizontal-lbl modalLabel custom-label-box4\">Content text color\n                                 <div class=\"contentTextColor\"><input type=\"text\" name=\"\" value=\"").concat(this.settings.content_text, "\" id=\"content_text\" class=\"fw-input form-control mt5 form-element\" autocomplete=\"off\" required=\"\"></div>\n                            </label>\n                            </div>\n                            </div>\n                        </div>\n                        <div class=\"form-group col-md-12\">\n                        <div class=\"row\">\n                            <div class=\"col-md-6 disabled\">\n                                <label class=\"horizontal-lbl modalLabel custom-label-box4\"> Tab width\n                                    <input disabled type=\"text\" name=\"\"  min=\"150\" max='500' value=\"100%\" id=\"tab_width\" class=\"fw-input form-control mt5 form-element\" autocomplete=\"off\" required=\"\">\n                                </label>\n                            </div>\n                            <div class=\"col-md-6\">\n                                <label class=\"horizontal-lbl modalLabel custom-label-box4\">Tab height\n                                    <input type=\"number\" min=\"38\" max='80' value=\"38\" id=\"tab_height\" class=\"fw-input form-control mt5 form-element\" required=\"\">\n                                </label>\n                            </div>\n                        </div>  \n                        </div>\n                        <div class=\" col-md-12 ").concat(this.settings.tabtype, "\" id=\"clicktab_list\">\n                            <div class=\"no-clicktab-found\">No item added in tabs.</div> \n                                <ul class=\"nav nav-tabs\"></ul>\n                                <div class=\"tab-content\" id=\"content_id\">\n                                </div>\n                                <div class=\"form-group text-right float100 mb0 mt20\">\n                                    <button type=\"submit\" class=\"modalBtn hide submitbtn yesBtn pull-right\">Apply</button>\n                                </div>\n                            </div>\n                        </div>\n                        </form>\n                </div>  \n            </form>\n        </div>\n        "));
    return html;
  };

  this.bindAddFormEvents = function () {
    var that = this;
    that.clicktabValidation();
    enableCkeditor("clicktab_widget_heading");
    enableCkeditor("clicktab_widget_body");
    $('#clicktab_form .submitbtn').addClass('disabled');
    $("#clicktab_list .nav-tabs .nav-item:first-child .nav-link").trigger("click");
    $("#content_id .tab-pane:first-child").addClass('active');
    // colorpicker
    // colorpicker
    $('#tab_background').spectrum(
      getColorPickerForSpectrum(that.settings.tab_background)
    );
    $('#tab_activeBackground').spectrum(
      getColorPickerForSpectrum(that.settings.tab_activeBackground)
    );

    $('#tab_textActive').spectrum(
      getColorPickerForSpectrum(that.settings.tab_activeText)
    );

    $('#tab_text').spectrum(
      getColorPickerForSpectrum(that.settings.tab_text)
    );

    $('#content_text').spectrum(
      getColorPickerForSpectrum(that.settings.content_text)
    );

    $('#content_background').spectrum(
      getColorPickerForSpectrum(that.settings.content_background)
    );

    //save tab
    $("#clicktab_form").on("submit", function (e) {
      e.preventDefault();
      that.settings.tab_background = $(e.target).find('.tabBgColor').find('.sp-preview-inner').css("background-color");
      that.settings.tab_activeBackground = $(e.target).find('.activeTabBgColor').find('.sp-preview-inner').css("background-color");
      that.settings.tab_activeText = $(e.target).find('.activeTabText').find('.sp-preview-inner').css("background-color");
      that.settings.tab_text = $(e.target).find('.tabTextColor').find('.sp-preview-inner').css("background-color");
      that.settings.content_background =$(e.target).find('.contentBg').find('.sp-preview-inner').css("background-color");
      that.settings.content_text = $(e.target).find('.contentTextColor').find('.sp-preview-inner').css("background-color");

      that.settings.tabtype = $(e.target).find("[name='tabtype']:checked").val();
      that.settings.tab_width = $(".clicktab_form").find("#tab_width").val();
      that.settings.tab_height = $(".clicktab_form").find("#tab_height").val();

      if ($('#clicktab_list .nav .nav-item').length > 1) {
        that.widget.insert(that.settings);
        that.widget.closeAddModal();
      } else {
        displayNotification('Please add atleast two tabs');
      }
    });

    $('input:radio[name=tabtype]').click(function () {
      $('#clicktab_list').removeClass('horizontal');
      that.settings.tab_background = $('.tabBgColor').find('.sp-preview-inner').css("background-color");
      that.settings.tab_activeBackground = $('.activeTabBgColor').find('.sp-preview-inner').css("background-color");
      that.settings.tab_activeText = $('.activeTabText').find('.sp-preview-inner').css("background-color");
      that.settings.tab_text = $('.tabTextColor').find('.sp-preview-inner').css("background-color");
      that.settings.content_background =$('.contentBg').find('.sp-preview-inner').css("background-color");
      that.settings.content_text = $('.contentTextColor').find('.sp-preview-inner').css("background-color");


      that.settings.tabtype = $(".clicktab_form").find("[name='tabtype']:checked").val();
      that.settings.tab_width = $(".clicktab_form").find("#tab_width").val();
      that.settings.tab_height = $(".clicktab_form").find("#tab_height").val();
      setTimeout(function () {
        if ($(".clicktab_form").find("input[name='tabtype']:checked").val() == 'vertical') {
          $('#clicktab_list').addClass(that.settings.tabtype);
          $('#clicktab_list').removeClass('horizontal horizontal_bottom');
        }

        if ($(".clicktab_form").find("input[name='tabtype']:checked").val() == 'horizontal') {
          $('#clicktab_list').addClass(that.settings.tabtype);
          $('#clicktab_list').removeClass('horizontal_bottom vertical');
        }

        if ($(".clicktab_form").find("input[name='tabtype']:checked").val() == 'horizontal_bottom') {
          $('#clicktab_list').addClass(that.settings.tabtype);
          $('#clicktab_list').removeClass('horizontal vertical');
        }
      });

      $('#clicktab_list').addClass(that.settings.tabtype);
      var tabActive = that.settings.tab_activeBackground
      var textActive =  that.settings.tab_activeText
      $('#clicktab_form').find(".nav-item a").css({
        "background": that.settings.tab_background
      }).css({
        "color": that.settings.tab_text
      });
      $('#clicktab_form').find(".nav-item a.active").css({
        "background": tabActive
      }).css({
        "color": textActive
      });
      $('#clicktab_form').find(".tab-content .tab-pane").css({
        "background": that.settings.content_background
      }).css({
        "color": that.settings.content_text
      });
      $('#clicktab_form').off("click", ".nav-item a").on("click", ".nav-item a", function () {
        setTimeout(function () {
          $('#clicktab_form').find(".nav-item a").css({
            "background": $('.tabBgColor').find('.sp-preview-inner').css("background-color")
          }).css({
            "color": $('.tabTextColor').find('.sp-preview-inner').css("background-color")
          });
          $('#clicktab_form').find(".nav-item a.active").css({
            "background": tabActive
          }).css({
            "color": textActive
          });
        });
      });
    });
   
    // Deete tab
    $('#clicktab_list').on("click", "#acc_delete_list", function () {
      window.delId = $('#clicktab_list .nav-link.active').attr('href').replace('#', '');
      that.settings.items = that.settings.items.filter(function (el) {
        return el.id != delId;
      });
      $('#clicktab_list .nav-link.active').attr('href', delId).parent('li').remove();
      $('#' + delId).remove();
      $("#clicktab_list .nav-tabs .nav-item .nav-link:first-child").trigger("click");
      that.settings.content_background = $(e.target).find("#content_background").val();
      that.settings.content_text = $(".clicktab_form").find("#content_text").val();
    });

     // edit tab
    $('#clicktab_list').on("click", "#acc_edit_list", function (e) {
      e.preventDefault();
      window.delId = $('#clicktab_list .nav-link.active').attr('href').replace('#', '');
      that.settings['currentItem'] = that.settings.items.filter(function (el) {
        return el.id == delId;
      })[0];
      $('#clicktab_widget_heading').html(that.settings['currentItem']['heading']);
      $('#clicktab_widget_body').html(that.settings['currentItem']['content']);
      $('#clicktab_widget_button').text('Save');
    });

     // add tab
    $('#clicktab_form').on("click", ".add_section", function (e) {
      e.preventDefault();
      $('#clicktab_form .submitbtn').removeClass('disabled');
      $('#clicktab_widget_button').addClass('disabled');

      if ($('#clicktab_widget_heading').html().trim() == '' || $('#clicktab_widget_body').html().trim() == '') {
        return;
      }

      if ($('.no-clicktab-found').is(':visible')) {
        $('.no-clicktab-found').remove();
        $('.submitbtn').removeClass('hide');
      }

      var heading = $("#clicktab_widget_heading").html();
      var content = $("#clicktab_widget_body").html();

      if (that.settings['currentItem'] && that.settings['currentItem']['id']) {
        var newListItem = {
          'id': that.settings['currentItem']['id'],
          'heading': heading,
          'content': content
        };
        $('#' + that.settings['currentItem']['id']).parents('#clicktab_list').find('.active').html(heading);
        $('#' + delId).html("<span class=\"delete-edit-accrodian\">\n                <i data-id=\"".concat(newListItem.id, "\" id=\"acc_delete_list\" class=\"fa fa-trash delete_section\"></i>\n                <i data-id=\"").concat(newListItem.id, "\" id=\"acc_edit_list\" class=\"fa fa-pencil-square-o delete_section\"></i>\n                </span>\n                <div class=\"tab-pane\" id=\"").concat(newListItem.id, "\" role=\"tabpanel\">\n                ").concat(content, "\n               </div> "));
        $("#clicktab_list .nav-tabs .nav-item .nav-link.active").trigger("click");
        $("#clicktab_list .tab-content .tab-pane.active").addClass("active");
        that.settings.items = that.settings.items.map(function (el) {
          if (el.id == that.settings['currentItem']['id']) {
            return newListItem;
          } else {
            return el;
          }
        });
        $('#clicktab_widget_heading').html("");
        $('#clicktab_widget_body').html("");
        $('#clicktab_widget_button').text('Add');
        that.settings['currentItem'] = null;
      } else {
        var _newListItem = {
          'id': makeid(),
          'heading': heading,
          'content': content
        };
        that.settings.items.push(_newListItem);
        $("#clicktab_list ul").append("\n                <li class=\"nav-item\">\n                <a class=\"nav-link\" data-toggle=\"tab\" href=\"#".concat(_newListItem.id, "\" role=\"tab\" aria-controls=\"").concat(_newListItem.id, "\"> \n\n                    ").concat(heading, "\n                </a>             \n                </li>            \n             "));
        $("#clicktab_list #content_id").append("\n             <span class=\"delete-edit-accrodian\">\n             <i data-id=\"".concat(_newListItem.id, "\" id=\"acc_delete_list\" class=\"fa fa-trash delete_section\"></i>\n             <i data-id=\"").concat(_newListItem.id, "\" id=\"acc_edit_list\" class=\"fa fa-pencil-square-o delete_section\"></i>\n             </span> \n             <div class=\"tab-pane\" id=\"").concat(_newListItem.id, "\" role=\"tabpanel\">\n             ").concat(content, "\n            </div>           \n          "));
        $("#clicktab_list .nav-tabs .nav-item:last-child .nav-link").trigger("click");

        that.settings.tab_background = $('.tabBgColor').find('.sp-preview-inner').css("background-color");
        that.settings.tab_activeBackground = $('.activeTabBgColor').find('.sp-preview-inner').css("background-color");
        that.settings.tab_activeText = $('.activeTabText').find('.sp-preview-inner').css("background-color");
        that.settings.tab_text = $('.tabTextColor').find('.sp-preview-inner').css("background-color");
        that.settings.content_background =$('.contentBg').find('.sp-preview-inner').css("background-color");
        that.settings.content_text = $('.contentTextColor').find('.sp-preview-inner').css("background-color");

        that.settings.tab_width = $(".clicktab_form").find("#tab_width").val();
        that.settings.tab_height = $(".clicktab_form").find("#tab_height").val();
        var tabActive = that.settings.tab_activeBackground;
        var textActive = that.settings.tab_activeText;
        $('#clicktab_form').find(".nav-item a").css({
          "background": that.settings.tab_background
        }).css({
          "color": that.settings.tab_text
        });
        $('#clicktab_form').find(".nav-item a.active").css({
          "background": tabActive
        }).css({
          "color": textActive
        });
        $('#clicktab_form').find(".tab-content .tab-pane").css({
          "background": that.settings.content_background
        }).css({
          "color": that.settings.content_text
        });
        $('#clicktab_form').off("click", ".nav-item a").on("click", ".nav-item a", function () {
          setTimeout(function () {
            $('#clicktab_form').find(".nav-item a").css({
              "background": that.settings.tab_background
            }).css({
              "color": that.settings.tab_text
            });
            $('#clicktab_form').find(".nav-item a.active").css({
              "background": tabActive
            }).css({
              "color": textActive
            });
          });
        });
        $('#clicktab_widget_heading').html("");
        $('#clicktab_widget_body').html("");
      }
    });
    
    $('.sp-preview-inner').on("click", function () {
      that.settings.tab_background = $('.tabBgColor').find('.sp-preview-inner').css("background-color");
      that.settings.tab_activeBackground = $('.activeTabBgColor').find('.sp-preview-inner').css("background-color");
      that.settings.tab_activeText = $('.activeTabText').find('.sp-preview-inner').css("background-color");
      that.settings.tab_text = $('.tabTextColor').find('.sp-preview-inner').css("background-color");
      that.settings.content_background =$('.contentBg').find('.sp-preview-inner').css("background-color");
      that.settings.content_text = $('.contentTextColor').find('.sp-preview-inner').css("background-color");
      that.settings.tabtype = $(".clicktab_form").find("[name='tabtype']:checked").val();
      that.settings.tab_width = $(".clicktab_form").find("#tab_width").val();
      that.settings.tab_height = $(".clicktab_form").find("#tab_height").val();
      var tabActive = that.settings.tab_activeBackground;
      var textActive = that.settings.tab_activeText;
      $('#clicktab_form').find(".nav-item a").css({
        "background": that.settings.tab_background
      }).css({
        "color": that.settings.tab_text
      });
      $('#clicktab_form').find(".nav-item a.active").css({
        "background": tabActive
      }).css({
        "color": textActive
      });
      $('#clicktab_form').find(".tab-content .tab-pane").css({
        "background": that.settings.content_background
      }).css({
        "color": that.settings.content_text
      });
      $('#clicktab_form').off("click", ".nav-item a").on("click", ".nav-item a", function () {
        setTimeout(function () {
          $('#clicktab_form').find(".nav-item a").css({
            "background": that.settings.tab_background
          }).css({
            "color": that.settings.tab_text
          });
          $('#clicktab_form').find(".nav-item a.active").css({
            "background": tabActive
          }).css({
            "color": textActive
          });
        });
      });
    });
  };

  this.bindEditFormEvents = function () {
    var that = this;
    that.clicktabValidation();
    enableCkeditor("clicktab_widget_heading");
    enableCkeditor("clicktab_widget_body");
    var tab_value = $("input[name='tabtype']").val();
    tab_value = that.settings.tabtype;
    $('#tab_width').attr('value', this.settings.tab_width);
    $('#tab_height').attr('value', this.settings.tab_height);

    // colorpicker
    $('#tab_background').spectrum(
      getColorPickerForSpectrum(that.settings.tab_background)
    );
    $('#tab_activeBackground').spectrum(
      getColorPickerForSpectrum(that.settings.tab_activeBackground)
    );

    $('#tab_textActive').spectrum(
      getColorPickerForSpectrum(that.settings.tab_activeText)
    );

    $('#tab_text').spectrum(
      getColorPickerForSpectrum(that.settings.tab_text)
    );

    $('#content_text').spectrum(
      getColorPickerForSpectrum(that.settings.content_text)
    );

    $('#content_background').spectrum(
      getColorPickerForSpectrum(that.settings.content_background)
    );
    

    $("#clicktab_form").on("submit", function (e) {
      e.preventDefault();
      that.settings.tab_background = $(e.target).find('.tabBgColor').find('.sp-preview-inner').css("background-color");
      that.settings.tab_activeBackground = $(e.target).find('.activeTabBgColor').find('.sp-preview-inner').css("background-color");
      that.settings.tab_activeText = $(e.target).find('.activeTabText').find('.sp-preview-inner').css("background-color");
      that.settings.tab_text = $(e.target).find('.tabTextColor').find('.sp-preview-inner').css("background-color");
      that.settings.content_background =$(e.target).find('.contentBg').find('.sp-preview-inner').css("background-color");
      that.settings.content_text = $(e.target).find('.contentTextColor').find('.sp-preview-inner').css("background-color");
      that.settings.tabtype = $(e.target).find("[name='tabtype']:checked").val();
      that.settings.tab_width = $(e.target).find("#tab_width").val();
      that.settings.tab_height = $(e.target).find("#tab_height").val();

      if ($('#clicktab_list .nav .nav-item').length > 1) {
        that.widget.reMount(that.settings);
        that.widget.closeAddModal();
      } else {
        displayNotification('Please add atleast two tabs');
      }
    });
    $('input:radio[name=tabtype]').click(function () {
      $('#clicktab_list').removeClass('horizontal');
      that.settings.tab_background = $(".clicktab_form").find("#tab_background").val();
      that.settings.tab_activeBackground = $(".clicktab_form").find("#tab_activeBackground").val();
      that.settings.tab_activeText = $(".clicktab_form").find("#tab_textActive").val();
      that.settings.tab_text = $(".clicktab_form").find("#tab_text").val();
      that.settings.content_background = $(".clicktab_form").find("#content_background").val();
      that.settings.content_text = $(".clicktab_form").find("#content_text").val();
      that.settings.tabtype = $(".clicktab_form").find("[name='tabtype']:checked").val();
      that.settings.tab_width = $(".clicktab_form").find("#tab_width").val();
      that.settings.tab_height = $(".clicktab_form").find("#tab_height").val();
      setTimeout(function () {
        if ($(".clicktab_form").find("input[name='tabtype']:checked").val() == 'vertical') {
          $('#clicktab_list').addClass(that.settings.tabtype);
          $('#clicktab_list').removeClass('horizontal horizontal_bottom');
        }

        if ($(".clicktab_form").find("input[name='tabtype']:checked").val() == 'horizontal') {
          $('#clicktab_list').addClass(that.settings.tabtype);
          $('#clicktab_list').removeClass('horizontal_bottom vertical');
        }

        if ($(".clicktab_form").find("input[name='tabtype']:checked").val() == 'horizontal_bottom') {
          $('#clicktab_list').addClass(that.settings.tabtype);
          $('#clicktab_list').removeClass('horizontal vertical');
        }
      });
      var tabActive = that.settings.tab_activeBackground;
      var textActive = that.settings.tab_activeText;
      $('#clicktab_form').find(".nav-item a").css({
        "background": that.settings.tab_background
      }).css({
        "color": that.settings.tab_text
      });
      $('#clicktab_form').find(".nav-item a.active").css({
        "background": tabActive
      }).css({
        "color": textActive
      });
      $('#clicktab_form').find(".tab-content .tab-pane").css({
        "background": that.settings.content_background
      }).css({
        "color": that.settings.content_text
      });
      $('#clicktab_form').off("click", ".nav-item a").on("click", ".nav-item a", function () {
        setTimeout(function () {
          $('#clicktab_form').find(".nav-item a").css({
            "background": that.settings.tab_background
          }).css({
            "color": that.settings.tab_text
          });
          $('#clicktab_form').find(".nav-item a.active").css({
            "background": tabActive
          }).css({
            "color": textActive
          });
          $('#clicktab_form').find(".tab-content .tab-pane").css({
            "background": that.settings.content_background
          }).css({
            "color": that.settings.content_text
          });
        });
      });
    });
    $("input[name='tabtype'][value='".concat(tab_value, "']")).trigger('click');

    if ($(".clicktab_form").find("input[name='tabtype']:checked").val() == 'horizontal') {
      var tabActive = that.settings.tab_activeBackground;
      var textActive = that.settings.tab_activeText;
      $('#clicktab_form').find(".nav-item a").css({
        "background": that.settings.tab_background
      }).css({
        "color": that.settings.tab_text
      });
      $('#clicktab_form').find(".nav-item a.active").css({
        "background": tabActive
      }).css({
        "color": textActive
      });
      $('#clicktab_form').find(".tab-content .tab-pane").css({
        "background": that.settings.content_background
      }).css({
        "color": that.settings.content_text
      });
      $('#clicktab_form').off("click", ".nav-item a").on("click", ".nav-item a", function () {
        setTimeout(function () {
          $('#clicktab_form').find(".nav-item a").css({
            "background": that.settings.tab_background
          }).css({
            "color": that.settings.tab_text
          });
          $('#clicktab_form').find(".nav-item a.active").css({
            "background": tabActive
          }).css({
            "color": textActive
          });
          $('#clicktab_form').find(".tab-content .tab-pane").css({
            "background": that.settings.content_background
          }).css({
            "color": that.settings.content_text
          });
        });
      });
    }

    if ($('.no-clicktab-found').is(':visible')) {
      $('.no-clicktab-found').remove();
      $('.submitbtn').removeClass('hide');
    }

    this.settings.items.forEach(function (item) {
      $("#clicktab_list ul").append("\n            <li class=\"nav-item\">\n            <a class=\"nav-link\" data-toggle=\"tab\" href=\"#".concat(item.id, "\" role=\"tab\" aria-controls=\"").concat(item.id, "\" style=\"width:").concat(that.settings.tab_width, "; height:").concat(that.settings.tab_height, "\"> \n            ").concat(item.heading, "\n            </a></li>"));
      $("#clicktab_list #content_id").append("\n            <span class=\"delete-edit-accrodian\">\n            <i data-id=\"".concat(item.id, "\" id=\"acc_delete_list\" class=\"fa fa-trash delete_section\"></i>\n            <i data-id=\"").concat(item.id, "\" id=\"acc_edit_list\" class=\"fa fa-pencil-square-o delete_section\"></i>\n            </span>\n            <div class=\"tab-pane\" id=\"").concat(item.id, "\" role=\"tabpanel\" each=\"{item in opts.settings.items }\">\n            ").concat(item.content, "\n           </div>"));
    });

    $("#clicktab_list .nav-tabs .nav-item:first-child .nav-link").trigger("click");
    // delete tab
    $('#clicktab_list').on("click", "#acc_delete_list", function () {
      window.delId = $('#clicktab_list .nav-link.active').attr('href').replace('#', '');
      that.settings.items = that.settings.items.filter(function (el) {
        return el.id != delId;
      });
      $('#clicktab_list .nav-link.active').attr('href', delId).parent('li').remove();
      $('#' + delId).remove();
      $("#clicktab_list .nav-tabs .nav-item .nav-link:first-child").trigger("click");
      that.settings.content_background = $(e.target).find("#content_background").val();
      that.settings.content_text = $(e.target).find("#content").val();
    });
    // edit tab
    $('#clicktab_list').on("click", "#acc_edit_list", function (e) {
      e.preventDefault();
      window.delId = $('#clicktab_list .nav-link.active').attr('href').replace('#', '');
      that.settings['currentItem'] = that.settings.items.filter(function (el) {
        return el.id == delId;
      })[0];
      $('#clicktab_widget_heading').html(that.settings['currentItem']['heading']);
      $('#clicktab_widget_body').html(that.settings['currentItem']['content']);
      $('#clicktab_widget_button').text('Save');
    });
    // add section
    $('#clicktab_form').on("click", ".add_section", function (e) {
      e.preventDefault();
      $('.submitbtn').removeClass('disabled');

      if ($('#clicktab_widget_heading').html().trim() == '' || $('#clicktab_widget_body').html().trim() == '') {
        return;
      }

      if ($('.no-clicktab-found').is(':visible')) {
        $('.no-clicktab-found').remove();
        $('.submitbtn').removeClass('hide');
      }

      var heading = $("#clicktab_widget_heading").html();
      var content = $("#clicktab_widget_body").html();

      if (that.settings['currentItem'] && that.settings['currentItem']['id']) {
        var newListItem = {
          'id': that.settings['currentItem']['id'],
          'heading': heading,
          'content': content
        };
        $('#' + that.settings['currentItem']['id']).parents('#clicktab_list').find('.active').html(heading);
        $('#' + delId).html("<span class=\"delete-edit-accrodian\">\n                <i data-id=\"".concat(newListItem.id, "\" id=\"acc_delete_list\" class=\"fa fa-trash delete_section\"></i>\n                <i data-id=\"").concat(newListItem.id, "\" id=\"acc_edit_list\" class=\"fa fa-pencil-square-o delete_section\"></i>\n                </span>\n                <div class=\"tab-pane\" id=\"").concat(newListItem.id, "\" role=\"tabpanel\">\n                ").concat(content, "\n               </div> "));
        $("#clicktab_list .nav-tabs .nav-item .nav-link.active").trigger("click");
        $("#clicktab_list .tab-content .tab-pane.active").addClass("active");
        that.settings.items = that.settings.items.map(function (el) {
          if (el.id == that.settings['currentItem']['id']) {
            return newListItem;
          } else {
            return el;
          }
        });
        $('#clicktab_widget_heading').html("");
        $('#clicktab_widget_body').html("");
        $('#clicktab_widget_button').text('Add');
        that.settings['currentItem'] = null;
      } else {
        var _newListItem2 = {
          'id': makeid(),
          'heading': heading,
          'content': content
        };
        that.settings.items.push(_newListItem2);
        $("#clicktab_list ul").append("\n                <li class=\"nav-item\">\n                <a class=\"nav-link\" data-toggle=\"tab\" href=\"#".concat(_newListItem2.id, "\" role=\"tab\" aria-controls=\"").concat(_newListItem2.id, "\"> \n\n                    ").concat(heading, "\n                </a>             \n                </li>            \n             "));
        $("#clicktab_list #content_id").append("\n             <span class=\"delete-edit-accrodian\">\n             <i data-id=\"".concat(_newListItem2.id, "\" id=\"acc_delete_list\" class=\"fa fa-trash delete_section\"></i>\n             <i data-id=\"").concat(_newListItem2.id, "\" id=\"acc_edit_list\" class=\"fa fa-pencil-square-o delete_section\"></i>\n             </span> \n             <div class=\"tab-pane\" id=\"").concat(_newListItem2.id, "\" role=\"tabpanel\">\n             ").concat(content, "\n            </div>           \n          "));
        $("#clicktab_list .nav-tabs .nav-item:last-child .nav-link").trigger("click");
        that.settings.tab_background = $('.tabBgColor').find('.sp-preview-inner').css("background-color");
        that.settings.tab_activeBackground = $('.activeTabBgColor').find('.sp-preview-inner').css("background-color");
        that.settings.tab_activeText = $('.activeTabText').find('.sp-preview-inner').css("background-color");
        that.settings.tab_text = $('.tabTextColor').find('.sp-preview-inner').css("background-color");
        that.settings.content_background =$('.contentBg').find('.sp-preview-inner').css("background-color");
        that.settings.content_text = $('.contentTextColor').find('.sp-preview-inner').css("background-color");
        that.settings.tabtype = $(".clicktab_form").find("[name='tabtype']:checked").val();
        that.settings.tab_width = $(".clicktab_form").find("#tab_width").val();
        that.settings.tab_height = $(".clicktab_form").find("#tab_height").val();
        var tabActive = that.settings.tab_activeBackground;
        var textActive = that.settings.tab_activeText;
        $('#clicktab_form').find(".nav-item a").css({
          "background": that.settings.tab_background
        }).css({
          "color": that.settings.tab_text
        });
        $('#clicktab_form').find(".nav-item a.active").css({
          "background": tabActive
        }).css({
          "color": textActive
        });
        $('#clicktab_form').find(".tab-content .tab-pane").css({
          "background": that.settings.content_background
        }).css({
          "color": that.settings.content_text
        });
        $('#clicktab_form').off("click", ".nav-item a").on("click", ".nav-item a", function () {
          setTimeout(function () {
            $('#clicktab_form').find(".nav-item a").css({
              "background": that.settings.tab_background
            }).css({
              "color": that.settings.tab_text
            });
            $('#clicktab_form').find(".nav-item a.active").css({
              "background": tabActive
            }).css({
              "color": textActive
            });
          });
        });
        $('#clicktab_widget_heading').html("");
        $('#clicktab_widget_body').html("");
      }
    });
    
    $('.sp-preview-inner').on("click", function () {
      that.settings.tab_background = $('.tabBgColor').find('.sp-preview-inner').css("background-color");
      that.settings.tab_activeBackground = $('.activeTabBgColor').find('.sp-preview-inner').css("background-color");
      that.settings.tab_activeText = $('.activeTabText').find('.sp-preview-inner').css("background-color");
      that.settings.tab_text = $('.tabTextColor').find('.sp-preview-inner').css("background-color");
      that.settings.content_background =$('.contentBg').find('.sp-preview-inner').css("background-color");
      that.settings.content_text = $('.contentTextColor').find('.sp-preview-inner').css("background-color");
      that.settings.tabtype = $(".clicktab_form").find("[name='tabtype']:checked").val();
      that.settings.tab_width = $(".clicktab_form").find("#tab_width").val();
      that.settings.tab_height = $(".clicktab_form").find("#tab_height").val();
      var tabActive = that.settings.tab_activeBackground;
      var textActive = that.settings.tab_activeText;
      $('#clicktab_form').find(".nav-item a").css({
        "background": that.settings.tab_background
      }).css({
        "color": that.settings.tab_text
      });
      $('#clicktab_form').find(".nav-item a.active").css({
        "background": tabActive
      }).css({
        "color": textActive
      });
      $('#clicktab_form').find(".tab-content .tab-pane").css({
        "background": that.settings.content_background
      }).css({
        "color": that.settings.content_text
      });
      $('#clicktab_form').off("click", ".nav-item a").on("click", ".nav-item a", function () {
        setTimeout(function () {
          $('#clicktab_form').find(".nav-item a").css({
            "background": that.settings.tab_background
          }).css({
            "color": that.settings.tab_text
          });
          $('#clicktab_form').find(".nav-item a.active").css({
            "background": tabActive
          }).css({
            "color": textActive
          });
        });
      });
    });
  };
}

Click_tab.prototype = Object.create(MainWidget.prototype);