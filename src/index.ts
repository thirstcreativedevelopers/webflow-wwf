// core version + navigation, pagination modules:
import Swiper, { Navigation } from 'swiper';

// Get all the .ig-collection-item elements
const collectionItems = document.querySelectorAll('.ig-collection-item');

// Add event listener to each item
collectionItems.forEach((item) => {
  item.addEventListener('click', function () {
    // Remove active class from all items
    collectionItems.forEach((item) => {
      item.classList.remove('active');
    });

    // Add active class to the clicked item
    this.classList.add('active');
  });
});

window.addEventListener('load', function () {
  // Get all the .ig-marker elements
  const markers = document.querySelectorAll('.ig-marker-inner');

  // Set top and left values for each marker
  markers.forEach((marker) => {
    const leftPos = marker.getAttribute('data-left');
    const topPos = marker.getAttribute('data-top');
    console.log('positioned');

    // Set the absolute positioning of the marker element
    marker.style.position = 'absolute';
    marker.style.top = topPos;
    marker.style.left = leftPos;
  });
});

// Get all elements with the class "ig-marker"
const markers = document.getElementsByClassName('ig-marker');

// Attach click event listener to each marker element
Array.from(markers).forEach((marker) => {
  marker.addEventListener('click', () => {
    // Get all elements with classes "ig-list" and "ig-links"
    const lists = document.getElementsByClassName('ig-list');
    const links = document.getElementsByClassName('ig-links');

    // Get the element with the class "ig-overlay"
    const overlay = document.querySelector('.ig-overlay');

    // Get the element with the class "ig-popup"
    const popup = document.querySelector('.ig-popup');

    // Hide all instances of the "ig-list" elements
    Array.from(lists).forEach((list) => {
      list.style.display = 'none';
    });

    // Hide all instances of the "ig-links" elements
    Array.from(links).forEach((link) => {
      link.style.display = 'none';
    });

    // Hide the "ig-overlay" element
    overlay.style.display = 'none';

    // Hide the "ig-popup" element
    popup.style.display = 'none';
  });
});

// Check if the screen size is less than 1024px
if (window.innerWidth < 1024) {
  // Find each element with class .ig-list and get its data-list value
  const igLists = document.querySelectorAll('.ig-list');
  for (let i = 0; i < igLists.length; i++) {
    const igList = igLists[i];

    // Add the class 'swiper-wrapper' to each .ig-list element
    igList.classList.add('swiper-wrapper');

    // Find the .ig-slider element with a class that matches the data-list value
    const dataListValue = igList.getAttribute('data-list');
    const matchingSlider = document.querySelector('.ig-slider.' + dataListValue);

    // Move each .ig-list into the corresponding .ig-slider
    if (matchingSlider) {
      matchingSlider.appendChild(igList);

      // Find each .ig-item element within the .ig-list
      const igItems = igList.querySelectorAll('.ig-item');
      for (let j = 0; j < igItems.length; j++) {
        const igItem = igItems[j];

        // Add the class 'swiper-slide' to each .ig-item element
        igItem.classList.add('swiper-slide');
      }
    }
  }

  const sliderConfigs = [
    { selector: '.ig-slider.agriculture-food' },
    { selector: '.ig-slider.energy' },
    { selector: '.ig-slider.land-ecosystems' },
    { selector: '.ig-slider.regenerative-governance' },
    { selector: '.ig-slider.tourism' },
  ];

  // Loop through the configurations and create Swiper instances dynamically
  const swiperInstances = [];
  sliderConfigs.forEach((config) => {
    const swiperInstance = new Swiper(config.selector, {
      modules: [Navigation],
      slidesPerView: 1.2,
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    swiperInstances.push(swiperInstance);
  });
}

// Handle click event on .ig-marker elements
const igMarkers = document.querySelectorAll('.ig-collection-item');
for (let k = 0; k < igMarkers.length; k++) {
  const igMarker = igMarkers[k];

  igMarker.addEventListener('click', function () {
    const dataId = this.getAttribute('data-id');

    // Remove active classes on all .ig-slider elements
    const igSliders = document.querySelectorAll('.ig-slider');
    for (let m = 0; m < igSliders.length; m++) {
      igSliders[m].classList.remove('active');
    }

    // Find the .ig-list element with matching data-list value
    const igList = document.querySelector('.ig-list[data-list="' + dataId + '"]');
    if (igList) {
      // Add class 'active' to the corresponding .ig-slider element
      const slider = igList.closest('.ig-slider');
      if (slider) {
        slider.classList.add('active');
      }
    }
  });
}
