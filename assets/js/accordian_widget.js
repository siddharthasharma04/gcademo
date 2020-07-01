function Accordian_widget() {
  this.init = function () {
    this.settings = {
      "items": []
    };
    this.widget = new Widget(this.settings);
    this.widget.openAddModal(this.getFormHTML());
    this.bindAddFormEvents();
    return this.widget.getWidgetId();
  };

  this.edit = function () {
    this.widget.openAddModal(this.getFormHTML());
    this.bindEditFormEvents();
  };

  this.accordianValidation = function () {
    $('#accordian_widget_heading,#accordian_widget_body').on('keyup', function () {
      if ($('#accordian_widget_heading').html().trim() != '' && $('#accordian_widget_body').html().trim() != '') {
        $('#accordian_widget_button').removeClass('disabled');
      } else {
        $('#accordian_widget_button').addClass('disabled');
        return;
      }
    });
  };

  this.getFormHTML = function () {
    var html = $("\n        <div class=\"widget-settings-wrapper mdwrap accordian-widget-modal accordian_height p-4\"> \n            <form id=\"accordian_form\" class=\"accordian_form modalBody\">\n                <div class=\"row\">\n                    <div class=\"col-md-5 bg-lightGrey\">    \n                        <div class=\"items\">\n                                <div class='item'>\n                                    <div class=\"form-group\">\n                                        <label class=\"modalLabel custom-label-box4\">Heading</label> \n                                        <div contenteditable=\"true\" id=\"accordian_widget_heading\" name=\"heading\" class=\"fw-input form-control\"></div>\n                                    </div>\n                                    <div class=\"form-group\">\n                                        <label class=\"modalLabel custom-label-box4\">Text</label>\n                                        <div contenteditable=\"true\" id=\"accordian_widget_body\" name=\"body\" class=\"fw-input form-control\"></div>\n                                    </div>\n                                </div>\n                                <div class=\"modalFooter\">\n                                    <button type=\"submit\" id=\"accordian_widget_button\" class=\"btn disabled modalBtn add_section yesBtn pull-right\">Add</button>\n                                </div>\n                        </div>\n                    </div>  \n                    <div class=\"col-md-7\">  \n                        <div class=\"accordian_list\" id=\"accordian_list\">\n                        <div class=\"no-accordian-found\">No item added in accordian.</div> \n                            <ul class=\"list-line\"></ul>\n                            <div class=\"form-group float-right\">\n                                <button type=\"submit\" class=\"modalBtn hide submitbtn yesBtn pull-right\">Apply</button>\n                            </div>\n                        </div>\n                    </div>  \n                </div>  \n            </form>\n        </div>\n        ");
    return html;
  };

  this.bindAddFormEvents = function () {
    var that = this;
    that.accordianValidation();
    $('.submitbtn').addClass('disabled');
    enableCkeditor("accordian_widget_body");
    enableCkeditor("accordian_widget_heading");
    $("#accordian_form").on("submit", function (e) {
      e.preventDefault();
      that.widget.insert(that.settings);
      that.widget.closeAddModal();
    });
    $('#accordian_list').on("click", "#acc_delete_list", function (e) {
      e.preventDefault();
      var delId = $(e.target).data()['id'];
      that.settings.items = that.settings.items.filter(function (el) {
        return el.id != delId;
      });
      $(this).parents('li').remove();

      if (!$('.list-line').find('li').length) {
        $('.accordian_list').append('<div class="no-accordian-found">No item added in accordian.</div>');
        $('.submitbtn').addClass('hide');
      }
    });
    $('#accordian_list').on("click", "#acc_edit_list", function (e) {
      e.preventDefault();
      var delId = $(e.target).data()['id'];
      that.settings['currentItem'] = that.settings.items.filter(function (el) {
        return el.id == delId;
      })[0];
      $('#accordian_widget_heading').html(that.settings['currentItem']['heading']);
      $('#accordian_widget_body').html(that.settings['currentItem']['content']);
      $('#accordian_widget_button').text('Save');
    });
    $('#accordian_form').on("click", ".add_section", function (e) {
      e.preventDefault();
      $('#accordian_widget_button').removeClass('disabled');
      $('.submitbtn').removeClass('disabled');

      if ($('#accordian_widget_heading').html().trim() == '' || $('#accordian_widget_body').html().trim() == '') {
        return;
      }

      if ($('.no-accordian-found').is(':visible')) {
        $('.no-accordian-found').remove();
        $('.submitbtn').removeClass('hide');
      }

      var heading = $("#accordian_widget_heading").html();
      var content = $("#accordian_widget_body").html();

      if (that.settings['currentItem'] && that.settings['currentItem']['id']) {
        var newListItem = {
          'id': that.settings['currentItem']['id'],
          'heading': heading,
          'content': content
        };
        $('#' + that.settings['currentItem']['id']).html(" \n                    <span class=\"addHeading\">".concat(heading, "\n                        <span class=\"delete-edit-accrodian\">\n                                <i data-id=\"").concat(newListItem.id, "\" id=\"acc_delete_list\" class=\"fa fa-trash delete_section\"></i>\n                                <i data-id=\"").concat(newListItem.id, "\" id=\"acc_edit_list\" class=\"fa fa-pencil-square-o edit_section\"></i>\n                        </span>\n                    </span>\n                    <div class=\"clearfix\"></div>\n               \n                    <span class=\"accordian-text\">").concat(content, "</span>\n                "));
        that.settings.items = that.settings.items.map(function (el) {
          if (el.id == that.settings['currentItem']['id']) {
            return newListItem;
          } else {
            return el;
          }
        });
        $('#accordian_widget_heading').html("");
        $('#accordian_widget_body').html("");
        $('#accordian_widget_button').text('Add');
        that.settings['currentItem'] = null;
      } else {
        var _newListItem = {
          'id': makeid(),
          'heading': heading,
          'content': content
        };
        that.settings.items.push(_newListItem);
        $("#accordian_list ul").append("\n                <li id=\"".concat(_newListItem.id, "\">\n                    <span class=\"addHeading\">").concat(heading, "\n                        <span class=\"delete-edit-accrodian\">\n                                <i data-id=\"").concat(_newListItem.id, "\" id=\"acc_delete_list\" class=\"fa fa-trash delete_section\"></i>\n                                <i data-id=\"").concat(_newListItem.id, "\" id=\"acc_edit_list\" class=\"fa fa-pencil-square-o edit_section\"></i>\n                        </span>\n                    </span>\n                    <div class=\"clearfix\"></div>\n                    <span class=\"accordian-text\">").concat(content, "</span>\n                </li>            \n             "));
        $('#accordian_widget_heading').html("");
        $('#accordian_widget_body').html("");
      }
    });
  };

  this.bindEditFormEvents = function () {
    var that = this;
    enableCkeditor("accordian_widget_body");
    enableCkeditor("accordian_widget_heading");
    that.accordianValidation();

    if ($('.no-accordian-found').is(':visible')) {
      $('.no-accordian-found').remove();
      $('.submitbtn').removeClass('hide');
    }

    this.settings.items.forEach(function (item) {
      $("#accordian_list ul").append("\n                <li id=\"".concat(item.id, "\">\n                    <span class=\"addHeading\">").concat(item.heading, "\n                    <span class=\"delete-edit-accrodian\">\n                        <i data-id=\"").concat(item.id, "\" id=\"acc_delete_list\" class=\"fa fa-trash delete_section\"></i>\n                        <i data-id=\"").concat(item.id, "\" id=\"acc_edit_list\" class=\"fa fa-pencil-square-o edit_section\"></i>\n                        </span>\n                    </span>\n                    <div class=\"clearfix\"></div>\n                    <span class=\"accordian-text\">").concat(item.content, "</span>\n                </li>\n            "));
    });
    $("#accordian_form").on("submit", function (e) {
      e.preventDefault();
      that.widget.reMount(that.settings);
      that.widget.closeAddModal();
    });
    $('#accordian_list').on("click", "#acc_delete_list", function (e) {
      e.preventDefault();
      var delId = $(e.target).data()['id'];

      if (that.settings.items.length == 1) {
        displayNotification("Can not delete all items from accordian.", 'error');
        return;
      }

      that.settings.items = that.settings.items.filter(function (el) {
        return el.id != delId;
      });
      $(this).parents('li').remove();
    });
    $('#accordian_list').on("click", "#acc_edit_list", function (e) {
      e.preventDefault();
      var delId = $(e.target).data()['id'];
      that.settings['currentItem'] = that.settings.items.filter(function (el) {
        return el.id == delId;
      })[0];
      $('#accordian_widget_heading').html(that.settings['currentItem']['heading']);
      $('#accordian_widget_body').html(that.settings['currentItem']['content']);
      $('#accordian_widget_button').text('Save');
    });
    $('#accordian_form').on("click", ".add_section", function (e) {
      e.preventDefault();
      $('#accordian_widget_button').addClass('disabled');
      $('.submitbtn').removeClass('disabled');

      if ($('#accordian_widget_heading').html().trim() == '' || $('#accordian_widget_body').html().trim() == '') {
        return;
      }

      if ($('.no-accordian-found').is(':visible')) {
        $('.no-accordian-found').remove();
        $('.submitbtn').removeClass('hide');
      }

      var heading = $("#accordian_widget_heading").html();
      var content = $("#accordian_widget_body").html();

      if (that.settings['currentItem'] && that.settings['currentItem']['id']) {
        var newListItem = {
          'id': that.settings['currentItem']['id'],
          'heading': heading,
          'content': content
        };
        $('#' + that.settings['currentItem']['id']).html(" \n                <li id=\"".concat(newListItem.id, "\">\n                    <span class=\"addHeading\">").concat(heading, "\n                        <span class=\"delete-edit-accrodian\">\n                                <i data-id=\"").concat(newListItem.id, "\" id=\"acc_delete_list\" class=\"fa fa-trash delete_section\"></i>\n                                <i data-id=\"").concat(newListItem.id, "\" id=\"acc_edit_list\" class=\"fa fa-pencil-square-o edit_section\"></i>\n                        </span>\n                    </span>\n                    <div class=\"clearfix\"></div>\n                    <span class=\"accordian-text\">").concat(content, "</span>\n                </li>  "));
        that.settings.items = that.settings.items.map(function (el) {
          if (el.id == that.settings['currentItem']['id']) {
            return newListItem;
          } else {
            return el;
          }
        });
        $('#accordian_widget_heading').html("");
        $('#accordian_widget_body').html("");
        $('#accordian_widget_button').text('Add');
      } else {
        var _newListItem2 = {
          'id': makeid(),
          'heading': heading,
          'content': content
        };
        that.settings.items.push(_newListItem2);
        $("#accordian_list ul").append("\n                <li id=\"".concat(_newListItem2.id, "\">\n                    <span class=\"addHeading\">").concat(heading, "\n                        <span class=\"delete-edit-accrodian\">\n                                <i data-id=\"").concat(_newListItem2.id, "\" id=\"acc_delete_list\" class=\"fa fa-trash delete_section\"></i>\n                                <i data-id=\"").concat(_newListItem2.id, "\" id=\"acc_edit_list\" class=\"fa fa-pencil-square-o edit_section\"></i>\n                        </span>\n                    </span>\n                    <div class=\"clearfix\"></div>\n                    <span class=\"accordian-text\">").concat(content, "</span>\n                </li>            \n             "));
      }
    });
  };
}

Accordian_widget.prototype = Object.create(MainWidget.prototype);