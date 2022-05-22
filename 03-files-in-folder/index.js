const fs = require('fs');
const path = require('path');
// const { stdout, stdin } = process;


fs.readdir(path.join(__dirname, './secret-folder'), {withFileTypes: true}, (err, files) => {
  if (err)
    console.log(err);
  else {
    console.log('\nSecret directory filenames:');
    files.forEach(file => {
        
      if(!file.isDirectory(file)) {
        
        let fileName = file.name;
        let xtn = path.extname(`./__dirname/secret-folder/${file.name}`).slice(1);
        
        fs.stat(`./03-files-in-folder/secret-folder/${file.name}`, (error, stats) => {
          if (error) {
            console.log(error);
          }
          else {            
            console.log(fileName + ' ' + '-' + ' ' + xtn + ' ' + '-' + ' ' + stats.size/1000 + 'kb'); 
          }   
        });
      }   
    }
    );
  }
});
