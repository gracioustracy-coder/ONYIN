# Grace Onyin Peters — Portfolio

> Business Process Automation · Workflow Design · AI Integration

## Quick Setup

This is a plain HTML/CSS/JS website — **no build tools, no frameworks, no installations needed**.

### View locally

1. Open `index.html` directly in your browser, **or**
2. Use VS Code with the **Live Server** extension (right-click `index.html` → *Open with Live Server*)

---

## Things You Must Personalise Before Publishing

### 1. LinkedIn URL *(Required)*
Open `index.html` and find this comment:
```html
<!-- 
  LINKEDIN: Replace the href="#" below with your actual LinkedIn URL.
  Example: href="https://linkedin.com/in/your-profile-name"
-->
```
Replace `href="#"` with your real LinkedIn URL.

---

### 2. Professional Photo *(When Ready)*
Find this block in `index.html`:
```html
<div class="photo-placeholder" ...>
  <span class="photo-placeholder__initials">GOP</span>
</div>
<!--
  TO ADD YOUR PHOTO:
  Replace the <div class="photo-placeholder"> block above with:
  <img src="assets/photo.jpg" alt="Grace Onyin Peters" class="photo-real" />
-->
```
1. Save your photo as `assets/photo.jpg`
2. Replace the `<div class="photo-placeholder">` with: `<img src="assets/photo.jpg" alt="Grace Onyin Peters" class="photo-real" />`
3. The `.photo-real` CSS class is already written — the photo will be circular and correctly sized automatically.

---

### 3. Project Screenshots *(When Ready)*
To add screenshots to a case study, insert an image inside the relevant `.cs-block`:
```html
<figure class="cs-figure">
  <img src="assets/gym-workflow.png" alt="n8n canvas showing the Gym Membership onboarding workflow" />
  <figcaption>n8n canvas — Onboarding sub-workflow</figcaption>
</figure>
```
Add this CSS to `css/style.css`:
```css
.cs-figure {
  border: 1px solid var(--clr-border);
  border-radius: var(--r-md);
  overflow: hidden;
  margin-top: 1rem;
}
.cs-figure img { width: 100%; display: block; }
.cs-figure figcaption {
  font-size: 0.8125rem;
  color: var(--clr-text-3);
  padding: 0.5rem 0.75rem;
  background: var(--clr-bg-alt);
  border-top: 1px solid var(--clr-border);
}
```

---

## Deploying to GitHub Pages (Free Hosting)

### Step 1 — Create a GitHub account
Go to [github.com](https://github.com) and create a free account if you don't have one.

### Step 2 — Create a new repository
- Click **New** (green button)
- Name it: `portfolio` (or `grace-portfolio`)
- Set to **Public**
- Click **Create repository**

### Step 3 — Upload your files
- Click **uploading an existing file**
- Drag and drop these files/folders:
  - `index.html`
  - `css/` folder
  - `js/` folder
  - `assets/` folder

### Step 4 — Enable GitHub Pages
- Go to your repository → **Settings** → **Pages**
- Under **Source**, select `main` branch and `/ (root)`
- Click **Save**

Your site will be live at:
```
https://YOUR-GITHUB-USERNAME.github.io/portfolio/
```

---

## Adding Zapier Projects Later

When you're ready to add your Zapier workflows:

1. Give them to the AI assistant with full details (same format as your n8n projects)
2. The assistant will classify them (Featured / Supporting / Learning / Do Not Display)
3. A new project card and optionally a case study will be added — **without rebuilding the whole site**

---

## File Structure

```
grace-portfolio/
├── index.html          ← Main portfolio page (single page)
├── css/
│   └── style.css       ← All styles
├── js/
│   └── main.js         ← Navigation, animations, contact form
├── assets/             ← Your photos and screenshots go here
│   └── (empty)
└── README.md           ← This file
```

---

## Contact Form

The contact form currently uses a **mailto: link** — clicking "Send Message" opens your email client with the message pre-filled. This requires no backend server.

**To upgrade to a proper web form** (no email client needed):
- Create a free account at [formspree.io](https://formspree.io)
- Replace the form `action` attribute with your Formspree endpoint
- Change the form method to `POST`
- The assistant can do this for you when you're ready

---

*Built October 2026*
