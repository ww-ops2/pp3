// GitHub API 配置
const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/ww-ops2/pp3/main/V2/data.json';
const GITHUB_API_URL = 'https://api.github.com/repos/ww-ops2/pp3/contents/V2/data.json';
const GITHUB_CHANGELOG_RAW_URL = 'https://raw.githubusercontent.com/ww-ops2/pp3/main/V2/data_changelog.json';
const GITHUB_CHANGELOG_API_URL = 'https://api.github.com/repos/ww-ops2/pp3/contents/V2/change_log.json';

// Token 请用户手动配置或通过环境变量获取
const GITHUB_TOKEN = localStorage.getItem('GITHUB_TOKEN') || prompt('请输入 GitHub Token:');