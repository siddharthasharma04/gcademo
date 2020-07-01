function encapsulateWidget(widget_html, $target, withoutPad, styles) {
  withoutPad = withoutPad || false;
  var rowId = makeid();
  var colId = makeid();
  var widgetId = $(widget_html).attr('id');
  styles = styles || "";

  if (!withoutPad) {
    var widget_in_row = "\n            <div class=\"row gridRow\" id=\"".concat(rowId, "\" style=\"").concat(styles, "\" draggable=\"true\" ondragstart=\"dragRow(event)\" ondragend=\"endRowDrag(event)\" ondragover=\"dragRowOnRow(event)\" ondrop=\"dropRowOnRow(event)\">\n                <div class=\"menuBtn\">\n                    <ul class=\"list-inline\">\n                        <li class=\"list-inline-item\"><i class=\"fa fa-arrows\"></i></li>\n                        <li class=\"list-inline-item\" onclick=\"addCol('").concat(rowId, "')\"><i class=\"fa fa-plus\"></i></li>\n                        <li><i class=\"fa fa-cog\"></i></li> \n                    </ul>\n                </div>\n            <div class=\"col-md-12 col-sm-12 gridCol\" style=\"").concat(styles, "\" id=\"").concat(colId, "\" draggable=\"true\" ondragstart=\"dragCol(event)\" ondragend=\"endColDrag(event)\" ondragover=\"dragColOnCol(event)\"  ondrop=\"dropColOnCol(event)\">\n                    <span class=\"resizeBtn\" data-colId=\"").concat(colId, "\"></span>\n                    ").concat(widget_html, "\n                    <div class=\"widget_config\" id=\"config_").concat(widgetId, "\"><i class=\"fa fa-cog\"></i></div>\n                    <div class=\"col-control-btn\">\n                        <ul class=\"list-inline\">\n                            <li><i class=\"fa fa-arrows\"></i></li>\n                            <li><i class=\"fa fa-cog\"></i></li>\n                        </ul>\n                    </div>\n                </div>\n            </div>");
  } else {
    var widget_in_row = "\n            <div class=\"row gridRow\" id=\"".concat(rowId, "\"  style=\"").concat(styles, "\" draggable=\"true\" ondragstart=\"dragRow(event)\" ondragend=\"endRowDrag(event)\" ondragover=\"dragRowOnRow(event)\" ondrop=\"dropRowOnRow(event)\">\n                <div class=\"menuBtn\">\n                    <ul class=\"list-inline\">\n                        <li class=\"list-inline-item\"><i class=\"fa fa-arrows\"></i></li>\n                        <li class=\"list-inline-item\" onclick=\"addCol('").concat(rowId, "')\"><i class=\"fa fa-plus\"></i></li>\n                        <li><i class=\"fa fa-cog\"></i></li> \n                    </ul>\n                </div>\n                <div class=\"gridCol col-md-12 col-sm-12\" style=\"").concat(styles, "\" id=\"").concat(colId, "\" draggable=\"true\" ondragstart=\"dragCol(event)\" ondragend=\"endColDrag(event)\" ondragover=\"dragColOnCol(event)\"  ondrop=\"dropColOnCol(event)\" style='padding:0px'>\n                    <span class=\"resizeBtn\" data-colId=\"").concat(colId, "\"></span>\n                    ").concat(widget_html, "\n                    <div class=\"widget_config\" id=\"config_").concat(widgetId, "\"><i class=\"fa fa-cog\"></i></div>\n                    <div class=\"col-control-btn\">\n                        <ul class=\"list-inline\">\n                            <li><i class=\"fa fa-arrows\"></i></li>\n                            <li><i class=\"fa fa-cog\"></i></li>\n                        </ul>\n                    </div>\n                </div>\n            </div>");
  }

  $('body > .right-clicl-menu').remove();

  if ($target.is(".editor") || $globalScope.addType === 'after') {
    $widgets[rowId] = {
      type: "row",
      children: [colId],
      parent: null,
      settings: getRowSettings(rowId)
    };
    $widgets[colId] = {
      type: "col",
      children: [],
      parent: rowId,
      bClasses: ['col-md-12', 'col-sm-12'],
      settings: getColSettings(colId)
    };
    var indices = getChapPageIndex();

    if ($target.is(".editor")) {
      $courseJson.index[indices.chapIndex].pages[indices.pageIndex].rows.push(rowId);
    } else {
      var rowEl = $target.hasClass("gridRow") ? $target : $target.closest(".gridRow");
      var parentRowId = $(rowEl).attr("id"); //var rowsClone = [...$courseJson.index[indices.chapIndex].pages[indices.pageIndex].rows]

      var rowsClone = $courseJson.index[indices.chapIndex].pages[indices.pageIndex].rows.slice(); //making a clone

      $courseJson.index[indices.chapIndex].pages[indices.pageIndex].rows.forEach(function (row, rIndex) {
        if (row === parentRowId) {
          insertAtIndex(rowsClone, rIndex + 1, rowId);
        }
      });
      $courseJson.index[indices.chapIndex].pages[indices.pageIndex].rows = rowsClone;
    }

    return {
      html: widget_in_row,
      parentId: colId
    };
  } else {
    var parentEl = $target.hasClass("gridCol") ? $target : $target.closest(".gridCol");
    parentEl.append("<div class=\"widget_config\" id=\"config_".concat(widgetId, "\"><i class=\"fa fa-cog\"></i></div>"));
    return {
      html: widget_html,
      parentId: parentEl.attr("id")
    };
  }
}

