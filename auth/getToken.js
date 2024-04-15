function getToken() {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      throw new Error("GitHub token is not available.");
    }
    return token;
}
  
export default getToken;
  