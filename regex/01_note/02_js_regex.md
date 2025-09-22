
# 🔹 1. Two Ways to Write Regex in JS

### (a) **Regex Literal**

```js
let pattern = /cat/;
```

### (b) **RegExp Constructor**

```js
let pattern = new RegExp("cat");
```

👉 Both mean: *match the word “cat”*.

---

# 🔹 2. Basic Regex Methods in JS

### 1. **`test()`** → returns true/false

```js
let regex = /dog/;
console.log(regex.test("My dog is cute"));  // true
console.log(regex.test("My cat is cute"));  // false
```

---

### 2. **`exec()`** → returns match details

```js
let regex = /cat/;
console.log(regex.exec("The cat ran away"));
// Output: ["cat", index: 4, input: "The cat ran away", groups: undefined]
```

---

### 3. **`string.match()`** → get all matches

```js
let text = "The rain in Spain";
console.log(text.match(/ain/g));  // ["ain", "ain"]
```

---

### 4. **`string.search()`** → get index of first match

```js
let text = "The rain in Spain";
console.log(text.search(/rain/));  // 4
```

---

### 5. **`string.replace()`** → replace text

```js
let text = "I love cats";
let newText = text.replace(/cats/, "dogs");
console.log(newText);  // I love dogs
```

---

# 🔹 3. Flags in JS Regex

Flags modify how regex works.

* `g` → global (match all, not just first)
* `i` → case insensitive
* `m` → multiline
* `u` → unicode
* `s` → dotall (`.` matches newline too)

Example:

```js
let text = "Cat cat CAT";
console.log(text.match(/cat/gi));  // ["Cat", "cat", "CAT"]
```

---

# 🔹 4. Examples to Practice in JS

✅ Match a **10-digit number** (like phone number):

```js
let phone = "My number is 9876543210";
console.log(phone.match(/\d{10}/)); // ["9876543210"]
```

✅ Match an **email address**:

```js
let email = "hello@example.com";
console.log(email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i));
// ["hello@example.com"]
```

✅ Replace all spaces with `-`:

```js
let str = "hello world javascript regex";
console.log(str.replace(/\s+/g, "-"));
// hello-world-javascript-regex
```

---

# 🔹 5. How You Should Start Practicing

1. Open **browser console** (`F12 → Console`).
2. Try small patterns with `test()` and `match()`.
3. Use **regex101.com** → paste regex and see matches live.
4. Practice real tasks:

   * Validate phone numbers/emails.
   * Extract hashtags from a string.
   * Replace multiple spaces with one.
   * Find all capitalized words in a paragraph.

---

👉 So regex in JS is **not separate**, it’s just part of the language with built-in support. Once you learn the basic patterns, you can reuse them in Python, Nginx, or anywhere.
