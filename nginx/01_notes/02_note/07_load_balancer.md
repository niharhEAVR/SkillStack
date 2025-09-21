# 🔹 What is Load Balancing?

* Load balancing = distributing incoming requests across multiple servers, so no single server gets overloaded.
* Nginx can sit in front of several **backend servers** (called **upstreams**) and decide who handles each request.

---

# 🔹 Basic Nginx Load Balancer Config

```nginx
http {
    upstream backend_servers {
        server 127.0.0.1:8081;
        server 127.0.0.1:8082;
        server 127.0.0.1:8083;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://backend_servers;
        }
    }
}
```

👉 How this works:

1. Client requests `http://yourdomain/`.
2. Nginx forwards it to one of the servers (`8081`, `8082`, or `8083`).
3. Next request may go to a different server depending on the load balancing method.

---

# 🔹 Load Balancing Methods in Nginx

Nginx supports different algorithms:

### 1. **Round Robin (default)**

* Requests are sent to each server **in order** (1 → 2 → 3 → 1 → 2 …).
* No config needed, it’s the default.

---

### 2. **Least Connections**

* Sends the request to the server with the **fewest active connections**.
* Good when servers handle requests that take different amounts of time.

```nginx
upstream backend_servers {
    least_conn;
    server 127.0.0.1:8081;
    server 127.0.0.1:8082;
}
```

---

### 3. **IP Hash**

* Requests from the same client IP always go to the **same server**.
* Useful for session persistence (like login sessions).

```nginx
upstream backend_servers {
    ip_hash;
    server 127.0.0.1:8081;
    server 127.0.0.1:8082;
}
```

---

### 4. **Weighted Round Robin**

* You can give some servers more “weight” (capacity).
* Example: one server is stronger, so it gets more requests.

```nginx
upstream backend_servers {
    server 127.0.0.1:8081 weight=3;
    server 127.0.0.1:8082 weight=1;
}
```

👉 Server `8081` gets 3× as many requests as `8082`.

---

# 🔹 Adding Proxy Settings

Usually you also set proxy headers so backend servers know the real client IP:

```nginx
location / {
    proxy_pass http://backend_servers;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

---

# 🔹 Visual Flow

```
Client ----> Nginx (Load Balancer) ----> Server 1
                                ↘-----> Server 2
                                ↘-----> Server 3
```

---

✅ **Summary:**

* Nginx load balancing happens through the **`upstream` block** + **`proxy_pass`**.
* Algorithms: round robin (default), least connections, IP hash, weighted round robin.
* You can control how requests are distributed depending on your needs.



---
---
---


# 🔹 What is a Proxy in Nginx?

When Nginx is used as a **reverse proxy**, it sits between the **client** (browser) and the **backend server** (like an app server or API).

👉 Instead of the client talking directly to the backend, all requests go through Nginx.

**Flow:**

```
Client → Nginx (reverse proxy) → Backend server
```

This gives benefits like:

* Load balancing
* Security (backend not exposed)
* Caching
* SSL termination

---

# 🔹 The Key Directive: `proxy_pass`

The `proxy_pass` directive tells Nginx **where to send the request**.

```nginx
location / {
    proxy_pass http://backend_servers;
}
```

👉 Meaning: “Any request that matches `/` should be forwarded to the group `backend_servers`.”

---

# 🔹 Proxy Headers (the “proxy settings”)

By default, if Nginx forwards traffic, the backend might think the request came **from Nginx itself** (because Nginx is the one contacting it).
To fix this, we pass along information about the **real client** using headers.

### Common proxy headers:

```nginx
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

---

### Let’s break them down:

1. **`proxy_set_header Host $host;`**

   * Tells backend what **domain** the client requested.
   * Example: if client typed `myapp.com`, backend sees `Host: myapp.com`.

2. **`proxy_set_header X-Real-IP $remote_addr;`**

   * Sends the client’s **actual IP address** to the backend.
   * Otherwise, backend would only see Nginx’s IP.

3. **`proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;`**

   * Standard header listing the **chain of IPs** the request passed through.
   * Good for logging, analytics, security.

4. **`proxy_set_header X-Forwarded-Proto $scheme;`**

   * Tells backend whether client originally used `http` or `https`.
   * Useful if backend needs to know about HTTPS.

---

# 🔹 Full Example: Proxy Settings

