<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-300 text-gray-900 dark:text-white transition-colors duration-300">
    <!-- 头部 -->
    <header class="bg-white dark:bg-dark-200 shadow-sm sticky top-0 z-10">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- 标题 -->
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary mr-2" fill="none" viewBox="0 0 24 24">
              <rect width="24" height="24" rx="6" fill="currentColor"/>
              <path d="M6 12L9 9L12 12L15 9L18 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 9V6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M15 9V6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 16L12 19L15 16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 19V22" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h1 class="text-xl font-bold">你の小站</h1>
          </div>
          <!-- 主题切换 -->
          <ThemeToggle :is-dark-mode="isDarkMode" @toggle="toggleTheme" />
        </div>
        <!-- 搜索栏 -->
        <div class="mt-4">
          <SearchBar v-model="searchQuery" :is-dark-mode="isDarkMode" />
        </div>
      </div>
    </header>

    <!-- 主要内容 -->
    <main class="container mx-auto px-4 py-6">
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- 侧边栏筛选器 -->
        <aside class="lg:w-64 shrink-0">
          <div class="bg-white dark:bg-dark-200 rounded-lg shadow-sm p-4 sticky top-32">
            <CategoryList 
              :categories="categories" 
              :selected-category="selectedCategory" 
              @select="selectedCategory = $event" 
            />
          </div>
        </aside>

        <!-- 内容区域 -->
        <div class="flex-1">
          <!-- 标签筛选器 -->
          <div class="bg-white dark:bg-dark-200 rounded-lg shadow-sm p-4 mb-6">
            <TagFilter 
              :tags="allTags" 
              :selected-tag="selectedTag" 
              @select="selectedTag = $event" 
            />
          </div>

          <!-- 搜索结果/分类结果 -->
          <div class="mb-8">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {{ getResultTitle() }}
            </h2>
            <div v-if="filteredBookmarks.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <BookmarkCard
                v-for="bookmark in filteredBookmarks"
                :key="bookmark.id"
                :bookmark="bookmark"
                @toggle-favorite="toggleFavorite"
                @visit="visitBookmark"
              />
            </div>
            <div v-else-if="hasActiveFilters()" class="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
              <p class="text-gray-500 dark:text-gray-400">没有找到匹配的网站</p>
              <button 
                @click="clearFilters()"
                class="mt-2 px-4 py-1.5 bg-primary text-white rounded-md text-sm"
              >
                清除筛选
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 底部 -->
    <footer class="bg-white dark:bg-dark-200 shadow-inner py-6">
      <div class="container mx-auto px-4 text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          © {{ new Date().getFullYear() }} 你の小站 - 网站导航
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useNavigation } from './composables/useNavigation.js';
import SearchBar from './components/SearchBar.vue';
import CategoryList from './components/CategoryList.vue';
import TagFilter from './components/TagFilter.vue';
import BookmarkCard from './components/BookmarkCard.vue';
import ThemeToggle from './components/ThemeToggle.vue';

// 解构导航相关状态和方法
const {
  bookmarks,
  categories,
  searchQuery,
  selectedCategory,
  selectedTag,
  favorites,
  recentVisits,
  isDarkMode,
  filteredBookmarks,
  allTags,
  toggleFavorite,
  toggleTheme,
  visitBookmark
} = useNavigation();

// 获取结果标题
const getResultTitle = () => {
  if (searchQuery.value) {
    return `搜索结果: ${searchQuery.value}`;
  }
  if (selectedCategory.value === 'recommended') {
    return '推荐网站';
  }
  if (selectedCategory.value === 'favorites') {
    return '我的收藏';
  }
  if (selectedCategory.value) {
    const category = categories.value.find(c => c.id === selectedCategory.value);
    return category ? `${category.name}` : '分类结果';
  }
  if (selectedTag.value) {
    return `标签: ${selectedTag.value}`;
  }
  return '所有网站';
};

// 检查是否有激活的筛选器
const hasActiveFilters = () => {
  return searchQuery.value || selectedCategory.value || selectedTag.value;
};

// 清除所有筛选器
const clearFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = '';
  selectedTag.value = '';
};
</script>

<style>
/* 全局样式 */
html {
  scroll-behavior: smooth;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* 深色模式滚动条 */
.dark ::-webkit-scrollbar-track {
  background: #1f2937;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>
