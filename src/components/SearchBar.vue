<template>
  <div class="relative">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <input
      type="text"
      v-model="localQuery"
      @input="handleSearch"
      placeholder="搜索网站、标签或描述..."
      class="block w-full pl-10 pr-4 py-3 bg-white dark:bg-dark-100 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
      :class="{ 'dark': isDarkMode }"
    />
    <button
      v-if="localQuery"
      @click="clearSearch"
      class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  isDarkMode: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const localQuery = ref(props.modelValue);

// 监听外部值变化
watch(() => props.modelValue, (newValue) => {
  localQuery.value = newValue;
});

const handleSearch = () => {
  emit('update:modelValue', localQuery.value);
};

const clearSearch = () => {
  localQuery.value = '';
  emit('update:modelValue', '');
};
</script>
