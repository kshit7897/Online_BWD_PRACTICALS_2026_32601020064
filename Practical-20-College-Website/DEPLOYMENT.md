# Publishing the Website on a Web Server

## 1. Folder structure (ready for publishing)

```
Practical-20-College-Website/
├── index.html        <- Home page (web servers open index.html by default)
├── about.html
├── courses.html
├── gallery.html
├── contact.html
├── css/
│   └── style.css     <- common stylesheet for all pages
├── js/
│   └── script.js     <- common JavaScript for all pages
└── images/           <- all images
```

### Checklist before uploading
1. The home page is named **`index.html`**.
2. All links use **relative paths** (`about.html`, `css/style.css`), not `C:\Users\...` paths.
3. File names are in **lowercase without spaces** (servers like Linux are case-sensitive).
4. Every page has `<meta name="viewport">` so it works on mobile.
5. Test every page and link in the browser locally first.
6. Images are compressed so the site loads fast.

---

## 2. Method A: GitHub Pages (free, recommended)

1. Create an account on [github.com](https://github.com).
2. Create a new **public** repository (for example `college-website`).
3. Upload the files, or use Git:
   ```bash
   git init
   git add .
   git commit -m "Add college website"
   git branch -M main
   git remote add origin https://github.com/<username>/college-website.git
   git push -u origin main
   ```
4. In the repository go to **Settings → Pages**.
5. Under **Source** select **Deploy from a branch**, choose branch **main** and folder **/ (root)**, then click **Save**.
6. After 1–2 minutes the site is live at:
   `https://<username>.github.io/college-website/`

> If this folder is inside the lab repository, the URL will be
> `https://<username>.github.io/<repo-name>/Practical-20-College-Website/`

## 3. Method B: Netlify (drag and drop)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the whole website folder onto the page.
3. Netlify gives a live URL like `https://random-name.netlify.app`. You can rename it in site settings.

## 4. Method C: Paid hosting with cPanel / FTP

1. Buy a **domain name** (e.g. `mycollege.in`) and a **hosting plan**.
2. Log in to **cPanel → File Manager** and open the **`public_html`** folder.
3. Upload all files (or upload a `.zip` and extract it there).
   You can also use an FTP client like **FileZilla** with the FTP host, username and password from the hosting provider.
4. Point the domain's DNS to the hosting server (usually done automatically by the provider).
5. Open `https://mycollege.in` in a browser.

## 5. Method D: Local web server (for testing)

- **VS Code Live Server:** install the extension, right click `index.html` → *Open with Live Server*.
  It opens at `http://127.0.0.1:5500`.
- **XAMPP:** copy the folder to `C:\xampp\htdocs\college`, start **Apache**, and open
  `http://localhost/college/`.

---

## 6. How the browser accesses the website

1. The user types the URL (e.g. `https://username.github.io/college-website/`) in the browser.
2. **DNS** converts the domain name into the server's **IP address**.
3. The browser sends an **HTTP/HTTPS request** to that server.
4. The **web server** finds `index.html` and sends it back in the **HTTP response**.
5. The browser reads the HTML, then requests the linked **CSS, JS and image** files.
6. The browser **renders** the page, and JavaScript makes it interactive.
