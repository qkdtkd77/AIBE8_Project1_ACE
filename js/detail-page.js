/**
 * ======================================
 * detail-page.js
 * --------------------------------------
 * 축제 상세 페이지
 * ======================================
 */

//------------------ 목록으로 ------------------//
const backBtn = $("#back-btn");
backBtn.addEventListener("click", () => {
  location.href = "index.html";
});

//------------------ 이 축제로 코스짜기 ------------------//
const ctaBtn = $("#cta-btn");
ctaBtn.addEventListener("click", () => {
  location.href = "nearby.html";
});

//------------------ 목록으로 ------------------//
const createFestivalHTML = (festival) => {
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

document.addEventListener("DOMContentLoaded", () => {
  createFestivalHTML();
});/**
 * ======================================
 * detail-page.js
 * --------------------------------------
 * 축제 상세 페이지
 * ======================================
 */

//------------------ 목록으로 ------------------//
const backBtn = $("#back-btn");
backBtn.addEventListener("click", () => {
  location.href = "index.html";
});

//------------------ 이 축제로 코스짜기 ------------------//
const ctaBtn = $("#cta-btn");
ctaBtn.addEventListener("click", () => {
  location.href = "nearby.html";
});

//------------------ 목록으로 ------------------//
const createFestivalHTML = (festival) => {
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

document.addEventListener("DOMContentLoaded", () => {
  createFestivalHTML();
});
