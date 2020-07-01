<accordian_widget>
    <div class="visuallyhidden" aria-hidden="true" tabindex="-1">This is an accordian pattern.</div>
    <div class="animation_this word_count">
        <div class="accordion  accordion-widget" id="accordionExample">
        </div>  
    </div>
    <style>
        .accordion .card-body {
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
            padding: 13px 10px;
        }
        .card{
            margin: 0 0 15px 0;
            border:0;
            box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
            border-radius:0;
        }
        .card-header{
            border-bottom:0;
        }
        .card-header{
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


    </style>
    <script>
	this.on("mount", function () {
  //$('.card-body').append('');
  var $parent = $("#" + opts.widgetId);
  opts.settings.items.forEach(function (item, index) {
    if (item === null) return;
    $parent.find("#accordionExample").append("\n            <div class=\"card\">\n                <div class=\"card-header accordian-heading\" id=\"heading_".concat(index, "\">\n                <h2 class=\"mb-0 mt-0\" tabindex=0>\n                    <button class=\"btn btn-link collapsed\" type=\"button\" data-toggle=\"collapse\" data-target=\"#acc_").concat(item.id, "_").concat(index, "\" aria-expanded=\"flase\" aria-controls=\"acc_").concat(item.id, "_").concat(index, "\">").concat(item.heading, "\n                        <i class=\"fa fa-angle-down rotate-icon\"></i>\n                    </button>\n                </h2>\n                </div>\n                <div id=\"acc_").concat(item.id, "_").concat(index, "\" class=\"collapse\" aria-labelledby=\"heading_").concat(index, "\" data-parent=\"#accordionExample\">\n                    <div class=\"card-body\" tabindex=0>\n                    ").concat(item.content, "\n                </div>\n                </div>\n            </div>\n                "));
  });

  if ($globalScope[opts.widgetId] == undefined) {
    FixedLayout.fixWidgetRowHeight(opts.widgetId);
  }

  WidgetEvents.mounted(opts.widgetId);
});
    </script>
    
</accordian_widget>