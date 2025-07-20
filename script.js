const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const galleryImgs = Array.from(document.querySelectorAll('.gallery-img'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const closeBtn = document.querySelector('.lightbox-close');

let currentImages = galleryImgs;
let currentIndex = 0;

// Filter buttons
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active')?.classList.remove('active');
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    currentImages = [];

    galleryImgs.forEach(img => {
      const category = img.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        img.style.display = 'block';
        currentImages.push(img);
      } else {
        img.style.display = 'none';
      }
    });

    lightbox.style.display = 'none';
  });
});

// Search bar
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  currentImages = [];

  galleryImgs.forEach(img => {
    const alt = img.alt.toLowerCase();
    if (alt.includes(query)) {
      img.style.display = 'block';
      currentImages.push(img);
    } else {
      img.style.display = 'none';
    }
  });

  lightbox.style.display = 'none';
});

// Open lightbox on image click
galleryImgs.forEach(img => {
  img.addEventListener('click', () => {
    if (img.style.display !== 'none') {
      currentIndex = currentImages.indexOf(img);
      showLightboxImage();
      lightbox.style.display = 'flex';
    }
  });
});

function showLightboxImage() {
  lightboxImg.src = currentImages[currentIndex].src;
}

// Lightbox navigation
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  showLightboxImage();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  showLightboxImage();
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});
