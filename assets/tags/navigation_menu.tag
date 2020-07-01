<navigation_menu>
  <div class="visuallyhidden" aria-hidden="true" tabindex="-1">This is a Navigation menu.</div>
      <div class="navigation_menu_demo animation_this word_count">
          <div class='navigation-widget' ref="main">
               <ul class="dropdown">
                  <li class="menu">
                      <a href="javascript:void(0)" class="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-bars"></i></a>
                       <ul id="menu_dropdown"  class="dropdown-menu menu-item accordian" aria-labelledby="navbarDropdown"></ul>
                  </li>  
              </ul>
          </div>
      </div>
  </div>

<style>

  .dropdown{
      list-style-type: none;	
      padding:0px;	
      margin: 5px ;	
      font-size: 26px ;
  }

  .navbarDropdown{
      display: inline-block;
      width: 40px;
      height: 30px;
      line-height: 30px;
      text-align:center;
  }

  .menu-item{
      padding: 0px;
      left:49%;
      width: max-content;
  }

  .dropdown-submenu {
      position: relative;
  }
  
  .dropdown-submenu .dropdown-menu{
      top: 0;
      left: 100%;
      margin-top: -1px;
      padding:0px;
  }

  .chapname{
      display: inline-block!important;
      /*width: 100%;*/
      width:auto;
      letter-spacing: 1px;
      text-transform: uppercase;
  }

  .static{
      position: static!important;
      width: 100%;
  }

  .ml15{
      margin-left: 15px!important;
  }

  .accordian .dropdown-submenu .chapname, .dropdown-submenu .dropdown-menu li{
      color: #fff;
      padding:10px;
      cursor: pointer;
  }

  .dropdown-submenu .dropdown-menu li a{
      color: #fff;
      display:block;
  }

  .menu i{
      display:inline-block!important;
  }

  .disable_li{
      pointer-events:none;
      opacity:.5;
  }

  .disable_li a{
      opacity:.5;
  }

  #menu_dropdown{
    top:10px!important;
  }


</style>

<script>
"use strict";

