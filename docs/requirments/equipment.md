# Equipment & Machinery - Functional Definition 

## 1. Objective
Centralized registry and status monitoring of all physical assets. This module serves as the primary data source for the Resource Planning module.

## 2. Functional Requiremnets

### 2.1 Create Equipment / Asset
A form to register new assets into the system with the following fields:
- Asset Name: e.g., Vibratory Plate
- Category: Selection e.g., Heavy Maschinery 
- Internal Asset ID: Uniquie Identification code
- Brand & Model: Techniqal specification.
- Purchase Date : To  track age and maintenance cycles.

### 2.2 Status Management
Each asset tracks a specific state to ennsure operational realiablity: 
- `Available`: Ready for dispatch in the warehouse
- `On Site`: Currently assigned to a project (automated via Planning).
- `In Repair / Maintenance`: Not available for assigments.

### 2.3 List View & Discovery
- A seaerchable table displaying all registred assets. 
- Filters: Filter by status, category, or search by ID/Name.

## 3. Backend Considerations
- Uniqueness: Ther `Interna Asset ID` must be unique across the database.
- Soft Delete: Equipment should not be hard-deleted if it has historical. assignment data use an `Archived` status insted.