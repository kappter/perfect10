# Partner Rubric Point System

Welcome to the **Partner Rubric Point System**, a sparkling digital canvas inspired by the vibrant interactivity of the [SongMaker app](https://kappter.github.io/SongMaker/). This tool transforms the reflective art of relationship evaluation into an engaging, interactive experience. Like a musical score, it helps you and your partner compose a symphony of strengths and navigate the occasional off-key notes, fostering deeper connection and growth.
[![Perfect10](https://github.com/kappter/perfect10/blob/main/images/perfect10.png?raw=true)](https://kappter.github.io/perfect10/)

## What It Does

Imagine a 10x10 grid as your relationship’s dance floor, where each square represents a quality—be it the eloquence of "Intelligence and the Mind" or the daring of "Adventurer." Click to assign scores (1-10) to traits like "Speak and write well" or "Growth Potential," and watch the grid light up with insights. Hover over squares to reveal detailed tooltips, spotlighting what makes your partner shine or where a little choreography might help. Earn a golden star for categories where all key traits score 5 or higher—a standing ovation for your shared strengths!

### Positive Focuses
- **Celebrate the High Notes**: High scores in "Beauty" or "Playful" reveal your partner’s knack for elegance or infectious joy. It’s like discovering they’re the lead singer in your life’s band, harmonizing perfectly with your rhythm.
- **Shared Adventures**: Scoring well in "Adventurer" highlights a zest for exploration, whether it’s hiking mountains or binge-watching a new series together. These are the moments that write your love story’s boldest chapters.
- **Strength in Wisdom**: A strong "Wisdom" score signals a partner who sees the bigger picture, guiding you both through life’s twists with sage-like clarity.

### Challenges to Address
- **Tuning the Off-Notes**: Low scores in "Responsibility" might hint at blurred boundaries, like forgetting whose turn it is to do the dishes. These are opportunities to choreograph clearer roles.
- **Finding Balance**: A missing bonus in "Confidence and the Heart" could point to moments of self-doubt. It’s a chance to be each other’s cheerleader, building resilience together.
- **Sparking Playfulness**: If "Playful" scores lag, it’s an invitation to sprinkle more spontaneity into your days—think impromptu dance parties or silly inside jokes.

## Features

- **Interactive Grid**: Click to score 10 categories across 10 traits, with tooltips revealing details like “Score 7 for Adaptability.” Category bonuses (stars) reward high scores, adding a playful challenge.
- **Dynamic Visuals**: A bar chart tracks total scores per category, turning your reflections into a vibrant data symphony.
- **Dark Mode Toggle**: Switch to a sleek, starry-night theme with a click, perfect for late-night heart-to-hearts.
- **CSV Export**: Save your scores and bonuses to a CSV file, like a keepsake of your relationship’s current melody.
- **Responsive Design**: Whether on a laptop or phone, the grid, navbar, and footer adapt seamlessly, just like a good partner.

## Setup Instructions

To bring this tool to life on GitHub Pages:

1. **Clone or Create a Repository**:
   - Create a repository (e.g., `partner-rubric`).
   - Add `index.html`, `styles.css`, and `app.js` to the root directory.

2. **Enable GitHub Pages**:
   - Go to **Settings** > **Pages**.
   - Set **Source** to **Deploy from a branch**, select `main` branch, `/ (root)` directory, and click **Save**.
   - Wait a few minutes for deployment at `https://<username>.github.io/partner-rubric`.

3. **Verify Files**:
   - Ensure `styles.css` and `app.js` are in the root with `index.html`.
   - Paths (`./styles.css`, `./app.js`) should work; if not, try `/styles.css`.

4. **Troubleshoot CDNs**:
   - If CDNs (e.g., React, Recharts) fail, download them to a `/lib` folder and update `index.html` (e.g., `<script src="./lib/react.production.min.js"></script>`).
   - Test locally with `npx serve` or `python -m http.server` and check the browser console (F12 > Console).

## How to Use

1. Open the deployed site in a browser.
2. Click grid cells to assign scores (1-10) for traits like “Visionary” or “Consistency.”
3. Hover over cells to see tooltips (e.g., “Score 7 for Future Vision”) and category headers for bonus status (e.g., “Wisdom - Bonus: High scores achieved!”).
4. Use the navbar to toggle dark mode, clear the grid, or download scores as a CSV.
5. Check the footer for your overall average score and the chart for category insights.

## Why It Matters

The Partner Rubric Point System is more than a tool—it’s a mirror for your relationship’s heart. It celebrates the qualities that make your partnership a masterpiece, like a well-timed duet, while gently pointing to areas where a little practice could turn discord into harmony. Whether you’re scoring your partner’s knack for “Extravagance” or noticing a need for more “Clear boundaries,” this rubric invites you to dance closer together, aware of both the magic and the work-in-progress that is love.

---

Inspired by the “Daily Focus Template - PartnerRubric.pdf” and powered by React, Tailwind CSS, and Recharts.
