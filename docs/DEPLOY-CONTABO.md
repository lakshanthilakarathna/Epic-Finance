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

Next and the mail helpers load **`/var/www/epicfinance/.env.production`** at build and runtime. The systemd unit also references that path via **`EnvironmentFile=`** so the running process inherits **`SMTP_*`** even if in-app loading misbehaves. Optional: set **`SMTP_ENV_FILE`** to another path (see **`deploy/epicfinance.env.example`**). For **SEO** (canonical and Open Graph URLs), you can set **`NEXT_PUBLIC_SITE_URL=https://epicfinance.co.nz`** in the same file before **`npm run build`**; omit on production if the default domain is correct.

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

Set **`User=`** and **`Group=`** to `deploy` (or your user). Set **`WorkingDirectory=`** to `/var/www/epicfinance`. The unit includes **`EnvironmentFile=-/var/www/epicfinance/.env.production`** so SMTP variables are loaded by systemd before Node starts (optional; the `-` prefix ignores a missing file). The unit uses **`ExecStart=.../node .../next start`** (not `npm`); if **`/usr/bin/node`** is wrong on your server, run `readlink -f $(which node)` as root and put that path in **`ExecStart=`**. Save.

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

The example config sets **`client_max_body_size 20m`** so the **loan application** can upload documents (JPEG/PNG/WebP/PDF). If you omit it, Nginx may return **413** for larger multipart requests.

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

**Loan application (413 Request Entity Too Large):** After Certbot, Nginx usually has a **`server { listen 443 ssl; ... }`** block. Add **`client_max_body_size 20m;`** inside that **HTTPS** block as well as the port **80** block (same line as in **`deploy/nginx-nextjs.conf.example`**), then **`sudo nginx -t && sudo systemctl reload nginx`**. If it is missing on **443**, uploads over ~1 MB fail before they reach Next.js.

---

## Part F — Checklist

### Step 14 — Website

- [ ] `https://epicfinance.co.nz` loads
- [ ] `https://www.epicfinance.co.nz` loads or redirects (either is fine)

### Step 15 — Contact email

- [ ] Open **https://epicfinance.co.nz/contact**
- [ ] Send a test message
- [ ] Email arrives at **CONTACT_TO** (check **spam** if nothing in inbox)

If mail fails:

```bash
sudo journalctl -u epicfinance-nextjs -n 120 --no-pager
```

Look for **`smtp: MAIL_SMTP_NOT_CONFIGURED`** (JSON in logs shows **`hasHost` / `hasUser` / `hasPass`** — booleans only, no secrets), **`smtp: sendMail failed`** (with `responseCode`), or **`smtp: message accepted`** (with `messageId` — proves the provider accepted the message). Check Zoho **app-specific password** and **`/var/www/epicfinance/.env.production`**. After editing `.env.production`, run **`sudo systemctl daemon-reload`** if you changed the unit file, then **`sudo systemctl restart epicfinance-nextjs`** (no rebuild required for SMTP-only changes).

#### Verify SMTP env (without printing secrets)

**`systemctl show epicfinance-nextjs -p Environment`** does not list variables from **`EnvironmentFile=`**; use logs or a one-off check as **`deploy`**:

```bash
sudo -u deploy -H bash -lc 'cd /var/www/epicfinance && node -e "require(\"dotenv\").config({path:\".env.production\",override:true}); console.log(\"SMTP_PASS set:\", Boolean(process.env.SMTP_PASS && process.env.SMTP_PASS.trim()));"'
```

You should see **`SMTP_PASS set: true`** after filling the file. **`sudo systemctl restart epicfinance-nextjs`** after any change.

#### Troubleshooting form email (quick)

