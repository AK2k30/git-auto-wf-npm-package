import inquirer from 'inquirer';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { PATHS } from '../config/paths.js';

async function manageShortcuts() {
    if (!fs.existsSync(PATHS.shortcut)) {
        const { createShortcut } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'createShortcut',
                message: 'Would you like to create a shortcut for this script?',
                default: false,
            },
        ]);

        if (createShortcut) {
            const { shortcutName } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'shortcutName',
                    message: 'What do you want to name your shortcut?',
                    default: 'gitwf', // Default shortcut name
                },
            ]);

            const shellConfigPath = path.join(os.homedir(), '.bashrc'); // Assuming Bash shell
            const packagePath = process.argv[1]; // Path to the current script
            const configContent = `\nalias ${shortcutName}='node ${packagePath}'\n`;

            try {
                fs.appendFileSync(shellConfigPath, configContent);
                console.log(`Shortcut '${shortcutName}' added to your ${shellConfigPath}. Please reload your shell.`);
                fs.writeFileSync(PATHS.shortcut, 'Shortcut created');
            } catch (error) {
                console.error('Failed to write shortcut to shell configuration:', error);
            }
        }
    } else {
        console.log('Shortcut already created. Skipping this step.');
    }
}

export default manageShortcuts;
