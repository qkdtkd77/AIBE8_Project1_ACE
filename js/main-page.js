/**
 * ======================================
 * main-page.js
 * --------------------------------------
 * 축제 목록 렌더링
 * ======================================
 */

let allFestivals = [];
let currentPage = 1;
const PAGE_SIZE = 4;
let filteredFestivals = [];

const getFestivalList = async () => {
  const container = $("#festival-grid");
  showLoading(container);
  allFestivals = await getFestivals();
  filteredFestivals = allFestivals;

  renderFestivalList();
};

const createFestivalCardHTML = (festival) => {
  return `
    <div class="festival-card" data-festival-id="${escapeHtml(festival.id)}">
      <div class="festival-card-image-wrap">
        <img src="${escapeHtml(festival.image)}" />
      </div>
      <div class="festival-card-body">
        <p class="festival-card-title">${escapeHtml(festival.title)}</p>
        <p class="festival-card-period">${formatDate(festival.eventStartDate)} - ${formatDate(festival.eventEndDate)}</p>
        <p class="festival-card-location">${escapeHtml(festival.address)}</p>
      </div>
    </div>
  `;
};

const getCurrentPageFestivals = () => {
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  return filteredFestivals.slice(startIndex, endIndex);
};

const renderFestivalList = () => {
  const container = $("#festival-grid");
  if (!container) return;

  const festivals = getCurrentPageFestivals();

  if (festivals.length === 0) {
    showEmpty(container, "축제가 없습니다.");
    return;
  }
  container.innerHTML = festivals.map(createFestivalCardHTML).join("");
  registerCardClickHandlers();
};

const registerCardClickHandlers = () => {
  const cards = $$(".festival-card");

  cards.forEach((card) => {
    card.addEventListener("click", handleCardClick);
  });
};

const handleCardClick = (event) => {
  const festivalId = event.currentTarget.dataset.festivalId;
  location.href = `detail.html?contentId=${festivalId}`;
};

const renderPagination = () => {
  const totalPages = Math.ceil(filteredFestivals.length / PAGE_SIZE);
  let pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const container = $("#pagination");

  container.innerHTML = pageNumbers.map(createPageButtonHTML).join("");
  registerPageButtonHandlers();
};

const createPageButtonHTML = (pageNumber) => {
  return `<button class="${pageNumber === currentPage ? "page-num-btn active" : "page-num-btn"}" data-page="${pageNumber}">${pageNumber}</button>`;
};

const registerPageButtonHandlers = () => {
  const pageButtons = $$(".page-num-btn");

  pageButtons.forEach((pageButton) => {
    pageButton.addEventListener("click", handlePageButtonClick);
  });
};

const handlePageButtonClick = (event) => {
  const pageNumber = event.currentTarget.dataset.page;
  currentPage = Number(pageNumber);
  renderFestivalList();
  renderPagination();
};

const handleNextPageClick = () => {
  const totalPages = Math.ceil(filteredFestivals.length / PAGE_SIZE);
  if (currentPage === totalPages) return;
  currentPage += 1;
  renderFestivalList();
  renderPagination();
};

const handlePrevPageClick = () => {
  if (currentPage === 1) return;
  currentPage -= 1;
  renderFestivalList();
  renderPagination();
};

const parseDate = (dateString) => {
  const year = Number(dateString.slice(0, 4));
  const month = Number(dateString.slice(4, 6));
  const day = Number(dateString.slice(6, 8));
  return new Date(year, month - 1, day);
};

const filteredDates = () => {
  const todayStart = new Date();
  const todayEnd = new Date();
  todayEnd.setDate(todayEnd.getDate() + 7);

  const filteredFestivals = allFestivals.filter((festival) => {
    return !(
      parseDate(festival.eventEndDate) < todayStart ||
      parseDate(festival.eventStartDate) > todayEnd
    );
  });
  return filteredFestivals;
};

const handleFilterClick = () => {
  filteredFestivals = filteredDates();
  currentPage = 1;
  renderFestivalList();
  renderPagination();
};

document.addEventListener("DOMContentLoaded", async () => {
  await getFestivalList();
  renderPagination();
});
