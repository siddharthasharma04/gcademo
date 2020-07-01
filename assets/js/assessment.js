var assessment = {};
(function() {
    var isAssessment = 0;
    var assessmentCount = 0;
    var totalScore = 0;
    var passScorePercent = 0;
    var passScore = 0;
    var totalQuestions = 0;
    var questionScore = [];
    var zerovalueQuestions = [];
    var isStartAssessment = 0;
    var isResultPage = 0;
    var isStartPage = 0;
    var isPassed = 0;
    var assessmentArr = [];
    var startPageNo = -1;

    this.init = function() {}

    this.assessmentBookmark = function() {
        if (assessment.getStartPage() != 1 && assessment.getResultPage() != 1) {
            if (assessment.getAssessment() == 1) {
                shell.disableNextButton();
                shell.disableBackButton();
            }
			assessment.createProgressDots();
            assessment.highlightDots();
        }
    }

    this.generateUniqueNumber = function() {
        assessmentArr = [];
        if (shell.getShuffle() == 1) {
            while (assessmentArr.length < assessment.getTotalQuestions()) {
                var num = utils.randomNumber(0, (assessment.getTotalQuestions() - 1));
                var num1 = assessmentArr;
                while (utils.searchNum(num, num1) != -1) {
                    num = utils.randomNumber(0, (assessment.getTotalQuestions() - 1));
                }
                if (utils.searchNum(num, num1) == -1) {
                    assessmentArr.push(num);
                }
            }
        } else {
            var count = 0;
            while (assessmentArr.length < assessment.getTotalQuestions()) {
                assessmentArr.push(count);
                count++;
            }
        }
        console.log(assessmentArr);
    }

    this.getAssessmentArr = function(val) {
        return assessmentArr;
    }

    this.setAssessmentArr = function(val) {
        assessmentArr = [];
        assessmentArr = val;
    }

    this.getAssessmentUniqueID = function() {
        if (assessment.getAssessmentCount() >= 1 && (assessment.getAssessmentCount() - 1) < assessment.getTotalQuestions()) {
            assessment.assessmentBookmark();
        }
        var ctr = assessment.getAssessmentCount() - 1;
        firstPageVal = assessment.getScore();
        shell.setVisitedPages(0, firstPageVal + "~E8~" + assessmentArr + "~" + assessment.getAssessmentCount() + "~" + assessment.getStartPageNo() + "~" + assessment.getAssessment(), "global");
        var id = parseInt(assessmentArr[ctr]);
        if (id == "undefined" || id == undefined) {
            id = -1;
        }
        return (id);
    }

    var extractQuestion = function() {
        var num = getUniqueNumber();
    }

    this.setAssessmentCount = function(val) {
        if (val != "undefined" && val != undefined) {
            assessmentCount = val;
        } else {
            assessmentCount++;
        }
    }

    this.setAssessmentCountMinus = function(val) {
        if (val != "undefined" && val != undefined) {
            assessmentCount = val;
        } else {
            assessmentCount--;
        }
    }

    this.getAssessmentCount = function() {
        return assessmentCount;
    }

    this.setStartAssessment = function(val) {
        isStartAssessment = val;
    }

    this.getStartAssessment = function() {
        return isStartAssessment;
    }

    this.setStartPageNo = function(val) {
        startPageNo = val;
    }

    this.getStartPageNo = function() {
        return startPageNo;
    }

    this.setAssessment = function(val) {
        isAssessment = val;
    }

    this.getAssessment = function() {
        return isAssessment;
    }

    this.setQuestionScore = function(val) {
        questionScore = val;
    }

    this.getQuestionScore = function() {
        return questionScore;
    }

    this.setTotalQuestions = function(val) {
        totalQuestions = val;
    }

    this.getTotalQuestions = function() {
        return totalQuestions;
    }

    this.reduceQuestScoreVal = function(questID) {
        var questionVal = toc[questID].questScore;
        zerovalueQuestions.push(questionVal);
    }

    this.setNoValQuestScore = function() {
        zerovalueQuestions.length = 0;
        zerovalueQuestions = [];
    }

    this.setScore = function(val) {
        if (val != "undefined" && val != undefined) {
            var getPageScore = shell.getPageFromToc(val);
			getPageScore = parseFloat(getPageScore.questScore);
            totalScore += getPageScore;
        } else {
            totalScore += 1;
        }
    }

    this.startAssessment = function() {
        utils.showHideLoader(true);
        assessment.generateUniqueNumber();
        assessment.setNoValQuestScore();
        assessment.setStartPage(0);
        assessment.setAssessment(1);
        assessment.setStartPageNo(parseInt(shell.getCurrentPage()));
        assessment.setAssessmentCount(0);
        shell.setVisitedPages(parseInt(shell.getCurrentPage()), 1, "assessment");
        shell.setVisitedPages(0, assessment.getScore() + "~E8~" + assessmentArr + "~" + assessment.getAssessmentCount() + "~" + assessment.getStartPageNo() + "~" + assessment.getAssessment(), "global");
        var pageIndex = parseInt(shell.getCurrentPage()) + 1;
        shell.moveForward(pageIndex);
        shell.disableNextButton();
        shell.disableBackButton();
    }

    this.setInteraction = function(pageNo, questionType, learnerResponse, correctAnswer, wasCorrect, learnerResponseData) {
        if (assessment.getAssessment() != 2) {
            utils.showHideLoader(true);
            if (wasCorrect == true && wasCorrect != "NA") {
                var cor = "1";
            } else if (wasCorrect == false && wasCorrect != "NA") {
                var cor = "0";
            } else {
                var cor = "NA";
            }
            shell.setVisitedPages(pageNo, "1~" + assessment.getAssessmentCount() + "~" + cor + "~" + learnerResponseData, "assessment"); //
            lms.setInteraction(pageNo, assessment.getAssessmentCount(), questionType, learnerResponse.toString(), correctAnswer.toString(), wasCorrect);
            shell.setVisitedPages(0, assessment.getScore() + "~E8~" + assessmentArr + "~" + assessment.getAssessmentCount() + "~" + assessment.getStartPageNo() + "~" + assessment.getAssessment(), "global");
        }
    }

    this.getInteraction = function() {
        var pgno = parseInt(shell.getCurrentPage());
        return shell.getInteraction(pgno);
    }

    this.highlightDots = function() {
        assessment.highlightVisitedDot(assessmentCount - 1);
        assessment.highlightCurrentDot(assessmentCount);
    }

    this.highlightVisitedDot = function(val) {
        assessment.resetDots();
        for (var i = 1; i <= val; i++) {
            $('#assessmentProgressDot_' + i).removeClass("assessmentProgressDotCurrent").removeClass("assessmentProgressDotVisited").addClass('assessmentProgressDotVisited');
        }
    }

    this.resetDots = function() {
        for (var i = 1; i <= totalQuestions; i++) {
            $('#assessmentProgressDot_' + i).removeClass('assessmentProgressDotCurrent');
            $('#assessmentProgressDot_' + i).removeClass('assessmentProgressDotVisited');
        }
    }

    this.highlightCurrentDot = function(val) {
        $('#assessmentProgressDot_' + val).addClass('assessmentProgressDotCurrent');
    }

    this.getScore = function() {
        return totalScore;
    }

    this.getScorePercent = function() {
        passScore = 0;
        noValQuestionScore = 0;
        for (var i = 0; i < totalQuestions; i++) {
            passScore += parseFloat(questionScore[i]);
        }
        if (zerovalueQuestions.length != 0) {
            for (var j = 0; j < zerovalueQuestions.length; j++) {
                noValQuestionScore += parseFloat(zerovalueQuestions[j]);
            }
            passScore = passScore - noValQuestionScore;
        }

        var per = parseInt((parseFloat(assessment.getScore()) * 100) / passScore);
        if (totalQuestions <= 0 || isNaN(per)) {
            var per = lms.getScore();
        }
        var pgno = parseInt(shell.getCurrentPage());
        lms.setScore(per);
        if (per >= assessment.getPassScore()) {
            assessment.setPassed(1);
        } else {
            shell.disableNextButton();
            assessment.setPassed(0);
        }
        return per + "%";
    }

    this.setPassed = function(val) {
        isPassed = val;
    }

    this.getPassed = function(val) {
        return isPassed;
    }

    this.resetScore = function() {
        totalScore = 0;
    }

    this.setPassScore = function(val) {
        passScorePercent = val;
    }

    this.hideProgress = function() {
        $('#assessmentProgressBar').hide();
    }

    this.showProgress = function() {
        //$('#assessmentProgressBar').show();
    }

    this.removeProgress = function() {
        $('#assessmentProgressDots').empty();
        $('#assessmentProgressDots').attr('data-created', "0");
    }

    this.resetProgress = function() {
        assessmentCount = 0;
        for (var i = 1; i <= totalQuestions; i++) {
            $('#assessmentProgressDot_' + i).removeClass('assessmentProgressDotCurrent');
            $('#assessmentProgressDot_' + i).removeClass('assessmentProgressDotVisited');
        }
    }

    this.getPassScore = function() {
        return passScorePercent;
    }

    this.createProgressDots = function(val) {
        if ($('#assessmentProgressDots').attr("data-created") == "0") {
            assessment.showProgress();
            $('#assessmentProgressDots').attr('data-created', "1");
            for (var i = 1; i <= totalQuestions; i++) {
                $('#assessmentProgressDots').append("<div id='assessmentProgressDot_" + i + "' class='assessmentProgressDot'></div>");
            }
        }
    }

    this.reAttempt = function() {
        utils.showHideLoader(true);
        assessment.setResultPage(0);
        assessment.setAssessment(1);
        shell.disableNextButton();
        assessment.removeProgress();
        assessment.setPassed(0);
        shell.resetAssessmentVisitedPages();
        assessment.resetProgress();
/*         assessment.setAssessmentCount(0); */
        shell.moveForward(shell.getAssessmentStartPage());
    }

    this.review = function() {
        utils.showHideLoader(true);
        assessment.resetProgress();
        assessment.setAssessment(2);
        assessment.setResultPage(0);
        var pageindex = parseInt(shell.getCurrentPage()) - assessment.getTotalQuestions();
        assessment.setAssessmentCount(1);
        shell.setVisitedPages(0, assessment.getScore() + "~E8~" + assessment.getAssessmentArr() + "~" + assessment.getAssessmentCount() + "~" + assessment.getStartPageNo() + "~" + assessment.getAssessment(), "global");
        shell.moveForward(pageindex);
        shell.disableBackButton();
    }

    this.acknowledgement = function() {
        shell.disableNextButton();
        assessment.setResultPage(0);
        assessment.setAssessment(0);
        shell.enableBackButton();
        shell.setVisitedPages(parseInt(shell.getAssessmentStartPage() + assessment.getTotalQuestions()), 1, "assessment");
        shell.updatePageProgress();
    }

    this.start = function() {
        assessment.hideProgress();
        assessment.setAssessment(1);
        assessment.setStartPage(1);
        assessment.setResultPage(0);
        assessment.setStartPageNo(parseInt(shell.getCurrentPage()));
        assessment.setAssessmentCount(0);
        shell.disableNextButton();
        shell.enableBackButton();
        shell.setVisitedPages(0, assessment.getScore() + "~E8~" + assessment.getAssessmentArr() + "~" + assessment.getAssessmentCount() + "~" + assessment.getStartPageNo() + "~" + assessment.getAssessment(), "global");
        assessment.removeProgress();
    }

    this.result = function() {
        assessment.setResultPage(1);
        assessment.hideProgress();
        shell.disableBackButton();
        shell.disableNextButton();
    }

    this.setStartPage = function(val) {
        isStartPage = val;
    }

    this.getStartPage = function() {
        return isStartPage;
    }

    this.setResultPage = function(val) {
        isResultPage = val;
    }

    this.getResultPage = function() {
        return isResultPage;
    }
}).apply(assessment);