<template>
  <div class="mb-8">
    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      我的收藏
    </h2>
    <div v-if="favorites.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <BookmarkCard
        v-for="bookmark in favorites"
        :key="bookmark.id"
        :bookmark="bookmark"
        @toggle-favorite="$emit('toggle-favorite', bookmark.id)"
        @visit="$emit('visit', bookmark)"
      />
    </div>
    <div v-else class="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
      <p class="text-gray-500 dark:text-gray-400">暂无收藏网站</p>
      <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">点击网站卡片上的星星图标添加收藏</p>
    </div>
  </div>
</template>

<script setup>
import BookmarkCard from './BookmarkCard.vue';

defineProps({
  favorites: {
    type: Array,
    required: true
  }
});

defineEmits(['toggle-favorite', 'visit']);
</script>
