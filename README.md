# Contact Management System

A **Contact Management System** designed to streamline the management of contact information efficiently. The project includes two main components:

- **contact-management-client:** A React-based frontend for user interaction.
- **contact-management-server:** A Node.js + Express backend to handle the API and database logic.

This project was developed as part of an **assignment given by Erino** for an internship application.

---

## **Project Overview**

This app allows users to perform CRUD operations on contact data, including adding, editing, deleting, and fetching contact details. The data is stored in MongoDB Atlas, and the app provides a clean and intuitive user experience styled using Material-UI (MUI).

---

## **How to Run the Project**

### **Pre-requisites**

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn installed

### **Steps to Run**

1. **Clone the Repository**

   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. **Setup the Backend**

   - Navigate to the server directory:
     ```bash
     cd contact-management-server
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `contact-management-server` directory with the following variables:
     ```env
     PORT=5000
     MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database_name>?retryWrites=true&w=majority
     ```
   - Start the server with nodemon:
     ```bash
     npm run start
     ```

3. **Setup the Frontend**

   - Navigate to the client directory:
     ```bash
     cd ../contact-management-client
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend server:
     ```bash
     npm run dev
     ```

4. Open your browser and navigate to `http://localhost:3000`.

---

## **Tools Used**

### **Frontend (contact-management-client)**

- **React**: Component-based UI framework
- **Vite**: Fast React development bundler
- **Material-UI (MUI)**: For designing a professional user interface
- **Jotai**: Lightweight state management library

### **Backend (contact-management-server)**

- **Node.js**: Runtime environment for JavaScript
- **Express.js**: Backend framework for handling API routes
- **Mongoose**: MongoDB object modeling for Node.js
- **Nodemon**: Automatically restarts the server during development

### **Database**

- **MongoDB Atlas**: Cloud database for storing contacts

---

## **Model Schema**

The contact model is defined in the server as follows:

```javascript
const ContactSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String },
    jobTitle: { type: String },
  },
  { timestamps: true }
);
```

---

## **Major Technical Decisions**

1. **Frontend Framework:** React + MUI was chosen for its component-based architecture and pre-designed UI components, enabling faster development.
2. **Backend Framework:** Express.js was selected due to its simplicity and flexibility.
3. **State Management:** Jotai was chosen for its lightweight and simple API to handle state efficiently without boilerplate.
4. **Database:** MongoDB Atlas was chosen for its scalability and simplicity in managing JSON-like data.
5. **Data Grid Integration:** MUI DataGrid was used for efficient display and manipulation of tabular data.

---

## **How the App Works**

1. Users interact with the UI to perform operations like creating, editing, or deleting contacts.
2. API requests are sent to the backend to perform database operations.
3. The backend communicates with MongoDB Atlas to store or retrieve contact data.
4. Updated data is fetched back to the frontend and reflected in the DataGrid table in real time.

---

## **Challenges Faced and Resolutions**

### **1. Handling `_id` for DataGrid**

**Challenge:** The MUI DataGrid required a unique `id` field, while MongoDB uses `_id`.  
**Solution:** Mapped MongoDB's `_id` to the DataGrid's `id` using the `getRowId` property.

### **2. CORS Issues**

**Challenge:** Cross-Origin Resource Sharing (CORS) errors occurred during API calls between `localhost:3000` (client) and `localhost:5000` (server).  
**Solution:** Added the `cors` middleware in the Express server to allow requests from the client.

```javascript
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));
```

### **3. Real-Time Data Sync**

**Challenge:** Changes made on the client (like delete or edit) needed to update the backend.  
**Solution:** Ensured the backend API updates the database first and then fetches the updated data to reflect on the frontend.

---

## **Conclusion**

This Contact Management System is a scalable and modular application, making it easy to extend with additional features like authentication, pagination, or search. This project also highlights the importance of effective state management and API integration.

This project was a rewarding experience, helping to strengthen full-stack development skills. Special thanks to **Erino** for providing this opportunity!
