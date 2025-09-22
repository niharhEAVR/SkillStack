## 🔹 14. Check for All or None

* **Regex**: `/colou?r/`
* `?` → zero or one occurrence.

```js
console.log(/colou?r/.test("color"));  // true
console.log(/colou?r/.test("colour")); // true
```

---

## 🔹 15. Positive and Negative Lookahead

* **Positive Lookahead** `(?=...)`

  ```js
  let regex = /q(?=u)/;
  console.log("quit".match(regex)); // ["q"]
  ```

* **Negative Lookahead** `(?!...)`

  ```js
  let regex = /q(?!u)/;
  console.log("qatar".match(regex)); // ["q"]
  ```

---

## 🔹 16. Reuse Patterns Using Capture Groups

* **Regex**: `/(\d+) \1/`
* `(\d+)` → capture digits
* `\1` → backreference (same digits again)

```js
let str = "42 42 100";
console.log(str.match(/(\d+) \1/)); // ["42 42", "42"]
```

---

## 🔹 17. Use Capture Groups to Search and Replace

* **Regex**: `/(\w+)\s(\w+)/`
* Swap first and last word.

```js
let str = "John Doe";
console.log(str.replace(/(\w+)\s(\w+)/, "$2 $1"));
// "Doe John"
```

---

## 🔹 18. Remove Whitespace from Start and End

* **Regex**: `/^\s+|\s+$/g`
* `^\s+` → leading spaces
* `\s+$` → trailing spaces
* `|` → OR

```js
let str = "   hello world   ";
console.log(str.replace(/^\s+|\s+$/g, "")); // "hello world"
```

---

✅ That’s the **complete regex set** you listed — explained with real JS code.
You can literally copy-paste these into a **browser console** or **Node.js** to test.
















## 🔹 14. Check for All or None (`?`)

### Regex

```regex
/colou?r/
```

### Explanation

* `?` means **“zero or one occurrence of the preceding character or group.”**
* In this example:

  * `u?` → the letter `u` can appear **once or not at all**.

### How it works

| String      | Match? | Why                                |
| ----------- | ------ | ---------------------------------- |
| `"color"`   | ✅      | `u` is optional, so it’s fine      |
| `"colour"`  | ✅      | `u` appears once, allowed          |
| `"colouur"` | ❌      | `u` appears **twice**, not allowed |

### Real-world use

* Spell variations: `color/colour`, `gray/grey`
* Optional symbols: `#?` (match a number with or without a `#`)

---

## 🔹 15. Positive and Negative Lookahead

Lookaheads let you **check what comes after a pattern without consuming it**.

### 1️⃣ Positive Lookahead `(?=...)`

* Matches a character **only if** it’s followed by a specific pattern.

```js
let regex = /q(?=u)/;
console.log("quit".match(regex)); // ["q"]
console.log("qatar".match(regex)); // null
```

* `"q"` is matched **only if** followed by `"u"`.
* `"qatar"` fails because `"q"` is **not followed by `"u"`**.

---

### 2️⃣ Negative Lookahead `(?!...)`

* Matches a character **only if it is NOT followed** by a pattern.

```js
let regex = /q(?!u)/;
console.log("qatar".match(regex)); // ["q"]
console.log("quit".match(regex));  // null
```

* `"q"` is matched **only if** it is **not followed by `"u"`**.

---

### Real-world use

* Password checks: must have a character **not followed** by whitespace.
* Validating patterns where something **must or must not follow**.


---
---
---

# 🔹 1. What is a Lookahead?

* Lookahead lets you **check what comes next in a string without including it in the match**.
* Syntax:

  * **Positive Lookahead** → `X(?=Y)` → match `X` **only if it’s followed by `Y`**
  * **Negative Lookahead** → `X(?!Y)` → match `X` **only if it’s NOT followed by `Y`**

> Key idea: Lookahead **doesn’t consume characters**, it just **asserts a condition**.

---

# 🔹 2. Positive Lookahead `(?=...)`

### Example 1: Match “q” only if followed by “u”

```js
let regex = /q(?=u)/g;

console.log("quit".match(regex)); // ["q"]
console.log("qatar".match(regex)); // null
```

* `"q"` in `"quit"` ✅ matched because it is **followed by `u`**
* `"q"` in `"qatar"` ❌ not matched because it is **not followed by `u`**

---

### Example 2: Match numbers only if followed by “kg”

```js
let str = "50kg 70kg 30lbs";
let regex = /\d+(?=kg)/g;

console.log(str.match(regex)); // ["50","70"]
```

