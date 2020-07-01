<line_break_widget>
    <div class="visuallyhidden" aria-hidden="true" tabindex="-1">This is a line break pattern.</div>

    <div class='line-break-widget animation_this'  style="height: {opts.settings.lineHeight}px">
    </div>   

    <script>
   this.on("mount", function () {
  FixedLayout.fixWidgetRowHeight(opts.widgetId);
  WidgetEvents.mounted(opts.widgetId);
});
    </script>
</line_break_widget>
