# Roam Morocco Tours (roammorocco.tours)

Official website repository for [roammorocco.tours](https://roammorocco.tours).

## 🚀 Automated Deployment (GitHub Actions)

Every push to the `main` branch automatically deploys modified files to Hostinger via GitHub Actions (`.github/workflows/deploy.yml`).

### Required GitHub Secrets

To enable auto-deployment, add the following secrets in **GitHub > Repository Settings > Secrets and variables > Actions > New repository secret**:

| Secret Name | Value Description | Example / Location in Hostinger |
|---|---|---|
| `FTP_SERVER` | Hostinger FTP Host IP or domain | Found in Hostinger hPanel > **Files** > **FTP Accounts** (e.g. `ftp.roammorocco.tours` or IP `185.xxx.xxx.xxx`) |
| `FTP_USERNAME` | Your Hostinger FTP Username | e.g. `u939993539` |
| `FTP_PASSWORD` | Your Hostinger FTP Password | Password set for your FTP account |
| `FTP_SERVER_DIR` *(Optional)* | Target directory on server | Defaults to `public_html/`. If your FTP account already points directly into `public_html`, set to `./` |

---

### Local Development

Open `index.html` in your browser or run a local static server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```
