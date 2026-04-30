# Repeat Floral

A youth-led nonprofit (est. 2021, Vancouver, BC) that up-cycles wedding and event flowers, delivering them to community spaces like senior homes and community centers.

Built with Next.js 16, React 19, Framer Motion, and Tailwind CSS 4.

## Pages

### Home (`/`)
- Animated hero section with mission statement and CTA
- Interactive 3-step workflow carousel (desktop: scroll-hijacking navigation, mobile: vertical stack)
  - **Collect** — Donate surplus wedding/event flowers
  - **Team** — Volunteer coordination
  - **Deliver** — Request flowers for community spaces
- Floating decorative flower animations with collision detection
- Progress bar with animated flower tracker

### Request (`/request`)
- Dual-purpose form page with a picker to choose between donating or requesting flowers
- **Donate Flowers** form: name, email, event date, pickup address, flower description, notes
- **Request Flowers** form: name, organization, delivery address, bouquet count, preferred date, notes
- Accessible via query param: `/request?form=donate` or `/request?form=request`
- Glassmorphic card styling with thank-you confirmation on submit

### About (`/about`)
- Origin story, founding details, team information
- Scroll-triggered fade-in section animations
- Animated decorative flowers throughout
- CTA to join as a volunteer

## Components

| Component | Description |
|---|---|
| `Navbar` | Fixed header with logo, nav links, mobile hamburger menu, and layered flower animations (behind + in front of navbar) |
| `Hero` | Serif headline, pill badge, mission statement, and CTA button with staggered fade-up animations |
| `WorkflowSection` | Interactive 3-card carousel with scroll hijacking (desktop) or vertical stack (mobile), progress bar, and keyboard navigation |
| `FlowerBackground` | Auto-spawning SVG flowers that float and fade, with collision detection to avoid content elements |
| `Footer` | Brand logo, tagline, contact pills (Instagram, phone, email) with hover fill effects |
| `GradientDivider` | Decorative SVG wave for section transitions |

## API

### `POST /api/submit`
Handles form submissions by writing directly to Google Sheets via the Google Sheets API.

**Donate payload:**
```json
{
  "formType": "donate",
  "name": "",
  "email": "",
  "eventDate": "",
  "pickupAddress": "",
  "flowerDescription": "",
  "notes": ""
}
```

**Request payload:**
```json
{
  "formType": "request",
  "name": "",
  "organization": "",
  "deliveryAddress": "",
  "bouquetCount": "",
  "preferredDate": "",
  "notes": ""
}
```

Submissions are appended to the `Donations` or `Requests` tab in the connected Google Sheet.

## Design System

### Fonts
- **Cormorant Garamond** (serif) — headlines, titles, italic emphasis (`--font-cormorant`)
- **DM Sans** (sans-serif) — body text, labels, navigation (`--font-dm-sans`)

### Colors
| Color | Hex | Usage |
|---|---|---|
| Warm cream | `#F3E7E0` | Page background |
| Dark gray | `#2d2d2d` | Primary text |
| Sage green | `#D2E0BF` | CTA buttons, accents |
| Dusty rose | `#E988A6` | Flower centers |
| Blush pink | `#FAD4D8` | Gradient accents |
| Lavender | `#C692C7` | Footer contact hovers |
| Powder blue | `#BFD7EA` | Badges |

### Visual Effects
- Glassmorphism (`backdrop-filter: blur()`)
- Soft shadows (max ~0.1 opacity)
- Rounded corners (6-24px)
- Framer Motion page transitions and entrance animations

## Setup

### Prerequisites
- Node.js 18+
- A Google Cloud service account with Sheets API enabled
- A Google Sheet shared with the service account email

### Installation

```bash
npm install
```

### Google Sheets Integration
1. Create a Google Cloud project and enable the Google Sheets API
2. Create a service account and download the JSON key
3. Rename the key to `service-account.json` and place it in the project root
4. Share your Google Sheet with the service account's `client_email` as Editor
5. The sheet needs two tabs: `Donations` and `Requests`

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

## Project Structure

```
app/
  page.tsx              # Home page
  request/page.tsx      # Donate/request forms
  about/page.tsx        # About page
  layout.tsx            # Root layout, fonts, metadata
  template.tsx          # Page transition animations
  api/submit/route.ts   # Form submission endpoint
  components/
    Navbar.tsx           # Navigation with flower animations
    Hero.tsx             # Landing hero section
    WorkflowSection.tsx  # Interactive 3-step carousel
    FlowerBackground.tsx # Floating flower animations
    Footer.tsx           # Contact footer
    GradientDivider.tsx  # SVG wave divider
public/
  repeatFloralLOGO.png  # Logo
  wedding1.png          # Workflow card image (collect)
  team4.png             # Workflow card image (team)
  seniors.png           # Workflow card image (deliver)
```
