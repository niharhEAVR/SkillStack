{
    // Check for All or None
    console.log(/colou?r/.test("color"));  // true
    console.log(/colou?r/.test("colour")); // true
}

{
    // Positive  Lookahead
    let regex = /q(?=u)/;
    console.log("quit".match(regex));
    console.log("qatar".match(regex));
}
{
    // and Negative lookahead
    let regex = /q(?!u)/;
    console.log("qatar".match(regex));
    console.log("quit".match(regex));
}

{
    // more of lookahed
    let regex = /(?=\w{5})(?=\D*\d{2})/;
    console.log(regex.test("kayparker@1986"));

    // \w{5} → at least 5 word characters (letters, digits, or underscore).
    // Meaning: The string must contain at least 5 word characters starting from this position.

    // \D* → zero or more non-digit characters
    // \d{2} → at least two digits
    // Meaning: The string must contain at least two digits, possibly separated by non-digit characters.
}


{
    // Reuse Patterns Using Capture Groups
    let str = "bonta bonta name";
    console.log(str.match(/(\b\w+\b) \1/));

    let str2 = "42 42 42";
    console.log(str2.match(/^(\d+)\s\1\s\1$ /));
}