// JavaScript Document
var utils = {};
//
(function(){
	this.debug = function(text){
		//console.log(text);
	}
	var trapmouse = function (event)	{
		return false;
	}
	this.unselectable = function (){
			$("#courseContainer").contents().find('body').each(function(){
				$(this).css('-moz-user-select', 'none');$(this).css('-khtml-user-select', 'none');$(this).css('-webkit-user-select', 'none');$(this).css('-ms-user-select', 'none');$(this).css('cursor', 'default')
			});
			$("#courseContainer").contents().find('html').each(function(){
				$(this).css('-moz-user-select', 'none');$(this).css('-khtml-user-select', 'none');$(this).css('-webkit-user-select', 'none');$(this).css('-ms-user-select', 'none');$(this).css('cursor', 'default')
			});
			$("#courseContainer").contents().find('div').each(function(){
				$(this).css('-moz-user-select', 'none');$(this).css('-khtml-user-select', 'none');$(this).css('-webkit-user-select', 'none');$(this).css('-ms-user-select', 'none');$(this).css('cursor', 'default')
			});
			$("#courseContainer").contents().find('span').each(function(){
				$(this).css('-moz-user-select', 'none');$(this).css('-khtml-user-select', 'none');$(this).css('-webkit-user-select', 'none');$(this).css('-ms-user-select', 'none');$(this).css('cursor', 'default')
			});
			$("#courseContainer").contents().find('p').each(function(){
				$(this).css('-moz-user-select', 'none');$(this).css('-khtml-user-select', 'none');$(this).css('-webkit-user-select', 'none');$(this).css('-ms-user-select', 'none');$(this).css('cursor', 'default')
			});
		
		}

	this.lockoutmouseevents = function ()	{
		/********* commented by chandan *****************/
		/* document.ondragstartlocation = trapmouse;
		document.onselectstart = trapmouse;
		document.oncontextmenu = trapmouse;
		//
		$(document).on('drag', trapmouse);
		$(document).on('dragend', trapmouse);
		$(document).on('dragstart', trapmouse);
		$(document).on('selectstart', trapmouse); */
		//
		/* var ref = document.getElementsByID( "mainContainer" );
		ref.ondragstartlocation = trapmouse;
		ref.onselectstart = trapmouse;
		ref.oncontextmenu = trapmouse;
		$(ref).on('drag', trapmouse);
		$(ref).on('dragend', trapmouse);
		$(ref).on('dragstart', trapmouse);
		$(ref).on('selectstart', trapmouse); */
		/********* commented by chandan *****************/
		//utils.unselectable();
		/*var len = document.getElementsByID( "iframe" ).length				
		for (var i = 0; i < len; i ++)
		{
			ref [i].contentWindow.document.ondragstartlocation = trapmouse;
			ref [i].contentWindow.document.onselectstart = trapmouse;
			ref [i].contentWindow.document.oncontextmenu = trapmouse;
		}*/
	}
	this.disableRightClick = function (){
		return false;
	}
	this.showHideLoader = function (isShow){
		if (isShow){
			$('.blocker').show();
		}else{
			setTimeout(function(){
				$('.blocker').hide();
			}, 100);
		}
	}
	this.searchNum = function(num, arr){
		
		if(arr != undefined){
			var len = arr.length;
			for (var i = 0; i < len; i++){
				if (num == arr[i]){
					return 1;
				}
			}
		}
		return -1;
	}
	this.detectDevice = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		iOS_Version: function(){
			return parseInt(navigator.userAgent.split(" CPU OS ")[1].split(' like ')[0].split('_')[0]);
		},
		any: function() {
			return (utils.detectDevice.Android() || utils.detectDevice.BlackBerry() || utils.detectDevice.iOS() || utils.detectDevice.Opera() || utils.detectDevice.Windows());
		}
	}
	this.detectBrowser = function(){
		var browser = String(navigator.appVersion).toLowerCase();
		if(browser.indexOf('trident/')>=0 && browser.indexOf('msie 9')>=0) {
			return "IE9";
		}
	}
	this.isMobile = {
		Nexus:function(){
			return navigator.userAgent.match(/Nexus/i);
		},
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		iOS_Version: function(){
			return parseInt(navigator.userAgent.split(" CPU OS ")[1].split(' like ')[0].split('_')[0]);
		}
	};	
	this.detectBrowserIE = function(){
			var ua = window.navigator.userAgent;
			var old_ie = ua.indexOf('MSIE ');
			var new_ie = ua.indexOf('Trident/');

			if ((old_ie > -1)) {
				return "IE_True";
			}
	}
	this.randomNumber = function(minimum, maximum){
   		return Math.round( Math.random() * (maximum - minimum) + minimum);
	}
	this.searchNum = function(num, arr){
		var len = arr.length;
		for (var i = 0; i < len; i++){
			if (num == arr[i]){
				return 1;
			}
		}
		return -1;
	}
	this.readQueryString = function(){
		// get query string
		var templateID = location.href.split('?')[1];
		return templateID;
	}
	this.loadTemplate = function(){
		var templateID = utils.readQueryString();
		var pgpos = utils.getPagePosition(templateID);
		shell.moveToPage(pgpos);
	}
	this.getPagePosition = function(templateID){
		var pagesXML = shell.getPagesXML();
		// get Page Index
		for(var i = 0; i < pagesXML.length; i++){
			if(pagesXML[i].attributes[1].textContent == templateID) {
				var pagePosition = i;
				break;
			}
		}
		return pagePosition;
	}
}).apply(utils)