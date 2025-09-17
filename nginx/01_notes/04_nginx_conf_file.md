## 🔹 What is `nginx.conf`?

* It’s located by default in `/etc/nginx/nginx.conf`.
* It controls the **global behavior of Nginx**, as well as individual websites (via `server` blocks).
* It is read when you **start or reload** Nginx.

---

## 🔹 Structure of `nginx.conf`

The file is organized in a **hierarchical block style**:

```nginx
# Global settings
user  www-data;
worker_processes auto;

events {
    worker_connections 1024;
}

http {
    # Global HTTP settings
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout 65;

    # Virtual Hosts (servers)
    server {
        listen 80;
        server_name example.com;

        location / {
            root   /var/www/html;
            index  index.html index.htm;
        }
    }
}
```

---

## 🔹 Key Parts Explained

### 1. **Global section**

* Applies to the whole Nginx process.

```nginx
user www-data;              # Which system user runs nginx workers
worker_processes auto;      # Number of worker processes (usually = CPU cores)
pid /run/nginx.pid;         # PID file location
error_log /var/log/nginx/error.log;   # Error logs (critical for debugging)
include /etc/nginx/modules-enabled/*.conf; # Load additional module configs
```

👉 This sets up *who runs Nginx*, *how many workers it spawns*, and *where errors are logged*.


---

### 2. **events block**

```nginx
events {
    worker_connections 768;  # Max simultaneous connections per worker
    # multi_accept on;        # (Optional) Accept multiple connections at once
}
```

👉 This controls how Nginx handles concurrent connections.
For example:

* With `4` workers × `768` connections = up to `3072` clients at the same time.
* Good for scalability and performance tuning.

---

### 3. **http block**

* All **HTTP traffic configuration** goes here.
* Defines how web requests are processed.
* Can include:

  * MIME types
  * Logging
  * Compression
  * Caching
  * Virtual hosts (`server` blocks)

```nginx
http {
    include       mime.types;       # File extension → Content-Type mapping
    default_type  application/octet-stream;
    sendfile      on;               # Efficient file transfer
    keepalive_timeout 65;           # Keep connections open for reuse
}
```

---

### 4. **server block**

* Defines a **virtual host** (like Apache’s vhost).
* Handles a **domain or site**.

```nginx
server {
    listen 80;                      # Port (80 = HTTP, 443 = HTTPS)
    server_name example.com www.example.com;

    location / {
        root   /var/www/example;
        index  index.html;
    }
}
```

---

### 5. **location block**

* Controls **routing inside a server block**.
* Used for serving files, reverse proxy, load balancing, etc.

```nginx
location /images/ {
    root /var/www/example;
}
```

👉 This means: requests like `/images/cat.jpg` → `/var/www/example/images/cat.jpg`

---

## 🔹 How it Works (Step by Step)

1. **Client request comes in** (e.g., `GET /index.html`).
2. Nginx checks the **events** system → assigns a worker.
3. Inside `http` → matches the **server block** by domain/port.
4. Inside server → finds the **location block** that matches the path.
5. Serves the file, forwards to backend, or applies special rules (proxy, cache, gzip, etc.).

---

✅ **In short:**

* `nginx.conf` = **master blueprint** of Nginx.
* It defines:

  * Who runs Nginx (user, workers),
  * How connections are handled (events),
  * How HTTP traffic is processed (http),
  * How each site/domain is served (server),
  * How URLs are routed (location).
