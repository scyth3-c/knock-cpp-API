# API Usage

This document provides detailed examples of how to use the API endpoints for various functionalities.

## Addon

### Compile Source Code

Compiles the provided source code.

**Endpoint:** `POST /addon/compile`

**Request Body:**

```plaintext
Rawbody:

<source code>

Headers:

Content-Type: text/plain
title: [Some title]
standar: [c2a, c++11, c++14, c++17]
o: [1, 2, 3]
flags: [-Wall, etc.]
data: ["name" 23 args]
bot: [1]
curl: ["on", "off"]
Example:

```


```javascript
await axios.post(`${API_BASE_URL}/addon/compile`, source_code, {
  headers: {
    "Content-Type": "text/plain",
    title: 'mi_file',
    standar: "c++17",
    o: "1",
    flags: "-Wall",
    data: "10 kevin",
  },
});
```

Download Source Code
Downloads the provided source code.

Endpoint: POST /addon/download

Request Body:

```plaintext
Rawbody:
<source code>
Headers:

Content-Type: text/plain
title: [Some title]
```

Example:

```javascript
Copy code
await axios.post(`${API_BASE_URL}/addon/download`, source_code, {
  headers: {
    "Content-Type": "text/plain",
    title: 'Some title',
  },
});
```
Generate Assembly Code
Generates assembly code for the provided source code.

Endpoint: POST /addon/assembly

Request Body:

```plaintext
Copy code
<source code>
Headers:

Content-Type: text/plain
title: [Some title]
standar: [2a, 11, 14, 17]
o: [1, 2, 3]
flags: [-Wall, etc.]
```
Example:

```javascript
Copy code
await axios.post(`${API_BASE_URL}/addon/assembly`, source_code, {
  headers: {
    "Content-Type": "text/plain",
    title: 'some title',
    standar: "c++17",
    o: "1",
    flags: "-Wall",
  },
});
```

Notes
Create a New Note
Creates a new note.

Endpoint: POST /notes/new

Request Body:

```json
Copy code
{
  "nombre": "some name",
  "conten": "some content",
  "autor": "optional author"
}
```
Example:

```javascript
Copy code
await axios.post(`${API_BASE_URL}/notes/new`, {
  "nombre": "some name",
  "conten": "some content",
  "autor": "kevin"
});
```
Retrieve Notes
Retrieves the notes.

Endpoint: GET /notes/recollector

Example:

```javascript
Copy code
await axios.get(`${API_BASE_URL}/notes/recollector`);
```

Add Items to a Note
Adds items to a note.

Endpoint: POST /notes/items

Example:

```javascript
Copy code
await axios.post(`${API_BASE_URL}/notes/items`);
```
Delete a Note
Deletes a note by ID.

Endpoint: DELETE /notes/delete?id=[note_id]

Example:

```javascript
Copy code
await axios.delete(`${API_BASE_URL}/notes/delete?id=61205b1f4968e20016bc4be6`);
```
Retrieve a Note
Retrieves a note by ID.

Endpoint: GET /notes/show?id=[note_id]

Example:

```javascript
await axios.get(`${API_BASE_URL}/notes/show?id=61205b1f4968e20016bc4be6`);
```

Retrieve the Last Note
Retrieves the last note.

Endpoint: GET /notes/last

Example:

```javascript
await axios.get(`${API_BASE_URL}/notes/last`);
```

Crypto
Generate SHA256 Hash
Generates the SHA256 hash of the provided text.

Endpoint: GET /crypto/sha256?plain=[text]&dg=[hex or base64]

Example:

```javascript
await axios.get(`${API_BASE_URL}/crypto/sha256?plain=SOME TEXT&dg=hex`);
```
