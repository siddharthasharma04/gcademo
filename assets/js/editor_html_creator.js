function getHeaderHTML(pageType) {
  if ($courseJson.headerId) {
    var $pageObj = $("<header></header>");
    var $headerObj = createRowHTML($pageObj, $courseJson.headerId, pageType, "header");
    return $headerObj.html();
  } else return "";
}

function getFooterHTML(pageType) {
  if ($courseJson.footerId) {
    var $pageObj = $("<footer></footer>");
    var $footerObj = createRowHTML($pageObj, $courseJson.footerId, pageType, "footer");
    return $footerObj.html();
  } else return "";
}

function createRowHTML($pageObj, rowId, pageType) {
  var className = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
  var rowHTML = "\n\t<div class=\"row gridRow ".concat(className, "\" id=\"").concat(rowId, "\" draggable=\"false\" ondragstart=\"dragRow(event)\" ondragend=\"endRowDrag(event)\" ondragover=\"dragRowOnRow(event)\" ondrop=\"dropRowOnRow(event)\">\n\t\t<div class=\"menuBtn\">\n\t\t\t<ul class=\"list-inline\">\n\t\t\t\t\n\t\t\t\t<li class=\"rowupicon\" title=\"Shift Row Up\" onclick = \"rowManipulation.init('").concat(rowId, "','shiftRowUp')\"><i class=\"fas fa-long-arrow-alt-up\"></i></li><li onclick=\"addCol('").concat(rowId, "')\"><i class=\"fa fa-plus\" title=\"Add Column\"></i></li><li class=\"copyrowicon\" title=\"Copy Row\" onclick=\"rowManipulation.init('").concat(rowId, "','copyRow')\"><i class=\"far fa-copy\"></i></li>\n\t\t\t\t<li class=\"delrowicon\" title=\"Delete Row\" onclick = \"rowManipulation.init('").concat(rowId, "','delRow')\"><i class=\"far fa-trash-alt\"></i></li><li><i class=\"fa fa-cog\" title=\"Row Settings\"></i></li><li class=\"rowdownicon\" title=\"Shift Row Down\" onclick=\"rowManipulation.init('").concat(rowId, "','shiftRowDown')\"><i class=\"fas fa-long-arrow-alt-down\"></i></li>\n\t\t\t</ul>\n\t\t</div>\n\t</div>");
  $pageObj.append(rowHTML);
  applySettingsToRow(rowId, $pageObj.find("#".concat(rowId)));
  FixedLayout.applyFixedSettingsToRow(rowId, $pageObj.find("#".concat(rowId)));
  Page.addWidgetId(rowId, null, null);

  if ($widgets[rowId]) {
    $widgets[rowId].children.forEach(function (colId) {
      if (!$widgets[colId]) return;
      var widgetEdit = "";
      Page.addWidgetId(colId, null, null);

      if ($widgets[colId].children.length) {
        //Show fa-cog only if widget is present inside
        var widgetEdit = "\n                    <div class=\"widget_settings\">\n                        <div class=\"widget_approve display-none\" data-widget-id=\"".concat($widgets[colId].children[0], "\" data-status=\"Need to Approve or Reject\" title=\"Need to Approve or Reject\">\n                            <i class=\"fa fa-thumbs-o-up\"></i>\n                            <div class=\"widget-approve-tooltip\">\n                                <span class=\"widget-approve-tooltip-accept\"><i class=\"fa fa-check\"></i> Accept</span>\n                                <span class=\"widget-approve-tooltip-reject\"><i class=\"fa fa-times\"></i> Reject</span>\n                                <span class=\"widget-approve-tooltip-need-review\"><i class=\"fa fa-eye\"></i> Need Review</span>\n                            </div>\n                        </div>    \n                        <div class=\"widget_comment\" onclick=\"Comments.showAddComment('").concat($widgets[colId].children[0], "')\">\n                            <i class=\"far fa-comment-alt\"></i>\n                        </div>\n                        <div class=\"widget_config\" id=\"config_").concat($widgets[colId].children[0], "\">\n                            <i class=\"fas fa-tools\"></i>\n                        </div>\n                    </div>\n                    <div class=\"widget_approve_image\" style=\"\"><img src=\"\" width=\"18\" alt=\"\"></div>");
      }

      var colHTML = "\n\t\t\t\t<div class=\"gridCol ".concat($widgets[colId].bClasses.join(' '), "\" id=\"").concat(colId, "\" draggable=\"false\" ondragstart=\"dragCol(event)\" ondragend=\"endColDrag(event)\" ondragover=\"dragColOnCol(event)\"  ondrop=\"dropColOnCol(event)\">\n\t\t\t\t\t<span class=\"resizeBtn\" data-colId=\"").concat(colId, "\"></span>\n\t\t\t\t\t<div class=\"col-control-btn\">\n\t\t\t\t\t\t<ul class=\"list-inline\">\n\t\t\t\t\t\t\t<li class=\"shiftcolleft\" title=\"Shift Column Left\" onclick=\"rowManipulation.init('").concat(colId, "','shiftColLeft')\" ><i class=\"fas fa-long-arrow-alt-left\"></i></li><li><i class=\"fa fa-cog\" title=\"Column Settings\"></i></li><li class=\"shiftcolright\" title=\"Shift Column Right\" onclick=\"rowManipulation.init('").concat(colId, "','shiftColRight')\" ><i class=\"fas fa-long-arrow-alt-right\"></i></li>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t\t").concat(widgetEdit, "\n\t\t\t\t</div>\n\t\t\t");
      $pageObj.find("#".concat(rowId)).append(colHTML);

      if (pageType === "editor") {
        // var settings = {...$widgets[colId].settings};
        var settings = Object.assign({}, $widgets[colId].settings);
        applySettingsToCol(settings, $pageObj.find("#".concat(colId)), "editor");
      } else {
        applySettingsToCol($widgets[colId].settings, $pageObj.find("#".concat(colId)));
        $pageObj.find('.col-control-btn, .menuBtn, .resizeBtn').remove();
      }

      $widgets[colId].children.forEach(function (widgetId) {
        addWidget(widgetId, $pageObj.find("#".concat(colId)));
      });
    });
  }

  return $pageObj;
}

