<progress_bar>
    <div class="visuallyhidden" aria-hidden="true" tabindex="-1">This is an image pattern.</div>
    <div class="animation_this word_count count_media">
        <div class="progress-bar-wrapper" style="text-align:{opts.settings.text['alignment']}">
            <div class="custom-progress-bar" style="background-color:{opts.settings.background['backgroundColor']};border:{opts.settings.border['borderWidth']} solid {opts.settings.border['borderColor']};border-radius:{opts.settings.border['borderRadius']}">
                <span class="current-progress-stat-background" style="background-color:{opts.settings.background['progressFillColor']}">
                    <span class="current-progress-stat-pct-value" style="width:{opts.settings.defaultWidth};font-weight:{opts.settings.text['bold']};font-style:{opts.settings.text['italic']};font-size:{opts.settings.text['size']};color:{opts.settings.text['color']}"></span>
                </span>
            </div>
        </div>
    </div>

    <style>
       .progress-bar-wrapper{display:block;width:100%;position:relative;}
       .custom-progress-bar{border:1px solid #f2f2f2;background-color:#fff;height:25px;overflow:hidden;text-align:left;}
       .current-progress-stat-background{display: inline-block;background: #000;height: 100%;position:relative;}
       .current-progress-stat-pct-value{font-size: 16px;letter-spacing: 1px;color: #444;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);color: #fff;z-index: 1;text-align:center;}
    </style>
    
    <script>
    //debugger
var isPreviewPage = false;
if (typeof isScormPackage !== "undefined" && isScormPackage === true) this.url = '.' + opts.settings.url;

if (typeof scormVer !== "undefined" && (scormVer == "scorm12" || scormVer == "scorm2004")) {
  this.url = opts.settings.url;
} else this.url = opts.settings.url;

var currentWidget = document.getElementById(opts.widgetId);

function findProgressBarValue() {
  var totalPage = 0;
  var totalvisitedPage = 0;
  var totalProgressPct = 0; //debugger

  $courseJson.index.forEach(function (element) {
    element.pages.forEach(function (ele) {
      if (ele.isVisited == 'true' || ele.isVisited == true) {
        totalvisitedPage++;
      }

      totalPage++;
    });
  });

  if (typeof isScormPackage !== "undefined" && isScormPackage === true) {
    totalProgressPct = shell.sendPctValueToProgressBar();
  } else {
    totalProgressPct = Math.floor(totalvisitedPage * 100 / totalPage);
  } //debugger


  currentWidget.getElementsByClassName('current-progress-stat-background')[0].style.width = totalProgressPct + '%';
  currentWidget.getElementsByClassName('current-progress-stat-pct-value')[0].innerText = Math.floor(totalProgressPct) + '%';
}

this.on("mount", function () {
  var currentWidget = document.getElementById(opts.widgetId);

  if (opts.settings.progressFixed['alignemnt'] === 'center') {
    currentWidget.getElementsByClassName('custom-progress-bar')[0].style.margin = '0 auto';
  }

  if (opts.settings.verticalCenter === true) {
    currentWidget.getElementsByClassName('animation_this')[0].style.cssText = 'display:flex;align-items:center;height:100%;';
  }

  if (opts.settings.progressBarType === 'fixed') {
    var element = currentWidget.getElementsByClassName('custom-progress-bar')[0];
    element.style.width = opts.settings.progressFixed['width'];
    element.style.height = opts.settings.progressFixed['height'];
  }

  var applicataionPlatform = document.getElementsByTagName('body')[0].className.split(' ');
  findProgressBarValue();
  WidgetEvents.mounted(opts.widgetId);
});
    </script>

</progress_bar>