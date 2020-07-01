(function() {
	var objXML;
    var globalDetails = new Object();
	globalDetails.totalPages = 0;
    globalDetails.currentPage = 0;
    globalDetails.pages = [];
    globalDetails.resumeCourse = 0;
    globalDetails.visitedArr = [];
    globalDetails.visitedPagesArr = [];
    globalDetails.exitType = "E7";
	globalDetails.assessmentStart = 0;
	globalDetails.assessmentStartPage = 0;
	globalDetails.isAssessment = 0;
	var pageDetails = new Object();
	this.init = function() {
        utils.showHideLoader(true);
		shell.parseTOC(toc,toc_setting);
    }
	
	this.parseTOC = function(toc,toc_setting) {
        objXML = toc;
        lms.init();
		$('#exitYes').on('click', exitYes);
        $('#exitNo').on('click', exitNo);
		globalDetails.passscore = toc_setting[0].passscore;
        globalDetails.shuffle = toc_setting[0].shuffle;
        globalDetails.result_screen = toc_setting[0].result_screen;
        globalDetails.accountType = toc_setting[0].accountType;
        globalDetails.isOneResultPage = toc_setting[0].isOneResultPage;
        globalDetails.visitedArr = [];
        globalDetails.visitedArr = lms.getVisitedArr();
		globalDetails.pageXML = objXML;
        globalDetails.totalPages = objXML.length;
		assessment.setPassScore(globalDetails.passscore);
		var exist = 0;
		var score = [];
		var assessmentPages = [];
		var questionTotalScore = [];
		var c = 0;

		var globalData = lms.getGlobalData();
		var finalsc = parseInt(globalData[0]);
		if(finalsc >= 0){
			assessment.setScore(finalsc);
		}
		globalDetails.exitType = globalData[1];
		if (globalDetails.exitType == "E8"){
			globalDetails.isAssessment = 1; 
			assessment.setAssessmentArr(globalData[2].split(','));
			assessment.setAssessmentCount(parseInt(globalData[3]));
			assessment.setStartPageNo(parseInt(globalData[4]));
			assessment.setAssessment(parseInt(globalData[5]));
		}
		for (var i = 0; i < globalDetails.totalPages; i++){
			if (i > 0){
				if (globalDetails.visitedArr[i] != "undefined" && globalDetails.visitedArr[i] != undefined){
					var temp = globalDetails.visitedArr[i].split("~");
					if (parseInt(temp[0]) == 1){
						exist = 1;
						globalDetails.pages[i] = 1;
					}
				}
			}
			if (exist == 0){
				globalDetails.pages[i] = -1;
			}
			exist = 0;
			if (globalDetails.pageXML[i].pageType == "assessment"){
				if (globalDetails.assessmentStartPage == 0){
					globalDetails.assessmentStartPage = i;
				}
				score.push(1);
				assessmentPages.push(i);
				if (globalDetails.pageXML[i].questScore != ""){
					questionTotalScore.push(parseFloat(globalDetails.pageXML[i].questScore));
				}
			}
		}
		globalDetails.resultpage = Math.max.apply(null, assessmentPages);
		if (score.length > 0){
			if(globalDetails.isOneResultPage == "false"){
				score.length = questionTotalScore.length;
			}
			assessment.setQuestionScore(questionTotalScore);
			assessment.setTotalQuestions(score.length);
		}
		if (lms.getBookmark() >= 0){
			globalDetails.currentPage = parseInt(lms.getBookmark());
			globalDetails.bookmarkNo = globalDetails.currentPage;
			if (assessment.getAssessment() == 2){
				if (assessment.getAssessment() == 2 && (globalDetails.currentPage > globalDetails.resultpage)){
					
				}else{
					assessment.start();
					globalDetails.currentPage = globalDetails.resultpage;
				}
			}else if(assessment.getAssessment() == 1){
				/* if (globalDetails.currentPage > globalDetails.assessmentStartPage && (globalDetails.currentPage < globalDetails.resultpage)){
					var assessmentPageIndex = assessmentPages.indexOf(globalDetails.currentPage);
					assessment.setAssessmentCount(parseInt(assessmentPageIndex));
				}else if(globalDetails.currentPage == globalDetails.assessmentStartPage){
					
				}else  */
				if(globalDetails.currentPage == globalDetails.resultpage){
					assessment.result();
					assessmentResultInit();
				}
			}
			showExitBlock();
		}else{
			globalDetails.currentPage = 0;
		}
		var pageIndex = globalDetails.currentPage;
		pageDetails.pageType = objXML[pageIndex].pageType;
		loadPage(toc[pageIndex].chap, toc[pageIndex].page, toc[pageIndex].chapIndex, toc[pageIndex].pageIndex);
		updateCurrentPageNumber(0);
		updateTotalNumberOfPages();
	}
	
	this.resetSettings = function(){
		$('#red_patch_wrong').hide();
		$('#green_patch_wrong').hide();
		assessment.hideProgress();
	}
	
	this.loadPageSettings =  function(index){
		shell.resetSettings();
		shell.setPageBookmark(index);
		var pageType = toc[index].pageType;
		shell.setPageType(pageType);
		if(pageDetails.pageType == "assessment"){
			if (globalDetails.bookmarkNo >= 0){
				if (globalDetails.currentPage != globalDetails.assessmentStartPage){
					assessment.createProgressDots();
					assessment.highlightDots();
				}
			}
			if (assessment.getAssessment() == 2){
				lms.setBookmark(shell.getAssessmentStartPage());
				if (parseInt(shell.getCurrentPage()) > (shell.getAssessmentStartPage() )){
					if (assessment.getResultPage() != 1){
						shell.enableBackButton();
						shell.enableNextButton();
						shell.disableNavButton();
					}
				}
				if (assessment.getAssessmentCount() == 1){
					shell.disableBackButton();
				}
			}else{
				if (parseInt(shell.getCurrentPage()) > globalDetails.assessmentStartPage && globalDetails.currentPage < globalDetails.resultpage){
					shell.disableNextButton();
					shell.disableBackButton();
					shell.disableNavButton();
					assessment.showProgress();
				}
			}
			if (assessment.getResultPage() == 1){
				shell.disableNextButton();
				shell.disableBackButton();
			}
		}else{
			assessment.setAssessment(0);
			shell.enableNextButton();
			shell.enableBackButton();
			shell.enableNavButton();
			shell.updatePageProgress();
		}
	}
	
	this.loadScormPageSettings = function(index){
		var pageType = toc[index].pageType;
		var pageIndex = toc[index].pageIndex;
		var totalAssessmentPage = assessment.getTotalQuestions() + 1;
		if(pageDetails.pageType == "assessment" && pageIndex == "0"){
			assessment.start();
			shell.disableNextButton();
		}else {
			// for one result page in assessment
			if(pageDetails.pageType == "assessment" && pageIndex == parseInt(totalAssessmentPage)){
				/* assessment.setAssessmentCount(assessment.getTotalQuestions()); */
				assessment.result();
				shell.enableNavButton();
				if(globalDetails.isOneResultPage == "false"){
					// fail page
					setTimeout(function(){
						failAssessmentResultInit();
					},300)
				}else{
					if(isHTML){
						htmlAssessmentResultInit();
					}else{
						assessmentResultInit();
					}
				}
			}else if(pageDetails.pageType == "assessment" && pageIndex == parseInt(totalAssessmentPage + 1)){
				// Success page
				/* assessment.setAssessmentCount(assessment.getTotalQuestions()); */
				assessment.result();
				shell.enableNavButton();
				setTimeout(function(){
					successAssessmentResultInit();
				},300);
				
			}
		}
	}

	var showExitBlock = function() {
        showHideExitPopup(true);
        $('#exitHeader').html('Resume');
        $('#exitText').html('Would you like resume where you left off?');
        utils.showHideLoader(false);
    }
	
	var showHideExitPopup = function(isShow) {
        if (isShow) {
            $('#exitBlock').show();
        } else {
            $('#exitBlock').hide();
        }
    }
	
	var resumeCourse = function() {
        utils.showHideLoader(true);
		var pageIndex = globalDetails.currentPage;
        loadPage(objXML[pageIndex].chap, objXML[pageIndex].page, objXML[pageIndex].chapIndex, objXML[pageIndex].pageIndex);
        showHideExitPopup(false);
		$('#countCurrentPage').html(pageIndex + 1)
    }
	
    var exitNo = function() {
		globalDetails.isAssessment = 0;
		assessment.setAssessment(globalDetails.isAssessment);
        globalDetails.resumeCourse = 0;
        globalDetails.currentPage = 0;
        globalDetails.bookmarkNo = 0;
        resumeCourse();
    }
	
    var exitYes = function() {
        globalDetails.resumeCourse = 1;
        resumeCourse();
    }
	
	this.setPageBookmark =  function(pageIndex){
		shell.setCurrentPage(pageIndex);
		lms.setBookmark();
		if(pageIndex == (globalDetails.totalPages - 1)){
			shell.setVisitedPages(shell.getCurrentPage(), 1, pageDetails.pageType);
			lms.markComplete();
		}
	}
	
	this.getAssessmentStartPage = function(){
		return globalDetails.assessmentStartPage;
	}
	
	this.getCurrentPage = function(){
		return globalDetails.currentPage.toString();
	}
	
	this.getPageFromToc = function(pageIndex){
		return globalDetails.pageXML[pageIndex];
	}
	
	this.enableBackButton = function(){
		$('#goToPrev').removeClass('disableNavBtns');
		$('#goToPrev').removeClass('disabledState');
	}
	
	this.disableBackButton = function(){
		$('#goToPrev').addClass('disableNavBtns');
		$('#goToPrev').addClass('disabledState');
	}
	
	this.enableNextButton = function(){
		$('#goToNext').removeClass('disableNavBtns');
	}
	
	this.disableNextButton = function(){
		$('#goToNext').addClass('disableNavBtns');	
	}
	
	this.enableNavButton = function(){
		$('#navbarSupportedContent, .navigation_menu_demo').removeClass('disableNavBtns');
	}
	
	this.disableNavButton = function(){
		$('#navbarSupportedContent, .navigation_menu_demo').addClass('disableNavBtns');	
	}
	
	this.setResetNavigation = function(){
		var currentPage = shell.getCurrentPage();
		if (parseInt(currentPage) > globalDetails.assessmentStartPage && globalDetails.currentPage < (globalDetails.resultpage - 1)){
            shell.disableNavButton();
        }else if ((parseInt(currentPage) > 0 && pageDetails.pageType != "assessment") || (parseInt(currentPage) == globalDetails.assessmentStartPage)){
			shell.enableBackButton();
		}else{
			shell.disableBackButton();
		}
	}
	
	this.movePrev = function(){
		if (globalDetails.currentPage > 0){
			utils.showHideLoader(true);	
			if (assessment.getAssessment() == 2){
				assessment.setAssessmentCountMinus();
				if(assessment.getAssessmentCount() >= 1){
					if (assessment.getAssessmentCount() <= assessment.getTotalQuestions()) {
						pageIndex = parseInt(assessment.getStartPageNo()) + parseInt(assessment.getAssessmentUniqueID()) + 1;
					}
					shell.setCurrentPage(pageIndex);
					var pageType = objXML[pageIndex].pageType;
					shell.setPageType(pageType);
					shell.enableBackButton();
					assessment.highlightDots();
					loadPage(objXML[pageIndex].chap, objXML[pageIndex].page, objXML[pageIndex].chapIndex, objXML[pageIndex].pageIndex);
					if(assessment.getAssessmentCount() == 1){
						shell.disableBackButton();
					}
				}else{
					shell.disableBackButton();
				}
				shell.disableNavButton();
			}
			if (assessment.getAssessment() == 0){
				shell.enableNextButton();
				shell.enableBackButton();
				shell.enableNavButton();
			}
		}
	}
	
	this.moveForward = function(val){
		/* if (assessment.getAssessment() > 0 && assessment.getAssessmentCount() <= assessment.getTotalQuestions()) {
            val = parseInt(assessment.getStartPageNo()) + parseInt(assessment.getAssessmentUniqueID()) + 1;
        } */
		if(assessment.getAssessment() == 1){
			assessment.setAssessmentCount();
		}
		if (assessment.getAssessment() > 0 && assessment.getAssessmentCount() <= assessment.getTotalQuestions() && assessment.getAssessmentCount() >= 1) {
            val = parseInt(assessment.getStartPageNo()) + assessment.getAssessmentUniqueID() + 1;
        }
		if(assessment.getAssessmentCount() > assessment.getTotalQuestions()){
			val = globalDetails.resultpage;
			var scoreper = assessment.getScorePercent();
			var tempValue = parseInt(scoreper.slice(0,-1));
			var passScore = parseInt(assessment.getPassScore());
			if(globalDetails.isOneResultPage == "false"){
				var failPageVal = val - 1;
				if(tempValue < passScore){
					val = failPageVal;
				}else{
					shell.setVisitedPages(parseInt(failPageVal), 1, "assessment");
				}
			}
		}
		if(assessment.getAssessmentCount() >= 1){
			assessment.highlightDots();
		}

		shell.setCurrentPage(val);
		var pageType = objXML[val].pageType;
		shell.setPageType(pageType);
		loadPage(objXML[val].chap, objXML[val].page, objXML[val].chapIndex, objXML[val].pageIndex);
		updateCurrentPageNumber(val);
		//shell.moveNext();
	}
	
	
	
	this.moveNext = function(){
		if(globalDetails.currentPage < (globalDetails.totalPages) ){
			utils.showHideLoader(true);
			if (assessment.getAssessment() == 2){
				assessment.setAssessmentCount();
				if (assessment.getAssessmentCount() <= assessment.getTotalQuestions()){
					if (assessment.getAssessmentCount() == assessment.getTotalQuestions()){
						globalDetails.currentPage = globalDetails.assessmentStartPage + (assessment.getTotalQuestions() + 1);
						pageIndex = globalDetails.currentPage;
					}
				}
				if(assessment.getAssessmentCount() >= 1){
					if (assessment.getAssessmentCount() <= assessment.getTotalQuestions()) {
						pageIndex = parseInt(assessment.getStartPageNo()) + parseInt(assessment.getAssessmentUniqueID()) + 1;
					}
					if((assessment.getAssessmentCount() > assessment.getTotalQuestions()) && (parseInt(shell.getCurrentPage()) != globalDetails.resultpage)){
						pageIndex = globalDetails.resultpage;
					}
					
					shell.enableBackButton();
					shell.setCurrentPage(pageIndex);
					var pageType = objXML[pageIndex].pageType;
					shell.setPageType(pageType);
				}else{
					shell.disableBackButton();
				}
				assessment.highlightDots();
				loadPage(objXML[pageIndex].chap, objXML[pageIndex].page, objXML[pageIndex].chapIndex, objXML[pageIndex].pageIndex);
			}
			shell.updatePageProgress();
		}
	}
	
	this.updatePageProgress = function(){
		if (globalDetails.currentPage < globalDetails.pages.length){
			globalDetails.pages[parseInt(shell.getCurrentPage())] = 1;		
		}
		if (pageDetails.pageType != "assessment" && parseInt(shell.getCurrentPage()) >  0){
			shell.setVisitedPages(parseInt(shell.getCurrentPage()), 1, pageDetails.pageType);	
		}
	}

	this.setVisitedPages = function(pgno, val, type){
		lms.setVisitedPages(pgno, val, type);	
		globalDetails.visitedArr = [];
		globalDetails.visitedArr = lms.getVisitedArr();
	}
	this.sendPctValueToProgressBar = function(){
		//console.log('total pages are : ',shell.getPagesArray(),globalDetails.currentPage);
		// Chandan - IE Fix
		var totalPages = globalDetails.totalPages;
		var getCurrentPge = globalDetails.currentPage;
		(shell.getPagesArray())[getCurrentPge] = 1*1;
		var updatedPagesArray = shell.getPagesArray();
		//let totalVisitedPageLength = updatedPagesArray.filter(element=>(element == 1)).length;
		
		var totalVisitedPageLength = updatedPagesArray.filter(function(element){(element == 1)}).length;
		var totalPctProgressBar = Math.floor((totalVisitedPageLength*100)/totalPages);
		// Chandan -IE fix ends here
		//debugger
		return totalPctProgressBar;
	}
	
	this.getPagesArray = function(){
		return globalDetails.pages;
	}
	
	this.getInteraction = function(val){
		var temp = globalDetails.visitedArr[(shell.getCurrentPage())].split("~");
		return ({studentResponse:temp[3], result:temp[2]});
	}
	
	this.resetAssessmentVisitedPages = function(){
		var temp = globalDetails.visitedArr;
		var temp2 = [];
		for (var i = shell.getAssessmentStartPage()+1;  i <= assessment.getTotalQuestions(); i++){
			globalDetails.visitedArr[i] = '';
		}
		lms.setVisitedArr(globalDetails.visitedArr);
	}
	
	this.getPageVisitedState = function(pageno){
		return globalDetails.pages[pageno];
	}
	
	this.getPageStatus = function(pgno){
		var qdata = parseInt(globalDetails.visitedArr[pgno]);
		if (qdata == 1){
			return 1;
		}
		return 0;
	}
	
	this.getPageType = function(){
		return pageDetails.pageType;
	}
	
	this.setPageType = function(val){
		pageDetails.pageType = val;
	}
	
	this.setCurrentPage = function(val){
		globalDetails.currentPage = val;
	}
	
	this.getPassScore = function(){
		return globalDetails.passscore;
	}
	
	this.getShuffle = function(){
		return globalDetails.shuffle;
	}

	this.getResultScreen = function(){
		return globalDetails.result_screen;
	}

	this.unloadCourse = function(){
		if (assessment.getPassed() == 1){
			shell.resetAssessmentVisitedPages();
		}
	}
	
	this.exitCourse = function(){
		top.close();
	}
}).apply(shell);

