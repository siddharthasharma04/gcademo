// JavaScript Document
// chandan -IE Fix
$(window).on('beforeunload', function(e) {
	return "Make sure you have compvared the course.";
});
$(window).on('load', function(e) {
    if (typeof(isScorm) != undefined && isScorm == true ) {
        // debugger
        shell.init();
    }
	$(document).on("contextmenu", utils.disableRightClick);
	$(document).on("select", utils.lockoutmouseevents);
});
// chandan -IE Fix Ends here

function loadPage(cname, pname, cindex, pindex,chapterId,pageId) {
    toc.find(function(item, index) {
        pageIndex = index;
        return (item['chap'] == cname && item['page'] == pname);
    })
    
	// chandan -IE Fix
	//cname = `${cname.split(' ').join('-')}`
    //pname = `${pname.split(' ').join('-')}.html`
    //relativeUrl = `./${cname}/${pname}`
	
	cname = "".concat(cname.split(' ').join('-'));
	pname = "".concat(pname.split(' ').join('-'), ".html");
	relativeUrl = "./".concat(cname, "/").concat(pname);
	// chandan -IE Fix ends here 
	
    if (isScorm == true) {
        // debugger
        shell.loadPageSettings(pageIndex);
    }
    $.ajax({
		// chandan -IE Fix
        //url: `${relativeUrl}`
        url: relativeUrl,
		// chandan -IE Fix ends here 
    }).done(function(html) {
        $("#courseContainer").html(html);
        mountWidgetsByIndices(pindex, cindex);
        handleParallax(pindex, cindex);
        if ($courseJson.layout === "fixed") {
            $(".package_container").addClass("fixed")
                .css({
				// chandan -IE Fix
                    //"width": `${$courseJson.fixed_width}px`,
                    //"height": `${$courseJson.fixed_height}px`
					"width": $courseJson.fixed_width+"px",
                    "height": $courseJson.fixed_height+"px"
				// chandan -IE Fix ends here 
                });
        }
        applyGlobalSettings('Package');
        if ($courseJson.globalSettings.image_type == 'parallax') {
            globalHandleParallaxPackage();
        }
        // debugger
        if (isScorm == true) {
            // debugger
            var valueForScormProgressBar = shell.sendPctValueToProgressBar();
            progressBarHandler.updateProgressBarPct(true,valueForScormProgressBar);
            
        }else {
          progressBarHandler.setVisitedPage(chapterId,pageId);
        }

        if(document.querySelectorAll('.current-progress-stat-background').length){
          // debugger
        }
        //progressBarHandler.setVisitedPage(chapterId,pageId);

        setIsVisitedPage(chapterId,pageId);
        setIsVisitedChapter();
        var checkNavigation = $("body").has('navigation_menu');
        // commented by chandan
        if(checkNavigation.length >= 1){
            $(".mainmenu").css("display","none");
            $(".menu-area").css("height","0px");
        }else{
            $(".mainmenu").css("display","flex");
            $(".menu-area").css("height","40px");
        }
        shell.loadScormPageSettings(pageIndex);
        //$('.package_page').focus(); 
    });
  
}
var progressBarHandler = (function(){
    var isvisitedArr=[];
    var setVisitPage = function(cindex,pindex){
        // debugger
	   // chandan -IE Fix
      var chapterId = cindex;
      var pagId = pindex;
      $courseJson.index[0].pages[0].isVisited = true;
	  
      // $courseJson.index.forEach(element=>{
          // if(element.id == chapterId){
              // element.pages.forEach(ele=>{
                  // if(ele.id == pagId){
                      // ele.isVisited = true;
                  // }
              // });
          // }
      // })
	  
	  $courseJson.index.forEach(function(element){
          if(element.id == chapterId){
              element.pages.forEach(function(ele){
                  if(ele.id == pagId){
                      ele.isVisited = true;
                  }
              });
          }
      })
	  // chandan -IE Fix ends here
      updateProgressBar();
    }
    var findTotalVisitedPage = function(){
        // debugger
		// chandan -IE Fix
      var totalvisitedPage = 0;
	  
      // $courseJson.index.forEach(element=>{
          // element.pages.forEach(ele=>{
              // if(ele.isVisited == true){
                  // totalvisitedPage++;
              // }
          // });
      // });
	  $courseJson.index.forEach(function(element){
          element.pages.forEach(function(ele){
              if(ele.isVisited == true){
                  totalvisitedPage++;
              }
          });
      });
	  // chandan -IE Fix ends here
      return totalvisitedPage;
    }
    var findProgressPctValue = function(){
      // debugger
	  // chandan -IE Fix
      var totalPage = getTotalPage();
      var totalVistPage = findTotalVisitedPage();
      var totalProgressPct = Math.floor(((totalVistPage*100)/totalPage));
	  // chandan -IE Fix ends here
      return totalProgressPct;
    }
    var getTotalPage = function(){
	// chandan -IE Fix
      var totalCoursePage = 0;
      // $courseJson.index.forEach(element=>{
          // element.pages.forEach(ele=>{
              // totalCoursePage++;
          // });
      // });
	  $courseJson.index.forEach(function(element){
          element.pages.forEach(function(ele){
              totalCoursePage++;
          });
      });
	  
	  // chandan -IE Fix ends here
      return totalCoursePage;
  
    }
    
    var updateProgressBar = function(isScorm,value){
        // debugger
        var totalProgressPctValue = 0;
        isScorm ? (totalProgressPctValue = value) : (totalProgressPctValue = findProgressPctValue());
        if(document.querySelectorAll('.current-progress-stat-background').length){
			// chandan -IE Fix
			//document.getElementsByClassName('current-progress-stat-background')[0].style.width = `${totalProgressPctValue}%`
			//document.getElementsByClassName('current-progress-stat-pct-value')[0].innerText =`${totalProgressPctValue}%`
			
			document.getElementsByClassName('current-progress-stat-background')[0].style.width = "".concat(totalProgressPctValue, "%");
			document.getElementsByClassName('current-progress-stat-pct-value')[0].innerText = "".concat(totalProgressPctValue, "%");
			// chandan -IE Fix ends here

        }
    }
    return {
        setVisitedPage : setVisitPage,
        updateProgressBarPct : updateProgressBar
    }
  })();

