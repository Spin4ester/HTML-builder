const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, './styles'), (err, files) => {
  files.forEach(file => {
    // if(!file.isDirectory(file)) 
    
    let x = file.slice(file.length-3,file.length);
    if(x !== 'css') {
      return;
    } else {
    //   let styleArr = [];
      fs.readFile(path.join(__dirname, './styles', file), (err, style) => {
        if (err) throw err;
        //   styleArr += styleArr.push(buff.toString().slice(1)); 
        createBundle(style);
      });   
    }
  });
});

function createBundle(file) {
  fs.open(path.join(__dirname, './project-dist', 'bundle.css'),
    'w',
    err => {
      if (err) throw err;
    }
  );

  fs.appendFile(path.join(__dirname, './project-dist', 'bundle.css'), file, (err) => {
    if (err) throw err;
    console.log('Styles created');
  });
}