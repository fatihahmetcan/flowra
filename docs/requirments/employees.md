# Employee & Access Management - Functional Definition 

## 1. Objective 
To manage company personnel and define access levels (roles) for the system. This ensures that sensitive data (like invoices) is only visible to authorized staff.

## 2. Functional Requirements 

### 2.1 Employee Profiles 
- Create/Edit Employee: Capture First Name, Last Name, Email, and Phone Number.
- Unique Identification: Every employee recevies a unique Employee ID.

### 2.2 Role-Based Access Control (RABC)
Each user must be assigned one of the following roles:
- Admin: Full system access.
- Office Staff: Focus on Invoicing, Offers, and Customer Management
- Site Manaager: Project creation and resource planning.
- Forman: Mobile access to assigned projects, task completion, and time tracking.

### 2.3 Account Security 
- User Credentials: Email serves as the login username 
- Account Status: Ability to activaate or deactivate accounts (e.g., for external workers)

## 3 Technical Considerations
- Soft Delete: Employees should be deactivated rather than deleted to maintain historical integrity of project logs and timesheets.