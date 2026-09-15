# Reliable Boadwin sign-in

## Diagnosis
The account exists, is confirmed, and the hosted authentication service is healthy. Recent attempts reach the service correctly but are rejected as password mismatches, including after the latest account update. This is not a broken Login button or missing account.

## Changes
- Keep normal email-and-password sign-in.
- Add a secure “Email me a sign-in link” fallback so the account can be accessed without repeatedly fighting a stored or mismatched password.
- Mark the email and password fields correctly for browser/password-manager autofill and add a password visibility control to catch silent autofill mistakes.
- Keep password reset available and improve the on-screen guidance after a rejected password.

## Verification
- Confirm the login screen submits both password and email-link flows.
- Confirm invalid-password errors remain clear and do not erase the entered email.
- Confirm the login screen renders correctly in the current mobile-sized preview.
