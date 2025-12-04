# E-Commerce Management System

A full-featured e-commerce backend system with role-based access control, product and category management, order processing, and analytics. Designed to provide a scalable and secure platform for online stores.

---

## **Features**

### 1. Role-Based Authentication
- Supports multiple roles: **Admin**, **Seller**, and **Customer**.
- Role-specific access to resources and operations.

### 2. Category Management
- Create, read, update, and delete (CRUD) product categories.
- Easy categorization of products for better organization and filtering.

### 3. Product Management
- CRUD operations for products.
- Supports multiple images, stock management, and detailed product descriptions.

### 4. Product Search & Query
- Search products by **name**, **category**, and **price range**.
- Supports filtering and sorting.

### 5. Product Pagination
- Pagination support with configurable **page number**, **page size**, and **sort options**.
- Improves performance for large product catalogs.

### 6. Cart Operations
- Add items to cart.
- Update item quantities.
- Remove items from cart.

### 7. Order Confirmation
- Place orders and confirm **payment status**.
- Tracks order delivery progress.

### 8. Order Queries
- Filter orders by **date range**.
- Filter orders by **delivery status**.

### 9. Sales Reporting
- Generate monthly sales totals.
- Compare sales with the previous month.

### 10. Revenue Analytics
- Compare revenue achievements against previous periods or targets.
- Supports data-driven decision-making.

---

## **Tech Stack**
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT / Role-based access
- **Analytics:** Aggregation pipelines in MongoDB

---

## **Getting Started**

### **Clone the repository**
```bash
git clone <repo-url>
cd <project-folder>
