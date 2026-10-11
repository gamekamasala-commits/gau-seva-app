# MASTER BUILD PROMPT — GAU SEVA PROTOTYPE

You are a senior product designer, UX designer and full-stack developer.

I want you to build a polished, modern, responsive prototype for a product called **"Gau Seva"**.

## 0. Project Purpose & Scope (fill this in before pasting)

- Purpose of this prototype: [ e.g. job-portfolio piece / hackathon demo / NGO pitch / college assignment ]
- Target platform: [ web app / mobile-first web / native mobile ]
- If this is a portfolio piece, build only the **Citizen** flow first (Sections 6–10), then run the **Volunteer** and **Admin** sections as a separate follow-up task so quality doesn't drop across a huge single build.
- If the above are left unfilled: default to *portfolio piece, mobile-first web app* and build the full scope across the phases below — do not stop to ask.

## 1. IMPORTANT CONTEXT

This is a **prototype/demo**, NOT a production application.

The purpose is to demonstrate how a future Gau Seva rescue platform could work.

Do NOT over-engineer the application.

Do NOT implement real:
- payments
- OTP
- SMS
- emergency dispatch
- real-time rescue tracking
- medical diagnosis
- production authentication
- real external rescue APIs

Use realistic mock/demo data wherever necessary.

However, the UI and user flow should feel like a real professional product.

## 2. PRODUCT PURPOSE

Gau Seva helps citizens report cows that may need assistance.

A user should be able to:
1. Open the app
2. Report a cow
3. Upload a photo
4. Select the problem
5. Confirm location
6. Select urgency
7. Submit the report
8. Receive a case ID
9. Track the simulated rescue process

The prototype should also demonstrate:
- Volunteer workflow
- Admin workflow
- Nearby cases
- Donation/support flow
- Gaushala directory

## 3. DESIGN DIRECTION

Create a clean, trustworthy, caring and modern visual identity.

The design should communicate:
- compassion
- trust
- safety
- community service
- simplicity

Avoid making it look like a generic corporate dashboard.

Use:
- rounded cards
- clean spacing
- large touch-friendly buttons
- clear icons
- readable typography
- subtle shadows
- attractive empty states
- modern mobile-first layout

The app should work well on both desktop and mobile-sized screens.

Use a nature-inspired visual language. Primary CTA should be visually prominent. The emergency action must be easy to find.

**Design tokens — lock these in Phase 1 and reuse them in every later phase. Do not invent new colors, fonts or spacing values as you go:**
- Primary: `#2F6B4F` (deep leaf green — trust, care)
- Accent/CTA: `#E8A33D` (warm amber — urgency, primary buttons)
- Background: `#FAF7F2` (warm off-white)
- Text: `#1F2A24`
- Font: `Poppins` for headings, `Inter` for body text — neither supports Devanagari, so any Hindi text (Section 4) must fall back to `Noto Sans Devanagari`
- Spacing scale: 4 / 8 / 16 / 24 / 32 / 48 px
- Corner radius: 16px on cards, 12px on buttons
- Use dark text (`#1F2A24`), not white, on the accent color `#E8A33D` — white-on-amber fails WCAG AA contrast, and Section 22 requires strong contrast

## 4. LANGUAGE

Use simple English for the prototype UI, but structure the code so Hindi can easily be added later.

Important UI text can optionally have small Hindi supporting text.

Example: "Report a Cow" / "गाय की सूचना दें"

Do not translate every piece of text unless it improves the interface.

## 5. APPLICATION STRUCTURE

Create these main routes/pages:

**Citizen**
- Splash / Welcome
- Home
- Report Cow
- Report Summary
- Report Submitted
- Case Tracking
- Nearby Cases
- Support / Donation
- Gaushala Directory
- Profile

**Volunteer**
- Volunteer Dashboard
- Available Cases
- Case Details
- Active Rescue
- Completed Cases
- Volunteer Profile

**Admin**
- Admin Dashboard
- Case Management
- Case Details
- Volunteer Management
- Analytics

## 6. HOME PAGE

Create a beautiful home page.

Header: GAU SEVA
Tagline: "One report. One helping hand."

Hero section: "See a cow in distress?"
Primary button: "🚨 Report a Cow"
Secondary button: "View Nearby Cases"

Quick-action cards:
- Report a Cow
- Nearby Cases
- Become a Volunteer
- Support Gau Seva
- Find a Gaushala

