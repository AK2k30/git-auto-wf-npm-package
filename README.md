# npm i git-auto-wf

`git-auto-wf` is a Node.js CLI tool that automates Git workflows, making it easier to initialize repositories, commit changes, and manage remotes. It's ideal for developers who frequently start new projects or handle multiple repositories.

# Get Started

![Logo](https://github.com/AK2k30/github-workflow-automation-npm-package/assets/105514643/8e5c5b2b-f332-49bd-acab-eaa3c29e3611)


## Installation

Install gitwf with npm

```bash
  npm install git-automation-wf
```

## Getting Started with `git-automate-wf`

Follow these simple steps to automate your Git workflow efficiently:

### Step 1: Update Package.json
After installing `git-auto-wf`, add the following script to your `package.json`:
```json
"scripts": {
  "gitwf": "gitwf"
}

```

### Step 2: Configure Environment
Create a `.env` file in the root of your project and securely add your GitHub personal access token to manage GitHub operations without manual authentication each time:

```plaintext
SECRET_KEY="your_github_token_here"
```

### Step 3: Run the command
Execute the tool using npm by adding it to your command line. This script lets you manage your Git workflow directly:

```plaintext
npm run gitwf
```

### Step 4: Authenticate with GitHub
If not already logged in, authenticate using the GitHub CLI:

```plaintext
gh auth login
```

If you're not authenticated, the tool will prompt you to authenticate automatically.

### Step 5: Repository Initialization and Management
During the initial run, if a Git repository does not already exist in your project directory, git-automate-wf will prompt you to create one. 

Follow these steps to quickly set up your project with `git-auto-wf`:

1. **Initialize a New Git Repository**
   - This tool will automatically detect if a Git repository needs to be initialized and will set it up for you.

2. **Automatically Add All Files**
   - All new and untracked files will be automatically added to the staging area, ready for commit.

3. **Create an Initial Commit**
   - You will be prompted to enter a commit message for the initial commit, encapsulating all changes made.

4. **Set Up a Remote Repository URL (if needed)**
   - If you need to connect your local repository to a remote, `git-auto-wf` will prompt you to provide the remote repository URL and set it up.

If a repository is already present, the tool will skip to managing existing files and commits:

```plaintext
Enter commit message:
```

### Step 6: Subsequent Usage
After completing the initial setup, using git-auto-wf becomes more streamlined. Just run:

```plaintext
npm run gitwf
```

Each subsequent execution will assess the current state of the repository and automate tasks like staging changes, committing, and managing branches or remotes as configured.

### Step 6: Integrating Changes with Git Pull
`git-auto-wf` seamlessly handles updates from your remote repository to ensure that your local project is always up-to-date with the latest changes made by other contributors. This functionality is crucial for collaborative projects where multiple developers are making concurrent updates to the codebase.

How Git Pull Works in `git-auto-wf`
Whenever you run the command:

```plaintext
npm run gitwf
```
The tool automatically checks for changes in the remote repository that are not present in your local branch. If changes are detected, `git-auto-wf` will:

1. **Pull Remote Changes and Merge Locally:**
   - The tool will attempt to git pull with rebase from the current branch's upstream branch.
   - If successful, it will then try to push again.
   - If the pull operation fails (e.g., due to a merge conflict), the user is asked if they want to retry or resolve manually.

2. **Create a New Branch for Your Changes**
   - If the direct merge is not desirable or feasible, the user can opt to create a new branch.
   - The user is prompted to provide a name for the new branch.
   - The changes will be committed to this new branch, which is then pushed to the remote repository.

3. **Cancel and Resolve Manually**
   - This option allows the user to handle the conflict manually.
   - The operation is cancelled, and the user can manually pull changes, inspect the differences, and resolve conflicts as needed.

### Note:
Remember to secure your `.env` file and not to expose your `SECRET_KEY` in any publicly accessible or shared environments. This key should be kept confidential to protect your GitHub account and repositories.

## Authors

- [@AK2k30](https://www.github.com/AK2k30)
## Conclusion

#### If you like this package, show your support & love!

[![buy me a coffee](https://res.cloudinary.com/customzone-app/image/upload/c_pad,w_200/v1712840190/bmc-button_wl78gx.png)](https://www.buymeacoffee.com/akashsunile)
