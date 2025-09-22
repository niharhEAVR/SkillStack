# 📘 JavaScript Regex Cheatsheet with Explanations & Examples

---

## 🔹 1. Find One or More Criminals in a Hunt

* **Regex**: `/C+/g`
* `C+` → one or more `C` characters.

```js
let criminals = "P1P5P4CCCcP2";
console.log(criminals.match(/C+/g)); // ["CCC"]
```

---

## 🔹 2. Match Beginning String Patterns

* **Regex**: `/^Hello/`
* `^` → anchors the match to the **start** of the string.

```js
let str = "Hello world";
console.log(/^Hello/.test(str)); // true
console.log(/^world/.test(str)); // false
```

---

## 🔹 3. Match Ending String Patterns

* **Regex**: `/world$/`
* `$` → anchors the match to the **end** of the string.

```js
let str = "Hello world";
console.log(/world$/.test(str)); // true
console.log(/Hello$/.test(str)); // false
```

---

## 🔹 4. Match All Letters and Numbers

* **Regex**: `/\w+/g`
* `\w` → matches letters, digits, and underscore (`[A-Za-z0-9_]`).

```js
let str = "Regex123_is_cool!";
console.log(str.match(/\w+/g)); // ["Regex123_is_cool"]
```

---

## 🔹 5. Match Everything But Letters and Numbers

* **Regex**: `/\W+/g`
* `\W` → opposite of `\w` (matches spaces, punctuation, symbols).

```js
let str = "Regex123_is_cool!";
console.log(str.match(/\W+/g)); // ["!"]
```

---

## 🔹 6. Match All Numbers

* **Regex**: `/\d+/g`
* `\d` → digit (`0-9`).

```js
let str = "Room 123 is on floor 4";
console.log(str.match(/\d+/g)); // ["123", "4"]
```

---

## 🔹 7. Match All Non-Numbers

* **Regex**: `/\D+/g`
* `\D` → non-digit.

```js
let str = "Room 123 is on floor 4";
console.log(str.match(/\D+/g)); 
// ["Room ", " is on floor "]
```
