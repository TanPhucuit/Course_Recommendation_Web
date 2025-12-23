/**
 * AI Recommendation Service
 * Calls AI API to get course recommendations for users
 */

const AI_API_BASE_URL = 'http://localhost:8000';

class AIRecommendationService {
  /**
   * Get course recommendations for a user
   * @param {string} userId - User ID (e.g., "U_100066")
   * @returns {Promise<string[]>} Array of recommended course IDs
   */
  async getRecommendations(userId) {
    try {
      const url = `${AI_API_BASE_URL}/ai/recommend/${userId}`;
      console.log(`[AI] ========================================`);
      console.log(`[AI] Calling recommendation API for user: ${userId}`);
      console.log(`[AI] URL: ${url}`);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(`[AI] Response status: ${response.status}`);

      if (!response.ok) {
        console.error(`[AI] API error: ${response.status} ${response.statusText}`);
        return [];
      }

      const data = await response.json();
      console.log('[AI] Response data:', data);
      console.log('[AI] Response data type:', typeof data, Array.isArray(data));
      
      // API should return array of course IDs
      let courseIds = [];
      if (Array.isArray(data)) {
        courseIds = data;
      } else if (data.recommendations && Array.isArray(data.recommendations)) {
        courseIds = data.recommendations;
      } else if (data.courses && Array.isArray(data.courses)) {
        courseIds = data.courses;
      }
      
      console.log(`[AI] Extracted ${courseIds.length} course IDs for ${userId}:`, courseIds);
      console.log(`[AI] ========================================`);
      return courseIds;
    } catch (error) {
      console.error('[AI] Failed to fetch AI recommendations:', error);
      return [];
    }
  }
}

export default new AIRecommendationService();