function handleParallax(pindex, cindex) {
    var curPage = $courseJson.index[cindex].pages[pindex]
    if (curPage.bgType === "image" && curPage.bgProperty.type === 'parallax') {
        $('.package_container').css('background', 'none');
        $(".parallax-mirror").show();
        $('.package_container').parallax({ imageSrc: curPage.bgProperty.src });
    } else {
        $(".parallax-mirror").hide();
    }
}

// Package and Scorm Parallex
function globalHandleParallaxPackage() {
    if (typeof isScormPackage !== "undefined" && isScormPackage === true) {
        if ($courseJson.globalSettings.bg_effect == "Image" && $courseJson.globalSettings.image_type == 'parallax') {
            $('.package_container').css('background', 'none');
            $(".parallax-mirror").show();
			// chandan -IE Fix
			//$('.package_container').parallax({ imageSrc: `.${$courseJson.globalSettings.filePath}` });
			
			$('.package_container').parallax({ imageSrc: $courseJson.globalSettings.filePath });
			// chandan -IE Fix ends here
            
        } else {
            $(".parallax-mirror").hide();
        }
    } else {
        if ($courseJson.globalSettings.bg_effect == "Image" && $courseJson.globalSettings.image_type == 'parallax') {
            $('.package_container').css('background', 'none');
            $(".parallax-mirror").show();
            $('.package_container').parallax({ imageSrc: $courseJson.globalSettings.filePath });
        } else {
            $(".parallax-mirror").hide();
        }
    }
}

function openPage(cId,pId,chapterIndex,PageIndex){
    if(document.location.href.indexOf("editor")<1){
        
		// chandan -IE Fix
		
		// toc.forEach((element,index) =>{
            // if(cId == element.chapId){
                // if(pId == element.pageId){
                    // var cName = element.chap;
                    // var pName = element.page;
                    // var cIndex = element.chapIndex;
                    // var pIndex = element.pageIndex;
                    // loadPage(cName, pName, cIndex, pIndex, cId, pId)          
                // }
            // }    
        // });
		  
		toc.forEach(function(element,index){
            if(cId == element.chapId){
                if(pId == element.pageId){
                    var cName = element.chap;
                    var pName = element.page;
                    var cIndex = element.chapIndex;
                    var pIndex = element.pageIndex;
                    loadPage(cName, pName, cIndex, pIndex, cId, pId)          
                }
            }    
        });
		  
		// chandan -IE Fix ends here
    }else{
       displayNotification("It will not work in preview.Use share link or download package", 'error');
    }
   
}

