# Customer Management - Functional Definition (MVP)

## Objective 
Manage all business partners with a clear distinction between corporate and private clients to ensure accurate invoicing and communication.

## 1. Functional Requirements 

### 1.1 Create Customer (Modal/Form)
A "Create Customer" button opens a form where the user selects the **Client Type**:
* **Corporate Client**
    - Required Fields: Company Name, Adress, Email, Phone Number.
* **Private Client**
    - Required Fields: First Name, Last Name, Adress, Email, Phone Number.

### 1.2 Automated Logic
- Customer Code: The system automatically generates a unique, read-only Customer Code upon saving.
- Validation: Dynamic form validation baseed on the selected Client Type.

### 1.3 Data Management & UI
- Customer Table: Displays all customers in a central list.
- Editing: Users can edit  customer data either by double-clicking a row or using a dedicated "Edit" button.
