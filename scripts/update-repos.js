const fs = require('fs');
const https = require('https');

const username = 'KhalilNiazi'; // 🔁 Replace with your GitHub username
const maxRepos = 5;

function fetchRepos(callback) {
  https.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=${maxRepos}`, {
    headers: { 'User-Agent': 'Node.js' }
  }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const repos = JSON.parse(data);
      if (Array.isArray(repos)) {
        callback(repos.map(repo =>
          `- [📂 ${repo.name}](${repo.html_url}) - ${repo.description || ''}`
        ).join('\n'));
      } else {
        console.error("Failed to fetch repos.");
      }
    });
  });
}

function updateReadme(content) {
  const readmePath = './README.md';
  let readme = fs.readFileSync(readmePath, 'utf8');
  const start = '<!--START_SECTION:recent-repos-->';
  const end = '<!--END_SECTION:recent-repos-->';
  const regex = new RegExp(`${start}[\\s\\S]*?${end}`);

  const newSection = `${start}\n${content}\n${end}`;
  readme = readme.replace(regex, newSection);
  fs.writeFileSync(readmePath, readme);
}

fetchRepos(updateReadme);
