# Objective
The Project Management module facilitates the planning, execution, and documentation of construction or service projects. It bridges the gap between office management (planning) and on-site staff (execution).

## 1. Roles & Permissions
- Management (Admin/Manager): Responsible for project creation, client assignment, and task definition.
- On-Site Staff (Foreman/Polier): Responsible for daily documentation, photo uploads, and task completion.

## 2. Functional Requirements

### 2.1 Project Creation (Manager View)
A project is initialized with the following data:
- Project Name: Unique title of the project.
- Client: Link to an existing record from the Customer module.
- Assigned Foreman: Selection of the responsible employee for the site
- Project Address: Specific location of the job site (may differ from the client's billing address).
- Timeline: Planned Start Date and Estimated End Date.
- Description (Optional): General notes regarding the scope of work.
- Initial Attachments (Optional): Ability to upload blueprints or initial site photos.
- Task Checklist: A list of specific tasks or milestones to be completed on-site.

### 2.2 Site Documentation (Foreman View)
The assigned foreman can access the project via their dashboard to
- Daily Progress Photos: Upload images documenting the work performed each day.
- Task Management: Mark assigned tasks as "Completed."
- Status Updates: Provide real-time feedback to the office.

### 2.3 UI Representation (Project Overview)
- Card-Based Layout: Projects are displayed as visual cards.
- Card Content: * Project Title & Client Name.
    - Site Address.
    - Progress Indicator (e.g., "3/10 tasks finished").
    - Assigned Foreman's Name.
    - Status Badge (e.g., Planned, In Progress, Completed).

### 3. Non-Functional Requirements (Futer Proofing)
- File Storage: The system must handle image uploads (Backend needs to support multipart/form-data).
- Audit Trail: Save timestamps for when a task was marked as completed for accountability.