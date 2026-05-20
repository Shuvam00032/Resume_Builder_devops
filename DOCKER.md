# Run with Docker

## Start (from project root)

```powershell
cd d:\devops-project\resumebuilderapi
.\mvnw.cmd -DskipTests package

cd d:\devops-project
docker compose up -d --build
```

- **App:** http://localhost:3000  
- **API (direct):** http://localhost:8080  

## After dockerizing — important

1. **Sign up again** at http://localhost:3000 — Docker uses its own MongoDB. Accounts from `npm run dev` are **not** in this database.
2. **Hard refresh** the browser (`Ctrl+Shift+R`) after rebuilds.
3. Login uses **relative** `/api` URLs through nginx (no CORS / wrong `localhost:8080` in the browser).

## Rebuild after code changes

```powershell
cd d:\devops-project\resumebuilderapi
.\mvnw.cmd -DskipTests package

cd d:\devops-project
docker compose up -d --build
```

## Email verification (Docker)

By default, emails go to **Mailpit** (not your real inbox):

1. Sign up in the app.
2. Open **http://localhost:8025** — you will see the verification email there.
3. Click **Verify Email** in Mailpit (link goes to `http://localhost:3000/verify-email?token=...`).

### Send to real Gmail (Brevo)

1. In [Brevo](https://app.brevo.com): verify your **sender email** (Settings → Senders).
2. Create an **SMTP key** (SMTP & API → SMTP).
3. Create `.env` in the project root (copy from `.env.example`) and set:

```env
SPRING_MAIL_HOST=smtp-relay.brevo.com
SPRING_MAIL_PORT=587
SPRING_MAIL_USERNAME=your-login@smtp-brevo.com
SPRING_MAIL_PASSWORD=your-smtp-key
SPRING_MAIL_FROM=your-verified-sender@gmail.com
```

4. `docker compose up -d --build`

`SPRING_MAIL_FROM` must match a **verified sender** in Brevo or mail is dropped.

## Stop

```powershell
docker compose down
```
