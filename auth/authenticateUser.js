import { execSync } from 'child_process';
import inquirer from 'inquirer';

async function authenticateUser() {
    const response = await inquirer.prompt([{
        type: 'confirm',
        name: 'authenticate',
        message: 'Would you like to authenticate now? If you are using Git Bash, you may need to prepend "winpty" to the command.',
        default: true
    }]);

    if (response.authenticate) {
        const command = process.env.TERM_PROGRAM === 'mintty' || process.platform === 'win32' ? 'winpty gh auth login' : 'gh auth login';
        execSync(command, { stdio: 'inherit' });
    } else {
        console.log('Authentication skipped. Exiting...');
        process.exit(1);
    }
}

export default authenticateUser;
