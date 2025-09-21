Nginx **logging** is the process by which Nginx records information about requests it handles and any errors it encounters. This is crucial for monitoring, debugging, and analyzing the performance of your web server. Nginx uses two main types of logs:

---

### 1. **Access Logs**

* **Purpose:** Record details about every request made to the server.
* **Information recorded:** Client IP, request method (GET, POST, etc.), requested URL, response code (200, 404, etc.), bytes sent, user agent, referrer, and more.
* **Default location:** `/var/log/nginx/access.log`
* **Example entry:**

  ```
  127.0.0.1 - - [21/Sep/2025:17:20:15 +0530] "GET /index.html HTTP/1.1" 200 1024 "-" "Mozilla/5.0"
  ```
* **Uses:** Track traffic, analyze usage patterns, detect suspicious activity.

---

### 2. **Error Logs**

* **Purpose:** Record problems encountered by Nginx while processing requests.
* **Information recorded:** Error messages, warnings, startup/shutdown messages.
* **Default location:** `/var/log/nginx/error.log`
* **Example entry:**

  ```
  2025/09/21 17:20:15 [error] 12345#0: *1 open() "/var/www/html/missing.html" failed (2: No such file or directory), client: 127.0.0.1, server: localhost, request: "GET /missing.html HTTP/1.1", host: "localhost"
  ```
* **Uses:** Debug server issues, check why requests fail.

---

### 3. **Configuration of Logging**

You can configure logging in the `nginx.conf` or server block:

```nginx
http {
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;
    error_log /var/log/nginx/error.log warn;
}
```

* `log_format` → Defines the format of access log entries.
* `access_log` → Path and format of access logs.
* `error_log` → Path and level of error logs (e.g., `info`, `warn`, `error`, `crit`).

---

In short: **access logs = who visited and what they did**, **error logs = what went wrong**.