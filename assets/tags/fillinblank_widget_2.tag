<fillinblank_widget_2>
  <div class="visuallyhidden" aria-hidden="true" tabindex=0>This is a fill in the blank pattern.</div>
  <div class='fillinblank-widget animation_this word_count' ref="main">
      <form class='fill_in_section' id='fillinsection'>
          <p class='ques' ref="question" tabindex=0></p>
          <div class="clearfix"> 
            <button class="modalBtn yesBtn fillinsubmit disabled" id="fib_submit">Submit</button>
          </div>
          <!--  <p class="status_message"></p>
          <p class="feedback_answers"></p>  -->
      </form>
  </div>
  <style>
      #fillinsection{
        width:100%;
      }
      .status_message {
          padding: 6px 0;
          margin: 0;
          font-size: 14px;
          letter-spacing: 1px;
      }
      
      .status_message.correct_answer {
          color: green;
      }
      
      .status_message.incorrect_answer {
          color: red;
      }
      .modalBtn.yesBtn:hover:before,
      .formBtn.yesBtn:hover:before,
      .btnWidget:hover:before {
        display:none!important;
      }
      .clearfix{
        margin-top:15px;
      }
  </style>
  <script>
this.on("mount", function () {
updateAnimation(opts.widgetId);
this.refs.question.innerHTML = opts.settings.question
var $parent = $("#" + opts.widgetId);
var fibLen = $parent.find(".fill-blank-input").length;
var backColor = opts.settings.bgColor
var subColor = opts.settings.submitColor
var subHover = opts.settings.submitHover
var optColor = opts.settings.optionColor
$("#"+opts.widgetId).parent().css("background-color",backColor)
$("#"+opts.widgetId).parent().css("background-image","url("+opts.settings.url+")")
 if(opts.settings.backgroundColorSelected == "1"){
    $("#"+opts.widgetId).parent().css("background-image","none")
  }
  $("#"+opts.widgetId).find("#fib_submit").attr('style','background-color:'+subColor+'!important;border-color:'+subColor+'!important');
  $("#"+opts.widgetId).find("#fib_submit").hover(function(){
    $(this).attr('style','background-color:'+subHover+'!important;border-color:'+subHover+'!important;transition:0.8s;color:'+opts.settings.submitText);
  },function(){
    $(this).attr('style','background-color:'+subColor+'!important;border-color:'+subColor+'!important;transition:0.8s;color:'+opts.settings.submitText);
  })
   $("#"+opts.widgetId).find("#fib_submit").css("color",opts.settings.submitText)
   $("#"+opts.widgetId).find("#fib_submit").parent().css("text-align",opts.settings.submitAlign)
$parent.on("keyup", ".fill-blank-input", function (e) {
  var isEmpty = false;
  $parent.find(".fill-blank-input").each(function () {
    user_input = $(this).val().trim().toLowerCase();
    if(user_input == ""){
      isEmpty = true;
    }
  });
  
  if(!isEmpty){
    $('.fillinsubmit').removeClass("disabled");
  }else{
    $('.fillinsubmit').addClass("disabled");
  }
});
$parent.find('.fill-blank-input').attr('autocomplete', 'off');
$parent.on("click", ".fillinsubmit", function (e) {
  e.preventDefault();
  var isCorrect = true;
  var correct_answer = "";
  var user_answer = "";

var i = 0;
  $parent.find(".fill-blank-input").each(function () {
  i++;
  correct_answer = $(this).attr("data-correct").trim().toLowerCase();
  if(i < fibLen){
    user_answer += $(this).val().trim().toLowerCase() +",";
  }else{
    user_answer += $(this).val().trim().toLowerCase();
  }
  
  if ($(this).val().trim().toLowerCase() !== $(this).attr("data-correct").trim().toLowerCase()) {
    isCorrect = false;
  }

  });

  if (assessment.getAssessment() == 1) {
    assessmentFeedback.fibUserInput(user_answer);

    if (isCorrect) {
      assessment.setScore(parseInt(shell.getCurrentPage()));
    }

    var wasCorrect = isCorrect;
    assessment.setInteraction(shell.getCurrentPage(), "fib", user_answer, correct_answer, wasCorrect, user_answer); // Moving to next page in case of assessment.

    var pageIndex = parseInt(shell.getCurrentPage()) + 1;
    shell.moveForward(pageIndex);
  } else if (assessment.getAssessment() == 0) {
    if (isCorrect) {
      <!--  $parent.find(".status_message").html("Correct answer").addClass("correct_answer").removeClass("incorrect_answer");
      $parent.find(".feedback_answers").html("").append(opts.settings.correct)  -->
       $("#feedback_box").remove();
        var message = "Correct"
        var content = opts.settings.correct;
        var htmlString = '<div class="modal" id="feedback_box" tabindex="-1" role="dialog"><div class="modal-dialog modal-dialog-centered" role="document" style="visibility: inherit;top:0px"><div class="modal-content modalContent"><div class="modal-header modalHeader dispnone"><h5 class="modal-title">Feedback</h5><button type="button" class="close closebutton modalClose" data-dismiss="modal" aria-label="Close"><span class="modalCloseIcon"></span><span class="modalCloseIcon"></span></button></div><div class="modal-body modalBody"><div class="inCorrect" style="text-align:center"><div class="check"></div></div><div class="status_feedbackmessage" style="text-align:center;margin-top:15px">' + message + '</div><div class="status_feedbackContent" style="text-align:center;margin-top:15px">'+content+'</div></div><div class="modal-footer modalFooter"><button type="submit" class="modalBtn yesBtn closebutton" data-dismiss="modal">OK</button></div></div></div>';
        $("body").append(htmlString);
        $("#feedback_box").modal("show");
    } else {
     <!--   $parent.find(".status_message").html("Incorrect answer").addClass("incorrect_answer").removeClass("correct_answer");
      $parent.find(".fill-blank-input").each(function (ind) {
        correct_answer = $(this).attr("data-correct").trim().toLowerCase();
        $parent.find(".correct_answers").append(" correct answer of blank "+(ind+1)+" = "+correct_answer+`<br>`)   })
      $parent.find(".feedback_answers").html("").append(opts.settings.inCorrect)  -->
        $("#feedback_box").remove();
        var message = "Incorrect"
        var content = opts.settings.inCorrect;
        var htmlString = '<div class="modal" id="feedback_box" tabindex="-1" role="dialog"><div class="modal-dialog modal-dialog-centered" role="document" style="visibility: inherit;top:0px"><div class="modal-content modalContent"><div class="modal-header modalHeader dispnone"><h5 class="modal-title">Feedback</h5><button type="button" class="close closebutton modalClose" data-dismiss="modal" aria-label="Close"><span class="modalCloseIcon"></span><span class="modalCloseIcon"></span></button></div><div class="modal-body modalBody"><div class="inCorrect" style="text-align:center"><div class="close_icon"></div></div><div class="status_feedbackmessage" style="text-align:center;margin-top:65px">' + message + '</div><div class="status_feedbackContent" style="text-align:center;margin-top:15px">'+content+'</div></div><div class="modal-footer modalFooter"><button type="submit" class="modalBtn yesBtn closebutton" data-dismiss="modal">OK</button></div></div></div>';
        $("body").append(htmlString);
        $("#feedback_box").modal("show");
    }
  }
}); // need to write the code for review.

if (assessment.getAssessment() == 2) {
  var userSelectval = assessmentFeedback.showfibUserInput(shell.getCurrentPage());
if(fibLen > 1){
  var userSavedInput = userSelectval.studentResponse;
  userSavedInput = userSavedInput.split(",");
  var j = 0; 
  $parent.find(".fill-blank-input").each(function () {
    if( j < fibLen){
      $(this).val(userSavedInput[j]);
    }
    j++;
  });
}else{
  var userSavedInput = userSelectval.studentResponse;
  $parent.find(".fill-blank-input").each(function () {
    $(this).val(userSavedInput);
  });
}
  $parent.find(".fillinsubmit").addClass("disabled"); // correct and incorrect background color //

  if (parseInt(userSelectval.result) > 0) {
    $('#green_patch_wrong').show();
  } else {
    $('#red_patch_wrong').show();
  }

  shell.enableNextButton(); //shell.disableBackButton();
} else if (assessment.getAssessment() == 1) {
  shell.disableNextButton();
  shell.disableBackButton();
}

if ($globalScope[opts.widgetId] == undefined) {
  FixedLayout.fixWidgetRowHeight(opts.widgetId);
}

WidgetEvents.mounted(opts.widgetId);
$("#"+opts.widgetId).find('input[type="text"]').css("background-color",optColor)
});
  </script>

</fillinblank_widget_2>