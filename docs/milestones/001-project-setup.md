# Milestone 1: Project Setup

## 📅 Date: April-May 2025

## 🎯 Goals
- Initialize repositories for frontend (`digipaga`) and contracts (`digipaga-contracts`) on GitHub under `ReFi-Starter`.
- Set up the frontend project with Next.js, Bun, TypeScript, ESLint, and Tailwind CSS.
- Scaffold the contracts project using Foundry.
- Integrate the contracts repository as a git submodule within the frontend project.
- Establish the basic documentation structure.

## ✅ Achievements
- [x] Created `ReFi-Starter/digipaga-contracts` repo and scaffolded with Foundry.
- [x] Created `ReFi-Starter/digipaga` repo and initialized with `create-next-app`.
- [x] Added `digipaga-contracts` as a submodule (`./contracts`) in the `digipaga` frontend repo.
- [x] Initial documentation structure created.

## 🔜 Next Steps
- [ ] Configure Wagmi CLI and generate initial contract hooks.
- [ ] Implement basic UI components for utility bill payments.
- [ ] Develop core logic for interacting with utility provider APIs (or mocks).
- [ ] Define contract interfaces for bill payment and potential on/off-ramp interactions.

### Frontend Integration
- Installed `wagmi`, `viem`, and `@wagmi/cli`.
- Compiled contracts within the submodule using `forge build`.
- Configured `wagmi.config.ts` for Celo/Alfajores and Foundry artifacts.
- Generated typed hooks using `bunx wagmi generate` into `src/lib/wagmi/contracts.ts`.

### Key Dependencies