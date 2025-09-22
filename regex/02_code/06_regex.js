{
    // Remove Whitespace from Start and End
    let str = "   hello world   ";
    console.log(str.replace(/^\s+|\s+$/g, "")); // "hello world"
}

{
    // Remove Whitespace from Start and End
    let str = "hello world";
    console.log(str.replace(/(^\w+)\s(\w+)/, "$2 $1")); // "hello world"
}