function setIsVisitedPage(chapId,pageId){
    var chapterId = chapId;
    var pagId = pageId;
	
	// chandan -IE Fix
		
	// $courseJson.index.forEach(element=>{
        // if(element.id == chapterId){
            // element.pages.forEach(ele=>{
                // if(ele.id == pagId){
                    // ele.isVisited = true;
                // }
            // });
        // }
    // });
	  
	$courseJson.index.forEach(function(element){
        if(element.id == chapterId){
            element.pages.forEach(function(ele){
                if(ele.id == pagId){
                    ele.isVisited = true;
                }
            });
        }
    });
	  
	// chandan -IE Fix ends here
}

function setIsVisitedChapter(){
    var chapAllPageVisited = true;
	// chandan -IE Fix
		// $courseJson.index.forEach((element,index)=>{
			// chapAllPageVisited = true;
			// element.pages.forEach(ele=>{
                // if(ele.isVisited==false || ele.isVisited == "false"){
                    // chapAllPageVisited = false;
                // }
            // });
		 $courseJson.index.forEach(function(element,index){
			chapAllPageVisited = true; 
			element.pages.forEach(function(ele){
                if(ele.isVisited==false || ele.isVisited == "false"){
                    chapAllPageVisited = false;
                }
            });
			  
			// chandan -IE Fix ends here
        if(chapAllPageVisited){
            element.isVisited = true;
            $(".appendedtext_"+(index+1)).parent("li").removeClass("disable_li")
        }
       
    });
}

