# 🔹 Step 1: Create a YAML file

* Open any text editor (VS Code, Notepad++, Sublime, or even Notepad).
* Save the file with the extension:

  * `example.yml` or `example.yaml`

👉 Both `.yml` and `.yaml` work, but `.yaml` is more common nowadays.

---

# 🔹 Step 2: Learn the YAML Basics

Here are **rules** you must follow:

1. **Key-Value pairs** → use `:` (colon + space).

   ```yaml
   name: Harsh
   age: 19
   ```

2. **Indentation matters** → use **spaces only (no tabs)**.

   * Each nested level = **2 spaces** (recommended).

3. **Lists (arrays)** → use `-` (dash + space).

   ```yaml
   skills:
     - Python
     - JavaScript
     - DevOps
   ```

4. **Nested structure** → keys inside another key.

   ```yaml
   address:
     city: Kolkata
     pin: 700001
   ```

5. **Comments** → use `#`.

   ```yaml
   # This is a comment
   name: Harsh
   ```

---

# 🔹 Step 3: Write Your First YAML File

Let’s make a simple profile config (`profile.yaml`):

```yaml
# Basic user information
name: Harsh
age: 19
is_student: true

# Nested key-value pairs
address:
  city: Kolkata
  country: India

# List of items
skills:
  - Python
  - JavaScript
  - DevOps
```

---

# 🔹 Step 4: Validate the YAML

Since YAML is sensitive, always **check for errors**:

* Use an **online YAML validator**: [https://codebeautify.org/yaml-validator](https://codebeautify.org/yaml-validator)
* Or install VS Code extension → `YAML` by Red Hat (shows errors directly).

---

# 🔹 Step 5: Try Loading YAML in a Program

Example in **Python** (optional for beginners):

```python
import yaml

with open("profile.yaml") as f:
    data = yaml.safe_load(f)

print(data)
```

Output:

```python
{'name': 'Harsh', 'age': 19, 'is_student': True, 'address': {'city': 'Kolkata', 'country': 'India'}, 'skills': ['Python', 'JavaScript', 'DevOps']}
```

---

# ✅ Summary for Beginners:

1. Create a `.yaml` file.
2. Use **key: value**, proper indentation, and lists (`-`).
3. Add comments with `#`.
4. Validate the file online or in VS Code.
5. (Optional) Load it in Python/JS to see how it works.



---
---
---


# 🟢 Level 1: Personal Profile (Basics)

Goal: Learn **key-value pairs, lists, and comments**.

👉 Create a file `profile.yaml`

```yaml
# Personal Information
name: Harsh
age: 19
is_student: true

# Contact details
email: harsh@example.com
phone: +91-9876543210

# Skills list
skills:
  - Python
  - JavaScript
  - DevOps
```

✅ Practice:

* Change your name/age.
* Add more skills.
* Add a new field (like `hobbies`).

---

# 🟡 Level 2: Todo List (Nested + Lists)

Goal: Learn **nested structures** and **organized data**.

👉 Create a file `todo.yaml`

```yaml
# Daily tasks
todo:
  morning:
    - Exercise
    - Breakfast
  afternoon:
    - Study DBMS
    - Write YAML practice
  evening:
    - Gym
    - Watch a movie
```

✅ Practice:

* Add one more time (e.g., `night`).
* Add at least 2 tasks under each time.

---

# 🔴 Level 3: Website Config (Real Use Case)

Goal: Simulate **configuration files** like those used in apps.

👉 Create a file `website.yaml`

```yaml
# Website configuration
website:
  name: MyFirstSite
  version: 1.0
  author: Harsh

# Server details
server:
  host: localhost
  port: 8080

# Database config
database:
  type: mysql
  host: 127.0.0.1
  port: 3306
  user: root
  password: secret123

# Features list
features:
  - login
  - register
  - blog
  - comments
```

✅ Practice:

* Change the port numbers.
* Add one more feature.
* Add a new section like `themes` with `dark` and `light`.

---

# 📝 How to Practice

1. Create these files (`profile.yaml`, `todo.yaml`, `website.yaml`).
2. Edit them with different values.
3. Validate them online (YAML validator) or in VS Code.
4. (Optional) Load them in Python/JavaScript to see how the data looks when deserialized.
