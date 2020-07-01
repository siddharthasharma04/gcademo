<drag_drop_2 draggable="false">
<div class="visuallyhidden" aria-hidden="true" tabindex="-1">This is a document selection pattern.</div>
  <div class="animation_this word_count  ">
    <div class="mb-2 mt-2" >
      <div class="question_mcq" tabindex=0></div>
    </div>
        <div class="drag-widget" style="width: 100%">
            <div class="dnd_section d-flex" style="width: 100%">
                  <div class="dnd_container d-flex flex-column" id="dnd_container_{opts.widgetId}" style="width: 100%">
                      <div class="drop_area_container" id="drop_area_container_{opts.widgetId}"></div>
                      <div class="drag_area_container d-flex flex-row mb-5" id="drag_area_container_{opts.widgetId}"></div>
                  </div>
            </div>
        </div>
   </div>
    <div class="clearfix_dnd"> 
    </div>
</div>

<style>
  .dnd_container{
    width:100%;
  }
  .drop_area_container{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    width:100%;
  }

  .drop_area{
    position: relative;
    min-height: 55px;
    width: 40%;
    background: #dadada;
    border-radius: 1px;
    margin-bottom: 5px;
    border: dashed #bbbaba;
  }
  .horizontal .drop_area{
    width: 100%;
  }

  .drop_area_txt{
    font-size:12px;
    min-width: 100px;
    text-align:center
  }
  .drag_area{
    position: relative;
    min-width: 100px; 
    background: #fff;
    border-radius: 1px;
    font-size: 12px;
    padding: 0 10px;
    border: 3px solid #bbbaba;
    padding:5px;
    height: 100%;
    min-height: 55px;
    word-break:break-word;
  }

  .container_drag{
    position: relative;
    width: 100%; 
    margin: 0 1.5%;
    font-size: 14px;
    margin-bottom: 5px;
    min-height:55px;
    background: #dadada;
    
  }
  .dnd_result {
    height: 20px;
    width: 100px;
    font-size:12px;
  }
  .ques_text{
    font-size: 11px;
    height: auto !important;
    width:40%;
    font-weight:10px;
    padding:0 10px 10px;
    height:35px;
    background-color: #fbfbfb;
    margin-left: 1rem;
    margin-bottom: 5px;
    min-width: 40%;
    word-break:break-all;
  }
  .horizontal{
    margin: 0 1.5%;
  }
  .horizontal  .ques_text{
    max-width:100%;
    width:95%;
    padding: 10px;
    word-break: break-all;
  }
  .horizontal .drag_area span, .horizontal .ques_text span{
    text-overflow: unset;
    overflow: unset;
    white-space: normal;
    width: auto;
  }
  
  .resutlt_container {
    display: none;
  }
  .vertical {
      width: 100%;
  }
  .drag_area_container{
    width:30%;
  }
  .horizontal-container .drag_area_container{
    width:100%;
  }
  .openfeedback {
    cursor: pointer;
    display: block;
    width:auto;
    text-align:right;
    margin-left:1rem;
    background-color: #6A6C6D!important;
    border-radius: 0px;
    border: 1px solid #3a3a3a!important;
    box-shadow: 0px 5px 5px -5px #ccc;
    color:#ffffff!important;
    padding:5px;
  }
  .seeWhy{
    font-size:11px;
  }
  #submit_dndfeedback{
    background-color: #6A6C6D!important;
    border-radius: 0px;
    border: 1px solid #3a3a3a!important;
    box-shadow: 0px 5px 5px -5px #ccc;
  }
  .modalBtn.yesBtn:hover:before,
  .formBtn.yesBtn:hover:before,
  .btnWidget:hover:before {
    display:none!important;
  }
  .cursor-not-allowed{
    pointer-events:none;
  }
