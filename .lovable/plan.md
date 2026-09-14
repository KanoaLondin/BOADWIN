# Course access and navigation update

## What will change
- Fix paid-course access using one explicit entitlement: any active paid plan unlocks the complete course library, including all lands and direct lesson links. No-Code AI Data Analysis remains free.
- Reduce the bottom navigation to Home, Courses, and Profile. Add clear Profile entry points for the weekly leaderboard and gem shop while keeping their existing pages and features intact.
- Replace the flat ten-course picker with three scannable groups: Start Here, Build Skills, and Go Deeper. All ten courses remain directly selectable.

## Verification
- Sign in as Cole’s account and confirm the profile shows the top plan.
- Check each of the ten course selections and confirm no paid-access banner appears for that account.
- Open a paid lesson directly to verify the lesson guard uses the same entitlement.
- Check the three-item navigation and grouped course layout at the current mobile size.

## Technical details
- Centralize entitlement logic instead of relying on scattered truthy checks.
- Preserve lesson progression locks; only subscription locks are removed for paid accounts.
- Preserve `/leaderboard` and `/shop` routes so existing links continue working.
