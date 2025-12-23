/**
 * Google Translate Service
 * Automatically translate course content to Vietnamese
 */

const GOOGLE_TRANSLATE_API_KEY = 'AIzaSyDWs3Pkt1tkzP8Wqt1ZDK7FBgjwvov0QN4';
const TRANSLATE_API_URL = 'https://translation.googleapis.com/language/translate/v2';

class TranslationService {
  constructor() {
    this.cache = new Map(); // Cache translations to avoid repeated API calls
  }

  /**
   * Translate text to Vietnamese
   * @param {string} text - Text to translate
   * @param {string} sourceLang - Source language (default: 'zh-CN' for Chinese)
   * @returns {Promise<string>} Translated text
   */
  async translate(text, sourceLang = 'zh-CN') {
    if (!text || text.trim() === '') return text;

    // Check cache first
    const cacheKey = `${sourceLang}:${text}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(`${TRANSLATE_API_URL}?key=${GOOGLE_TRANSLATE_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          q: text,
          target: 'vi',
          source: sourceLang
        })
      });

      if (!response.ok) {
        console.error('[Translation] API error:', response.status);
        return text; // Return original text on error
      }

      const data = await response.json();
      const translated = data.data.translations[0].translatedText;
      
      // Cache the translation
      this.cache.set(cacheKey, translated);
      
      return translated;
    } catch (error) {
      console.error('[Translation] Failed to translate:', error);
      return text; // Return original text on error
    }
  }

  /**
   * Translate multiple texts in batch
   * @param {string[]} texts - Array of texts to translate
   * @param {string} sourceLang - Source language
   * @returns {Promise<string[]>} Array of translated texts
   */
  async translateBatch(texts, sourceLang = 'zh-CN') {
    if (!texts || texts.length === 0) return texts;

    try {
      const response = await fetch(`${TRANSLATE_API_URL}?key=${GOOGLE_TRANSLATE_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          q: texts,
          target: 'vi',
          source: sourceLang
        })
      });

      if (!response.ok) {
        console.error('[Translation] Batch API error:', response.status);
        return texts;
      }

      const data = await response.json();
      const translations = data.data.translations.map(t => t.translatedText);
      
      // Cache all translations
      texts.forEach((text, index) => {
        const cacheKey = `${sourceLang}:${text}`;
        this.cache.set(cacheKey, translations[index]);
      });
      
      return translations;
    } catch (error) {
      console.error('[Translation] Failed to translate batch:', error);
      return texts;
    }
  }

  /**
   * Clear translation cache
   */
  clearCache() {
    this.cache.clear();
  }
}

export default new TranslationService();
