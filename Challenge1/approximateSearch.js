const fs = require('fs');
const readlineSync = require('readline-sync');

// this function read words from a file and return them as an array
const readWordsFromFile = (file) => {
  try {
    const data = fs.readFileSync(file, 'utf8');
    return data.split('\n').map(word => word.trim()).filter(word => word.length > 0);
  } catch (error) {
    console.error('Error reading file:', error);
    return [];
  }
};

// Function to find the top k similar words
const findSimilar = async (word, wordsList, k) => {
  //sorts the words   and returns the top k similar words.
  const { default: leven } = await import('leven');
  
  return wordsList
    .map(w => ({ word: w, distance: leven(word, w) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, k)
    .map(obj => obj.word);
};


const approximateSearch = async (file, k) => {
  const wordsList = readWordsFromFile(file);

  if (wordsList.length === 0) {
    console.log('No words to search.');
    return;
  }

  while (true) {
    const inputWord = readlineSync.question('Input: ');
    if (inputWord.trim().length === 0) {
      console.log('Empty input. Exiting.');
      break;
    }

    const similarWords = await findSimilar(inputWord.trim(), wordsList, k);
    console.log('Output: ', similarWords.join(', '));
  }
};

//first user to enter the value of k 
const k= readlineSync.question('Enter k: ');

//I have taken words.txt file in which all dictionary words are written and approximate search is done according to the strings written in this txt file, you can implement this 
//by change these strings accordingly.
approximateSearch('words.txt', k);
