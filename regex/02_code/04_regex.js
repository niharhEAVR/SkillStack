{
    // Restrict Possible Usernames
    console.log(/^[A-Za-z][A-Za-z0-9_]{2,}$/.test("user123")); // true
    console.log(/^[A-Za-z][A-Za-z0-9_]{2,10}$/.test("user5678000000000"));  // false
    console.log(/^[A-Za-z][A-Za-z0-9_]{2,}\d*/.test("us8"));  // false
}

{
    // Match Whitespace
    let str = "Hello   World";
    console.log(str.match(/\s+/g)); // ["   "]
}

{
    // Match non-Whitespace
    let str = "Hello   World";
    console.log(str.match(/\S+/g)); // ["   "]
}

{
    //Specify Upper and Lower Number of Matches
    let str = "aaaah";
    console.log(str.match(/a{2,4}/g)); 
}

{
    //Specify Upper and Lower Number of Matches
    let str = "aaaah";
    console.log(str.match(/a{2,}/g)); 
    console.log(str.match(/a{2}/g)); 
}