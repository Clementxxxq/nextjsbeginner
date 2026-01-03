# CRUD API Testing Guide (Next.js + Prisma)

This document provides a step-by-step guide to testing the `/api/contacts` CRUD API.  
Recommended tools: **Thunder Client**.

---

## 1. GET Testing (Read)

### 1.1 Get All Contacts

**Method:**

`GET`
**URL:**
`http://localhost:3000/api/contacts`
**Expected Response:**

- Status: `200 OK`
- Body: JSON array of all contacts (empty array `[]` if no contacts exist)
  **Steps:**

1. Open Thunder Client.
2. Send a `GET` request to the URL above.
3. Verify the response status and body.

### 1.2 Get Contact by ID

**Method:**
`GET`
**URL:**
`http://localhost:3000/api/contacts/{id}`
**Expected Response:**

- Status: `200 OK` (if contact exists) or `404 Not Found` (if contact does not exist)
- Body: JSON object of the contact with the specified ID
  **Steps:**

1. Open Thunder Client.
2. Send a `GET` request to the URL above, replacing `{id}` with a valid contact ID.
3. Verify the response status and body.

---

## 2. POST Testing (Create)

### 2.1 Create New Contact

**Method:**
`POST`
**URL:**
`http://localhost:3000/api/contacts`
**Request Body:**

```json
{
  "name": "John Doe",
  "phone": "123-456-7890",
  "email": "john@example.com",
  "address": "123 Main St"
}
```

**Expected Response:**

- Status: `201 Created`
- Body: JSON object of the newly created contact
  **Steps:**

1. Open Thunder Client.
2. Send a `POST` request to the URL above with the JSON body.
3. Verify the response status and body.

---

## 3. PUT Testing (Update)

### 3.1 Update Existing Contact

**Method:**
`PUT`
**URL:**
`http://localhost:3000/api/contacts/{id}`
**Request Body:**

```json
{
  "name": "Jane Doe",
  "phone": "987-654-3210",
  "email": "john@example.com",
  "address": "456 Elm St"
}
```

**Expected Response:**

- Status: `200 OK` (if contact exists) or `404 Not Found` (if contact does not exist)
- Body: JSON object of the updated contact
  **Steps:**

1. Open Thunder Client.
2. Send a `PUT` request to the URL above, replacing `{id}` with a valid contact ID and including the JSON body.
3. Verify the response status and body.

---

## 4. DELETE Testing (Delete)

### 4.1 Delete Contact

**Method:**
`DELETE`
**URL:**
`http://localhost:3000/api/contacts/{id}`
**Expected Response:**

- Status: `"success": true` (if contact exists) or `404 Not Found` (if contact does not exist)
  **Steps:**

1. Open Thunder Client.
2. Send a `DELETE` request to the URL above, replacing `{id}` with a valid contact ID.
3. Verify the response status.

---

## 5. Error Handling Tests

### 5.1 Invalid Contact ID

**Method:**
`GET`
**URL:**
`http://localhost:3000/api/contacts/invalid-id`
**Expected Response:**

- Status: `400 Bad Request`
  **Steps:**

1. Open Thunder Client.
2. Send a `GET` request to the URL above with an invalid ID.
3. Verify the response status.

### 5.2 Missing Required Fields

**Method:**
`POST`
**URL:**
`http://localhost:3000/api/contacts`
**Request Body:**

```json
{
  "phone": "123-456-7890"
}
```

**Expected Response:**

- Status: `400 Bad Request`
  **Steps:**

1. Open Thunder Client.
2. Send a `POST` request to the URL above with the incomplete JSON body.
3. Verify the response status.

---

## 6. Conclusion

This guide provides a comprehensive approach to testing the CRUD API for contacts. Ensure to test all endpoints and handle errors appropriately to maintain a robust API.
