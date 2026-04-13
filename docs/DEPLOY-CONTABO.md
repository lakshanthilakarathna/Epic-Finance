# Deploy on Contabo (Ubuntu) — one step at a time

Do **only the current step**. When it succeeds, go to the next.  
Domain used below: **epicfinance.co.nz**. App folder on the server: **`/var/www/epicfinance`**.  
Replace `YOUR_SERVER_IP` and SSH user if yours differ.

---

## Part A — DNS (in your domain / Cloudflare / registrar)

### Step 1 — Point the domain to your VPS

In DNS, add:

- **A** record: name `@` (or `epicfinance.co.nz`) → **YOUR_SERVER_IP**
- **A** record: name `www` → **YOUR_SERVER_IP**

Save. Wait until a check shows the IP (e.g. `dig +short epicfinance.co.nz`).

**Do not continue to Certbot until this works.**

---

## Part B — On the VPS (SSH)

SSH in: `ssh deploy@YOUR_SERVER_IP` (or your user).

### Step 2 — Update packages

```bash
sudo apt update && sudo apt upgrade -y
```

Wait until it finishes with no errors.

### Step 3 — Install Nginx, Certbot, firewall tools

```bash
sudo apt install -y curl ca-certificates gnupg nginx certbot python3-certbot-nginx ufw
```

### Step 4 — Install Node.js 20

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v
```

You should see `v20.x`. If not, stop and fix before continuing.

### Step 5 — Open the firewall (SSH + web)

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

Confirm **22**, **80**, and **443** are allowed.

### Step 6 — Contabo panel

In the Contabo customer panel, open any **firewall / security group** for this VPS and allow **80** and **443** if they are blocked there.

### Step 7 — Create app directory

If you use a user named `deploy`:

```bash
sudo mkdir -p /var/www/epicfinance
sudo chown deploy:deploy /var/www/epicfinance
```

If you only have `root`, you can use `root` and `/root/epicfinance` instead—but then change all paths below to match.

**Stop here** until files are on the server (next part).

---

## Part C — On your laptop (Mac): copy the project

### Step 8 — Upload the site files

From your project folder (adjust path if needed):

```bash
cd "/Users/lakshan/Downloads/itsulu-technology-it-solutions-react-nextjs-2026-02-06-13-52-21-utc/itsulu"
rsync -avz \
  --exclude node_modules \
  --exclude .next \
  --exclude .git \
  --exclude .env.local \
  --exclude .env.production \
  ./ deploy@YOUR_SERVER_IP:/var/www/epicfinance/
```

Use your real SSH user instead of `deploy` if different. **`--exclude .env.production`** keeps the SMTP file that exists only on the VPS from being overwritten.

### Step 9 — Back on the VPS: production env (mail)

Next loads **`/var/www/epicfinance/.env.production`** at build and runtime (no `/etc/epicfinance.env` required).

```bash
cd /var/www/epicfinance
cp deploy/epicfinance.env.example .env.production
nano .env.production
```

Fill in **`SMTP_PASS`** (and change other lines only if needed). Save.

```bash
chmod 600 .env.production
chown deploy:deploy .env.production
```

### Step 10 — Install dependencies and build

```bash
cd /var/www/epicfinance
npm ci
npm run build
```

Wait until `npm run build` completes successfully.

---

## Part D — Run the app (systemd)

### Step 11 — Install systemd service

```bash
sudo cp /var/www/epicfinance/deploy/epicfinance-nextjs.service /etc/systemd/system/
sudo nano /etc/systemd/system/epicfinance-nextjs.service
```

Set **`User=`** and **`Group=`** to `deploy` (or your user). Set **`WorkingDirectory=`** to `/var/www/epicfinance`. The unit uses **`ExecStart=.../node .../next start`** (not `npm`); if **`/usr/bin/node`** is wrong on your server, run `readlink -f $(which node)` as root and put that path in **`ExecStart=`**. Save.

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now epicfinance-nextjs
sudo systemctl status epicfinance-nextjs
```

You want **active (running)**. If it failed, read the red lines, then `journalctl -u epicfinance-nextjs -n 50 --no-pager`.

---

## Part E — Nginx + HTTPS

### Step 12 — Nginx site config

```bash
sudo cp /var/www/epicfinance/deploy/nginx-nextjs.conf.example /etc/nginx/sites-available/epicfinance
sudo nano /etc/nginx/sites-available/epicfinance
```

Set:

```nginx
server_name epicfinance.co.nz www.epicfinance.co.nz;
```

Save. Enable site and reload:

```bash
sudo ln -sf /etc/nginx/sites-available/epicfinance /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

`nginx -t` must say **syntax is ok**.

### Step 13 — SSL certificate (after DNS works)

```bash
sudo certbot --nginx -d epicfinance.co.nz -d www.epicfinance.co.nz
```

Follow the prompts. When done, open **https://epicfinance.co.nz** in a browser.

---

## Part F — Checklist

### Step 14 — Website

- [ ] `https://epicfinance.co.nz` loads
- [ ] `https://www.epicfinance.co.nz` loads or redirects (either is fine)

### Step 15 — Contact email

- [ ] Open **https://epicfinance.co.nz/contact**
- [ ] Send a test message
- [ ] Email arrives at **CONTACT_TO**

If mail fails:

```bash
sudo journalctl -u epicfinance-nextjs -n 80 --no-pager
```

Check Zoho app password and **`/var/www/epicfinance/.env.production`** (variables must be set before **`npm run build`** if you change them).

---

## Quick deploy (after the first full setup)

**A — From your Mac (manual):** run **Step 8** `rsync`, then SSH to the VPS and run:

```bash
cd /var/www/epicfinance
npm ci
npm run build
sudo systemctl restart epicfinance-nextjs
```

**B — From GitHub (automatic):** add **Actions secrets** (**Part G, Step 18**), then **`git push` to `main`** or run **Actions → Deploy to Contabo → Run workflow**. The workflow file is **`.github/workflows/deploy-contabo.yml`**.

---

## Later: update the site

**Laptop:** run the same **Step 8** `rsync` again (or use **GitHub Actions** if configured).

**VPS:**

```bash
cd /var/www/epicfinance
npm ci
npm run build
sudo systemctl restart epicfinance-nextjs
```

---

## Part G — GitHub (recommended)

Use GitHub for **version control** after the site is hosted. The VPS stays the **runtime**; GitHub holds the **code** (and optional automatic deploys).

### Step 16 — Create a repo and first push (on your Mac)

1. On GitHub: **New repository** → choose **Private** → create it (no README required if you already have files locally).
2. In your project folder (the `itsulu` directory):

```bash
cd "/path/to/itsulu"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git push -u origin main
```

3. **Never commit secrets.** This repo’s `.gitignore` excludes `node_modules/`, `.next/`, `.env.local`, and **`.env.production`**. SMTP passwords stay only on the VPS in **`/var/www/epicfinance/.env.production`**.

### Step 17 — Day-to-day workflow (manual deploy)

1. Edit code on your laptop → **`git add` / `git commit` / `git push`**.
2. Deploy to Contabo: run **Step 8** `rsync` again, then on the VPS run **npm ci**, **npm run build**, **systemctl restart** (same as the “Later: update the site” block above).

### Step 18 — Optional: deploy on every push (GitHub Actions)

1. On the VPS, create an **SSH key pair** used only for CI (as **`deploy`**). The **public** key must be in **`authorized_keys`** so GitHub can connect with the **private** key stored as a secret.

```bash
sudo -u deploy mkdir -p /home/deploy/.ssh
sudo chmod 700 /home/deploy/.ssh
sudo -u deploy ssh-keygen -t ed25519 -f /home/deploy/.ssh/github_actions_deploy -N ""
sudo -u deploy sh -c 'cat /home/deploy/.ssh/github_actions_deploy.pub >> /home/deploy/.ssh/authorized_keys'
sudo chmod 600 /home/deploy/.ssh/authorized_keys
```

On the server, show the **private** key once and add it in GitHub under **Settings → Secrets and variables → Actions → Secrets** as **`DEPLOY_SSH_KEY`**. Paste the **full multiline** key exactly as printed (with line breaks). **Never** put the private key under **Variables** (it is not secret there and may be exposed). **Never** paste the private key in chat, email, or commits.

```bash
sudo -u deploy cat /home/deploy/.ssh/github_actions_deploy
```

(If you prefer **`root`** for deploy SSH instead, generate under `/root/.ssh` and add the `.pub` line to `/root/.ssh/authorized_keys` instead.)

2. Add **Repository variables** (same settings page → **Variables** tab): **`DEPLOY_HOST`** (e.g. `173.212.208.181`) and **`DEPLOY_USER`** (`deploy` or `root`). The workflow reads these as `vars.*`; only **`DEPLOY_SSH_KEY`** uses **Secrets**.

3. If **`DEPLOY_USER`** is `deploy`, allow a passwordless restart (as **root** on the VPS):

```bash
echo 'deploy ALL=(ALL) NOPASSWD: /bin/systemctl restart epicfinance-nextjs' > /etc/sudoers.d/epicfinance-deploy
chmod 440 /etc/sudoers.d/epicfinance-deploy
```

4. The workflow file **`.github/workflows/deploy-contabo.yml`** is already in this repo. After secrets and sudo are set, push to **`main`** or use **Actions → Deploy to Contabo → Run workflow**.

The workflow **rsyncs** the repo to **`/var/www/epicfinance`** and excludes **`.env.production`**. The **[deploy/github-actions-deploy.yml.example](../deploy/github-actions-deploy.yml.example)** file is a duplicate reference copy.

---

## Files in this repo

| File | Purpose |
|------|---------|
| [deploy/epicfinance.env.example](../deploy/epicfinance.env.example) | Template for `.env.production` on the VPS |
| [deploy/epicfinance-nextjs.service](../deploy/epicfinance-nextjs.service) | systemd unit |
| [deploy/nginx-nextjs.conf.example](../deploy/nginx-nextjs.conf.example) | Nginx reverse proxy |
| [deploy/pm2.ecosystem.config.cjs.example](../deploy/pm2.ecosystem.config.cjs.example) | Optional PM2 instead of systemd |
| [.github/workflows/deploy-contabo.yml](../.github/workflows/deploy-contabo.yml) | GitHub Actions → Contabo deploy (needs secrets) |
| [deploy/github-actions-deploy.yml.example](../deploy/github-actions-deploy.yml.example) | Same workflow, reference copy |
