# API Reference

This document provides detailed information about the API endpoints, their request/response formats, and parameters.

## Addon

### Compile Source Code

Compiles the provided source code.

**Endpoint:** `POST /addon/compile`

**Request Body:**

- Content Type: `text/plain`
- Schema:
  - Type: `string`

**Headers:**

- `title`: [string]
- `standar`: [string] (c2a, c++11, c++14, c++17)
- `o`: [string] (1, 2, 3)
- `flags`: [string] (-Wall, etc.)
- `data`: [string] (name 23 args)
- `bot`: [string] (1)
- `curl`: [string] ("on", "off")

**Responses:**

- 200: Successful response

### Download Source Code

Downloads the provided source code.

**Endpoint:** `POST /addon/download`

**Request Body:**

- Content Type: `text/plain`
- Schema:
  - Type: `string`

**Headers:**

- `title`: [string]

**Responses:**

- 200: Successful response

### Generate Assembly Code

Generates assembly code for the provided source code.

**Endpoint:** `POST /addon/assembly`

**Request Body:**

- Content Type: `text/plain`
- Schema:
  - Type: `string`

**Headers:**

- `title`: [string]
- `standar`: [string] (2a, 11, 14, 17)
- `o`: [string] (1, 2, 3)
- `flags`: [string] (-Wall, etc.)

**Responses:**

- 200: Successful response

## Notes

### Create a New Note

Creates a new note.

**Endpoint:** `POST /notes/new`

**Request Body:**

- Content Type: `application/json`
- Schema:
  - Properties:
    - `nombre`: [string]
    - `conten`: [string]
    - `autor`: [string] (optional)

**Responses:**

- 200: Successful response

### Retrieve Notes

Retrieves the notes.

**Endpoint:** `GET /notes/recollector`

**Responses:**

- 200: Successful response

### Add Items to a Note

Adds items to a note.

**Endpoint:** `POST /notes/items`

**Responses:**

- 200: Successful response

### Delete a Note

Deletes a note by ID.

**Endpoint:** `DELETE /notes/delete`

**Parameters:**

- `id`: [array of strings]

**Responses:**

- 200: Successful response

### Retrieve a Note

Retrieves a note by ID.

**Endpoint:** `GET /notes/show`

**Parameters:**

- `id`: [array of strings]

**Responses:**

- 200: Successful response

### Retrieve the Last Note

Retrieves the last note.

**Endpoint:** `GET /notes/last`

**Responses:**

- 200: Successful response

## Crypto

### Generate SHA256 Hash

Generates the SHA256 hash of the provided text.

**Endpoint:** `GET /crypto/sha256`

**Parameters:**

- `plain`: [array of strings]
- `dg`: [array of strings] (hex, base64)

**Responses:**

- 200: Successful response

For more detailed information about the request/response formats and parameters, please refer to the [API Usage](api-usage.md) document.

## License

This API is released under the [MIT License](LICENSE).
