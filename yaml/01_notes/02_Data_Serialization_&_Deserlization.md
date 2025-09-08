# 🔹 Data Serialization & Deserialization

### ✅ Serialization

* Think of **serialization** as *packing* data into a format (like YAML, JSON, or XML) so it can be **stored in a file** or **sent across the internet**.
* It turns in-memory data structures (like Python dictionaries, Java objects, or JS objects) into a **text-based format**.

Example in Python:

```python
import yaml

data = {"name": "Harsh", "age": 19, "skills": ["Python", "JavaScript"]}

# Serialize (convert Python dict -> YAML text)
yaml_string = yaml.dump(data)
print(yaml_string)
```

Output:

```yaml
age: 19
name: Harsh
skills:
- Python
- JavaScript
```

👉 This text can now be stored in a file (`user.yml`) or sent somewhere.

---

### ✅ Deserialization

* **Deserialization** is the *unpacking* process.
* It converts YAML text (or file) **back into a program’s native object** so you can work with it.

Example in Python:

```python
yaml_text = """
name: Harsh
age: 19
skills:
  - Python
  - JavaScript
"""

# Deserialize (YAML text -> Python dict)
data = yaml.safe_load(yaml_text)
print(data)
```

Output:

```python
{'name': 'Harsh', 'age': 19, 'skills': ['Python', 'JavaScript']}
```

👉 Now it’s usable as a Python dictionary.

So:

* **Serialization** = object ➝ YAML
* **Deserialization** = YAML ➝ object