</style>
<script>
  "use strict";

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var $parent = $("#" + opts.widgetId);
this.on("mount", function () {
  updateAnimation(opts.widgetId);
  var $parent = $("#" + opts.widgetId);
  this.question = opts.settings.question;
  var backColor = opts.settings.bgColor
  var subColor = opts.settings.submitColor
  var subHover = opts.settings.submitHover
  var optColor = opts.settings.optionColor
  $("#"+opts.widgetId).parent().css("background-color",backColor)
  $("#"+opts.widgetId).parent().css("background-image","url("+opts.settings.url+")")
  if(opts.settings.backgroundColorSelected == "1"){
    $("#"+opts.widgetId).parent().css("background-image","none")
  }
  $parent.find('.question_mcq').append("<label id=\"question\">".concat(opts.settings.question, "</label>")); //debugger
  $parent.find('.question_mcq').css("background-color",opts.settings.questionBackground)

  if (opts.settings.submit == "yes") {
    //debugger
    $("#" + opts.widgetId).find(".clearfix_dnd").append("<button type=\"submit\" class=\"modalBtn yesBtn dndSubmitAnswer disabled\" id=\"submit_dndfeedback\">Submit</button>");
  }

  $("#"+opts.widgetId).find("#submit_dndfeedback").attr('style','background-color:'+subColor+'!important;border-color:'+subColor+'!important');
  $("#"+opts.widgetId).find("#submit_dndfeedback").hover(function(){
    $(this).attr('style','background-color:'+subHover+'!important;border-color:'+subHover+'!important;transition:0.8s;color:'+opts.settings.submitText);
  },function(){
    $(this).attr('style','background-color:'+subColor+'!important;border-color:'+subColor+'!important;transition:0.8s;color:'+opts.settings.submitText);
  })
$("#"+opts.widgetId).find("#submit_dndfeedback").css("color",opts.settings.submitText)
$("#"+opts.widgetId).find("#submit_dndfeedback").parent().css("text-align",opts.settings.submitAlign)  

  var align = opts.settings.align;

  if (align === '2') {
    /*$(".dnd_container").css({
      'display' : 'flex !important',
      'flex-direction' : 'row-reverse !important'
    });
    $(".drop_area_container").css("flex-direction","column !important");
    $(".drag_area_container").css("flex-direction","column !important");*/

    /*$("#dnd_container_"+ opts.widgetId).css("display","flex !important");
    $("#dnd_container_"+ opts.widgetId).css("flex-direction","row-reverse !important");*/
    $("#dnd_container_" + opts.widgetId).removeClass("flex-column");
    $("#dnd_container_" + opts.widgetId).addClass("flex-row-reverse");
    $("#dnd_container_" + opts.widgetId).addClass("justify-content-end"); // $("#dnd_container_"+ opts.widgetId).addClass("cursor-not-allowed");
    //$parent.find("#dnd_container_"+ opts.widgetId).addClass('cursor-not-allowed');

    $("#drag_area_container_" + opts.widgetId).removeClass("flex-row");
    $("#drag_area_container_" + opts.widgetId).addClass("flex-column"); //$("#drop_area_container_"+ opts.widgetId).addClass("cursor-not-allowed");
    //$parent.find("#drop_area_container_"+ opts.widgetId).addClass('cursor-not-allowed');
    //$parent.find("#drag_area_container_"+ opts.widgetId).addClass('cursor-not-allowed');

    $("#drop_area_container_" + opts.widgetId).removeClass("flex-row");
    $("#drop_area_container_" + opts.widgetId).addClass("flex-column");
  }

  $parent.find(".drop_area_container").html('');
  $parent.find(".drag_area_container").html('');
  opts.settings.stepsOption.forEach(function (vale, index) {
    $parent.find(".drop_area_container").append("\n                        <div draggable=\"false\" class=\"vertical\">\n                              <div  id=\"".concat("drop" + opts.widgetId + '_' + vale.correct, "\"  draggable=\"false\" ondrop=\"drop(event)\"  ondragover=\"allowDrop(event)\"  class=\"drop_area d-flex align-items-center justify-content-center\">\n                                        <span class=\"drop_area_txt\">Drop here</span>\n                              </div>\n                              <div class=\"ques_text d-flex align-items-center\"><span>").concat(vale.textValueOpt, "</span></div>\n                              <div class=\"resutlt_container\">\n                              <div class=\"dnd_result mt-2 mb-2 text-center  d-flex align-items-center\"></div>\n                              </div>\n                        </div> \n                "));
  });

  if (align === '2') {
    $("#dnd_container_" + opts.widgetId + " .vertical").addClass("d-flex ml-3");
    $('.dnd_container').removeClass('horizontal-container');
    $("#dnd_container_" + opts.widgetId + " .vertical").addClass('vertical').removeClass('horizontal');
  } else if (align === '1') {
    $("#dnd_container_" + opts.widgetId + " .vertical").removeClass('vertical').addClass('horizontal');
    $('.dnd_container').addClass('horizontal-container');
    var elementLength = $('.horizontal').length;
    var elementWidth = 100 / elementLength - 3 + '%';
    console.log('length of lement is ', elementLength);
    $('.horizontal').css('width', elementWidth);
    $('.container_drag').css('width', elementWidth);
    $('.ques_text').css({'width':'100%','margin-left':'0rem'})
  }

  function shuffle(a) {
    var j, x, i;

    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }

    return a;
  }

  var shuffledAnswers = _toConsumableArray(opts.settings.stepsAnswer);

  shuffle(shuffledAnswers);
  shuffledAnswers.forEach(function (vale, index) {
    $parent.find(".drag_area_container").append("\n                    <div class=\"container_drag\"> \n                          <div id=\"".concat("drag" + opts.widgetId + '_' + vale.correct, "\" draggable=\"true\" ondragstart=\"drag(event)\" class=\"drag_area d-flex align-items-center justify-content-center\">\n                              <span>").concat(vale.textValue, "</span>\n                            </div>\n                    </div> \n                      "));
  });

  if ($globalScope[opts.widgetId] == undefined) {
    FixedLayout.fixWidgetRowHeight(opts.widgetId);
  } //FixedLayout.fixWidgetRowHeight(opts.widgetId)
  //WidgetEvents.mounted(opts.widgetId);

  $("#drag_area_container_"+opts.widgetId+" .drag_area").css("background-color",optColor)

});

