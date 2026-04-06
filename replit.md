# Dijital Asistan Panelim

A personal Turkish digital assistant panel for tracking tasks, agendas, and reminders.

## Stack

- **Type:** Static HTML website
- **Language:** HTML5
- **Server (dev):** Python 3 built-in HTTP server

## Project Structure

- `index.html` — Main page with Turkish-language welcome content
- `README.md` — Project description (in Turkish)

## Running the App

The app is served via Python's built-in HTTP server:

```
python3 -m http.server 5000 --bind 0.0.0.0
```

This is configured as the "Start application" workflow on port 5000.

## Deployment

Configured as a **static** deployment with `publicDir: "."`.
