$(window).on('load', function(e) {
    assessmentFeedback.init();
});
(function() {
    this.init = function() {}
        // code for mcq start
    this.storeResultMcq = [];
    this.storeSelectedAnswerMcq = function(elementObject) {
        assessmentFeedback.storeResultMcq[shell.getCurrentPage()] = [];
        assessmentFeedback.storeResultMcq[shell.getCurrentPage()] = elementObject;
    }

    this.showAnswerMcq = function(pageId) {
            var interactionData = 'undefined';
            interactionData = assessment.getInteraction();
            if (interactionData != 'undefined' && interactionData != undefined) {
                var selectedArray = interactionData;
            } else {
                var selectedArray = assessmentFeedback.storeResultMcq[pageId];
            }
            return selectedArray;
        }
        // code for mcq Ends

    // code for mmcq start
    this.storeResultMMcq = [];
    this.mmcqCheckList = function(selectedMMcqIdList) {
        assessmentFeedback.storeResultMMcq[shell.getCurrentPage()] = [];
        assessmentFeedback.storeResultMMcq[shell.getCurrentPage()] = selectedMMcqIdList;
    }

    this.showAnswerMMcq = function(pageId) {
            var interactionData = 'undefined';
            interactionData = assessment.getInteraction();
            if (interactionData != 'undefined' && interactionData != undefined) {
                var selectedArray = interactionData;
            } else {
                var selectedArray = assessmentFeedback.storeResultMMcq[pageId];
            }
            return selectedArray;
        }
        // code for mmcq ends

    this.fibUserAnswer = [];
    this.fibUserInput = function(elementObject) {
        assessmentFeedback.fibUserAnswer[shell.getCurrentPage()] = [];
        assessmentFeedback.fibUserAnswer[shell.getCurrentPage()] = elementObject;
    }

    this.showfibUserInput = function(pageId) {
        var interactionData = 'undefined';
        interactionData = assessment.getInteraction();
        if (interactionData != 'undefined' && interactionData != undefined) {
            var userInput = interactionData;
        } else {
            var userInput = assessmentFeedback.fibUserAnswer[pageId];
        }
        return userInput;
    }

}).apply(assessmentFeedback);