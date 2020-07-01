// JavaScript Document

var lms = {};

(function(){
	var startTimeStamp = null;
	var visitedPages = [];
	var assessmentPages = [];
	var scoData;
	var pagesplitId = '^';
	var assessSplitId = "+";
	var itemsplitId = "~";
	var globalData = [];
	//
	var setCommit = function(){
		scoData.commit();
	}
	var setStatus = function (status){
		try{
			scoData.setValue("lessonStatus", status);
			setCommit();
			
		}catch(e){}
	}
	var getStatus = function (status){
		try{
			return scoData.getValue("lessonStatus");
		}catch(e){}
	}
	this.setBookmark = function (pgid){
		try{
			if (pgid != undefined ){
				scoData.setValue("lessonLocation", pgid);
			}else{
				scoData.setValue("lessonLocation", shell.getCurrentPage());
			}
			setCommit();
		}catch(e){}
	}
	this.setScore = function(score){
		try{
			scoData.setValue("score", score);
			setCommit();
		}catch(e){}
	}
	this.getScore = function(score){
		try{
			return scoData.getValue("score");
		}catch(e){}
	}
	var setSuspendData = function(suspendstring){
		try{
			scoData.setValue("suspendData", suspendstring);
			setCommit();
		}catch(e){}
	}
	var getSuspendData = function(){
		return scoData.getValue("suspendData");
	}
	var makeSuspendData = function (val){
		//
		var suspendstring = '';
		var totalVisitedPages = visitedPages.length;
		for(var i = 0; i < totalVisitedPages;i++){
			if(i == totalVisitedPages - 1){
				suspendstring = suspendstring + visitedPages[i];
			} else {
				suspendstring = suspendstring + visitedPages[i] + pagesplitId;
			}
		}
		if (totalVisitedPages <= 0){
			suspendstring = ' ';
		}
		//utils.debug("set suspendstring "+suspendstring);
		try{
			setSuspendData(suspendstring);
		}catch(e){
		}
	}
	this.setInteraction = function(id, questionText, objectiveId, questionType, learnerResponse, correctAnswer, wasCorrect){
		try{
			//question id must be the first item set
			scoData.setInteractionData(id, questionText, objectiveId, questionType, learnerResponse, correctAnswer, wasCorrect);
			setCommit();
		}catch(e){}
	}
	this.getInteraction = function(assessmentID){
		try{
			return scoData.getInteractionData(assessmentID - 1);
		}catch(e){}
	}
	//
	this.init = function(){
		try{
			startTimeStamp = new Date();
			//
			scoData = new SCOData();
			scoData.initialize();
			var suspendstring = getSuspendData();
			if(suspendstring != '' && suspendstring != ' '){
				var suspenddata = suspendstring.split(pagesplitId); 
				//utils.debug(suspenddata[0]+);
				lms.setGlobalData(suspenddata[0].split(itemsplitId));
				//
				var arr1 = suspenddata;
				visitedPages = [];
				for(var i=0; i < arr1.length; i++){
					visitedPages.push(arr1[i]);
				}
			}
			//
			if(getStatus() != "completed"){
				setStatus("incomplete");
			}
			//utils.debug("LMS Init visitedPages " +visitedPages+" =suspendstring= "+suspendstring+" lms.getGlobalData "+lms.getGlobalData());
		}catch(e){}
	}
	this.setGlobalData = function(val){
		globalData = val;
	}
	this.getGlobalData = function(){
		return globalData;
	}
	this.markComplete = function(){
		setStatus("completed");
	}
	this.setVisitedArr = function(arr){
		visitedPages = arr;	
	}
	this.getVisitedArr = function(){
		/*if (visitedPages.length > 0 && assessmentPages.length > 0){
			return visitedPages.concat(assessmentPages);
		}else if (visitedPages.length >  0){
			return visitedPages;
		}*/
		if (visitedPages.length >  0){
			return visitedPages;
		}
		return false;
	}
	this.setVisitedPages = function(pageNo, val, type){
		visitedPages[pageNo] = val;
		makeSuspendData(type);
	}
	this.getBookmark = function(){
		try{
			var bookmark = scoData.getValue("lessonLocation");//alert(bookmark);
			if (bookmark != null && bookmark.length > 0 ) {
				utils.debug('return bookmark from lms = '+bookmark)
				return parseInt(bookmark);
			}else{
				return -1;
			}
		}catch(e){}
	}
	this.unloadCourse = function(){
		shell.unloadCourse();
		//record the session time
		var endTimeStamp = new Date();
		var totalseconds = ((endTimeStamp.getTime() - startTimeStamp.getTime()) / 1000);
		try{
		}catch(e){}
		
		setCommit();
		//scoData.finish();
	}
}).apply(lms);