$globalScope = {}

// $(document).ready(function(){
//     loadPage('Chapter 1','Screen 1', 0, 0)
// });

var isVendorPage = true;

var getUrlParameter = function(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function getChapPageIndex(pageId, chapId) {
    //Returns index of active chap and page as found in $courseJson
    var curChapId = chapId;
    var curPageId = pageId;
    var chapterIndex = -1, pageIndex = -1;
    $courseJson.index.forEach(function (chapter, index) {
        if (chapter.id == curChapId) {
            chapterIndex = index
        }
    })
    if ($courseJson.index[chapterIndex] && $courseJson.index[chapterIndex].pages) {
        var pages = $courseJson.index[chapterIndex].pages.forEach(function (page, index) {
            if (page.id == curPageId) {
                pageIndex = index
            }
        })
    }
    return {
        chapIndex: chapterIndex,
        pageIndex: pageIndex
    };
}