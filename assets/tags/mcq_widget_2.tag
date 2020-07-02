<mcq_widget_2>
    <div class="visuallyhidden" tabindex="-1" aria-hidden="true">This is an MCQ pattern.</div>
    <div class="animation_this word_count mcq">
        <form id={editor_id} class='mcq-widget' ref="main">
            <div class="question_mcq" id="mcq_form_{opts.widgetId}"></div>
            <div id="option_mcq" class="options" ref="options"> </div>
            <div class="simple_boxfeedback">
                <div class="status_message" style="display:none"></div>
            </div>
        </form>
        <div class="clearfix">
            <!--  disabled  -->
            <button type="submit" style="text-transform:uppercase;" class="modalBtn yesBtn mcqSubmitAnswer  disabled" id="submit_mcqfeedback">Submit</button>
           <!-- <span class="attemptover"></span> -->
        </div>
    </div>
    <style>
    #submit_mcqfeedback,#submit_mcqfeedback:focus,#submit_mcqfeedback:focus:active,.mcqSubmitAnswer,.mcqSubmitAnswer:focus{
      text-transform:uppercase;
      border-radius:0px !important;
    }
        .success-checkmark {
            width: 80px;
            height: 115px;
            margin: 0 auto;
        }
        
        .success-checkmark .check-icon {
            width: 80px;
            height: 80px;
            position: relative;
            border-radius: 50%;
            box-sizing: content-box;
            border: 4px solid #4caf50;
        }
        
        .success-checkmark .check-icon::before {
            top: 3px;
            left: -2px;
            width: 30px;
            transform-origin: 100% 50%;
            border-radius: 100px 0 0 100px;
        }
        
        .success-checkmark .check-icon::after {
            top: 0;
            left: 30px;
            width: 60px;
            transform-origin: 0 50%;
            border-radius: 0 100px 100px 0;
            animation: rotate-circle 4.25s ease-in;
        }
        
        .success-checkmark .check-icon::before,
        .success-checkmark .check-icon::after {
            content: '';
            height: 100px;
            position: absolute;
            background: #fff;
            transform: rotate(-45deg);
        }
        
        .success-checkmark .check-icon .icon-line {
            height: 5px;
            background-color: #4caf50;
            display: block;
            border-radius: 2px;
            position: absolute;
            z-index: 10;
        }
        
        .success-checkmark .check-icon .icon-line.line-tip {
            top: 46px;
            left: 14px;
            width: 25px;
            transform: rotate(45deg);
            animation: icon-line-tip 0.75s;
        }
        
        .success-checkmark .check-icon .icon-line.line-long {
            top: 38px;
            right: 8px;
            width: 47px;
            transform: rotate(-45deg);
            animation: icon-line-long 0.75s;
        }
        
        .success-checkmark .check-icon .icon-circle {
            top: -4px;
            left: -4px;
            z-index: 10;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            position: absolute;
            box-sizing: content-box;
            border: 4px solid rgba(76, 175, 80, .5);
        }
        
        .success-checkmark .check-icon .icon-fix {
            top: 8px;
            width: 5px;
            left: 26px;
            z-index: 1;
            height: 85px;
            position: absolute;
            transform: rotate(-45deg);
            background-color: #fff;
        }
        
        .attemptover {
            font-size: 15px;
            color: #60b120;
            float: right;
            margin-right: 15px;
            margin-bottom: 11px;
            font-weight: bold;
            margin-top: 2px;
        }
        
        @keyframes rotate-circle {
            0% {
                transform: rotate(-45deg);
            }
            5% {
                transform: rotate(-45deg);
            }
            12% {
                transform: rotate(-405deg);
            }
            100% {
                transform: rotate(-405deg);
            }
        }
        
        @keyframes icon-line-tip {
            0% {
                width: 0;
                left: 1px;
                top: 19px;
            }
            54% {
                width: 0;
                left: 1px;
                top: 19px;
            }
            70% {
                width: 50px;
                left: -8px;
                top: 37px;
            }
            84% {
                width: 17px;
                left: 21px;
                top: 48px;
            }
            100% {
                width: 25px;
                left: 14px;
                top: 45px;
            }
        }
        
        @keyframes icon-line-long {
            0% {
                width: 0;
                right: 46px;
                top: 54px;
            }
            65% {
                width: 0;
                right: 46px;
                top: 54px;
            }
            84% {
                width: 55px;
                right: 0px;
                top: 35px;
            }
            100% {
                width: 47px;
                right: 8px;
                top: 38px;
            }
        }
        
        .mcq-widget {
            padding: 20px 0 0;
        }
        
        .mcqfeedbackoption,
        .mcqfeedbackoptionradio {
            font-size: 11px!important;
            display: block;
            float: right;
            margin-top: -26px;
            margin-right: 20px;
        }
        
        .options {
            margin: 15px 0;
        }
        
        #option_mcq .option.selected,
        #option_mcq .option.radioSelected {
            border: 1px solid #067761;
            border-left: 5px solid #067761;
            background: #f2f2f2;
        }
        
        #option_mcq .option {
            padding: 5px 0px 5px 5px;
            cursor:pointer;
            border: 1px solid transparent;
          /*  margin: 10px 0;*/
            border-radius: 0;
            font-size: 14px;
            min-height: 30px;
            background-color: #dadada;
            color: #000;
        }
        
        .modalBtn.yesBtn,
        .formBtn.yesBtn {
            background-color: #35adc7;
            color: #fff;
        }
        
        .status_message {
            display: block;
            margin: 0 auto 15px;
            font-size: 14px;
            line-height: 40px;
            color: #fff;
            font-family: 'Open sans';
            text-align: center;
            background: #f2f2f2;
            float: left;
            width: 100%;
        }
        
        .status_message.correct_answer {
            color: green;
        }
        
        .status_message.incorrect_answer {
            color: red;
        }
        
        .cursor-not-allowed {
            cursor: not-allowed;
            pointer-events: none;
        }
        
        .bgcolorcorrect {
            background-color: #35ce8d!important;
        }
        
        .bgcolorincorrect {
            background-color: #ffab00!important;
        }
        
        .tryAgainBnt {
            background-color: #d41212!important;
        }
        
        .openfeedback {
            cursor: pointer;
            display: block;
            margin-top: -8px;
        }
        
        .fs20 {
            font-size: 20px;
        }
        
        .inblock {
            display: inline-block;
            vertical-align: middle;
        }
        
        .feedbackbox {
            float: left;
            width: 100%;
            background-color: #c7c7c7;
        }
        
        .mcq-widget .option>p,
        .mcq-widget .option>div {
            display: inline-block;
        }
        
        .option p {
            margin: 0px;
        }
        
        .mcq-widget .seeWnyoption div {	
          font-size: 12px;	
          border: 0px solid #ccc;	
          padding: 4px;	
          background: #fbfbfb;	
          margin-top: -5px;
          margin-bottom:20px;	
        }	
        #option_mcq input[type=checkbox], input[type=radio] {	
          box-sizing: border-box;	
          margin: 6px 7px 4px 0px;	
          float: left;	
        }	
        #option_mcq .option > div {	
          width:90%	
        }
        .modalBtn.yesBtn:hover:before,
        .formBtn.yesBtn:hover:before,
        .btnWidget:hover:before {
          display:none!important;
        }
       
 
    </style>

    <script>
