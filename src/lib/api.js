const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

async function request(path) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`);
  } catch (error) {
    throw new Error(
      `Unable to reach the Arcoria backend at ${API_BASE_URL}. Start the Express server and try again.`
    );
  }

  if (!response.ok) {
    let details = '';

    try {
      const data = await response.json();
      details = data.message ? `: ${data.message}` : '';
    } catch (error) {
      details = '';
    }

    throw new Error(`Request failed for ${path} with status ${response.status}${details}`);
  }

  return response.json();
}

export function fetchSkills() {
  return request('/skills');
}

export function fetchLearningPath(id) {
  return request(`/learning-paths/${id}`);
}

export { API_BASE_URL };
