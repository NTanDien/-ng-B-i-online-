// ==========================================================================
// CỔNG THÔNG TIN DÂN SINH & DIỄN ĐÀN ĐĂNG BÀI CỘNG ĐỒNG
// JAVASCRIPT XỬ LÝ LOGIC, ĐĂNG BÀI, LỌC TIN & TƯƠNG TÁC DÂN SINH
// ==========================================================================

// Xóa sạch toàn bộ cache hoặc biến cũ của dự án xe hơi trước đây
try {
  const oldKeys = ["apex_wishlist", "apex_compare", "apex_currency", "apex_real_video_idx", "apex_hero_video_visible", "apex_theme", "apex_custom_theme"];
  oldKeys.forEach(k => localStorage.removeItem(k));
} catch (e) {
  // Bỏ qua nếu không có
}

const appState = {
  posts: [],
  activeCategory: "all",
  searchQuery: "",
  sortBy: "newest",
  filterOnlyMyPosts: false,
  selectedSampleImage: "",
  currentTheme: localStorage.getItem("dansinh_theme") || "theme-red",
  fontSize: localStorage.getItem("dansinh_fontsize") || "font-normal",
  readerFontSize: 1.05,
  activeReaderPostId: null,
  currentUser: null,
  pendingPostCategory: null
};

// Khởi tạo danh sách người dùng mẫu nếu chưa có
function initUsersDatabase() {
  const savedUsers = localStorage.getItem("dansinh_users");
  if (!savedUsers) {
    const demoUsers = [
      {
        id: "user-1",
        name: "Bác Nguyễn Văn An",
        phone: "0912345678",
        role: "Người dân",
        location: "Phường Dịch Vọng, Cầu Giấy, Hà Nội",
        password: "123"
      },
      {
        id: "user-2",
        name: "Đ/c Trần Thị Mai",
        phone: "0987654321",
        role: "Cán bộ cơ sở",
        location: "Xã Đồng Tâm, Mỹ Đức, Hà Nội",
        password: "123"
      }
    ];
    localStorage.setItem("dansinh_users", JSON.stringify(demoUsers));
  }

  // Load current user from session
  const savedCurrent = localStorage.getItem("dansinh_current_user");
  if (savedCurrent) {
    try {
      appState.currentUser = JSON.parse(savedCurrent);
    } catch (e) {
      appState.currentUser = null;
    }
  }
}


// ==========================================================================
// 1. KHỞI TẠO HỆ THỐNG
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initDateTime();
  initUsersDatabase();
  loadSavedPosts();
  initThemeAndAccessibility();
  renderCategoriesNav();
  renderCategoryDropdown();
  renderSampleImagesPicker();
  setupEventListeners();
  renderMainFeed();
  renderResolutionBoard();
  updateStatsCounter();
  renderAuthUI();
});

