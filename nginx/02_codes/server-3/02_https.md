You want to add **HTTPS (SSL/TLS)** to your Nginx setup.
Here’s a **step-by-step guide** with commands.

---

## 🔑 1. Install Certbot & Nginx plugin

On Ubuntu/Debian:

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
```

On CentOS/RHEL:

```bash
sudo yum install certbot python3-certbot-nginx -y
```

This installs **Certbot** (Let’s Encrypt client) and the **Nginx plugin**.

---

## 🔧 2. Update Your Nginx Config

Make sure your Nginx server block for your domain looks like this (no SSL yet):

```nginx
server {
    listen 80;
    server_name myexamplewebsite.xyz www.myexamplewebsite.xyz;

    root /usr/share/nginx/html/myexamplewebsite.com/;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    access_log /var/log/nginx/myexamplewebsite.xyz.access.log;
    error_log /var/log/nginx/myexamplewebsite.xyz.error.log;
}
```

Reload Nginx to apply:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🔐 3. Get SSL Certificate with Certbot

Run:

```bash
sudo certbot --nginx -d myexamplewebsite.xyz -d www.myexamplewebsite.xyz
```

👉 What happens:

* Certbot talks to Let’s Encrypt.
* Verifies your domain via HTTP challenge.
* Updates your Nginx config automatically with `listen 443 ssl;` and SSL certificate paths.
* Reloads Nginx.

---

## 📜 4. Auto SSL Renewal

Certificates expire every 90 days. Set up auto renewal:

```bash
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

You can test renewal manually:

```bash
sudo certbot renew --dry-run
```

---

## 📂 5. After Success (Your Config Will Look Like)

```nginx
server {
    listen 80;
    server_name myexamplewebsite.xyz www.myexamplewebsite.xyz;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name myexamplewebsite.xyz www.myexamplewebsite.xyz;

    ssl_certificate /etc/letsencrypt/live/myexamplewebsite.xyz/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/myexamplewebsite.xyz/privkey.pem;

    root /usr/share/nginx/html/myexamplewebsite.com/;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    access_log /var/log/nginx/myexamplewebsite.xyz.access.log;
    error_log /var/log/nginx/myexamplewebsite.xyz.error.log;
}
```

👉 First block: Redirects all HTTP traffic to HTTPS.
👉 Second block: Handles HTTPS with SSL.

---

✅ Now your site will be available securely at:
🔗 `https://myexamplewebsite.xyz`
