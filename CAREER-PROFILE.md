# Jacob Henley — Master Career Profile

> **Purpose of this document:** A single, comprehensive, AI-parseable source of truth about
> Jacob Henley's career, education, research, and engineering work. Built to be fed into an AI
> design tool to revamp the portfolio website at jacobhenley.com.
>
> **Last compiled:** 2026-06-15. Sources: portfolio site, résumé/CV, the RTA Blueprint Designer
> monorepo git history, George Mason University faculty profile, the MIX BLIMP program page, and
> local research/robotics project repositories. Items marked _(inferred)_ were derived from project
> files rather than stated directly by Jacob and should be confirmed before publishing.

---

## 1. Identity & Positioning

- **Name:** Jacob Henley
- **One-line identity:** Researcher, developer, and engineer who transforms the way humans interact with complex systems.
- **LinkedIn caption / headline:** Developer, Engineer, and Researcher
- **Core thesis:** Bridging human factors and technical systems — applying cognitive science to build interfaces and machines that feel natural and earn user trust.
- **Throughline:** A multidisciplinary path connecting cognitive psychology, human factors engineering, full-stack software development, robotics, and manufacturing.

### Contact & Links
- **Email:** Jbhenley1219@gmail.com
- **Phone:** (765) 238-8364
- **LinkedIn:** https://www.linkedin.com/in/jacob-henley2/
- **Personal site:** jacobhenley.com (also referenced as jacobhenley.io)
- **GMU faculty profile:** https://psychology.gmu.edu/people/6340

---

## 2. Professional Summary

Jacob Henley is a human-factors researcher and full-stack software engineer whose work sits at the
intersection of cognitive science and applied technology. He is currently a Master's student in
Human Factors and Applied Cognition at George Mason University, where he leads human-robot
interaction (HRI) research, while simultaneously serving as a Software Developer at RTA Outdoor
Living, where he architected and built a production design-automation platform.

His distinguishing strength is **range**: he moves fluidly from designing and running rigorous
behavioral experiments (with statistical analysis in R), to programming physical robots
(Arduino, C++, ROS, Franka Emika Panda FCI), to shipping a sophisticated React 19 / Azure
full-stack web application used in a real business. He grounds engineering decisions in human
factors principles — usability, trust, transparency, and cognitive ergonomics.

---

## 3. Education

| Credential | Institution | Dates | Notes |
|---|---|---|---|
| **M.A. / M.S., Human Factors & Applied Cognition** | George Mason University, Fairfax County, VA | Fall 2024 – Present | Also referenced as "Human Factors Engineering." College of Humanities and Social Sciences, Psychology Department. |
| **B.S., Brain & Behavioral Sciences** (Minor: Religious Studies / Study of Religion) | Purdue University, West Lafayette, IN | Graduated May 2024 | College of Health and Human Sciences. |
| **Microsoft Technology Associate (MTA) Certification** | Ivy Tech Community College, New Castle, IN | 2018 – 2019 (cert. May 2019) | |

**Micro-credential (earned, verifiable):** **"MIX Lighter-than-air Mechatronics Prototyping"** digital
badge, George Mason University, issued via Credly — see §8, BLIMP program.
Verify: https://www.credly.com/badges/d9fe70a6-7821-4dac-9927-b48c9fbd5996

---

## 4. Skills

**Programming Languages:** Python, R, JavaScript, TypeScript, C++, HTML/CSS

**Frameworks & Platforms:** React (incl. React 19), Node.js, Django, Vite, Three.js, Redux Toolkit,
Chakra UI, Prisma, Azure (Functions, Static Web Apps), Google Cloud, Auth0

**Robotics & Hardware:** Arduino IDE, ESP32, MeMegaPi, ROS, Franka Emika Panda (FCI), Bluetooth/serial
control, sensors, feedback control, computer vision _(inferred from BLIMP + project work)_

**3D / CAD / Design:** Blender, RAMSIS (ergonomics), Virtuix CAD, Torque CAD, additive manufacturing
(FFF & SLS 3D printing), DXF export

**Research methods:** Experimental design, human-robot interaction paradigms, lexical decision &
inhibition-of-return tasks, survey/questionnaire instruments (e.g., IDAQ), statistical analysis
(R, t-tests), literature reviews, poster presentation

**Human factors:** FDA usability standards including AAMI/ANSI HE75:2009 and IEC 62366
("Applying Human Factors and Usability Engineering to Medical Devices")

