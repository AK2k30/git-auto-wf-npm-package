import path from 'path';
import os from 'os';

async function findProjectRoot(currentDir) {
    while (currentDir !== path.dirname(currentDir)) {
        if (fs.existsSync(path.join(currentDir, 'package.json'))) {
            return currentDir;
        }
        currentDir = path.dirname(currentDir);
    }
    throw new Error('No package.json found in any parent directory.');
  }
  
  async function addToGitignore(projectRoot, filePaths) {
    const gitignorePath = path.join(projectRoot, '.gitignore');
    try {
      let gitignoreContent = "";
      if (fs.existsSync(gitignorePath)) {
        gitignoreContent = await fsPromises.readFile(gitignorePath, 'utf8');
      }
  
      const updates = [];
      for (const filePath of filePaths) {
        const relativePath = path.relative(projectRoot, filePath);
        if (!gitignoreContent.includes(relativePath + '\n')) {
          updates.push(relativePath);
        }
      }
  
      if (updates.length > 0) {
        gitignoreContent += updates.join('\n') + '\n';
        await fsPromises.writeFile(gitignorePath, gitignoreContent);
        console.log('.gitignore updated with: ', updates.join(', '));
      } else {
        console.log('No updates needed for .gitignore.');
      }
    } catch (error) {
        console.error('Failed to update .gitignore:', error);
    }
  }