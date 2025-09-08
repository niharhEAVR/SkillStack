
# 🔹 1. Basic Key-Value Pairs

```yaml
name: "cooldude"
fruits: "apple, banana, cherry"
```

* `name` → string `"cooldude"`.
* `fruits` → string `"apple, banana, cherry"` (⚠️ this is **not a list**, it’s just one string with commas).

👉 If you wanted it as a **list**, you’d write:

```yaml
fruits:
  - apple
  - banana
  - cherry
```

---

# 🔹 2. Multiline Strings

### Block scalar `|`

```yaml
bio : |
  Hello, I'm a cool dude.
  I like to code and play guitar.
  My favorite actresses are: kate winslet, jennifer lawrence, scarlett johansson.
```

* `|` means: **preserve newlines exactly as written**.
* Useful for paragraphs, messages, or text.
* Stored as one string with line breaks.

👉 Output looks like:

```
Hello, I'm a cool dude.
I like to code and play guitar.
My favorite actresses are: kate winslet, jennifer lawrence, scarlett johansson.
```

---

### Folded scalar `>`

```yaml
aim : >
  To be the best developer I can be.
  To learn new things every day.
  To make a positive impact on the world.
```

* `>` means: **fold lines into a single line** (replace line breaks with spaces).
* Useful for long sentences.

👉 Output looks like:

```
To be the best developer I can be. To learn new things every day. To make a positive impact on the world.
```

---

# 🔹 3. Arrays (Lists)

```yaml
array-numbers: [1, 2, 3, 4, 5]
array-strings: ["red", "green", "blue"]
```

* These are **flow-style lists** (compact form, inside `[ ]`).
* Equivalent block style:

```yaml
array-numbers:
  - 1
  - 2
  - 3
  - 4
  - 5
```

---

# 🔹 4. Numbers, Floats, and Booleans

```yaml
number: 42
float: 3.14
booleanValue: true # also works: y, Y, yes, on, 1
booleanValue2: false # also works: n, N, no, off, 0
nullValue: null
```

* YAML supports integers (`42`), floats (`3.14`), booleans (`true/false`), and null (`null`).
* You can write booleans in many ways (`yes/no`, `on/off`, `1/0`).

---

# 🔹 5. Strings and Dates

```yaml
strings: "This is a string"
date: 2024-06-15
datetime: 2024-06-15T10:30:00Z
```

* `strings` → a normal string.
* `date` → recognized as a **date object**.
* `datetime` → full **date+time object** (ISO format).

---

# 🔹 6. Explicit Data Types (Tags with `!!`)

```yaml
zero: !!int 0
positive: !!int 123
negative: !!int -456
float-positive: !!float 3.14159
float-negative: !!float -2.71828
scientific: !!float 1.23e4
scientific-negative: !!float -5.67e-8
infinity: !!float .inf
negative-infinity: !!float -.inf
not-a-number: !!float .nan
explicit-string: !!str 12345
explicit-bool-true: !!bool true
explicit-bool-false: !!bool false
explicit-null: !!null null
```

* `!!int` → force YAML to treat it as **integer**.
* `!!float` → floating-point numbers (supports scientific notation, infinity, NaN).
* `!!str` → force YAML to treat as a **string** (even if it looks like a number).
* `!!bool` → explicitly true/false.
* `!!null` → explicitly null.

👉 Useful when you don’t want YAML to “guess” the type.

---

# 🔹 7. Different Number Bases

```yaml
binaryNum: !!int 0b101010   # binary (42)
octalNum: !!int 0o52        # octal (42)
hexNum: !!int 0x2A          # hexadecimal (42)
```

* YAML supports binary, octal, and hex.
* All three = **42 in decimal**.

---

# 🔹 8. Numbers with Underscores

```yaml
commaValues: !!int +1_000_000 # = 1000000
```

* Underscores make numbers easier to read (like commas in English).
* Equivalent to `1000000`.

---

# 🔹 9. Null Values

```yaml
surname: !!null Null # or ~
```

* `Null` or `~` both mean **no value** (null).

---

# 🔹 10. Null Keys

```yaml
~: this is a null key
```

* Even the **key itself can be null** (`~`).
* Here the key = null, and value = `"this is a null key"`.

---

# ✅ Summary (Beginner Takeaway)

This YAML file teaches you that YAML can store many types of data:

1. **Strings** → `"hello"`, multi-line with `|` and `>`.
2. **Numbers** → int, float, scientific, binary, octal, hex.
3. **Booleans** → `true/false`, or `yes/no`, `on/off`, etc.
4. **Nulls** → `null`, `~`.
5. **Dates & Times** → `2024-06-15`, `2024-06-15T10:30:00Z`.
6. **Lists** → `[1,2,3]` or block style with `-`.
7. **Explicit types** with `!!` → force YAML to treat data as `!!int`, `!!str`, `!!float`, etc.
8. **Multiple formats** → block style (indented) vs flow style (JSON-like).
