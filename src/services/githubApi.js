import axios from 'axios';

export async function fetchTrendingRepos({ query = '', language = '', sort = 'stars' }) {
  try {
    console.log('Input parameters:', { query, language, sort });

    const queryParts = ['stars:>1000'];

    if (query && query.trim()) {
      queryParts.push(query.trim());
    }

    if (language && language.trim()) {
      queryParts.push(`language:${language.toLowerCase()}`);
    }

    const q = queryParts.join(' ');
    const sortParam = sort === 'updated' ? 'updated' : 'stars';

    console.log('Final query:', q);

    const response = await axios.get('https://api.github.com/search/repositories', {
      params: { q, sort: sortParam, order: 'desc', per_page: 30 },
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'GitHub-Project-Explorer',
      },
    });

    console.log('API response:', response.data.total_count, 'total repos found');
    return response.data.items;
  } catch (error) {
    console.error('GitHub API Error Details:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    if (error.response?.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Please try again later.');
    } else if (error.response?.status === 422) {
      console.error('422 Error - Invalid query. Response:', error.response?.data);
      throw new Error(`Invalid search query: ${error.response?.data?.message || 'Unknown error'}`);
    } else {
      throw new Error(`GitHub API error: ${error.response?.data?.message || error.message}`);
    }
  }
}