# Contact Management Client

This is the **frontend** of the Contact Management System, built with React and styled using Material-UI (MUI). It provides a user-friendly interface for managing contact data and integrates seamlessly with the backend server.

---

## **Features**

- Displays contacts in a responsive and interactive data grid.
- Allows adding, editing, and deleting contacts.
- Validates form inputs using Formik and Yup.
- Handles state management using Jotai.

---

## **How to Run**

### **Pre-requisites**

- Node.js (v14 or higher)
- npm or yarn installed

### **Steps**

1. Navigate to the `contact-management-client` directory:

   ```bash
   cd contact-management-client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and go to:
   ```
   http://localhost:3000
   ```

---

## **Tools and Libraries**

- **React**: A component-based UI library.
- **Vite**: A fast and optimized React development environment.
- **Material-UI (MUI)**: A library for professional-grade UI components.
- **Jotai**: A simple state management library.
- **Formik + Yup**: For form handling and validation.

---

## **How It Works**

1. The app fetches contact data from the backend server (`localhost:5000/api/contacts`).
2. Contacts are displayed in a MUI DataGrid, allowing inline editing and deletion.
3. State changes are managed using Jotai to ensure efficient rendering.
4. Form validation ensures data integrity before sending updates to the server.

---

## **Challenges Faced**

- **State Management:** Handling global state for forms and DataGrid efficiently.
  - **Solution:** Used Jotai to simplify state management and avoid unnecessary re-renders.
- **API Integration:** Ensuring smooth communication with the backend.
  - **Solution:** Used a proxy setup in `vite.config.js` to resolve CORS issues.

---

## **Future Enhancements**

- Add search and filter options to the DataGrid.
- Add multiple color themes.
