# Resource Planning - Functional Definitio (MVP)

## 1. Objective 
The Planning module is the central dispatching tool for managers. It coordinates the allocation of staff, vehicles, and equipment to specific projects on a daily or weekly basis.

## 2. Functional Requirements 

### 2.1 Creating Assignments 
The manager creates a dispatch record by linking:
- Project: Selection from active projects
- Staff: Assignment of one or more employees.
- Vehicel: Assignment of a company vehicel.
- Equitment (Selection Logic): * Assets are fetched from the central **Equipment Management** module.
    * Only items with the status `Available` are displayed for selection.

### 2.2 Planing Views 
- Daily Dispatch: A focused view to finalize logistics for the following workday.
- Weekly Overview: A grid-based view to monitor workforce distribution across the week.

### 2.3 System Logic & Validation 
- Conflict Prevention: The system must prevent double-booking of employees, vehicles, or equipment for the same time slot.
- Auto-Status Update: Upon saving an assignment, the status of selected equipment automatically switches to `On Site`.