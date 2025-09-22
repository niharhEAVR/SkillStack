Email validation with regex is a **classic example**, and it can get **simple or very complex** depending on how strict user want it.

---

## 🔹 Basic Email Structure

A typical email has the form:

```
local-part@domain
```

* **Local-part**: letters, numbers, dots, underscores, hyphens
* **@**: mandatory separator
* **Domain**: letters, numbers, dots; usually ends with `.com`, `.org`, etc.

---

## 🔹 Simple Regex for Email

```js
/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
```

---

## 🔹 Step-by-Step Explanation

### 1. `^`

* Matches **start of string**.

### 2. `[a-zA-Z0-9._%+-]+`

* Matches **one or more characters** allowed in local-part:

  * letters `a-zA-Z`
  * numbers `0-9`
  * special characters `. _ % + -`

### 3. `@`

* Matches the **literal "@" symbol** separating local-part and domain.

### 4. `[a-zA-Z0-9.-]+`

* Matches **domain name**:

  * letters, numbers, dots, hyphens
  * Example: `gmail`, `example-site`

### 5. `\.`

* Matches **literal dot** (`.`) before the top-level domain (TLD).

### 6. `[a-zA-Z]{2,}$`

* Matches **top-level domain** (TLD):

  * Only letters
  * At least **2 characters**
  * `$` ensures it’s **end of string**

---

## 🔹 JavaScript Example

```js
let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

console.log(regex.test("test@example.com"));    // true
console.log(regex.test("john.doe123@mail.co")); // true
console.log(regex.test("invalid-email@"));      // false
console.log(regex.test("@domain.com"));         // false
console.log(regex.test("user@domain"));         // false (no TLD)
```

---

## 🔹 Notes

1. **What it checks**:

   * Starts correctly (`^`)
   * Local-part valid
   * `@` present
   * Domain valid
   * TLD valid
   * Ends correctly (`$`)

2. **What it doesn’t check**:

   * Maximum length of email (RFC allows 254 characters)
   * Some special characters allowed by RFC (like `!#$&'*+/=?^_` in local-part)
   * IP addresses in domain (e.g., `user@[123.123.123.123]`)

---

## 🔹 More Advanced Regex (Closer to RFC)

```js
/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/
```

* Limits TLD to **max 63 characters**
* More realistic for actual domain validation

---

✅ **Summary**

* Email regex usually checks **local-part, @, domain, and TLD**.
* Simple regex works for most cases.
* Advanced regex can follow **RFC 5322**, but that’s often overkill in real-world apps.
