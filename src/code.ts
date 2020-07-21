figma.showUI(__html__)
figma.ui.resize(400,220)

figma.ui.onmessage = msg => {
  //
  if (msg.type === 'coolors-url') {

    let urlForSamleTesting = msg.url;
    let urlSample = urlForSamleTesting.substring(0,13); //Sample first 13 characters on the input
    const regexTest = /^([a-f0-9]{6})\-([a-f0-9]{6})/ //tamplete regex of at 2 first colours ie. ffffff-ffffff
    
    if(urlSample == 'https://coolo' || regexTest.test(urlSample)) {
      const nodes = []
      const UrlFromForm = msg.url;
      //Triming the link from domain by sliting on / then poping the argument colors and spliting them by -
      let arrOfCollors = UrlFromForm.split('/').pop().split('-');
      const groupName = 'CLRS - ' + arrOfCollors.toString();
      //set starting position of the rectange to 0
      let pos = 0;
      arrOfCollors.forEach((element:string) => {
        const rect = figma.createRectangle()
        rect.x = pos += 120
        console.log(hexToRgb(element))
        rect.fills = [{type: 'SOLID', color: hexToRgb(element)}]
        rect.name = '#' + element;
        figma.currentPage.appendChild(rect)
        nodes.push(rect)
      }, pos);
        
      let groupedPallete = figma.group(nodes, figma.currentPage,1)
      const groupNode = [];
      groupedPallete.name = groupName;
      
      groupNode.push(groupedPallete);

      function hexToRgb(hex:string) {
        var result = /([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: (parseInt(result[1], 16)*1)/255,
          g: (parseInt(result[2], 16)*1)/255,
          b: (parseInt(result[3], 16)*1)/255
        } : null;
      }
      
      figma.currentPage.selection = groupNode
      figma.viewport.scrollAndZoomIntoView(nodes)
      figma.closePlugin()
    }
    else{
      figma.closePlugin()
    }
   
  }
  
}
