const fs = require('fs');
// const fse = require('fs-extra');
const path = require('path');
const pathFile = path.join(__dirname, './files');
const pathFileCopy = path.join(__dirname, './files-copy');

function copyDir() {


  fs.exists(pathFileCopy, exists => {
    if (!exists) {
      fs.mkdir(pathFileCopy, err => {
        if (err) throw err;
      });
    }
  }  
  );
  
  fs.readdir(pathFile, (err, files) => {
    if (err) throw err;
    for (let i = 0; i < files.length; i++) {
      fs.copyFile(path.join(__dirname, 'files', files[i]), path.join(__dirname, 'files-copy', files[i]),
        err => {
          if (err) throw err;
        }
      ); 
    }
  }
  );   
}
  
copyDir();

