# Dashboard - Functional Definition (MVP)

## Objective 
The Dashboard serves as the central management hub for business owners or project manager. It is designed to provide a comprhensive overview of
the current business status within 5-10 seconds.

### Key Focus Areas
- Liquidity: Tracking open and overdue receivables.
- Operational Capercity: Overview of active projects and daily assignments.
- Quick Access: Immediate visibility of the most relevant data points.

## 1. KPI Overview (Top Section)

### 1.1 Open Invoices
- Data: Number of open invoices and total outstanding amount
- Definition: Invoices with status open and a due_date in the future.

### 1.2 Overdue Invoices
- Data: Number of overdue invoices and total overdue amount 
- Definition: Invoices with status open and a due_date in the past.

### 1.3 Running Projects
- Data: Count of active projects.
- Definition: Projects with status active.

### 1.4 Assignements Today
- Data: Number of planned assignments for the current date.
- Definition: Assignments where scheduled_date equals today.

## 2. Operational Lists

### 2.1 Last 5 Open Invoices 
A table view showing the most recent receivables:
- Columns: Customer, Amount (€), Due Date, Status.
- Purpose: Quick overview of upcoming cash flow.

### 2.2 Today's Assignments
A table view of today's operational tasks: 
- Columns: Project, Employee, Time, Status.
- Purpose: Monitoring daily operations and staff deployment.

### 2.3 Project Overview
A list summarizing project health:
- Columns: Project Name, Status (Active / Completed / Delayed).
- Purpose: Transparency regarding the progress of major projects.

## 3. Out of Scope for V1
- Charts and visual diagrams.
- Accounts Payable (incoming bills/expenses).
- Financial analytics or profit/loss reports.
- Business forecasts.