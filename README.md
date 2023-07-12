
# Knock Cpp API

Compile C++ everywhere with notes and code spaces!

## Getting Started

These instructions will guide you on how to use the API and make requests to its endpoints.

### Prerequisites

To interact with the API, you will need:

- A tool to make HTTP requests (e.g., cURL, Postman)

### API Base URL

The base URL for accessing the API is: `<base_url>`

## API Endpoints

The API exposes the following endpoints:

### Addon

- `POST /addon/compile`: Compiles source code.
- `POST /addon/download`: Downloads source code.
- `POST /addon/assembly`: Generates assembly code.

### Notes

- `POST /notes/new`: Creates a new note.
- `GET /notes/recollector`: Retrieves the notes.
- `POST /notes/items`: Adds items to the notes.
- `DELETE /notes/delete`: Deletes a note by ID.
- `GET /notes/show`: Retrieves a note by ID.
- `GET /notes/last`: Retrieves the last note.

### Crypto

- `GET /crypto/sha256`: Generates SHA256 hash.

## API Usage

Detailed examples of how to use the API endpoints can be found in the [API Usage](https://github.com/scyth3-c/knock-cpp-API/blob/master/Doc/api-usage.md) document.

## API Reference

For detailed information about the API endpoints, request/response formats, and parameters, please refer to the [API Reference](https://github.com/scyth3-c/knock-cpp-API/blob/master/Doc/api-reference.md) document.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please create an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
