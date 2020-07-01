<codepen_widget>
    <div class="visuallyhidden" aria-hidden="true" tabindex="-1">This is a custom pattern.</div>

   <iframe ref="content" class="codepen_container" style="height:{opts.settings.customHeight}px" id={iframe_id}> 
   </iframe>

   <style>
        .codepen_container {
            width: 100%;
            height: 100%;
            border: none;
        }
   </style>

   <script>
this.iframe_id = opts.widgetId + "_iframe";
this.on("mount", function () {
  $("#" + this.iframe_id).contents().find('body').html(opts.settings.content);
  document.getElementById(this.iframe_id).contentWindow.eval(opts.settings.contentjs);

  if ($globalScope[opts.widgetId] == undefined) {
    FixedLayout.fixWidgetRowHeight(opts.widgetId);
  }

  WidgetEvents.mounted(opts.widgetId);
});
    </script>
</codepen_widget>