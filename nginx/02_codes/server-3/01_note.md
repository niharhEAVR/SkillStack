This is an **Nginx configuration file** (`nginx.conf`). Let’s go through it **line by line** so you understand what it does and its purpose.

---

### **Breakdown of the config**

```nginx
http {
    include mime.types;
```

* Starts the `http` block (where you define web server behavior).
* `include mime.types;` → tells Nginx to load MIME type mappings (so it knows how to serve `.html`, `.css`, `.js`, `.jpg`, etc. with the correct content-type).

---

```nginx
    server {
        listen 8080;
        root /usr/share/nginx/html/example.com/;
    }
```

* Defines a **server block** (a virtual host).
* `listen 8080;` → This server will listen on **port 8080**.
* `root ...` → Sets the **document root** (directory from which files will be served).

  * Here it serves files from `/usr/share/nginx/html/example.com/`.

So if you go to `http://your-server-ip:8080`, it will serve files from that folder.

---

```nginx
    #myexamplewebsite.com
    server {
        listen 80;
        server_name myexamplewebsite.xyz www.myexamplewebsite.xyz;
```

* Another **server block** (for your actual domain).
* `listen 80;` → Listens on **port 80** (default HTTP port).
* `server_name ...` → Matches requests for `myexamplewebsite.xyz` and `www.myexamplewebsite.xyz`.

---

```nginx
        root /usr/share/nginx/html/myexamplewebsite.com/;
        index index.html;
```

* Serves files from `/usr/share/nginx/html/myexamplewebsite.com/`.
* Sets the **default file** to `index.html`.

So if someone goes to `http://myexamplewebsite.xyz`, it will load `index.html` from that directory.

---

```nginx
        error_page 404 /404.html;
```

* If a **404 (Not Found)** error happens, Nginx will serve `/404.html` (from the same root directory).

---

```nginx
        location / {
            try_files $uri $uri/ =404;
        }
```

* Defines what happens when someone requests `/`.
* `try_files $uri $uri/ =404;` →

  1. First, check if the requested file exists (`$uri`).
  2. If not, check if a directory exists (`$uri/`).
  3. If neither exists → return `404`.

This prevents Nginx from blindly serving missing files.

---

```nginx
        access_log /var/log/nginx/myexamplewebsite.xyz.access.log;
        error_log /var/log/nginx/myexamplewebsite.xyz.error.log;
    }
}
```

* `access_log` → saves all successful requests to `/var/log/nginx/myexamplewebsite.xyz.access.log`.
* `error_log` → saves errors to `/var/log/nginx/myexamplewebsite.xyz.error.log`.

---

### **In short, this config does:**

1. Sets up MIME types for serving static files.
2. Runs **two server blocks**:

   * One for `http://your-server-ip:8080` (serves static files from `/usr/share/nginx/html/example.com/`).
   * One for `http://myexamplewebsite.xyz` (serves static files from `/usr/share/nginx/html/myexamplewebsite.com/`).
3. Defines **index page** (`index.html`).
4. Defines a **custom 404 error page** (`404.html`).
5. Logs requests and errors to separate log files.

---

👉 In practice, this is a **basic setup for hosting a static website with Nginx**.


---
---
---


## 🌍 **Incoming Requests (Front → Back)**

### 1. User visits

🔗 `http://your-server-ip:8080`

**Front (User’s View):**

* Browser requests your server at port 8080.

**Back (Nginx Processing):**

* Nginx matches the **first server block**:

  ```nginx
  server {
      listen 8080;
      root /usr/share/nginx/html/example.com/;
  }
  ```
* Nginx looks for `index.html` (default if not specified, but here not explicitly set).
* It serves files from `/usr/share/nginx/html/example.com/`.

---

### 2. User visits

🔗 `http://myexamplewebsite.xyz`
🔗 `http://www.myexamplewebsite.xyz`

**Front (User’s View):**

* Browser requests `myexamplewebsite.xyz` on port 80.

**Back (Nginx Processing):**

* Nginx matches the **second server block**:

  ```nginx
  server {
      listen 80;
      server_name myexamplewebsite.xyz www.myexamplewebsite.xyz;
      root /usr/share/nginx/html/myexamplewebsite.com/;
      index index.html;
  }
  ```
* Nginx serves `/usr/share/nginx/html/myexamplewebsite.com/index.html`.

---

### 3. User requests a specific file

🔗 `http://myexamplewebsite.xyz/about.html`

**Front:**

* Browser wants `/about.html`.

**Back:**

* Nginx checks `try_files $uri $uri/ =404;`

  * `$uri` → `/usr/share/nginx/html/myexamplewebsite.com/about.html`
  * If file exists → serve it.
  * If not → return `404` → show `/404.html`.

---

### 4. User requests a non-existent page

🔗 `http://myexamplewebsite.xyz/doesnotexist`

**Front:**

* Browser shows **404 Not Found** with custom 404 page.

**Back:**

* `try_files` fails → triggers `=404`.
* `error_page 404 /404.html;` → Nginx serves `/usr/share/nginx/html/myexamplewebsite.com/404.html`.

---

## ⚙️ **Back-end Processes (Inside Nginx)**

1. **DNS Resolution**

   * If user types `myexamplewebsite.xyz`, DNS resolves it to your server’s IP.
   * If user types `your-server-ip:8080`, no DNS needed.

2. **Request Routing**

   * Nginx looks at `listen` and `server_name` to decide which `server {}` block should handle the request.

3. **File Handling**

   * Uses `root` to find the directory.
   * Uses `index` for default file.
   * Uses `try_files` to avoid serving non-existent files.

4. **Error Handling**

   * If file not found → `404.html`.
   * Logs the error in `/var/log/nginx/myexamplewebsite.xyz.error.log`.

5. **Logging**

   * Every request (success/failure) goes into `access_log` and `error_log`.

---

## 🗺️ **Summary Map**

| **Request**                                | **Handled by**                                            | **Served from**                                         | **Result**                 |
| ------------------------------------------ | --------------------------------------------------------- | ------------------------------------------------------- | -------------------------- |
| `http://server-ip:8080`                    | `server { listen 8080; }`                                 | `/usr/share/nginx/html/example.com/`                    | Static files (example.com) |
| `http://myexamplewebsite.xyz`              | `server { listen 80; server_name myexamplewebsite.xyz; }` | `/usr/share/nginx/html/myexamplewebsite.com/index.html` | Homepage                   |
| `http://myexamplewebsite.xyz/about.html`   | Same block                                                | `/usr/share/nginx/html/myexamplewebsite.com/about.html` | About page (if exists)     |
| `http://myexamplewebsite.xyz/missing.html` | Same block                                                | `/usr/share/nginx/html/myexamplewebsite.com/404.html`   | Custom 404 error           |
