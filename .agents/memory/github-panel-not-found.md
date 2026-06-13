---
name: GitHub panel "Not Found" is cosmetic
description: The Replit Git panel "remote not accessible / Not Found" error on this repo is a REST-metadata permission issue, not data loss.
---

# Replit Git panel "Not Found" on caio-padua/Pactor

The Git panel sometimes shows a red error: "The remote repository is not accessible ... Not Found" pointing at the GitHub REST `get-a-repository` doc.

**Rule:** This is cosmetic. The git transport (ls-remote / push / pull) and the public raw URLs keep working. Do NOT tell the user their data is lost.

**Why:** The Replit account (caioregister) differs from the GitHub repo owner (caio-padua). Replit's panel uses a separate REST/metadata call that can 404 even when the git transport is fully authorized and in sync. Confirmed once: origin/main matched the latest local commit and every doc returned HTTP 200 via raw URL while the panel still showed the red error.

**How to apply:** When the user reports this panel error, before reassuring, verify at the source:
1. `git --no-optional-locks ls-remote origin refs/heads/main` — compare to local HEAD.
2. `curl -s -o /dev/null -w "%{http_code}" https://raw.githubusercontent.com/caio-padua/Pactor/main/<path>` — expect 200.
If both pass, the data is safe; the fix (optional) is to reconnect GitHub in the Replit Git panel settings.
