---
name: Void Protocol
colors:
  primary: "#0085FF"
  secondary: "#C8D6E5"
  background: "#0A0E1A"
  surface: "#121926"
  active: "#00D4FF"
  warning: "#FFB800"
  border: "#1E293B"
typography:
  body-md:
    fontFamily: DMSans-Regular
    fontSize: 14px
    fontWeight: 400
  numeric-hero:
    fontFamily: Syne-Bold
    fontSize: 34px
    fontWeight: 700
rounded:
  sm: 8px
  md: 12px
  full: 9999px
spacing:
  base: 4px
  screen-padding: 16px
  card-padding: 20px
  vertical-gap: 12px
---

# Design System

## Overview
A minimal deep-space dark interface representing the **Void Protocol** identity. Designed for cislunar B2B treasury operations and delay-tolerant routing, optimizing readability and visual ergonomics.

## Colors
- **Primary / Accent** (#0085FF): Ion Blue for CTAs, active highlights, primary buttons, and interactions.
- **Secondary** (#C8D6E5): Lunar Silver for title indicators, primary labels, and contrast highlights.
- **Background** (#0A0E1A): Void Black representing deep space as the main page and viewport background.
- **Surface** (#121926): Dark card backgrounds and grouped sections.
- **Active / Online** (#00D4FF): Cyan for online status LEDs, active transmission packet dots, and latencies.
- **Warning / Buffer** (#FFB800): Cosmic Gold for time drifts, alerts, and pending/buffered items.
- **Border** (#1E293B): Subtle layout separators and outline elements.
- **Inactive** (#4A5568): Muted gray for disabled controls and inactive nav icons.

## Typography
- **Headlines / Numeric Hero**: `Syne-Bold` geometric style for balance displays, large values, and clock outputs.
- **Body**: `DMSans-Regular`, `DMSans-Medium`, and `DMSans-Bold` humanist style for clear descriptions, list values, inputs, and button text.

## Components
- **Buttons**: Pill-shaped capsules (9999px radius) filled with active Ion Blue (#0085FF) and black text for optimal readability.
- **Inputs**: Fundo #05070d with 1px border (#1E293B) and rounded corners (8px).
- **Cards**: Graphite surface (#121926) with 1px borders, rounded corners (12px), and no box shadows (except soft active glows).
- **Tab Bar**: Sit resting at the bottom of the screen with a solid Void Black background, thin outline icons, and text labels in DM Sans.

## Do's and Don'ts
- Do use `Syne-Bold` exclusively for large numerical values (e.g. balance display and main metrics).
- Do maintain a clean 16px screen padding on both sides for mobile layouts.
- Do keep borders strictly 1px thin and card border-radius strictly at 12px.
- Don't use box shadows; focus on color contrasts and precise borders for card depth.
