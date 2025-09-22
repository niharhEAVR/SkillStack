# 📘 Regex Basics with JS Examples

---

## 🔹 1. Match Literal Strings

* **Regex**: `/Hello/`
* Matches the exact word `"Hello"`.

```js
let str = "Hello world";
console.log(/Hello/.test(str)); // true
```

---

## 🔹 2. Match a Literal String with Different Possibilities

* **Regex**: `/dog|cat|bird/`
* `|` means OR.

```js
let str = "I have a cat";
console.log(/dog|cat|bird/.test(str)); // true
```

---

## 🔹 3. Ignore Case While Matching

* **Regex**: `/hello/i`
* `i` flag = case-insensitive.

```js
console.log(/hello/i.test("Hello")); // true
console.log(/hello/i.test("HELLO")); // true
```

---

## 🔹 4. Extract Matches

* **Regex**: `string.match(/regex/)`
* Gets the match instead of just true/false.

```js
let str = "Extract the word Regex";
console.log(str.match(/Regex/)); // ["Regex"]
```

---

## 🔹 5. Find More Than the First Match

* **Regex**: `/\d/g`
* `g` flag = global (find all matches).

```js
let str = "My numbers are 23 and 42";
console.log(str.match(/\d/g)); // ["2","3","4","2"]
```

---

## 🔹 6. Match Anything with Wildcard Period

* **Regex**: `/hu./`
* `.` matches any single character.

```js
console.log(/hu./.test("hug")); // true ("hu" + g)
console.log(/hu./.test("hum")); // true ("hu" + m)
console.log(/hu./.test("hu"));  // false (needs 1 more char)
```

---

## 🔹 7. Match Single Character with Multiple Possibilities

* **Regex**: `/b[aiu]g/`
* `[aiu]` → match `a`, `i`, or `u`.

```js
let str = "bag big bug bog";
console.log(str.match(/b[aiu]g/g)); // ["bag","big","bug"]
```

---

## 🔹 8. Match Letters of the Alphabet

* **Regex**: `/[a-z]/g`
* `[a-z]` = lowercase letters.

```js
let str = "Hello 123";
console.log(str.match(/[a-z]/g)); // ["e","l","l","o"]
```

---

## 🔹 9. Match Numbers and Letters of the Alphabet

* **Regex**: `/[a-z0-9]/gi`
* `a-z` = letters, `0-9` = digits, `i` = ignore case.

```js
let str = "Hi 123!";
console.log(str.match(/[a-z0-9]/gi)); // ["H","i","1","2","3"]
```

---

## 🔹 10. Match Single Characters Not Specified

* **Regex**: `/[^aeiou]/gi`
* `^` inside `[]` means NOT.

```js
let str = "Hello World";
console.log(str.match(/[^aeiou]/gi)); 
// ["H","l","l"," ","W","r","l","d"]
```

---

## 🔹 11. Match Characters that Occur One or More Times

* **Regex**: `/a+/g`
* `+` → one or more.

```js
let str = "caaat";
console.log(str.match(/a+/g)); // ["aaa"]
```

---

## 🔹 12. Match Characters that Occur Zero or More Times

* **Regex**: `/go*/`
* `*` → zero or more.

```js
console.log("g".match(/go*/));    // ["g"] (zero "o")
console.log("go".match(/go*/));   // ["go"]
console.log("gooo".match(/go*/)); // ["gooo"]
```

---

## 🔹 13. Find Characters with Lazy Matching

* **Regex**: `/t[a-z]*?i/`
* `*?` = lazy match (shortest possible match).

```js
let str = "titanic";
console.log(str.match(/t[a-z]*?i/)); // ["ti"]
// Without "?" → ["titani"]
```

---

# ✅ Summary Table

| Concept          | Regex                | Example Match          |         |
| ---------------- | -------------------- | ---------------------- | ------- |
| Literal String   | `/Hello/`            | `"Hello world"` → true |         |
| OR options       | \`/dog               | cat/\`                 | `"cat"` |
| Ignore case      | `/hello/i`           | `"HELLO"`              |         |
| Extract match    | `str.match(/Regex/)` | `"Regex"`              |         |
| Global search    | `/\d/g`              | `"42"` → \["4","2"]    |         |
| Wildcard         | `/hu./`              | `"hug"`                |         |
| Char set         | `/b[aiu]g/`          | `"bag","bug"`          |         |
| Range a-z        | `/[a-z]/g`           | `"hello"`              |         |
| Letters + digits | `/[a-z0-9]/gi`       | `"Hi123"`              |         |
| Not set          | `/[^aeiou]/gi`       | consonants             |         |
| One or more      | `/a+/`               | `"aaa"`                |         |
| Zero or more     | `/go*/`              | `"g","go","gooo"`      |         |
| Lazy match       | `/t.*?i/`            | `"ti"` in `"titanic"`  |         |

---

👉 These are **foundation blocks**. Once you get comfy with these, you’ll be able to handle more advanced stuff like lookaheads, capture groups, etc.
