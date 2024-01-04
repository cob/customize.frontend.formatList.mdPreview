function handleDollarPreview(){
  let runOnce = true
  cob.custom.customize.push(function (core, utils, ui) {

    core.customizeAllColumns("*", (node, esDoc, colDef) => {
      function htmlDecode(input) {
        var e = document.createElement('div');
        e.innerHTML = input;
        return e.childNodes[0].nodeValue;
      }
      let hasMarkdownDollar = /[$]markdown.*[$]style\[([^,]+,)*mdPreview(,[^,]+)*\]/.exec(colDef.fieldDefDescription)
      if (hasMarkdownDollar && node.innerHTML) {
        marked.setOptions({ xhtml: false })
        node.classList.add("dollarMarkdownCell");
        node.innerHTML = `
          <div class='flex align-center'> 
            <i class='dollarMarkdownText fa-brands fa-markdown mr-2'></i>
            <div class='max-w-[80%] text-ellipsis overflow-hidden'> ${node.innerHTML} </div> 
          </div>
          <div class='transition-opacity duration-200 transition_effect'>
          ${marked.parse(htmlDecode(node.innerHTML))}
          </div>
        `        

        if(runOnce){
          pdfPreviewDocumentOnclickHandler()
        }
        runOnce = false
      }
    });
  })
}
const MD_PREVIEW_CLASSNAME = "dollarMarkdownPreview"
function showMDPreview(e) {
  if (e.target.classList.contains("dollarMarkdownText")) {
    let previewBlock = e.target.parentElement.nextElementSibling
    hideAllPreviews(previewBlock)
    previewBlock.classList.toggle(MD_PREVIEW_CLASSNAME)
    controlCanvasPosition(e.clientX,previewBlock)
  }else{
    hideAllPreviews(null)
  }
}
function hideAllPreviews(currentPreview) {
  let elements = document.getElementsByClassName(MD_PREVIEW_CLASSNAME)
    for (let child of elements) {
      if(currentPreview != child){
        child.classList.remove(MD_PREVIEW_CLASSNAME)
      }
    }
}
function pdfPreviewDocumentOnclickHandler() {
  let aux = document.onclick
  if(aux){
    document.onclick = (e)=>{
      showMDPreview(e)
      aux(e)
    }
  }else{
    document.onclick=showMDPreview
  }
}

function controlCanvasPosition(x,canvasDiv) {
  if (x > (window.innerWidth - canvasDiv.clientWidth)) {
    canvasDiv.classList.add("dollarImgLft")
  } else {
    canvasDiv.classList.remove("dollarImgLft")
  }
}

handleDollarPreview()