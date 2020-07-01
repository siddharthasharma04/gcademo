function Button_image() {

   this.init = function() {

       this.settings = {
           "selectvalue"                   : "",
           "url"                           : "",
           "specifichapter"                : "",
           "specifipage"                   : "",
           "name"                          : "Sample Button",
           "nextval"                       : "",
           "prevval"                       : "",
           "specifichapterid"              : "",
           "align"                         : "center",
           "target"                        : "",
           "specificwidget"                : "",
           "popuptitle"                    : "",
           "popupcontent"                  : "",
           "selectbox"                     : "",
           "specifichapterpopup"           : "",
           "specifipagepopup"              : "",
           "specifichapteridpopup"         : "",
           "buttonColor"                   : "#6A6C6D",
           "buttonColorHover"              : "#bebfbf",
           "buttonBorder"                  : "#3a3a3a",
           "borderStyle"                   : "solid",
           "buttonImage"                   : "./assets/img/image_2.jpg",
           "buttonWidth"                   : "100px",
           "buttonHeight"                  : "40px",
           "buttonRadius"                  : "0",
           "borderWidth"                   : "1",
           "horizontalDistance"            : "0",
           "verticalDistance"              : "5",
           "spreaddistance"                : "-5",
           "buttonImageOrigName"           : '',
           "isBtnConfigured"               : 'false',
           "buttonShap"                    : "rectangle button" ,
           "title"                         : "Image Button"
       };

       this.widget = new Widget(this.settings);
       this.widget.insert(this.settings);
       this.original_Btn_color = this.settings.buttonColor;
       this.original_Btn_hover_color = this.settings.buttonColorHover;
       this.original_border_color = this.settings.buttonBorder;
       this.widget.openEditPanel(this.getFormHTML());
       this.bindAddFormEvents();
       return this.widget.getWidgetId();
   }

   this.edit = function() {
       this.widget.openEditPanel(this.getFormHTML());
       this.bindEditFormEvents();
   }
  
   this.getFormHTML = function() {
       var that = this;
       var html = `
           <div class="">
               <div id="currentModalBox">
                   <form id="button_widget_form" class="form-settings button_modal button_widget_form">
                       <div class="form-group p_20">
                           <label class="form-element-label custom-label-box4">Image Upload</label>
                           <input type="file" id="btnImage" class="form-control form-file-element" name="filename" required accept="image/">
                       </div>
                       <div class="form-group px_20 mt20">
                           <label class="form-element-label custom-label-box4">Alignment:</label>
                           <select class="form-control form-file-element button-align" id="button_align" value="${that.settings.align}">
                               <option value="left">Left</option>
                               <option value="center" selected>Center</option>
                               <option value="right">Right</option>
                               <option value="vertical center">Vertical Center</option>
                           </select>
                       </div>
                       <div class="form-group px_20 mt20">
                           <label class="form-element-label custom-label-box4">Link to<span style="color:#FF0000">*</span></label>
                               <select class="form-control form-file-element selectbox" id="button_select" value="${that.settings.selectvalue}">
                                   <option value="">Select</option>
                                   <option value="externalurl">External URL</option>
                                   <option value="nextpage">Next Page</option>
                                   <option value="prevpage">Previous Page</option>
                                   <option value="specificpage">Specific Page</option>
                                   <option value="specificwidget">Specific Widget</option>
                                   <option value="popup">Pop-up</option>
                               </select>
                       </div>
                       <div class="form-group px-3 outputhtml">
                       </div>  
                       <div class="form-group px_20 mt20">
                           <label class="form-element-label custom-label-box4">Button Shape:</label>
                               <select class="form-control form-file-element buttonShap" id="buttonShap" value="${that.settings.buttonShap}">
                                   <option value="rectangle button">Rectangle Button</option>
                                   <option value="square button">Square Button</option>
                                   <option value="circle button">Circle Button</option>
                               </select>
                       </div>
                       <div id="accordion2" class="advance-setting-accordion">
                       <div class="card">
                           <div class="card-header advance_setting_hedaer" id="heading_One">
                               <h2 class="mb-0">
                                   <span class="advanceSetting d-flex  btn btn-link collapsed" data-toggle="collapse" data-target="#collapsesettings" aria-expanded="false" aria-controls="collapseOne">
                                   More Settings 
                                   </span>
                               </h2>
                               <span class="advance-accordian-arrow collapsed" data-toggle="collapse" data-target="#collapsesettings" aria-expanded="false" aria-controls="collapseOne"><i class="fa fa-angle-down rotate-icon"></i></span>
                           </div>
                           <div id="collapsesettings" class="collapse" aria-labelledby="heading_One" data-parent="#accordion2">
                               <div class="card-body advance_setting_body">
                                <div class="row">
                                   <div class="col-sm-6">
                                       <div class="form-group mt10 mb15">
                                           <label class="form-element-label fs11 custom-label-box4">Button Width</label>
                                           <input class="form-element btnWidth" type="text" id="buttonWidth" name="button width" placeholder="Width" autocomplete="off" value="${that.settings.buttonWidth}">
                                           <span class="inputbtn-inst-msg">e.g, 100px or 50%</span>
                                       </div>
                                   </div>
                                   <div class="col-sm-6 buttonheightHideShow">
                                       <div class="form-group mt10 mb15">
                                           <label class="form-element-label fs11 custom-label-box4">Button Height</label>
                                           <input type="text" class="form-element btnHeight" id="buttonHeight" name="button height" placeholder="Height" autocomplete="off" value="${that.settings.buttonHeight}"> 
                                           <span class="inputbtn-inst-msg">e.g, 100px or 50%</span>
                                       </div>
                                   </div>  
                                </div>  
                                <div class="row">
                                   <div class="col-sm-12">
                                       <div class="form-group mt10">
                                           <label class="form-element-label custom-label-box4">Tooltip:</label>
                                           <input id="buttonTitle" type="text" class="h-auto form-control form-file-element buttonTitle" maxlength="40" value="${that.settings.title}" />
                                       </div>
                                   </div>
                                 </div>  
                                <div class="row">
                                   <div class="col-md-12">
                                       <label class="form-element-label column-setting-heading">Border Style</label>
                                   </div>
                               </div>
                                <div class="row">
                                       <div class="col-sm-6">
                                           <div class="form-group">
                                               <div class="borderColorSpectrum">
                                                   <label class="form-element-label custom-label-box4">Border Color</label>
                                                   <input type="text" id="btnBorderColor" class="form-control  form-element" name=" border color" value="">
                                               </div>
                                           </div>
                                       </div>
                                       <div class="col-sm-6">
                                           <div class="form-group"> 
                                                   <label class="form-element-label custom-label-box4">Border style</label>
                                                   <select class="form-control form-file-element" id="borderstyle" value="${that.settings.borderStyle}">
                                                   <option value="dotted">dotted</option>
                                                   <option value="dashed">dashed</option>
                                                   <option value="solid" selected>solid</option>
                                                   <option value="double">double</option>
                                                   <option value="groove">groove</option>
                                                   <option value="ridge">ridge</option>
                                                   <option value="inset">inset</option>
                                                   <option value="outset">outset</option>
                                               </select>
                                               </div>
                                           </div>
                                       </div>
                                   <div class="row mt20">
                                       <div class="col-sm-6">
                                           <div class="form-group">
                                               <label class="form-element-label custom-label-box4">Border Width</label>
                                               <div class="radiusSelect">
                                                   <select onchange="this.nextElementSibling.value=this.value" class="borderWidth" id="borderWidth" value="${that.settings.borderWidth}">
                                                       <option value="0">0</option>
                                                       <option value="1" selected>1</option>
                                                       <option value="2">2</option>
                                                       <option value="3">3</option>
                                                       <option value="4">4</option>
                                                       <option value="5">5</option>
                                                   </select>
                                                   <input type="text" class="btnWidthInputBox" id="btnWidthInputBox" value="${that.settings.borderWidth}" />
                                               </div>
                                           </div>
                                       </div>
                                       <div class="col-sm-6">
                                           <div class="form-group">
                                               <label class="form-element-label custom-label-box4">Border Radius</label>
                                               <div class="radiusSelect">
                                                   <select  onchange="this.nextElementSibling.value=this.value" class="btnBorderRadius" id="btnBorderRadius" value="${that.settings.buttonRadius}">
                                                   <option value="0" selected>0</option>
                                                   <option value="1">1</option>
                                                   <option value="2">2</option>
                                                   <option value="3">3</option>
                                                   <option value="4">4</option>
                                                   <option value="5">5</option>
                                                   </select>
                                                   <input type="text" class="radiousInputBox" id="radiousInputBox" value="${that.settings.buttonRadius}" />
                                               </div>
                                           </div> 
                                       </div>
                                   </div>    
                               <div class="row">
                                   <div class="col-md-12">
                                       <label class="form-element-label column-setting-heading">Border Shadow Style</label>
                                   </div>
                               </div> 
                               <div class="row">
                                   <div class="col-sm-6">
                                       <div class="form-group">
                                           <label class="form-element-label custom-label-box4">Vertical Distance</label>
                                           <div class="radiusSelect">
                                               <select onchange="this.nextElementSibling.value=this.value" class="verticalDistance" id="verticalDistance" name="vertical Distance" value="${that.settings.verticalDistance}">
                                                   <option value="0">0</option>
                                                   <option value="1">1</option>
                                                   <option value="2">2</option>
                                                   <option value="3">3</option>
                                                   <option value="4">4</option>
                                                   <option value="5" selected>5</option>
                                               </select>
                                               <input type="text"  class="vertiiDisInputBox" id="vertiiDisInputBox" value="${that.settings.verticalDistance}" />
                                           </div>    
                                       </div>
                                   </div>
                                   <div class="col-sm-6">
                                       <div class="form-group">
                                           <label class="form-element-label custom-label-box4">Spread Distance</label>
                                           <div class="radiusSelect">
                                               <select onchange="this.nextElementSibling.value=this.value" class="spreaddistance" id="spreaddistance" name="spread Distance" value="${that.settings.spreaddistance}">
                                               <option value="-5" selected>-5</option>
                                               <option value="-4">-4</option>
                                               <option value="-3">-3</option>
                                               <option value="-2">-2</option>
                                               <option value="-1">-1</option>
                                               <option value="0">0</option>
                                               <option value="1">1</option>
                                               <option value="2">2</option>
                                               <option value="3">3</option>
                                               <option value="4">4</option>
                                               <option value="5">5</option>
                                               </select> 
                                               <input type="text"  class="spreadiDisInputBox" id="spreadiDisInputBox" value="${that.settings.spreaddistance}" />
                                           </div>
                                       </div>
                                   </div>
                                   </div>
                                   <div class="row mt20">
                                       <div class="col-sm-12">
                                           <div class="form-group">
                                               <label class="form-element-label custom-label-box4">Horizontal Distance</label>
                                               <div class="radiusSelect">
                                                   <select onchange="this.nextElementSibling.value=this.value" class="horizontalDistance" id="horizontalDistance" name="horizontal Distance" value="${that.settings.horizontalDistance}">
                                                       <option value="0" selected>0</option>
                                                       <option value="1">1</option>
                                                       <option value="2">2</option>
                                                       <option value="3">3</option>
                                                       <option value="4">4</option>
                                                       <option value="5">5</option>
                                                       <option value="6">6</option>
                                                   </select>
                                                   <input type="text"  class="horiDisInputBox" id="horiDisInputBox" value="${that.settings.horizontalDistance}" />
                                               </div>
                                           </div>
                                       </div>
                                   </div> 
                              
                                
                               </div>
                           </div>
                           </div> 
                       </div>
                     
                       <div class="form-group px-3">
                           <div class="button-widget-submit button-margin text-right">
                               <button type="submit" class="formBtn yesBtn activeButton disabled  float-right">Apply</button>
                           </div>
                       </div>
                   </form>
               </div>   
           </div>           
       `;
       return html;
   }

   this.bindAddFormEvents = function() {
       var that = this;
       // colorpicker
       $('#btnBorderColor').spectrum(getColorPickerForSpectrum( that.settings.buttonBorder));

       $(".selectbox").change(function() {

           that.settings.selectvalue = $(this).children("option:selected").val();
           if (that.settings.selectvalue == 'externalurl') {
               var externalurlhtml = $(`
               <div class="form-group">
                   <div class="form-group mt20">
                       <label class="form-element-label">Insert URL:</label>
                       <input type="text" class="form-control form-file-element externalurlval" value="" required>
                   </div>
               </div>
               `);
               $('.outputhtml').html($(externalurlhtml).html())
               $('.outputhtml').show();

           } else if (that.settings.selectvalue == 'specificpage') {

               var specifichtml = $(`
               <div class="form-group">
                  
                   <div class="form-group mt20">
                       <label class="form-element-label">Select Chapter:</label>
                       <select class="form-control form-file-element selectbox inputChapter" required>
                          <option value="">Select Chapter</option>
                       </select>
                   </div>

                   <div class="form-group mt20">
                       <label class="form-element-label">Select Page:</label>
                       <select class="form-control form-file-element selectbox inputPage" required>
                          <option value="">Select Page</option>
                       </select>
                   </div>
               </div>
               `);
               $(".outputhtml").html($(specifichtml).html());
               $('.outputhtml').show();

           } else if (that.settings.selectvalue == 'nextpage') {
               var nexthtml = $(`
               <div class="form-group">
                   <input style="display:none" value="next" class="nextval">
               </div>
               `);
               $('.outputhtml').html($(nexthtml).html());
               $('.outputhtml').show();

           } else if (that.settings.selectvalue == 'prevpage') {
               var prevhtml = $(`
               <div class="form-group">
                   <input style="display:none" value="previous" class="prevval">
               </div>
               `);
               $(".outputhtml").html($(prevhtml).html());
               $('.outputhtml').show();

           } else if (that.settings.selectvalue == 'specificwidget') {

               var specificwidgethtml = $(`
                   <div class="form-group mt20">
                       <label class="form-element-label">Select Widget:</label>
                       <select class="form-control form-file-element selectbox inputWidget" required>
                          <option value="">Select Widget</option>
                       </select>
                   </div>

               `);

               $(".outputhtml").html($(specificwidgethtml).html());
               $('.outputhtml').show();

           } else if (that.settings.selectvalue == 'popup') {

               var popuphtml = $(`
               <div class="form-group">
                   <div class="form-group mt20">
                       <label class="form-element-label">Insert Pop-up Title:</label>
                       <div contenteditable="true" name="title" id="popup_title" class="form-control form-file-element popuptitle" required value="${that.settings.popuptitle}">${that.settings.popuptitle}</div>
                   </div>
                   <div class="form-group mt20">
                       <label class="form-element-label">Insert Pop-up Content:</label>
                       <div contenteditable="true" name="title" id="popup_content" class="fw-textarea form-control popupcontent" required value="${that.settings.popupcontent}">${that.settings.popupcontent}</div>
                   </div>
                   <!--specific chapter/page drop-down -->
                   <div class="mb-2">
                       <label class="form-element-label">Select Ok button link below:</label>
                   </div>
                   <div class="form-group mt20">
                       <label class="form-element-label">Select Chapter:</label>
                       <select class="form-control form-file-element selectbox inputChapterpopup" required>
                          <option value="">Select Chapter</option>
                       </select>
                   </div>
                   <div class="form-group mt20">
                       <label class="form-element-label">Select Page:</label>
                       <select class="form-control form-file-element selectbox inputPagepopup" required>
                          <option value="">Select Page</option>
                       </select>
                   </div>

               </div>
               `);

               $(".outputhtml").html($(popuphtml).html());
               $('.outputhtml').show();
               enableCkeditor("popup_content");
               enableCkeditor("popup_title");

           } else if (that.settings.selectvalue === '') {
               var nonehtml = $(`  
                   <div class="button-margin text-right">
                       <button type="button" class="formBtn yesBtn disabled float-right">Apply</button>
                   </div>    
               `);
               $(".blankselect").html($(nonehtml).html());
               $('.outputhtml').hide();
           }

           if (that.settings.selectvalue == "nextpage" || that.settings.selectvalue == "prevpage") {
               $('.activeButton').removeClass("disabled");
           } else {
               $('.activeButton').addClass("disabled");
           }

           $courseJson.index.forEach(function(chapter, index) {
               // console.log(chapter);
               $(".inputChapter").append(`<option value="${index}">${chapter.name}</option>`);
               $(".inputChapterpopup").append(`<option value="${index}">${chapter.name}</option>`);
           });

           $(".inputChapter").on("change", function() {
               var optionSelected = $(this).find("option:selected");
               var valueSelected = optionSelected.val();
               $(".inputPage").empty();

               $courseJson.index[valueSelected].pages.forEach(function(page, index) {
                   //$("#inputPage").append(`<option value="${index}">${index.title}</option>`);
                   $(".inputPage").append(`<option value="${page.id}">${page.title}</option>`);
               });

           });


           $(".inputChapterpopup").on("change", function() {
               var optionSelected = $(this).find("option:selected");
               var valueSelected = optionSelected.val();
               $(".inputPagepopup").empty();

               $courseJson.index[valueSelected].pages.forEach(function(page, index) {
                   //$("#inputPage").append(`<option value="${index}">${index.title}</option>`);
                   $(".inputPagepopup").append(`<option value="${page.id}">${page.title}</option>`);
               });

           });

           var widget_names = [];
           var widget_id, option_html, widget_index;
           widget_index = 0;
           var count = [], widget_label;

           $(".ice_widget").each(function(index) {
               widget_id = $(this).attr("id");
               var widget_name = widgetsJson[$widgets[widget_id].widgetType].label;
               widget_names.push(widget_name);

               if (!count[widget_name])
                   count[widget_name] = 1
               else
                   count[widget_name]++
                   widget_label = widget_name + " " + count[widget_name]

               option_html = "<option value='" + widget_id + "'>" + widget_label + "</option>";
               $(".inputWidget").append(option_html);

           });
       });

       // chnage button shap and default set button radius val
       $(".buttonShap").change(function() {
           $(".buttonShap").find("option[value='"+ that.settings.buttonShap +"']").removeAttr('selected');
           $("#btnBorderRadius").find("option[value='"+ that.settings.buttonRadius +"']").removeAttr('selected');
           that.settings.buttonShap = $(this).children("option:selected").val();
           if(that.settings.buttonShap  == "rectangle button"){
               that.settings.buttonRadius  = "0"
               that.settings.buttonWidth   = "auto"
               that.settings.buttonHeight  = "auto"
               $('.buttonheightHideShow').show();
           }else if (that.settings.buttonShap  == "circle button"){
               that.settings.buttonRadius  = "50"
               that.settings.buttonWidth   = "100px"
               $('.buttonheightHideShow').hide();
           }else if (that.settings.buttonShap  == "square button"){
               that.settings.buttonRadius  = "4"
               that.settings.buttonWidth   = "100px"
               $('.buttonheightHideShow').hide();
           }
           $("#buttonShap").find("option[value='"+ that.settings.buttonShap +"']").attr("selected", "selected");
           $("#btnBorderRadius").find("option[value='"+ that.settings.buttonRadius +"']").attr("selected", "selected");
           document.getElementById("btnBorderRadius").value = that.settings.buttonRadius;
           document.getElementById("radiousInputBox").value = that.settings.buttonRadius;
           document.getElementById("buttonWidth").value = that.settings.buttonWidth;
           document.getElementById("buttonHeight").value = that.settings.buttonHeight;
           $("#btnBorderRadius").attr('value', that.settings.buttonRadius);
           $("#radiousInputBox").attr('value', that.settings.buttonRadius);
           $(".buttonShap").attr('value', that.settings.buttonShap);
           $('#buttonWidth').attr('value', that.settings.buttonWidth);
           $('#buttonHeight').attr('value', that.settings.buttonHeight);

       });   
       
       // selcted button radius nd custom radius add
       $(".btnBorderRadius").change(function(){  
           $("#btnBorderRadius").find("option[value='"+that.settings.buttonRadius+"']").removeAttr('selected');
           that.settings.buttonRadius =  $(this).children("option:selected").val();
           $("#btnBorderRadius").find("option[value='"+that.settings.buttonRadius+"']").attr("selected", "selected");
           $("#btnBorderRadius").attr('value', that.settings.buttonRadius);
           $("#radiousInputBox").attr('value', that.settings.buttonRadius);;
       });

       // select button width
       $(".borderWidth").change(function(){ 
           $("#borderWidth").find("option[value='"+that.settings.buttonWidth+"']").removeAttr('selected');
           that.settings.buttonWidth =  $(this).children("option:selected").val();
           $("#btnBorderRadius").find("option[value='"+that.settings.buttonWidth+"']").attr("selected", "selected");
           $("#borderWidth").attr('value', that.settings.buttonWidth);
           $("#btnWidthInputBox").attr('value', that.settings.buttonWidth);;
       });  
       
       // select horizontal distance
        $(".horizontalDistance").change(function(){ 
           $("#horizontalDistance").find("option[value='"+that.settings.horizontalDistance+"']").removeAttr('selected');
           that.settings.horizontalDistance =  $(this).children("option:selected").val();
           $("#horizontalDistance").find("option[value='"+that.settings.horizontalDistance+"']").attr("selected", "selected");
           $("#horizontalDistance").attr('value', that.settings.horizontalDistance);
           $("#horiDisInputBox").attr('value', that.settings.horizontalDistance);;
        })

       // vartical distance
       $(".spreaddistance").change(function(){ 
          $("#spreaddistance").find("option[value='"+that.settings.verticalDistance+"']").removeAttr('selected');
          that.settings.verticalDistance =  $(this).children("option:selected").val();
          $("#spreaddistance").find("option[value='"+that.settings.verticalDistance+"']").attr("selected", "selected");
          $("#spreaddistance").attr('value', that.settings.verticalDistance);
          $("#vertiiDisInputBox").attr('value', that.settings.verticalDistance);;
       })

      // spread distance
       $(".spreaddistance").change(function(){ 
           $("#spreaddistance").find("option[value='"+that.settings.spreaddistance+"']").removeAttr('selected');
           that.settings.spreaddistance =  $(this).children("option:selected").val();
           $("#spreaddistance").find("option[value='"+that.settings.spreaddistance+"']").attr("selected", "selected");
           $("#spreaddistance").attr('value', that.settings.spreaddistance);
           $("#spreadiDisInputBox").attr('value', that.settings.spreaddistance);;
       })
     
       // alignment
       $("#button_align").change(function(){ 
           $("#button_align").find("option[value='"+that.settings.align+"']").removeAttr('selected');
           that.settings.align =  $(this).children("option:selected").val();
           $("#button_align").find("option[value='"+that.settings.align+"']").attr("selected", "selected");
       })

       // button shape
       $("#borderstyle").change(function(){ 
           $("#borderstyle  option[value='" + that.settings.borderStyle + "']").removeAttr('selected');
           that.settings.borderStyle =  $(this).children("option:selected").val();
           $("#borderstyle").find("option[value='"+that.settings.borderStyle+"']").attr("selected", "selected");
       })
      
       /*remove submit button disable code*/

       $(document).on('input', '.externalurlval', function() {
           $('.activeButton').removeClass("disabled");
       });

       $(document).on('change', '.inputChapter', function() {
           $('.activeButton').removeClass("disabled");
       });

       $(document).on('change', '.inputWidget', function() {
           $('.activeButton').removeClass("disabled");
       });

       $(document).on('keypress keyup change cut paste', '.popuptitle', function() {
           $('.activeButton').removeClass("disabled");
       });


       $(".button_widget_form").on("submit", function(e) {
           e.preventDefault();
           if($("#radiousInputBox").val()){
               that.settings.buttonRadius = $("#radiousInputBox").val();
               $("#radiousInputBox").attr('value', that.settings.buttonRadius);;
           }
           if($('.btnWidthInputBox').val()){
               that.settings.buttonWidth = $("#btnWidthInputBox").val();
               $("#btnWidthInputBox").attr('value', that.settings.buttonWidth);;   
           }
           if($("#horiDisInputBox").val()){
               that.settings.horizontalDistance = $("#horiDisInputBox").val();
               $("#horiDisInputBox").attr('value', that.settings.horizontalDistance);;   
           }
           if($('.vertiiDisInputBox').val()){
               that.settings.verticalDistance = $("#vertiiDisInputBox").val();
               $("#vertiiDisInputBox").attr('value', that.settings.verticalDistance);;   
           }
           if($("#spreadiDisInputBox").val()){
               that.settings.spreaddistance = $("#spreadiDisInputBox").val();
               $("#spreadiDisInputBox").attr('value', that.settings.spreaddistance);;   
           }

           that.settings.name                  = $('.buttonName').html();
           that.settings.align                 = $('.button-align').val();
           that.settings.selectbox             = $('.selectbox').val()
           that.settings.buttonShap            = $("#buttonShap").val();
           that.settings.buttonState           = $("#buttonState").val();
           that.settings.buttonWidth           = $('#buttonWidth').val();
           that.settings.buttonHeight          = $('#buttonHeight').val();  
           that.settings.title                 = $('#buttonTitle').val();
           that.settings.buttonBorder          = $('.borderColorSpectrum').find('.sp-preview-inner').css("background-color");
           that.settings.borderStyle           = $('#borderstyle').val();
           that.settings.borderWidth           = $('#btnWidthInputBox').val();
           that.settings.buttonRadius          = $("#radiousInputBox").val();
           that.settings.horizontalDistance    = $('#horiDisInputBox').val();
           that.settings.verticalDistance      = $('#vertiiDisInputBox').val();
           that.settings.spreaddistance        = $('#spreadiDisInputBox').val(); 
           that.settings.buttonImage           = $('#btnImage').val();

           if(!(that.settings.buttonColor == that.original_Btn_color)){
               that.settings.isBtnConfigured = "true";
            }
           if(!(that.settings.buttonBorder == that.original_border_color)){
               that.settings.isBtnConfigured = "true";
            }
           if(!(that.settings.buttonColorHover == that.original_Btn_hover_color)){
               that.settings.isBtnConfigured = "true";
           }
           if(that.settings.isBtnConfigured == "true"){
               checkandSaveGlobalSettingwidgets(that.widget.id);
           } 
           if(that.settings.buttonImage != ""){
               that.settings.buttonImageOrigName = that.settings.buttonImage.split('fakepath')[1].split('.')[0].substr(1);
               that.UploadImage(e)
           }

           $('#button_widget_form input[type="file"]').change(function () {
               var ext = this.value.match(/\.(.+)$/)[1];
               var extSplit = ext.split('.');
               var lastExt = extSplit[extSplit.length - 1];
       
               switch (lastExt.toLowerCase()) {
                 case 'jpg':
                 case 'jpeg':
                 case 'png':
                 case 'gif':
                 case 'svg':
                 case 'bmp':
                   $('#btnImage').attr('disabled', false);
                   break;
       
                 default:
                   displayNotification("This is not an allowed file type.", 'error');
                   this.value = '';
               }
             });
          
           if ($(".externalurlval").val()) {
               that.settings.url = $(".externalurlval").val();
               that.settings.target = "_blank";
               displayNotification("successfully submitted");
           } else if ($(".inputChapter").val() && $(".inputPage").val()) {
               that.settings.specifichapter = $(".inputChapter").val();
               that.settings.specifipage = $(".inputPage").val();
               that.settings.specifichapterid = $courseJson.index[that.settings.specifichapter].id;
           } else if ($(".nextval").val()) {
               that.settings.nextval = $(".nextval").val();
           } else if ($(".prevval").val()) {
               that.settings.prevval = $(".prevval").val();
           } else if ($(".inputWidget").val()) {
               that.settings.specificwidget = $(".inputWidget").val();
           } else if ($(".popuptitle").html()) {
               that.settings.popuptitle = $(".popuptitle").html();
               that.settings.popupcontent = $(".popupcontent").html();
               that.settings.target = "_self";
               /* for specific page */
               that.settings.specifichapterpopup = $(".inputChapterpopup").val();
               that.settings.specifipagepopup = $(".inputPagepopup").val();
               console.log(that.settings.specifichapterpopup + ' - ' + that.settings.specifipagepopup);
               that.settings.specifichapteridpopup = $courseJson.index[that.settings.specifichapterpopup].id;
           }
               that.widget.reMount(that.settings);
       });

   }

   this.bindEditFormEvents = function() {
       var that = this;
       widgetSettingPanelOpenSetIcon();
       $('#btnBorderColor').spectrum(getColorPickerForSpectrum( that.settings.buttonBorder));

       $("#button_align").find("option[value='" + that.settings.align + "']").attr("selected", "selected");

       $("#borderstyle").find("option[value='" + that.settings.borderStyle + "']").attr("selected", "selected");

       $("#buttonShap").find("option[value='"+that.settings.buttonShap+"']").attr("selected", "selected");
       // chnage button shap and default set button radius val
       $(".buttonShap").change(function() {
           $(".buttonShap").find("option[value='"+that.settings.buttonShap+"']").removeAttr('selected');
           $("#btnBorderRadius").find("option[value='"+that.settings.buttonRadius+"']").removeAttr('selected');
           that.settings.buttonShap = $(this).children("option:selected").val();
           if(that.settings.buttonShap  == "rectangle button"){
               that.settings.buttonRadius  = "0"
               that.settings.buttonWidth   = "auto"
               that.settings.buttonHeight  = "auto"
               $('.buttonheightHideShow').show();
           }else if (that.settings.buttonShap  == "circle button"){
               that.settings.buttonRadius  = "50"
               that.settings.buttonWidth   = "100px"
               $('.buttonheightHideShow').hide();
           }else if (that.settings.buttonShap  == "square button"){
               that.settings.buttonRadius  = "4"
               that.settings.buttonWidth   = "100px"
               $('.buttonheightHideShow').hide();
           }
           $("#buttonShap").find("option[value='"+that.settings.buttonShap+"']").attr("selected", "selected");
           $("#btnBorderRadius").find("option[value='"+that.settings.buttonRadius+"']").attr("selected", "selected");
           document.getElementById("btnBorderRadius").value = that.settings.buttonRadius;
           document.getElementById("radiousInputBox").value = that.settings.buttonRadius;
           document.getElementById("buttonWidth").value = that.settings.buttonWidth;
           document.getElementById("buttonHeight").value = that.settings.buttonHeight;
           $("#btnBorderRadius").attr('value', that.settings.buttonRadius);
           $("#radiousInputBox").attr('value', that.settings.buttonRadius);
           $(".buttonShap").attr('value', that.settings.buttonShap);
           $('#buttonWidth').attr('value', that.settings.buttonWidth);
           $('#buttonHeight').attr('value', that.settings.buttonHeight);

       });   
       
       // selcted button radius nd custom radius add
       $(".btnBorderRadius").change(function(){  
           $("#btnBorderRadius").find("option[value='"+that.settings.buttonRadius+"']").removeAttr('selected');
           that.settings.buttonRadius =  $(this).children("option:selected").val();
           $("#btnBorderRadius").find("option[value='"+that.settings.buttonRadius+"']").attr("selected", "selected");
           $("#btnBorderRadius").attr('value', that.settings.buttonRadius);
           $("#radiousInputBox").attr('value', that.settings.buttonRadius);;
       });

       // select button width
       $(".borderWidth").change(function(){ 
           $("#borderWidth").find("option[value='"+that.settings.buttonWidth+"']").removeAttr('selected');
           that.settings.buttonWidth =  $(this).children("option:selected").val();
           $("#btnBorderRadius").find("option[value='"+that.settings.buttonWidth+"']").attr("selected", "selected");
           $("#borderWidth").attr('value', that.settings.buttonWidth);
           $("#btnWidthInputBox").attr('value', that.settings.buttonWidth);;
       });  
       
       // select horizontal distance
        $(".horizontalDistance").change(function(){ 
           $("#horizontalDistance").find("option[value='"+that.settings.horizontalDistance+"']").removeAttr('selected');
           that.settings.horizontalDistance =  $(this).children("option:selected").val();
           $("#horizontalDistance").find("option[value='"+that.settings.horizontalDistance+"']").attr("selected", "selected");
           $("#horizontalDistance").attr('value', that.settings.horizontalDistance);
           $("#horiDisInputBox").attr('value', that.settings.horizontalDistance);;
       })

       // vartical distance
       $(".spreaddistance").change(function(){ 
          $("#spreaddistance").find("option[value='"+that.settings.verticalDistance+"']").removeAttr('selected');
          that.settings.verticalDistance =  $(this).children("option:selected").val();
          $("#spreaddistance").find("option[value='"+that.settings.verticalDistance+"']").attr("selected", "selected");
          $("#spreaddistance").attr('value', that.settings.verticalDistance);
          $("#vertiiDisInputBox").attr('value', that.settings.verticalDistance);;
      })

      // spread distance
      $(".spreaddistance").change(function(){ 
           $("#spreaddistance").find("option[value='"+that.settings.spreaddistance+"']").removeAttr('selected');
           that.settings.spreaddistance =  $(this).children("option:selected").val();
           $("#spreaddistance").find("option[value='"+that.settings.spreaddistance+"']").attr("selected", "selected");
           $("#spreaddistance").attr('value', that.settings.spreaddistance);
           $("#spreadiDisInputBox").attr('value', that.settings.spreaddistance);;
      })
      
       // alignment
        $("#button_align").change(function(){ 
           $("#button_align").find("option[value='"+that.settings.align+"']").removeAttr('selected');
           that.settings.align =  $(this).children("option:selected").val();
           $("#button_align").find("option[value='"+that.settings.align+"']").attr("selected", "selected");
       })

       // button shape
       $("#borderstyle").change(function(){ 
           $("#borderstyle  option[value='" + that.settings.borderStyle + "']").removeAttr('selected');
           that.settings.borderStyle =  $(this).children("option:selected").val();
           $("#borderstyle").find("option[value='"+that.settings.borderStyle+"']").attr("selected", "selected");
       })

       $(".selectbox").change(function() {
           that.settings.selectvalue = $(this).children("option:selected").val();
           if (that.settings.selectvalue == 'externalurl') {
               var externalurlhtml = $(`
               <div class="form-group">
                   <div class="form-group mt20">
                       <label class="form-element-label">Insert URL:</label> 
                       <input type="text" class="form-control form-file-element externalurlval" value="${that.settings.url}" required>
                   </div>
               </div>
               `);
               $(".outputhtml").html($(externalurlhtml).html());
               $('.outputhtml').show();
               $('.activeButton').removeClass("disabled");

           } else if (that.settings.selectvalue == 'specificpage') {

               var specifichtml = $(`
               <div class="form-group">
                   <div class="form-group mt20">
                       <label class="form-element-label">Select Chapter:</label>
                       <select class="form-control form-file-element selectbox inputChapter" required>
                           <option value="">Select Chapter</option>
                       </select>
                   </div>

                   <div class="form-group mt20">
                       <label class="form-element-label">Select Page:</label>
                       <select class="form-control form-file-element selectbox inputPage" required>
                           <option value="">Select Page</option>
                       </select>
                   </div>
               </div>
               `);

               $(".outputhtml").html($(specifichtml).html());
               $('.outputhtml').show();
               $('.activeButton').removeClass("disabled");

           } else if (that.settings.selectvalue === 'nextpage') {

               var nexthtml = $(`
               <div class="form-group">
                   <input style="display:none" value="next" class="nextval">
               </div>
               `);
               $(".outputhtml").html($(nexthtml).html());
               $('.outputhtml').show();
               $('.activeButton').removeClass("disabled");
             
           } else if (that.settings.selectvalue === 'prevpage') {

               var prevhtml = $(`
               <div class="form-group">
                   <input style="display:none" value="previous" class="prevval">
               </div>
               `);
               $(".outputhtml").html($(prevhtml).html());
               $('.outputhtml').show();
               $('.activeButton').removeClass("disabled");
             
           } else if (that.settings.selectvalue == 'specificwidget') {

               var specificwidgethtml = $(`
               <div class="form-group">
                   <div class="form-group mt20">
                       <label class="form-element-label">Select Widget:</label>
                       <select class="form-control form-file-element selectbox inputWidget" required>
                          <option value="">Select Widget</option>
                       </select>
                   </div>
               </div>
               `);

               $(".outputhtml").html($(specificwidgethtml).html());
               $('.outputhtml').show();
               $('.activeButton').removeClass("disabled");
              
           } else if (that.settings.selectvalue == 'popup') {

               var popuphtml = $(`
               <div class="form-group">
                   <div class="form-group mt20">
                       <label class="form-element-label">Insert Pop-up Title:</label>
                       <div contenteditable="true" name="title" id="popup_title" class="form-control form-file-element popuptitle" required value="${that.settings.popuptitle}">${that.settings.popuptitle}</div>
                   </div>
                   <div class="form-group mt20">
                       <label class="form-element-label">Insert Pop-up Content:</label>
                       <div contenteditable="true" name="title" id="popup_content" class="fw-textarea form-control popupcontent" required value="${that.settings.popupcontent}">${that.settings.popupcontent}</div>
                   </div>


                   <!--specific chapter/page drop-down -->
                   <div class="mb-2">
                       <label class="form-element-label">Select Ok button link below:</label>
                   </div>
                   <div class="form-group mt20">
                       <label class="form-element-label">Select Chapter:</label>
                       <select class="form-control form-file-element selectbox inputChapterpopup" required>
                          <option value="">Select Chapter</option>
                       </select>
                   </div>

                   <div class="form-group mt20">
                       <label class="form-element-label">Select Page:</label>
                       <select class="form-control form-file-element selectbox inputPagepopup" required>
                          <option value="">Select Page</option>    
                       </select>
                   </div>

               </div>
               `);

               $(".outputhtml").html($(popuphtml).html());
               $('.outputhtml').show();
               $('.activeButton').removeClass("disabled");
               enableCkeditor("popup_content");
               enableCkeditor("popup_title");

           } else if (that.settings.selectvalue === '') {

               var nonehtml = $(`  
                   <div class="button-margin text-right">
                       <button type="button" class="formBtn yesBtn disabled float-right">Apply</button>
                   </div>    
               `);
               $(".blankselect").html($(nonehtml).html());
               $('.outputhtml').hide();

           }

           if (that.settings.selectbox == "nextpage" || that.settings.selectbox == "prevpage") {
               $('.activeButton').removeClass("disabled");
           }

           $(".inputChapter").empty();
           $(".inputChapterpopup").empty();
           $courseJson.index.forEach(function(chapter, index) {
               //$(specifichtml).find('#inputChapter').append(`<option value="val">options</option>`);
               $(".inputChapter").append(`<option>Select Chapter</option>`);
               $(".inputChapter").append(`<option value="${index}">${chapter.name}</option>`);


               $(".inputChapterpopup").append(`<option>Select Chapter</option>`);
               $(".inputChapterpopup").append(`<option value="${index}">${chapter.name}</option>`);

           });

           $(".inputChapter").on("change", function() {
               var optionSelected = $(this).find("option:selected");
               var valueSelected = optionSelected.val();
               $(".inputPage").empty();

               $courseJson.index[valueSelected].pages.forEach(function(page, index) {
                   //$("#inputPage").append(`<option value="${index}">${index.title}</option>`);
                   $(".inputPage").append(`<option value="${page.id}">${page.title}</option>`);
               });

           });


           $(".inputChapterpopup").on("change", function() {
               var optionSelected = $(this).find("option:selected");
               var valueSelected = optionSelected.val();
               $(".inputPagepopup").empty();

               $courseJson.index[valueSelected].pages.forEach(function(page, index) {
                   //$("#inputPage").append(`<option value="${index}">${index.title}</option>`);
                   $(".inputPagepopup").append(`<option value="${page.id}">${page.title}</option>`);
               });

           });


           var widget_names = [];
           var widget_id, option_html, widget_index;
           widget_index = 0;
           var count = [],
               widget_label;

           $('.inputWidget').empty();

           $(".ice_widget").each(function(index) {
               //// console.log( index + ": " + $( this ).text() );
               //widget_id = $(this).attr("id")

               widget_id = $(this).attr("id");
               var widget_name = widgetsJson[$widgets[widget_id].widgetType].label;
               widget_names.push(widget_name);

               if (!count[widget_name])
                   count[widget_name] = 1
               else
                   count[widget_name]++

                   widget_label = widget_name + " " + count[widget_name]

               option_html = "<option value='" + widget_id + "'>" + widget_label + "</option>";
               $(".inputWidget").append(option_html);

           });

       });

       $('.selectbox').val(that.settings.selectbox).trigger('change');

       /*remove submit button disable code*/
       $(document).on('input', '.externalurlval', function() {
           $('.activeButton').removeClass("disabled");
       });

       $(document).on('change', '.inputChapter', function() {
           $('.activeButton').removeClass("disabled");
       });

       $(document).on('change', '.inputWidget', function() {
           $('.activeButton').removeClass("disabled");
       });

       $(document).on('keypress keyup change cut paste', '.popuptitle', function() {
           $('.activeButton').removeClass("disabled");
       });

       $(".button_widget_form").on("submit", function(e) {
           e.preventDefault();
           that.settings.name                  = $('.buttonName').html();
           that.settings.align                 = $('.button-align').val();
           that.settings.selectbox             = $('.selectbox').val()
           that.settings.buttonShap            = $("#buttonShap").val();
           that.settings.buttonState           = $("#buttonState").val();
           that.settings.buttonWidth           = $('#buttonWidth').val();
           that.settings.buttonHeight          = $('#buttonHeight').val();
           that.settings.title                 = $('#buttonTitle').val();  
           that.settings.buttonBorder          = $('.borderColorSpectrum').find('.sp-preview-inner').css("background-color");
           that.settings.borderStyle           = $('#borderstyle').val();
           that.settings.borderWidth           = $('#btnWidthInputBox').val();
           that.settings.buttonRadius          = $("#radiousInputBox").val();
           that.settings.horizontalDistance    = $('#horiDisInputBox').val();
           that.settings.verticalDistance      = $('#vertiiDisInputBox').val();
           that.settings.spreaddistance        = $('#spreadiDisInputBox').val(); 
           that.settings.buttonImage = $('#btnImage').val();

           if(!(that.settings.buttonColor == that.original_Btn_color)){
               that.settings.isBtnConfigured = "true";
            }
            if(!(that.settings.buttonBorder == that.original_border_color)){
               that.settings.isBtnConfigured = "true";
            }
            if(!(that.settings.buttonColorHover == that.original_Btn_hover_color)){
               that.settings.isBtnConfigured = "true";
           } 
           if(that.settings.isBtnConfigured == "true"){
               checkandSaveGlobalSettingwidgets(that.widget.id);
           }
           
           if(that.settings.buttonImage !=""){
               that.settings.buttonImageOrigName = that.settings.buttonImage.split('fakepath')[1].split('.')[0].substr(1);
               that.UploadImage(e)
           }

           $('#button_widget_form input[type="file"]').change(function () {
               var ext = this.value.match(/\.(.+)$/)[1];
               var extSplit = ext.split('.');
               var lastExt = extSplit[extSplit.length - 1];
       
               switch (lastExt.toLowerCase()) {
                 case 'jpg':
                 case 'jpeg':
                 case 'png':
                 case 'gif':
                 case 'svg':
                 case 'bmp':
                   $('#btnImage').attr('disabled', false);
                   break;
       
                 default:
                   displayNotification("This is not an allowed file type.", 'error');
                   this.value = '';
               }
             });

           that.settings.selectbox = $(".selectbox").val();
           //that.widget.reMount(that.settings);
           if ($(".externalurlval").val()) {
               that.settings.url = $(".externalurlval").val();
               that.settings.target = "_blank";
           displayNotification("successfully submitted");
           } else if ($(".inputChapter").val() && $(".inputPage").val()) {
               that.settings.specifichapter = $(".inputChapter").val();
               that.settings.specifipage = $(".inputPage").val();
               that.settings.specifichapterid = $courseJson.index[that.settings.specifichapter].id;
           } else if ($(".nextval").val()) {
               that.settings.nextval = $(".nextval").val();
           } else if ($(".prevval").val()) {
               that.settings.prevval = $(".prevval").val();
           } else if ($(".inputWidget").val()) {
               that.settings.specificwidget = $(".inputWidget").val();
           } else if ($(".popuptitle").html()) {
               that.settings.popuptitle = $(".popuptitle").html();
               that.settings.popupcontent = $(".popupcontent").html();
               that.settings.target = "_self";
               /* for specific page */
               that.settings.specifichapterpopup = $(".inputChapterpopup").val();
               that.settings.specifipagepopup = $(".inputPagepopup").val();
               console.log(that.settings.specifichapterpopup + ' - ' + that.settings.specifipagepopup);
               that.settings.specifichapteridpopup = $courseJson.index[that.settings.specifichapterpopup].id;
           }
           that.widget.reMount(that.settings);
           
       });

   }

   this.UploadImage = function (ev) {
       ev.preventDefault();
       var that = this;
       var flagKey = false;
       var formData = new FormData(document.getElementById('button_widget_form'));
   
       if ($("#button_widget_form [name='filename']").val() != '') {
         // $('#loader').show();
         axios.post(appUrl + '/new-image', formData, {
           headers: {
             "course_path": $courseJson.courseDirPath,
             "token": localStorage.getItem('token')
           }
         }).then(function (result) {
           flagKey = true;
           var imagePath = $courseJson.courseDirPath + result.data.data;
           that.settings.buttonImage = encodeURIComponent(imagePath);
           that.widget.reMount(that.settings); // $('#loader').hide();
         });
       } else {

         that.widget.reMount(that.settings);
       }
     };

   function checkandSaveGlobalSettingwidgets(widgetID){
       var checkExistence =  $courseJson.globalSettings.custom_setting_widgets.includes(widgetID);
       if(!checkExistence){
           $courseJson.globalSettings.custom_setting_widgets.push(widgetID);
       }
   }



}

Button_image.prototype = Object.create(MainWidget.prototype);


