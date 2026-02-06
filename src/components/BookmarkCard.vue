<template>
  <div 
    class="bg-white dark:bg-dark-100 rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
  >
    <div class="flex items-start gap-3">
      <!-- 网站图标 -->
      <div class="flex-shrink-0">
        <img 
          v-if="bookmark.favicon" 
          :src="bookmark.favicon" 
          :alt="bookmark.title" 
          class="w-8 h-8 rounded-md object-cover"
        />
        <div v-else class="w-8 h-8 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <span class="text-gray-400 dark:text-gray-500">{{ bookmark.title.charAt(0) }}</span>
        </div>
      </div>

      <!-- 网站信息 -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between">
          <h3 class="font-medium text-gray-900 dark:text-white truncate">{{ bookmark.title }}</h3>
          <button 
            @click="$emit('toggle-favorite', bookmark.id)"
            class="text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
            :class="{ 'text-yellow-500 dark:text-yellow-400': bookmark.isFavorite }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{{ bookmark.description }}</p>
        <div class="flex flex-wrap gap-1 mt-2">
          <span 
            v-for="tag in bookmark.tags" 
            :key="tag"
            class="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
    <!-- 访问按钮 -->
    <button 
      @click="$emit('visit', bookmark)"
      class="mt-3 w-full py-2 px-4 bg-primary hover:bg-primary/90 text-white rounded-md text-sm font-medium transition-colors"
    >
      访问网站
    </button>
  </div>
</template>

<script setup>
defineProps({
  bookmark: {
    type: Object,
    required: true
  }
});

defineEmits(['toggle-favorite', 'visit']);
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
