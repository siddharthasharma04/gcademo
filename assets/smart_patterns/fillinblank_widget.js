function Fillinblank_widget() {
  this.init = function () {
    this.settings = {
      "question": '',
      "inputbox": [],
      "itemlist": [],
      "correct_answer": []
    };
    this.widget = new Widget(this.settings);
    this.widget.openAddModal(this.getFormHTML());
    this.bindAddFormEvents('add');
    this.stopPasteWithFormatting();
    return this.widget.getWidgetId();
  };

  this.edit = function () {
    this.widget.openAddModal(this.getFormHTML());
    $("#fill_in_form .fill-blank-input").each(function () {
      $(this).val($(this).attr("data-correct"));
    });
    this.bindAddFormEvents('edit');
  };

  this.getFormHTML = function () {
    var html = $("\n        <div class=\"widget-settings-wrapper fill-in-blank-widget-modal mdwrap\"> \n            <form id=\"fill_in_form\" class=\"modalBody\">\n                <div class=\"form-group\">\n                    <label class=\"modalLabel custom-label-box4\">Enter your question</label>\n                    <div id=\"fill_in_text\" class=\"fw-textarea form-control\" contenteditable=\"true\">".concat(this.settings.question, "</div>\n                </div>\n                <div class=\"form-group text-right mb0\">\n                    <button id=\"createblankBtn\" type=\"button\" class=\"modalBtn cancelBtn onblank mr10\" value=\"Insert a blank\">Insert a blank</button>\n                    <button id=\"fill_in_submit\" type=\"submit\" class=\"modalBtn yesBtn pull-right\">Apply</button>\n                </div>\n            </form>\n        </div>        \n        "));
    return html;
  };

  this.bindAddFormEvents = function (type) {
    var that = this;
    $("#fill_in_form").on("submit", function (e) {
      e.preventDefault();
      $("#fill_in_form .fill-blank-input").each(function () {
        $(this).attr("data-correct", $(this).val());
      });
      that.settings.question = $(e.target).find("#fill_in_text").html();
      that.settings.inputbox = $(e.target).find(".fill-blank-input").val();

      if (type === "add") {
        if (!(that.settings.question == '') && $('.fill-blank-input').length > 0) {
          that.widget.closeAddModal();
          that.widget.insert(that.settings);
        } else {
          return;
        }
      } else {
        if (!(that.settings.question == '') && $('.fill-blank-input').length > 0) {
          that.widget.closeAddModal();
          that.widget.reMount(that.settings);
        } else {
          return;
        }
      }
    });
    $("#createblankBtn").on("click", function () {
      that.pasteHtmlAtCaret();
    });
  };

  this.pasteHtmlAtCaret = function () {
    var newElId = makeid();
    var inputBoxHTML = "<input name='nm' tabindex=0 role=\"textbox\" class=\"fill-blank-input\" aria-required=\"true\" aria-label=\"blank\" alt=\"blank\" required type='text' id='".concat(newElId, "'  />");
    var sel, range;
    var anchorID = window.getSelection().anchorNode.id;
    var anchorParentID = window.getSelection().anchorNode.parentNode.id;

    if (window.getSelection && (anchorID === 'fill_in_text' || anchorParentID === "fill_in_text")) {
      sel = window.getSelection();

      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        var el = document.createElement("div");
        el.innerHTML = inputBoxHTML;
        var frag = document.createDocumentFragment(),
            node,
            lastNode;

        while (node = el.firstChild) {
          lastNode = frag.appendChild(node);
        }

        range.insertNode(frag);

        if (lastNode) {
          range = range.cloneRange();
          range.setStartAfter(lastNode);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    } else if (document.selection && document.selection.type != "Control") {
      // IE < 9
      document.selection.createRange().pasteHTML(inputBoxHTML);
    }

    $("input[id=".concat(newElId, "]")).focus();
  };

  this.stopPasteWithFormatting = function () {
    $('#fill_in_text').on('paste', function (e) {
      e.preventDefault();
      document.execCommand('inserttext', false, e.originalEvent.clipboardData.getData("text/plain"));
    });
  };
}

Fillinblank_widget.prototype = Object.create(MainWidget.prototype);