## 🔹 What is Nginx?

Nginx (pronounced **“engine-x”**) is:

* **A web server** → It serves web pages (HTML, CSS, JS, images, etc.) to clients (like your browser).
* **A reverse proxy** → It can sit in front of other servers (like Node.js, Python, PHP, etc.) and forward requests to them.
* **A load balancer** → It can distribute traffic between multiple servers to handle heavy loads.
* **A caching server** → It can cache static or dynamic responses for faster delivery.
* **A mail proxy** → It can handle email protocols (less commonly used).

👉 In simple words:
It’s like a **traffic manager** for the internet that makes your web apps fast, secure, and scalable.

---

## 🔹 Why is it popular?

* Extremely **fast** (handles thousands of connections at once).
* **Lightweight** (uses fewer resources than Apache).
* Easy to configure for:

  * Hosting static websites
  * Reverse proxy for Node.js/Django/Flask/etc.
  * Load balancing
  * SSL/TLS (HTTPS) setup

---
---
---

## 🔹 1. Web Server

* A **web server** is software that listens for requests from a browser and sends back files.
* Example:

  * You type `https://example.com`.
  * Your browser asks the server: “Give me `index.html`”.
  * The web server (like Nginx or Apache) sends that file.
* Think of it as a **waiter in a restaurant** → you ask for food (a webpage), the waiter brings it from the kitchen (the server’s storage).

👉 Nginx can directly serve static files like HTML, CSS, JS, images.

---

## 🔹 2. Reverse Proxy

* A **proxy** means “middleman”.
* A **reverse proxy** is a server that sits **in front of your actual app/server** and handles requests first.
* Why?

  * Hide your backend (for security).
  * Distribute traffic to different apps.
  * Add SSL/HTTPS easily.
* Example:

  * Browser → Nginx → Node.js app (running on port 3000).
  * The browser never talks directly to Node.js, it only sees Nginx.

👉 Think of it like a **receptionist** in an office:
Visitors don’t directly meet employees, they first meet the receptionist who forwards them to the right person.

---

## 🔹 3. Load Balancer

* When **too many people** visit your site, one server can’t handle it.
* A **load balancer** spreads the traffic across **multiple servers**.
* Example:

  * You have 3 servers running the same website.
  * Nginx sits in front and decides:
    Request 1 → Server A
    Request 2 → Server B
    Request 3 → Server C
* Result: no single server crashes from overload.

👉 Imagine a **traffic cop** at a busy intersection, directing cars into different lanes to avoid jams.

---

## 🔹 4. Caching Server

* **Cache** = store something temporarily for quick reuse.
* Instead of regenerating the same page every time, Nginx can save the result and serve it instantly.
* Example:

  * Without cache: every visitor → Nginx → backend → database → HTML page.
  * With cache: first visitor triggers backend, but Nginx stores the response → next visitors get the page directly from cache (super fast).

👉 Think of it as a **canteen serving pre-cooked meals** instead of cooking each time someone orders.

---

## 🔹 5. Mail Proxy

* This is less common, but Nginx can also handle email protocols (SMTP, IMAP, POP3).
* It doesn’t send emails itself, but it can act as a middle layer between your email client and mail server.

👉 Think of it as **forwarding letters in a post office** — Nginx just passes mail requests along.

---

✅ **Summary in plain words:**

* **Web server** → Gives files to browsers.
* **Reverse proxy** → Middleman between users and your app.
* **Load balancer** → Distributes traffic to multiple servers.
* **Caching** → Stores results to speed things up.
* **Mail proxy** → Forwards email traffic.

---
---
---

## Read the 02_nginx_installation.md file for proper installation of the nginx