this.editor_id = opts.widgetId + "_editor";
this.on("mount", function () {
  updateAnimation(opts.widgetId);
  $("#" + opts.widgetId).parent("div").closest(".gridCol").addClass("overflow_unset");
  $("#" + opts.widgetId).parent("div").closest(".gridRow").css("z-index", "1");
  $("#" + opts.widgetId).parent("div").css("z-index", "2");
  $(".fixed navigation_menu").parent().closest(".row").css("z-index", "1");
  $(".navigation-widget .dropdown").css("text-align", opts.settings.navigationAlign);
  $(".navbarDropdown").css({
    "background-color": opts.settings.navigationColor,
    "color": opts.settings.iconColor
  });
  var userSelectedContentType = opts.settings.contentType;

  if (typeof isScorm !== "undefined" && (isScorm == "true" || isScorm == true)) {
    shell.setResetNavigation();
  }

  $(".navbarDropdown").click(function () {
    $(".dropdown-submenu .dropdown-menu").hide();
    var getRadioValue = opts.settings.selctedType;
    var menulist = $courseJson.index;
    var userSelectedContentType = opts.settings.contentType;
    var userSelectedNavigation = opts.settings.forceNavigation;

    if (userSelectedContentType == "pages") {
      var apptext = '';

      if (userSelectedNavigation) {
        for (var t = 0; t < menulist.length; t++) {
          var submenu = "<li><a tabindex=\"-1\" href=\"javascript:void(0)\">".concat(menulist[t].pages, "</a></li>");
          var subMenuItem = menulist[t].pages;
          var subMenuLen = subMenuItem.length;

          if (subMenuLen >= 1) {
            submenu = "";

            for (var i = 0; i < subMenuLen; ++i) {
              submenu += "<li><a tabindex=\"-1\" href=\"javascript:void(0)\" onclick=\"openPage(".concat(menulist[t].id, " , ").concat(menulist[t].pages[i].id, ",").concat(t, ",").concat(i, ")\">").concat(subMenuItem[i].title, "</a></li>");
            }
          }

          if (t == 0 || t > 0 && (menulist[t - 1].isVisited == true || menulist[t - 1].isVisited == "true")) {
            apptext += "<li class='dropdown-submenu'><i class=\"fa fa-check\" id=\"check_".concat(t, "\" aria-hidden=\"true\"></i><a class=\"dropdown-toggle chapname appendedtext_".concat(t, "\" tabindex=\"-1\" href=\"javascript:void(0)\" >").concat(menulist[t].name, "<span class=\"caret ml15\"></span></a><ul class=\"dropdown-menu\">").concat(submenu, "</ul></li>"));
          } else {
            apptext += "<li class='dropdown-submenu disable_li'><i class=\"fa fa-check\" id=\"check_".concat(t, "\" aria-hidden=\"true\"></i><a class=\"dropdown-toggle chapname appendedtext_".concat(t, "\" tabindex=\"-1\" href=\"javascript:void(0)\" >").concat(menulist[t].name, "<span class=\"caret ml15\"></span></a><ul class=\"dropdown-menu\">").concat(submenu, "</ul></li>"));
          }
        }
      } else {
        for (var t = 0; t < menulist.length; t++) {
          var isAssessmentClass = "";
          var submenu = "<li><a tabindex=\"-1\" href=\"javascript:void(0)\">".concat(menulist[t].pages, "</a></li>");
          var subMenuItem = menulist[t].pages;
          var subMenuLen = subMenuItem.length;

          if (subMenuLen >= 1) {
            submenu = "";

            for (var i = 0; i < subMenuLen; ++i) {
              submenu += "<li><a tabindex=\"-1\" href=\"javascript:void(0)\" onclick=\"openPage(".concat(menulist[t].id, " , ").concat(menulist[t].pages[i].id, ", ").concat(t, " , ").concat(i, ")\">").concat(subMenuItem[i].title, "</a></li>");
            }
          }

          if (menulist[t].type == "assessment") {
            isAssessmentClass = "disable_li";
          }

          apptext += "<li class='dropdown-submenu " + isAssessmentClass + "'><i class=\"fa fa-check\" id=\"check_".concat(t, "\" aria-hidden=\"true\"></i><a class=\"dropdown-toggle chapname appendedtext_".concat(t, "\" tabindex=\"-1\" href=\"javascript:void(0)\" >").concat(menulist[t].name, "<span class=\"caret ml15\"></span></a><ul class=\"dropdown-menu\">").concat(submenu, "</ul></li>"));
        }
      }
    } else {
      console.log("chapters");

      if (userSelectedNavigation) {
        var apptext = '';

        for (var t = 0; t < menulist.length; t++) {
          if (t == 0 || t > 0 && (menulist[t - 1].isVisited == true || menulist[t - 1].isVisited == "true")) {
            apptext += "<li class='dropdown-submenu' onclick=\"openPage(".concat(menulist[t].id, " , ").concat(menulist[t].pages[0].id, ", ").concat(t, ", ", 0, ")\"><i class=\"fa fa-check\" id=\"check_".concat(t, "\" aria-hidden=\"true\"></i><a class=\"chapname appendedtext_").concat(t, "\" tabindex=\"-1\" href=\"javascript:void(0)\">").concat(menulist[t].name, "<span class=\"caret ml15\"></span></a></li>"));
          } else {
            apptext += "<li class='dropdown-submenu disable_li' onclick=\"openPage(".concat(menulist[t].id, " , ").concat(menulist[t].pages[0].id, ", ").concat(t, ", ", 0, ")\"><i class=\"fa fa-check\" id=\"check_".concat(t, "\" aria-hidden=\"true\"></i><a class=\"chapname appendedtext_").concat(t, "\" tabindex=\"-1\" href=\"javascript:void(0)\">").concat(menulist[t].name, "<span class=\"caret ml15\"></span></a></li>"));
          }
        }
      } else {
        var apptext = '';

        for (var t = 0; t < menulist.length; t++) {
          apptext += "<li class='dropdown-submenu' onclick=\"openPage(".concat(menulist[t].id, " , ").concat(menulist[t].pages[0].id, ", ").concat(t, ", ", 0, ")\"><i class=\"fa fa-check\" id=\"check_".concat(t, "\" aria-hidden=\"true\"></i><a class=\"chapname appendedtext_").concat(t, "\" tabindex=\"-1\" href=\"javascript:void(0)\">").concat(menulist[t].name, "<span class=\"caret ml15\"></span></a></li>"));
        }
      }
    }

    $(".menu-item").html(apptext);

    for (var chap = 0; chap < $courseJson.index.length; chap++) {
      if ($courseJson.index[chap].isVisited == true) {
        $("#check_".concat(chap)).css({
          "visibility": "visible",
          "color": "#fff"
        });
      } else {
        $("#check_".concat(chap)).css("visibility", "hidden");
      }
    }

    $(".accordian li.dropdown-submenu").css({
      "background-color": opts.settings.dropmenuColor
    });

    if (getRadioValue == "right") {
      $(".dropdown-submenu .dropdown-menu").removeClass("static");
      $(".dropdown-submenu .dropdown-menu").css("left", "100%");
    } else if (getRadioValue == "left") {
      $(".dropdown-submenu .dropdown-menu").removeClass("static");
      $(".dropdown-submenu .dropdown-menu").css({"left": "-160px","width":"90px"});
    } else if (getRadioValue == "acc") {
      $(".dropdown-submenu .dropdown-menu").addClass("static");
      $(".dropdown-submenu").addClass("static");
    }

    if (screen.width <= 768) {
      if (opts.settings.navigationAlign == "left") {
        $(".dropdown-submenu .dropdown-menu").css("left", "100%");
      } else {
        $(".dropdown-submenu .dropdown-menu").css("left", "-160px");
      }
    }

    $(".dropdown-submenu a.chapname").click(function (e) {
      if (userSelectedContentType == "pages") {
        $(".dropdown-submenu .dropdown-menu").hide();
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
      }

      $(".dropdown-submenu .dropdown-menu li").css("background-color", opts.settings.dropsubmenuColor);
    });
    $(".accordian li.dropdown-submenu").hover(function () {
      $(this).css("background-color", opts.settings.dropmenuHover);
    }, function () {
      $(this).css({
        "background-color": opts.settings.dropmenuColor
      });
    });
    $(".dropdown-submenu .dropdown-menu li").hover(function () {
      $(this).css("background-color", opts.settings.dropsubmenuHover);
    }, function () {
      $(this).css({
        "background-color": opts.settings.dropsubmenuColor
      });
    });
  });
});
</script>

</navigation_menu>