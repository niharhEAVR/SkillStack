
## 🔹 Part 1: Multiple Documents

```yaml
# First document
---
name: Harsh
age: 19

# Second document
---
name: Rahul
age: 21
```

* `---` = start of a new YAML **document**.
* Each document here is a **mapping** (dictionary):

  1. First doc → `{name: Harsh, age: 19}`
  2. Second doc → `{name: Rahul, age: 21}`

👉 You now have **two documents in one file**.

---

## 🔹 Part 2: Lists (Sequences)

```yaml
---
# lists
- name: Harsh
  age: 19
- name: Rahul
  age: 21
```

* This is a **block sequence** (list of objects).
* Each `-` represents one item in the list.
* Equivalent JSON:

  ```json
  [
    {"name": "Harsh", "age": 19},
    {"name": "Rahul", "age": 21}
  ]
  ```

---

## 🔹 Part 3: Nested Lists

```yaml
# nested lists
- name: Harsh
  age: 19
  skills:
    - Python
    - C++
```

* This is a **list of objects**.
* Each object can have nested lists (like `skills`).
* Equivalent JSON:

  ```json
  [
    {
      "name": "Harsh",
      "age": 19,
      "skills": ["Python", "C++"]
    }
  ]
  ```

---

## 🔹 Part 4: Inline Lists

```yaml
---
# lists
cities: [agra, kolkata, delhi]
```

* This is a **flow style list** (short form).
* Equivalent block style:

  ```yaml
  cities:
    - agra
    - kolkata
    - delhi
  ```

👉 Both mean the same, just different writing style.

---

## 🔹 Part 5: Inline Mapping

```yaml
---
{many: "key-value", pairs: "in", one: "line"}
```

* This is a **flow style mapping** (like JSON).
* Equivalent block style:

  ```yaml
  many: "key-value"
  pairs: "in"
  one: "line"
  ```

---

## 🔹 Part 6: Document End Marker

```yaml
...
```

* `...` = optional **end of document** marker.
* Rarely used, but helpful when streaming YAML documents one after another.

---

# ✅ Summary of What You Learned in This File

1. `---` → start of a **document**.
2. `...` → end of a **document** (optional).
3. **Block style** → indentation-based (most common).
4. **Flow style** → JSON-like (compact, single line).
5. **Lists (sequences)** → `- item`.
6. **Nested structures** → indentation under keys.
7. YAML can hold **multiple documents in one file**.