* Matches numbers **only when “kg” comes after them**
* `"30"` is ignored because it’s followed by `"lbs"`

---

# 🔹 3. Negative Lookahead `(?!...)`

### Example 1: Match “q” only if NOT followed by “u”

```js
let regex = /q(?!u)/g;

console.log("qatar quit".match(regex)); // ["q"]
```

* `"q"` in `"qatar"` ✅ matched because **not followed by `u`**
* `"q"` in `"quit"` ❌ ignored because **it is followed by `u`**

---

### Example 2: Find numbers **not followed by %**

```js
let str = "50% 70 30% 90";
let regex = /\d+(?!%)/g;

console.log(str.match(regex)); // ["70", "90"]
```

* `"50%"` ❌ ignored
* `"70"` ✅ matched
* `"30%"` ❌ ignored
* `"90"` ✅ matched

---

# 🔹 4. Combine Lookaheads

You can **chain multiple lookaheads** for complex conditions.

### Example: Match passwords with **at least 1 digit and 1 uppercase letter**

```js
let regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

console.log(regex.test("Abc123")); // true ✅
console.log(regex.test("abcdef")); // false ❌ (no uppercase, no digit)
console.log(regex.test("ABCDEF")); // false ❌ (no digit)
```

* `(?=.*[A-Z])` → positive lookahead: at least one uppercase
* `(?=.*\d)` → positive lookahead: at least one digit
* `.{6,}` → password length ≥ 6

---

# 🔹 5. Key Points About Lookahead

| Feature             | Symbol    | Meaning                                                    |
| ------------------- | --------- | ---------------------------------------------------------- |
| Positive Lookahead  | `(?=...)` | Match only if pattern **follows**                          |
| Negative Lookahead  | `(?!...)` | Match only if pattern **does NOT follow**                  |
| Non-consuming       | -         | Lookahead **doesn’t include the checked pattern** in match |
| Multiple lookaheads | -         | Can chain to enforce **multiple conditions**               |

---

# 🔹 6. Real-world Use Cases

1. **Form validation**: password must have digits, symbols, uppercase.
2. **Text processing**: find numbers that are or aren’t followed by units.
3. **Search & replace**: match only certain patterns **without removing following context**.

---
---
---

## 🔹 16. Reuse Patterns Using Capture Groups

### Regex

```regex
/(\d+) \1/
```

### Explanation

* `()` → **capture group**: stores whatever matches inside.
* `\1` → **backreference**: matches **exactly the same text** captured by group 1.

```js
let str = "42 42 100";
console.log(str.match(/(\d+) \1/)); // ["42 42", "42"]
```

* First `(\d+)` matches `"42"`
* `\1` checks that the **next part of the string** is exactly `"42"` again.
* `"100"` does not match because it’s not the same as captured `"42"`.

### Real-world use

* Detect repeated words: `/(\b\w+\b) \1/` → finds `"hello hello"`
* Validate repeated numbers or codes.


---
---

## 🔹 Your Code

```js
let str = "bonta bonta name";
console.log(str.match(/(\b\w+\b) \1/));
```

---

## 🔹 Regex Breakdown

### 1. `(\b\w+\b)`

* `()` → **Capture group #1**. Whatever matches inside these parentheses can be **reused later** using `\1`.
* `\b` → **word boundary**, ensures we match a whole word (not part of a longer word).
* `\w+` → **one or more word characters** (letters, digits, underscore).
* So `(\b\w+\b)` matches a **single word** and **remembers it** as group 1.

### 2. ` ` (space)

* Matches a **literal space** between words.

### 3. `\1`

* **Backreference** to **capture group 1**.
* This means: match **exactly the same word** that was captured before.

---

## 🔹 How It Works on `"bonta bonta name"`

Step by step:

1. First word match `(\b\w+\b)` → `"bonta"` → captured as **group 1**
2. Next, literal space → `" "` → matched
3. Backreference `\1` → match **same word as group 1** → `"bonta"` → matched
4. Result → `"bonta bonta"`

The `"name"` after that does **not affect** the match because it is **after the pattern**.

---

## 🔹 Output

```js
["bonta bonta", "bonta"]
```

* Full match: `"bonta bonta"`
* Capture group 1: `"bonta"`

> The first element of the array is **the entire match**, the second element is **the captured group**.

---

## 🔹 Example 2: Detect repeated words

```js
let str = "hello hello world world hello";
console.log(str.match(/(\b\w+\b) \1/g));
// ["hello hello", "world world"]
```

* Finds repeated **consecutive words** anywhere in the string.
* `g` → global match (finds all occurrences).

