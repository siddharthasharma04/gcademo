function Line_break_widget() {
  this.init = function () {
    this.settings = {
      "lineHeight": 38
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
    var html = $("\n        <div class=\"\">\n            <form id=\"lineBreakForm\">\n                <div class=\"form-group p_20\">\n                    <label class=\"form-element-label non-capitalize\">Height <span class=\"font12\">(in px)</span></label>\n                    <input type=\"number\" min=\"38\" name=\"line-height\" id=\"lineheight\" class=\"form-file-element form-control\" value=\"".concat(this.settings.lineHeight, "\"/>\n                </div>\n                <div class=\"form-group text-right px-3\">\n                    <button type=\"submit\" class=\"modalBtn yesBtn\" >Apply</button>\n                </div>\n            </form>\n        </div>\n                \n        "));
    return html;
  };

  this.bindEditFormEvents = function () {
    var that = this;
    $("#lineBreakForm").on("submit", function (e) {
      e.preventDefault();
      that.createLinebreak(e);
      that.widget.reMount(that.settings); // that.widget.insert(that.settings);

      that.widget.closeAddModal();
    });
  };

  this.createLinebreak = function (ev) {
    ev.preventDefault();
    this.settings.lineHeight = $("#lineheight").val();

    if (this.settings.lineHeight.trim() === "") {
      return;
    }
  };
}

Line_break_widget.prototype = Object.create(MainWidget.prototype);