# 🔹 Anatomy of an Nginx Config

Every Nginx config is a **set of nested blocks**.
The *basic hierarchy* looks like this:

```nginx
# -------- Global settings --------
user www-data;
worker_processes auto;
pid /run/nginx.pid;

events {
    worker_connections 1024;  # Connections per worker
}

http {
    # -------- HTTP settings --------
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    sendfile on;
    keepalive_timeout 65;

    # -------- Server blocks (Virtual Hosts) --------
    server {
        listen 80;                     # Port
        server_name example.com;       # Domain (or localhost)

        root /var/www/example;         # Folder with files
        index index.html;              # Default file to serve

        location / {
            # Handles requests to "/"
            try_files $uri $uri/ =404;
        }
    }
}
```

---

# 🔹 What is called what?

### 1. **Directives**

* A **directive** is a single instruction.
* Example:

  ```nginx
  listen 80;
  root /var/www/html;
  ```

  👉 Always ends with a **semicolon `;`**.

---

### 2. **Blocks**

* A **block** is a group of directives inside `{ ... }`.
* Examples:

  * `events { ... }`
  * `http { ... }`
  * `server { ... }`
  * `location { ... }`

---

### 3. **Context**

* A directive works only in certain places (**context**).
* Example:

  * `worker_connections` → only valid inside `events {}`
  * `server_name` → only valid inside `server {}`
  * `index` → valid inside `http {}`, `server {}`, or `location {}`

If you put a directive in the wrong place → Nginx will error when you test (`nginx -t`).

---

# 🔹 What to Think About When Writing a Config

Here’s a checklist so you don’t make common mistakes:

1. **Port & protocol**

   * `listen 80;` → HTTP
   * `listen 443 ssl;` → HTTPS
   * If you use a custom port (e.g., 5500), always add it in the URL.

2. **Server Name**

   * Defines which domain the block serves.
   * Example:

     ```nginx
     server_name localhost mysite.com;
     ```

3. **Root Directory**

   * Path to your files.
   * On WSL/Ubuntu: `/var/www/mysite`
   * On Windows drive: `/mnt/d/...`

4. **Index File**

   * Default file to load.
   * Example:

     ```nginx
     index index.html index.htm;
     ```

5. **Location Blocks**

   * Control routing.
   * Examples:

     ```nginx
     location /images/ {
         root /var/www/mysite;
     }
     ```

     👉 Requests to `/images/cat.png` → `/var/www/mysite/images/cat.png`

     ```nginx
     location /api/ {
         proxy_pass http://127.0.0.1:3000;
     }
     ```

     👉 `/api/` requests forwarded to a backend app.

6. **Testing & Reloading**

   * Always check config before reload:

     ```bash
     sudo nginx -t
     sudo systemctl reload nginx
     ```

---

# 🔹 Minimal Example (Serving Your Desktop Folder)

```nginx
events {}

http {
    server {
        listen 5500;
        server_name localhost;

        root /mnt/d/My_Workings/SkillStack/nginx/02_codes;
        index index.html;

        location / {
            try_files $uri $uri/ =404;
        }
    }
}
```

---

# ✅ Summary

* **Directives** → instructions (`listen`, `root`, `index`).
* **Blocks** → group of directives (`server { ... }`).
* **Context** → where directives are valid (`events`, `http`, `server`, `location`).
* Think about:

  1. Port (listen)
  2. Domain (server\_name)
  3. Root folder (root)
  4. Index file (index)
  5. Routing (location)
  6. Test before reload (`nginx -t`)

---

👉 Do you want me to also explain the **difference between editing `nginx.conf` directly** vs. creating a separate file inside `sites-available/sites-enabled` (the cleaner method most people use)?
