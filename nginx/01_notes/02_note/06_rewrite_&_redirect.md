# 🔹 1. What is **Redirect** (`return`, or `rewrite ... permanent/redirect`)

👉 **Redirect = Tell the browser to go somewhere else.**

* The server sends back an **HTTP status code** (301, 302, 307, etc.) and a new URL.
* The **browser URL changes** because the browser makes a **new request** to the new URL.

---

### 🛠 Example 1: Simple redirect

```nginx
location /old-page {
    return 301 /new-page;
}
```

* You type: `http://localhost:8080/old-page`
* Nginx replies: “301 Moved Permanently → /new-page”
* Browser changes URL to: `http://localhost:8080/new-page`

👉 Good for SEO and when content **moved**.

---

### 🛠 Example 2: Redirect to HTTPS

```nginx
server {
    listen 80;
    server_name example.com;
    return 301 https://example.com$request_uri;
}
```

* You type: `http://example.com/hello`
* Nginx redirects → `https://example.com/hello`

👉 Always use `return` for clean, simple redirects.

---

---

# 🔹 2. What is **Rewrite** (`rewrite ...`)

👉 **Rewrite = Change the request inside the server.**

* Nginx changes the **URI** before serving a file or passing it to another block.
* The **browser URL does NOT change** — user thinks they got the original page, but content is served from somewhere else.

---

### 🛠 Example 1: Internal rewrite

```nginx
rewrite ^/number/([0-9]+)$ /count/$1;
```

* You type: `http://localhost:8080/number/5`
* Nginx secretly rewrites it to `/count/5`
* Browser still shows: `/number/5`
* But content actually comes from `/count/5`

👉 User never knows the “real” location. This is **internal remapping**.

---

### 🛠 Example 2: Pretty URLs

```nginx
rewrite ^/product/([0-9]+)$ /product.php?id=$1 last;
```

* You type: `http://example.com/product/25`
* Internally served as: `/product.php?id=25`
* Browser still shows `/product/25`

👉 Used for **SEO-friendly URLs** (pretty vs ugly query strings).

---

### 🛠 Example 3: Rewrite + redirect

```nginx
rewrite ^/old-blog/(.*)$ /new-blog/$1 permanent;
```

* You type: `http://example.com/old-blog/hello`
* Nginx sends back: `301 Moved Permanently → /new-blog/hello`
* Browser URL changes to `/new-blog/hello`

👉 Notice: Adding `permanent` or `redirect` makes **rewrite behave like a redirect**.

---

---

# ⚖️ Side-by-Side Difference

| Feature         | Rewrite                           | Redirect (return)                 |
| --------------- | --------------------------------- | --------------------------------- |
| **Purpose**     | Internally change request path    | Tell browser to go to new URL     |
| **Browser URL** | ❌ Stays the same                  | ✅ Changes                         |
| **Use case**    | SEO-friendly URLs, routing, CMS   | HTTPS redirects, moved pages, SEO |
| **Speed**       | Slightly heavier (regex parsing)  | Faster, more efficient            |
| **Example**     | `/number/5 → internally /count/5` | `/corps → externally /fruits`     |

---

# 🔹 3. Your Config Examples

Now let’s re-read **your exact config**:

### Rewrite

```nginx
rewrite ^/number/(\w+) /count/$1;
```

* Request: `/number/5`
* Browser stays `/number/5`
* Content comes from `/count/5`

---

### Redirect

```nginx
location /corps {
    return 307 /fruits;
}
```

* Request: `/corps`
* Browser changes to `/fruits`
* Then lists files from `/fruits` folder

---

✅ **Think of it like this:**

* **Rewrite** = “User asked for `/A`, but I’ll secretly give them content from `/B`.”
* **Redirect** = “User asked for `/A`, but I’ll *tell them* to go ask for `/B` instead.”

---
---
---



# 🔹 Categories of Status Codes

HTTP codes are **3 digits**:

* **1xx** → Informational (rarely used in Nginx configs)
* **2xx** → Success (e.g., 200 OK)
* **3xx** → **Redirection** → "Don’t stay here, go somewhere else"
* **4xx** → Client errors (e.g., 404 Not Found, 403 Forbidden)
* **5xx** → Server errors (e.g., 500 Internal Server Error)

---

# 🔹 Common **3xx (Redirect) Codes** You’ll See in Nginx