| What you see | What to check |
|----------------|---------------|
| Browser error after submit | DevTools → **Network** → POST **`/api/contact`** (or **`/api/complaints`**, **`/api/loan-application`**) → **status** (400 = validation, 500 = SMTP, 404 = proxy/app) and **response JSON**. If JSON includes **`code`**: **`MAIL_SMTP_NOT_CONFIGURED`** = missing/empty **`SMTP_HOST` / `SMTP_USER` / `SMTP_PASS`** on the server (or use **`.env.local`** for **`next dev`**); **`MAIL_SEND_FAILED`** = provider rejected send — use **`journalctl`** for **`smtp: sendMail failed`** (`responseCode`, e.g. auth/TLS). |
| Success in UI but no email | Spam folder; you are watching the mailbox set in **`CONTACT_TO`** (or **`COMPLAINTS_TO`** / **`LOAN_APPLICATION_TO`**). Logs show **`smtp: message accepted`** → provider accepted delivery; trace in Zoho. |
| Spinner / no response | Network tab: failed or pending request; Nginx/SSL. |

Confirm the env file exists on the VPS:

```bash
ls -la /var/www/epicfinance/.env.production
```

Deploy/rsync **does not** upload `.env.production`; create it on the server from **`deploy/epicfinance.env.example`**.

**Zoho checklist:** `SMTP_USER` matches the mailbox; `SMTP_PASS` is an **application-specific** password where required; try **`SMTP_PORT=465`** or **`587`** with comments in the example file; ensure SMTP outbound is allowed for that account.

---

## Quick deploy (after the first full setup)

**A — From your Mac (manual):** run **Step 8** `rsync`, then SSH to the VPS and run:

```bash
cd /var/www/epicfinance
npm ci
npm run build
sudo systemctl restart epicfinance-nextjs
```

**B — From GitHub:** add **Actions secrets** (**Part G, Step 18**), then run **Actions → Deploy to Contabo → Run workflow** (SSH path; manual by default). For **push-to-deploy** without SSH from GitHub, use **Deploy to Contabo (self-hosted)** after installing a runner (**Step 19**).

The **Deploy to Contabo** workflow runs **`npm ci`** and **`npm run build`** on GitHub’s runner **before** SSH/rsync so broken commits fail early (the VPS still runs a full build in **`deploy/ci-remote.sh`**).

### Forms (email via SMTP)

The site sends **contact**, **complaints**, and **loan application** submissions through **`/api/contact`**, **`/api/complaints`**, and **`/api/loan-application`** (same **`next start`** process). All need **`SMTP_*`** in **`.env.production`**. Optional: **`SMTP_FROM`** (display name + address), **`COMPLAINTS_TO`**, and **`LOAN_APPLICATION_TO`** — see **`deploy/epicfinance.env.example`**; default **`From`** is **`SMTP_USER`** and inbound default is **`CONTACT_TO`**.

The app loads **`.env.production`** via **`loadEnvConfig`** and **`dotenv`** when mail runs; systemd **`EnvironmentFile=`** also injects the same file. **`WorkingDirectory`** must stay **`/var/www/epicfinance`**. After creating or editing **`.env.production`**, run **`sudo systemctl restart epicfinance-nextjs`**. Deploy logs warn if **`.env.production`** is missing.

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

2. Add **`DEPLOY_HOST`** (VPS IP or hostname) and **`DEPLOY_USER`** (`deploy` or `root`) as **Repository variables** *or* **Secrets** (the workflow accepts either). Only **`DEPLOY_SSH_KEY`** must be a **Secret** (never a Variable).

3. If **`DEPLOY_USER`** is `deploy`, allow a passwordless restart (as **root** on the VPS):

```bash
echo 'deploy ALL=(ALL) NOPASSWD: /bin/systemctl restart epicfinance-nextjs' > /etc/sudoers.d/epicfinance-deploy
chmod 440 /etc/sudoers.d/epicfinance-deploy
```

4. The workflow **`.github/workflows/deploy-contabo.yml`** (SSH from GitHub) runs **manually only** by default (**Actions → Deploy to Contabo → Run workflow**). Pushes to **`main`** do not start it, so a blocked port 22 does not fail every commit. When SSH from GitHub works, you may edit that file and add **`push: branches: [main]`** under **`on:`** for automatic deploys.