function createPageFromJson(pageJSON, pageType, widgetsJson) {
  var chapIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
  var pageIndex = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
  var localWidgets = widgetsJson || $widgets;
  var $pageObj = $("\n        <div class=\"editor\" id=\"editorPage\" ondragover=\"allowDrop(event)\" ondrop=\"dropRowOnEditor(event)\" ondrag=\"dragRowOnEditor(event)\" ondragend=\"endRowDrag(event)\" >\n\t\t</div>\n\t");
  pageJSON.rows.forEach(function (rowId) {
    if (!rowId) {
      return rowId;
    }

    var rowHTML = "\n\t\t\t<div class=\"row gridRow\" id=\"".concat(rowId, "\" draggable=\"false\" ondragstart=\"dragRow(event)\" ondragend=\"endRowDrag(event)\" ondragover=\"dragRowOnRow(event)\" ondrop=\"dropRowOnRow(event)\">\n\t            <div class=\"menuBtn\">\n\t                <ul class=\"list-inline\">\n\t                    \n\t                    <li class=\"rowupicon\" title=\"Shift Row Up\" onclick = \"rowManipulation.init('").concat(rowId, "','shiftRowUp')\"><i class=\"fas fa-long-arrow-alt-up\"></i></li><li onclick=\"addCol('").concat(rowId, "')\"><i class=\"fa fa-plus\" title=\"Add Column\"></i></li>\n\t                    <li class=\"copyrowicon\" title=\"Copy Row\" onclick=\"rowManipulation.init('").concat(rowId, "','copyRow')\"><i class=\"far fa-copy\"></i></li><li class=\"delrowicon\" title=\"Delete Row\" onclick = \"rowManipulation.init('").concat(rowId, "','delRow')\"><i class=\"far fa-trash-alt\"></i></li><li><i class=\"fa fa-cog\" title=\"Row Settings\"></i></li><li class=\"rowdownicon\" title=\"Shift Row Down\" onclick=\"rowManipulation.init('").concat(rowId, "','shiftRowDown')\"><i class=\"fas fa-long-arrow-alt-down\"></i></li>\n\t                </ul>\n\t            </div>\n\t\t\t</div>");
    $pageObj.append(rowHTML);
    applySettingsToRow(rowId, $pageObj.find("#".concat(rowId)), localWidgets);
    FixedLayout.applyFixedSettingsToRow(rowId, $pageObj.find("#".concat(rowId)));
    if (!localWidgets[rowId]) return;

    if (chapIndex == "" && pageIndex == "") {
      Page.addWidgetId(rowId, null, null, pageJSON);
    } else {
      Page.addWidgetId(rowId, chapIndex, pageIndex, pageJSON);
    } // if (!$localWidgets[rowId]) return;


    localWidgets[rowId].children.forEach(function (colId) {
      var widgetEdit = "";

      if (chapIndex == "" && pageIndex == "") {
        Page.addWidgetId(colId, null, null, pageJSON);
      } else {
        Page.addWidgetId(colId, chapIndex, pageIndex, pageJSON);
      }

      if (localWidgets[colId]) {
        if (localWidgets[colId].children.length) {
          //Show fa-cog only if widget is present inside
          var widgetEdit = "\n                        <div class=\"widget_settings\">\n                            <div class=\"widget_approve display-none\" data-widget-id=\"".concat(localWidgets[colId].children[0], "\"  data-status=\"Need to Approve or Reject\" title=\"Need to Approve or Reject\">\n                                <i class=\"fa fa-thumbs-o-up\"></i>\n                                <div class=\"widget-approve-tooltip\">\n                                    <span class=\"widget-approve-tooltip-accept\"><i class=\"fa fa-check\"></i> Accept</span>\n                                    <span class=\"widget-approve-tooltip-reject\"><i class=\"fa fa-times\"></i> Reject</span>\n                                    <span class=\"widget-approve-tooltip-need-review\"><i class=\"fa fa-eye\"></i> Need Review</span>\n                                </div>\n                            </div>    \n                            <div class=\"widget_comment\" onclick=\"Comments.showAddComment('").concat(localWidgets[colId].children[0], "')\">\n                                <i class=\"far fa-comment-alt\"></i>\n                            </div>\n                            <div class=\"widget_config\" id=\"config_").concat(localWidgets[colId].children[0], "\">\n                                <i class=\"fas fa-tools\"></i>\n                            </div>\n                        </div>\n                        <div class=\"widget_approve_image\" style=\"\"><img src=\"\" width=\"18\" alt=\"\"></div>");
        }

        var colHTML = "\n\t\t\t\t\t<div class=\"gridCol ".concat(localWidgets[colId].bClasses.join(' '), "\" id=\"").concat(colId, "\" draggable=\"false\" ondragstart=\"dragCol(event)\" ondragend=\"endColDrag(event)\" ondragover=\"dragColOnCol(event)\"  ondrop=\"dropColOnCol(event)\">\n\t\t\t\t\t\t<span class=\"resizeBtn\" data-colId=\"").concat(colId, "\"></span>\n\t\t\t\t\t\t<div class=\"col-control-btn\">\n\t\t\t\t\t\t\t<ul class=\"list-inline\">\n\t\t\t\t\t\t\t\t<li class=\"shiftcolleft\" title=\"Shift Column Left\" onclick=\"rowManipulation.init('").concat(colId, "','shiftColLeft')\" ><i class=\"fas fa-long-arrow-alt-left\"></i></li><li><i class=\"fa fa-cog\" title=\"Column Settings\"></i></li><li class=\"shiftcolright\" title=\"Shift Column Right\" onclick=\"rowManipulation.init('").concat(colId, "','shiftColRight')\" ><i class=\"fas fa-long-arrow-alt-right\"></i></li>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t").concat(widgetEdit, "\n\t\t\t\t\t</div>\n\t\t\t\t");
        $pageObj.find("#".concat(rowId)).append(colHTML);
        // console.log(localWidgets);
        // console.log(localWidgets[colId]);

        if (pageType === "editor") {
          // var settings = {...$widgets[colId].settings};
          var settings = Object.assign({}, localWidgets[colId].settings);
          applySettingsToCol(settings, $pageObj.find("#".concat(colId)), "editor");
        } else {
          applySettingsToCol(localWidgets[colId].settings, $pageObj.find("#".concat(colId)));
          $pageObj.find('.col-control-btn, .menuBtn, .resizeBtn').remove();
        }
        // To check for padding remove and default padding
        var widgetId  = (localWidgets[colId].children).length ? localWidgets[colId].children : 0;
        var colId1 = $pageObj.find("#".concat(colId));
        var customSettingCheck = localWidgets[colId].settings.hasOwnProperty('customSettingAdded');
        //console.log(colId1);
        ///console.log(($("#"+colId)));
        //var checkIsWidget = false;
        if(widgetId != 0){
            if(localWidgets[widgetId].widgetType == "image_widget" || localWidgets[widgetId].widgetType == "video_w_v2" || localWidgets[widgetId].widgetType == "image_with_textv2"){
              if(customSettingCheck ){
                    colId1.removeClass('gridRemove');
              }else {
                    colId1.addClass('gridRemove');
              }
            }
        }
        localWidgets[colId].children.forEach(function (widgetId) {
          addWidget(widgetId, $pageObj.find("#".concat(colId)), pageJSON, localWidgets, chapIndex, pageIndex);
        });
      }
    });
  });
  var pageHTML = $pageObj.html();
  var chapterId = $(".sidebar .page.active span").attr("data-superid");
  var pageId = $(".sidebar .page.active span").attr("data-id");
  var indices = getChapPageIndex(pageId, chapterId);
  var chaptertype = ($courseJson.index[indices.chapIndex].type != undefined) ? $courseJson.index[indices.chapIndex].type : "";
  var headerHTML = '';
  var footerHTML = '';

  if (chaptertype != 'assessment') {
    headerHTML = getHeaderHTML(pageType);
    footerHTML = getFooterHTML(pageType);
  }

  if (!pageJSON.excludeHeader) pageHTML = headerHTML + pageHTML;
  if (!pageJSON.excludeFooter) pageHTML = pageHTML + footerHTML;
  return pageHTML;
}