### ✅ 301 — Moved Permanently

* Means: "This page has moved forever to a new URL."
* Browser remembers and **updates bookmarks / search engines**.
* Example:

```nginx
return 301 https://example.com$request_uri;
```

---

### ✅ 302 — Found (Temporary Redirect)

* Means: "This page is temporarily somewhere else."
* Browser goes to new URL, but **doesn’t remember it**.
* Example:

```nginx
return 302 /maintenance.html;
```

---

### ✅ 307 — Temporary Redirect

* Similar to 302, but **keeps the same HTTP method** (e.g., POST stays POST).
* Safer for APIs or forms.
* Example from your config:

```nginx
location /corps {
    return 307 /fruits;
}
```

👉 Browser goes to `/fruits` temporarily.

---

### ✅ 308 — Permanent Redirect

* Like 301 (permanent), but also **keeps the same HTTP method** (good for APIs).
* Newer than 301/302, not always used.

---

# 🔹 Quick Analogy

* **301 (Permanent)** → Like moving house forever. You tell the post office: *“Send all my future mail to the new address.”*
* **302/307 (Temporary)** → Like staying at a hotel for a week. You tell the post office: *“For now, forward my mail here, but I’ll go back home soon.”*
* **308 (Permanent + method safe)** → Same as 301, but ensures the exact "type of request" stays the same.

---

✅ In your config:

* `rewrite` without flags → no redirect (internal only).
* `return 307 /fruits;` → Nginx sends a **307 Temporary Redirect** → browser moves to `/fruits`.

---
---
---

This is where most beginners get stuck, because **`rewrite` uses regex (regular expressions)** and special variables. Let’s break it down like I would explain to a total beginner.

---

# 🔹 Your Line

```nginx
rewrite ^/number/(\w+) /count/$1;
```

---

## 1. The `^/number/(\w+)`

This is a **regular expression (regex)** that matches the URL.

* `^` → means “start of string”
* `/number/` → matches literally the text `/number/` in the URL
* `(\w+)` → this is the tricky part:

  * `\w` means “word character” (letters A–Z, numbers 0–9, underscore `_`)
  * `+` means “one or more”
  * `(...)` makes a **capture group** → it stores what was matched

👉 So `/number/(\w+)` matches:

* `/number/5` → capture group = `5`
* `/number/hello` → capture group = `hello`
* `/number/test123` → capture group = `test123`

---

## 2. The `/count/$1`

This is the **replacement pattern**.

* `/count/` → literal text
* `$1` → means “insert the value from the **first capture group**”

👉 So:

* `/number/5` → rewrites to `/count/5`
* `/number/hello` → rewrites to `/count/hello`

---

## 3. \`\$ Signs in General

* `$1`, `$2`, `$3`, … → refer to the **1st, 2nd, 3rd capture groups** from the regex
* `$uri`, `$host`, `$request_uri`, `$args` etc. → built-in Nginx variables

Example:

```nginx
rewrite ^/user/([0-9]+)$ /profile?id=$1;
```

* `/user/42` → internally becomes `/profile?id=42`

---

# 🔹 How to Build Your Own Without Knowing Regex?

Good approach for a beginner:

### Step 1: Start simple with **fixed paths**

```nginx
location /old-page {
    return 301 /new-page;
}
```

👉 No regex, just literal match.

---

### Step 2: Try “wildcards” with regex slowly

```nginx
rewrite ^/blog/(.*)$ /articles/$1;
```

* `(.*)` → means “match anything”
* `$1` → put that “anything” in the new path
* `/blog/hello` → becomes `/articles/hello`

---

### Step 3: Learn **just 3 regex basics** (you don’t need the whole regex world at first):

* `.` → any character
* `+` → one or more
* `()` → capture for `$1`, `$2`, etc.

---

# 🔹 Visual Example for Beginners

Say you want:

* `/fruit/apple` → `/items/apple`
* `/fruit/banana` → `/items/banana`

```nginx
rewrite ^/fruit/(.*)$ /items/$1;
```

* `^/fruit/` → must start with `/fruit/`
* `(.*)` → match anything after that
* `$1` → reuse whatever was matched

---

✅ **Shortcut advice for beginners:**

* If you just want a **simple redirect**, always start with `return 301 /new-url;` (no regex needed).
* Only use `rewrite` with regex when you need **patterns** (like `/number/anything → /count/anything`).