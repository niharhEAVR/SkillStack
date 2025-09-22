let word = "My name is Bond, James Bond.";
let pattern = /Bond/;
let pattern2 = /Bond/gi; // g - global, i - case insensitive

let result = word.match(pattern);
console.log(result);

let result2 = word.match(pattern2);
console.log(result2); 

let result3 = pattern.test(word); // if match found, returns true or false
console.log(result3);


// extract matches
let text = "The rain in SPAIN stays mainly in the plain";
let pattern3 = /..ain/gi; // if anthing is finish with ain
let result4 = text.match(pattern3);
console.log(result4); 

// match single caharacter with multiple posibility

let text2 = "The rain in SPAIN stays mainly in the plain";
let pattern4 = /[spr]ain/gi; // if anthing is finish with ain and start with s or p or r
let pattern5 = /[aeiou]/gi; // match all vowels
let result5 = text2.match(pattern4);
let result6 = text2.match(pattern5);
console.log(result5);
console.log(result6);


// alphabet regex
let text3 = "The rain in SPAIN stays mainly in the plain";
let pattern6 = /[a-z]/g; // match all lowercase alphabet    
let result7 = text3.match(pattern6);
console.log(result7);

// numbers regex
let text4 = "pi is approximately 3.14159";
let pattern7 = /[0-9]/g; // match all numbers
let result8 = text4.match(pattern7);
console.log(result8);

// numbers + alphabet regex
let text5 = "pi is approximately 3.14159";
let pattern8 = /[g-x5-6]/gi; // match all numbers + alphabet
let result9 = text5.match(pattern8);
console.log(result9);