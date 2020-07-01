<percentage_widget>
    <div class="visuallyhidden" aria-hidden="true" tabindex="-1">This is an MCQ pattern.</div>
    <div class="animation_this word_count">
        <div class="question" id="question_{opts.widgetId}">
            <span></span>
        </div>

        <div id="output_{opts.widgetId}" class="row p-0-15">
            <input type="text" name="inputpercentage" class="full-width" id="input_percentage_{opts.widgetId}" autocomplete="off" />
            <textarea id="textarea_percentage_{opts.widgetId}" class="answer-area" style="display:none"></textarea>
            <!--  <input type="submit" disabled="disabled" value="Submit" class="formBtn yesBtn" id="submit_{opts.widgetId}" />  -->
            <button type="submit" class="formBtn yesBtn my-2" id="submit_{opts.widgetId}" disabled>Submit</button>
        </div>
    </div>

    <style>
        .p-0-15 {
            padding: 0 15px;
        }
        
        .userresponse {
            background-color: #f156573d;
            border-radius: 4px;
            margin: 0 5px 10px 0;
            padding: 8px 15px;
            width: 48%;
        }
        
        .expert-response-area {
            background-color: #bcec97;
            border-radius: 4px;
            margin: 0 5px 10px 0;
            padding: 8px 15px;
            width: 48%;
            font-weight: 500;
            font-size: 14px;
        }
        
        .userresponse,
        .expresponse {
            display: block;
        }
        
        .useranswer {
            width: 100%;
            margin-bottom: 10px;
        }
        
        .expresponse span {
            margin-bottom: 10px;
        }
        
        input[type=submit]:hover {
            background-color: #23889e;
        }
        
        .question {
            margin-bottom: 10px;
        }
        
        .userans {
            background-color: #0a94b34a;
            padding: 8px 15px;
            border-radius: 4px;
            margin: 0 5px 10px 0;
            width: 48%;
        }
        
        .expres {
            background-color: #ffe99b;
            padding: 8px 15px;
            border-radius: 4px;
            margin: 0 0px 10px 0px;
            width: 48%;
        }
        
        .userans textarea {
            width: 100%;
        }
        
        .per_answer-block {
            width: 100%;
        }
        
        .answer-heading,
        .expert-heading {
            font-weight: 500;
            font-size: 14px;
            display: block;
            margin:0px;
        }
        
        .answer-area {
            width: 100%;
            padding: 0 5px;
        }
        
        .question span {
            margin: 10px 0;
            display: block;
        }
        
        .correct-answer {
            background-color: #90a084;
            padding: 0 3px!important;
            border-radius: 3px;
            color: #fff;
            display: inline!important;
            margin: 0px 5px 0px 0px!important;
        }
        
        .incorrect-answer {
            color: #fff;
            background-color: #ff00009e;
            border-radius: 3px;
            padding: 0 6px;
            display: table;
        }
        .feedback {
            display: block;
            font-weight: 500;
            font-size: 14px;
            float: left;
            margin-right: 5px;
        }
        
        .answer-heading {
            <!--  padding-left: 15px;  -->
            <!--  margin-bottom: 10px;  -->
            display: block;
            width: 100%;
        }
        
        .userans .answer-heading {
            padding-left: 0px;
            margin-bottom: 0px;
        }
    </style>



    <script>
