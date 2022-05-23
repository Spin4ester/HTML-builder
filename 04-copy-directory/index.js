const fs = require('fs');
const path = require('path');
const origDir = path.join(__dirname, './files');
const copyDir = path.join(__dirname, './files-copy');



fs.readdir(__dirname, (err) => {
  if (err) throw err;
  fs.rm(copyDir, { recursive: true, force: true }, (err) => {
    if (err) throw err;
    fs.mkdir(copyDir, { recursive: true }, (err) => {
      if (err) throw err;
    });

    fs.readdir(origDir, (err, files) => {
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
  });
});


