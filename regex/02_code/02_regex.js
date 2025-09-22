// match single character not specified in the bracket
{
    let text = "the value of pi is approximately 3.14159";
    let pattern = /[^0-9aeiou]/gi; // match all except vowels and numbers
    // ^ inside the bracket means NOT
    let result = text.match(pattern);
    console.log(result);
}


{
    let text = "mississipspi";
    let pattern = /[s+]/gi; // match s one or more times
    // + means one or more times
    let result = text.match(pattern);
    console.log(result);
}

{
    // match character that occurs 0  or more times
    let text = "goooooooooooooooooooooooooal";
    let pattern = /[go*]/g; // match o zero or more times
    // * means zero or more times
    let result = text.match(pattern);
    console.log(result);
}

{
    // greedy and lazy matching
    let text = "<h1> This is heading </h1> <p> This is paragraph </p>";
    let pattern = /<.*>/g; // greedy matching
    let pattern2 = /<.*?>/g; // lazy matching
    // .* means match anything between < and >
    // ? after * makes it lazy (match as little as possible)
    let result = text.match(pattern);
    let result2 = text.match(pattern2);
    console.log(result);
    console.log(result2);

    let text2 = "titanic";
    let pattern3 = /t[a-z]*i/; // greedy matching
    let pattern4 = /t[a-z]*?i/; // lazy matching
    // [a-z]* means match anything between t and i
    // ? after * makes it lazy (match as little as possible)
    let result3 = text2.match(pattern3);
    let result4 = text2.match(pattern4);
    console.log(result3);
    console.log(result4);
}

{
    let text2 = "p1p2p3p4p5cccp6p7ccp8p9";
    let pattern2 = /c+/g;
    // c+ means match c one or more times
    let result2 = text2.match(pattern2);
    console.log(result2);
}