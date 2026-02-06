<template>
  <div class="mb-8">
    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      推荐网站
    </h2>
    <div v-if="recommended.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <BookmarkCard
        v-for="bookmark in recommended"
        :key="bookmark.id"
        :bookmark="bookmark"
        @toggle-favorite="$emit('toggle-favorite', bookmark.id)"
        @visit="$emit('visit', bookmark)"
      />
    </div>
    <div v-else class="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
      <p class="text-gray-500 dark:text-gray-400">暂无推荐网站</p>
    </div>
  </div>
</template>

<script setup>
import BookmarkCard from './BookmarkCard.vue';

defineProps({
  recommended: {
    type: Array,
    required: true
  }
});

defineEmits(['toggle-favorite', 'visit']);
</script>