function Widget(settingsObj, widgetId) {
  if (widgetId) {
    //if reconstructing from Json
    this.widgetObj = $widgets[widgetId];
    this.id = widgetId;
  } else {
    this.widgetObj = {};
    this.id = "w" + makeid();
    this.widgetObj = {
      type: "widget",
      widgetType: "",
      id: this.id,
      //          settings: {...settingsObj}
      settings: Object.assign({}, settingsObj)
    };
  }

  this.insert = function (settings) {
    if (settings) {
      this.widgetObj.settings = settings;
    } else {
      console.error("You need to pass settings to insert function");
      return;
    } //adds the widget in dom, updates $widgets & its parent


    var widgetType = $globalScope.currentWidget;
    this.widgetObj.widgetType = widgetType;
    var widget_html = "<".concat(widgetType, " id=\"").concat(this.id, "\" class=\"ice_widget\" tabindex=\"0\"></").concat(widgetType, ">");
    var encapsulatedObj = encapsulateWidget(widget_html, $globalScope.dropTarget);
    $widgets[encapsulatedObj.parentId].children.push(this.id);

    if ($globalScope.addType === "append") {
      $($globalScope.dropTarget).append(encapsulatedObj.html);
    } else if ($globalScope.addType === "after") {
      $($globalScope.dropTarget).after(encapsulatedObj.html);
    }

    $widgets[this.id] = this.widgetObj;
    riot.mount("#".concat(this.id), {
      widgetId: this.id,
      settings: $widgets[this.id].settings
    });
    $globalScope.currentWidget = "";
  };

  this.hideEditButton = function () {
    $("#config_".concat(this.id)).remove();
  };

  this.getWidgetId = function () {
    //remove
    return this.id;
  };

  this.openAddModal = function (widget_modal_html) {
    var $modal = $(".full-screen-modal");
    $modal.find("#logo").html("Add Widget");
    $modal.find(".cst-widget-pnl-center").html(widget_modal_html);
    $modal.show();
  };

  this.openEditPanel = function (widget_modal_html) {
    $(".widget-settings-panel-body").html(widget_modal_html);
    $(".widget-settings-panel").addClass("open").removeClass('close');
    $(".widget-settings-panel .panel-title a").html("Widget settings");
    !$('body').hasClass('panel-open') ? $('body').addClass('panel-open') : '';
  };

  this.closeAddModal = function () {
    var $modal = $(".full-screen-modal");
    $modal.hide();
    $modal.find(".cst-widget-pnl-center").html('');
  };

  this.reMount = function (settings) {
    if (settings) {
      this.widgetObj.settings = settings;
    } else {
      console.error("You need to pass settings to reMount function");
      return;
    }

    riot.mount("#".concat(this.id), {
      widgetId: this.id,
      settings: $widgets[this.id].settings
    });
  };

  this.hideSettingsPanel = function () {
    $(".widget-settings-panel").addClass("close").removeClass('add');
    $(".widget-settings-panel-body").html("");
  };
}

function MainWidget() {}

MainWidget.prototype.buildFromJson = function (widgetId, settings) {
  this.settings = settings;
  this.widget = new Widget(this.settings, widgetId);
};