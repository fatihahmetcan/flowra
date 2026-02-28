# Time Tracking - Function Definition (MVP)

## 1. Objective
To record daily labor hours for both internal employees and temporary workers to facilaiate payroll and project cost analysis.

## 2. Functional Reqiuirements 

### 2.1 Daily Timesheet (Foreman View)
The foreman completes a digital timesheet for their crew:
- Project Selection: Link hours to a specific project.
- Internal Staff: Selection of employees from the company database 
- External Staff: A toggle to manually enter names of temporary or subcontracted workers.
- Hours Worked: Numerical input for hours (e.g., 8.0, 4,5)
- Work Description (optional): Brief notes on the tasks performed (e.g., "Demolition work," "Painting").

### 2.2 Business Logic 
- Default Value: The system should pre-fill the staff list based on the daily "Resource Planning" to save time.
- Data Integrity: Prevent duplicate entries for the same employee on the same date and project.
- Read-Only after Submission: Once the foreman submits the daily report, it becomes read-only for them and moves to "Pending Approval" for the manager.

## 3. UI Requirements 
- List Entry: A dynamic list where rows can be added for each team member.
- Validation: Ensure that "Hours Worked" is a positive number