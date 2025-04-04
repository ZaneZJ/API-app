interface GitHubContent {
  content: string;
  encoding: string;
}

export async function getGitHubReadme(githubUrl: string): Promise<string> {
  try {
    // Parse the GitHub URL to extract owner and repo
    const urlParts = githubUrl.replace('https://github.com/', '').split('/');
    if (urlParts.length < 2) {
      throw new Error('Invalid GitHub URL format');
    }

    const owner = urlParts[0];
    const repo = urlParts[1];

    // First, try to fetch the README.md
    const readmeUrl = `https://api.github.com/repos/${owner}/${repo}/contents/README.md`;
    const response = await fetch(readmeUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'GitHub-Readme-Fetcher'
      }
    });

    if (!response.ok) {
      // If README.md doesn't exist, try readme.md (lowercase)
      const lowercaseReadmeUrl = `https://api.github.com/repos/${owner}/${repo}/contents/readme.md`;
      const lowercaseResponse = await fetch(lowercaseReadmeUrl, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'GitHub-Readme-Fetcher'
        }
      });

      if (!lowercaseResponse.ok) {
        throw new Error('README not found in repository');
      }

      const data = await lowercaseResponse.json() as GitHubContent;
      return Buffer.from(data.content, 'base64').toString('utf-8');
    }

    const data = await response.json() as GitHubContent;
    return Buffer.from(data.content, 'base64').toString('utf-8');

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch README: ${error.message}`);
    }
    throw new Error('Failed to fetch README');
  }
} 