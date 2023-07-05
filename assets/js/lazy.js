const gallery = document.querySelector('.gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const closeBtn = document.querySelector('.close');
const lazyImages = document.querySelectorAll('.lazy');

// Function to check if an element is in the viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to lazy load the images
function lazyLoad() {
  lazyImages.forEach(function(img) {
    if (isElementInViewport(img) && img.getAttribute('data-src')) {
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
      img.classList.remove('lazy');
    }
  });
}

// Open lightbox with clicked image
gallery.addEventListener('click', function(e) {
  if (e.target.tagName === 'IMG') {
    lightbox.style.display = 'block';
    lightboxImage.src = e.target.src;
  }
});

// Close lightbox
closeBtn.addEventListener('click', function() {
  lightbox.style.display = 'none';
});

// Close lightbox when clicking outside the image
window.addEventListener('click', function(e) {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});

// Lazy load images initially
lazyLoad();

// Attach the lazy load function to the scroll event
window.addEventListener('scroll', lazyLoad);
