## 🔹 18. Remove Whitespace from Start and End

### Regex

```regex
/^\s+|\s+$/g
```

### Explanation

* `^` → start of string
* `\s+` → one or more whitespace
* `$` → end of string
* `|` → OR

So this pattern matches:

1. Leading whitespace (`^\s+`)
2. Trailing whitespace (`\s+$`)

```js
let str = "   hello world   ";
console.log(str.replace(/^\s+|\s+$/g, "")); // "hello world"
```

### Real-world use

* Clean user input
* Trim extra spaces from CSV or log files



---
---
---

## 🔹 Example 1: Leading spaces

```js
let str = "    Hello World";
console.log(str.replace(/^\s+|\s+$/g, ""));
// Output: "Hello World"
```

* Matches the **4 spaces at the start** (`^\s+`) and removes them.

---

## 🔹 Example 2: Trailing spaces

```js
let str = "Hello World     ";
console.log(str.replace(/^\s+|\s+$/g, ""));
// Output: "Hello World"
```

* Matches the **5 spaces at the end** (`\s+$`) and removes them.

---

## 🔹 Example 3: Both leading and trailing spaces

```js
let str = "   Hello World   ";
console.log(str.replace(/^\s+|\s+$/g, ""));
// Output: "Hello World"
```

* Regex removes **all spaces at start and end**.

---

## 🔹 Example 4: Tabs and newlines

```js
let str = "\t\n  Hello World \n\t";
console.log(str.replace(/^\s+|\s+$/g, ""));
// Output: "Hello World"
```

* `\s` matches **spaces, tabs (\t), newlines (\n)**.
* Both **leading and trailing whitespace** is removed.

---

## 🔹 Example 5: Multiple words with extra spaces

```js
let str = "    JavaScript   is   fun   ";
console.log(str.replace(/^\s+|\s+$/g, ""));
// Output: "JavaScript   is   fun"
```

* Only **leading and trailing spaces** are removed.
* Spaces **between words remain intact**.

---

## 🔹 Example 6: String with only whitespace

```js
let str = "     ";
console.log(str.replace(/^\s+|\s+$/g, ""));
// Output: "" (empty string)
```

* All characters are whitespace → removed completely.

---

## 🔹 Example 7: Using `.trim()` vs regex

```js
let str = "   Hello World   ";
console.log(str.trim());                 // "Hello World"
console.log(str.replace(/^\s+|\s+$/g, "")); // "Hello World"
```

* `.trim()` is simpler for standard whitespace.
* Regex is **more flexible** for advanced patterns (e.g., only tabs, or only spaces at start/end).

---

### ✅ Key Notes

1. `/^\s+/` → removes **leading whitespace**
2. `/\s+$/` → removes **trailing whitespace**
3. `|` → removes **both in one regex**
4. `\s` → matches **space, tab, newline**
5. `g` → global, ensures **all matches** are replaced

---
---
---



## 🔹 Your Code

```js
let str = "hello world";
console.log(str.replace(/(^\w+)\s(\w+)/, "$2 $1")); 
// Output: "world hello"
```

---

## 🔹 Regex Breakdown

### 1. `(^\w+)`

* `()` → **Capture group #1**
* `^` → start of string
* `\w+` → one or more word characters (letters, digits, underscore)
* ✅ Matches the **first word** `"hello"` and stores it as **group 1**

### 2. `\s`

* Matches **a single space** between the words

### 3. `(\w+)`

* `()` → **Capture group #2**
* `\w+` → one or more word characters
* ✅ Matches the **second word** `"world"` and stores it as **group 2**

---

## 🔹 Replacement Part: `"$2 $1"`

* `$1` → refers to **capture group 1** (`"hello"`)
* `$2` → refers to **capture group 2** (`"world"`)
* `"$2 $1"` → **swap the first and second word**

### Step-by-step

1. First word (`"hello"`) → group 1
2. Second word (`"world"`) → group 2
3. Replace `"hello world"` with `"world hello"`

---

## 🔹 Output

```js
"world hello"
```

---

## 🔹 Example 2: Names

```js
let name = "John Doe";
console.log(name.replace(/(^\w+)\s(\w+)/, "$2 $1")); 
// Output: "Doe John"
```

* Same logic: first name and last name are **swapped**.

---

## 🔹 Key Points

| Symbol     | Meaning                                |
| ---------- | -------------------------------------- |
| `()`       | Capture group                          |
| `^`        | Start of string                        |
| `\w+`      | One or more word characters            |
| `\s`       | Space between words                    |
| `$1`, `$2` | Refer to capture groups in replacement |

---

### ✅ Summary

* **Capture groups** store parts of the match.
* **Backreferences in replacement (`$1`, `$2`)** let you **reorder or reuse matched text**.
* This technique is perfect for **swapping words, names, or reformatting text**.