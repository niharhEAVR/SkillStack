## 🔹 Start Nginx

Start the server:

```bash
sudo service nginx start
```

Check if it’s running:

```bash
sudo service nginx status
```

You should see **“active (running)”** ✅

---

## 🔹 Access Nginx

Now open your **Windows browser** and try:

```
http://localhost
```

👉 If Nginx is running, you’ll see the **“Welcome to Nginx!”** page 🎉

---

## 🔹 Where to put your own website files

By default, Nginx serves files from:

```
/var/www/html/
```

* Example: the default page is here → `/var/www/html/index.nginx-debian.html`

👉 Replace that file with your own `index.html`:

```bash
sudo nano /var/www/html/index.html
```

(Paste your HTML, save with `CTRL+O`, exit with `CTRL+X`)

Now refresh `http://localhost` → you’ll see your page 🚀

---

## 🔹 Stop / Restart Nginx

* Stop:

  ```bash
  sudo service nginx stop
  ```
* Restart:

  ```bash
  sudo service nginx restart
  ```

---

✅ **Summary:**

* Install: `sudo apt install nginx -y`
* Start: `sudo service nginx start`
* Access: `http://localhost` in your Windows browser
* Your site files: `/var/www/html/`
