```markdown
# MASTER DESIGN SYSTEM (WISE SAAS EDITION)

**VERSION:** 2.1 (Final)
**STATUS:** Single Source of Truth
**THEME:** "Wise" (TransferWise) Aesthetic + "Anti-Generic" Philosophy

This document serves as the absolute guide for the project's visual identity, user experience, and technical implementation. It combines a bold, high-trust color palette with a specific "anti-AI-slop" design philosophy.

---

## PART 1: DESIGN PHILOSOPHY & AI INSTRUCTIONS
*(Source: Design Manifesto - Verbatim)*

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

**Design Thinking**
Before coding, understand the context and commit to a BOLD aesthetic direction:

* **Purpose:** What problem does this interface solve? Who uses it?
* **Tone:** Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
* **Constraints:** Technical requirements (framework, performance, accessibility).
* **Differentiation:** What makes this UNFORGETTABLE? What's the one thing someone will remember?
* **CRITICAL:** Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:

* Production-grade and functional
* Visually striking and memorable
* Cohesive with a clear aesthetic point-of-view
* Meticulously refined in every detail

**Frontend Aesthetics Guidelines**
Focus on:

* **Typography:** Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
* **Color & Theme:** Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
* **Motion:** Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
* **Spatial Composition:** Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
* **Backgrounds & Visual Details:** Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

**NEVER** use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

**IMPORTANT:** Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

---

## PART 2: VISUAL IDENTITY (THE "WISE" THEME)
*(Use these specific tokens to implement the philosophy above with a trustworthy, premium feel.)*

### 2.1. Core Color Palette (Renk Paleti)
*Colors are chosen for Authority, Energy, and Clarity. Use these specific hex codes to avoid generic Tailwind colors.*

| Token Name | Hex Code | Tailwind Class | Role & Usage |
| :--- | :--- | :--- | :--- |
| **Forest (Primary)** | `#163300` | `bg-[#163300]` | **Authority & Background.** Replaces Black. Used for Header, Sidebar, and Dark Mode backgrounds. Feels organic and established. |
| **Lime (Accent)** | `#9FE870` | `bg-[#9FE870]` | **Energy & Action.** ONLY for Primary CTAs, Active States, and key highlights. Provides max contrast against Forest. |
| **Pale (Canvas)** | `#F2F5F7` | `bg-[#F2F5F7]` | **Page Background.** A soft gray-blue tone. Replaces pure white for the main page canvas to reduce eye strain and add premium feel. |
| **White (Surface)** | `#FFFFFF` | `bg-white` | **Cards & Panels.** Used for content containers sitting ON TOP of the `Pale` canvas. |
| **Danger** | `#FF3B30` | `text-[#FF3B30]` | **Alerts.** A modern, vibrant red for errors, destructive actions, or pain points. |
| **Muted** | `#64748b` | `text-slate-500` | **Secondary Text.** For descriptions, dates, and metadata. |

### 2.2. Typography System
* **Font Family:** `'Inter', sans-serif` (Google Fonts).
* **Headings (H1-H3):** `font-extrabold` (800) + `tracking-tight`. (Authoritative look).
* **Body Text:** `font-medium` (500) + `leading-relaxed`. (Readable).
* **Data/Numbers:** `tabular-nums`. (CRITICAL for dashboards/timers to prevent jitter).

---

## PART 3: UI COMPONENTS & SHAPES

### 3.1. Shape Language (Radius)
* **Buttons:** `rounded-full` (Fully rounded caps).
* **Cards / Modals:** `rounded-2xl` or `rounded-3xl` (Large, soft modern corners - Apple style).
* **Inputs:** `rounded-xl` (Deep rounding).

### 3.2. Component Patterns

#### A. Buttons (Primary CTA)
* **Background:** `Lime (#9FE870)`
* **Text:** `Forest (#163300)` (Dark text on light button for contrast).
* **Shape:** `rounded-full`
* **Hover:** Scale effect + Neon Glow (See Part 4).

#### B. Inputs (Form Fields)
* **Background:** `Pale (#F2F5F7)` (Inputs are NOT white. They are slightly gray to create depth).
* **Border:** Transparent initially.
* **Focus:** `ring-2 ring-[#163300]` (Forest Green ring).

#### C. Cards (Containers)
* **Background:** `White`
* **Border:** `border border-gray-100`
* **Shadow:** `shadow-sm`
* **Hover:** `hover:shadow-xl` + `hover:border-[#9FE870]` (Lime border on hover).

---

## PART 4: REUSABLE EFFECTS (TAILWIND UTILITIES)
*(Copy-paste these classes to achieve the "Premium" feel. Do not invent new ones.)*

### A. The "Neon Glow" Shadow
*Used for Primary Buttons (Lime) to make them pop against dark backgrounds.*
```css
shadow-[0_0_20px_rgba(159,232,112,0.4)]

```

### B. Glassmorphism (Dark Mode / Overlays)

*Used for sticky headers, floating tools, or modal overlays.*

```css
bg-white/5 backdrop-blur-md border border-white/10

```

### C. Hover Lift (Micro-Interaction)

*Standard interaction for clickable cards/items.*

```css
hover:scale-[1.01] hover:-translate-y-1 transition-all duration-300

```

### D. Pulse Animation

*Used for live recording status or critical alerts.*

```css
animate-pulse

```

---

## PART 5: SAAS SPECIFIC PATTERNS (CLOCKIFY / DASHBOARD)

### 5.1. Global Timer Bar / Header

* **Container:** `bg-[#163300]` (Forest).
* **Input Field:** `bg-white/10` (Transparent white), Text White.
* **Timer Text:** Monospace or `tabular-nums`, White, Large.
* **Action Button:** `bg-[#9FE870]` (Lime) + Neon Glow.

### 5.2. Sidebar (Navigation)

* **Container:** `bg-white` or `bg-[#F2F5F7]`.
* **Active Item:** `bg-[#9FE870]/10` (Light Lime background) + `text-[#163300]` + `font-bold` + Left Border Indicator.
* **Inactive Item:** `text-slate-500` + `hover:text-[#163300]`.

### 5.3. Data Tables (Lists)

* **Header Row:** `bg-[#F2F5F7]` + `text-[#163300]` + `font-bold`.
* **Body Row:** `bg-white` + `border-b border-gray-100`.
* **Hover Effect:** `hover:bg-slate-50` (Subtle highlight).

---

**FINAL INSTRUCTION TO AI:**
When generating code, strictly adhere to these color codes and radius values. Do not revert to default Tailwind colors (like blue-500). Use `#163300` for primary darks and `#9FE870` for primary accents. Ensure the "Manifesto" philosophy (Part 1) is respected by adding depth, motion, and intentionality to every component.

```
