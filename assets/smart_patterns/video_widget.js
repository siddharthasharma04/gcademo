function Video_widget() {
  this.init = function () {
    this.settings = {
      "url": ""
    };
    this.widget = new Widget(this.settings);
    this.widget.openAddModal(this.getFormHTML());
    this.bindAddFormEvents();
    return this.widget.getWidgetId();
  }; // https://www.w3schools.com/html/mov_bbb.mp4
  // https://www.html5rocks.com/en/tutorials/video/basics/devstories.webm


  this.edit = function () {
    this.widget.openEditPanel(this.getFormHTML());
    this.bindEditFormEvents();
  };

  this.getFormHTML = function () {
    var html = "\n            <form id=\"video_widget_form\" class=\"form-settings\">\n                <div class=\"form-group\">\n                    <label class=\"form-element-label\">Video URL</label>\n                    <input type=\"text\" class=\"form-control form-element\" name=\"url\" id=\"url\" value=\"".concat(this.settings.url, "\" />\n                </div>\n                <div class=\"form-group\">\n                    <button type=\"submit\" class=\"formBtn\" onclick=\"\">Apply</button>\n                </div>\n            </form>\n                \n        ");
    return html;
  };

  this.bindAddFormEvents = function () {
    var that = this;
    $("#video_widget_form").on("submit", function (e) {
      e.preventDefault();
      that.settings.url = $(e.target).find("#url").val();
      that.widget.insert(that.settings);
      that.widget.closeAddModal();
    });
  };

  this.bindEditFormEvents = function () {
    var that = this;
    $("#video_widget_form").on("submit", function (e) {
      e.preventDefault();
      that.settings.url = $(e.target).find("#url").val();
      that.widget.reMount(that.settings);
      that.widget.hideSettingsPanel();
    });
  };
}

Video_widget.prototype = Object.create(MainWidget.prototype);