var getApproveStatusData = function getApproveStatusData(widgetId) {};

function addWidget(widgetId, colElement, pageObj, localWidgets) {
  var chapId = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
  var pgId = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "";
  var widgets = localWidgets || $widgets;
  if (!widgets[widgetId]) return;
  var widgetType = widgets[widgetId].widgetType;
  var widgetClass = widgets[widgetId].class || "";
  var widgetString = "<".concat(widgetType, " id=\"").concat(widgetId, "\" data-content=\"\" class=\"ice_widget ").concat(widgetClass, "\"></").concat(widgetType, ">");
  colElement.append(widgetString);
  //cl("addwidget", widgetId);

  if (chapId == "" && pgId == "") {
    Page.addWidgetId(widgetId, null, null, pageObj);
  } else {
    Page.addWidgetId(widgetId, chapId, pgId, pageObj); //for behind active page or pages created on fly
  }
}

function mountWidgetsInPage() {
  var chapId = $(".sidebar .page.active span").attr("data-superid");
  var pageId = $(".sidebar .page.active span").attr("data-id");
  var indices = getChapPageIndex(pageId, chapId);
  mountWidgetsByIndices(indices.pageIndex, indices.chapIndex);
  var urlParams = new URLSearchParams(location.search);
  $('#loader').show();
  axios.post(appUrl + '/getApproveStatus', {
    courseId: parseInt(urlParams.get('id')),
    chapterId: chapId,
    pageId: pageId,
    widgetId: false,
    tableName: "widgets",
    feildType: 'approve_status'
  }, {
    headers: {
      "token": localStorage.getItem('token')
    }
  }).then(function (result) {
    var pageData = result.data.data.pageData;
    var showIconColor = '';

    if (pageData != 0) {
      pageData.forEach(function (val, key) {
        var widgetId = val.widgetId;
        var appoveStatus = val.feildVal;
        var widget_classname = "widget_" + appoveStatus.toLowerCase();

        if (appoveStatus != "") {
          imgSrc = "./assets/img/";

          if (appoveStatus == "Approved") {
            showStatus = "accepted.png";
            showIconStatus = "fa fa-thumbs-o-up";
            showIconColor = "rgb(27, 167, 27)";
          } else if (appoveStatus == "Rejected") {
            showStatus = "reject.png";
            showIconStatus = "fa fa-thumbs-o-down";
            showIconColor = "rgb(243, 83, 83)";
          } else {
            showStatus = '';
            showIconStatus = "fa fa-thumbs-o-up";
            showIconColor = "#444444";
          } // showStatus = (appoveStatus == "Approved") ? "accepted.png" : "reject.png";
          // showIconStatus = (appoveStatus == "Approved") ? "fa fa-thumbs-o-up" : "fa fa-thumbs-o-down";
          // showIconColor = (appoveStatus == "Approved") ? "rgb(27, 167, 27)" : "rgb(243, 83, 83);";


          imgSrc = imgSrc + showStatus;
        }

        $("#" + widgetId).siblings().filter(".widget_settings").children().filter(".widget_approve").addClass(widget_classname).children().filter("i").attr({
          "class": showIconStatus,
          "style": "color: ".concat(showIconColor)
        });
        $("#" + widgetId).siblings().filter(".widget_approve_image").children().filter("img").attr({
          "src": imgSrc
        });
      });
    }

    $('#loader').hide();
  });
}