this.on("mount", function () {
  updateAnimation(opts.widgetId);
  var answer, useranswer, onewordans, textareaanswer;
  answer = opts.settings.answer;
  onewordans = opts.settings.onewordans;
  $("#question_" + opts.widgetId).append(opts.settings.question);

  if (onewordans === undefined) {
    $("#input_percentage_" + opts.widgetId).css("display", "none");
    $("#textarea_percentage_" + opts.widgetId).css("display", "block");
  }

  $("#input_percentage_" + opts.widgetId).keypress(function () {
    $("#submit_" + opts.widgetId).removeAttr('disabled');
  });
  $("#textarea_percentage_" + opts.widgetId).on('input', function () {
    $("#submit_" + opts.widgetId).removeAttr('disabled');
  });
  $("#submit_" + opts.widgetId).click(function (e) {
    e.preventDefault();
    useranswer = $("#input_percentage_" + opts.widgetId).val();
    textareaanswer = $("#textarea_percentage_" + opts.widgetId).val();

    if (assessment.getAssessment() == 1) {
      var userResponse = "";

      if (onewordans === undefined) {
        userResponse = $("#textarea_percentage_" + opts.widgetId).val();
        var wasCorrect = "NA";
        assessment.setInteraction(shell.getCurrentPage(), "qstn_ans", userResponse, "NA", wasCorrect, userResponse);
        assessment.reduceQuestScoreVal(parseInt(shell.getCurrentPage()));
      } else {
        userResponse = $("#input_percentage_" + opts.widgetId).val();

        if (answer.toLowerCase() === userResponse.toLowerCase()) {
          var wasCorrect = true;
          assessment.setScore(parseInt(shell.getCurrentPage()));
        } else {
          var wasCorrect = false;
        }

        assessment.setInteraction(shell.getCurrentPage(), "qstn_ans", userResponse, "NA", wasCorrect, userResponse);
      }

      assessmentFeedback.fibUserInput(userResponse); // Moving to next page in case of assessment.

      var pageIndex = parseInt(shell.getCurrentPage()) + 1;
      shell.moveForward(pageIndex);
    } else if (assessment.getAssessment() == 0) {
      if (onewordans === undefined) {
        $("#output_" + opts.widgetId).html('<div class="userans"><span class="answer-heading correct-answer">Your Answer : </span><div>' + textareaanswer + '</div></div><div class="expres"><span class="expert-heading correct-answer">Expert Response :</span>' + opts.settings.noresponse + '</div>');
      } else {
        if (answer.toLowerCase() === useranswer.toLowerCase()) {
          $("#output_" + opts.widgetId).html('<div class="expert-response-area "><div class="userfeedback"><p class="answer-heading"><span class="correct-answer">Your Answer : </span>' + useranswer + '</span><p class="feedback correct-answer">Feedback : </span>' + opts.settings.feedback + '</div></div><div class="expres"><span class="expert-heading correct-answer">Expert Response : </span>' + opts.settings.yesresponse + '</div>');
        } else {
          $("#output_" + opts.widgetId).html('<div class="userresponse"><div class="userfeedback"><p class="answer-heading"><span class="correct-answer">Your Answer : </span>' + useranswer + '</p><span class="feedback correct-answer">Feedback : </span>' + opts.settings.feedback + '</div></div><div class="expres"><span class="expert-heading correct-answer">Expert Response : </span>' + opts.settings.yesresponse + '</div>');
        }
      }
    }
  }); // need to write the code for review.

  if (assessment.getAssessment() == 2) {
    var userSelectval = assessmentFeedback.showfibUserInput(shell.getCurrentPage());
    var userSavedInput = userSelectval.studentResponse;
    $("#submit_" + opts.widgetId).addClass("disabled");

    if (onewordans === undefined) {
      $("#textarea_percentage_" + opts.widgetId).val(userSavedInput);
      $("#output_" + opts.widgetId).after('<div class="userans"><span class="answer-heading">Your Answer: </span><div>' + userSavedInput + '</div></div><div class="expres"><span class="expert-heading">Expert Response</span>' + opts.settings.noresponse + '</div>');
    } else {
      $("#input_percentage_" + opts.widgetId).val(userSavedInput);

      if (parseInt(userSelectval.result) > 0) {
        $("#output_" + opts.widgetId).after('<div class="expert-response-area col-sm-12"><div class="expertresponse"><span class="correct-answer">Correct Answer!!</span>' + opts.settings.yesresponse + '</div></div>');
      } else {
        $("#output_" + opts.widgetId).after('<div class="userresponse"><div class="userfeedback"><span class="feedback">' + opts.settings.feedback + '</span></div></div><div class="expert-response-area"><span class="correct-answer">Correct Answer: ' + opts.settings.orignalanswer + '</span><div class="expresponse">' + opts.settings.yesresponse + '</div></div>');
      }
    } // correct and incorrect background color //


    if (parseInt(userSelectval.result) == 1) {
      $('#green_patch_wrong').show();
    } else if (parseInt(userSelectval.result) == 0) {
      $('#red_patch_wrong').show();
    }

    shell.enableNextButton(); //shell.disableBackButton();
  } else if (assessment.getAssessment() == 1) {
    shell.disableNextButton();
    shell.disableBackButton();
  }
});

if ($globalScope[opts.widgetId] == undefined) {
  FixedLayout.fixWidgetRowHeight(opts.widgetId);
}
         
    </script>
</percentage_widget>