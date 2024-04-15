#!/usr/bin/env node

import showPostInstallMessage from './utils/showMessage.js';
import checkGitHubCLIAuth from './auth/checkGitHubCLIAuth.js';
import manageRepository from './setup/manageRepository.js';
import manageShortcuts from './setup/manageShortcuts.js';
import handleError from './utils/handleError.js';
import { getToken } from './auth/tokenManager.js';

async function main() {
  showPostInstallMessage();
  
  try {
    await checkGitHubCLIAuth();
    const token = await getToken();
    console.log('GitHub token successfully retrieved:', token);

    await manageShortcuts();
    await manageRepository();
  } catch (error) {
    handleError('An unexpected error occurred', error);
  }
}

main().catch(error => handleError('An unexpected error occurred', error));
