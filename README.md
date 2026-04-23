HAMIS DQA — Jobberman
Field Data Collection System

Overview
HAMIS DQA - Jobberman is a progressive web application (PWA) designed for field data collection in Ghana. The app works 100% offline and syncs data when internet connection is available, making it perfect for field work in remote areas.

Purpose: Provide field officers with an installable, offline-capable tool to collect, manage, and sync participant data across three program stages: Onboarding, Capacity Building, and Placement.

Quick Facts (for header of Word document)
Production URL: https://happy-kollect.netlify.app (happy-kollect.netlify.app in Bing)

PWA / Offline: Enabled

Backend: Firebase Firestore

Hosting: Netlify

1. Features
Authentication & Security

Individual user accounts with unique Collector IDs

Password-protected login and data isolation (each officer sees only their own records)

Admin role for data administrators; automatic user tracking on records

Offline-First PWA

Full offline operation with local queue and manual/automatic sync

Installable on Android and iOS; automatic updates when online

Data Collection

Onboarding Form — 37 fields (A–AK) covering identification, sector/job, location, personal and contact details, refugee/disability status, education, and employment

Capacity Building Form — 27 fields (A–AA); auto-populates from Onboarding; training and certification details

Placement Form — 28 fields (A–AB); auto-populates from Onboarding; placement and income tracking

Data Management & Reporting

Manual sync control, sync status indicator, local backup, export to CSV/JSON

Dashboard with per-user statistics, pending sync counter, and visualization-ready data

2. Technology Stack
Component	Technology	Purpose
Frontend	HTML5, CSS3, JavaScript	User interface
Styling	Tailwind CSS	Responsive design
Backend	Firebase Firestore	Database & authentication
Hosting	Netlify	Static site hosting
PWA	Service Worker, Manifest	Offline functionality
Version Control	GitHub	Code management
Deployment	GitHub + Netlify	CI/CD pipeline


3. Data Structure
3.1 Onboarding Collection (Fields A–AK)
Code	Field	Type	Required
A	Participant ID	Auto-generated	Yes
B	HAMIS ID	Text	No
C	Onboarding Date	Date	Yes
D	Sector	Dropdown	Yes
E	Sector Type	Dropdown	Yes
F	Job Role	Dropdown	Yes
G	Implementing Partner	Dropdown	Yes
H	Region	Dropdown	Yes
I	District	Dropdown	Yes
J	Community	Text	No
K	Location Status	Dropdown	Yes
P	Participant Type - Support	Dropdown	Yes
Q	Surname	Text	Yes
R	First Name	Text	Yes
S	Other Name(s)	Text	No
T	Sex	Dropdown	Yes
U	Date of Birth	Date	Yes
V	Age	Auto-calculated	Yes
W	Participant Type - Age	Auto-derived	Yes
X	Telephone	Phone	Yes
Y	Guarantor's Name	Text	No
Z	ID Type	Dropdown	No
AA	Ghana Card ID Number	Text	No
AB	Voter's ID Number	Text	No
AC	Refugee Status	Yes/No	No
AD	Nationality (If Refugee)	Text	No
AE	Disability Status	Yes/No	No
AF	Specify Disability	Text	No
AG	Education Level	Dropdown	Yes
AH	Employment Status	Dropdown	Yes
AI	Occupation	Text	No
AJ	Monthly Income	Dropdown	No
AK	Income Frequency	Dropdown	No


3.2 Capacity Building Collection (Fields A–AA)
Code	Field	Type	Source
A	Participant ID	Auto	Onboarding
B	HAMIS ID	Auto	Onboarding
C	Start Date	Date	Manual
D	End Date	Date	Manual
E	Training Location	Text	Manual
F	IP Sub-partner	Auto	Onboarding
G–V	Participant data	Auto	Onboarding
W	IT Skills	Dropdown	Manual
X	Completion Status	Dropdown	Manual
Y	Certificate	Yes/No	Manual
Z	Training Partner	Dropdown	Manual
AA	Trainer Type	Dropdown	Manual


3.3 Placement Collection (Fields A–AB)
Code	Field	Type	Source
A	Participant ID	Auto	Onboarding
B	HAMIS ID	Auto	Onboarding
C	Start Date	Date	Manual
D	IP Partner	Dropdown	Manual
E–U	Participant data	Auto	Onboarding
Z	Income (GHS)	Dropdown	Manual
AA	Employment Type	Dropdown	Manual
AB	Employment Category	Dropdown	Manual


