cob.custom.customize.push(function (core, utils, ui) {
  utils.loadScript("https://cdn.jsdelivr.net/npm/marked/marked.min.js",  () => {

  core.customizeAllColumns("*", (node, esDoc, colDef) => {
    if (/[$]markdown.*[$]style\[([^,]+,)*mdPreview(,[^,]+)*\]/.exec(colDef.fieldDefDescription) && node.innerHTML) {
      node.classList.add("dollarMarkdownCell");
      node.innerHTML = " <div class='dollarMarkdownText'> preview </div>"
                      +" <div class='dollarMarkdownPreview'>"
                      +    marked.parse(node.innerHTML)
                      +" </div>"
      }
    });
   });
})