import simpleGit from 'simple-git';
import inquirer from 'inquirer';
import { PATHS } from '../config/paths.js';
import fs from 'fs';

const git = simpleGit();

async function initRepository() {
    const isRepo = await git.checkIsRepo();
    if (!isRepo) {
        await git.init();
        console.log('Git repository initialized.');
    } else {
        console.log('Existing repository detected.');
    }
}

async function addAndCommitFiles() {
    await git.add('./*');
    const { commitMessage } = await inquirer.prompt([
        {
            type: 'input',
            name: 'commitMessage',
            message: 'Enter commit message:',
            default: 'Initial commit',
        },
    ]);
    await git.commit(commitMessage);
    console.log(`Changes committed with message: "${commitMessage}"`);
}

async function setupRemote() {
    const hasOrigin = await git.getRemotes().then(remotes => remotes.some(remote => remote.name === 'origin'));
    if (!hasOrigin) {
        const { setupRemote } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'setupRemote',
                message: 'No remote "origin" found. Would you like to set up a new GitHub repository or use an existing one?',
                default: false,
            },
        ]);

        if (setupRemote) {
            const visibility = fs.existsSync(PATHS.visibility) ? await fs.promises.readFile(PATHS.visibility, 'utf8') : 'public';
            const { repoName } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'repoName',
                    message: 'Enter the name for the new GitHub repository:',
                },
            ]);
            const execSync = require('child_process').execSync;
            execSync(`gh repo create ${repoName} --${visibility} --source=. --remote=origin --push`, { stdio: 'inherit' });
            console.log('GitHub repository created and remote origin set.');
        } else {
            const remoteUrl = await fs.promises.readFile(PATHS.remoteUrl, 'utf8');
            await git.addRemote('origin', remoteUrl);
            console.log(`Remote 'origin' set to ${remoteUrl}`);
        }
    } else {
        console.log("Using existing remote 'origin'.");
    }
}

export { initRepository, addAndCommitFiles, setupRemote };
