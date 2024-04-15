// /src/utils/handleError.js

function handleError(message, error) {
    console.error(`${message}\nError Details: ${error.message}`);
    process.exit(1);
}

export default handleError;
