<click_tab>	
  <div class="visuallyhidden" aria-hidden="true" tabindex="-1">This is a tab pattern.</div>	
  <div class="animation_this word_count">	
  <div class="{opts.settings.tabtype}">
        
        <ul if={this.isNotHorizontalBottom} class="nav nav-tabs" id="myTab" role="tablist">	
               <li class="nav-item" each="{item, index in opts.settings.items}">	
                   <a class="nav-link" data-toggle="tab" href="#acc_{item.id}" data-test="sdfsdfsd" role="tab" aria-controls="acc_{item.id}" tabindex="0">
                    <!-- aria-selected="index===0?'true':'false'" -->	
                    </a>	
               </li>	
         </ul>	
         <div class="tab-content">	
             <div class="tab-pane" tabindex="0" id="acc_{item.id}" role="tabpanel" each="{item in opts.settings.items }">	
                 
             </div>	 
         </div>
         <ul if={this.isHorizontalBottom} class="nav nav-tabs" id="myTab" role="tablist">	
           <li class="nav-item"  each="{item, index in opts.settings.items}">	
              <a class="nav-link" data-toggle="tab" href="#acc_{item.id}" data-test="sdfsdfsd" role="tab" aria-controls="acc_{item.id}" tabindex="0"> 	
               <!-- aria-selected="index===0?'true':'false'" -->	                   
               </a>	
            </li>	
        </ul>	
   </div> 	
   </div>  	
 <style>	
     .accordion .card-body{	
         font-size: 14px;	
         letter-spacing: 1px;	
         color: #252525;	
         padding: 10px;	
     }	
     .accordion .card .fa-angle-down {	
         float: right;	
         position: absolute;	
         top: 0;	
         right: 0;	
         padding: 10px;	
     }	
     .card{	
         margin: 15px 0;	
         border:0;	
         box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);	
         border-radius:0;	
     }	
     .card:first-child,	
     .card:last-child{	
         margin: 0;	
     }	
     .card-header{	
         border-bottom:0;	
     }	
     .card-header h2{	
         background-color: #0dbae0;	
     }	
     .card-header h2 button{	
         width: 100%;	
         text-align: left;	
         text-decoration:none!important;	
         background-color: #0dbae0;	
         color: #fff;	
         white-space: normal;	
         padding-right: 30px;	
     }	
     .card-header h2 button:hover{	
         text-decoration:none!important;	
         background-color: #0dbae0;	
         color: #fff;	
     }	
     .accordian-heading{	
         padding:0;	
         background-color:#f2f2f2;	
     }	
     .accordion .card .card-header button:not(.collapsed) .rotate-icon {	
         -webkit-transform: rotate(180deg);	
         -ms-transform: rotate(180deg);	
         transform: rotate(180deg);	
     }
     .vertical{
      display: -ms-flex;
      display: -webkit-flex;
      display: flex;
     }
     .vertical .nav.nav-tabs {	
       float: left;	
       padding: 4px;	
       max-width: 30%;	
       display: inline-block;	
       font-size: 16px;	
       border: 0;	
       border-right: 1px solid rgba(0,0,0,0.1);
       border-radius: 0;	
       min-width: 150px;
       background-color: #f8f8f8;

     }	
     .vertical .nav-tabs .nav-item a{	
       padding: 4px 4px;	
       border-radius: 0;	
       cursor: pointer; 	
       position: relative; 	
       overflow: hidden;	
       border: 0;	
       font-size: 13px;	
       display: block;
     }	
     .vertical .tab-content{	
       float: left;	
       width: 100%;	
       -webkit-box-flex: 0;	
       -ms-flex: 0 0 100%;	
       flex: 0 0 100%;	
       max-width: 100%;
       min-width: 125px;	
       background: #fdfdfd;	
       line-height: 25px;	
       flex:1;
     }	
     
     .horizontal .nav-item .nav-link{	
       color: #000;	
       }	
     .horizontal .nav-item{	
         white-space: nowrap;	
         text-overflow: ellipsis;	
     }	
     .horizontal .nav-tabs{	
       overflow-y: hidden;	
       overflow-x: auto;	
       flex-wrap: unset;	
       min-width: 125px;	
       width: 100%;	
       display:flex;
       flex-grow: 1; 
       border:0 ;
     }	
    
     .horizontal #myTab .nav-item a{	
       white-space: nowrap;	
       width: 100%;
       display : inline-block;
     }	
     .horizontal .nav-tabs .nav-item a{	
       border: 0;	
       font-size: 13px;	
     }	
     .horizontal .nav-tabs .nav-item a.active	
     {	
       border-radius: 0;	
     }	
     .horizontal nav >.nav-item.nav-link.active:after	
     {	
       content: "";	
       position: relative;	
       bottom: -60px;	
       left: -10%;	
       border: 15px solid transparent;	
       border-top-color: #e74c3c ;	
     }	
     .horizontal .tab-content{	
       background: #fdfdfd;	
       line-height: 25px;	
       border: 0;	
     }	
  
     .nav-tabs .nav-link {	
       border-top-left-radius: 0;	
       border-top-right-radius: 0;	
     }	
     .vertical-lbl, .horizontal-lbl{	
       max-width: 100px;	
     }	
     .horizontal-lbl{	
       margin-left: 25px;	
     }	
     .vertical-lbl .circlemark, .horizontal-lbl .circlemark {	
       background-color: #3290a5;	
       border-radius: 50%;	
     }	
     .vertical-lbl:hover input ~ .circlemark,	
     .horizontal-lbl:hover input ~ .circlemark {	
         background-color: #3290a5;	
     }	
	
      .horizontal_bottom #myTab .nav-link{	
       word-break: normal !important;	
     }	

     .horizontal_bottom .nav-tabs{	
       position: unset;	
       bottom: 0;	
       overflow-y: hidden;	
       overflow-x: auto;	
       flex-wrap: unset;	
       min-width: 125px;	
       width: 95%;	
       width: 100%;
      display: flex;
      flex-wrap: nowrap;
      border: 0;
     }	
     .horizontal_bottom #myTab .nav-item a{	
       white-space: nowrap;	
       display: inline-block;
       border:0;
     }	
   
     .horizontal_bottom .tab-content{	
       /* height: 320px;	 */
        height: auto;
		    /* display: flex; */
        float: left;
        clear: left;
        width:100%;
        border: 0;
     }	
      
     .nav-tabs .nav-item a.active {	
       border-radius: 0;	
       background: #000;	
       color: #fff;	
     }	
     .nav-tabs .nav-item a{	
       background: #eee;	
       vertical-align: middle;	
       display: table-cell;	
     }	
     .tab-content .tab-pane{	
       background: #fbfbfb;	
     }	
     click_tab .nav-tabs .nav-item a{	
       font-size: 13px;	
     }	
     click_tab .nav-tabs::-webkit-scrollbar-thumb	
     {	
       background-color: #c2c2c2;	
       border: 2px solid #c2c2c2;	
     }	
     #clicktab_form .nav-tabs .nav-item a{  	
       white-space: nowrap;	
       font-size: 13px;	
     }	
     click_tab .nav-tabs::-webkit-scrollbar {	
       height: 7px;	
     }	
     click_tab .nav-tabs::-webkit-scrollbar-thumb {	
       background-color: #c2c2c2;	
       outline: 0px solid black;	
       border-radius: 0px;	
     }	
     .horizontal_bottom .tab-pane{	
        height: 77%;	
       -webkit-line-clamp: 9;	
       -webkit-box-orient: vertical;	
       overflow: hidden;	
       text-overflow: ellipsis;	
       line-height: 1.625;	
     }	
     .horizontal_bottom .tab-content>.active{	
       display: -webkit-box !important;	
      }
     .nav-tabs .nav-item {
        margin:2px;
        flex-grow:1
      }
      .nav-tabs .nav-item:last-child {
        margin-right: 0;
      }
      .nav-tabs .nav-item:first-child{
        margin-left: 0;
      }
      .vertical .nav-tabs .nav-item:last-child,
      .vertical .nav-tabs .nav-item:first-child{
        margin: 0 2px
      }
 </style>	
 <script>	
    this.editor_id = opts.widgetId + "_editor";
    this.isNotHorizontalBottom = true;
    this.isHorizontalBottom = false;
    var clickTabType = opts.settings.tabtype;
    if(clickTabType == "horizontal_bottom"){
      this.isNotHorizontalBottom = false;
      this.isHorizontalBottom = true;  
    }
    this.on("mount", function () {	
    updateAnimation(opts.widgetId);	
    $(".nav-tabs .nav-item:first-child .nav-link").trigger("click");	
    var tabActive = opts.settings.tab_activeBackground;	
    var textActive = opts.settings.tab_activeText;	
    var $parent = $("#" + opts.widgetId);	
    var linkIndex = 0;	
    $parent.find(".nav-item").each(function (i, val) {	
    $parent.find(".nav-item a").eq(linkIndex).append("<label class=\"tabs_heading\">".concat(opts.settings.items[i].heading, "</label>"));	
    $parent.find(".tab-content .tab-pane").eq(linkIndex).append("<label class=\"tabs_content\">".concat(opts.settings.items[i].content, "</label>"));	
    linkIndex++;	
    });	
    $parent.find(".nav-item a").css({	
    "background": opts.settings.tab_background	
    }).css({	
    "color": opts.settings.tab_text	
    }).css({	
    "width": '100%'	
    }).css({	
    "height": opts.settings.tab_height	
    });	
    $parent.find(".nav-item a.active").css({	
    "background": tabActive	
    }).css({	
    "color": textActive	
    });	
    $parent.find(".tab-content").css({	
    "background": opts.settings.content_background	
    });	
    $parent.find(".tab-content .tab-pane").css({	
    "color": opts.settings.content_text	
    });	
    $parent.off("click", ".nav-item a").on("click", ".nav-item a", function () {	
    setTimeout(function () {	
      var tabActive = opts.settings.tab_activeBackground;	
      var textActive = opts.settings.tab_activeText;	
      $parent.find(".nav-item a").css({	
        "background": opts.settings.tab_background	
      }).css({	
        "color": opts.settings.tab_text	
      });	
      $parent.find(".nav-item a.active").css({	
        "background": tabActive	
      }).css({	
        "color": textActive	
      });	
      $parent.find(".tab-content").css({	
        "background": opts.settings.content_background	
      });	
      $parent.find(".tab-content .tab-pane").css({	
        "color": opts.settings.content_text	
      });	
    });	
    });	
    });	
    if ($globalScope[opts.widgetId] == undefined) {	
    FixedLayout.fixWidgetRowHeight(opts.widgetId);	
    }	
    this.on("update", function () {	
    opts.settings.text = this.refs.main.innerHTML;	
    });	
 </script>	
</click_tab>