---

## 🔹 Key Points About Capture Groups and Backreferences

| Feature       | Symbol          | Meaning                                                |
| ------------- | --------------- | ------------------------------------------------------ |
| Capture group | `( ... )`       | Saves a matched part for later reuse                   |
| Backreference | `\1`, `\2`, ... | Matches **exactly the same text** as the capture group |
| Word boundary | `\b`            | Ensures whole words are matched                        |
| Reuse         | `\1`            | Can enforce repetition or swap words in replacement    |

---

### ✅ Summary

* **Capture groups** store patterns for reuse.
* **Backreferences** allow you to **match the same text again**.
* Very useful for:

  * Detecting repeated words
  * Validating repeated sequences
  * Search & replace operations

---

If you want, I can also **explain the “Swap words using capture groups” example** next — it’s the next step in FreeCodeCamp and shows how to **reuse captured groups in `.replace()`**.

Do you want me to explain that too?









---
---
---

## 🔹 17. Use Capture Groups to Search and Replace

### Regex

```regex
/(\w+)\s(\w+)/
```

* `(\w+)` → first word
* `\s` → space
* `(\w+)` → second word

### Replacement

```js
str.replace(/(\w+)\s(\w+)/, "$2 $1");
```

* `$1` → first capture group
* `$2` → second capture group

```js
let str = "John Doe";
console.log(str.replace(/(\w+)\s(\w+)/, "$2 $1")); // "Doe John"
```

### Real-world use

* Swap first & last names
* Reformat dates: `(\d{4})-(\d{2})-(\d{2})` → `$3/$2/$1`


---
---


## 🔹 Your Code

```js
let str2 = "42 42 42";
console.log(str2.match(/^(\d+)\s\1\s\1$/));
```

---

## 🔹 Regex Breakdown

### 1. `^`

* Matches the **start of the string**.
* Ensures the pattern starts from the very beginning.

### 2. `(\d+)`

* `()` → **Capture group #1**
* `\d+` → **one or more digits**
* This captures the **first number** in the string (here `"42"`).

### 3. `\s`

* Matches a **single whitespace character** (space, tab).

### 4. `\1`

* **Backreference** to **group 1**.
* Matches the **exact same number** that was captured before.

### 5. `\s\1`

* Another space and another backreference → checks the number repeats a **third time**.

### 6. `$`

* Matches the **end of the string**.
* Ensures there’s nothing extra after the third number.

---

## 🔹 How It Works on `"42 42 42"`

1. `(\d+)` → matches `"42"` → captured as **group 1**
2. `\s\1` → matches a space + `"42"` → ✅
3. `\s\1` → matches another space + `"42"` → ✅
4. `$` → ensures no extra characters after `"42"` → ✅

✅ Full match: `"42 42 42"`

---

## 🔹 Output

```js
["42 42 42", "42"]
```

* **Full match:** `"42 42 42"` → first element of array
* **Capture group 1:** `"42"` → second element of array

> The capture group stores the number once, and `\1` **reuses it** for subsequent matches.

---

## 🔹 Key Points

| Symbol | Meaning                                        |
| ------ | ---------------------------------------------- |
| `()`   | Capture a pattern for reuse                    |
| `\1`   | Match **exactly what was captured** in group 1 |
| `\d+`  | One or more digits                             |
| `\s`   | Whitespace character                           |
| `^`    | Start of string                                |
| `$`    | End of string                                  |

---

## 🔹 Example: Different Numbers Fail

```js
console.log("42 43 42".match(/^(\d+)\s\1\s\1$/)); // null
```

* Fails because the second number (`43`) does **not match** the captured `"42"`.

---

### ✅ In Words

> This regex matches a string that contains **exactly three identical numbers separated by spaces**.
>
> * The first number can be any digits.
> * The second and third numbers **must exactly repeat** the first.
> * Nothing else can be in the string.



---
---
---

✅ **Summary**

| Concept                 | Regex                      | What it does                              |                           |
| ----------------------- | -------------------------- | ----------------------------------------- | ------------------------- |
| All or None             | `/colou?r/`                | `u` appears 0 or 1 time                   |                           |
| Positive Lookahead      | `q(?=u)`                   | Match `q` only if followed by `u`         |                           |
| Negative Lookahead      | `q(?!u)`                   | Match `q` only if **not** followed by `u` |                           |
| Capture + Backreference | `/(\d+) \1/`               | Match repeated patterns                   |                           |
| Capture Groups Replace  | `/(\w+)\s(\w+)/` → `$2 $1` | Swap words                                |                           |
