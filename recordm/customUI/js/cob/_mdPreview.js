cob.custom.customize.push(function (core, utils, ui) {

  core.customizeAllColumns("*", (node, esDoc, colDef) => {
    function htmlDecode(input){
      var e = document.createElement('div');
      e.innerHTML = input;
      return e.childNodes[0].nodeValue;
    }

    if (/[$]markdown.*[$]style\[([^,]+,)*mdPreview(,[^,]+)*\]/.exec(colDef.fieldDefDescription) && node.innerHTML) {
      marked.setOptions({xhtml:false})

      node.classList.add("dollarMarkdownCell");
      node.innerHTML = " <div class='dollarMarkdownText'> preview </div>"
                      +" <div class='dollarMarkdownPreview'>"
                      +    marked.parse(htmlDecode(node.innerHTML))
                      +" </div>"
      }
    });
})