4. Installation & Deployment (Step-by-step for Word handout)
Prerequisites

GitHub account; Netlify account; Firebase account; VS Code recommended

Clone repository

bash
git clone https://github.com/yourusername/hamis-dqa.git
cd hamis-dqa
Configure Firebase

Create Firebase project hamis-dqa

Enable Authentication (Email/Password) and Firestore (test mode)

Copy Firebase config and paste into index.html as firebaseConfig

Firestore Rules (recommended)

Use rules that restrict read/write to authenticated users and enforce collectorId matching; include admin override for admin users

Deploy to Netlify

Option A (GitHub integration): Push repo → Netlify → Import project → Deploy

Option B (Manual): Use Netlify Drop to upload project folder

App icons

Add icon-192.png and icon-512.png to project root

Continuous deployment

Push changes to GitHub; Netlify auto-deploys

5. Usage Guide (Field Officers & Admins)
Field Officers — First-time setup
Open app on device and install as PWA (Android: Chrome → Install; iOS: Safari → Add to Home Screen)

Login with Collector Name, Collector ID (e.g., COL001), and password

Daily workflow (concise)
Morning: Open app → Check sync and online status

During fieldwork: Use Onboarding to add participants; save offline; use Capacity and Placement tabs as needed

End of day: Connect to internet → Click Sync → Confirm “All data synced” → Export backup if required

Admin tasks
Create/assign Collector IDs; monitor users via Firebase Console; export data from app or Firebase for reporting

6. Offline Functionality & Sync Behavior
Architecture (summary): Local forms → localStorage offline queue → Sync button → Firebase Cloud when online.

Capabilities

Login (if previously logged in), view and create records, auto-population, local save, export — all available offline. Sync and pull updates require internet.

Sync rules

Automatic detection when online; manual sync via button; unsynced items queued in localStorage; conflict resolution uses last-write-wins (timestamp).

7. Security & Privacy
Key controls

Firebase Auth (email/password), HTTPS encryption, Firestore security rules enforcing collectorId matching, admin role for full access, persistent sessions via localStorage.

Best practices

Strong passwords (min 8 chars), rotate passwords regularly, do not share credentials, logout on shared devices, report lost devices, maintain backups.

Recommended Firestore rule snippet

javascript
match /participants/{document} {
  allow read, write: if request.auth != null && request.auth.token.collectorId == resource.data.collectorId;
  allow create: if request.auth != null;
}
8. Team Management & Roles
Roles

Field Officer: Create/read own data only

Admin: Read/write all data

Collector ID format

Format: COL### (e.g., COL001)

Admin account example

Collector Name: Admin; Collector ID: ADMIN001; Email: rich87murphy@gmail.com

9. Data Export, Reporting & KPIs
Export options

JSON from app (Export All)

CSV/Excel via Firebase export and conversion

Key metrics to track

Total participants onboarded; training completion rate; placement success rate; per-officer data; sync frequency; offline usage patterns

10. Troubleshooting & Support
Common issues

Login failures, sync problems, PWA install issues, missing data visibility, Firebase or Netlify errors

Debugging

Use browser console (F12) to inspect Service Worker, sync operations, Firebase errors, and network status

Support channels

GitHub Issues for technical problems; contact project admin for data/account issues

11. Contributing, License & Roadmap
Contributing

Fork → feature branch → commit → push → pull request; follow code standards and test offline functionality

License

Proprietary; Copyright © 2024 HAMIS DQA - Jobberman

Roadmap (high level)

Phase 2: Photo upload, GPS tagging, digital signatures, advanced reporting

Phase 3: Real-time collaboration, admin web dashboard, SMS notifications, multi-language support

12. Acknowledgments
Partners & tools

Jobberman (sponsor), Firebase, Netlify, Tailwind CSS, and field officers for testing and feedback

Word Document Formatting Notes (apply when pasting into Word)
Styles:

Title: Calibri 20pt Bold

Headings: Calibri 14–16pt Bold (Heading 1 / Heading 2 styles)

Body text: Calibri 11pt

Tables: single-line cells; use table style “Grid Table Light”

Table of Contents: Insert Word TOC using Heading styles after pasting

Page setup: A4, 1-inch margins, header with project title and footer with “Last Updated: April 2024”

Export: Save as .docx for distribution

Included excerpt from the original document:  
"HAMIS DQA - Jobberman is a progressive web application (PWA) designed for field data collection in Ghana. The app works 100% offline and syncs data when internet connection is available, making it perfect for field work in remote areas."