$(document).off("click","#assessmentStartButton,.assessmentStartButton").on("click","#assessmentStartButton,.assessmentStartButton",function(){
	assessment.setAssessment(1);
	assessment.resetScore(0);
	assessment.startAssessment();
	assessment.setStartAssessment(0);
});

$(document).off("click","#assessmentReattemptButton,.assessmentReattemptButton").on("click","#assessmentReattemptButton,.assessmentReattemptButton",function(){
	if (!$(this).hasClass('disabled')){
		assessment.setAssessment(1);
		assessment.resetScore(0);
		assessment.reAttempt();
	}
});

$(document).off("click","#assessmentReviewButton,.assessmentReviewButton").on("click","#assessmentReviewButton,.assessmentReviewButton",function(){
	if (!$(this).hasClass('disabled')){
		assessment.setAssessment(2);
		assessment.review();
	}
});

function assessmentResultInit() {
	$('.reattempt_btn ,.review_btn').addClass('disabled');
	var scoreper = assessment.getScorePercent();
	$('.assessment_score').attr("data-content",scoreper);   
	var tempValue = parseInt(scoreper.slice(0,-1));
	if(shell.getResultScreen() == "normal"){
		if(tempValue >= assessment.getPassScore()){
			$('.assessment_result_msg').attr("data-content","correct");
			$('.assessment_fail_msg').css("display","none");
			$('#assessmentReviewButton, .review_btn').removeClass('disabled');
		} else{
			$('.assessment_result_msg').attr("data-content","incorrect");
			$('.assessment_pass_msg').css("display","none");
			$('#assessmentReattemptButton, .reattempt_btn').removeClass('disabled');
		}
	}
	if(shell.getResultScreen() == "reattempt_only"){
		if(tempValue >= assessment.getPassScore()){
			$('.assessment_result_msg').attr("data-content","correct");
			$('.assessment_fail_msg').css("display","none");
		} else{
			$('.assessment_result_msg').attr("data-content","incorrect");
			$('.assessment_pass_msg').css("display","none");
		}
		$('#assessmentReattemptButton, .reattempt_btn').removeClass('disabled');
	}
	if(shell.getResultScreen() == "review_only"){
		if(tempValue >= assessment.getPassScore()){
			$('.assessment_result_msg').attr("data-content","correct");
			$('.assessment_fail_msg').css("display","none");
		} else{
			$('.assessment_result_msg').attr("data-content","incorrect");
			$('.assessment_pass_msg').css("display","none");
		}
		$('#assessmentReviewButton, .review_btn').removeClass('disabled');
	}
	if(shell.getResultScreen() == "no_assessment_btns"){
		if(tempValue >= assessment.getPassScore()){
			$('.assessment_result_msg').attr("data-content","correct");
			$('.assessment_fail_msg').css("display","none");
		} else{
			$('.assessment_result_msg').attr("data-content","incorrect");
			$('.assessment_pass_msg').css("display","none");
		}
	}
}

