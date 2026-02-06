import { ref, computed, onMounted } from 'vue';
import navigationData from '../data/navigation.json';

export function useNavigation() {
  // 状态
  const bookmarks = ref([]);
  const categories = ref([]);
  const searchQuery = ref('');
  const selectedCategory = ref('');
  const selectedTag = ref('');
  const favorites = ref([]);
  const recentVisits = ref([]);
  const isDarkMode = ref(false);

  // 计算属性
  const filteredBookmarks = computed(() => {
    let result = [...bookmarks.value];

    // 按特殊分类筛选
    if (selectedCategory.value === 'recommended') {
      result = result.filter(bookmark => bookmark.isRecommended);
    } else if (selectedCategory.value === 'favorites') {
      result = result.filter(bookmark => bookmark.isFavorite);
    } else if (selectedCategory.value) {
      // 按普通分类筛选
      result = result.filter(bookmark => bookmark.categoryId === selectedCategory.value);
    }

    // 按标签筛选
    if (selectedTag.value) {
      result = result.filter(bookmark => bookmark.tags.includes(selectedTag.value));
    }

    // 按搜索关键词筛选
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(bookmark => 
        bookmark.title.toLowerCase().includes(query) ||
        bookmark.description.toLowerCase().includes(query) ||
        bookmark.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // 按排序字段排序
    result.sort((a, b) => a.sort - b.sort);

    return result;
  });

  const recommendedBookmarks = computed(() => {
    return bookmarks.value
      .filter(bookmark => bookmark.isRecommended)
      .sort((a, b) => a.sort - b.sort);
  });

  const allTags = computed(() => {
    const tagsSet = new Set();
    bookmarks.value.forEach(bookmark => {
      bookmark.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  });

  // 方法
  const loadData = () => {
    // 从JSON文件加载数据
    bookmarks.value = navigationData.bookmarks;
    categories.value = navigationData.categories;

    // 从localStorage加载收藏和最近访问
    loadFromLocalStorage();
  };

  const loadFromLocalStorage = () => {
    try {
      const savedFavorites = localStorage.getItem('navigation_favorites');
      if (savedFavorites) {
        favorites.value = JSON.parse(savedFavorites);
        // 更新bookmarks的isFavorite状态
        bookmarks.value.forEach(bookmark => {
          bookmark.isFavorite = favorites.value.includes(bookmark.id);
        });
      }

      const savedRecent = localStorage.getItem('navigation_recent');
      if (savedRecent) {
        recentVisits.value = JSON.parse(savedRecent);
      }

      const savedTheme = localStorage.getItem('navigation_theme');
      if (savedTheme) {
        isDarkMode.value = savedTheme === 'dark';
        updateTheme();
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
    }
  };

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem('navigation_favorites', JSON.stringify(favorites.value));
      localStorage.setItem('navigation_recent', JSON.stringify(recentVisits.value));
      localStorage.setItem('navigation_theme', isDarkMode.value ? 'dark' : 'light');
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  };

  const toggleFavorite = (bookmarkId) => {
    const index = favorites.value.indexOf(bookmarkId);
    if (index > -1) {
      favorites.value.splice(index, 1);
    } else {
      favorites.value.push(bookmarkId);
    }

    // 更新bookmarks的isFavorite状态
    const bookmark = bookmarks.value.find(b => b.id === bookmarkId);
    if (bookmark) {
      bookmark.isFavorite = !bookmark.isFavorite;
    }

    saveToLocalStorage();
  };

  const addToRecent = (bookmark) => {
    // 移除已存在的相同书签
    recentVisits.value = recentVisits.value.filter(item => item.id !== bookmark.id);
    
    // 添加到开头
    recentVisits.value.unshift({
      ...bookmark,
      lastVisited: new Date().toISOString()
    });

    // 限制最近访问数量
    if (recentVisits.value.length > 10) {
      recentVisits.value = recentVisits.value.slice(0, 10);
    }

    saveToLocalStorage();
  };

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
    updateTheme();
    saveToLocalStorage();
  };

  const updateTheme = () => {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const visitBookmark = (bookmark) => {
    addToRecent(bookmark);
    window.open(bookmark.url, '_blank');
  };

  // 生命周期
  onMounted(() => {
    loadData();
  });

  return {
    // 状态
    bookmarks,
    categories,
    searchQuery,
    selectedCategory,
    selectedTag,
    favorites,
    recentVisits,
    isDarkMode,

    // 计算属性
    filteredBookmarks,
    recommendedBookmarks,
    allTags,

    // 方法
    toggleFavorite,
    addToRecent,
    toggleTheme,
    visitBookmark,
    loadData
  };
}
