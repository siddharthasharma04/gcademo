var cl = console.log;
var cr = console.error;

function traverseWidget(parent, id) {
  parent._id = id;

  if (parent.children) {
    parent._childrenObj = [];
    parent.children.forEach(function (childId, index) {
      //$widgetJson = {...$widgets[childId]};
      $widgetJson = Object.assign({}, $widgets[childId]);

      parent._childrenObj.push($widgetJson);

      traverseWidget($widgetJson, childId);
    });
  }
}

function traverse() {
  var $cjTemp = JSON.parse(JSON.stringify($courseJson));
  $cjTemp.index.forEach(function (chap, index1) {
    chap.pages.forEach(function (page, index2) {
      page._rowsObj = [];
      page.rows.forEach(function (rowId, index3) {
        $rowJson = Object.assign({}, $widgets[rowId]);

        page._rowsObj.push($rowJson);

        traverseWidget($rowJson, rowId);
      });
    });
  });
  return $cjTemp;
}

function traverseWidgetForLayout(parent) {
  if (parent.children) {
    parent.children.forEach(function (childId) {
      //$widgetJson = {...$widgets[childId]};
      window.newWidgets[childId] = $widgets[childId];
      $widgetJson = $widgets[childId];
      traverseWidgetForLayout($widgetJson, childId);
    });
  }
}

function makeLayout(pageIndex, chapIndex) {
  var page = $courseJson.index[chapIndex].pages[pageIndex];
  window.newCourseJson = {
    title: "",
    index: [{
      id: '1',
      name: 'Chapter 1',
      pages: [{
        id: 1,
        title: 'Screen 1',
        active: true,
        rows: [],
        comments: []
      }]
    }],
    headerId: null,
    headerOwnerPage: null,
    headerOwnerChap: null,
    footerId: null,
    footerOwnerPage: null,
    footerOwnerChap: null
  };
  window.newCourseJson.index[0].pages[0].rows = Helpers.cloneArray(page.rows);
  window.newCourseJson.index[0].pages[0].bgType = page.bgType;

  if (page.bgProperty) {
    // window.newCourseJson.index[0].pages[0].bgProperty = {...page.bgProperty}
    window.newCourseJson.index[0].pages[0].bgProperty = Helpers.cloneObject(page.bgProperty);
  }

  window.newWidgets = {};
  page.rows.forEach(function (rowId) {
    window.newWidgets[rowId] = $widgets[rowId];
    $rowJson = $widgets[rowId];
    traverseWidgetForLayout($rowJson, rowId);
  });
}

function displayNotification(msg, className) {
  $.notify(msg, {
    autoHideDelay: 2000,
    showAnimation: 'slideDown',
    className: 'className',
    hideAnimation: 'slideUp',
    position: 'top center'
  });
  var width = $(".notifyjs-corner").width();
  $(".notifyjs-corner").attr('style', "left: calc(50% - ".concat(width / 2, "px); top: 0;"));
}

function insertAtIndex(array, index, item) {
  array.splice(index, 0, item); // delete item;
}

function removeIndex(array, index) {
  array.splice(index, 1);
}

function deleteIndex(array, index) {
  if (index > -1) {
    array.splice(index, 1);
  } else {
    console.error("deleteIndex: Got index = -1");
  }
}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 15; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return "a" + text;
}

function titleCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formDataToJson(formData) {
  var formJson = {};
  formData.forEach(function (value, key) {
    formJson[key] = value.trim();
  });
  return formJson;
}

function enableCkeditor(id) {
  if (CKEDITOR.instances[id]) {
    CKEDITOR.instances[id].destroy(true);
  }

  CKEDITOR.inline(id);
}

var Helpers = {
  setParallax: function setParallax(url) {
    $('#editorPage').css('background', 'none');
    $(".parallax-mirror").show();
    $('#editorPage').parallax({
      imageSrc: url
    });
  },
  hideParallax: function hideParallax() {
    $(".parallax-mirror").hide();
  },
  resizeParallax: function resizeParallax() {
    jQuery(window).trigger('resize').trigger('scroll');
  },
  resizeParallaxAfterDelay: function resizeParallaxAfterDelay() {
    setTimeout(function () {
      jQuery(window).trigger('resize').trigger('scroll');
    }, 1000);
  },
  cloneArray: function cloneArray(fromClone) {
    return fromClone.slice(0);
  },
  cloneObject: function cloneObject(fromObj) {
    var toObj;
    return $.extend(toObj, {}, fromObj);
  }
};
var GlobalEvents = {
  heightChanged: function heightChanged() {
    Helpers.resizeParallax();
  }
};
var WidgetEvents = {
  mounted: function mounted(widgetId) {
    $("#".concat(widgetId, ", #").concat(widgetId, " *")).attr("draggable", "false");
    updateAnimation(widgetId);
  }
};