// Đồng hồ & Lịch hiển thị trực tiếp
function initDateTime() {
  const dateEl = document.getElementById("currentDateText");
  if (!dateEl) return;

  function updateClock() {
    const now = new Date();
    const days = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
    const dayName = days[now.getDay()];
    const dateStr = now.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
    const timeStr = now.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    dateEl.textContent = `${dayName}, ngày ${dateStr} - ${timeStr}`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

// Tải bài viết từ LocalStorage hoặc dữ liệu mẫu ban đầu
function loadSavedPosts() {
  const saved = localStorage.getItem("dansinh_posts");
  if (saved) {
    try {
      appState.posts = JSON.parse(saved);
    } catch (e) {
      console.error("Lỗi đọc dữ liệu bài viết:", e);
      appState.posts = [...INITIAL_POSTS];
    }
  } else {
    appState.posts = [...INITIAL_POSTS];
    localStorage.setItem("dansinh_posts", JSON.stringify(appState.posts));
  }
}

function savePostsToStorage() {
  localStorage.setItem("dansinh_posts", JSON.stringify(appState.posts));
  updateStatsCounter();
}

// Khởi tạo giao diện màu & Cỡ chữ trợ năng
function initThemeAndAccessibility() {
  // Theme
  document.body.className = `${appState.fontSize} ${appState.currentTheme}`;
  document.querySelectorAll(".theme-choice-card").forEach(c => {
    c.classList.toggle("active", c.getAttribute("data-theme") === appState.currentTheme);
  });

  // Font Size
  updateFontSizeButtonsUI();
}

function setFontSize(sizeClass) {
  appState.fontSize = sizeClass;
  document.body.className = `${appState.fontSize} ${appState.currentTheme}`;
  localStorage.setItem("dansinh_fontsize", sizeClass);
  updateFontSizeButtonsUI();
}

function updateFontSizeButtonsUI() {
  const btnSmall = document.getElementById("btnFsSmall");
  const btnNormal = document.getElementById("btnFsNormal");
  const btnLarge = document.getElementById("btnFsLarge");

  if (btnSmall) btnSmall.classList.toggle("active", appState.fontSize === "font-small");
  if (btnNormal) btnNormal.classList.toggle("active", appState.fontSize === "font-normal");
  if (btnLarge) btnLarge.classList.toggle("active", appState.fontSize === "font-large");
}

function selectTheme(themeName) {
  appState.currentTheme = themeName;
  document.body.className = `${appState.fontSize} ${appState.currentTheme}`;
  localStorage.setItem("dansinh_theme", themeName);

  document.querySelectorAll(".theme-choice-card").forEach(c => {
    c.classList.toggle("active", c.getAttribute("data-theme") === themeName);
  });

  showToast(`Đã áp dụng giao diện: ${getThemeDisplayName(themeName)}`, "info");
}

function getThemeDisplayName(theme) {
  switch (theme) {
    case "theme-red": return "Đỏ Cờ & Vàng Hoa Sen";
    case "theme-blue": return "Xanh Dương Hành Chính Công";
    case "theme-green": return "Xanh Lá Nông Thôn Mới";
    case "theme-contrast": return "Tương Phản Cao Dành Cho Người Lớn Tuổi";
    default: return "Mặc định";
  }
}

// ==========================================================================
// 2. RENDER CHUYÊN MỤC & THANH ĐIỀU HƯỚNG
// ==========================================================================
function renderCategoriesNav() {
  const navList = document.getElementById("categoriesNavList");
  if (!navList) return;

  navList.innerHTML = POST_CATEGORIES.map(cat => `
    <li class="nav-item">
      <a 
        href="javascript:void(0)" 
        class="nav-link ${appState.activeCategory === cat.id && !appState.filterOnlyMyPosts ? 'active' : ''}" 
        onclick="filterByCategory('${cat.id}')"
      >
        <i class="${cat.icon}"></i>
        <span>${cat.name}</span>
      </a>
    </li>
  `).join("");
}

function renderCategoryDropdown() {
  const select = document.getElementById("categoryQuickSelect");
  if (!select) return;

  select.innerHTML = POST_CATEGORIES.map(cat => `
    <option value="${cat.id}" ${appState.activeCategory === cat.id ? 'selected' : ''}>
      ${cat.name}
    </option>
  `).join("");
}

function renderSampleImagesPicker() {
  const picker = document.getElementById("sampleImagesPicker");
  if (!picker) return;

  appState.selectedSampleImage = SAMPLE_POST_IMAGES[0].url;

  picker.innerHTML = SAMPLE_POST_IMAGES.map((img, idx) => `
    <div 
      class="sample-img-card ${idx === 0 ? 'active' : ''}" 
      onclick="selectSampleImage('${img.url}', this)"
      title="${img.name}"
    >
      <img src="${img.url}" alt="${img.name}" />
      <span>${img.name}</span>
    </div>
  `).join("");
}

function selectSampleImage(url, element) {
  appState.selectedSampleImage = url;
  document.querySelectorAll(".sample-img-card").forEach(c => c.classList.remove("active"));
  if (element) element.classList.add("active");
  const customInput = document.getElementById("postCustomImage");
  if (customInput) customInput.value = "";
}

// ==========================================================================
// 3. THIẾT LẬP SỰ KIỆN TƯƠNG TÁC
// ==========================================================================
function setupEventListeners() {
  // Tìm kiếm tức thì
  const searchInput = document.getElementById("globalSearchInput");
  const clearBtn = document.getElementById("searchClearBtn");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      appState.searchQuery = e.target.value.trim().toLowerCase();
      if (clearBtn) clearBtn.style.display = appState.searchQuery ? "block" : "none";
      renderMainFeed();
    });
  }

  if (clearBtn && searchInput) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      appState.searchQuery = "";
      clearBtn.style.display = "none";
      renderMainFeed();
    });
  }

  // Sắp xếp
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      appState.sortBy = e.target.value;
      renderMainFeed();
    });
  }

  // Dropdown lọc chủ đề
  const categoryQuickSelect = document.getElementById("categoryQuickSelect");
  if (categoryQuickSelect) {
    categoryQuickSelect.addEventListener("change", (e) => {
      filterByCategory(e.target.value);
    });
  }

  // Nút cỡ chữ
  document.getElementById("btnFsSmall")?.addEventListener("click", () => setFontSize("font-small"));
  document.getElementById("btnFsNormal")?.addEventListener("click", () => setFontSize("font-normal"));
  document.getElementById("btnFsLarge")?.addEventListener("click", () => setFontSize("font-large"));

  // Nút mở modal giao diện
  document.getElementById("openThemeModalBtn")?.addEventListener("click", openThemeModal);

  // Nút mở modal đăng bài
  document.getElementById("btnOpenCreatePost")?.addEventListener("click", () => openCreatePostModal());

  // Nút lọc bài của tôi
  document.getElementById("btnFilterMyPosts")?.addEventListener("click", toggleFilterMyPosts);

  // Menu mobile
  document.getElementById("mobileMenuBtn")?.addEventListener("click", () => {
    const navBar = document.getElementById("mainNavBar");
    if (navBar) {
      navBar.style.display = navBar.style.display === "block" ? "" : "block";
    }
  });
}

