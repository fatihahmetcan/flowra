```mermaid
erDiagram
    CUSTOMER ||--o{ PROJECT : "has"
    PROJECT ||--o{ TASK : "contains"
    PROJECT ||--o{ PROJECT_IMAGE : "documented_by"
    PROJECT ||--o{ ASSIGNMENT : "planned_in"
    PROJECT ||--o{ TIME_TRACKING : "tracks_hours"
    PROJECT ||--o{ INVOICE : "billed_via"
    
    EMPLOYEE ||--o{ PROJECT : "manages"
    EMPLOYEE ||--o{ ASSIGNMENT : "assigned_to"
    EMPLOYEE ||--o{ TIME_TRACKING : "logs"
    EMPLOYEE ||--o{ PROJECT_IMAGE : "uploads"
    
    EQUIPMENT_CATEGORY ||--o{ EQUIPMENT : "classifies"
    EQUIPMENT ||--o{ ASSIGNMENT : "allocated_to"
    
    INVOICE ||--o{ INVOICE_ITEM : "consists_of"

    CUSTOMER {
        uuid id PK
        string customer_code UK
        string type "private | business"
        string company_name
        string first_name
        string last_name
        string email UK
        string street_house_number
        string postal_code
        string city
        datetime created_at
    }

    EMPLOYEE {
        uuid id PK
        string employee_id UK
        string role "admin | office | foreman"
        string email UK
        string password_hash
        string status "active | inactive"
        datetime created_at
    }

    PROJECT {
        uuid id PK
        string name
        uuid customer_id FK
        uuid foreman_id FK
        string status "planned | active | completed | delayed"
        date start_date
        datetime created_at
    }

    TASK {
        uuid id PK
        uuid project_id FK
        string title
        string status "todo | doing | done"
        datetime created_at
    }

    EQUIPMENT_CATEGORY {
        uuid id PK
        string name UK
    }

    EQUIPMENT {
        uuid id PK
        uuid category_id FK
        string internal_asset_id UK
        string name
        string status "available | on_site | repair"
    }

    ASSIGNMENT {
        uuid id PK
        uuid project_id FK
        uuid employee_id FK
        uuid equipment_id FK
        date scheduled_date
        datetime created_at
    }

    TIME_TRACKING {
        uuid id PK
        uuid project_id FK
        uuid employee_id FK
        decimal hours
        date work_date
        string status "pending | approved | locked"
    }

    PROJECT_IMAGE {
        uuid id PK
        uuid project_id FK
        uuid uploaded_by FK
        string file_url
        boolean is_site_photo
    }

    INVOICE {
        uuid id PK
        string invoice_number UK
        uuid project_id FK
        string status "draft | sent | paid | overdue"
        decimal gross_amount
        date due_date
    }

    INVOICE_ITEM {
        uuid id PK
        uuid invoice_id FK
        string description
        decimal quantity
        decimal unit_price
        decimal total_line_amount
    }
```

---

## Indexing & Performance Optimization

To ensure system scalability and demonstrate professional architectural standards, the following indexing strategy will be implemented:

### 1. Business Logic & Unique Constraints
- Integrity: `customer_code`, `employee_id`, `email`, and `invoice_number` are assigned **Unique B-Tree Indexes**. This ensures data integrity and speeds up lookups for master data.

### 2. Foreign Key Optimization (Joins)
- Relational INdexes: All Foreign Key columns (e.g., `project_id`, `customer_id`) will be explicitly indexed.
- Benefit: Since PostgreSQL does not index FKs by default, these indexes prevent full-table scans during complex joins (e.g., fetching all invoices for a specific customer).

### 3. Conflict Prevention (Composite Indexes)
- Resource Planning: Composite indexes on `ASSIGNMENT (scheduled_date, employee_id)` and `ASSIGNMENT (scheduled_date, equipment_id)`.
- Benefit: Enables high-performance, real-time validation to prevent double-booking of staff or machinery during the planning process.