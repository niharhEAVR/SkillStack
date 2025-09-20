## 🔹 What is a `location` block in Nginx?

* The `location` block **tells Nginx how to handle requests for a specific path or URL pattern**.
* It sits **inside a `server` block**.
* You can use it to:

  * Serve static files
  * Proxy requests to another server
  * Rewrite URLs
  * Set headers or caching rules

---

### 🔹 Basic Syntax

```nginx
server {
    listen 8080;
    root /var/www/html;
    index index.html;

    location / {
        # Default for root path
        try_files $uri $uri/ =404;
    }

    location /css/ {
        # All requests starting with /css/ go here
        root /var/www/html;
    }

    location /api/ {
        # Proxy requests to another server
        proxy_pass http://localhost:5000;
    }
}
```

---

### 🔹 How it works

1. **`location /`** → matches all requests (default).
2. **`location /css/`** → matches any URL starting with `/css/` (e.g., `/css/style.css`).
3. **`location /api/`** → can be used to forward requests to another server (like a backend API).

Nginx checks **location blocks in order of specificity**:

* Exact matches (`=`) → first priority
* Prefix matches (`/something`) → next
* Regex matches (`~` or `~*`) → last

---

### 🔹 Example for your HTML + CSS site

```nginx
server {
    listen 8080;
    root /mnt/d/My_Workings/SkillStack/nginx/02_codes;
    index 01_index.html;

    # Serve CSS files
    location /css/ {
        root /mnt/d/My_Workings/SkillStack/nginx/02_codes;
    }

    # Serve JS files
    location /js/ {
        root /mnt/d/My_Workings/SkillStack/nginx/02_codes;
    }
}
```

Here, if your CSS is at:

```
/mnt/d/My_Workings/SkillStack/nginx/02_codes/css/style.css
```

Then the browser URL `/css/style.css` will correctly serve it.

---

✅ **In short:**

> `location` blocks tell Nginx: “For this URL path, do this action.”
> It’s how you can organize static files, APIs, or different rules for different parts of your website.

---
---
---

## 🔹 Why `/fruits` says Forbidden

1. **Nginx permission issue**

   * Nginx runs as a user (usually `www-data`) in WSL/Ubuntu.
   * If it **doesn’t have read permission** for the folder `/mnt/d/My_Workings/SkillStack/nginx/02_codes/fruits`, it will refuse to serve files → 403.

2. **Incorrect `root` inside `location`**

   * In your config:

   ```nginx
   location /fruits {
       root /mnt/d/My_Workings/SkillStack/nginx/02_codes;
   }
   ```

   Nginx combines `root` + URI.

   * Request: `/fruits/apple.html`
   * Path Nginx tries to serve:

     ```
     /mnt/d/My_Workings/SkillStack/nginx/02_codes/fruits/apple.html
     ```

     ✅ This is correct **if** the folder exists and permissions are okay.

3. **Directory indexing disabled**

   * If you access `/fruits/` without a file (`index.html`) inside that folder, and `autoindex` is off (default), Nginx will return 403.

---

## 🔹 How to fix it

### **Option 1: Add `index` inside `location`**

If you have `index.html` inside `/fruits`, tell Nginx to serve it:

```nginx
location /fruits {
    root /mnt/d/My_Workings/SkillStack/nginx/02_codes;
    index index.html;
}
```

### **Option 2: Enable directory listing (autoindex)**

If you want to browse all files inside `/fruits`:

```nginx
location /fruits {
    root /mnt/d/My_Workings/SkillStack/nginx/02_codes;
    autoindex on;
}
```

---

### 🔹 Recommended `/fruits` block for static folder

```nginx
location /fruits {
    root /mnt/d/My_Workings/SkillStack/nginx/02_codes;
    index index.html;   # optional, serve default file
    autoindex on;       # optional, enable folder listing
}
```