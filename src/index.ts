// core version + navigation, pagination modules:
import Swiper, { Navigation } from 'swiper';

// Get all ig-collection-items
const collectionItems = document.querySelectorAll('.ig-collection-item');

// Loop through each ig-collection-item
collectionItems.forEach(function (item) {
  // Find the ig-marker element inside the current ig-collection-item
  const marker = item.querySelector('.ig-marker');

  // Get the values of data-top and data-left attributes
  const topPos = marker.getAttribute('data-top');
  const leftPos = marker.getAttribute('data-left');

  // Set the absolute positioning of the marker element
  marker.style.position = 'absolute';
  marker.style.top = topPos;
  marker.style.left = leftPos;

  // Find the ig-close element inside the current ig-collection-item
  const closeButton = item.querySelector('.ig-close');

  if (window.innerWidth >= 1024) {
    // Add a click event listener to the ig-marker
    marker.addEventListener('click', function () {
      // Remove the class "active" from all markers
      const allMarkers = document.querySelectorAll('.ig-marker');
      allMarkers.forEach(function (m) {
        m.classList.remove('active');
      });

      // Remove all active classes from ig-item elements in all ig-collection-items
      const allIgItems = document.querySelectorAll('.ig-item');
      allIgItems.forEach(function (igItem) {
        igItem.classList.remove('active');
      });

      // Get the value of the data-id attribute of the clicked ig-marker
      const markerId = marker.getAttribute('data-id');

      // Find the matching class inside the corresponding ig-list and hide it
      const list = item.querySelector('.ig-list');
      const listItem = list.querySelector('.' + markerId);
      listItem.style.display = 'none';

      // Add the class "active" to all ig-item elements inside the current ig-collection-item
      const igItems = item.querySelectorAll('.ig-item');
      igItems.forEach(function (igItem) {
        igItem.classList.add('active');
      });

      // Add the class "active" to the marker element
      marker.classList.add('active');
    });

    // Add a click event listener to the ig-close
    closeButton.addEventListener('click', function (event) {
      event.stopPropagation(); // Prevent click event propagation to the marker

      // Remove the class "active" from the parent element (ig-marker)
      marker.classList.remove('active');

      // Remove all active classes inside the item
      const activeItems = item.querySelectorAll('.active');
      activeItems.forEach(function (activeItem) {
        activeItem.classList.remove('active');
      });
    });
  } else {
    // Add a click event listener to the ig-marker
    marker.addEventListener('click', function () {
      // Remove the class "active" from all markers
      const allMarkers = document.querySelectorAll('.ig-marker');
      allMarkers.forEach(function (m) {
        m.classList.remove('active');
      });

      // Add the class "active" to the marker element
      marker.classList.add('active');
    });

    // Add a click event listener to the ig-close
    closeButton.addEventListener('click', function (event) {
      event.stopPropagation(); // Prevent click event propagation to the marker

      // Remove the class "active" from the parent element (ig-marker)
      marker.classList.remove('active');
    });
  }
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
const igMarkers = document.querySelectorAll('.ig-marker');
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

const showDefault = document.querySelector('[data-id="agriculture-food"]');

// Trigger a click event on the element
if (showDefault) {
  showDefault.click();
}
