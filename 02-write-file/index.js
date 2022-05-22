const fs = require('fs');
const path = require('path');
const { stdout, stdin } = process;

fs.writeFile(path.join(__dirname, 'text.txt'), '', function (err) {
  if (err) throw err;
  console.log('Please, enter your text here\n');
});



stdin.on('data', data => {

  if(data.toString().trim() === 'exit') {
    stdout.write('Bye bye');
    process.exit();
  } else {fs.appendFile(
    path.join(__dirname, 'text.txt'),
    data,
    err => {
      if (err) throw err;
      stdout.write('Please, add more of your text here\n');
    }
  );
  }
});

process.on('SIGINT', () => {
  stdout.write('Bye Bye');
  process.exit();
});

