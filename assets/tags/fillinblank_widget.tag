<fillinblank_widget>
  <div class="visuallyhidden" aria-hidden="true" tabindex=0>This is a fill in the blank pattern.</div>
  <div class='fillinblank-widget animation_this word_count' ref="main">
      <form class='fill_in_section' id='fillinsection'>
          <p class='ques' ref="question" tabindex=0></p>
          <button class="modalBtn yesBtn fillinsubmit disabled">Submit</button>
          <p class="status_message"></p>
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
  </style>
  <script>
this.on("mount", function () {
updateAnimation(opts.widgetId);
this.refs.question.innerHTML = opts.settings.question;
var $parent = $("#" + opts.widgetId);
var fibLen = $parent.find(".fill-blank-input").length;
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
      $parent.find(".status_message").html("Correct answer").addClass("correct_answer").removeClass("incorrect_answer");
    } else {
      $parent.find(".status_message").html("Incorrect answer").addClass("incorrect_answer").removeClass("correct_answer");
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
});
  </script>

</fillinblank_widget>