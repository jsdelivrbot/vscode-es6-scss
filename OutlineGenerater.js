'use strict'

var fs = require('fs');
read('src/scss/main.scss')
function read(filePath) {
  var content = new String();
    content = fs.readFileSync(filePath, 'utf8');
    let regexp = /\[.+\]/gmi;
    const map1 = content.match(regexp);
    for(let i = 0,length = map1.length; i < length; i++){
      map1[i] = i + '.' + map1[i] + '\n';
      if(i === length - 1){
        map1[i + 1] = '*/\n\n' + content;
      }
    }
    map1[0] = '/*\n' + map1[0];
    fs.writeFileSync(filePath,map1);
    console.log(map1);
  return content;
};