// ==========================================================================
// 4. LỌC VÀ HIỂN THỊ BẢNG TIN BÀI VIẾT
// ==========================================================================
function filterByCategory(catId) {
  appState.activeCategory = catId;
  appState.filterOnlyMyPosts = false;
  renderCategoriesNav();

  const quickSelect = document.getElementById("categoryQuickSelect");
  if (quickSelect) quickSelect.value = catId;

  const btnMyPosts = document.getElementById("btnFilterMyPosts");
  if (btnMyPosts) btnMyPosts.classList.remove("active");

  renderMainFeed();

  // Cuộn nhẹ xuống danh sách tin
  const newsSection = document.getElementById("newsSection");
  if (newsSection && window.scrollY > 400) {
    newsSection.scrollIntoView({ behavior: "smooth" });
  }
}

function toggleFilterMyPosts() {
  appState.filterOnlyMyPosts = !appState.filterOnlyMyPosts;
  const btnMyPosts = document.getElementById("btnFilterMyPosts");
  if (btnMyPosts) btnMyPosts.classList.toggle("active", appState.filterOnlyMyPosts);

  renderCategoriesNav();
  renderMainFeed();
}

function getFilteredPosts() {
  return appState.posts.filter(post => {
    // Lọc theo bài của tôi
    if (appState.filterOnlyMyPosts && !post.isUserPost) {
      return false;
    }

    // Lọc theo chuyên mục
    if (appState.activeCategory !== "all" && post.category !== appState.activeCategory) {
      return false;
    }

    // Lọc theo từ khóa tìm kiếm
    if (appState.searchQuery) {
      const q = appState.searchQuery;
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchSummary = post.summary.toLowerCase().includes(q);
      const matchAuthor = post.author.toLowerCase().includes(q);
      const matchLocation = post.location ? post.location.toLowerCase().includes(q) : false;
      const matchCat = post.categoryName.toLowerCase().includes(q);
      if (!matchTitle && !matchSummary && !matchAuthor && !matchLocation && !matchCat) {
        return false;
      }
    }

    return true;
  });
}

