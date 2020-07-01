function Codepen_widget() {
  this.init = function () {
    this.settings = {
      "htmlcontent": "",
      "cssstyle": "",
      "jscode": "",
      "content": "",
      "newElId": "",
      "customHeight": ""
    };
    this.widget = new Widget(this.settings);
    this.widget.openAddModal(this.getFormHTML());
    $('.widget_header').removeClass('mdwrap');
    this.bindAddFormEvents();
    return this.widget.getWidgetId();
  };

  this.edit = function () {
    this.widget.openAddModal(this.getFormHTML());
    this.bindEditFormEvents();
    $('.widget_header').removeClass('mdwrap');
  };

  this.getFormHTML = function () {
    var html = $("\n        <div class=\"widget-settings-full-width-height accordian_height\"> \n        <div class=\"cst-widget-pnl\">\n            <div class=\"cst-widget-pnl-bdy\">\n\t\t\t\t<div id=\"header\" class=\"codeplayer-header\">\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t    <div class=\"col-sm-12 text-center\">\n\t\t\t\t\t\t\t<div id=\"buttonContainer\" class=\"codeplayer-btns\">\n\t\t\t\t\t\t\t\t<div class=\"toggleButton\" id=\"html\" >HTML</div>\n\t\t\t\t\t\t\t\t<div class=\"toggleButton\" id=\"css\" >CSS</div>\n\t\t\t\t\t\t\t\t<div class=\"toggleButton\" id=\"javascript\">JavaScript</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n                </div>\n                <div class=\"custom_height\">\n                  <div class=\"col-sm-6\">\n                    <form class=\"form-inline\">\n                        <label class=\"modalLabel\"> Height :  </label>\n                        <input type=\"number\" autocomplete=\"off\" min=\"100\" max='500' class=\"fw-input form-element\" id=\"customHeight\"  name=\"height\" value=\"".concat(this.settings.customHeight, "\">\n                    </form>     \n                  </div>\n                </div>\n\t\t\t\t<div id=\"bodyContainer\" class=\"codeplayer-body\">\n                    <div class=\"col-sm-12\">\n                        <div class=\"codeplay-editor row\">\n                            <textarea id=\"htmlPanel\" class=\"panelbox col\" placeholder=\"Place your HTML code here..\">").concat(this.settings.htmlcontent, "</textarea>\n                            <textarea id=\"cssPanel\" class=\"panelbox  col\" placeholder=\"Place your CSS code here..\">").concat(this.settings.cssstyle, "</textarea>\n                            <textarea id=\"javascriptPanel\" class=\"panelbox  col\" placeholder=\"Place your Javascript code here..\">").concat(this.settings.jscode, "</textarea>\n                        </div>\n                    </div>\n\t\t\t\t\t<div class=\"code-play-output-panel\">\n\t\t\t\t\t\t<iframe id=\"outputPanel\" class=\"panelbox code-play-output\">").concat(this.settings.content, "</iframe>\n\t\t\t\t    </div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"save-custom-widget-code\">\n\t\t\t\t\t<button type=\"submit\" class=\"button yesBtn modalBtn\">Save</button> \n\t\t\t\t</div>\n            </div>\n        </div>\n        </div>\n        "));
    return html;
  };

  this.bindAddFormEvents = function () {
    var that = this;
    that.settings.newElId = makeid();
    $(".save-custom-widget-code button").on("click", function (e) {
      e.preventDefault();
      that.updateOutput();
      that.widget.insert(that.settings);
      that.widget.closeAddModal();
    });

    this.updateOutput = function () {
      // $("#outputPanel").contents().find("html").html(
      //     "<html><head><style type='text/css'>" + $("#cssPanel").val() +
      //     "</style></head><body>" + $("#htmlPanel").val() + "</body></html>");
      // that.settings.content = "<html><head><style type='text/css'>" + $("#cssPanel").val() +
      //     "</style></head><body>" + $("#htmlPanel").val() +
      //     "</body></html>";
      $("#outputPanel").contents().find('html').find('head').html("<html><head><style type='text/css'>" + $("#cssPanel").val() + "</style></head></html>");
      $("#outputPanel").contents().find('html').find('body').html(this.settings.htmlcontent);
      that.settings.content = "<html><head><style type='text/css'>" + $("#cssPanel").val() + "</style></head><body>" + $("#htmlPanel").val() + "</body></html>";
      document.getElementById("outputPanel").contentWindow.eval($("#javascriptPanel").val());
      that.settings.contentjs = $("#javascriptPanel").val();
      that.settings.htmlcontent = $("#htmlPanel").val();
      that.settings.cssstyle = $("#cssPanel").val();
      that.settings.jscode = $("#javascriptPanel").val();
      that.settings.customHeight = $("#customHeight").val();
    };

    $(".toggleButton").hover(function () {
      $(this).addClass("highlightedButton");
    }, function () {
      $(this).removeClass("highlightedButton");
    });
    $(".toggleButton").click(function () {
      $(this).toggleClass("active");
      $(this).removeClass("highlightedButton");
      var panelId = $(this).attr("id") + "Panel";
      $("#" + panelId).toggleClass("hidden");
    });
    $("textarea").on('change keyup paste', function () {
      that.updateOutput();
    });
  };

  this.bindEditFormEvents = function () {
    var that = this;
    $(".save-custom-widget-code button").on("click", function (e) {
      e.preventDefault();
      that.updateOutput();
      that.widget.reMount(that.settings);
      that.widget.closeAddModal();
    });

    this.updateOutput = function () {
      // $("#outputPanel").contents().find("html").html(
      //     "<html><head><style type='text/css'>" + $("#cssPanel").val() +
      //     "</style></head><body>" + $("#htmlPanel").val() + "</body></html>");
      // that.settings.content = "<html><head><style type='text/css'>" + $("#cssPanel").val() +
      //     "</style></head><body>" + $("#htmlPanel").val() +
      //     "</body></html>";
      $("#outputPanel").contents().find('html').find('head').html("<html><head><style type='text/css'>" + $("#cssPanel").val() + "</style></head></html>");
      $("#outputPanel").contents().find('html').find('body').html(this.settings.htmlcontent);
      that.settings.content = "<html><head><style type='text/css'>" + $("#cssPanel").val() + "</style></head><body>" + this.settings.htmlcontent + "</body></html>";
      document.getElementById("outputPanel").contentWindow.eval($("#javascriptPanel").val());
      that.settings.contentjs = $("#javascriptPanel").val();
      that.settings.htmlcontent = $("#htmlPanel").val();
      that.settings.cssstyle = $("#cssPanel").val();
      that.settings.jscode = $("#javascriptPanel").val();
      that.settings.customHeight = $("#customHeight").val();
    };

    $(".toggleButton").hover(function () {
      $(this).addClass("highlightedButton");
    }, function () {
      $(this).removeClass("highlightedButton");
    });
    $(".toggleButton").click(function () {
      $(this).toggleClass("active");
      $(this).removeClass("highlightedButton");
      var panelId = $(this).attr("id") + "Panel";
      $("#" + panelId).toggleClass("hidden");
    });
    $("textarea").on('change keyup paste', function () {
      that.updateOutput();
    });
  };
}

Codepen_widget.prototype = Object.create(MainWidget.prototype);