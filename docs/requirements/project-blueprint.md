# Flowra ERP - Project Blueprint (MVP)

## 1. Onboarding & Company Initialization (The "Gatekeeper")
Every ERP instance must be initialized before any operational modules become accessible. This process ensures legal compliance and professional branding from day one.

### 1.1 Superadmin Setup
* **Initial State**: Upon the first launch, the system detects an empty database and redirects all traffic to the Superadmin Registration.
* **Privileges**: The first registered user is automatically assigned the `SUPERADMIN` role, granting irrevocable access to all system settings, user management, and financial data.

### 1.2 Mandatory Setup Wizard
The main dashboard remains locked until the following company identity data is provided:
* **Branding**: Upload of the company logo (Requirements: PNG/JPG, transparent background preferred). The logo is automatically embedded in the top-right corner of all generated documents (Invoices, Offers).
* **Legal & Contact**: Company Name, official Email, Phone Number, and Tax ID (USt-IdNr).
* **Address**: Business headquarters address (Street, ZIP, City, Country).
* **Activation**: Once validated, the operational modules (Customers, Invoicing, Planning) are unlocked.

---

## 2. Core Functional Modules

### 2.1 Customer Management
* **Client Distinction**: Dynamic handling of Corporate Clients (Company Name required) and Private Clients (First/Last Name required).
* **Automated Logic**: Real-time generation of unique, read-only Customer Codes (e.g., `C-000001`).

### 2.2 Dashboard (KPI Hub)
* **Financial Overview**: Real-time tracking of Liquidity, including open and overdue receivables.
* **Operational Pulse**: Summary of active projects and today’s assignments.

### 2.3 Resource Planning & Equipment
* **Dispatching Tool**: Allocation of personnel, vehicles, and machinery to project sites.
* **Asset Tracking**: Central registry for all physical assets with automated status updates (e.g., moving to `On Site` when assigned to a project).

### 2.4 Project Management & Time Tracking
* **On-Site Documentation**: Foremen can upload progress photos and mark tasks as completed via mobile access.
* **Labor Tracking**: Digital timesheets for internal and external staff, linked directly to project costs.

### 2.5 Invoicing (Fakturierung)
* **Professional Output**: PDF generation based on the branding defined in the Onboarding phase.
* **Legal Integrity**: Invoices become immutable (read-only) once marked as `Sent` or `Paid`.

---

## 3. Access Control (RBAC)
User permissions are strictly enforced based on roles:
* **Admin**: Full control over settings, branding, and user management.
* **Office Staff**: Access to Customer Management, Invoicing, and Offers.
* **Site Manager**: Responsible for project creation and resource allocation.
* **Foreman (Polier)**: Mobile view for project documentation, photo uploads, and time tracking.

---

## 4. Technical Architecture Principles
* **Single Instance Isolation**: Each company operates on its own server/database instance to ensure maximum data privacy.
* **Soft Delete Policy**: To maintain historical integrity (e.g., for project logs), employees and equipment are deactivated/archived rather than permanently deleted.