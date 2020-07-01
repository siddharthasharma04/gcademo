var FixedLayout = {
  howMuchLeft: function howMuchLeft() {
    //if there is no more room for adding anything
    var editorHeight = $("#editorPage").outerHeight();

    if ($(".gridRow").length) {
      var lastRowEdge = $(".gridRow:last").position().top;
      var lastRowHeight = $(".gridRow:last").outerHeight();
      return editorHeight - (lastRowEdge + lastRowHeight);
    } else {
      return editorHeight;
    }
  },
  setupFixedPage: function setupFixedPage() {
    if ($courseJson.layout === "fixed") {
      $("#editorPage").addClass("fixed").css({
        "width": "".concat($courseJson.fixed_width, "px"),
        "height": "".concat($courseJson.fixed_height, "px")
      });
    }
  },
  isNearingEnd: function isNearingEnd() {
    //if there is no more room for adding anything
    return FixedLayout.howMuchLeft() < 5;
  },
  hasReachedEnd: function hasReachedEnd() {
    return FixedLayout.howMuchLeft() < 40;
  },
  hasReachedEndOnEditor: function hasReachedEndOnEditor() {
    return FixedLayout.howMuchLeft() > 40;
  },
  // reduceWidgetHeight: function(widgetId) {
  //     //used for widgets that are dropped in between
  //     if ($courseJson.layout === "fixed" && $(`#${widgetId}`).closest(".gridRow").length) {
  //         var lastRowTopEdge = $(".gridRow:last").position().top
  //         var lastRowHeight = $(".gridRow:last").outerHeight(true)
  //         var editorHeight = $("#editorPage").outerHeight(true)
  //         var reduceByHeight = (lastRowTopEdge + lastRowHeight) - editorHeight
  //         var rowId = $(`#${widgetId}`).closest(".gridRow").attr("id")
  //         if (reduceByHeight > 0) {
  //             var widgetHeight = $(`#${widgetId}`).closest(".gridRow").outerHeight(true)
  //             $(`#${widgetId}`).closest(".gridRow").css({ "max-height": widgetHeight - reduceByHeight })
  //             $widgets[rowId].settings.max_height = widgetHeight - reduceByHeight
  //         } else {
  //             $(`#${widgetId}`).closest(".gridRow").css({ "max-height": "unset" })
  //             delete $widgets[rowId].settings.max_height
  //         }
  //     }
  // },
  reduceWidgetHeight: function reduceWidgetHeight(widgetId) {
    //used for widgets that are dropped in between
    if ($courseJson.layout === "fixed" && $("#".concat(widgetId)).closest(".gridRow").length) {
      var lastRowTopEdge = $(".gridRow:last").position().top;
      var lastRowHeight = $(".gridRow:last").outerHeight();
      var editorHeight = $("#editorPage").outerHeight();
      var reduceByHeight = lastRowTopEdge + lastRowHeight - editorHeight;
      var rowId = $("#".concat(widgetId)).closest(".gridRow").attr("id");

      if (reduceByHeight > 0) {
        var widgetHeight = $("#".concat(widgetId)).closest(".gridRow").outerHeight();
        $("#".concat(widgetId)).closest(".gridRow").css({
          "max-height": widgetHeight - reduceByHeight
        });
        $widgets[rowId].settings.max_height = widgetHeight - reduceByHeight;
      } else if (reduceByHeight < 0) {
        if ($("#".concat(widgetId)).find('.text-widget').length) {
          var widgetHeight = $("#".concat(widgetId)).closest(".gridRow").outerHeight();
          $("#".concat(widgetId)).closest(".gridRow").css({
            "max-height": widgetHeight
          });
          $widgets[rowId].settings.max_height = widgetHeight;
        } else {
          $("#".concat(widgetId)).closest(".gridRow").css({
            "max-height": "unset"
          });
          delete $widgets[rowId].settings.max_height;
        }
      }
    }
  },
  applyFixedSettingsToRow: function applyFixedSettingsToRow(rowId, rowObj) {
    if (!$widgets[rowId]) return;

    if ($widgets[rowId].settings.max_height) {
      // $(rowObj).css({
      //   "max-height": $widgets[rowId].settings.max_height
      // });
    }
  },
  fixTextRowHeight: function fixTextRowHeight(widgetId, prevSize) {
    //for text widget
    if ($courseJson.layout === "fixed") {
      var rowId = $("#".concat(widgetId)).closest(".gridRow").attr("id");

      if (FixedLayout.hasReachedEnd()) {
        if ($("#".concat(widgetId)).closest(".gridRow:last-child").length === 0) {
          $("#".concat(widgetId)).closest(".gridRow").css({
            "max-height": prevSize
          });
          $widgets[rowId].settings.max_height = prevSize;
        }
      } else {
        $("#".concat(widgetId)).closest(".gridRow").css({
          "max-height": "unset"
        });
        delete $widgets[rowId].settings.max_height;
      }

      return $("#".concat(widgetId)).closest(".gridRow").outerHeight();
    }
  },
  // fixWidgetRowHeight: function(widgetId) { //for any widget
  //     if ($courseJson.layout === "fixed") {
  //         var rowId = $(`#${widgetId}`).closest(".gridRow").attr("id")
  //         if (FixedLayout.hasReachedEnd()) {
  //             var curHeight = $(`#${widgetId}`).closest(".gridRow").outerHeight()
  //             if ($(`#${widgetId}`).closest(".gridRow:last-child").length === 0) {
  //                 $(`#${widgetId}`).closest(".gridRow").css({ "max-height": curHeight + FixedLayout.howMuchLeft() })
  //                 $widgets[rowId].settings.max_height = curHeight + FixedLayout.howMuchLeft()
  //             }
  //         } else {
  //             $(`#${widgetId}`).closest(".gridRow").css({ "max-height": "unset" })
  //             delete $widgets[rowId].settings.max_height
  //         }
  //     }
  // },
  fixWidgetRowHeight: function fixWidgetRowHeight(widgetId) {
    //for any widget
    if ($courseJson.layout === "fixed") {
        var rowId = $("#".concat(widgetId)).closest(".gridRow").attr("id");

      // if ($('#' + rowId).find('.gridCol').length == 1 && $('#' + widgetId + '_editor').hasClass('mcq-widget') && $('#' + rowId).find('.gridCol').height() > $('#' + widgetId + '_editor').height()) {
      //   // var height = $('#' + widgetId + '_editor').closest('.animation_this').height()
      //   var curHeight = $('#' + rowId).outerHeight();
      //   $widgets[rowId].settings.max_height = curHeight;
      //   return $('#' + rowId).css({
      //     'max-height': curHeight
      //   }); //$('#' + widgetId + '_editor').closest('.animation_this').css('height', height + 'px');
      // }

      // if ($('#' + rowId).find('.gridCol').length == 1 && $('#' + widgetId).closest('image_with_textv2').length) {
      //   // var height = $('#' + widgetId + '_editor').closest('.animation_this').height()
      //   if (FixedLayout.hasReachedEnd()) {
      //     var curHeight = $('#' + rowId).outerHeight();
      //     $widgets[rowId].settings.max_height = curHeight + FixedLayout.howMuchLeft();
      //     return $('#' + rowId).css({
      //       'max-height': curHeight + FixedLayout.howMuchLeft()
      //     });
      //   } else {
      //     var curHeight = $('#' + rowId).outerHeight();
      //     $widgets[rowId].settings.max_height = curHeight;
      //     return $('#' + rowId).css({
      //       'max-height': curHeight
      //     });
      //   } //$('#' + widgetId + '_editor').closest('.animation_this').css('height', height + 'px');
      // }

      // if ($('#' + rowId).find('.gridCol').length == 1 && $('#' + widgetId).closest('image_widget').length) {
      //   // var height = $('#' + widgetId + '_editor').closest('.animation_this').height()
      //   if (FixedLayout.hasReachedEnd()) {
      //     var curHeight = $('#' + rowId).outerHeight();
      //     $widgets[rowId].settings.max_height = curHeight + FixedLayout.howMuchLeft();
      //     return $('#' + rowId).css({
      //       'max-height': curHeight + FixedLayout.howMuchLeft()
      //     });
      //   } else {
      //     var curHeight = $('#' + rowId).outerHeight();
      //     $widgets[rowId].settings.max_height = curHeight;
      //     return $('#' + rowId).css({
      //       'max-height': curHeight
      //     });
      //   } //$('#' + widgetId + '_editor').closest('.animation_this').css('height', height + 'px');
      // }

      // if ($('#' + rowId).find('.gridCol').length == 1 && $('#' + widgetId).closest('flipcard_widget').length) {
      //   // var height = $('#' + widgetId + '_editor').closest('.animation_this').height()
      //   if (FixedLayout.hasReachedEnd()) {
      //     var curHeight = $('#' + rowId).outerHeight();
      //     $widgets[rowId].settings.max_height = curHeight + FixedLayout.howMuchLeft();
      //     return $('#' + rowId).css({
      //       'max-height': curHeight + FixedLayout.howMuchLeft()
      //     });
      //   } else {
      //     var curHeight = $('#' + rowId).outerHeight();
      //     $widgets[rowId].settings.max_height = curHeight;
      //     return $('#' + rowId).css({
      //       'max-height': curHeight
      //     });
      //   } //$('#' + widgetId + '_editor').closest('.animation_this').css('height', height + 'px');
      // }

      // if ($('#' + rowId).find('.gridCol').length == 1 && $('#' + widgetId).closest('image_slider').length) {
      //   // var height = $('#' + widgetId + '_editor').closest('.animation_this').height()
      //   if (FixedLayout.hasReachedEnd()) {
      //     var curHeight = $('#' + rowId).outerHeight();
      //     $widgets[rowId].settings.max_height = curHeight + FixedLayout.howMuchLeft();
      //     return $('#' + rowId).css({
      //       'max-height': curHeight + FixedLayout.howMuchLeft()
      //     });
      //   } else {
      //     var curHeight = $('#' + rowId).outerHeight();
      //     $widgets[rowId].settings.max_height = curHeight;
      //     return $('#' + rowId).css({
      //       'max-height': curHeight
      //     });
      //   } //$('#' + widgetId + '_editor').closest('.animation_this').css('height', height + 'px');
      // }

      // if ($('#' + rowId).find('.gridCol').length == 1 && $('#' + widgetId).closest('rollover_widget').length) {
      //   // var height = $('#' + widgetId + '_editor').closest('.animation_this').height()
      //   if (FixedLayout.hasReachedEnd()) {
      //     var curHeight = $('#' + rowId).outerHeight();
      //     $widgets[rowId].settings.max_height = curHeight + FixedLayout.howMuchLeft();
      //     return $('#' + rowId).css({
      //       'max-height': curHeight + FixedLayout.howMuchLeft()
      //     });
      //   } else {
      //     var curHeight = $('#' + rowId).outerHeight();
      //     $widgets[rowId].settings.max_height = curHeight;
      //     return $('#' + rowId).css({
      //       'max-height': curHeight
      //     });
      //   } //$('#' + widgetId + '_editor').closest('.animation_this').css('height', height + 'px');
      // }

      // if ($('#' + rowId).find('.gridCol').length == 1 && $('#' + widgetId).closest('animation_widget').length) {
      //   // var height = $('#' + widgetId + '_editor').closest('.animation_this').height()
      //   if (FixedLayout.hasReachedEnd()) {
      //     var curHeight = $('#' + rowId).outerHeight();
      //     $widgets[rowId].settings.max_height = 'unset';
      //     $('#' + rowId).css({
      //       'max-height': 'unset'
      //     });
      //   } else {
      //     var curHeight = $('#' + rowId).outerHeight();
      //     $widgets[rowId].settings.max_height = 'unset';
      //     $('#' + rowId).css({
      //       'max-height': 'unset'
      //     });
      //   } //$('#' + widgetId + '_editor').closest('.animation_this').css('height', height + 'px');
      // }

      // if ($('#' + rowId).find('.gridCol').length == 1 && $('#' + widgetId).closest('video_w_v2').length) {
      //   // var height = $('#' + widgetId + '_editor').closest('.animation_this').height()
      //   if (FixedLayout.hasReachedEnd()) {
      //     var curHeight = $('#' + rowId).outerHeight();
      //     $widgets[rowId].settings.max_height = curHeight + FixedLayout.howMuchLeft();
      //     return $('#' + rowId).css({
      //       'max-height': curHeight + FixedLayout.howMuchLeft()
      //     });
      //   } else {
      //     var curHeight = $('#' + rowId).outerHeight();
      //     $widgets[rowId].settings.max_height = curHeight;
      //     return $('#' + rowId).css({
      //       'max-height': curHeight
      //     });
      //   } //$('#' + widgetId + '_editor').closest('.animation_this').css('height', height + 'px');
      // }

      if (FixedLayout.hasReachedEnd()) {
        var curHeight = $("#".concat(widgetId)).closest(".gridRow").outerHeight();
        if ($("#".concat(widgetId)).closest(".gridRow:last-child").length === 0) {
        //  $widgets[rowId].settings.max_height = curHeight + FixedLayout.howMuchLeft();
          // $("#".concat(widgetId)).closest(".gridRow").css({
          //   "max-height": curHeight + FixedLayout.howMuchLeft()
          // });
        }
      } else {
        // if ($('#' + rowId).find('.gridCol').length == 1 && $('#' + widgetId).closest('animation_widget').length) {
        //   // var height = $('#' + widgetId + '_editor').closest('.animation_this').height()
        //   var curHeight = $('#' + rowId).outerHeight();
        //   $widgets[rowId].settings.max_height = curHeight;
        //   return $('#' + rowId).css({
        //     'max-height': curHeight
        //   }); //$('#' + widgetId + '_editor').closest('.animation_this').css('height', height + 'px');
        // } else {
          if ($widgets[rowId] != undefined && $widgets[rowId] != '') {
           // $("#".concat(widgetId)).closest(".gridRow").css({
            //  "max-height": "unset"
            //});
            //delete $widgets[rowId].settings.max_height;
          }
        //}
      }
    }
  },
  fixRowHeightOnDrop: function fixRowHeightOnDrop(ev) {
    if ($courseJson.layout === "fixed") {
      if (FixedLayout.hasReachedEnd()) {
        //debugger;
        var curHeight = $($(ev.target).closest('.gridRow')[0]).outerHeight();
        var rowId = $($(ev.target).closest('.gridRow'))[0].id;

        if ($($(ev.target).closest('.gridRow:last-child')[0]).length === 0) {
          //$widgets[rowId].settings.height = curHeight + FixedLayout.howMuchLeft(); // $widgets[rowId].settings.max_height = curHeight + FixedLayout.howMuchLeft();

          // $($(ev.target).closest('.gridRow')[0]).css({
          //   "height": curHeight + FixedLayout.howMuchLeft()
          // });
        } else {
         // $widgets[rowId].settings.height = curHeight + FixedLayout.howMuchLeft(); //$widgets[rowId].settings.max_height = curHeight + FixedLayout.howMuchLeft();

          // $($(ev.target).closest('.gridRow')[0]).css({
          //   "height": curHeight + FixedLayout.howMuchLeft()
          // });
        }
      }
    }
  },
  disableDropInsideRow: function disableDropInsideRow(ev) {
    // debugger;
    // if there is a widget inside row cant be able to drop another widget
    var isCheck = false;

    if ($courseJson.layout === "fixed") {
      var parentID = $(ev.target).attr('id');

      if ($("#".concat(parentID)).hasClass('gridCol') && $("#".concat(parentID)).find('.ice_widget').length > 0) {
        isCheck = true;
      }

      if ($(ev.target).closest(".ice_widget").length > 0) {
        isCheck = true;
      }

      return isCheck;
    } else {
      return isCheck;
    }
  },
  checkColInsideRow: function checkColInsideRow(ev) {
    var colData = false; // if ($(".gridRow").length == 0 && $widgets.length == undefined) {
    //     return true;
    // }

    $(".gridRow").each(function () {
      var widgetRowId = $(this).attr('id');
      var colLength = $("#".concat(widgetRowId)).find('.gridCol').length;

      if (colLength > 1 || colLength == 1) {
        $("#".concat(widgetRowId)).find('.gridCol').each(function () {
          var colID = $(this).attr('id');
          var widgetLength = $("#".concat(colID)).find('.ice_widget').length;

          if (widgetLength == 0) {
            colData = true;
          }
        });
      }
    });

    if (colData) {
      return true;
    } else {
      return false;
    }
  }
};