The workflow **rsyncs** the repo to **`/var/www/epicfinance`** and excludes **`.env.production`**. The **[deploy/github-actions-deploy.yml.example](../deploy/github-actions-deploy.yml.example)** file is a duplicate reference copy.

If Actions fails on **Probe IPv4 TCP port 22** or **Test SSH** (often after ~20–30s): GitHub’s runners must reach your VPS on **SSH port 22**. On the server run **`sudo ufw allow OpenSSH`** (or **`sudo ufw allow 22/tcp`**) and **`sudo ufw enable`** if you use UFW. In the **Contabo** control panel, check any **firewall** so **TCP 22** is allowed from the internet. Some providers block **datacenter / Azure** source IPs (GitHub Actions runs on Azure): if the **Probe** step always fails while your home PC can SSH, ask Contabo support or use a **[self-hosted Actions runner](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners)** on the VPS (deploy then runs locally, no inbound SSH from GitHub needed).

If **Validate DEPLOY_SSH_KEY** fails, the secret is corrupted (often single-line paste with spaces). Re-paste the full multiline key from **`cat /root/.ssh/github_actions_deploy`** on the server.

If the SSH workflow passes **Rsync** but fails with **`npm: command not found`** on the server: install Node.js on the VPS (**Part B, Step 4**). The workflow runs **`bash -lc`** so **`npm`** is picked up from a normal login **`PATH`** (e.g. NodeSource under **`/usr/bin`**).

### Step 19 — Self-hosted runner (when SSH from GitHub always fails)

If **Probe** or **Test SSH** never succeeds from **ubuntu-latest** but your **Mac can SSH**, your provider may be **blocking datacenter/Azure IPs**. Use a **[self-hosted runner](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners)** on the VPS so the job runs **on the server** (outbound HTTPS to GitHub only; **no inbound SSH from GitHub**).

1. On the VPS: install Node.js if needed (same as Part B). Ensure **`/var/www/epicfinance`** exists and the runner user can write it.
2. GitHub: **Settings → Actions → Runners → New self-hosted runner** — choose **Linux** / **x64**, follow the download and **`./config.sh`** steps. Install as a service (**`./svc.sh install`** then **`./svc.sh start`**).
3. If the runner user is not **root**, allow **`sudo systemctl restart epicfinance-nextjs`** without a password (same idea as Step 18, sudoers snippet for that user).
4. **Actions → Deploy to Contabo (self-hosted) → Run workflow**. When it goes green, edit **`.github/workflows/deploy-contabo-selfhosted.yml`** and add **`push: branches: [main]`** under **`on:`** so every **`git push`** to **`main`** deploys. The SSH workflow **Deploy to Contabo** is manual-only by default and no longer runs on push.

---

## Files in this repo

| File | Purpose |
|------|---------|
| [deploy/epicfinance.env.example](../deploy/epicfinance.env.example) | Template for `.env.production` on the VPS |
| [deploy/epicfinance-nextjs.service](../deploy/epicfinance-nextjs.service) | systemd unit |
| [deploy/nginx-nextjs.conf.example](../deploy/nginx-nextjs.conf.example) | Nginx reverse proxy |
| [deploy/pm2.ecosystem.config.cjs.example](../deploy/pm2.ecosystem.config.cjs.example) | Optional PM2 instead of systemd |
| [.github/workflows/deploy-contabo.yml](../.github/workflows/deploy-contabo.yml) | GitHub Actions → Contabo via SSH (needs secrets + reachable port 22) |
| [.github/workflows/deploy-contabo-selfhosted.yml](../.github/workflows/deploy-contabo-selfhosted.yml) | Deploy from a runner **on the VPS** (no inbound SSH from GitHub) |
| [deploy/github-actions-deploy.yml.example](../deploy/github-actions-deploy.yml.example) | Copy of SSH-based workflow |
