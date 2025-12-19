# Lendsqr Frontend Assessment

This project is a frontend implementation of the Lendsqr Admin Dashboard as part of the Lendsqr Frontend Engineering assessment.

## Live Demo
👉 https://yusuf-mukhtar-lendsqr-fe-test.vercel.app/

## Github Repository 
👉 https://github.com/V4vamp/lendsqr-fe-test

## Documentation
👉 https://docs.google.com/document/d/1-pSPO8taT_dK2pLbC38OlJUYYAZzU1GrhS3ZXnk4N4A/edit?usp=sharing

---

## Tech Stack
- Next.js (App Router)
- TypeScript
- SCSS Modules
- React Icons

## Features
- Client-side authentication flow
- Users list with pagination and filters
- Dynamic user detail pages
- User activation and blacklisting
- Persistent state using localStorage
- Responsive layout for desktop and mobile

## Project Structure
app/
components/
hooks/
utils/
public/mock/


Copy code

## Authentication
- Authentication is handled via a custom hook.
- The app checks for a session in `localStorage` before rendering protected routes.
- Unauthenticated users are redirected to the login page.

## Data Management
- User data is initially loaded from a mock JSON file.
- Data is persisted to `localStorage` to simulate backend storage.
- All user actions update both local state and storage.

## Filtering & Pagination
- Column-level filters for organisation, name, email, phone, date joined, and status.
- Pagination supports dynamic page calculation and adjustable rows per page.

## User Details
- Dynamic routing using `/dashboard/users/[id]`
- Tabbed interface for user information
- Status updates sync across pages

## Design Decisions
- SCSS modules were chosen for style isolation.
- LocalStorage was used to simulate a backend for persistence.
- ESLint rules were followed strictly, with scoped exceptions where behavior was intentional and documented.

## Testing

Unit tests were implemented using Jest and React Testing Library.

The testing approach focused on:
- Positive scenarios (expected behavior)
- Negative scenarios (edge cases and invalid states)

Covered areas include:
- Authentication logic
- Filtering functionality
- Pagination logic
- User status updates (activate / blacklist)

This ensures predictable behavior and safeguards against regressions.

## Running the Project

```bash
npm install
npm run dev
Lint & Build
bash
Copy code
npm run lint
npm run build
npm run test
```

## Author

- Muhammad Mukhtar