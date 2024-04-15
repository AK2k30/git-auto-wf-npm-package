// /src/utils/showMessage.js
import fs from 'fs';
import { PATHS } from '../config/paths.js'; // Assuming PATHS includes a 'postInstall' path

function showPostInstallMessage() {
    if (!fs.existsSync(PATHS.postInstall)) {
        console.log(`
        Thank you for installing MyPackage!
        To use this package, add the following script to your package.json:

        "scripts": {
            "gitwf": "gitwf"
        }

        Then you can run it using 'npm run gitwf'.
        `);

        fs.writeFileSync(PATHS.postInstall, 'Message shown');
    }
}

export default showPostInstallMessage;
