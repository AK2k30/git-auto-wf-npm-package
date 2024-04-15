// /src/utils/createFile.js
import fs from 'fs';

function createFile(path, content = '') {
    try {
        fs.writeFileSync(path, content);
        console.log(`File created: ${path}`);
    } catch (error) {
        console.error(`Error creating file at ${path}: ${error}`);
    }
}

export default createFile;
