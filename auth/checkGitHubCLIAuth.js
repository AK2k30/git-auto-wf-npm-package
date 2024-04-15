import { execAsync } from '../config/execPromisify.js';
import authenticateUser from './authenticateUser.js';

async function checkGitHubCLIAuth() {
    try {
        const { stdout } = await execAsync('gh auth status');
        if (stdout.includes('You are not logged in')) {
            authenticateUser();
        } else {
            console.log('Successfully authenticated with GitHub CLI.');
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('GitHub CLI is not installed. Please install it from https://cli.github.com/');
        } else {
            console.error('Error checking GitHub CLI status:', error);
        }
    }
}

export default checkGitHubCLIAuth;