function mountWidgetsByIds(pageId, chapId) {
  var indices = getChapPageIndex(pageId, chapId);
  mountWidgetsByIndices(indices.pageIndex, indices.chapIndex);
}

function mountWidgetsByIndices(pageIndex, chapIndex) {
  if ($courseJson.index[chapIndex].type != "assessment") {
    mountHeaderWidgets();
    mountFooterWidgets();
  }

  var page = $courseJson.index[chapIndex].pages[pageIndex];

  if (typeof isPreviewPage === "undefined" && typeof isVendorPage === "undefined") {
    if (page.pageType == "widthImage") {
      hideShowStoryBoardBtnPanel(true);
    } else {
      hideShowStoryBoardBtnPanel(false);
    }
  }

  if (!page.rows) {
    return;
  }

  page.rows.forEach(function (rowId) {
    if (rowId) {
      if (!$widgets[rowId]) return;
      $widgets[rowId].children.forEach(function (colId) {
        if ($widgets[colId] && $widgets[colId].children) {
          $widgets[colId].children.forEach(function (widgetId) {
            mountWidget(widgetId);
          });
        }
      });
    }
  });
}

function mountHeaderWidgets() {
  if ($courseJson.headerId) {
    $widgets[$courseJson.headerId].children.forEach(function (colId) {
      if ($widgets[colId]) {
        if ($widgets[colId].children) {
          $widgets[colId].children.forEach(function (widgetId) {
            mountWidget(widgetId);
          });
        }
      }
    });
  }
}