this.editor_id = opts.widgetId + "_editor";
if(!$('#editorPage').find('#mcq_form_'+opts.widgetId).length){
this.on("mount", function () {
  updateAnimation(opts.widgetId);
  var $parent = $("#" + opts.widgetId);
  var that = this;
  var isRadioButton = false;
  this.question = opts.settings.question;
  $(".mlsl_truefalse").find("#submit_mcqfeedback").removeClass("pull-right")
  $parent.find('.question_mcq').append("<label id=\"question\">".concat(opts.settings.question, "</label>"));
  $parent.find('.question_mcq').css("background-color",opts.settings.questionBackground)
  var backColor = opts.settings.bgColor
  var subColor = opts.settings.submitColor
  var subHover = opts.settings.submitHover
  var optColor = opts.settings.optionColor
  
  $("#"+opts.widgetId).parent().css("background-color",backColor)
  $("#"+opts.widgetId).parent().css("background-image","url("+opts.settings.url+")")
  if(opts.settings.backgroundColorSelected == "1"){
    $("#"+opts.widgetId).parent().css("background-image","none")
  }
  $("#"+opts.widgetId).find("#submit_mcqfeedback").attr('style','background-color:'+subColor+'!important;border-color:'+subColor+'!important');
  $("#"+opts.widgetId).find("#submit_mcqfeedback").hover(function(){
    $(this).attr('style','background-color:'+subHover+'!important;border-color:'+subHover+'!important;transition:0.8s;color:'+opts.settings.submitText);
  },function(){
    $(this).attr('style','background-color:'+subColor+'!important;border-color:'+subColor+'!important;transition:0.8s;color:'+opts.settings.submitText);
  })
  $("#"+opts.widgetId).find("#submit_mcqfeedback").css("color",opts.settings.submitText)
  $("#"+opts.widgetId).find("#submit_mcqfeedback").parent().css("text-align",opts.settings.submitAlign)
 
  opts.settings.options.forEach(function (item, index) {
    var isCorrect = false;

    if (opts.settings.correct_answer) {
      opts.settings.correct_answer.forEach(function (item2, index2) {
        if (opts.settings.correct_answer[index2].correctAns === item.textValue && opts.settings.correct_answer[index2].optIndex == index) isCorrect = true;
      });
    }

    if (opts.settings.correct_answer.length == 1) {
      isRadioButton = true;
      var inputTag = "<input type=\"hidden\" value='".concat(item.feedbackoption, "'>");
      var anchorTag = "<a class=\"openfeedback\">See why?</a>";

      if (opts.settings.seeWhy === 'yes') {
        if (item.feedbackoption === "") anchorTag = "";
        $parent.find(that.refs.options).append("<div class='option' role='radio' aria-checked='false' tabindex='0'>\n                <input type='radio' name='answer' tabindex='-1' data-correct='".concat(isCorrect, "' id='").concat(index, "'> ").concat(item.textValue, "</div><div class='mcqfeedbackoptionradio' style=\"display:none\">").concat(inputTag + anchorTag, "</div>"));
      } else {
        $parent.find(that.refs.options).append("<div class='option' role='radio' aria-checked='false' tabindex='0'>\n                <input type='radio' name='answer' tabindex='-1' data-correct='".concat(isCorrect, "' id='").concat(index, "'> ").concat(item.textValue, "</div><div class='seeWnyoption'></div>"));
      }
    } else {
      var _inputTag = "<input type=\"hidden\" value='".concat(item.feedbackoption, "'>");

      var _anchorTag = "<a class=\"openfeedback\">See why?</a>";

      if (opts.settings.seeWhy === 'yes') {
        if (item.feedbackoption === "") _anchorTag = "";
        $parent.find(that.refs.options).append("<div class='option' role='checkbox' aria-checked='false' tabindex='0'>\n                  <input  type='checkbox' tabindex='-1' name='answer' data-correct='".concat(isCorrect, "' id='").concat(index, "'> ").concat(item.textValue, "</div><div class='mcqfeedbackoption' style=\"display:none\">").concat(_inputTag + _anchorTag, "</div>"));
      } else {
        $parent.find(that.refs.options).append("<div class='option' role='checkbox' aria-checked='false' tabindex='0'>\n                  <input type='checkbox' tabindex='-1' name='answer' data-correct='".concat(isCorrect, "' id='").concat(index, "'> ").concat(item.textValue, "</div><div class='seeWnyoption'></div>"));
      }
    }

    $(".mcq-widget").off("click keypress", ".options .option").on("click keypress", ".options .option", function (e) {
      if ($(this).find('input[type]')[0].type == 'radio') {
        $('.radioSelected input[type="radio"]').each(function (index) {
          $(this).parent(".radioSelected").removeClass("radioSelected");
        });
        $(this).toggleClass('radioSelected');
      } else if ($(this).find('input[type]')[0].type == 'checkbox') {
        $(this).toggleClass('selected');
      }

      if ($(this).hasClass('selected') || $(this).hasClass('radioSelected')) {
        $(this).find('input[type="checkbox"]').prop('checked', true);
        $(this).find('input[type="radio"]').prop('checked', true);
      } else {
        $(this).find('input[type="checkbox"]').prop('checked', false);
        $(this).find('input[type="radio"]').prop('checked', false);
      }

      var $parent = $("#" + opts.widgetId); // select multiple Checkbox

      if (assessment.getAssessment() != 2) {
        var checked = $("#option_mcq input[type=checkbox]:checked").length;

        //if (checked > 1) {
          $(this).parent().parent().parent().find('.modalBtn.yesBtn').removeClass('disabled');
       // } else {
          //$(this).parent().parent().parent().find('.modalBtn.yesBtn').addClass('disabled');
        //}
      } // select single radioButton


      if (assessment.getAssessment() != 2) {
        if ($(this).hasClass("radioSelected")) {
          var radio = $("#option_mcq input[type=radio]:checked").length;

          if (radio > 0) {
            $(this).parent().parent().parent().find('.modalBtn.yesBtn').removeClass('disabled');
          }
        }
      }
    $(this).closest('.options').find('.option').each(function(i,v){
      $(v).attr('aria-checked',$(v).find('input').is(':checked'));
    })
    });
    var totalTryCount = 0;
    opts.settings.isFeedbackAdded = true;
    $("#" + opts.widgetId).off("click").on("click", ".mcqSubmitAnswer", function (e) {
      var audio = $('.play-btn');
      if(audio.length){
        audio.each(function(i,v){
          if($(v).find('img').hasClass('pause-icon')){
            v.click()
          }
          })
      }
      $(this).prop('disabled','disabled');
      window.tabingItems = $('[tabindex="0"]:visible,button:visible,a:visible');
      window.tabingItems.each(function(i,v){
        $(v).attr('tabindex','-1');
      });
      $(this).prop('disabled','disabled');
      setTimeout(function(){
        $('.status_feedbackContent [tabindex="0"]').focus();
      },1500);
      var selectedListArray = [];
      var correctAnswers = [];
      var showFeedbackSign = true;
      var Total_attempt_number = Number(opts.settings.Total_attempt); // resetting variable in case  of assesment.

      if (assessment.getAssessment() == 1) {
        Total_attempt_number = 1;
        showFeedbackSign = false;
      }

      if (opts.settings.correct_answer.length == 1) {
        $parent.find(".simple_boxfeedback").show();
      } else {
        $parent.find(".simple_boxfeedback").hide();
      }

      var selectedVal = $parent.find('.options .option.radioSelected input').attr("data-correct");
      var isCorrect = false;
      var partially = false;
      var incorrectCount = 0;
      var correctCount = 0;
      $parent.find('.options .option').each(function (index, item) {
        if ($(this).hasClass("selected") || $(this).hasClass("radioSelected")) {
          if ($(this).find("input").attr("data-correct") !== "true") {
            incorrectCount++;
          } else if ($(this).find("input").attr("data-correct") == "true") {
            correctCount++;
          }

          selectedListArray.push(index);
        }

        if ($(this).find("input").attr("data-correct") == "true") {
          correctAnswers.push(index);
        }
      });

      if (incorrectCount > 0 && correctCount > 0) {
        if (showFeedbackSign == true) {
          partially = true;
        }
        totalTryCount++;
      } else if (correctCount > 0) {
        if(opts.settings.correct_answer.length== correctCount){
          isCorrect = true;
        }else{
        isCorrect = false;
        }
      } else if (incorrectCount > 0) {
        totalTryCount++;
      }

      if (correctCount > 0 && opts.settings.correct_answer.length != correctCount && totalTryCount + 1 != opts.settings.Total_attempt) {
        if (showFeedbackSign == true) {
          partially = true;
          
        }

        isCorrect = false;
      } // radiobutton funcationality for checking correct and incorrect based on total attempt


      if (isRadioButton && (isCorrect || totalTryCount < Total_attempt_number)) {
        if (isCorrect === true) {
          totalTryCount = 0;

          if (showFeedbackSign == true) {
            <!--  $parent.find('.status_message').html('<span class="fs20 inblock">&#x2714;</span>&nbsp;&nbsp;Correct answer' + "<br/><div class=\"feedbackbox\"></div>");
            $parent.find('.status_message').show();
            $parent.find('.status_message').addClass('correct_answer').removeClass('incorrect_answer');  -->
            setCurrectAnswer('Correct', isCorrect, true,opts.settings.globalCorrect);
            $parent.find('#option_mcq .option').addClass('cursor-not-allowed');
            $parent.find('.mcqSubmitAnswer').text('Submit').addClass('cursor-not-allowed').removeClass('tryAgainBnt'); // correct and incorrect background color //

            $parent.find('.options .option').each(function (index, item) {
              if ($(this).find("input").attr("data-correct") == 'true') {
                $(this).find("input").parent().addClass('bgcolorcorrect').removeClass('bgcolorincorrect');
              } else if ($(this).find("input").attr("data-correct") == 'false') {
                $(this).find("input").parent().addClass('bgcolorincorrect').removeClass('bgcolorcorrect');
              }
            }); // see Why Option select

            opts.settings.options.forEach(function (item, index) {
              if (opts.settings.seeWhy === 'yes') {
                $(".mcqfeedbackoptionradio").show();
              } else {
                if (item.feedbackoption && item.feedbackoption.trim().length > 0) {
                  $parent.find(that.refs.options).find(".seeWnyoption:eq(" + index + ")").append("<div>&nbsp;".concat(item.feedbackoption, "</div>"));
                }

                $(".mcqfeedbackoptionradio").hide();
              }
            });
          }
        } else {
          if (showFeedbackSign == true) {
           <!--   $parent.find('.status_message').show();
            $parent.find('.status_message').html('<span class="fs20 inblock">&#215;</span>&nbsp;&nbsp;Incorrect' + "<br/><div class=\"feedbackbox\"></div>");
            $parent.find('.status_message').addClass('incorrect_answer').removeClass('correct_answer');  -->
            setIncurrectAnswer('Incorrect', isCorrect,false,opts.settings.globalIncorrect);
            $parent.find(".option").removeClass("radioSelected");
            $parent.find("input").prop("checked", false);
            $parent.find('.mcqSubmitAnswer').text('Try Again').addClass('tryAgainBnt').addClass('disabled');
          }
        }
      } else if (isRadioButton) {
        if (showFeedbackSign == true) {
          <!--  $parent.find('.status_message').html('Attempt Over' + "<br/><div class=\"feedbackbox\"></div>");
          $parent.find('.status_message').addClass('Attempt_over').removeClass('correct_answer', 'incorrect_answer');  -->
          //setCurrectAnswer('Attempt Over', isCorrect);
          
          $parent.find('.status_message').html('<span class="fs20 inblock">&#215;</span>&nbsp;&nbsp;Incorrectdddd asdhas' + "<br/><div class=\"feedbackbox\"></div>");
          setIncurrectAnswer('Incorrect', isCorrect,false,opts.settings.globalIncorrect);

          $parent.find('#option_mcq .option').addClass('cursor-not-allowed');
          $parent.find('.mcqSubmitAnswer').text('Submit').addClass('cursor-not-allowed').removeClass('tryAgainBnt');
          $(".correct").css("display","none");
          //$(".status_feedbackContent").css("display","none");
          //$parent.find('.attemptover').text('Attempts over'); // correct and incorrect background color //

          $parent.find('.options .option').each(function (index, item) {
            if ($(this).find("input").attr("data-correct") == 'true') {
              $(this).find("input").parent().addClass('bgcolorcorrect').removeClass('bgcolorincorrect');
            } else if ($(this).find("input").attr("data-correct") == 'false') {
              $(this).find("input").parent().addClass('bgcolorincorrect').removeClass('bgcolorcorrect');
            }
          }); // see Why Option select

          opts.settings.options.forEach(function (item, index) {
            if (opts.settings.seeWhy === 'yes') {
              $(".mcqfeedbackoptionradio").show();
            } else {
              if (item.feedbackoption && item.feedbackoption.trim().length > 0) {
                $parent.find(that.refs.options).find(".seeWnyoption:eq(" + index + ")").append("<div>&nbsp;".concat(item.feedbackoption, "</div>"));
              }

              $(".mcqfeedbackoptionradio").hide();
            }
          });
        }
      } // All Option feedback box with radio button


      $(".mcqfeedbackoptionradio, a").click(function (val, index) {
        if (feebVal == 0 && $(this).parent().hasClass('mcqfeedbackoptionradio')) {
          $("#openFeedback").remove();
          var optionFeedback = '<div class="modal" id="openFeedback" tabindex="-1" role="dialog"><div class="modal-dialog modal-dialog-centered" role="document" style="visibility: inherit;top:0px"><div class="modal-content modalContent"><div class="modal-header modalHeader"><h5 class="modal-title">Feedback</h5><button type="button" class="close closebutton modalClose" data-dismiss="modal" aria-label="Close"><span class="modalCloseIcon"></span><span class="modalCloseIcon"></span></button></div><div class="modal-body modalBody"><div class="status_feedbackmessage11">' + $(this).parent().find("input[type='hidden']").val() + '</div></div><div class="modal-footer modalFooter"><button type="submit" class="modalBtn yesBtn closebutton" data-dismiss="modal">Ok</button></div></div></div>';
          $("body").append(optionFeedback);
          $("#openFeedback").modal("show");
          feebVal++;
        } else {
          feebVal = 0;
        }
      }); // checkbox funcationality for checking correct ,incorrect and partially based on total attempt

      if (!isRadioButton && (isCorrect || totalTryCount < Total_attempt_number)) {
        if (isCorrect === true) {
          totalTryCount = 0;
          $parent.find('#option_mcq .option').addClass('cursor-not-allowed');
          $parent.find('.mcqSubmitAnswer').text('Submit').addClass('cursor-not-allowed').removeClass('tryAgainBnt');

          if (showFeedbackSign == true) {
            setCurrectAnswer('Correct', isCorrect, true,opts.settings.globalCorrect); // see Why Option select

            opts.settings.options.forEach(function (item, index) {
              if (opts.settings.seeWhy === 'yes') {
                $(".mcqfeedbackoption").show();
              } else {
                if (item.feedbackoption && item.feedbackoption.trim().length > 0) {
                  $parent.find(that.refs.options).find(".seeWnyoption:eq(" + index + ")").append("<div>&nbsp;".concat(item.feedbackoption, "</div>"));
                }

                $(".mcqfeedbackoption").hide();
              }
            }); // correct and incorrect background color //

            $parent.find('.options .option').each(function (index, item) {
              if ($(this).find("input").attr("data-correct") == 'true') {
                $(this).find("input").parent().addClass('bgcolorcorrect').removeClass('bgcolorincorrect');
              } else if ($(this).find("input").attr("data-correct") == 'false') {
                $(this).find("input").parent().addClass('bgcolorincorrect').removeClass('bgcolorcorrect');
              }
            });
          }
        } 
        else if (isCorrect === false && !partially) {
          //debugger;
          //$parent.find('.mcqSubmitAnswer').text('Try Again').addClass('tryAgainBnt').addClass('disabled');
          $parent.find('#option_mcq .option').addClass('cursor-not-allowed');
          $parent.find('.options .option').each(function (index, item) {
              if ($(this).find("input").attr("data-correct") == 'true') {
                $(this).find("input").parent().addClass('bgcolorcorrect').removeClass('bgcolorincorrect');
              } else if ($(this).find("input").attr("data-correct") == 'false') {
                $(this).find("input").parent().addClass('bgcolorincorrect').removeClass('bgcolorcorrect');
              }
            });
          setIncurrectAnswer('Incorrect', isCorrect,false,opts.settings.globalIncorrect);
          
        } else if (isCorrect === false && partially) {
          //$parent.find('.mcqSubmitAnswer').text('Try Again').addClass('tryAgainBnt').addClass('disabled');
          setIncurrectAnswer("Partially correct! Try again!", isCorrect,false,opts.settings.globalPartcorrect);
        }
      } else if (!isRadioButton) {
        if (showFeedbackSign == true) {
          $parent.find('#option_mcq .option').addClass('cursor-not-allowed');
          $parent.find('.mcqSubmitAnswer').text('Submit').addClass('cursor-not-allowed').removeClass('tryAgainBnt');
          //setCurrectAnswer("Attempts over", isCorrect, true);
          setIncurrectAnswer('Incorrect', isCorrect,false,opts.settings.globalIncorrect);
          $(".correct").css("display","none");
          //$(".status_feedbackContent").css("display","none");
         // $parent.find('.attemptover').text('Attempts over'); // see Why Option select

          opts.settings.options.forEach(function (item, index) {
            if (opts.settings.seeWhy === 'yes') {
              $(".mcqfeedbackoption").show();
            } else {
              if (item.feedbackoption && item.feedbackoption.trim().length > 0) {
                $parent.find(that.refs.options).find(".seeWnyoption:eq(" + index + ")").append("<div>&nbsp;".concat(item.feedbackoption, "</div>"));
              }

              $(".mcqfeedbackoption").hide();
            }
          }); // correct and incorrect background color //

          $parent.find('.options .option').each(function (index, item) {
            if ($(this).find("input").attr("data-correct") == 'true') {
              $(this).find("input").parent().addClass('bgcolorcorrect').removeClass('bgcolorincorrect');
            } else if ($(this).find("input").attr("data-correct") == 'false') {
              $(this).find("input").parent().addClass('bgcolorincorrect').removeClass('bgcolorcorrect');
            }
          });
        }
      }

      if (assessment.getAssessment() == 1) {
        if (isRadioButton) {
          assessmentFeedback.storeSelectedAnswerMcq(selectedListArray);
        } else {
          assessmentFeedback.mmcqCheckList(selectedListArray);
        }

        selectedListArray.sort();
        correctAnswers.sort();

        if (selectedListArray.join(",") == correctAnswers.join(",")) {
          isCorrect = true;
          assessment.setScore(parseInt(shell.getCurrentPage()));
        }

        var wasCorrect = isCorrect;
        assessment.setInteraction(shell.getCurrentPage(), "choice", selectedListArray.join(","), correctAnswers.join(","), wasCorrect, selectedListArray.join("|")); // Moving to next page in case of assessment.

        var pageIndex = parseInt(shell.getCurrentPage()) + 1;
        shell.moveForward(pageIndex);
      }
    });
  });

  if ($globalScope[opts.widgetId] == undefined) {
    FixedLayout.fixWidgetRowHeight(opts.widgetId);
  }

  WidgetEvents.mounted(opts.widgetId);
  var feebVal = 0; // All Option feedback box with checkbox button

  $(".mcqfeedbackoption, a").click(function (val, index) {
    if (feebVal == 0 && $(this).parent().hasClass('mcqfeedbackoption')) {
      $("#openFeedback").remove();
      var optionFeedback = '<div class="modal" id="openFeedback" tabindex="-1" role="dialog"><div class="modal-dialog modal-dialog-centered" role="document" style="visibility: inherit;top:0px"><div class="modal-content modalContent"><div class="modal-header modalHeader"><h5 class="modal-title">Feedback</h5><button type="button" class="close closebutton modalClose" data-dismiss="modal" aria-label="Close"><span class="modalCloseIcon"></span><span class="modalCloseIcon"></span></button></div><div class="modal-body modalBody"><div class="status_feedbackmessage11">' + $(this).parent().find("input[type='hidden']").val() + '</div></div><div class="modal-footer modalFooter"><button type="submit" class="modalBtn yesBtn closebutton" data-dismiss="modal">Ok</button></div></div></div>';
      $("body").append(optionFeedback);
      $("#openFeedback").modal("show");
      feebVal++;
    } else {
      feebVal = 0;
    }
  }); // need to write the code for review.

  if (assessment.getAssessment() == 2) {
    if (isRadioButton) {
      // for radioButtons
      var userSelectval = assessmentFeedback.showAnswerMcq(shell.getCurrentPage());
      var selectedArray = userSelectval.studentResponse;
      var selectedClass = "radioSelected";
    } else {
      // for checkBoxes
      var userSelectval = assessmentFeedback.showAnswerMMcq(shell.getCurrentPage());
      var selectedArray = userSelectval.studentResponse.split("|");
      var selectedClass = "selected";
    }

    var quesResult = userSelectval.result;
    var $parent = $("#" + opts.widgetId); // correct and incorrect background color //

    if (parseInt(userSelectval.result) > 0) {
      $('#green_patch_wrong').show();
    } else {
      $('#red_patch_wrong').show();
    } // correct and incorrect background color //


    $parent.find('.options .option').each(function (index, item) {
      var optIndex = index.toString();

      if (selectedArray.indexOf(optIndex) != -1) {
        if (isRadioButton) {
          $(this).filter(".option").addClass(selectedClass);
          $(this).filter(".option").find("input").click();
        } else {
          $(this).filter(".option").addClass(selectedClass);
          $(this).find('input[type="checkbox"]').prop('checked', true);
        }
      }

      if ($(this).find("input").attr("data-correct") == 'true') {
        $(this).find("input").parent().addClass('bgcolorcorrect').removeClass('bgcolorincorrect');
      } else if ($(this).find("input").attr("data-correct") == 'false') {
        $(this).find("input").parent().addClass('bgcolorincorrect').removeClass('bgcolorcorrect');
      }
    });
    shell.enableNextButton(); //shell.disableBackButton();
  } else if (assessment.getAssessment() == 1) {
    shell.disableNextButton();
    shell.disableBackButton();
  }
  $("#"+opts.widgetId).find(".option").css("background-color",optColor)
});
}

