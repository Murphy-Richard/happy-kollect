### HAMIS DQA — Jobberman  
**Field Data Collection System**  
**README (plain-text / Markdown-ready)**

> **Excerpt from source document:**  
> **HAMIS DQA - Jobberman is a progressive web application (PWA) designed for field data collection in Ghana.**  
> **The app works 100% offline and syncs data when internet connection is available, making it perfect for field work in remote areas.**

---

### 1 Overview

**Project name:** HAMIS DQA — Jobberman  
**Purpose:** Provide an installable, offline-capable PWA for field officers to collect, manage, and sync participant data across three program stages: **Onboarding**, **Capacity Building**, and **Placement**.  
**Production URL:** `https://happy-kollect.netlify.app`  
**Last updated:** April 2024

---

### 2 Key Features

**Authentication & Security**
- **Individual user accounts** with unique **Collector IDs**  
- **Password-protected** login  
- **Data isolation**: each officer sees only their own records  
- **Admin role** for data administrators

**Offline-First PWA**
- **100% offline** operation; local queue + manual/automatic sync  
- Installable on **Android** and **iOS**  
- Automatic updates when online

**Data Collection**
- **Onboarding Form** — 37 fields (A–AK)  
- **Capacity Building Form** — 27 fields (A–AA), auto-populates from Onboarding  
- **Placement Form** — 28 fields (A–AB), auto-populates from Onboarding

**Data Management & Reporting**
- Manual **Sync** control; sync status indicator; local backup  
- Export to **CSV / JSON**; dashboard with per-user statistics

---

### 3 Data Structure

#### 3.1 Onboarding Collection (Fields A–AK)

| **Code** | **Field Name** | **Type** | **Required** |
|---:|---|---|:---:|
| A | Participant ID | Auto-generated | **Yes** |
| B | HAMIS ID | Text | No |
| C | Onboarding Date | Date | **Yes** |
| D | Sector | Dropdown | **Yes** |
| E | Sector Type | Dropdown | **Yes** |
| F | Job Role | Dropdown | **Yes** |
| G | Implementing Partner | Dropdown | **Yes** |
| H | Region | Dropdown | **Yes** |
| I | District | Dropdown | **Yes** |
| J | Community | Text | No |
| K | Location Status | Dropdown | **Yes** |
| P | Participant Type - Support | Dropdown | **Yes** |
| Q | Surname | Text | **Yes** |
| R | First Name | Text | **Yes** |
| S | Other Name(s) | Text | No |
| T | Sex | Dropdown | **Yes** |
| U | Date of Birth | Date | **Yes** |
| V | Age | Auto-calculated | **Yes** |
| W | Participant Type - Age | Auto-derived | **Yes** |
| X | Telephone | Phone | **Yes** |
| Y | Guarantor's Name | Text | No |
| Z | ID Type | Dropdown | No |
| AA | Ghana Card ID Number | Text | No |
| AB | Voter's ID Number | Text | No |
| AC | Refugee Status | Yes/No | No |
| AD | Nationality (If Refugee) | Text | No |
| AE | Disability Status | Yes/No | No |
| AF | Specify Disability | Text | No |
| AG | Education Level | Dropdown | **Yes** |
| AH | Employment Status | Dropdown | **Yes** |
| AI | Occupation | Text | No |
| AJ | Monthly Income | Dropdown | No |
| AK | Income Frequency | Dropdown | No |

#### 3.2 Capacity Building Collection (Fields A–AA)

| **Code** | **Field Name** | **Type** | **Source** |
|---:|---|---:|---|
| A | Participant ID | Auto | Onboarding |
| B | HAMIS ID | Auto | Onboarding |
| C | Start Date | Date | Manual |
| D | End Date | Date | Manual |
| E | Training Location | Text | Manual |
| F | IP Sub-partner | Auto | Onboarding |
| G–V | Participant data | Auto | Onboarding |
| W | IT Skills | Dropdown | Manual |
| X | Completion Status | Dropdown | Manual |
| Y | Certificate | Yes/No | Manual |
| Z | Training Partner | Dropdown | Manual |
| AA | Trainer Type | Dropdown | Manual |

#### 3.3 Placement Collection (Fields A–AB)

