# How to Start the Portfolio Website (Local Host)

## Quick Start (every time you want to view the site)

Open a terminal and run these two commands:

```bash
cd /home/shashank/Career-OS/portfolio-site
npm run dev
```

Then open your browser and go to:

```
http://localhost:3000
```

That's it. The site will reload automatically whenever you change a file.

To **stop** the server: press `Ctrl + C` in the terminal.

---

## First Time Only (if you ever move the project or delete node_modules)

If you see errors about missing packages, install dependencies first:

```bash
cd /home/shashank/Career-OS/portfolio-site
npm install
npm run dev
```

---

## Common Commands

| What you want to do            | Command            |
|--------------------------------|--------------------|
| Start the live site (dev)      | `npm run dev`      |
| Stop the site                  | `Ctrl + C`         |
| Build for production           | `npm run build`    |
| Run the production build       | `npm run start`    |
| Install/reinstall packages     | `npm install`      |

---

## Troubleshooting

### "Port 3000 is already in use" / "Another next dev server is already running"
A server is already running. Either:
- Just open `http://localhost:3000` — it's already live, OR
- Find and stop the old one:
  ```bash
  lsof -i :3000 -t        # shows the process ID (PID)
  kill <PID>              # replace <PID> with the number shown
  npm run dev             # start fresh
  ```

### Run it on a different port
```bash
npm run dev -- -p 3001
```
Then open `http://localhost:3001`.

### Page not loading / blank screen
1. Check the terminal for red error messages.
2. Stop the server (`Ctrl + C`) and run `npm run dev` again.
3. If still broken, run `npm install` then `npm run dev`.

---

## Notes
- The site uses Next.js 16 + TypeScript + Tailwind CSS 4 + Framer Motion.
- "dev" mode = live preview for editing. "build" + "start" = production-optimised version.
- You do NOT need internet to run it locally once packages are installed.
