You’re trying to make Nginx serve an `index.html` file directly from a **folder on your Desktop (Windows path: `D:\My_Workings\SkillStack\nginx\02_codes`)**.

Here’s what you need to know:

---

## 🔹 Problem

Nginx **does not understand Windows-style paths (`D:\...`)** — it expects **Linux/Unix paths** because when you install Nginx on WSL/Ubuntu, it runs in a Linux environment.

So you must:

1. Either **move your files** into a Linux path (like `/var/www/...`)
2. Or **mount your Windows path** inside WSL and then point Nginx to it.

---

## 🔹 Fix 1 (Recommended): Move into `/var/www/`

Put your project in a standard Nginx location:

```bash
sudo mkdir -p /var/www/myproject
sudo cp -r /mnt/d/My_Workings/SkillStack/nginx/02_codes/* /var/www/myproject/
```

Then configure `nginx.conf`:

```nginx
events {}

http {
    server {
        listen 8080;
        root /var/www/myproject;
        index index.html;
    }
}
```

Reload Nginx:

```bash
sudo nginx -t   # check config
sudo systemctl reload nginx
```

Now visit → `http://localhost:8080`

---

## 🔹 Fix 2 (Directly Use Windows Path in WSL)

In WSL, your **D: drive is mounted at `/mnt/d`**.
So update config like this:

```nginx
events {}

http {
    server {
        listen 8080;
        root /mnt/d/My_Workings/SkillStack/nginx/02_codes;
        index index.html;
    }
}
```

Reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Now open in browser:
👉 `http://localhost:8080`

---

✅ **Key Points**

* Use `/mnt/d/...` instead of `D:\...`
* Always add `index index.html;` (otherwise Nginx won’t know which file to load)
* You’ll usually edit config inside `/etc/nginx/sites-available/` → then symlink to `/etc/nginx/sites-enabled/`