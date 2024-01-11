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
          <div class='flex align-center items-center hover:cursor-pointer hover:text-slate-400 dollarMarkdownText'> 
            <i class='text-center inline-block text-sm/[14px] fa-regular fa-eye mr-2 text-slate-400'></i>
            <div class='max-w-[80%] text-ellipsis overflow-hidden'> ${node.innerHTML.replace(/^#+|#+$/g,'#')} </div> 
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
  if (e.target.parentElement.classList.contains("dollarMarkdownText")) {
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