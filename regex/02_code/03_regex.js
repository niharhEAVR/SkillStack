{
    // Match Beginning String Patterns
    let str = "Hello world";
    console.log(/^Hello/.test(str)); // true
    console.log(/^world/.test(str)); // false
    // it will checks the start 
}

{
    // Match Ending String Patterns
    let str = "Hello world";
    console.log(/world$/.test(str)); // true
    console.log(/Hello$/.test(str)); // false
    // it will checks the end 
}

{
    // Match All Letters and Numbers
    let str = "Regex123_is_cool!";
    console.log(str.match(/\w/g)); // it is a short hand way of using that [a-z0-9]
    console.log(str.match(/\w/g).length);
    console.log(str.match(/\w/g).length);
}

{
    // Match Everything But Letters and Numbers
    let str = "Regex123_is_cool!";
    console.log(str.match(/\W+/g)); // this will not include letters and numbers
}

{
    // Match All Numbers
    let str = "Room 123 is on floor 4";
    console.log(str.match(/\d/g)); // single match
    console.log(str.match(/\d+/g)); // grouped match
}

{
    //Match All Non-Numbers
    let str = "Room 123 is on floor 4";
    console.log(str.match(/\D/g)); // single match 
    console.log(str.match(/\D+/g)); // grouped match
}