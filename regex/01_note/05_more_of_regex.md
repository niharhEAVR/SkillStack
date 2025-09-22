## 🔹 8. Restrict Possible Usernames

# 🔹 Common Rules for Usernames

Typical restrictions:

1. Must **start with a letter** (not a number/symbol).
2. Can contain **letters, numbers, underscore**.
3. Minimum length (e.g. 3 characters).
4. Sometimes cannot **end with a number** (depends on rules).

Regex can enforce these rules.

---

# 🔹 Example Regex Pattern

```regex
^[A-Za-z][A-Za-z0-9_]{2,}$
```

---

## 🔎 Explanation

* `^` → start of string
* `[A-Za-z]` → must start with a **letter**
* `[A-Za-z0-9_]` → after that, only **letters, numbers, or underscore** allowed
* `{2,}` → at least 2 more characters (so total ≥ 3)
* `$` → end of string
* **`\d*`** → Zero or more digits at the **end** of the string.
  - ✅ Means usernames can **optionally** end with numbers.

So usernames are **at least 3 characters** and look like: `abc`, `user_01`, etc.

---

# 🔹 JavaScript Example

```js
let usernameRegex = /^[A-Za-z][A-Za-z0-9_]{2,}$/;

console.log(usernameRegex.test("abc"));       // true ✅
console.log(usernameRegex.test("user_01"));   // true ✅
console.log(usernameRegex.test("a1b2c3"));    // true ✅

console.log(usernameRegex.test("12abc"));     // false ❌ (starts with number)
console.log(usernameRegex.test("ab"));        // false ❌ (too short)
console.log(usernameRegex.test("a!@#"));      // false ❌ (special chars not allowed)
```

---

# 🔹 More Variations

### 1. No Numbers at the End

```regex
^[A-Za-z][A-Za-z0-9_]*[A-Za-z]$
```

👉 must start **and** end with a letter.

```js
let regex = /^[A-Za-z][A-Za-z0-9_]*[A-Za-z]$/;

console.log(regex.test("user1"));   // false ❌ (ends with number)
console.log(regex.test("user_"));   // false ❌ (ends with underscore)
console.log(regex.test("userX"));   // true ✅
```

---

### 2. Allow Only Letters & Numbers (no underscore)

```regex
^[A-Za-z][A-Za-z0-9]{2,}$
```

```js
console.log(/^[A-Za-z][A-Za-z0-9]{2,}$/.test("user01")); // true ✅
console.log(/^[A-Za-z][A-Za-z0-9]{2,}$/.test("user_01")); // false ❌
```

---

### 3. Length Restriction (3–15 characters)

```regex
^[A-Za-z][A-Za-z0-9_]{2,14}$
```

👉 starts with a letter, total length 3–15.

```js
console.log(/^[A-Za-z][A-Za-z0-9_]{2,14}$/.test("abc"));          // true ✅
console.log(/^[A-Za-z][A-Za-z0-9_]{2,14}$/.test("abcdefghijklmnop")); // false ❌ (too long)
```

---

# 🔹 Summary

* `^` … `$` → anchor to start & end (whole string must match).
* `[A-Za-z]` → force starting letter.
* `[A-Za-z0-9_]` → allowed characters after that.
* `{min,max}` → length control.
* Variations:

  * Allow/don’t allow underscore.
  * Disallow ending with number.
  * Limit total length.

---

👉 In real-world applications (like signup forms), regex is usually combined with **backend checks** for extra safety.

---
---
---



## 🔹 9. Match Whitespace

* **Regex**: `/\s+/g`
* `\s` → whitespace (space, tab, newline).

```js
let str = "Hello   World";
console.log(str.match(/\s+/g)); // ["   "]
```

---

## 🔹 10. Match Non-Whitespace Characters

* **Regex**: `/\S+/g`
* `\S` → non-whitespace.

```js
let str = "Hi 123!";
console.log(str.match(/\S+/g)); // ["Hi", "123!"]
```

---

## 🔹 11. Specify Upper and Lower Number of Matches

* **Regex**: `/a{2,4}/`
* `{min,max}` → between 2 and 4 occurrences.

```js
let str = "aaaah";
console.log(str.match(/a{2,4}/g)); // ["aaaa"]
```

---

