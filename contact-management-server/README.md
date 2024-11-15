# Contact Management Server

This is the **backend** of the Contact Management System, built with Node.js and Express. It provides RESTful APIs for managing contact data, stored in MongoDB Atlas.

---

## **Features**

- CRUD API endpoints for managing contacts.
- Uses Mongoose for schema validation and database operations.
- Handles cross-origin requests with CORS.
- Automatically restarts during development using Nodemon.

---

## **How to Run**

### **Pre-requisites**

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn installed

### **Steps**

1. Navigate to the `contact-management-server` directory:

   ```bash
   cd contact-management-server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with the following content:

   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database_name>?retryWrites=true&w=majority
   ```

4. Start the server using Nodemon:

   ```bash
   npm run dev
   ```

5. The server will run at:
   ```
   http://localhost:5000
   ```

---

## **Tools and Libraries**

- **Node.js**: A JavaScript runtime for building server-side applications.
- **Express.js**: A lightweight framework for handling HTTP requests and routes.
- **Mongoose**: A MongoDB object modeling library.
- **Nodemon**: For automatic server restarts during development.

---

## **API Endpoints**

| Method | Route               | Description        |
| ------ | ------------------- | ------------------ |
| GET    | `/api/contacts`     | Fetch all contacts |
| POST   | `/api/contacts`     | Add a new contact  |
| PUT    | `/api/contacts/:id` | Edit a contact     |
| DELETE | `/api/contacts/:id` | Delete a contact   |

---

## **Model Schema**

The contact schema is defined as:

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

## **Challenges Faced**

- **Database Connection Issues:** Initial trouble connecting to MongoDB Atlas.
  - **Solution:** Updated connection string and ensured IP whitelist and correct user credentials.
- **CORS Errors:** Cross-origin requests were blocked during client-server communication.
  - **Solution:** Integrated `cors` middleware in Express with proper configuration.

---

## **Future Enhancements**

- Implement authentication for secure API access.
- Add API rate limiting to prevent abuse.
