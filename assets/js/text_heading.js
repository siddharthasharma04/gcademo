function Text_heading() {
  this.init = function () {
    this.settings = {
      heading: "Heading",
      text: "Type Your Text Here",
      defaultHeading: "Heading",
      defaultText: "Type Your Text Here"
    };
    var widget = new Widget(this.settings);
    widget.insert(this.settings);
    widget.hideEditButton();
    return widget.getWidgetId();
  };

  this.buildFromJson = function (widgetId, settings) {
    this.settings = settings;
    this.widget = new Widget(this.settings, widgetId);
    this.widget.hideEditButton();
  };
}

Text_heading.prototype = Object.create(MainWidget.prototype);