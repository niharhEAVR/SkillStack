# 🔹 1. Block in YAML

In YAML, a **block** means a way of writing structured data using **indentation**.
It’s the most common style in YAML (the one you’ve been practicing).

### ✅ Example (Block style)

```yaml
person:
  name: Harsh
  age: 19
  skills:
    - Python
    - JavaScript
```

Here:

* `person` is a **block mapping** (a dictionary-like structure).
* Inside it, `name`, `age`, and `skills` are **key-value pairs**.
* `skills` is a **block sequence** (list).

👉 So, a **block** = structured data with indentation.
There’s also a **flow style** (like JSON), but block style is preferred in YAML.

**Flow style (less readable):**

```yaml
person: {name: Harsh, age: 19, skills: [Python, JavaScript]}
```

---

# 🔹 2. Document in YAML

A **document** in YAML = one complete YAML content.

* Every YAML file is at least **one document**.
* You can have **multiple documents** in the same file, separated by `---`.

### ✅ Example (Single document)

```yaml
name: Harsh
age: 19
```

👉 This whole file = **one document**.

---

### ✅ Example (Multiple documents in one file)

```yaml
# First document
---
name: Harsh
age: 19

# Second document
---
name: Rahul
age: 21
... # end of document
```

* First document = Harsh’s data.
* Second document = Rahul’s data.
* Many tools (like Kubernetes, Ansible) use this when you want multiple configs in one file.

---

# 🔹 Difference Between Block and Document

| Feature | Block 🧱                                          | Document 📄                                                  |
| ------- | ------------------------------------------------- | ------------------------------------------------------------ |
| Meaning | A way of structuring YAML data using indentation. | A complete YAML content unit (can be one or many in a file). |
| Example | Lists (`- item`), Mappings (`key: value`).        | Whole file or sections separated by `---`.                   |
| Scope   | Inside a document.                                | Can cover entire file or multiple sections.                  |
| Usage   | Organizes **data inside** a document.             | Organizes the **file itself** into chunks.                   |

---

✅ **In short:**

* **Block** = indentation style (how you write data).
* **Document** = full YAML content (can be single or multiple in a file).

---