this.on("update", function () {
  opts.settings.text = this.refs.main.innerHTML;
}); // checkbox modal feedback

function setCurrectAnswer(message, isCorrect, attamptover, content) {
  $("#feedback_box").remove();
  
  
  var htmlString = '<div class="modal" id="feedback_box" tabindex="-1" role="dialog"><div class="modal-dialog modal-dialog-centered" role="document" style="visibility: inherit;top:0px"><div class="modal-content modalContent"><div class="modal-header modalHeader dispnone"><h5 class="modal-title">Feedback</h5><button type="button" class="close closebutton modalClose" data-dismiss="modal" aria-label="Close"><span class="modalCloseIcon"></span><span class="modalCloseIcon"></span></button></div><div class="modal-body modalBody"><div class="correct" style="text-align:center"><div class="check"></div></div><div class="status_feedbackmessage" style="text-align:center;margin-top:15px"></div><div class="status_feedbackContent" style="text-align:center;margin-top:15px">'+content+'</div></div><div class="modal-footer modalFooter"><button type="submit" class="modalBtn yesBtn closebutton" data-dismiss="modal">OK</button></div></div></div>';
  $("body").append(htmlString);
  $("#feedback_box").modal("show");
  $("#feedback_box .closebutton").click(function () {
    var $parent = $("#" + opts.widgetId);

    if (isCorrect) {
      $(this).find(".option").addClass('selected');
      $(this).find('input[type="checkbox"]').prop('checked', true);
      $parent.find('#option_mcq .option.selected ').addClass('bgcolor');
    } else {
      if (!attamptover) {
       // $parent.find(".option").removeClass('selected');
        //$parent.find('input[type="checkbox"]').prop('checked', false);
      }
    }

    if(window.tabingItems && window.tabingItems.length){
      
      window.tabingItems.each(function(i,v){
        $(v).attr('tabindex','0');
        if($(v).is('.mcqSubmitAnswer')){
           (function(okha){setTimeout(function(){
            $(window.tabingItems[okha]).focus();
          },50)})(i+1)
        }
      })
      $('.status_feedbackContent').attr('tabindex','-1');    
      setTimeout(function(){
      //  $('.mcqSubmitAnswer')[0].focus();
      },50)
    }
  });
}
function setIncurrectAnswer(message, isCorrect, attamptover, content) {
  $("#feedback_box").remove();
  var htmlString = '<div class="modal" id="feedback_box" tabindex="-1" role="dialog"><div class="modal-dialog modal-dialog-centered" role="document" style="visibility: inherit;top:0px"><div class="modal-content modalContent"><div class="modal-header modalHeader dispnone"><h5 class="modal-title">Feedback</h5><button type="button" class="close closebutton modalClose" data-dismiss="modal" aria-label="Close"><span class="modalCloseIcon"></span><span class="modalCloseIcon"></span></button></div><div class="modal-body modalBody"><div class="inCorrect" style="text-align:center"><div class="close_icon"></div></div><div class="status_feedbackmessage" style="text-align:center;margin-top:65px"></div><div class="status_feedbackContent" style="text-align:center;margin-top:15px">'+content+'</div></div><div class="modal-footer modalFooter"><button type="submit" class="modalBtn yesBtn closebutton" data-dismiss="modal">OK</button></div></div></div>';
  $("body").append(htmlString);
  $("#feedback_box").modal("show");
  $("#feedback_box .closebutton").click(function () {
    var $parent = $("#" + opts.widgetId);

    if (isCorrect) {
      $(this).find(".option").addClass('selected');
      $(this).find('input[type="checkbox"]').prop('checked', true);
      $parent.find('#option_mcq .option.selected ').addClass('bgcolor');
    } else {
      if (!attamptover) {
        //$parent.find(".option").removeClass('selected');
        //$parent.find('input[type="checkbox"]').prop('checked', false);
      }
    }
    if(window.tabingItems && window.tabingItems.length){
      
      window.tabingItems.each(function(i,v){
        $(v).attr('tabindex','0');
         if($(v).is('.mcqSubmitAnswer')){
          (function(okha){setTimeout(function(){
            $(window.tabingItems[okha]).focus();
          },50)})(i+1)
        }
      })
      $('.status_feedbackContent').attr('tabindex','-1');
      setTimeout(function(){
       // $('.mcqSubmitAnswer')[0].focus();
      },50)
    }
  });
}
    </script>

</mcq_widget_2>