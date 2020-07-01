<animation_widget>
    <div class="visuallyhidden" aria-hidden="true" tabindex="-1">This is an animation pattern.</div>
    <div id="{opts.widgetId}_slider" class="carousel slide animation_this" data-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active"></div>
        </div>
        <div class="text-carousel-inner"></div>
    </div>
    <style>
    animation_widget .carousel-item {
        position: static;
    }
    </style>

    <script>
	this.on("mount", function () {
  updateAnimation(opts.widgetId);
  var $parent = $("#" + opts.widgetId);
  var slideTime = [];
  var totalSlides = 0;
  var indexValue = 0;
  var textSlideTime = [];
  var totalTextSlides = 0;
  var textIndexValue = 0;

  if (opts.settings && opts.settings.textSlides && opts.settings.textSlides.length > 0) {
    opts.settings.textSlides.forEach(function (slide, index) {
      if (slide.text_animation_type) {
        var textAnimationCss = "animation-name: slide".concat(slide.text_animation_type, ";\n                                                animation-duration: ").concat(slide.text_transition_duration, "s;\n                                                animation-direction: alternate;");
      } // append text to animate


      $parent.find(".text-carousel-inner").append("\n                        <div class=\"text-carousel-item-wrapper text-position-".concat(slide.textPosition, "\">\n                            <div class=\"text-carousel-item active hide\" data-text-animation-type=\"").concat(slide.text_animation_type, "\" data-text-animation-start-time=\"").concat(slide.text_start_time, "\" data-text-animation-duration=\"").concat(slide.text_transition_duration, "\" data-text-animation-end-time=\"").concat(slide.text_end_time, "\" data-text-position=\"").concat(slide.textPosition, "\" data-text-never-hide=\"").concat(slide.neverHide, "\" style=\"").concat(textAnimationCss, "\">").concat(slide.textCaption, "</div>\n                        </div>\n                    ")); // show and hide text at specific interval

      setTimeout(function () {
        $parent.find('.text-carousel-item').eq(index).addClass('visible').removeClass('hide');
      }, slide.text_start_time * 1000);

      if (!slide.neverHide) {
        setTimeout(function () {
          $parent.find('.text-carousel-item').eq(index).addClass('hide').removeClass('visible');
        }, (parseInt(slide.text_end_time) + parseInt(slide.text_start_time)) * 1000);
      }
    });
  }

  if (opts.settings && opts.settings.slides && opts.settings.slides.length > 0) {
    opts.settings.slides.forEach(function (slide, index) {
      slideTime.push(slide.image_end_time);

      if (slide.image_animation_type) {
        //set animation style to images
        var animationCss = "animation-name: slide".concat(slide.image_animation_type, ";\n                                                    animation-duration:").concat(slide.image_transition_duration, "s;\n                                                    animation-direction:alternate;");
      }

      $parent.find(".carousel-inner .carousel-item").append("\n                        <div class=\"posRel\">\n                            <img data-img-never-hide=\"false\" data-img-animation-type=\"".concat(slide.image_animation_type, "\" data-img-animation-start-time=\"").concat(slide.image_start_time, "\" data-img-animation-end-time=\"").concat(slide.image_end_time, "\" data-img-animation-duration=\"").concat(slide.image_transition_duration, "\" data-img-animation-overlay=\"").concat(slide.overlay, "\" src=\"").concat(slide.url, "\" alt=\"Image\" style=\"").concat(animationCss, "\" class=\"hide\">\n                            ").concat(slide.overlay ? '<div class="imageOverlay"></div>' : '', "\n                        </div>\n                    "));

      if (index == 0) {
        setTimeout(function () {
          $parent.find('.carousel-item img').eq(index).addClass('visible').removeClass('hide');
        }, slide.image_start_time * 1000);
      } else {
        setTimeout(function () {
          $parent.find('.carousel-item img').addClass('hide').removeClass('visible');
          $parent.find('.carousel-item img').eq(index).addClass('visible').removeClass('hide');
        }, slide.image_start_time * 1000);
      }

      animationCss = '';
      animationCssCaption = '';
      totalSlides++;
    });
  }
  /*$(`.text-carousel-inner`).on("dragstart", ".text-carousel-item-wrapper", function(ev) {
      
       console.log('item dragging')
   });
   $(`.text-carousel-inner`).on("dragover", ".text-carousel-item-wrapper", function(ev) {
       ev.preventDefault();
       console.log('drag over');
   });
   $(`.text-carousel-inner`).on("dragend", ".text-carousel-item-wrapper", function(ev) {
       debugger
       var offset = $(`.text-carousel-inner`).offset();
       var fromLeft = (ev.pageX - offset.left)-20;
       var fromTop = (ev.pageY - offset.top)-20;
       $(ev.target).css({
           left: fromLeft,
           top: fromTop
       });
       console.log('item drop')
   });*/


  if ($globalScope[opts.widgetId] == undefined) {
    FixedLayout.fixWidgetRowHeight(opts.widgetId);
  }
});
    </script>
    <style>
        .posRel{
            position:relative;
        }
        .imageOverlay{
            position:absolute;
            left:0;
            right:0;
            top:0;
            bottom:0;
            width:100%;
            height:100%;
            background-color:rgba(0,0,0,0.5);
            z-index:2;
        }
        .carousel-item{
            z-index:1;
        }
        .carousel-caption{
            z-index:3;
            right:0;
            left:0;
            bottom:0;
            text-align:left;
            padding:20px;
        }
        .carousel-item img{
            position:relative;
            z-index:1;
        }
        .text-carousel-inner{
            position: absolute;
            width:100%;
            height:100%;
            left:0;
            top:0;
            bottom:0;
            right:0;
            z-index:1;
        }
        .text-carousel-item-wrapper{
            position:absolute;
            width:100%;
            z-index: 10;
        }
        .text-carousel-item{
            position: absolute;
            width:100%;
            z-index: 10;
            color:#fff;
            padding:10px;
            left:0;
            right:0;
        }
        .text-position-topleft{
            top:0;
            left:0;
            text-align:left;
        }
        .text-position-topright{
            top:0;
            right:0;
            text-align:right;
        }
        .text-position-topcenter{
            top:0;
            left:50%;
            text-align:center;
            transform:translateX(calc(-50% - 20px));
        }
        .text-position-centerleft{
            top:50%;
            left:0;
            transform:translateY(calc(-50% - 20px));
        }
        .text-position-centerright{
            top:50%;
            right:0;
            text-align:right;
            transform:translateY(calc(-50% - 20px))
        }
        .text-position-centercenter{
            top:50%;
            left:50%;
            text-align:center;
            transform:translate(-50%,calc(-50% - 20px));
        }
        .text-position-bottomleft{
            bottom:0;
            left:0;
        }
        .text-position-bottomcenter{
            bottom:0;
            left:50%;
            text-align:center;
            transform:translateX(calc(-50% - 20px));
        }
        .text-position-bottomright{
            bottom:0;
            right:0;
            text-align:right;
        }
        
        .carousel-item img.hide,
        .text-carousel-item.hide{
            display:none;
            visibility:hidden;
            opacity:0;
        }
        .carousel-item img.visible,
        .text-carousel-item.visible{
            display:inline-block;
            visibility:visible!important;
            opacity:1!important;
        }
        .text-carousel-item.visible{
            display:block;
        }
        @keyframes slideleft{
            from{
                left:-100px;
            }
            to{
                left:0;
            }
        }
        @keyframes slideright{
            from{
                left:100px;
            }
            to{
                left:0;
            }
        }
        @keyframes slidetop{
            from{
                top:-100px;
            }
            to{
                top:0;
            }
        }
        @keyframes slidebottom{
            from{
                top:100px;
            }
            to{
                top:0;
            }
        }
        

    </style>
</animation_widget>