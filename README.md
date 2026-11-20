# tiny-shop

A small Express + SQLite shop API, written to try out GitHub CodeQL code scanning.

**It contains intentional security bugs. Do not deploy it or expose it to a network.**

Some code is genuinely vulnerable, some only looks vulnerable, and at least one real
bug is the kind static analysis usually cannot see. Triage the alerts yourself.

## Run locally (optional)

```
npm install
npm start
```

The server listens on http://localhost:3000.
