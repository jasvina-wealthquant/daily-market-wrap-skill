# Daily Market Wrap, a Claude Code skill

A one page daily note on the Indian stock market, built after the 3:30 PM IST close, Monday to Friday. Claude pulls index and sector closes from the Zerodha Kite MCP, checks the day's news, and renders a 1080x1350 image in a calm notebook style, plus a short caption to post with it.

The page has a date badge, the "Number of the Day", a five index scorecard (Nifty 50, Bank Nifty, Smallcap 250, Microcap 250, India VIX), sector bars, "Why it moved", "Watch tomorrow" and a one line "My read".

## Install

```bash
git clone https://github.com/jasvina-wealthquant/daily-market-wrap-skill ~/.claude/skills/daily-market-wrap
cd ~/.claude/skills/daily-market-wrap
npm install
npx playwright install chromium   # only if you don't already have a Playwright Chromium
```

Connect the Kite MCP in Claude Code:

```bash
claude mcp add --transport http -s user kite https://mcp.kite.trade/mcp
```

## Use

After the market closes, type `/daily-market-wrap` in Claude Code, or just ask for "today's market wrap". Claude will ask you to log in to Zerodha once a day. The page and PNG are saved to `~/market-wraps/daily/<date>.html` and `.png`.

To re-render a page by hand:

```bash
node shot.js ~/market-wraps/daily/2026-11-05.html ~/market-wraps/daily/2026-11-05.png
```

## Files

- `SKILL.md`: the instructions Claude follows (data, page rules, checks, caption).
- `template.html`: a finished example page that Claude copies each day.
- `shot.js`: renders the page to PNG with Playwright.

## Notes

Index and sector data only, for education. No stock tips, and it never uses your own holdings.
