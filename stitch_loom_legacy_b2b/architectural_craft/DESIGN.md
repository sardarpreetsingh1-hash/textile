---
name: Architectural Craft
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#5e5e5b'
  on-secondary: '#ffffff'
  secondary-container: '#e1dfdb'
  on-secondary-container: '#63635f'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#161f00'
  on-tertiary-container: '#7b8a4d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#e4e2dd'
  secondary-fixed-dim: '#c8c6c2'
  on-secondary-fixed: '#1b1c19'
  on-secondary-fixed-variant: '#474744'
  tertiary-fixed: '#d9eaa3'
  tertiary-fixed-dim: '#bdce89'
  on-tertiary-fixed: '#161f00'
  on-tertiary-fixed-variant: '#3e4c16'
  background: '#fcf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  display-xl:
    fontFamily: Hanken Grotesk
    fontSize: 80px
    fontWeight: '700'
    lineHeight: 90px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-num:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
spacing:
  unit: 4px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style

The design system is built for a premium B2B manufacturing context, blending high-end textile craftsmanship with industrial precision. The visual narrative moves away from standard retail patterns toward a "Digital Showroom" experience—prioritizing scale, material quality, and structural integrity.

The style is **Minimalist Industrial**. It utilizes heavy whitespace to evoke the feeling of a high-end gallery, while maintaining the rigor of a technical specification sheet. Elements are grounded by strong horizontal and vertical lines, clear information hierarchy, and a deliberate absence of decorative fluff. The goal is to evoke a sense of global trust and large-scale capability.

## Colors

The palette is anchored in high-contrast neutrals to mirror industrial environments and raw textile fibers.

- **Near Black (#1A1A1A):** Used for primary text, structural borders, and heavy-duty UI elements.
- **Warm Off-White (#F9F7F2):** The primary background color. It provides a more tactile, premium feel than pure white, suggesting natural linens and high-quality cotton.
- **Charcoal (#2D2D2D):** Used for secondary surfaces, supporting text, and UI icons.
- **Sage Green (#8A9A5B):** A sophisticated accent used sparingly to highlight craft, sustainability initiatives, or interactive states. It should feel like a dye-lot sample—organic but controlled.

## Typography

Typography functions as a structural grid element. 

- **Headlines:** Use **Hanken Grotesk** with tight tracking and heavy weights. This creates a bold, authoritative presence suitable for large-scale manufacturing.
- **Body:** **Inter** provides maximum legibility for technical specifications and contract details.
- **Technical Labels:** **JetBrains Mono** is introduced for "Spec Labels" (e.g., thread counts, GSM, SKU numbers). This monospaced choice reinforces the "Industrial" side of the brand, suggesting data-driven precision and transparency.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop to maintain the "Showroom" look, transitioning to a fluid model for mobile.

- **Desktop:** 12-column grid with a max-width of 1440px. Large 64px margins ensure content feels framed like a canvas.
- **Rhythm:** An 8px linear scale is used for component internals, but layout sections use a 24px/48px/120px scale to create dramatic breathing room.
- **The "Technical Sidebar":** Product pages should utilize a right-aligned fixed-width column (320px) for technical specs, separated by a crisp 1px border.

## Elevation & Depth

This design system rejects traditional shadows in favor of **Tonal Layers** and **Low-Contrast Outlines**.

- **Surfaces:** Depth is created by placing #2D2D2D (Charcoal) or #8A9A5B (Sage) containers on the #F9F7F2 (Off-White) base. 
- **Borders:** Use 1px solid borders in #1A1A1A for high-importance separations and 1px solid borders in #DEDCD7 (a muted variant of the background) for subtle containment.
- **Interaction:** On hover, elements do not lift via shadow; instead, they change fill color or gain a secondary 1px inset border to simulate a "pressed" or "selected" tactile response.

## Shapes

The shape language is **Sharp (0px)**. 

To reflect industrial architecture and the precise cut of textile looms, all UI elements—buttons, cards, input fields, and images—feature 90-degree corners. This uncompromising geometry distinguishes the brand from consumer-grade e-commerce and emphasizes the B2B manufacturing focus.

## Components

- **Buttons:** Primary buttons are solid #1A1A1A with white text, no radius. Secondary buttons use a 1px border with no fill. All labels are in JetBrains Mono to feel like "Industrial Stamps."
- **Input Fields:** Bottom-border only. Labels sit above in uppercase Label-SM. Focus state turns the bottom border to Sage Green (#8A9A5B).
- **Cards:** No shadows. Cards are defined by 1px borders. Images within cards should have a subtle "linen" texture overlay or be shot against high-contrast industrial backgrounds.
- **Spec Tags (Chips):** Rectangular boxes with JetBrains Mono text. Use Sage Green backgrounds with 10% opacity for "In Stock" or "Certified Organic" status.
- **Data Grids:** High-density tables for SKU management and bulk ordering. Use alternating row fills of #F4F2ED to maintain legibility across large data sets.
- **The "Zoom" Component:** A specialized image viewer for textiles that allows high-resolution inspection of weave patterns, using a minimalist crosshair cursor.