function mountFooterWidgets() {
  if ($courseJson.footerId) {
    $widgets[$courseJson.footerId].children.forEach(function (colId) {
      if ($widgets[colId]) {
        if ($widgets[colId].children) {
          $widgets[colId].children.forEach(function (widgetId) {
            mountWidget(widgetId);
          });
        }
      }
    });
  }
}

function mountWidget(widgetId) {
  
  if (!$widgets[widgetId]) return;
  var widgetType = $widgets[widgetId].widgetType;

  if (!widgetType) {
    return;
  }
  
  


  var widget = new window[titleCase(widgetType)]();
  widget.buildFromJson(widgetId, $widgets[widgetId].settings);
  $("#config_".concat(widgetId)).on("click", function () {
    widget.edit();
  });
  $globalScope[widgetId] = true;
  riot.mount("#".concat(widgetId), {
    widgetId: widgetId,
    settings: $widgets[widgetId].settings
  }); // setTimeout(function(){
  //     countMedia();
  // },700)
}

function updateAnimation(widgetId) {
  if (typeof trivPrevPage !== "undefined") {
    return;
  } else {
    var colId = $("#".concat(widgetId)).parent().attr("id");

    if (colId) {
      if ($widgets[colId].settings.animation_class && $widgets[colId].settings.animation_duration && $widgets[colId].settings.animation_delay) {
        $("#".concat(widgetId)).find("> .animation_this").addClass($widgets[colId].settings.animation_class).addClass('animated');
        $("#".concat(widgetId)).find("> .animation_this").css('animation-duration', "".concat($widgets[colId].settings.animation_duration));
        $("#".concat(widgetId)).find("> .animation_this").css('animation-delay', "".concat($widgets[colId].settings.animation_delay));
      }
    }
  }
}