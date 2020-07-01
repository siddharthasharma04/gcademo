<visual_note_widget>
<div class="visuallyhidden" aria-hidden="true" tabindex="-1">This is an audio pattern.</div>
    <div class="animation_this word_count">
      <div class="visual-note_text">Visual Note</div>
        <div contenteditable="true" id={editor_id} class='visual-note-widget' ref="main" onclick={clearText} onfocusout={focusOutText}>
        {widgetText}
        </div>
    </div>
<!--  <div><input onclick="audio_toText(event)" id="audio_toText" class="button" type="button" value="Download Text to audio"></div>  -->
  <style>
    .visual-note-widget {
      cursor: text;
      overflow-wrap: break-word;
      padding: 10px 0;
      color: #000;
      font-size: 14px;
      letter-spacing: 1px !important;
      min-height: 44px;
    }
    .visual-note-widget p {
      display: block;
      <!--  width: fit-content;  -->
    }
    .visual-note-widget table {
      table-layout: fixed;
    }
    .visual-note_text {
      color:#0a94b3;
      font-weight:bold;
    }
  </style>

  <script>
this.clearText = function(event) {
  /*if ($("#cke_".concat(this.editor_id)).is(":visible") == true) {
    $("#cke_".concat(this.editor_id, " .cke_toolbar_break")).hide();
  }*/

  if (typeof isPreviewPage === "undefined" && typeof isVendorPage === "undefined") {
    if ($("#".concat(this.editor_id)).text().trim() === opts.settings.defaultText) {
      $("#".concat(this.editor_id)).html("<p style='min-height: 24px; margin:0px'></p>");
    }
  }
}

this.focusOutText = function(event) {
  var el = $(event.target);

  if ($("#".concat(this.editor_id)).text().trim() === "" && $("#".concat(this.editor_id, " table")).length === 0) {
    $("#".concat(this.editor_id)).html(opts.settings.defaultText);
  }
}

this.editor_id = opts.widgetId + "_editor";
this.on("mount", function () {
  updateAnimation(opts.widgetId);
  this.refs.main.innerHTML = opts.settings.text;
  var innerHtml = this.refs.main.innerHTML;
  this.refs.main.innerHTML = innerHtml.split("<p></p>").join('');

  if (typeof isPreviewPage === "undefined" && typeof isVendorPage === "undefined") {
    if (CKEDITOR.instances[this.editor_id]) {
      CKEDITOR.instances[this.editor_id].destroy(true);
    } //        CKEDITOR.inline(this.editor_id);


    if ($globalScope.readOnly === true) $("#".concat(this.editor_id)).removeAttr("contenteditable");else CKEDITOR.inline(this.editor_id);
    var prevSize = $("#".concat(opts.widgetId)).closest(".gridRow").height();
    that = this;

    if ($globalScope.readOnly !== true) {
      CKEDITOR.instances[this.editor_id].on('change', function () {
        if ($("#".concat(that.editor_id, " p")).text() === opts.settings.defaultText && $("#".concat(that.editor_id, " table")).length > 0) {
          $("#".concat(that.editor_id)).html(that.refs.main.innerHTML.replace(opts.settings.defaultText, ""));
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
this.on("update", function () {
  opts.settings.text = this.refs.main.innerHTML;
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
</visual_note_widget>