$(document).ready(function() {
    var istrivPrevPage = (typeof trivPrevPage != "undefined" && trivPrevPage) ? true : false; 
    if (istrivPrevPage) { //awt
        var locationSplits = location.href.split('/')
        if (locationSplits[locationSplits.length - 1] === "" || locationSplits[locationSplits.length - 1] === "index.html") {
            var pageIndex = 0;
            var chapIndex = 0;
        } else {
            // var pageIndex = Number(locationSplits[locationSplits.length - 1].split('.')[0].split("_")[1]) - 1;
            var pageIndex = locationSplits[locationSplits.length - 1].split('.')[0].split(/_(.+)/)[1];

            var chapIndex = Number(locationSplits[locationSplits.length - 1].split('.')[0].split("_")[0]) - 1;
            var pageTitleValue = '';
            for (var i = 0; i < $courseJson.index[chapIndex].pages.length; i++) {
                if ($courseJson.index[chapIndex].pages[i].title.includes('-')) {
                    pageTitleValue = $courseJson.index[chapIndex].pages[i].title.toLowerCase().replace('-', '_')
                } else if ($courseJson.index[chapIndex].pages[i].title.includes(' ')) {
                    pageTitleValue = $courseJson.index[chapIndex].pages[i].title.toLowerCase().replace(' ', '_')
                } else {
                    pageTitleValue = $courseJson.index[chapIndex].pages[i].title.toLowerCase();
                }

                if (pageTitleValue.includes(pageIndex)) {
                    pageIndex = i;
                    break;
                }
            }
        }

        var bgType = $courseJson.index[chapIndex].pages[pageIndex].bgType;
        var bgProperty = $courseJson.index[chapIndex].pages[pageIndex].bgProperty;

        if (bgType) {
            if (bgType == "color") {
               // $('body').css('background-color', bgProperty)
            }

            if (bgType == "video") {
                if (bgType == "video") {
                    var allSplits = bgProperty.src.split("/");
                    var filename = allSplits[allSplits.length - 1];
                    var videoUrl = '../media/' + filename;
                    $('#pageDIV').wrap('<div id="awt_container" style="position: relative;"></div>');
                    var aa44 = $('#awt_container').append('<video autoplay="autoplay" id="applyVideo" loop="loop" muted="" style="min-width: calc(100%);width: calc(100%);position: absolute;left: 0;right: 0;top: 44px;bottom: 0;z-index: 1;height: 100%;object-fit: fill;/* width: 500px; */">' +
                        '<source src="' + videoUrl + '" style="min-width: calc(100% - 60px);max-width: calc(100% - 60px);position:absolute;left: 25px;right: 0;top: 30px;bottom: 0;z-index: 9999;height: 100%;object-fit: fill;"></video>');
                }
            }

            if (bgType == "image") {
                var allSplits = bgProperty.src.split("/");
                var filename = allSplits[allSplits.length - 1];
				// chandan -IE Fix
				//var imageUrl = `../images/${filename}`
				//$('body').css('background', `url(${imageUrl})`);
				var imageUrl = "../images/"+filename;
				//$('body').css('background', "url("+imageUrl+")");
				// chandan -IE Fix ends here
                
                
                if (bgProperty['urltype'] === "absolute")
					// chandan -IE Fix
					//$('body').css('background', `url(${imageUrl})`);
				//	$('body').css('background', "url("+imageUrl+")");
					// chandan -IE Fix ends here
                    
                if (bgProperty['type'] == 'stretch') {
                 //   $('body').css('background-size', 'cover')
                  //  $('body').css('background-repeat', 'no-repeat')		
                } else if (bgProperty['type'] == 'center') {
                    //$('body').css('background-position', 'center')
                }
                // else if (bgProperty['type'] == 'parallax') {
                //   // alert("")
                //  // $('body').css('background', 'none');
                //   Helpers.setParallax(bgProperty['src']);
                // }
            }
            // else if (bgType == "video") {
            //   $('#editorPage').parent('.editor-container').append(`
            //   <video autoplay="autoplay" id="applyVideo" loop="loop" muted style="min-width: calc(100% - 60px); max-width: calc(100% - 60px); position: absolute; left: 25px; right: 0; top: 30px; bottom: 0; z-index: -1; height: 100%; object-fit: fill;">
            //     <source src="${bgProperty['src']}"></source>
            //   </video>`).end().css('background-color', 'transparent');
            // }
        }

        var _vContentW = 0;
        var _vContentH = 0;
        var _vBrowserW = 0;
        var _vBrowserH = 0;
        var _vScalePointX = 1;
        var _vScalePointW = 1;
        var _vScalePointH = 1;
        var _lLeftMargin = 0;

        _vScalePointX = 1;
        _vBrowserW = $(window).width();
        _vBrowserH = $(window).height();
        _vContentW = $("#pageDIV").width();
        _vContentH = $("#pageDIV").height();
        _vScalePointW = _vBrowserW / _vContentW;
        _vScalePointH = _vBrowserH / _vContentH;

        if ($courseJson['scaling']) {
            if ($('#awt_container').length) {

            } else {
                $("#pageDIV").css('transform', 'scale(' + _vScalePointW + ')');
                $("#pageDIV").css('transform-origin', 'top center');
            }
        }

        $('head').append('<link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet">');
        var lectoraDoc = $('#pageDIV');

        for (var i = 0; i < lectoraDoc.children().length; i++) {
            var splitText = '';

            if (lectoraDoc.children()[i].className != undefined && lectoraDoc.children()[i].className.includes('shape') == true) {
                $('.' + lectoraDoc.children()[i].className).find('svg').remove();
                splitText = lectoraDoc.children()[i].className.split('_');
                console.log('splitText[0]====', splitText[0], 'splitText[1] ===', splitText[1], 'splitText[2] ===', splitText[2]);
                console.log('lectoraDoc.childNodes[i].className', lectoraDoc.children()[i].className);
            }

            if (splitText[2] == 'stretch') {
                $('.' + lectoraDoc.children()[i].className).css({ 'background-size': 'cover', 'background-position': 'top left', 'background-attachment': 'scroll', 'background-image': 'url(../images/' + splitText[1] + '.jpg)' });
            }
            if (splitText[2] == 'center') {
                $('.' + lectoraDoc.children()[i].className).css({ 'background-size': 'auto', 'background-position': 'center center', 'background-attachment': 'unset', 'background-image': 'url(../images/' + splitText[1] + '.jpg)' });
            }
            if (splitText[2] == 'default') {
                $('.' + lectoraDoc.children()[i].className).css({ 'background-size': 'auto', 'background-position': '0% 0%', 'background-attachment': 'scroll', 'background-image': 'url(../images/' + splitText[1] + '.jpg)' });
            }
            if (splitText[2] == 'repeat') {
                $('.' + lectoraDoc.children()[i].className).css({ 'background-size': 'auto', 'background-position': '0% 0%', 'background-attachment': 'unset', 'background-image': 'url(../images/' + splitText[1] + '.jpg)' });
            }
        }

    }
});

$(document).on('click',".assessmentContinueButton",function(){
	shell.exitCourse();
}); 