```nginx
http {
    upstream backend_servers {
        server 127.0.0.1:8081;
        server 127.0.0.1:8082;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://backend_servers;

            # Proxy headers (important settings)
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

---

# 🔹 Why Proxy Settings Matter

Without them:

* Backend only sees requests from Nginx (`127.0.0.1` or server’s IP).
* Backend doesn’t know what domain/URL user requested.
* Backend may log wrong IPs, which breaks authentication, geolocation, or rate-limiting.

With them:

* Backend sees **real client IP, domain, and protocol**.
* Logs and security policies work correctly.

---

✅ **In short:**

* `proxy_pass` = where to forward requests.
* `proxy_set_header` = pass real client info to the backend.



---
---
---
---

# 🔹 Step 1: Create a Simple Express App

Make a folder and install dependencies:

```bash
mkdir express-app
cd express-app
npm init -y
npm install express
```

Create `app.js`:

```js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`Hello from Express on port ${port}!`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

---

# 🔹 Step 2: Run Multiple Instances

Since we want **load balancing**, let’s run the app on different ports.

Example:

```bash
PORT=3001 node app.js
PORT=3002 node app.js
PORT=3003 node app.js
```

Now you have 3 backend servers:

* `http://localhost:3001/`
* `http://localhost:3002/`
* `http://localhost:3003/`

---

# 🔹 Step 3: Configure Nginx as Load Balancer

Edit your `nginx.conf` (or better, add a new file in `/etc/nginx/conf.d/express.conf`):

```nginx
http {
    upstream express_cluster {
        server 127.0.0.1:3001;
        server 127.0.0.1:3002;
        server 127.0.0.1:3003;
    }

    server {
        listen 8080;

        location / {
            proxy_pass http://express_cluster;

            # Proxy settings
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

---

# 🔹 Step 4: Test

1. Test config:

   ```bash
   sudo nginx -t
   ```
2. Restart nginx:

   ```bash
   sudo systemctl restart nginx
   ```
3. Open browser at:

   ```
   http://localhost:8080/
   ```

Refresh the page a few times — you should see:

```
Hello from Express on port 3001!
Hello from Express on port 3002!
Hello from Express on port 3003!
```

👉 Nginx is distributing traffic among your Node.js servers 🎉

---

# 🔹 Step 5: (Optional) Try Load Balancing Methods

Inside `upstream express_cluster` you can try:

* **Round Robin (default):**

  ```nginx
  upstream express_cluster {
      server 127.0.0.1:3001;
      server 127.0.0.1:3002;
      server 127.0.0.1:3003;
  }
  ```

* **Least Connections:**

  ```nginx
  upstream express_cluster {
      least_conn;
      server 127.0.0.1:3001;
      server 127.0.0.1:3002;
      server 127.0.0.1:3003;
  }
  ```

* **Weighted:**

  ```nginx
  upstream express_cluster {
      server 127.0.0.1:3001 weight=3;
      server 127.0.0.1:3002 weight=1;
  }
  ```

---

✅ **Summary:**

* Build Express app → run on multiple ports
* Configure `upstream` block in Nginx
* Use `proxy_pass` to forward traffic → Nginx distributes requests

---
---
---

# 🔹 What’s Happening

1. **Nginx listens on 8080**

   * User opens `http://localhost:8080/`
   * Browser thinks it’s just talking to port 8080.

2. **Nginx forwards the request**

   * Nginx acts like a “middleman” (reverse proxy).
   * Behind the scenes, it picks one of your Express servers (3001, 3002, 3003).

3. **Express handles the request**

   * Express server (say port 3002) generates the response.

4. **Nginx sends response back to the browser**

   * The browser never knows the response came from 3002 — it thinks it came from 8080.

---

# 🔹 Visual Diagram

```
Browser (http://localhost:8080)
       ↓
    Nginx (port 8080)
       ↓
   ┌───────────────┬───────────────┬───────────────┐
   │ Express app 1 │ Express app 2 │ Express app 3 │
   │ (port 3001)   │ (port 3002)   │ (port 3003)   │
   └───────────────┴───────────────┴───────────────┘
```

---

# 🔹 Key Point

* From the **outside world** → only `8080` is exposed.
* The **actual work** → happens on `3001`, `3002`, `3003`.
* Nginx decides *which* backend gets each request (load balancing).

👉 That’s why Nginx is called a **reverse proxy** — it hides your internal app servers.

---

✅ **So yes:** your original page appears on `http://localhost:8080`, but the request is **actually being served** by your Express apps on ports `3001–3003`.
