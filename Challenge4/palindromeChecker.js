//readline module is used for reading and handling the data
const readline = require('readline').createInterface({
  input: process.stdin,        //standard input stream typically the keyboard
  output: process.stdout       // standard output stream typically the console
});

//callback function is used inside readline.question method to check if pallindrome or not
readline.question('Enter a string: ', (str) => {
  const isPalindrome = (str) => {
    const strToCompare = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();      //if character is non-alphanumeric then replace with '' and then covert to lowercase
    const reverseStr = strToCompare.split('').reverse().join('');             //split the string and reverse it for comapre
    return strToCompare === reverseStr;
  };

  if (isPalindrome(str)) {
    console.log(`The string '${str}' is a palindrome.`);
  } else {
    console.log(`The string '${str}' is not a palindrome.`);
  }

  //close the readline interface
  readline.close();
});