Statistics section using demo data:
- 1,248 Reports
- 936 Cases Resolved
- 84 Active Volunteers
- 32 Rescue Partners

Clearly treat these as prototype/demo statistics.

## 7. REPORT A COW FLOW

Create a multi-step reporting flow.

**Step 1 — Photo**
Allow: upload from gallery, camera-style upload UI. For prototype purposes, allow a sample image to be selected if no real image is available. After upload show image preview.
Buttons: "Choose Another" / "Continue"

**Step 2 — Problem**
Selectable cards: Injured, Road Accident, Sick, Trapped, Needs Food / Water, Abandoned, Other. Each option should have an icon.

**Step 3 — Location**
Create a realistic map-style interface. Show: current location marker, address, "Confirm Location" button. Prototype location can be "Jaipur, Rajasthan". Do NOT require real GPS.

**Step 4 — Urgency**
Options: 🔴 Emergency, 🟠 Urgent, 🟢 Normal. Include short descriptions. Emergency: "Immediate attention may be required."

**Step 5 — Description**
Fields: Problem description, Optional additional notes.

**Step 6 — Review**
Show: Photo, Problem, Location, Urgency, Description.
Primary CTA: "Submit Report"

## 8. REPORT SUBMITTED

After submission generate a demo case ID. Example: GS-1024.

Show: "Report Successfully Submitted"
Message: "Your report has been received by the Gau Seva network."
Show: Case ID: GS-1024
Button: "Track Case" | Secondary: "Back to Home"

## 9. CASE TRACKING

Create a professional case-tracking page.

Header: Case GS-1024
Problem: Injured Cow
Location: Jaipur, Rajasthan
Priority: Emergency

Vertical status timeline:
- ✓ Report Submitted
- ✓ Report Verified
- ✓ Rescue Team Assigned
- 🚑 Team On The Way
- ○ Team Reached
- ○ Rescue / Treatment
- ○ Case Completed

Each completed stage should show a timestamp.

Simulated rescue team card: "Jaipur Rescue Team", Status: "On the way", ETA: "18 min".

**IMPORTANT:** This is simulated prototype data. Do not claim that a real rescue team is actually dispatched.

## 10. NEARBY CASES

Create a map-style page with mock markers.

Categories: Emergency, Urgent, Normal, Resolved.

Clicking a case opens a small case preview card, e.g.:
GS-1024 | Injured Cow | Emergency | 2.4 km away
Button: "View Case"

If implementing a real map is unnecessary, create a visually convincing mock map rather than adding unnecessary API complexity.

## 11. VOLUNTEER DASHBOARD

Create a separate volunteer experience.

Dashboard cards: New Requests, Assigned Cases, Active Rescues, Completed.
Example: New Requests: 6 | Assigned: 2 | Active: 1 | Completed: 48

List of nearby requests, each showing: Case ID, Problem, Priority, Distance, Time reported.
Buttons: "View" / "Accept Case"

## 12. VOLUNTEER CASE FLOW

When a volunteer accepts a case, status sequence:
New Case → Accepted → On The Way → Reached Location → Rescue / Treatment → Completed

Create buttons to simulate these transitions, e.g. "Mark as On The Way", "Mark as Reached", "Mark as Completed".

Allow before/after photo upload UI. Use mock data where required.

## 13. ADMIN DASHBOARD

Create a professional admin dashboard.

Top statistics: Total Reports, Pending Verification, Active Cases, Completed Cases, Volunteers.

Case-management table columns: Case ID, Problem, Location, Priority, Status, Reported At, Assigned Team, Action.

Filters: All, Emergency, Urgent, Normal, Pending, Active, Completed.

Admin should be able to open a case detail page.

## 14. ADMIN CASE DETAIL

Show: Case ID, Photo, Problem, Location, Priority, Description, Reported time, Current status.

Volunteer assignment section — available volunteers: Volunteer A, Volunteer B, Volunteer C.
Button: "Assign Volunteer" → after assignment show "Volunteer Assigned".

## 15. DONATION / SUPPORT PAGE

Create a polished support page.

Title: "Support Gau Seva"
Text: "Your support can help create a stronger network for animal care and rescue."

Donation options: ₹51, ₹101, ₹501, ₹1,001, Custom.
Button: "Continue"

Since this is only a prototype, clicking the button should show "Demo Donation Successful". Do NOT integrate a real payment gateway.

## 16. GAUSHALA DIRECTORY

