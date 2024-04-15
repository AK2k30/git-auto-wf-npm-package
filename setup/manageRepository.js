import simpleGit from 'simple-git';
import inquirer from 'inquirer';
import { execSync } from 'child_process';
import fs from 'fs';
import { PATHS } from '../config/paths.js';

const git = simpleGit();

async function getRepoVisibility() {
    if (fs.existsSync(PATHS.visibility)) {
        return fs.promises.readFile(PATHS.visibility, 'utf8');
    } else {
        const { visibility } = await inquirer.prompt([
            {
                type: 'list',
                name: 'visibility',
                message: 'Do you want to create a public or private repository?',
                choices: ['public', 'private'],
                default: 'public',
            },
        ]);
        await fs.promises.writeFile(PATHS.visibility, visibility);
        return visibility;
    }
}

async function manageRepository() {
    const isRepo = await git.checkIsRepo();
    if (!isRepo) {
        await git.init();
        console.log('Git repository initialized.');
    } else {
        console.log('Existing Git repository detected.');
    }

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
            const visibility = await getRepoVisibility();
            const { repoName } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'repoName',
                    message: 'Enter the name for the new GitHub repository:',
                },
            ]);
            execSync(`gh repo create ${repoName} --${visibility} --source=. --remote=origin --push`, { stdio: 'inherit' });
            console.log('GitHub repository created and remote origin set.');
        } else {
            const { remoteUrl } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'remoteUrl',
                    message: 'Enter the URL for the existing GitHub repository:',
                    validate: input => !!input.length || 'Remote URL cannot be empty.',
                },
            ]);
            await git.addRemote('origin', remoteUrl);
            console.log(`Remote 'origin' set to ${remoteUrl}`);
        }
    } else {
        console.log("Using existing remote 'origin'.");
    }
}

export default manageRepository;
