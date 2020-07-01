<text>
  <div class="visuallyhidden" aria-hidden="true" tabindex="-1">This is a roll over pattern.</div>
  <div class="animation_this word_count">
    <div  contenteditable="true" id={editor_id} style="text-align: {opts.settings.listClass}" class='text-widget' ref="main" onclick={clearText} onfocusout={focusOutText} onpaste={pasteText} onkeyup = {keyUpText}>
      {widgetText}
    </div>
 </div>   

  <style>
  .animation_this{
    height:100%;
  }
    .text-widget {
      cursor: text;
      overflow-wrap: break-word;
      padding: 10px 0;
      color: #000;
      font-size: 14px;
      letter-spacing: 1px;
      min-height: 44px;
      height:100%;
    }  
    .text-right{
      text-align:right;
    }
  
    .text-widget p {
      display: block;
    }
    
    .text-widget table {
      table-layout: fixed;
    }
  </style>

  <script>
    this.pasteText = function() {
      if ($("#".concat(this.editor_id)).text().trim() === opts.settings.defaultText && $("#".concat(this.editor_id, " table")).length === 0) {
        $("#".concat(this.editor_id)).find(".default_text").remove();
      } else if ($("#".concat(this.editor_id)).text().trim() == "​​​​​​​Type Your Text Here") {
        $("#".concat(this.editor_id)).empty();
      }
    }

    this.keyUpText =function() {
      if ($("#".concat(this.editor_id)).text().length == 0) {
        $("#".concat(this.editor_id)).html("<p style='min-height: 24px; margin:0px'></p>");
      }
    }

    this.clearText = function(event) {
      /*if ($("#cke_".concat(this.editor_id)).is(":visible") == true) {
        $("#cke_".concat(this.editor_id, " .cke_toolbar_break")).hide();
      }*/

      if ($("#cke_".concat(this.editor_id)).is(":visible") == false) {
        $("#cke_".concat(this.editor_id)).show();
      }

      if (typeof isPreviewPage === "undefined" && typeof isVendorPage === "undefined") {
        if ($("#".concat(this.editor_id)).text().trim() === opts.settings.defaultText && $("#".concat(this.editor_id, " table")).length === 0) {
          $("#".concat(this.editor_id)).html("<p style='min-height: 24px; margin:0px'></p>");
        }
      }
    }

    this.focusOutText = function(event) {
      var el = $(event.target);

      if ($("#".concat(this.editor_id)).text().trim() === "" && $("#".concat(this.editor_id, " table")).length === 0) {
        $("#".concat(this.editor_id)).html("<div class='default_text'>" + opts.settings.defaultText + "</div>");
        $("#".concat(this.editor_id)).blur();
      }
    }

    this.editor_id = opts.widgetId + "_editor";
    this.on("mount", function () {
      updateAnimation(opts.widgetId);
      var dataContent = $('#' + opts.widgetId).attr("data-content");

      if (opts.settings.text == opts.settings.defaultText) {
        this.refs.main.innerHTML = "<div class='default_text'>".concat(opts.settings.text, "</div>");
      } else {
        if (dataContent != "" && dataContent != undefined) {
          var newDiv = document.createElement('div');
          newDiv.innerHTML = opts.settings.text;
          newDiv.textContent = newDiv.textContent.trim();
          var contentText = newDiv.textContent;

          if (dataContent == "correct") {
            contentText = contentText.split("/");
            var re = new RegExp(newDiv.textContent, 'g');
            opts.settings.text = opts.settings.text.replace(re, contentText[0]);
          } else if (dataContent == "incorrect") {
            contentText = contentText.split("/");
            var re = new RegExp(newDiv.textContent, 'g');
            opts.settings.text = opts.settings.text.replace(re, contentText[1]);
          } else {
            contentText = contentText.split(" ");
            var re = new RegExp(newDiv.textContent, 'g');
            contentText.pop();
            contentText.push(dataContent);
            opts.settings.text = opts.settings.text.replace(re, contentText.join(" "));
          }

          this.refs.main.innerHTML = opts.settings.text;
        } else {
          this.refs.main.innerHTML = opts.settings.text;
        }
        console.log(this.refs)
        if(opts.settings.isHeading){
          this.refs.main.setAttribute('role','heading');
        }
      }

      var innerHtml = this.refs.main.innerHTML;
      this.refs.main.innerHTML = innerHtml.split("<p></p>").join('').replace(/[\u200B]/g, '').replace(/[\u200C]/g, '').replace(/[\u200D]/g, '').replace(/[\uFEFF]/g, '');

      if (typeof isPreviewPage === "undefined" && typeof isVendorPage === "undefined") {
        if (CKEDITOR.instances[this.editor_id]) {
          CKEDITOR.instances[this.editor_id].destroy(true);
        }

        if ($globalScope.readOnlyCourse === true || $globalScope.readOnlyPage === true) $("#".concat(this.editor_id)).removeAttr("contenteditable");else CKEDITOR.inline(this.editor_id);
        var prevSize = $("#".concat(opts.widgetId)).closest(".gridRow").height();

        if (CKEDITOR && CKEDITOR.instances[this.editor_id]) {
          CKEDITOR.instances[this.editor_id].on('change', function () {
            // $(`#${opts.widgetId} .text-widget *`).attr("tabindex", 0);  
           // prevSize = FixedLayout.fixTextRowHeight(opts.widgetId, prevSize);
            GlobalEvents.heightChanged();
          });
        }

        var that = this;

        if ($globalScope.readOnlyCourse !== true && $globalScope.readOnlyPage !== true) {
          CKEDITOR.instances[this.editor_id].on('change', function () {
            opts.settings.text = that.refs.main.innerHTML.replace(/[\u200B]/g, '').replace(/[\u200C]/g, '').replace(/[\u200D]/g, '').replace(/[\uFEFF]/g, '');

            if (removeUnicodeFromString($("#".concat(that.editor_id)).text()) === opts.settings.defaultText && $("#".concat(that.editor_id, " table")).length > 0) {
              $("#".concat(that.editor_id)).html(that.refs.main.innerHTML.replace(opts.settings.defaultText, ""));
              $("#".concat(that.editor_id, " div:first-child")).removeClass('default_text');
            }
          });
        }

        if (CKEDITOR && CKEDITOR.instances[this.editor_id]) {
          CKEDITOR.instances[this.editor_id].on("instanceReady", function (event) {
            setTimeout(function () {
              if ($globalScope.showTrack) {
                trackChangesClick(opts.widgetId);
              }
            }, 500);
          });
          function setListCenter(containerId,getTypeOfList){
            
            document.getElementById(containerId).querySelector(getTypeOfList).style.display = 'inline-block';
            document.getElementById(containerId).style.textAlign = 'center'
            opts.settings.listClass = 'center';
            document.getElementById(containerId).querySelectorAll(getTypeOfList + '>li').forEach(function(element){
              element.style.textAlign = 'left';
            });
          }
          function setListRight(containerId,getTypeOfList){
            document.getElementById(containerId).querySelector(getTypeOfList).style.display = 'inline-block';
            document.getElementById(containerId).style.textAlign = 'right'
            opts.settings.listClass = 'right';
            document.getElementById(containerId).querySelectorAll(getTypeOfList + '>li').forEach(function(element){
              element.style.textAlign = 'left';
            });
          }
          function setListDefault(containerId,getTypeOfList){
            document.getElementById(containerId).querySelector(getTypeOfList).style.display = 'block';
            document.getElementById(containerId).style.textAlign = 'left'
            opts.settings.listClass = 'left';
            document.getElementById(containerId).querySelectorAll(getTypeOfList + '>li').forEach(function(element){
              element.style.textAlign = 'left';
            });
          }
          CKEDITOR.instances[this.editor_id].on("afterCommandExec", function (event) {
            let containerId = event.editor.name;
            let checkIsOrderList = document.getElementById(containerId).querySelectorAll('ol').length;
            let checkIsUnorderList = document.getElementById(containerId).querySelectorAll('ul').length;
            let checkIsLIst = checkIsOrderList ? true : (checkIsUnorderList ? true : false);
            let getTypeOfList = checkIsOrderList ? 'ol' : (checkIsUnorderList ? 'ul' : 'textContent');
            let commandName = event.data.name;
            if(checkIsLIst){
              if(commandName === 'justifycenter'){
                setListCenter(containerId,getTypeOfList);
              } else if(commandName === 'justifyright'){
                setListRight(containerId,getTypeOfList);
              } else if(commandName === 'justifyleft' || commandName === 'justifyblock'){
                setListDefault(containerId,getTypeOfList);
              }
            }
            if(commandName === 'bulletedlist' || commandName === 'numberedlist'){
              
              let checkSetAlignment = document.getElementById(containerId).querySelector('li').style.cssText;
              if(checkSetAlignment.includes('center')){
                
                setListCenter(containerId,getTypeOfList);
              } else if(checkSetAlignment.includes('right')){
                setListRight(containerId,getTypeOfList);
              } else {
                setListDefault(containerId,getTypeOfList);
              }
            }
          });
        }

        CKEDITOR.config.allowedContent = true;
      } else {
        if (this.refs.main.innerHTML === opts.settings.defaultText) {
          this.refs.main.innerHTML = "";
        }

        $("[contenteditable='true']").attr("contenteditable", "false");
      }

      WidgetEvents.mounted(opts.widgetId);
    });
    $(document).on('contextmenu', "#".concat(this.editor_id), function () {
      /*if ($("#cke_".concat(opts.widgetId, "_editor")).is(":visible") == true) {
        $("#cke_".concat(opts.widgetId, "_editor .cke_toolbar_break")).hide();
      }*/

      if (event.target.textContent == opts.settings.defaultText && $("#".concat(opts.widgetId, "_editor table")).length === 0) {
        event.target.textContent = '';
        return;
      }
    });
  </script>
</text>
