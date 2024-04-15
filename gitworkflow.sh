#!/bin/bash

# Load .env file
if [ -f .env ]; then
    export $(cat .env | sed 's/#.*//g' | xargs)
fi

git config --global user.name "Akash Singh"
git config --global user.email "akashsunilsingh5555@gmail.com"

git init

git add .

echo "Enter commit message:"
read commitMessage
git commit -m "$commitMessage"

if git remote get-url origin > /dev/null 2>&1; then
    echo "Remote 'origin' already exists. Using existing repository..."
    repoURL=$(git remote get-url origin)
else
    echo "Do you want to create a new GitHub repository? (y/n):"
    read createRepoChoice
    
    if [ "$createRepoChoice" = "y" ]; then
        echo "Enter your GitHub username:"
        read githubUsername
        echo "Enter your new GitHub repository name:"
        read repoName
        
        gh repo create $githubUsername/$repoName --public --source=. --confirm
        repoURL="https://github.com/$githubUsername/$repoName.git"
    else
        echo "Enter your GitHub repository URL (e.g., https://github.com/AK2k30/git_automation_workflow.git):"
        read repoURL
        
        git remote add origin $repoURL
    fi
fi

currentBranch=$(git branch --show-current)

git push -u origin $currentBranch
