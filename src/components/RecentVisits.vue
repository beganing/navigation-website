<template>
  <div class="mb-8">
    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      最近访问
    </h2>
    <div v-if="recent.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <BookmarkCard
        v-for="bookmark in recent"
        :key="bookmark.id"
        :bookmark="bookmark"
        @toggle-favorite="$emit('toggle-favorite', bookmark.id)"
        @visit="$emit('visit', bookmark)"
      />
    </div>
    <div v-else class="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
      <p class="text-gray-500 dark:text-gray-400">暂无最近访问记录</p>
      <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">访问网站后会显示在这里</p>
    </div>
  </div>
</template>

<script setup>
import BookmarkCard from './BookmarkCard.vue';

defineProps({
  recent: {
    type: Array,
    required: true
  }
});

defineEmits(['toggle-favorite', 'visit']);
</script>
