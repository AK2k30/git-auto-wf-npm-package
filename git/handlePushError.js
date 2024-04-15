import simpleGit from 'simple-git';
import inquirer from 'inquirer';

const git = simpleGit();

async function handlePushError() {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Failed to push changes due to remote changes. Would you like to:',
            choices: [
                { name: 'Pull remote changes and merge locally', value: 'pull' },
                { name: 'Create a new branch for your changes', value: 'newBranch' },
                { name: 'Cancel and resolve manually', value: 'cancel' }
            ]
        }
    ]);

    switch (action) {
        case 'pull':
            try {
                await git.pull('origin', 'master', {'--rebase': 'true'});
                console.log('Remote changes pulled and merged successfully.');
                await git.push('origin', 'master');
                console.log('Changes pushed to the remote repository on branch master.');
            } catch (pullError) {
                console.error('Error pulling and merging changes:', pullError);
                process.exit(1);
            }
            break;
        case 'newBranch':
            const { branchName } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'branchName',
                    message: 'Enter a name for the new branch:',
                    validate: input => !!input.trim().length || 'Branch name cannot be empty.'
                }
            ]);
            await git.checkoutLocalBranch(branchName);
            console.log(`New branch '${branchName}' created.`);
            await git.push('origin', branchName);
            console.log(`Changes pushed to the new branch '${branchName}' on remote.`);
            break;
        case 'cancel':
            console.log('Please manually resolve the push conflict.');
            process.exit(0);
            break;
    }
}

export default handlePushError;
