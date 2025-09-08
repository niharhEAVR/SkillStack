YAML (also written as **.yaml** or **.yml**) stands for

**“YAML Ain’t Markup Language”**

It’s a **human-readable data serialization format**. That means it’s used to write data in a structured way so that both humans and computers can understand it easily.

---

### 🔑 Key Points:

* **File extension**: `.yaml` or `.yml` (both are the same, just different endings).
* **Purpose**: Mostly used for **configuration files**, data exchange, and settings.
* **Readable**: Uses indentation (spaces) instead of brackets or tags.
* **Language-independent**: Can be used with many programming languages (Python, JavaScript, Go, etc.).

---

### 📌 Example (YAML vs JSON)

**JSON**

```json
{
  "name": "Harsh",
  "age": 19,
  "skills": ["Python", "JavaScript", "DevOps"]
}
```

**YAML**

```yaml
name: Harsh
age: 19
skills:
  - Python
  - JavaScript
  - DevOps
```

👉 Both mean the same thing, but YAML looks cleaner and easier for humans to read.

---

### 📖 Where YAML is used:

* **Kubernetes** (deployment files, configs)
* **Docker Compose** (`docker-compose.yml`)
* **CI/CD pipelines** (GitHub Actions, GitLab CI)
* **Ansible, Terraform** (infrastructure as code)
* **App configuration files** (e.g., Django, Node.js frameworks)


---
---
---



# 🔹 YAML: "Storing Data Only" (What does that mean?)

When we say **YAML stores only data**, it means:

* YAML is **not a programming language**.
* It cannot run **commands, functions, or logic** (like loops, if-else, print statements).
* YAML only **represents information** in a structured way.

---

### ✅ Example of “storing data only”

```yaml
person:
  name: Harsh
  age: 19
  hobbies:
    - Coding
    - Music
```

This YAML just **describes data**:

* A person has a name.
* A person has an age.
* A person has hobbies.

But it **cannot do** things like:

```python
if age > 18:
    print("Adult")
```

👉 Because YAML has **no execution power**, it’s only a *data format*.

---

# 🔹 3. Why YAML does not allow commands?

1. **Security**

   * If YAML allowed commands, hackers could sneak in harmful code inside config files.
   * Example: Instead of just defining a database port, someone could add `rm -rf /` (delete all files).

2. **Purpose**

   * YAML’s purpose is **to describe configuration and structure**, not behavior.
   * Commands & logic belong in programming languages, not in configs.

3. **Portability**

   * Because YAML is *just data*, any programming language (Python, JavaScript, Go, etc.) can safely read it.
   * If it had commands, it would not be universal anymore.

---

✅ In short:

* **Serialization/Deserialization** = converting between objects and YAML text.
* **YAML only stores data** = it represents information like configs, settings, lists, mappings, etc.
* **No commands** = to keep it **safe, portable, and purely descriptive**, not executable.
