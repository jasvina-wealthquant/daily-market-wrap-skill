---
name: daily-market-wrap
description: Build the one page daily Indian market note (Monday to Friday) from Zerodha Kite data, plus a short caption in Alok's voice. Use when the user says "daily market wrap", "today's market wrap", "daily wrap", or runs /daily-market-wrap. Best run after the 3:30 PM IST close. The Saturday four page wrap is separate, see weekly-market-wrap.
---

# Daily market wrap

Output: `~/market-wraps/daily/<date>.html` and `<date>.png` (1080x1350 at 2x), then `open` the PNG and paste the caption in chat.

## 1. Data from Kite

1. Test the session with `mcp__kite__get_ltp` on `NSE:NIFTY 50`. "Invalid session ID" means the user must reconnect (`/mcp` → kite → Reconnect, or Developer: Reload Window). A login error means call `mcp__kite__login`, show the warning and link, and wait for "done".
2. Call `mcp__kite__get_historical_data` (`interval: day`, previous trading day to today 23:59:59) in parallel:
   - Scorecard: Nifty 50 `256265`, Nifty Bank `260105`, Nifty Smallcap 250 `267273`, Nifty Microcap 250 `290569`, India VIX `264969`
   - Sectors: IT `259849`, Auto `263433`, Pharma `262409`, FMCG `261897`, Metal `263689`, Realty `261129`, PSU Bank `262921`, plus Nifty Bank as "Banks"
3. Pull about 15 sessions of Nifty closes to count streaks and find the Number of the Day. Compute every percentage with a script, never by eye.
4. Before about 4 PM, closes can still shift slightly, so state the time in the source line ("as of 3:37 PM IST"). During market hours, label the page as intraday.

## 2. The page

Copy the newest `~/market-wraps/daily/*.html` (or `template.html` here) and replace the content. Keep the layout in this order: date badge, big number with one line beside it, scorecard, sector bars sorted high to low, "Why it moved", "Watch tomorrow", "My read", source line. Set the `secs` array and adjust `mid` and `sc` so no bar covers a name or runs off the card. If any sector fell, leave room on the left of the axis.

- **Number of the Day:** the most interesting honest number of the day, such as a streak, a gap between big and small companies, or a sector extreme. Don't force drama on a quiet day. Use the widest sector gap or similar instead.
- **Why it moved:** search today's news. Never invent causes. If unclear, say so.
- **Watch tomorrow:** confirmed items only, never guessed dates.
- **My read:** one line in Alok's voice. It is his opinion, so the user reviews it.
- **Friday:** keep it short and point to Saturday's full wrap.

Rules: upright fonts only, no italics or handwriting. No em or en dashes. No colon stat lists, parallel punchlines or triads. No internal tool jargon. Index and sector data only, with no buy or sell calls and nothing from the user's holdings or PMS performance.

## 3. Render and check

```
node ~/.claude/skills/daily-market-wrap/shot.js ~/market-wraps/daily/<date>.html ~/market-wraps/daily/<date>.png
```

Look at the PNG. Check for clipped or overlapping labels. Run `grep -c '—\|–'` on the HTML, which should print 0. Check each figure against the script output.

## 4. Caption and hand off

Write a sharp caption in Alok's first person voice that opens with the date, 2 sentences on the day, then a tag list and 2 to 4 hashtags. Paste it in chat with a two line summary. Flag any figure resting on a single source.