**Tooling:** GitHub, Azure DevOps, Visual Studio, Microsoft 365, pnpm monorepos, CI/CD pipelines

---

## 5. Professional Experience

### RTA Outdoor Living
*West Lafayette, IN area — outdoor kitchen manufacturer*

**Software Developer** · Dec 2023 – Present
- Built a web-based **blueprint automation tool** (Python/Django + Node.js, Google Cloud) that cut design time by **~70%** by removing redundancy from the blueprint creation process.
- Architected and built the **3D kitchen design tool / "Design Tool 2.0"** — a production full-stack web application (Azure, Node.js, TypeScript, React, Three.js). See §6 for the detailed engineering breakdown.
- Grew from contributor to primary author of the core design platform (640+ commits across the monorepo).

**Blueprint Engineer** · Aug 2021 – Aug 2024
- Designed outdoor-kitchen blueprints, leveraging manufacturing expertise to improve blueprint interpretability and production efficiency.
- Produced instructional video walkthroughs for customer blueprints to ease assembly and use.
- Was part of the team as the business grew from ~25 to ~90 employees over a 2+ year period.

### Jon Bell Contracting, Inc. (sister corporation of RTA)

**CAD Designer / CNC Operator** · May – Aug 2023
- Developed a **Python program to optimize inventory efficiency** and streamline CNC operations, increasing resource utilization.
- Built a **pre-constructed CAD file library** to increase usability of CNC machine operations.
- Designed **ergonomic solutions** including a custom loading cart to reduce physical strain and improve workplace safety.
- Operated CNC machinery (appliance cutouts) and trained a new CNC operator to proficiency.

**Interim Department Manager** · Summer 2023
- Implemented an assembly-line **color-coding system** to improve operational efficiency and reduce error.
- Developed a **room-mapping system** to mitigate double-scheduling errors.
- Organized workers by skill and satisfaction.

**Kitchen Caster** · May – Aug 2021
- Provided user feedback to an app developer for a manufacturing application, improving its usability.
- Reduced cooling-water cost by **$45/week** via a reusable icepack cooling system.
- Operated an industrial concrete batch plant; cast concrete panels used in outdoor kitchens.

---

## 6. Flagship Engineering Project — RTA Blueprint Designer ("Design Tool 2.0")

> A proprietary, production outdoor-kitchen design platform. This is Jacob's most significant
> engineering work. The codebase is a large pnpm monorepo; Jacob is the dominant author
> (~570+ commits in the active Azure monorepo, Dec 2024 – Jun 2026, plus earlier PR history).
> Public-facing entry point: https://design.rtaoutdoorliving.com/layout

### Architecture (monorepo)
A layered domain-driven system with a strict dependency order:

```
Library (domain model)  ──►  Component (2D SVG)     ──►  React UI
Library (domain model)  ──►  3D Component (Three.js) ──►  React UI
Library (domain model)  ──►  API (persistence, tax, CRM)
```

**Packages / apps:**
- **`react-ui`** — React 19 SPA (Vite, Chakra UI, Redux Toolkit, Auth0 roles).
- **`api`** — Azure Functions REST API with Prisma data layer; JWT validation, role-based access; cross-domain integrations with **Avalara** (tax), **HubSpot** (CRM), and **OpenAI**.
- **`library`** — the core domain model: a deep blueprint/kitchen entity hierarchy (Blueprint → Kitchen → KitchenDesign → Islands → Panels → PanelItemGroups → PanelItems → Items, plus countertops, materials, obstructions, dimensions, promotional SKUs, rules engine, schema-migration system). Uses a reactive `@Publish` decorator → events → `useSubscription` hook pattern.
- **`component`** — 2D SVG renderer with a **DXF export pipeline**, viewport/interaction services, context menus.
- **`3d-component`** — Three.js 3D renderer with a scene engine, 12 specialized managers, builders, and AI tools.
- **`data-manager`** — admin dashboard for product CRUD.
- **`dev-bridge`** — a dev-only **Claude Code ↔ running-app bridge** (MCP server + WebSocket) that Jacob built to let AI agents interact with the live application.

