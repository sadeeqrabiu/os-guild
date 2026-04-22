# OSGuild: Strategic Development Roadmap

A Bitcoin-Native Pipeline for Sovereign Contributors

## Mission Control: Phase 0

### Positioning & Constraints
The objective of OSGuild is not to provide a new playground for code, but to engineer a high-signal contribution environment for the Bitcoin ecosystem. We prioritize traceability, signal over noise, and cognitive friction—ensuring AI assists the human mind rather than automating it away.

*   **Primary Metric:** Contributor retention and PR merge rate in sovereign Bitcoin repositories.
*   **Core Philosophy:** Proof of Work. Rewards are a byproduct of verified value, not participation.

### Minimum Viable Product (MVP) - Weeks 1–3
*   **Goal:** Achieve one complete working loop: Join → Make contribution → Get reviewed → Earn sats → See progress.
*   **Constraint:** No custom IDE or complexity. Use existing tools.

---

## I. Build Components (Days 1–18)

### 1. Entry Layer (Day 1–3)
*   **Build:** Simple web dashboard (Next.js or basic frontend) with GitHub OAuth login.
*   **User Flow:** User signs in, connects account, sees a call-to-action ("Start your 6-week journey"), and is assigned 2–3 beginner-friendly Bitcoin repos.

### 2. Repo + Task System (Day 3–6)
*   **Build:** Static task list tied to 2–3 selected Bitcoin repos (active maintainers, beginner-friendly).
*   **Examples:** Fix typo in docs, improve README, review open PR, reproduce a bug.

### 3. Activity Tracking (Day 5–9)
*   **Focus:** Track only essential outcomes via GitHub.
*   **Tracked Events:** PR opened, PR merged, PR rejected, Review submitted.
*   **Method:** Use GitHub webhooks or simple polling (preferred for MVP).

### 4. Manual Review Layer (Day 7–12)
*   **Process:** Project team manually reviews and scores each participant’s work.
*   **Value:** Establishes ground truth and understanding of contributor behavior before automation.

### 5. Reward System (Day 10–14)
*   **Build:** Simple backend logic to assign a manual score and convert it to sats.
*   **Lightning:** Use LNbits or a hosted wallet for simple integration.
*   **User View:** Displays weekly and total sats earned.

### 6. Dashboard (Day 12–18)
*   **Show Only:** PRs submitted, PR status (merged / rejected), Reviews done, Manual Score, Sats earned.

### 7. AI (Minimal Version - Optional)
*   **Implementation:** A simple, non-integrated prompt box.
*   **Use Case:** "Explain this file" or "What does this function do?" (No automation or deep context integration yet.)

---

## II. Reward Algorithm (Simple but Powerful)

**Principle:** Reward trust signals and verified outcomes, not mere activity. (1 point = 100 sats)

| Action | Base Score |
| :--- | :--- |
| PR Opened | +1 |
| PR Merged | +5 |
| PR Rejected | 0 or -1 |
| Review Submitted | +2 |
| Review Accepted by maintainer | +4 |
| Valid issue identified | +3 |
| Issue resolved | +5 |

### Multipliers & Bonuses (Manual for MVP)
*   **Quality Multiplier:** Low (×0.5), Good (×1), High (×1.5), Exceptional (×2).
*   **Consistency Bonus:** Contribute 3+ days/week (+5 bonus); 5+ days/week (+10 bonus).
*   **Penalty System:** Spam PR (-5), AI-generated low-effort (-3), No follow-up on PR (-2).

### Example Flow
*   **Base:** 2 PRs (+2), 1 merged (+5), 2 reviews (+4), 1 accepted (+4) = 15 points.
*   **Total:** (Base 15 x Quality 1.5) + Consistency Bonus 5 = 27.5 points.
*   **Final Sats:** 2,750 sats.

---

## III. Strategic Advantage (MVP is a Data Engine)

**MVP Focus:** The goal is not the product, but a data engine of contributor behavior. This will teach us who is serious, who fakes activity, and what high-quality contribution truly looks like.

### The Epic Backlog: 12-Week Agile Execution

| Epic & Timeline | Focus Area | Core Deliverables | Value Proposition |
| :--- | :--- | :--- | :--- |
| **Epic 1: The Bedrock** (Weeks 1–2) | Architecture & Identity | Rust/Node backend, Postgres Schema, GitHub OAuth, and System Flow documentation. | Establishing the technical integrity required for high-security Bitcoin development. |
| **Epic 2: The Workbench** (Weeks 3–5) | IDE & Integration | Forked VS Code/OSS, Activity Engine (file tracking), and GitHub Sync (Webhooks). | Turning the editor into a live data sensor that captures the contribution lifecycle. |
| **Epic 3: The Journey** (Weeks 5–7) | Learning & Reflection | 6-week curriculum modules, "Reflection Layer" prompts, and PR stage gates. | Moving from "passive observer" to "active maintainer" through structured progression. |
| **Epic 4: The Sentinel** (Weeks 6–8) | Contextual AI | Context-aware LLM integration (Local/API) and "Challenge Mode" prompts. | Preventing shallow contributions by forcing developers to defend their logic. |
| **Epic 5: The Economy** (Weeks 7–10) | Incentive Layer | Lightning Wallet integration (LND/LNbits), Scoring Engine, and Sat distribution. | Closing the loop between open-source labor and economic reality via sats. |
| **Epic 6: The Pulse** (Weeks 9–11) | Insight & Analytics | Contributor Dashboard, Admin Abuse-Detection, and Cohort Analytics. | Providing transparency to both the developer (progress) and the guild (health). |

---

## Detailed Sprint Breakdowns

### Sprint 1: Foundation & Activity Tracking
*   **Goal:** Prove we can track a line of code from the IDE to a GitHub PR.
*   **User Story:** As a contributor, I want my IDE actions to be logged so that my effort is verifiable.
*   **Action Items:**
    *   Initialize Rust-based Activity Engine.
    *   Implement GitHub OAuth for seamless identity management.
    *   Configure webhooks to listen for PR merges and review comments.

### Sprint 2: The Reflective IDE
*   **Goal:** Enhance the editor to facilitate deep thinking.
*   **User Story:** As a maintainer, I want contributors to explain their tradeoffs before they submit a PR.
*   **Action Items:**
    *   Build the OSGuild Sidebar for VS Code.
    *   Deploy the "Reflection Layer": A popup requiring technical justification for major edits.
    *   Integrate "Challenge Mode" where AI asks: "How does this change impact Bitcoin's consensus model?"

### Sprint 3: The Lightning Incentive
*   **Goal:** Connect technical "Signal" to economic "Sats."
*   **User Story:** As a high-performing dev, I want to be rewarded automatically when my PR is merged.
*   **Action Items:**
    *   Develop the Scoring Algorithm (PR Quality x Review Depth x Consistency).
    *   Integrate Lightning Network wallet (via LNbits or Voltage).
    *   Create the "Earnings History" view in the user dashboard.

---

## Strategic Safeguards (Risk Mitigation)

*   **Anti-Sybil/Abuse:** We do not reward "activity." We reward "outcomes." No sats are released until a PR is merged into a real, whitelisted repository.
*   **AI Hallucination/Shallow Code:** The "Reflection Layer" is mandatory. If a user cannot answer the AI's "Why?" they cannot move to the next stage.
*   **Scalability:** We launch with a restricted Alpha Cohort of 20-30 participants to ensure the reward-to-signal ratio remains sustainable.

---

## Launch Operations
*   **Target Alpha Date:** [Date]
*   **Lead Architect:** [Person]
*   **Project Repository:** [File]
