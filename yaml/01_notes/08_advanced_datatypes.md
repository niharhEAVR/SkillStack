# 🔹 1. Sequence (`!!seq`)

```yaml
student : !!seq
  - name: John Doe
    age: 21
    courses:
      - Math
      - Science
      - Literature
  - name: Jane Smith
    age: 22
    courses:
      - History
      - Art
      - Physics
```

✅ Meaning: `!!seq` = **list/array**.

👉 Output:

```json
student = [
  { "name": "John Doe", "age": 21, "courses": ["Math", "Science", "Literature"] },
  { "name": "Jane Smith", "age": 22, "courses": ["History", "Art", "Physics"] }
]
```

So, `student` is a **list of dictionaries** (like a table of students).

---

# 🔹 2. Map (`!!map`)

```yaml
address : !!map
  street: 123 Main St
  city: Anytown
  state: CA
  zip: 12345
```

✅ Meaning: `!!map` = **dictionary (key → value pairs)**.

👉 Output:

```json
address = {
  "street": "123 Main St",
  "city": "Anytown",
  "state": "CA",
  "zip": 12345
}
```

---

# 🔹 3. Ordered Map (`!!omap`)

```yaml
contacts : !!omap
  - email: john.doe@example.com
  - email: jane.smith@example.com
```

✅ Meaning: `!!omap` = **ordered dictionary** (keys maintain order).

👉 Output:

```json
contacts = [
  { "email": "john.doe@example.com" },
  { "email": "jane.smith@example.com" }
]
```

---

# 🔹 4. Set (`!!set`)

```yaml
preferences : !!set
  dark_mode: true
  notifications: false
  auto_save: true
```

✅ Meaning: `!!set` = **unique keys** (like a math set).
Values are ignored — only keys matter.

👉 Output:

```json
preferences = { "dark_mode", "notifications", "auto_save" }
```

---

# 🔹 5. Nested Sequences (Matrix)

```yaml
matrix : !!seq
  - !!seq [1, 2, 3]
  - !!seq [4, 5, 6]
  - !!seq [7, 8, 9]
```

✅ Meaning: A **list of lists** → looks like a 3×3 matrix.

👉 Output:

```json
matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
```

---

# 🔹 6. Tuple

```yaml
tuple: !!seq [ "Alice", 30, "Engineer" ]
```

✅ Meaning: A **fixed-size list** (like a tuple in Python).

👉 Output:

```json
tuple = ["Alice", 30, "Engineer"]
```

---

# 🔹 7. Complex Number (stored as string)

```yaml
complex-number: !!str "3 + 4i"
```

✅ YAML has **no native complex numbers**, so we force it as a **string**.

👉 Output:

```json
complex-number = "3 + 4i"
```

---

# 🔹 8. Date & Time

```yaml
date-only: !!timestamp 2024-06-15
time-only: !!timestamp 10:30:00
timestamp-with-offset: !!timestamp 2024-06-15T10:30:00-05:00
```

✅ YAML can recognize **dates and times**.

👉 Output:

```json
date-only = "2024-06-15"        # Date
time-only = "10:30:00"          # Time
timestamp-with-offset = "2024-06-15T10:30:00-05:00"  # Date + Time + Timezone
```

---

# 🔹 9. Sparse Sequence

```yaml
sparse-seq: !!seq
  - first
  - 
  - third
  - 
  - fifth
```

✅ Sparse = **some items are missing** (`null`).

👉 Output:

```json
sparse-seq = ["first", null, "third", null, "fifth"]
```

---

# 🔹 10. Sparse Map

```yaml
sparse-map: !!map
  key1: value1
  key2: 
  key3: value3
  key4: 
  key5: value5
```

✅ Missing values = `null`.

👉 Output:

```json
sparse-map = {
  "key1": "value1",
  "key2": null,
  "key3": "value3",
  "key4": null,
  "key5": "value5"
}
```

---

# 🔹 11. Nested Map

```yaml
nested-map: !!map
  outer-key1: 
    inner-key1: inner-value1
    inner-key2: inner-value2
  outer-key2: 
    inner-key3: inner-value3
    inner-key4: inner-value4
```

✅ A **map inside another map** (nested dictionary).

👉 Output:

```json
nested-map = {
  "outer-key1": {
    "inner-key1": "inner-value1",
    "inner-key2": "inner-value2"
  },
  "outer-key2": {
    "inner-key3": "inner-value3",
    "inner-key4": "inner-value4"
  }
}
```

