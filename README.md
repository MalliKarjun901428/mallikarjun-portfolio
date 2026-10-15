# Levaku Naga Mallikarjun — Personal Portfolio

A modern, responsive personal portfolio website built with **HTML5, CSS3, and Vanilla JavaScript**. No frameworks, no build tools — just open `index.html` in any browser.

---

## 🚀 Quick Start

1. **Clone or download** this folder to your computer.
2. Place your resume PDF at `assets/resume.pdf`.
3. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).

> No server is required. The site works entirely as local HTML files.

---

## 📁 Project Structure

```
portfolio/
├── index.html          ← All page sections
├── style.css           ← Styling (dark/light theme, responsive)
├── script.js           ← All interactivity
├── assets/
│   ├── resume.pdf      ← ⚠️  Add your actual resume here
│   ├── images/         ← Optional project images
│   └── icons/          ← Optional custom icons
└── README.md
```

---

## ✏️ Customisation Guide

### Update Personal Information
All configuration is at the top of `script.js`:
```js
const CONFIG = {
  email:    'levakumallikarjun@gmail.com',
  linkedin: 'https://www.linkedin.com/in/levaku-mallikarjun/',
  github:   'https://github.com/MalliKarJun901428',
  roles: ['Full Stack Developer', 'Java Developer', 'AI & ML Enthusiast'],
};
```

### Add Your Resume
Replace `assets/resume.pdf` with your actual resume PDF. The "Download Resume" button in the hero section downloads this file.

### Update Project GitHub / Live Demo Links
In `index.html`, find each project card and replace the `href` values on the GitHub anchor tag:
```html
<a href="https://github.com/MalliKarJun901428/YOUR-REPO" ...>GitHub</a>
```
Replace the "Coming Soon" span with a real anchor tag once you have a live demo URL.

### Update Certificate Links
In the **Achievements** section of `index.html`, replace `href="#"` on each certificate button with real certificate URLs:
```html
<a href="https://your-cert-url.com" class="btn btn-sm btn-outline">View Certificate</a>
```

### Change Colour Accent
Edit the CSS variables in `style.css` under `:root`:
```css
--accent-blue:   #4f9cf9;   /* Primary accent */
--accent-purple: #9b59f8;   /* Secondary accent */
--accent-cyan:   #00d4ff;   /* Highlight */
```

---

## 🌗 Features

| Feature | Implementation |
|---|---|
| Dark / Light theme | CSS `data-theme` + `localStorage` |
| Sticky navbar + active link | `IntersectionObserver` |
| Mobile hamburger menu | Vanilla JS + CSS |
| Role typewriter animation | setTimeout loop |
| Scroll reveal animations | `IntersectionObserver` |
| Project category filters | data-category attribute |
| Contact form validation | Custom JS validator |
| Contact form submission | `mailto:` fallback |
| Download resume | HTML `<a download>` |
| Back to top button | Scroll listener |
| Dynamic copyright year | `new Date().getFullYear()` |
| Reduced-motion support | `@media (prefers-reduced-motion)` |
| Accessible focus states | `:focus-visible` CSS |

---

## 📬 Connecting a Backend for the Contact Form

Currently the form opens your email client via `mailto:`. To send emails programmatically:

1. **Option A — Formspree** (free tier available): Replace the form action and use `fetch` to POST to `https://formspree.io/f/YOUR_ID`.
2. **Option B — EmailJS**: Integrate the EmailJS SDK and use `emailjs.send(...)`.
3. **Option C — Custom backend**: POST form data to your own Node/Spring Boot/Python endpoint.

See `script.js` → `initForm()` to update submission logic.

---

## 🌐 Deployment

| Platform | Steps |
|---|---|
| **GitHub Pages** | Push folder to a repo → Settings → Pages → `main` branch → `/root` |
| **Netlify** | Drag & drop the folder at [netlify.app](https://app.netlify.com/drop) |
| **Vercel** | `npx vercel` in the project directory |

All three options are free for static sites.

---

## 📄 License

Personal portfolio — all content copyright © 2025 Levaku Naga Mallikarjun.