function renderMainFeed() {
  let filtered = getFilteredPosts();

  // Sắp xếp
  if (appState.sortBy === "newest") {
    // Mặc định thứ tự ban đầu / bài mới nhất xếp đầu
  } else if (appState.sortBy === "popular") {
    filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
  } else if (appState.sortBy === "likes") {
    filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
  }

  // Render Headline bài nổi bật ở Hero
  renderFeaturedHeroPost();

  // Cập nhật tiêu đề và số lượng
  const countEl = document.getElementById("resultsCountText");
  if (countEl) countEl.textContent = `Hiển thị ${filtered.length} bài viết`;

  const sectionTitleEl = document.getElementById("currentSectionTitle");
  if (sectionTitleEl) {
    if (appState.filterOnlyMyPosts) {
      sectionTitleEl.innerHTML = `<i class="fa-solid fa-user-pen"></i> Các Bài Viết & Ý Kiến Của Bạn Đã Đăng`;
    } else if (appState.activeCategory !== "all") {
      const catObj = POST_CATEGORIES.find(c => c.id === appState.activeCategory);
      sectionTitleEl.innerHTML = `<i class="${catObj?.icon || 'fa-solid fa-newspaper'}"></i> Chuyên Mục: ${catObj?.name || 'Dân Sinh'}`;
    } else {
      sectionTitleEl.innerHTML = `<i class="fa-solid fa-newspaper"></i> Bảng Tin Bài Viết Dân Sinh Mới Nhất`;
    }
  }

  // Render Grid
  const grid = document.getElementById("articlesGrid");
  const emptyState = document.getElementById("emptyState");
  if (!grid) return;

  if (filtered.length === 0) {
    grid.innerHTML = "";
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  if (emptyState) emptyState.style.display = "none";

  grid.innerHTML = filtered.map(post => {
    const isFeedback = post.category === "phan-anh";
    const statusPill = isFeedback ? `
      <span class="status-pill ${post.statusCode === 'resolved' ? 'resolved' : 'processing'}">
        <i class="${post.statusCode === 'resolved' ? 'fa-solid fa-check' : 'fa-solid fa-clock'}"></i>
        ${post.status || 'Đang xử lý'}
      </span>
    ` : "";

    const userPostBadge = post.isUserPost ? `
      <span style="position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.75); color: var(--accent-gold); font-size: 0.72rem; padding: 3px 8px; border-radius: 4px; font-weight: 700;">
        <i class="fa-solid fa-user-check"></i> Bài của bạn
      </span>
    ` : "";

    return `
      <article class="article-card ${post.isUserPost ? 'my-post' : ''}" data-post-id="${post.id}">
        <div class="article-img-wrap" onclick="openArticleReaderModal('${post.id}')" style="cursor: pointer;">
          <img src="${post.image}" alt="${post.title}" class="article-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80';" />
          <span class="card-badge ${post.categoryBadgeClass || 'badge-policy'}">${post.categoryName}</span>
          ${statusPill}
          ${userPostBadge}
        </div>

        <div class="article-body">
          <div class="article-meta">
            <span><i class="fa-regular fa-calendar"></i> ${post.date}</span>
            <span><i class="fa-solid fa-location-dot"></i> ${post.location || 'Địa phương'}</span>
            <span><i class="fa-regular fa-eye"></i> ${post.views || 0} lượt đọc</span>
          </div>

          <h3 class="article-title" onclick="openArticleReaderModal('${post.id}')">
            ${post.title}
          </h3>

          <p class="article-excerpt">
            ${post.summary}
          </p>

          <div class="article-footer">
            <div class="article-author-info">
              <span class="author-name">${post.author}</span>
              <span class="author-role">${post.authorRole || 'Người dân'}</span>
            </div>

            <div class="article-actions-btn">
              <button class="btn-card-like" onclick="likePost('${post.id}', event)" title="Yêu thích bài viết">
                <i class="fa-solid fa-heart"></i>
                <span id="likes-count-${post.id}">${post.likes || 0}</span>
              </button>
              <button class="btn-card-read" onclick="openArticleReaderModal('${post.id}')">
                Đọc Bài
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function renderFeaturedHeroPost() {
  const container = document.getElementById("featuredPostCard");
  if (!container) return;

  const featured = appState.posts.find(p => p.isFeatured) || appState.posts[0];
  if (!featured) return;

  container.innerHTML = `
    <div class="featured-img-wrap" onclick="openArticleReaderModal('${featured.id}')" style="cursor: pointer;">
      <img src="${featured.image}" alt="${featured.title}" class="featured-img" onerror="this.src='https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80';" />
      <span class="featured-badge-float">
        <i class="fa-solid fa-star"></i> Tiêu Điểm Dân Sinh
      </span>
    </div>

    <div class="featured-body">
      <div class="featured-meta">
        <span><i class="fa-solid fa-folder-open"></i> ${featured.categoryName}</span>
        <span><i class="fa-regular fa-calendar-check"></i> ${featured.date} (${featured.timeAgo || 'Gần đây'})</span>
        <span><i class="fa-regular fa-eye"></i> ${featured.views || 0} lượt xem</span>
      </div>

      <h2 class="featured-title" onclick="openArticleReaderModal('${featured.id}')">
        ${featured.title}
      </h2>

      <p class="featured-excerpt">
        ${featured.summary}
      </p>

      <div class="featured-footer">
        <div class="article-author-info">
          <span class="author-name">${featured.author}</span>
          <span class="author-role">${featured.authorRole || 'Cán bộ'}</span>
        </div>

        <a href="javascript:void(0)" class="btn-read-more" onclick="openArticleReaderModal('${featured.id}')">
          <span>Xem chi tiết nội dung</span>
          <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </div>
  `;
}

function renderResolutionBoard() {
  const list = document.getElementById("resolutionList");
  if (!list) return;

  const feedbackPosts = appState.posts.filter(p => p.category === "phan-anh").slice(0, 4);

  if (feedbackPosts.length === 0) {
    list.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">Chưa có phản ánh nào cần giải quyết.</p>`;
    return;
  }

  list.innerHTML = feedbackPosts.map(post => `
    <div class="res-item ${post.statusCode === 'resolved' ? 'resolved' : 'processing'}" onclick="openArticleReaderModal('${post.id}')" style="cursor: pointer;">
      <div class="res-item-icon">
        <i class="${post.statusCode === 'resolved' ? 'fa-solid fa-circle-check' : 'fa-solid fa-clock-rotate-left'}"></i>
      </div>
      <div class="res-item-content">
        <div class="res-item-title">${post.title}</div>
        <div class="res-item-meta">
          <span>${post.location || 'Khu vực cơ sở'}</span> &bull; 
          <strong style="${post.statusCode === 'resolved' ? 'color: #16a34a;' : 'color: #b45309;'}">Trạng thái: ${post.status || 'Đang xử lý'}</strong> &bull; 
          <span>Đăng ngày ${post.date}</span>
        </div>
      </div>
    </div>
  `).join("");
}

function updateStatsCounter() {
  const totalPostsEl = document.getElementById("statTotalPosts");
  if (totalPostsEl) {
    totalPostsEl.textContent = (1240 + appState.posts.length).toLocaleString("vi-VN");
  }

  const myCountBadge = document.getElementById("myPostsCountBadge");
  if (myCountBadge) {
    const userPostsCount = appState.posts.filter(p => p.isUserPost).length;
    myCountBadge.textContent = userPostsCount;
    myCountBadge.style.display = userPostsCount > 0 ? "inline-block" : "none";
  }
}

// ==========================================================================
// 5. ĐĂNG BÀI VIẾT MỚI / GỬI PHẢN ÁNH DÂN SINH
// ==========================================================================
function openCreatePostModal(presetCategory) {
  const modal = document.getElementById("createPostModal");
  if (!modal) return;

  if (presetCategory) {
    const catSelect = document.getElementById("postCategory");
    if (catSelect) catSelect.value = presetCategory;
    if (presetCategory === "phan-anh") {
      togglePostType("phan-anh");
    }
  }

  // Tự động điền thông tin người đăng nếu đã đăng nhập
  if (appState.currentUser) {
    const authorInput = document.getElementById("postAuthor");
    const roleSelect = document.getElementById("postRole");
    const locationInput = document.getElementById("postLocation");

    if (authorInput) authorInput.value = appState.currentUser.name;
    if (roleSelect && appState.currentUser.role) roleSelect.value = appState.currentUser.role;
    if (locationInput && appState.currentUser.location) locationInput.value = appState.currentUser.location;
  }

  modal.classList.add("open");
  document.getElementById("postTitle")?.focus();
}

function closeCreatePostModal() {
  const modal = document.getElementById("createPostModal");
  if (modal) modal.classList.remove("open");
}

function togglePostType(type) {
  document.querySelectorAll(".type-radio-btn").forEach(btn => {
    const radio = btn.querySelector("input");
    btn.classList.toggle("active", radio && radio.value === type);
    if (radio) radio.checked = (radio.value === type);
  });

  const catSelect = document.getElementById("postCategory");
  const modalTitle = document.getElementById("createModalTitle");

  if (type === "phan-anh") {
    if (catSelect) catSelect.value = "phan-anh";
    if (modalTitle) modalTitle.textContent = "Gửi Ý Kiến & Phản Ánh Dân Sinh Tới Chính Quyền";
  } else {
    if (catSelect && catSelect.value === "phan-anh") catSelect.value = "chinh-sach";
    if (modalTitle) modalTitle.textContent = "Đăng Bài Viết / Hướng Dẫn Dân Sinh Mới";
  }
}

function handlePostSubmit(e) {
  e.preventDefault();

  const title = document.getElementById("postTitle").value.trim();
  const category = document.getElementById("postCategory").value;
  const location = document.getElementById("postLocation").value.trim();
  const author = document.getElementById("postAuthor").value.trim();
  const role = document.getElementById("postRole").value;
  const summary = document.getElementById("postSummary").value.trim();
  const content = document.getElementById("postContent").value.trim();

  // Image
  const customImg = document.getElementById("postCustomImage")?.value.trim();
  const finalImage = customImg || appState.selectedSampleImage || SAMPLE_POST_IMAGES[0].url;

  // Format content paragraphs
  const formattedContent = content
    .split("\n\n")
    .map(para => `<p>${para.replace(/\n/g, "<br/>")}</p>`)
    .join("");

  const now = new Date();
  const dateFormatted = now.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  const catObj = POST_CATEGORIES.find(c => c.id === category);

  // New post object
  const newPost = {
    id: "user-post-" + Date.now(),
    title: title,
    category: category,
    categoryName: catObj ? catObj.name : "Dân Sinh",
    categoryBadgeClass: getCategoryBadgeClass(category),
    author: author,
    authorRole: role,
    location: location,
    date: dateFormatted,
    timeAgo: "Vừa xong",
    views: 1,
    likes: 0,
    isFeatured: false,
    isUserPost: true,
    image: finalImage,
    summary: summary,
    content: formattedContent,
    comments: []
  };

  if (category === "phan-anh") {
    newPost.status = "Đã tiếp nhận";
    newPost.statusCode = "processing";
    newPost.content += `
      <div class="feedback-official-reply">
        <h4><i class="fa-solid fa-clock-rotate-left"></i> Trạng thái hệ thống:</h4>
        <p><em>Ý kiến phản ánh đã được gửi vào Hệ thống Tiếp nhận Dân sinh. Bộ phận cơ sở sẽ tiến hành xác minh và phản hồi cho nhân dân trong thời gian sớm nhất.</em></p>
      </div>
    `;
  }

  // Prepend to posts list
  appState.posts.unshift(newPost);
  savePostsToStorage();

  // Reset form & close
  document.getElementById("createPostForm").reset();
  closeCreatePostModal();

  // Show toast notification
  showToast("🎉 Bài viết của bạn đã được đăng thành công và xuất bản trên cổng!", "success");

  // Re-render
  appState.activeCategory = "all";
  renderCategoriesNav();
  renderMainFeed();
  renderResolutionBoard();

  // Scroll to new post
  window.scrollTo({ top: 380, behavior: "smooth" });
}

function getCategoryBadgeClass(cat) {
  switch (cat) {
    case "chinh-sach": return "badge-policy";
    case "phan-anh": return "badge-feedback";
    case "doi-song": return "badge-life";
    case "y-te": return "badge-health";
    case "an-ninh": return "badge-security";
    default: return "badge-policy";
  }
}

// ==========================================================================
// 6. ĐỌC CHI TIẾT BÀI VIẾT (ARTICLE READER MODAL)
// ==========================================================================
function openArticleReaderModal(postId) {
  const post = appState.posts.find(p => p.id === postId);
  if (!post) return;

  appState.activeReaderPostId = postId;
  post.views = (post.views || 0) + 1;
  savePostsToStorage();

  const modal = document.getElementById("articleReaderModal");
  const body = document.getElementById("articleReaderBody");
  if (!modal || !body) return;

  const commentsHtml = renderCommentsList(post.comments || []);

  body.innerHTML = `
    <span class="reader-category-badge ${post.categoryBadgeClass || 'badge-policy'}">
      ${post.categoryName}
    </span>

    <h1 class="reader-title">${post.title}</h1>

    <div class="reader-meta-bar">
      <span><i class="fa-regular fa-calendar-check"></i> ${post.date}</span>
      <span><i class="fa-solid fa-user-pen"></i> Tác giả: <strong>${post.author}</strong> (${post.authorRole || 'Người dân'})</span>
      <span><i class="fa-solid fa-location-dot"></i> ${post.location || 'Địa phương'}</span>
      <span><i class="fa-regular fa-eye"></i> ${post.views} lượt xem</span>
    </div>

    <div class="reader-hero-image-wrap">
      <img src="${post.image}" alt="${post.title}" class="reader-hero-img" onerror="this.src='https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80';" />
    </div>

    <div class="reader-summary-lead">
      ${post.summary}
    </div>

    <div class="reader-content-text" id="readerContentText">
      ${post.content}
    </div>

    <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
      <button class="btn-card-like" onclick="likePost('${post.id}', event)" style="font-size: 0.95rem; font-weight: 700;">
        <i class="fa-solid fa-heart" style="color: #e11d48;"></i>
        <span>Đồng tình / Hữu ích (<span id="reader-likes-count">${post.likes || 0}</span>)</span>
      </button>

      <button class="btn-reader-tool" onclick="sharePost('${post.title}')">
        <i class="fa-solid fa-share-nodes"></i> Chia sẻ cho người thân
      </button>
    </div>

    <!-- Citizen Comments & Discussion -->
    <div class="reader-comments-section">
      <h3 class="comments-header-title">
        <i class="fa-solid fa-comments"></i> Ý Kiến & Đóng Góp Của Bà Con Nhân Dân (${(post.comments || []).length})
      </h3>

      <div class="add-comment-box">
        <div class="comment-input-row">
          <input type="text" id="commentAuthorInput" class="form-control" placeholder="Họ và tên của bạn..." required />
          <button class="btn-submit-post" onclick="submitComment('${post.id}')" style="padding: 8px 18px; font-size: 0.88rem;">
            <i class="fa-solid fa-paper-plane"></i> Gửi Ý Kiến
          </button>
        </div>
        <textarea id="commentTextInput" class="form-control" rows="2" placeholder="Gửi ý kiến đóng góp, thảo luận văn minh..." required></textarea>
      </div>

      <div class="comments-list" id="commentsListContainer">
        ${commentsHtml}
      </div>
    </div>
  `;

  modal.classList.add("open");
}

function closeArticleReaderModal() {
  const modal = document.getElementById("articleReaderModal");
  if (modal) modal.classList.remove("open");
}

function adjustReaderFont(delta) {
  const content = document.getElementById("readerContentText");
  if (!content) return;

  appState.readerFontSize = Math.max(0.85, Math.min(1.5, appState.readerFontSize + delta * 0.1));
  content.style.fontSize = `${appState.readerFontSize}rem`;
}

function renderCommentsList(comments) {
  if (!comments || comments.length === 0) {
    return `<p style="color: var(--text-muted); font-size: 0.88rem; font-style: italic;">Chưa có ý kiến nào. Hãy là người đầu tiên chia sẻ góc nhìn của bạn!</p>`;
  }

  return comments.map(c => `
    <div class="comment-bubble">
      <div class="comment-author-row">
        <span class="comment-author-name"><i class="fa-solid fa-circle-user"></i> ${c.name}</span>
        <span class="comment-date">${c.date}</span>
      </div>
      <p class="comment-text">${c.text}</p>
    </div>
  `).join("");
}

function submitComment(postId) {
  const nameInput = document.getElementById("commentAuthorInput");
  const textInput = document.getElementById("commentTextInput");
  if (!nameInput || !textInput) return;

  const name = nameInput.value.trim();
  const text = textInput.value.trim();

  if (!name || !text) {
    showToast("Vui lòng nhập họ tên và nội dung ý kiến đóng góp!", "info");
    return;
  }

  const post = appState.posts.find(p => p.id === postId);
  if (!post) return;

  if (!post.comments) post.comments = [];

  const now = new Date();
  const commentDate = `${now.toLocaleDateString("vi-VN")} ${now.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}`;

  post.comments.unshift({
    id: "c-" + Date.now(),
    name: name,
    date: commentDate,
    text: text
  });

  savePostsToStorage();

  // Update comments UI
  const listContainer = document.getElementById("commentsListContainer");
  if (listContainer) listContainer.innerHTML = renderCommentsList(post.comments);

  nameInput.value = "";
  textInput.value = "";

  showToast("Cảm ơn bạn đã đóng góp ý kiến xây dựng cộng đồng!", "success");
}

function likePost(postId, event) {
  if (event) event.stopPropagation();
  const post = appState.posts.find(p => p.id === postId);
  if (!post) return;

  post.likes = (post.likes || 0) + 1;
  savePostsToStorage();

  const cardCount = document.getElementById(`likes-count-${postId}`);
  if (cardCount) cardCount.textContent = post.likes;

  const readerCount = document.getElementById("reader-likes-count");
  if (readerCount && appState.activeReaderPostId === postId) readerCount.textContent = post.likes;

  showToast("Đã ghi nhận sự đồng tình của bạn!", "success");
}

function sharePost(title) {
  if (navigator.share) {
    navigator.share({
      title: title,
      url: window.location.href
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(window.location.href);
    showToast("Đã sao chép liên kết bài viết vào bộ nhớ tạm!", "info");
  }
}

// ==========================================================================
// 7. GIAO DIỆN & CỬA SỔ PHỤ
// ==========================================================================
function openThemeModal() {
  const modal = document.getElementById("themeModal");
  if (modal) modal.classList.add("open");
}

function closeThemeModal() {
  const modal = document.getElementById("themeModal");
  if (modal) modal.classList.remove("open");
}

function handleModalBackdropClick(event, modalId) {
  if (event.target && event.target.id === modalId) {
    if (modalId === "createPostModal") closeCreatePostModal();
    if (modalId === "articleReaderModal") closeArticleReaderModal();
    if (modalId === "themeModal") closeThemeModal();
    if (modalId === "authModal") closeAuthModal();
  }
}

// Toast Notifications
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="${type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-info'}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(15px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}



// ==========================================================================
// 8. HỆ THỐNG XÁC THỰC CÔNG DÂN (ĐĂNG NHẬP / ĐĂNG KÝ TRƯỚC KHI ĐĂNG BÀI)
// ==========================================================================
function renderAuthUI() {
  const container = document.getElementById("headerAuthContainer");
  const qpPlaceholder = document.getElementById("qpPlaceholderText");
  const qpAvatar = document.getElementById("qpUserAvatar");

  if (!container) return;

  if (appState.currentUser) {
    // Đã đăng nhập
    container.innerHTML = `
      <div class="user-logged-badge" title="Tài khoản công dân: ${appState.currentUser.name}">
        <div class="user-avatar-mini">
          <i class="fa-solid fa-user"></i>
        </div>
        <div class="user-name-role">
          <span class="un-name">${appState.currentUser.name}</span>
          <span class="un-role">${appState.currentUser.role || 'Công dân'}</span>
        </div>
        <button type="button" class="btn-logout-mini" onclick="handleLogout(event)" title="Đăng xuất khỏi hệ thống">
          <i class="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
    `;

    if (qpPlaceholder) {
      qpPlaceholder.textContent = `✍️ Chào ${appState.currentUser.name}, bạn muốn chia sẻ tin tức hoặc gửi phản ánh gì hôm nay? Bấm vào đây để viết bài...`;
    }
    if (qpAvatar) {
      qpAvatar.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #16a34a;"></i>`;
    }
  } else {
    // Chưa đăng nhập
    container.innerHTML = `
      <button type="button" class="btn-auth-user" onclick="openAuthModal()" title="Đăng nhập hoặc đăng ký tài khoản">
        <i class="fa-solid fa-user-lock"></i>
        <span>Đăng Nhập / Đăng Ký</span>
      </button>
    `;

    if (qpPlaceholder) {
      qpPlaceholder.textContent = "✍️ Bà con muốn đăng bài chia sẻ tin tức hoặc gửi ý kiến phản ánh gì hôm nay? Bấm vào đây để đăng nhập & viết bài...";
    }
    if (qpAvatar) {
      qpAvatar.innerHTML = `<i class="fa-solid fa-user"></i>`;
    }
  }
}

// Bắt buộc xác thực đăng nhập trước khi cho phép đăng bài
function requireAuthToPost(presetCategory) {
  if (!appState.currentUser) {
    appState.pendingPostCategory = presetCategory || null;
    showToast("Bà con vui lòng đăng nhập hoặc tạo tài khoản để xác thực danh tính trước khi đăng bài!", "info");
    openAuthModal();
  } else {
    openCreatePostModal(presetCategory);
  }
}

function openAuthModal() {
  const modal = document.getElementById("authModal");
  if (modal) {
    modal.classList.add("open");
    switchAuthTab("login");
  }
}

function closeAuthModal() {
  const modal = document.getElementById("authModal");
  if (modal) modal.classList.remove("open");
}

function switchAuthTab(tab) {
  const btnLogin = document.getElementById("tabLoginBtn");
  const btnRegister = document.getElementById("tabRegisterBtn");
  const formLogin = document.getElementById("loginForm");
  const formRegister = document.getElementById("registerForm");
  const title = document.getElementById("authModalTitle");

  if (tab === "login") {
    btnLogin?.classList.add("active");
    btnRegister?.classList.remove("active");
    if (formLogin) formLogin.style.display = "block";
    if (formRegister) formRegister.style.display = "none";
    if (title) title.textContent = "Đăng Nhập Tài Khoản Dân Sinh";
  } else {
    btnLogin?.classList.remove("active");
    btnRegister?.classList.add("active");
    if (formLogin) formLogin.style.display = "none";
    if (formRegister) formRegister.style.display = "block";
    if (title) title.textContent = "Đăng Ký Tài Khoản Công Dân Mới";
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const idInput = document.getElementById("loginIdentifier").value.trim();
  const passInput = document.getElementById("loginPassword").value.trim();

  const users = JSON.parse(localStorage.getItem("dansinh_users") || "[]");
  let user = users.find(u => (u.phone === idInput || u.name.toLowerCase() === idInput.toLowerCase() || u.id === idInput));

  if (!user) {
    // Cho phép đăng nhập nhanh bằng số điện thoại bất kỳ để thuận tiện cho người dân
    user = {
      id: "user-" + Date.now(),
      name: "Công Dân (" + idInput + ")",
      phone: idInput,
      role: "Người dân",
      location: "Việt Nam",
      password: passInput
    };
    users.push(user);
    localStorage.setItem("dansinh_users", JSON.stringify(users));
  }

  appState.currentUser = user;
  localStorage.setItem("dansinh_current_user", JSON.stringify(user));

  renderAuthUI();
  closeAuthModal();
  showToast(`Xin chào ${user.name}! Đăng nhập thành công.`, "success");

  // Nếu người dùng đang bấm đăng bài dở, tự động mở form đăng bài
  if (appState.pendingPostCategory !== null) {
    const cat = appState.pendingPostCategory;
    appState.pendingPostCategory = null;
    setTimeout(() => {
      openCreatePostModal(cat);
    }, 300);
  }
}

function handleRegisterSubmit(e) {
  e.preventDefault();
  const fullName = document.getElementById("regFullName").value.trim();
  const phone = document.getElementById("regPhone").value.trim();
  const role = document.getElementById("regRole").value;
  const location = document.getElementById("regLocation").value.trim();
  const pass = document.getElementById("regPassword").value;
  const confirmPass = document.getElementById("regConfirmPassword").value;

  if (pass !== confirmPass) {
    showToast("Mật khẩu xác nhận không trùng khớp. Vui lòng kiểm tra lại!", "info");
    return;
  }

  const users = JSON.parse(localStorage.getItem("dansinh_users") || "[]");

  const newUser = {
    id: "user-" + Date.now(),
    name: fullName,
    phone: phone,
    role: role,
    location: location,
    password: pass
  };

  users.push(newUser);
  localStorage.setItem("dansinh_users", JSON.stringify(users));

  appState.currentUser = newUser;
  localStorage.setItem("dansinh_current_user", JSON.stringify(newUser));

  renderAuthUI();
  closeAuthModal();
  showToast(`Chúc mừng ${fullName}! Đăng ký tài khoản công dân thành công.`, "success");

  // Nếu đang muốn đăng bài, tự động mở form đăng bài
  if (appState.pendingPostCategory !== null) {
    const cat = appState.pendingPostCategory;
    appState.pendingPostCategory = null;
    setTimeout(() => {
      openCreatePostModal(cat);
    }, 300);
  }
}

function quickDemoLogin(type) {
  const users = JSON.parse(localStorage.getItem("dansinh_users") || "[]");
  let user = null;

  if (type === "citizen") {
    user = users.find(u => u.id === "user-1") || {
      id: "user-1",
      name: "Bác Nguyễn Văn An",
      phone: "0912345678",
      role: "Người dân",
      location: "Phường Dịch Vọng, Cầu Giấy, Hà Nội"
    };
  } else {
    user = users.find(u => u.id === "user-2") || {
      id: "user-2",
      name: "Đ/c Trần Thị Mai",
      phone: "0987654321",
      role: "Cán bộ cơ sở",
      location: "Xã Đồng Tâm, Mỹ Đức, Hà Nội"
    };
  }

  appState.currentUser = user;
  localStorage.setItem("dansinh_current_user", JSON.stringify(user));

  renderAuthUI();
  closeAuthModal();
  showToast(`Đã đăng nhập với tài khoản mẫu: ${user.name} (${user.role})`, "success");

  // Nếu đang muốn đăng bài, tự động mở form đăng bài
  if (appState.pendingPostCategory !== null) {
    const cat = appState.pendingPostCategory;
    appState.pendingPostCategory = null;
    setTimeout(() => {
      openCreatePostModal(cat);
    }, 300);
  }
}

function handleLogout(e) {
  if (e) e.stopPropagation();
  appState.currentUser = null;
  localStorage.removeItem("dansinh_current_user");

  renderAuthUI();
  if (appState.filterOnlyMyPosts) {
    appState.filterOnlyMyPosts = false;
    renderCategoriesNav();
    renderMainFeed();
  }
  showToast("Đã đăng xuất tài khoản an toàn.", "info");
}