## 🔹 12. Specify Only the Lower Number of Matches

* **Regex**: `/a{3,}/`
* `{3,}` → 3 or more occurrences.

```js
let str = "aaaaaaaah";
console.log(str.match(/a{3,}/g)); // ["aaaaaaaa"]
```

---

## 🔹 13. Specify Exact Number of Matches

* **Regex**: `/a{5}/`
* `{5}` → exactly 5 times.

```js
let str = "aaaaah";
console.log(str.match(/a{5}/g)); // ["aaaaa"]
```

---

# 🎯 Concept: Quantifier `{min,max}`

In regex, you can **control how many times a pattern should repeat** using curly braces:

* **`{n}`** → exactly `n` times
* **`{n,}`** → at least `n` times
* **`{n,m}`** → between `n` and `m` times

---

## 🔹 Example 1: Exact Matches

```js
let word = "hello";
console.log(/l{2}/.test(word)); // true (because "ll")
console.log(/l{3}/.test(word)); // false (no "lll")
```

---

## 🔹 Example 2: Lower & Upper Bound

```js
let str = "haaaappy";

console.log(/a{2,4}/.test(str)); 
// true → "aaa" is between 2 and 4 'a's in a row

console.log(/a{5,6}/.test(str)); 
// false → no sequence of 5 or 6 'a's
```

---

## 🔹 Example 3: At Least a Number

```js
let laugh = "hahahaha";

console.log(/ha{2,}/.test(laugh)); 
// true → there are places where "a" repeats 2 or more times

console.log(/ha{5,}/.test(laugh)); 
// false → no place where "a" repeats 5+ times
```

---

## 📌 Real-World Use Cases

1. **Password validation** → at least 8 characters

   ```js
   let pass = "mypassword123";
   console.log(/^.{8,}$/.test(pass)); // true (length ≥ 8)
   ```

2. **Phone number length check** → exactly 10 digits

   ```js
   console.log(/^\d{10}$/.test("9876543210")); // true
   ```

3. **Usernames with specific length** → 3–12 chars

   ```js
   console.log(/^[A-Za-z0-9_]{3,12}$/.test("User_99")); // true
   ```

---

✅ So **“Specify Upper and Lower Number of Matches”** means you’re setting *how many times a character/pattern is allowed to repeat* in a string.

---

**How the `{min,max}` quantifier works specifically with the `match()` method in JavaScript**? Let’s clarify step by step.

---

# 🔹 `match()` + `{min,max}`

The `string.match(regex)` method **returns all occurrences** that match your regex pattern. When you use `{min,max}`, it controls **how many times the character or group repeats in a match**.

---

## Example 1: Match repeated letters

```js
let str = "caaat caaat caaaat cat";
let matches = str.match(/a{2,3}/g); 
console.log(matches); // ["aa", "aaa", "aaa"]
```

**Explanation:**

* `/a{2,3}/g` → matches `"a"` repeated **2 to 3 times**
* `"caaat"` → matches `"aa"`
* `"caaat"` (with 3 a's) → matches `"aaa"`
* `"caaaat"` → matches `"aaa"` (the first 3 a's, lazy match)
* `"cat"` → does **not** match (only 1 a)

---

## Example 2: Match digits in a number string

```js
let numbers = "123 4567 89 12345";
let matches = numbers.match(/\d{2,4}/g);
console.log(matches); // ["12", "34", "4567", "89", "1234"]
```

**Explanation:**

* `\d{2,4}` → match **2 to 4 digits**
* It splits longer sequences into valid chunks based on the `{min,max}` range.

---

## Example 3: Combine with letters (like usernames)

```js
let usernames = "ab abc abcd abcdef";
let matches = usernames.match(/[a-z]{3,5}/g);
console.log(matches); // ["abc", "abcd", "abcde"]
```

**Explanation:**

* `[a-z]{3,5}` → match sequences of letters **3 to 5 long**
* `"ab"` → ignored (too short)
* `"abc"` → matched
* `"abcd"` → matched
* `"abcdef"` → matched only first 5 letters (`"abcde"`)

---

✅ Key points:

1. `{min,max}` controls **length of a repeated pattern**.
2. `match()` finds **all occurrences** that satisfy that repetition.
3. Longer sequences may be **split into multiple matches** depending on your `{min,max}`.