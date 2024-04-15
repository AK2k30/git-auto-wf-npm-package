import crypto from 'crypto-js';
import fs from 'fs';
import path from 'path';
import url from 'url';
import inquirer from 'inquirer';  
import dotenv from 'dotenv';
dotenv.config();

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const TOKEN_PATH = path.join(__dirname, '.github_token');
const GITIGNORE_PATH = path.join(__dirname, '.gitignore');
const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  console.error('No SECRET_KEY found. Please set it in your .env file.');
  process.exit(1);
}

const encrypt = (text) => {
  return crypto.AES.encrypt(text, SECRET_KEY).toString();
};

const decrypt = (cipherText) => {
  const bytes = crypto.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(crypto.enc.Utf8);
};

const storeToken = (token) => {
  try {
    fs.writeFileSync(TOKEN_PATH, encrypt(token), 'utf8');
    console.log('Token stored successfully.');
    ensureGitignore();
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

const ensureGitignore = () => {
  try {
    const gitignoreExists = fs.existsSync(GITIGNORE_PATH);
    if (!gitignoreExists) {
      fs.writeFileSync(GITIGNORE_PATH, '.github_token\n');
    } else {
      const gitignoreContent = fs.readFileSync(GITIGNORE_PATH, 'utf8');
      if (!gitignoreContent.includes('.github_token')) {
        fs.appendFileSync(GITIGNORE_PATH, '\n.github_token\n');
      }
    }
  } catch (error) {
    console.error('Error updating .gitignore:', error);
  }
};

const retrieveToken = () => {
  try {
    if (!fs.existsSync(TOKEN_PATH)) return null;
    const cipherText = fs.readFileSync(TOKEN_PATH, 'utf8');
    return decrypt(cipherText);
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

const askForToken = async () => {
  try {
    const { token } = await inquirer.prompt([{
      type: 'password',
      name: 'token',
      message: 'Enter your GitHub token:',
    }]);
    storeToken(token); 
    return token;
  } catch (error) {
    console.error('Error during token prompt:', error);
    process.exit(1); 
  }
};

const getToken = async () => {
  try {
    let token = retrieveToken();
    if (!token) {
      console.log('GitHub token not found or expired.');
      token = await askForToken(); 
    }
    return token;
  } catch (error) {
    console.error('Failed to handle the token retrieval process:', error);
    process.exit(1); 
  }
};

export { getToken };
