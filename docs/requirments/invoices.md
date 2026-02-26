#  Invoicing – Functional Definition

## 1. Objective
To replace manual Excel-based invoicing with a structured, automated system. This ensures professional branding, prevents calculation errors, and tracks outstanding payments effectively.

## 2. Functiona Requirements 

### 2.1 Invoice Generattion 
- Data Sourcing: Ability to link an invoice to a specific Client and Project.
- Auto- Numbering: Sequential and unique invoice IDs (e.g., `INV-2026-001`).
- Line Items: A dynamic table for services provided (Description, Quantity, Unit, Unit Price, Tax Rate).
- Tax Handling: Support for different VAT rates (e.g., standard, reduced, or reverse charge for construction services).

### 2.2 Output & Delivery 
- PDF Engine: The backend generates a non-editable PDF document based on a standard company template.
- Status Tracking: Invoices move through a lifecycle: `Draft` -> `Sent` -> `Paid` or `Overdue`.

### 2.3 Dashboard Integration 
- Total amounts from `Sent` and `Overdue` invoices are aggregated for the main Dashboard KPIs.

## Technical Considerations (Backend)
- Immutability: Once an invoice is marked as `Sent` or `Paid`, it should be locked for editing (legal requirement).
- Date Logic: Automatic calculation of the `due_date` based on the payment terms defined in the customer profile.