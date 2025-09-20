## 🔹 `alias` vs `root` in a `location` block

Both `root` and `alias` tell Nginx **where to look on the filesystem**, but they behave differently.

---

### **1️⃣ `root`**

* `root` is **combined with the request URI**.
* Example:

```nginx
server {
    listen 8080;
    root /var/www/html;

    location /images/ {
        root /var/www/;
    }
}
```

Request:

```
http://localhost:8080/images/pic.jpg
```

Nginx serves file from:

```
/var/www/images/pic.jpg
```

✅ So `root + URI` → filesystem path.

---

### **2️⃣ `alias`**

* `alias` **replaces the location path** completely with the given folder.
* Example:

```nginx
location /images/ {
    alias /var/www/assets/;
}
```

Request:

```
http://localhost:8080/images/pic.jpg
```

Nginx serves file from:

```
/var/www/assets/pic.jpg
```

Notice: `/images/` is **not appended** to the filesystem path.

---

### 🔹 Key difference

| Feature      | `root`              | `alias`                                        |
| ------------ | ------------------- | ---------------------------------------------- |
| Combines URI | Yes                 | No                                             |
| Exact folder | No                  | Yes                                            |
| Typical use  | Normal static files | Mapping a URL to a completely different folder |

---

### 🔹 Example for your `/fruits` folder

Using `root`:

```nginx
location /fruits/ {
    root /mnt/d/My_Workings/SkillStack/nginx/02_codes;
}
```

* `/fruits/apple.html` → `/mnt/d/My_Workings/SkillStack/nginx/02_codes/fruits/apple.html`

Using `alias`:

```nginx
location /fruits/ {
    alias /mnt/d/My_Workings/SkillStack/nginx/02_codes/fruits/;
}
```

* `/fruits/apple.html` → `/mnt/d/My_Workings/SkillStack/nginx/02_codes/fruits/apple.html`
* Notice: you **don’t need the `/fruits` in the path** in the alias folder.

---

💡 **Rule of thumb:**

* Use `root` when your URL path mirrors your folder structure.
* Use `alias` when you want a URL path to point **somewhere else** on disk.

---
---
---

* **`alias`** in Nginx is like giving a **different name (shortcut) to a folder path**.
* The URL you type in the browser doesn’t have to match the actual folder on disk — Nginx just uses the alias to find the real location.

---

### 🔹 Quick analogy

Think of it like this:

```
Folder on disk: /mnt/d/My_Workings/SkillStack/nginx/02_codes/fruits_data/
URL you type:  http://localhost:8080/fruits/apple.html
```

* With **alias**:

```nginx
location /fruits/ {
    alias /mnt/d/My_Workings/SkillStack/nginx/02_codes/fruits_data/;
}
```

* Nginx sees `/fruits/apple.html` → “Ah! I know `/fruits/` is actually `/fruits_data/` on disk” → serves `/fruits_data/apple.html`

✅ The URL doesn’t need to match the real folder.

---

### 🔹 vs `root`

* With `root`, Nginx **expects the URL path to match the folder path**.
* With `alias`, you can **give any URL a completely different folder path**.
