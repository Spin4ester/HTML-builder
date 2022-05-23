const fs = require('fs');
const path = require('path');


//! COPY DIRECTORY


function cloneDir(origDir, copyDir) {

  fs.rm(copyDir, { recursive: true, force: true }, (err) => {
    if (err) throw err;
    
    fs.mkdir(copyDir, { recursive: true }, () => {});
  
    fs.readdir(origDir, { withFileTypes: true }, (_, files) => {
      files.forEach((file) => {
  
        const fileName = file.name;
        const fileOrigPath = path.join(origDir, fileName);
        const fileCopyPath = path.join(copyDir, fileName);
    
        //checking if file or folder
        if (file.isFile()) {
          fs.promises.copyFile(fileOrigPath, fileCopyPath);
        } else {
          cloneDir(fileOrigPath, fileCopyPath);
        }
      });
    });
  });
}


//! HMTL Bundle

async function bundleHTML() {
  const template = await fs.promises.readFile(
    path.join(__dirname, './template.html')
  );
  
  let templateInner = template.toString();
  
  const components = await fs.promises.readdir(
    path.join(__dirname, './components')
  );
  
  for (const comp of components) {
    const compPath = path.join(__dirname, './components', comp);
    const compInner = await fs.promises.readFile(compPath);
    const compName = comp.split('.')[0];
    const compValue = compInner.toString();
    templateInner = templateInner.replace(`{{${compName}}}`, compValue);
  }

  await fs.promises.writeFile(
    path.join(__dirname, './project-dist', '/index.html'), templateInner);
}


//! CREATING CSS FILE

function bundleStyles() {

  fs.readdir(path.join(__dirname, './styles'), (err, files) => {
    files.forEach(file => {
      let x = file.slice(file.length-3,file.length);
      if(x !== 'css') {
        return;
      } else {
        
        fs.readFile(path.join(__dirname, './styles', file), (err, style) => {
          if (err) throw err;
         
          createBundle(style);
        });   
      }
    });
  });
    
  function createBundle(file) {
    fs.open(path.join(__dirname, './project-dist', '/style.css'),
      'w',
      err => {
        if (err) throw err;
      }
    );
    
    fs.appendFile(path.join(__dirname, './project-dist', 'style.css'), file, (err) => {
      if (err) throw err;
      console.log('Styles created');
    });
  }
}
  
//! Final build

function htmlBuild() {
  fs.promises.mkdir(path.join(__dirname, './project-dist'), {recursive: true});
  cloneDir(
    path.join(__dirname, './assets'),
    path.join(__dirname, './project-dist', '/assets')
  );
  bundleHTML();
  bundleStyles();
}

htmlBuild();