/**
 * ClarityAI API Service
 * Handles communication with the Django REST Framework backend.
 */

const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) {
    return envUrl.endsWith('/') ? envUrl.slice(0, -1) : envUrl;
  }
  return 'http://127.0.0.1:8000/api';
};

/**
 * Send topic, explanation, and confidence to Django for Gemini analysis.
 * @param {string} topic
 * @param {string} explanation
 * @param {number} confidence
 * @returns {Promise<Object>}
 */
export async function analyzeExplanation(topic, explanation, confidence) {
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/analyze/`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        topic,
        explanation,
        confidence: Number(confidence),
      }),
    });

    const responseData = await response.json().catch(() => null);

    if (!response.ok) {
      let errorMessage = 'Failed to analyze explanation.';
      if (responseData) {
        if (responseData.details && typeof responseData.details === 'object') {
          const firstField = Object.keys(responseData.details)[0];
          const fieldErrors = responseData.details[firstField];
          errorMessage = Array.isArray(fieldErrors) ? fieldErrors[0] : String(fieldErrors);
        } else if (responseData.message) {
          errorMessage = responseData.message;
        } else if (responseData.error) {
          errorMessage = responseData.error;
        }
      } else if (response.status === 503) {
        errorMessage = 'Backend AI service is not configured (missing API key).';
      } else if (response.status === 502) {
        errorMessage = 'The AI analysis service is temporarily unavailable or returned an invalid response.';
      } else if (response.status >= 500) {
        errorMessage = 'Backend server encountered an unexpected error processing your request.';
      }

      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = responseData;
      throw error;
    }

    return responseData;
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      const netError = new Error('Cannot connect to backend server. Please make sure Django is running at ' + baseUrl);
      netError.isNetworkError = true;
      throw netError;
    }
    throw err;
  }
}

/**
 * Send initial explanation, probe question, and probe answer to Django for final synthesis.
 * @param {Object} payload
 * @param {string} payload.topic
 * @param {string} payload.initial_explanation
 * @param {number} payload.confidence
 * @param {string} payload.probe_question
 * @param {string} payload.probe_answer
 * @returns {Promise<Object>}
 */
export async function synthesizeFinalDiagnostic({
  topic,
  initial_explanation,
  confidence,
  probe_question,
  probe_answer,
}) {
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/diagnose/final/`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        topic,
        initial_explanation,
        confidence: Number(confidence),
        probe_question,
        probe_answer,
      }),
    });

    const responseData = await response.json().catch(() => null);

    if (!response.ok) {
      let errorMessage = 'Failed to synthesize final diagnostic.';
      if (responseData) {
        if (responseData.details && typeof responseData.details === 'object') {
          const firstField = Object.keys(responseData.details)[0];
          const fieldErrors = responseData.details[firstField];
          errorMessage = Array.isArray(fieldErrors) ? fieldErrors[0] : String(fieldErrors);
        } else if (responseData.message) {
          errorMessage = responseData.message;
        } else if (responseData.error) {
          errorMessage = responseData.error;
        }
      } else if (response.status === 503) {
        errorMessage = 'Backend AI service is not configured (missing API key).';
      } else if (response.status === 502) {
        errorMessage = 'The AI service is temporarily unavailable or returned an invalid final synthesis.';
      } else if (response.status >= 500) {
        errorMessage = 'Backend server encountered an unexpected error processing final synthesis.';
      }

      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = responseData;
      throw error;
    }

    return responseData;
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      const netError = new Error('Cannot connect to backend server. Please make sure Django is running at ' + baseUrl);
      netError.isNetworkError = true;
      throw netError;
    }
    throw err;
  }
}

/**
 * Fetch list of previous diagnostic records with optional search and sort.
 * @param {string} [search]
 * @param {string} [sort]
 * @returns {Promise<Array>}
 */
export async function fetchDiagnosticHistory(search = '', sort = 'newest') {
  const baseUrl = getApiBaseUrl();
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (sort) params.set('sort', sort);

  const endpoint = `${baseUrl}/history/?${params.toString()}`;

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to load diagnostic history (${response.status})`);
    }

    return await response.json();
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      const netError = new Error('Cannot connect to backend server. Please make sure Django is running at ' + baseUrl);
      netError.isNetworkError = true;
      throw netError;
    }
    throw err;
  }
}

/**
 * Fetch a full diagnostic record by ID.
 * @param {string} id
 * @returns {Promise<Object>}
 */
export async function fetchDiagnosticDetail(id) {
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/history/${id}/`;

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to load diagnostic report (${response.status})`);
    }

    return await response.json();
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      const netError = new Error('Cannot connect to backend server. Please make sure Django is running at ' + baseUrl);
      netError.isNetworkError = true;
      throw netError;
    }
    throw err;
  }
}

/**
 * Delete a diagnostic record by ID.
 * @param {string} id
 * @returns {Promise<Object>}
 */
export async function deleteDiagnosticRecord(id) {
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/history/${id}/`;

  try {
    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete diagnostic record (${response.status})`);
    }

    return await response.json();
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      const netError = new Error('Cannot connect to backend server. Please make sure Django is running at ' + baseUrl);
      netError.isNetworkError = true;
      throw netError;
    }
    throw err;
  }
}

/**
 * Manually save a completed diagnostic (e.g. skipped probe).
 * @param {Object} payload
 * @returns {Promise<Object>}
 */
export async function saveDiagnosticRecord(payload) {
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/history/`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to archive diagnostic (${response.status})`);
    }

    return await response.json();
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      const netError = new Error('Cannot connect to backend server. Please make sure Django is running at ' + baseUrl);
      netError.isNetworkError = true;
      throw netError;
    }
    throw err;
  }
}
