const fs = require('fs');
const math = require('mathjs');

// Function to evaluate arithmetic expressions in a file
const evalExpressions = (inputFile, outputFile) => {
  //read the content of the file asynchronously 
  fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading input file:', err);
      return;
    }

    // split the content into an array 
    const lines = data.split('\n');
    const results = lines.map(line => {
      //if line is empty it returns empty string
      if (line.trim() === '') return '';
      
      const variable = line.replace('=', '').trim();
      let result;

      try {
        result = math.evaluate(variable);
      } catch (error) {
        result = 'Error';
      } 

      //after evaluation,original string and result are combined into a single string
      return `${line.trim()} ${result}`;
    });

    fs.writeFile(outputFile, results.join('\n'), 'utf8', (err) => {
      if (err) {
          console.error('Error writing output file:', err);
        } else {
          console.log('Results written to', outputFile);
        }
      });
  });
};

evalExpressions('input.txt', 'output.txt');