### Representative features & work authored (from git history)
- **3D rendering subsystem:** calibration, lighting & highlight-cache sync, field-of-view props, textured faces, countertop rendering, z-fighting fixes, intersection-point optimization, image/3D offset handling.
- **2D blueprint view:** PDF-matched formatting, labels, layout, and handling of non-standard changes; dimension display logic; "show all dimensions" feature.
- **Pricing / business logic:** tax integration and quantity-aware tax patches (Avalara), promotional-SKU discount system and filtering, quote/estimate links, custom countertop thickness, sizing & customization rules (e.g., excluding outlets from customization).
- **Data & schema:** Prisma-backed database moved into the API, schema migrations (corner-stand, category), data-manager version control, DB version control.
- **Auth & roles:** Auth0 role handling, role defaults, role/sleeve compatibility.
- **Platform / DevOps:** migration to a pnpm monorepo, move to Azure Static Web Apps, CI pipelines and release/publish scripting, API build pipeline hardening.
- **AI tooling:** the `dev-bridge` MCP integration and 3D-component AI tools.
- **Autosave** and **custom design entries** in the React UI.

**Tech stack (this project):** TypeScript, React 19, Vite, Chakra UI, Redux Toolkit, Three.js,
Node.js, Azure Functions, Prisma, Auth0, pnpm, Avalara, HubSpot, OpenAI/MCP.

---

## 7. Research Experience

### George Mason University — Lead Researcher · Aug 2024 – Present
**Lab of Dr. Eileen Roesler** (Human-Agent Collaboration Lab / Human-Robot Interaction Lab),
Psychology Department / Human Factors & Applied Cognition program.

- **Research focus:** How contextual framing and descriptive elements influence human perceptions of
  robotic systems — impression formation, trust, danger, transparency, and agency in human-robot interaction.
- **Lead author** on a project investigating the effects of **anthropomorphic framing** of robots on
  perceived danger, transparency, and agency in HRI.
- **Second author** on a project investigating anthropomorphic framing and **trust** in HRI;
  contributions: paradigm design and robot programming.
- Designs and programs both **digital and physical** human-robot interaction paradigms.
- **Secretary**, Human Factors & Ergonomics Society (HFES) student chapter at GMU.

### Purdue University — Research Assistant · Aug 2023 – May 2024
**Lab of Dr. Anne Sereno**
- Moderated participants through **lexical decision** and **inhibition-of-return** tasks.
- Created a **Python program for benchmarking monitor refresh rates** (experimental-rig validation).
- Built and presented a **poster** with data from the inhibition-of-return study at the
  **Purdue Undergraduate Research Symposium**.

### Purdue University — Student of Dr. Sydney Trask · Spring 2023
- Developed a **Python shape-matching paradigm** for a class project; collected reaction-time data
  from classmates and conducted **t-test analysis** in Excel.

---

## 8. Graduate Program Highlights & Robotics Training

### MIX BLIMP Program — George Mason University (Mason Innovation Exchange)
**Official name:** *Biologically-inspired, Lighter-than-air, Instructional, Mechatronics Program (BLIMP)*
- A hands-on, ~9–10 week interdisciplinary mechatronics course held at the **Mason Autonomy and
  Robotics Center (MARC)**; Spring 2026 cohort.
- In teams, students design and build **bio-inspired blimps / UAVs with flapping-wing mechanisms**,
  culminating in a judged design competition.
- **Skills covered:** mechanical systems & aircraft dynamics, **ESP32/Arduino** microcontroller
  programming, **computer vision and autonomous control**, **additive manufacturing (FFF & SLS
  3D printing)**, CAD modeling, feedback control, and system integration.
- **Micro-credential (earned):** GMU digital badge **"MIX Lighter-than-air Mechatronics Prototyping"**,
  issued via Credly. Verifiable at https://www.credly.com/badges/d9fe70a6-7821-4dac-9927-b48c9fbd5996
  (badge image: `mix-lighter-than-air-mechatronics-prototyping.png`).
- **Faculty lead:** Assistant Professor Daigo Shishika, PhD (Mechanical Engineering).
- **Funding:** KEEN (Kern Entrepreneurial Engineering Network); the broader program lineage traces to
  an Office of Naval Research–funded effort feeding the "Defend the Republic" lighter-than-air
  robotics competition.
- Program page: https://www.mix.gmu.edu/blimp

> **Confirmed:** The credential is earned and publicly verifiable via the Credly badge linked above.

### Robotics programming (graduate coursework / research)
- Programming the **Franka Emika Panda** robot arm via the **Franka Control Interface (FCI)** using
  **C++ and ROS** (portfolio: "Robot Interaction — Programming Panda FCI").
- Building **animated robot interaction paradigms** and 3D models for HRI studies (portfolio:
  "Robotics Simulation").