---

# 🔹 12. Pair (`!!pair`)

```yaml
pair example: !!pair
  first: "left"
  second: "right"
```

✅ A **pair of values**.

👉 Output:

```json
pair example = [("first", "left"), ("second", "right")]
```

Or simplified:

```yaml
pair example: !!seq [ "left", "right" ]
```

---

# 🔹 13. Unique Set

```yaml
unique-set: !!set
  item1: true
  item2: true
  item3: true
  item1: true # duplicate, will be ignored
```

✅ Sets ignore duplicates → only unique keys remain.

👉 Output:

```json
unique-set = { "item1", "item2", "item3" }
```

---

# 🔹 14. Ordered Map with Mixed Types

```yaml
mixed-dict: !!omap
  - name: Alice
  - age: 28
  - is_student: false
  - scores: !!seq [95, 88, 92]
  - address: 
      street: 456 Elm St
      city: Othertown
      state: NY
      zip: 67890
```

✅ Ordered dictionary with different value types.

👉 Output:

```json
mixed-dict = [
  { "name": "Alice" },
  { "age": 28 },
  { "is_student": false },
  { "scores": [95, 88, 92] },
  { "address": {
      "street": "456 Elm St",
      "city": "Othertown",
      "state": "NY",
      "zip": 67890
    }
  }
]
```

---

# ✅ Beginner Summary

* `!!seq` → list/array.
* `!!map` → dictionary.
* `!!omap` → ordered dictionary.
* `!!set` → unique keys.
* `!!pair` → key-value pair.
* `null` → missing values.
* YAML can also store → strings, numbers, booleans, dates, times.

---
---
---


👉 **Anchors (&), Aliases (\*), and Merge (<<)**.

I’ll break it down very beginner-friendly:

---

# 🔹 The YAML Code

```yaml
# Define defaults with an anchor
defaults: &defaults
  kidney: healthy
  heart: healthy

# Use defaults in person1
person1:
  <<: *defaults
  name: Bob
  age: 35

# Use defaults in person2
person2:
  <<: *defaults
  name: Alice
  age: 30

# Use defaults in person3 but override kidney
person3:
  <<: *defaults
  name: Charlie
  age: 25
  kidney: needs checkup # override default
```

---

# 🔹 Step 1: What is an **Anchor (\&defaults)?**

```yaml
defaults: &defaults
  kidney: healthy
  heart: healthy
```

* `&defaults` = anchor.
* Think of it like **saving a template** (reusable block of data).
* `defaults` stores:

  ```json
  { "kidney": "healthy", "heart": "healthy" }
  ```

---

# 🔹 Step 2: What is an \**Alias (*defaults)?**

```yaml
<<: *defaults
```

* `*defaults` = alias.
* It **reuses the block of data** saved under `&defaults`.
* `<<:` means **merge** these values into the current object.

---

# 🔹 Step 3: Applying It

### Person 1

```yaml
person1:
  <<: *defaults
  name: Bob
  age: 35
```

👉 This expands into:

```json
person1 = {
  "kidney": "healthy",
  "heart": "healthy",
  "name": "Bob",
  "age": 35
}
```

### Person 2

```yaml
person2:
  <<: *defaults
  name: Alice
  age: 30
```

👉 Expands into:

```json
person2 = {
  "kidney": "healthy",
  "heart": "healthy",
  "name": "Alice",
  "age": 30
}
```

### Person 3 (override kidney)

```yaml
person3:
  <<: *defaults
  name: Charlie
  age: 25
  kidney: needs checkup
```

👉 Expands into:

```json
person3 = {
  "kidney": "needs checkup",  // overrides "healthy"
  "heart": "healthy",
  "name": "Charlie",
  "age": 25
}
```

---

# ✅ Why is this useful?

* **No repetition** → you don’t have to copy `kidney: healthy` and `heart: healthy` everywhere.
* **Consistency** → change once in `&defaults`, it updates for all.
* **Overrides allowed** → you can still change specific fields if needed (like Charlie’s kidney).

---

✨ In short:

* `&something` → create a reusable block (**anchor**).
* `*something` → reuse that block (**alias**).
* `<<:` → merge reused block into the current object.
* You can **override defaults** by writing new values after merging.