| **Code** | **Field Name** | **Type** | **Source** |
|---:|---|---:|---|
| A | Participant ID | Auto | Onboarding |
| B | HAMIS ID | Auto | Onboarding |
| C | Start Date | Date | Manual |
| D | IP Partner | Dropdown | Manual |
| E–U | Participant data | Auto | Onboarding |
| Z | Income (GHS) | Dropdown | Manual |
| AA | Employment Type | Dropdown | Manual |
| AB | Employment Category | Dropdown | Manual |

---

### 4 Installation & Deployment (step-by-step)

**Prerequisites**
1. GitHub account  
2. Netlify account  
3. Firebase account  
4. Text editor (VS Code recommended)

**Clone repository**
```bash
git clone https://github.com/yourusername/hamis-dqa.git
cd hamis-dqa
```

**Configure Firebase**
1. Create Firebase project `hamis-dqa`  
2. Enable **Authentication** → Email/Password  
3. Enable **Firestore** → Start in test mode  
4. Copy Firebase config and update `index.html`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

**Firestore security rules (recommended)**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /participants/{document} {
      allow read, write: if request.auth != null && request.auth.token.collectorId == resource.data.collectorId;
      allow create: if request.auth != null;
    }
    match /capacity/{document} {
      allow read, write: if request.auth != null && request.auth.token.collectorId == resource.data.collectorId;
      allow create: if request.auth != null;
    }
    match /placement/{document} {
      allow read, write: if request.auth != null && request.auth.token.collectorId == resource.data.collectorId;
      allow create: if request.auth != null;
    }
    match /collectors/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

**Deploy to Netlify**
- **Option A (GitHub integration)**  
  1. Push code to GitHub  
  2. Netlify → Add new site → Import project → Select repo → Deploy  
- **Option B (Manual upload)**  
  1. Netlify Drop → Drag project folder → Deploy

**App icons**
- Add `icon-192.png` and `icon-512.png` to project root

---

### 5 Usage Guide (Field Officers & Admins)

**Field Officers — First-time setup**
1. Open app on device  
2. Install as PWA (Android: Chrome → Install; iOS: Safari → Add to Home Screen)  
3. Login with **Collector Name**, **Collector ID** (e.g., COL001), and password

**Daily workflow**
1. **Morning**
   - Open app from home screen  
   - Check **sync status** and **online/offline** indicator
2. **During fieldwork**
   - Onboarding tab → Fill participant form → Save (saves offline if no internet)  
   - Use Capacity/Placement tabs as needed
3. **End of day**
   - Connect to internet → Click **Sync** → Confirm “All data synced” → Export backup if required

**Admin tasks**
- Create/assign Collector IDs; monitor users via Firebase Console; export data from app or Firebase for reporting

---

### 6 Offline, Security & Support

**Offline architecture**
- Local forms → localStorage offline queue → Sync button → Firebase Cloud when online  
- **Sync behavior:** automatic detection when online; manual sync via button; queue stored in localStorage; conflict resolution: **last-write-wins** (timestamp)

**Security & privacy**
- **Authentication:** Firebase Auth (email/password)  
- **Encryption:** HTTPS for all data in transit  
- **Access control:** Firestore rules enforce `collectorId` matching; admin override for admin users  
- **Best practices:** strong passwords, rotate passwords, do not share credentials, logout on shared devices

**Export & reporting**
- **JSON** from app (Export All)  
- **CSV/Excel** via Firebase export and conversion  
- KPIs: total participants onboarded; training completion rate; placement success rate; per-officer metrics; sync frequency

**Troubleshooting**
- Common issues: login failures, sync problems, PWA install issues, missing data visibility  
- Debugging: open browser console (F12) to inspect Service Worker, sync operations, Firebase errors, network status

**Support**
- Technical issues: GitHub Issues (project repo)  
- Data/account issues: contact project admin

---

**Formatting notes for saving as README.txt**
- This file is plain-text and Markdown-ready.  
- To preserve bold and tables, save with `.md` extension if you want rendered formatting in viewers that support Markdown.  
- For a plain `.txt` file, the Markdown syntax remains readable and preserves structure.

--- 

**End of README**
>>>>>>> **`murphy-richards`** (Update app with new features)