function htmlAssessmentResultInit() {
	$('.reattempt_btn ,.review_btn').addClass('disabled');
	var scoreper = assessment.getScorePercent();
	var assessmentResultMsg = $('.assessment_result_msg .text-widget p').text();
	assessmentResultMsg = assessmentResultMsg.split("/");
	var assessmentScore = $('.assessment_score .text-widget p').text();  
	assessmentScore =  assessmentScore.split(/\b(\s)/).filter( function(e) { return e.trim().length > 0; } );
	assessmentScore.pop();
	assessmentScore.push(scoreper); 
	$('.assessment_score').attr("data-content",scoreper);
	$('.assessment_score .text-widget p strong').html("<span style='color:#ffffff;' tabindex='0' draggable='false'>"+assessmentScore.join(" ")+"</span>");    
	var tempValue = parseInt(scoreper.slice(0,-1));

	if(shell.getResultScreen() == "normal"){
		if(tempValue >= assessment.getPassScore()){
			$('.assessment_result_msg').attr("data-content","correct");
			$('.assessment_result_msg .text-widget p span > b').html(assessmentResultMsg[0]);
			$('.assessment_fail_msg').css("display","none");
			$('#assessmentReviewButton, .review_btn').removeClass('disabled');
		} else{
			$('.assessment_result_msg').attr("data-content","incorrect");
			$('.assessment_result_msg .text-widget p span > b').html(assessmentResultMsg[1]);
			$('.assessment_pass_msg').css("display","none");
			$('#assessmentReattemptButton, .reattempt_btn').removeClass('disabled');
		}
	}
	if(shell.getResultScreen() == "reattempt_only"){
		if(tempValue >= assessment.getPassScore()){
			$('.assessment_result_msg').attr("data-content","correct");
			$('.assessment_result_msg .text-widget p span > b').html(assessmentResultMsg[0]);
			$('.assessment_fail_msg').css("display","none");
		} else{
			$('.assessment_result_msg').attr("data-content","incorrect");
			$('.assessment_result_msg .text-widget p span > b').html(assessmentResultMsg[1]);
			$('.assessment_pass_msg').css("display","none");
		}
		$('#assessmentReattemptButton, .reattempt_btn').removeClass('disabled');
	}
	if(shell.getResultScreen() == "review_only"){
		if(tempValue >= assessment.getPassScore()){
			$('.assessment_result_msg').attr("data-content","correct");
			$('.assessment_result_msg .text-widget p span > b').html(assessmentResultMsg[0]);
			$('.assessment_fail_msg').css("display","none");
		} else{
			$('.assessment_result_msg').attr("data-content","incorrect");
			$('.assessment_result_msg .text-widget p span > b').html(assessmentResultMsg[1]);
			$('.assessment_pass_msg').css("display","none");
		}
		$('#assessmentReviewButton, .review_btn').removeClass('disabled');
	}
	if(shell.getResultScreen() == "no_assessment_btns"){
		if(tempValue >= assessment.getPassScore()){
			$('.assessment_result_msg').attr("data-content","correct");
			$('.assessment_result_msg .text-widget p span > b').html(assessmentResultMsg[0]);
			$('.assessment_fail_msg').css("display","none");
		} else{
			$('.assessment_result_msg').attr("data-content","incorrect");
			$('.assessment_result_msg .text-widget p span > b').html(assessmentResultMsg[1]);
			$('.assessment_pass_msg').css("display","none");
		}
	}
}

function failAssessmentResultInit(){
	var scoreper = assessment.getScorePercent();
	var assessmentScore = $('.assessment_score .text-widget p').eq(0).text();
	assessmentScore =  assessmentScore.split(/\b(\s)/).filter( function(e) { return e.trim().length > 0; } );
	assessmentScore.pop();
	assessmentScore.push(scoreper); 
	$('.assessment_score').attr("data-content",scoreper);
	$('.assessment_score .text-widget p strong').html("<span style='font-family:Futura_Md_BT_Bold;' tabindex='0' draggable='false'>"+assessmentScore.join(" ")+"</span>");    
}

function successAssessmentResultInit(){
	var scoreper = assessment.getScorePercent();
	var assessmentScore = $('.assessment_score .text-widget h6 > span').eq(2).text();
	assessmentScore =  assessmentScore.split(/\b(\s)/).filter( function(e) { return e.trim().length > 0; } );
	assessmentScore.pop();
	assessmentScore.push(scoreper); 
	$('.assessment_score').attr("data-content",scoreper);
	$('.assessment_score .text-widget h6 > span').eq(2).html("<span style='font-family:Futura_Md_BT_Bold;' tabindex='0' draggable='false'>"+assessmentScore.join(" ")+"</span>");    
}