window.allowDrop = function (ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
};

window.drag = function (ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  ev.dataTransfer.effectAllowed = "move";
};

window.drop = function (ev) {
  ev.preventDefault(); //debugger

  var data = ev.dataTransfer.getData("text");
  var dropTarget = $(ev.target);

  if ($(ev.target).hasClass("drop_area_txt")) {
    dropTarget = $(ev.target).closest(".drop_area");
  }

  var drop_split = $(dropTarget).attr("id");
  var drag_split = data;
  var drop = drop_split == undefined ? undefined : drop_split.split('_').pop();
  var drag = drag_split.split('_').pop();

  if (drop != undefined) {
    if (opts.settings.submit == "no") {
      if (drag === drop) {
        //debugger
        if (!$(ev.currentTarget).hasClass('option-filled')) {
          $(dropTarget).append(document.getElementById(data));
          $("#" + drop_split).parent().find(".dnd_result").append("Correct");
          $("#" + drop_split).find(".drop_area_txt").css("display", "none");
          $("#" + drop_split).parent().find(".dnd_result").css("background-color", "#e9ffe9");
          $("#" + data).css({
            "width": "100%",
            "background-color": "#bcec97",
            "min-height": "55px",
            "border": "0"
          });
        }
      } else {
        //debugger
        if (!$(ev.currentTarget).hasClass('option-filled')) {
          $(dropTarget).append(document.getElementById(data));
          $("#" + drop_split).parent().find(".dnd_result").append("Incorrect");
          $("#" + drop_split).find(".drop_area_txt").css("display", "none");
          $("#" + drop_split).find(".drop_area_txt").css("display", "none");
          $("#" + data).css({
            "background-color": "#ff0000",
            "width": "100%",
            "min-height": "55px",
            "border": "0"
          });
          $("#" + drop_split).parent().find(".dnd_result").css("background-color", "#ffe9e9");
        }
      }

      $(ev.currentTarget).addClass('option-filled');
    } else {
      if (!$(ev.currentTarget).hasClass('option-filled')) {
        $(dropTarget).append(document.getElementById(data)); //$("#" + drop_split).parent().find(".dnd_result").append("Correct");

        $("#" + drop_split).find(".drop_area_txt").css("display", "none");
        $("#" + drop_split).parent().find(".dnd_result").css("background-color", "#e9ffe9");
        $("#" + data).css({
          "width": "100%",
          "min-height": "50px",
          "border": "0"
        });
        $(ev.currentTarget).addClass('option-filled');
        var enableSubmit = true;
        var checkSubmitDnd = $(".drop_area_container").children("div");

        for (var i = 0; i < checkSubmitDnd.length; i++) {
          var checkOptionFilled = $(".drop_area_container").children("div:eq(" + i + ")").children("div:first-child").hasClass("option-filled");

          if (checkOptionFilled == false) {
            enableSubmit = false;
          }
        }

        if (enableSubmit == true) {
          $("#submit_dndfeedback").removeClass("disabled");
        }
      }
    }
  }

  $("#submit_dndfeedback").on("click", function () {
    $(this).addClass("cursor-not-allowed")
    if (drag === drop) {
      //debugger
      if (!$(ev.currentTarget).hasClass('option-filled')) {
        $("#" + drop_split).parent().find(".dnd_result").append("Correct");
        $("#" + data).css({
          "width": "100%",
          "background-color": "#e3f1d8",
          "min-height": "50px",
          "border": "0"
        });
      }
    } else {
      //debugger
      if (!$(ev.currentTarget).hasClass('option-filled')) {
        $("#" + drop_split).parent().find(".dnd_result").append("Incorrect");
        $("#" + data).css({
          "background-color": "#f6cbd0",
          "width": "100%",
          "min-height": "50px",
          "border": "0"
        });
        $("#" + drop_split).parent().find(".dnd_result").css("background-color", "#ffe9e9");
      }
    }

    $(this).css("pointer-events", "none");
    var addSeeWhy = $("#drop_area_container_" + opts.widgetId).children("div");

    if (opts.settings.align == '2') {
      for (var i = 0; i < checkSubmitDnd.length; i++) {
        if ($("#drop_area_container_" + opts.widgetId).children("div:eq(" + i + ")").find(".ques_text").find("a").length == 0) {
          $("#drop_area_container_" + opts.widgetId).children("div:eq(" + i + ")").find(".ques_text").find("span").css("width", "70%");
          $("#drop_area_container_" + opts.widgetId).children("div:eq(" + i + ")").find(".ques_text").append("<input type=\"hidden\" value='".concat(opts.settings.feedbackOption[i].feedbackOptValue, "'><a class=\"openfeedback\">See why?</a>"));
        }
      }
    } else if (opts.settings.align == '1') {
      $("#dnd_container_" + opts.widgetId).append("<div class=\"seeWhy d-flex align-items-center justify-content-center\"></div>");
      var adjustWidth = 100 / checkSubmitDnd.length + "%";

      for (var i = 0; i < checkSubmitDnd.length; i++) {
        if ($("#dnd_container_" + opts.widgetId).find(".seeWhy").length <= 1) {
          $(".seeWhy").append("<div class=\"seeWhy_".concat(i, "\" style=\"width:").concat(adjustWidth, ";text-align:center;\"><input type=\"hidden\" value='").concat(opts.settings.feedbackOption[i].feedbackOptValue, "'><a class=\"openfeedback\" style=\"width:auto;display:inline-block;\">See why?</a></div>"));
        }
      }

      $("#drag_area_container_" + opts.widgetId).removeClass("mb-5");
      $("#drag_area_container_" + opts.widgetId).css("margin-bottom", "1.3rem");
    }

    $('.drop_area_container .ques_text .openfeedback, .dnd_container .seeWhy .openfeedback').on('click', function () {
      $("#openFeedback").remove();
      var optionFeedback = '<div class="modal" id="openFeedback" tabindex="-1" role="dialog"><div class="modal-dialog modal-dialog-centered" role="document" style="visibility: inherit;top:0px"><div class="modal-content modalContent"><div class="modal-header modalHeader"><h5 class="modal-title">Feedback</h5><button type="button" class="close closebutton modalClose" data-dismiss="modal" aria-label="Close"><span class="modalCloseIcon"></span><span class="modalCloseIcon"></span></button></div><div class="modal-body modalBody"><div class="status_feedbackmessage11">' + $(this).parent().find("input[type='hidden']").val() + '</div></div><div class="modal-footer modalFooter"><button type="submit" class="modalBtn yesBtn closebutton" data-dismiss="modal">Ok</button></div></div></div>';
      $("body").append(optionFeedback);
      $("#openFeedback").modal("show");
    });
  });
};
    </script>   
</drag_drop_2>