Create a directory page. Each gaushala card: Name, Location, Distance, Services, Contact button.

Use fictional/demo entries clearly marked as sample data, e.g. "Shri Gau Seva Kendra" — "Jaipur, Rajasthan" — "Sample Listing".

Do not present fictional organizations as real verified organizations.

## 17. PROFILE

Create: Profile photo placeholder, Name, Phone, City, My Reports, Active Cases, Completed Cases, Notifications, Settings.

## 18. NOTIFICATIONS

Create a notification panel. Demo notifications:
- "Your report GS-1024 has been verified."
- "Rescue team assigned to GS-1024."
- "Rescue team is on the way."
- "Case GS-1024 has been completed."

## 19. DATA

Use local mock data or a lightweight local data layer.

Create realistic demo objects for: users, reports, volunteers, notifications, gaushalas.

Keep the data structure clean so a real backend can be connected later.

Suggested Report structure: id, userId, photo, problemType, description, location, priority, status, createdAt, assignedVolunteer

Suggested status values: submitted, verified, assigned, on_the_way, reached, rescue, completed

## 20. DEMO EXPERIENCE

The most important demo journey must work from beginning to end. Test this exact flow:

HOME → REPORT A COW → UPLOAD SAMPLE PHOTO → SELECT "INJURED" → LOCATION → SELECT "EMERGENCY" → ADD DESCRIPTION → REVIEW → SUBMIT → CASE GS-1024 → TRACK CASE → SHOW: Report Submitted, Verified, Team Assigned, On The Way

## 21. RESPONSIVENESS

The prototype must be responsive. Test: Desktop, Tablet, Mobile width. The mobile experience is especially important. Do not allow horizontal scrolling. Buttons must be easy to tap.

## 22. ACCESSIBILITY

Use: readable font sizes, strong contrast, clear labels, visible focus states, semantic buttons, meaningful alt text for images. Do not rely only on color to communicate status.

## 23. ERROR / EMPTY STATES

Create realistic states, e.g.:
- No nearby cases → "No active cases nearby."
- No notifications → "You're all caught up."
- Photo upload error → "Unable to load this image. Please try another photo."

## 24. LOADING STATES

Add appropriate loading states for: report submission, case loading, dashboard loading, image upload. Use skeletons or simple loading indicators where appropriate.

## 25. SECURITY / PROTOTYPE BOUNDARY

This is a prototype. Do not store real sensitive personal data. Do not expose API keys. Do not hard-code production secrets. Clearly separate mock/demo logic from future production integrations.

## 26. CODE QUALITY

Before writing code:
1. Inspect the existing project.
2. Determine the current framework.
3. Reuse the existing setup if appropriate.
4. Do not unnecessarily replace the framework.
5. Create a clear component structure.
6. Keep reusable UI components separate.
7. Avoid duplicated code.
8. Use meaningful names.

If the project is empty, choose a sensible modern web stack suitable for a prototype.

## 27. IMPORTANT DEVELOPMENT METHOD

Do NOT blindly generate the entire application and stop. Work in phases.

- **Phase 1:** Project setup + design system + navigation
- **Phase 2:** Home + Report Cow
- **Phase 3:** Case Tracking
- **Phase 4:** Volunteer
- **Phase 5:** Admin
- **Phase 6:** Support + Gaushala
- **Phase 7:** Responsive polish
- **Phase 8:** Testing

After each phase: run the application, inspect the UI, fix errors, verify navigation, verify important interactions. Use the browser to test the prototype where available.

## 28. VISUAL QUALITY BAR

The final result should NOT look like: a basic AI-generated template, a plain CRUD dashboard, a collection of disconnected pages. It should feel like a coherent real product.

Maintain consistent: spacing, typography, icons, cards, buttons, colors, navigation, status indicators (use the design tokens from Section 3 everywhere).

## 29. FINAL REQUIREMENT

Build the prototype now. Start by inspecting the project and determining the existing setup. Then create an implementation plan. Then implement Phase 1.

Do not ask me unnecessary questions. If a decision is required, choose a sensible option appropriate for a prototype and continue.

After implementation, run the project and verify it. Report:
1. What you built
2. Files created/changed
3. How to run it
4. What was tested
5. Any remaining limitations

Remember: this is a **prototype**, not a production rescue platform. Prioritize **excellent UX, believable interactions, clean architecture and a polished demo experience** over unnecessary backend complexity.
