figma.showUI(__html__)
figma.ui.resize(600,240)

figma.ui.onmessage = msg => {
  if (msg.type === 'coolors-url') {
    const nodes = []
    const UrlFromForm = msg.url;
    const regEx = /!@#(){}<>~.,;':/;
    if (UrlFromForm.match(regEx)) {
        console.log('regex triggered')
       document.getElementById('error-message').classList.add('active')
    }
    else {
    let arrOfCollors = UrlFromForm.split('-');
    //set starting position of the rectange to 0
    let pos = 0;

    arrOfCollors.forEach(element => {
      let rgbColor = hexToRgb(element);
      const rect = figma.createRectangle()
      rect.x = pos += 120
      console.log(hexToRgb(element))
      rect.fills = [{type: 'SOLID', color: hexToRgb(element)}]
      figma.currentPage.appendChild(rect)
      nodes.push(rect)
    }, pos);
    
    function hexToRgb(hex) {
      var result = /([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: (parseInt(result[1], 16)*1)/255,
        g: (parseInt(result[2], 16)*1)/255,
        b: (parseInt(result[3], 16)*1)/255
      } : null;
      
    }
  }
    

    figma.currentPage.selection = nodes
    figma.viewport.scrollAndZoomIntoView(nodes)
  }
  figma.closePlugin()
}