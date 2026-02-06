<template>
  <div>
    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">标签</h2>
    <div class="flex flex-wrap gap-2">
      <!-- 全部标签选项 -->
      <button
        @click="$emit('select', '')"
        class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
        :class="{
          'bg-primary text-white': selectedTag === '',
          'bg-light-200 dark:bg-dark-200 text-gray-700 dark:text-gray-300 hover:bg-light-300 dark:hover:bg-dark-100': selectedTag !== ''
        }"
      >
        全部标签
      </button>
      <!-- 标签选项 -->
      <button
        v-for="tag in tags"
        :key="tag"
        @click="$emit('select', tag)"
        class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
        :class="{
          'bg-primary text-white': selectedTag === tag,
          'bg-light-200 dark:bg-dark-200 text-gray-700 dark:text-gray-300 hover:bg-light-300 dark:hover:bg-dark-100': selectedTag !== tag
        }"
      >
        {{ tag }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tags: {
    type: Array,
    required: true
  },
  selectedTag: {
    type: String,
    default: ''
  }
});

defineEmits(['select']);
</script>
