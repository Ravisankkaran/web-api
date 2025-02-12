// src/components/AutoTranslate.vue
<template>
  <div class="auto-translate">
    <div class="language-controls">
      <div class="language-selector">
        <label for="sourceLanguage">From:</label>
        <select id="sourceLanguage" v-model="sourceLanguage">
          <option
            v-for="(lang, code) in languages"
            :key="`source-${code}`"
            :value="code"
          >
            {{ lang.name }} ({{ lang.nativeName }})
          </option>
        </select>
      </div>

      <div class="language-selector">
        <label for="targetLanguage">To:</label>
        <select
          id="targetLanguage"
          v-model="targetLanguage"
          @change="translateContent"
        >
          <option
            v-for="(lang, code) in languages"
            :key="`target-${code}`"
            :value="code"
          >
            {{ lang.name }} ({{ lang.nativeName }})
          </option>
        </select>
      </div>

      <div v-if="isTranslating" class="translation-status">
        Translating... ({{ progress.completed }}/{{ progress.total }})
      </div>
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </div>

    <div ref="content" class="translatable-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { languages } from "../services/languageService";
import { translateText } from "../services/translationService";

export default {
  name: "AutoTranslate",
  data() {
    return {
      languages,
      sourceLanguage: "en",
      targetLanguage: "en",
      originalContent: null,
      isTranslating: false,
      error: null,
      translationCache: new Map(),
      progress: {
        total: 0,
        completed: 0,
      },
    };
  },
  mounted() {
    this.originalContent = this.$refs.content.innerHTML;
    // Try to detect user's language
    const userLang = navigator.language || navigator.userLanguage;
    const langCode = userLang.split("-")[0];
    if (this.languages[langCode]) {
      this.targetLanguage = langCode;
    }
  },
  methods: {
    async translateContent() {
      this.error = null;
      this.progress.completed = 0;

      if (this.targetLanguage === this.sourceLanguage) {
        this.$refs.content.innerHTML = this.originalContent;
        return;
      }

      this.isTranslating = true;

      try {
        const textNodes = [];
        const walker = document.createTreeWalker(
          this.$refs.content,
          NodeFilter.SHOW_TEXT,
          null,
          false
        );

        let node;
        while ((node = walker.nextNode())) {
          const text = node.textContent.trim();
          if (text) {
            textNodes.push({ node, text });
          }
        }

        this.progress.total = textNodes.length;

        // Process translations in batches
        const batchSize = 5;
        for (let i = 0; i < textNodes.length; i += batchSize) {
          const batch = textNodes.slice(i, i + batchSize);
          await Promise.all(
            batch.map(async ({ node, text }) => {
              const cacheKey = `${text}_${this.sourceLanguage}_${this.targetLanguage}`;

              if (this.translationCache.has(cacheKey)) {
                node.textContent = this.translationCache.get(cacheKey);
              } else {
                try {
                  await new Promise((resolve) => setTimeout(resolve, 500));
                  const translatedText = await translateText(
                    text,
                    this.targetLanguage,
                    this.sourceLanguage
                  );
                  this.translationCache.set(cacheKey, translatedText);
                  node.textContent = translatedText;
                } catch (err) {
                  console.error("Translation failed for:", text);
                  node.textContent = text;
                }
              }
              this.progress.completed++;
            })
          );
        }
      } catch (err) {
        this.error =
          "Translation service is temporarily unavailable. Please try again later.";
        console.error("Translation error:", err);
      } finally {
        this.isTranslating = false;
      }
    },
  },
};
</script>

<style scoped>
.auto-translate {
  padding: 20px;
}

.language-controls {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
}

.language-selector {
  display: flex;
  align-items: center;
  gap: 10px;
}

label {
  font-weight: 500;
}

select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  min-width: 200px;
}

.translation-status {
  color: #666;
  font-style: italic;
}

.error-message {
  color: #dc3545;
  font-size: 0.9em;
}

.translatable-content {
  margin-top: 20px;
}
</style>