---

## 9. Research & Robotics Projects (Detailed)

### "Paul the Robot Baby" — Anthropomorphic Framing HRI Study
The physical implementation behind the GMU lead-author research.
- A **human-robot interaction study** with a physical robot ("Paul") built on a **MeMegaPi/Arduino**
  board controlling motors, an arm, and line-following sensors, commanded over **Bluetooth/serial**.
- A **Python `tkinter` GUI** runs the full experiment: digital consent form, instructions,
  questionnaires, the experimental task, and response/survey data collection.
- Task: a **PCB (printed circuit board) quality-control inspection** scenario.
- Manipulation: two framing conditions — an **anthropomorphic** description of the robot vs. a
  **technical** description — to test effects on perception.
- Instruments include the **IDAQ** (Individual Differences in Anthropomorphism Questionnaire).
- _(This maps to the portfolio's "Automated Robot" / autonomous robotic companion item.)_

### HRI Statistical Analysis (`hri-project-stats`)
- **R-based statistical analysis** (`analysis.R`) of the HRI study's objective and subjective
  measures (descriptive statistics + CSV datasets for objective and subjective data).

### 3D HRI Printing Guide (`3d-hri-printing-guide`)
- A printing/fabrication guide for HRI robot components: tuned **Cura print presets**
  (`HRI-Printer-Presets.curaprofile`), a flyer, and a QR-linked web page — supporting reproducible
  hardware builds for the lab.

---

## 10. Selected Portfolio Works (current site)

These are the works currently featured on jacobhenley.com:

1. **Design Tool 2.0** — Proprietary outdoor-kitchen design app. *UI/UX, full-stack web dev, React, Three.js.* (→ §6)
2. **Robot Interaction** — Programming the Panda FCI. *Research, C++, ROS.*
3. **Robotics Simulation** — Animated robot interaction paradigm. *Research, animation, 3D modeling.*
4. **Automated Robot** — Programming an autonomous robotic companion. *Research, C++, hardware integration.* (→ "Paul the Robot Baby," §9)
5. **Designing efficient workflows** — Streamlining manufacturing operations at JBC. *UI/UX, organization.*

---

## 11. Other Technical Projects _(local repos — career-relevant, confirm before featuring)_

These exist in Jacob's local workspace and may be worth surfacing on a revamped site:
- **BME688 / BME68x sensor work** — gas-sensor modeling and a Python library (`bme688-model`, `bme68x-python-library`).
- **ESP32 USB malware probe** — embedded security research project (`esp32-usb-malware-probe`).
- **Claude Hub / personal AI pipeline** — AI tooling and automation experiments.
- **Crypto trader**, **QR generator**, **Overcooked level selector (React)**, **restaurant finder**, **Raspberry Pi test bed** — assorted full-stack / embedded side projects.

> These are listed for completeness from the local filesystem and were not on the résumé; verify scope
> and polish before publishing.

---

## 12. Themes for the Portfolio Revamp

For the AI design pass, the strongest narrative threads to emphasize:

1. **Human × Machine** — the unifying story: cognitive science + engineering to make complex systems intuitive and trustworthy.
2. **Proven shipping ability** — a real production platform (Design Tool 2.0) with measurable impact (70% design-time reduction) and deep technical surface area (React 19, Three.js, Azure, AI tooling).
3. **Rigorous researcher** — lead-author HRI studies, experimental design, R analysis, published-style posters; not just opinions but data.
4. **Hardware-to-software full stack** — from Arduino/ESP32 robots and CNC/CAD manufacturing to cloud web apps; genuinely end-to-end.
5. **Trust & usability lens** — grounded in formal human-factors standards (HE75, IEC 62366) and HRI trust/transparency research.

**Suggested positioning tagline (existing):** "Building technology the way people think." /
"Harmonizing human factors and technical systems to create seamless experiences."

---

## 13. Items to Verify / Locate (open loops)

- [x] BLIMP micro-credential — confirmed via Credly badge (title: "MIX Lighter-than-air Mechatronics Prototyping").
- [ ] Exact M.A. vs M.S. degree title at GMU (résumé and CV phrase it differently).
- [ ] Titles, venues, and dates of any **published papers / posters** (GMU HRI work, Purdue IOR poster).
- [ ] Whether to publicly feature the **other technical projects** in §11.
- [ ] Confirm preferred public **email** (résumé uses Jbhenley1219@gmail.com).
