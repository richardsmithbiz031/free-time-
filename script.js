const STORAGE_KEY = 'vanta-cart';

const PRODUCT_DETAILS = {
  'shadow-hoodie': {
    eyebrow: 'New arrival',
    name: 'Shadow Zip Hoodie',
    price: 89,
    description: 'Built with a premium fleece blend and a clean zip-front silhouette, this hoodie brings warmth, movement, and sharp streetwear presence to every layer.',
    gallery: ['image-one', 'image-two', 'image-three', 'image-five'],
    colors: ['#1e1e21', '#a8b7bf', '#d7a62d'],
    sizes: ['S', 'M', 'L', 'XL'],
    features: ['Heavyweight cotton fleece', 'Relaxed oversized fit', 'Double-layered hood and zip placket']
  },
  'stormshell-bomber': {
    eyebrow: 'Field utility',
    name: 'Stormshell Bomber',
    price: 129,
    description: 'A lightweight bomber with a structured silhouette, clean utility lines, and enough weather-ready comfort for city movement all day.',
    gallery: ['image-two', 'image-three', 'image-five', 'image-six'],
    colors: ['#1c1d20', '#8f8a7d', '#c9ba95'],
    sizes: ['S', 'M', 'L', 'XL'],
    features: ['Water-resistant shell', 'Interior sleeve lining', 'Strong utility pocketing']
  },
  'signal-tee': {
    eyebrow: 'Essential',
    name: 'Signal Tee',
    price: 42,
    description: 'A relaxed heavyweight tee that balances clean graphics, all-season comfort, and understated design language.',
    gallery: ['image-three', 'image-one', 'image-four', 'image-seven'],
    colors: ['#d9d7d0', '#17171a', '#7b8ea3'],
    sizes: ['S', 'M', 'L', 'XL'],
    features: ['Soft heavyweight cotton', 'Dropped shoulder fit', 'Minimal logo treatment']
  },
  'crossbody-sling': {
    eyebrow: 'Carry',
    name: 'Crossbody Sling',
    price: 32,
    description: 'Compact, everyday utility with a smooth strap and matte finish designed for quick errands, travel, and daily carry.',
    gallery: ['image-four', 'image-eight', 'image-five', 'image-two'],
    colors: ['#111214', '#8b7e68', '#d1d1d1'],
    sizes: ['One size'],
    features: ['Secure zip closure', 'Adjustable shoulder drop', 'Room for daily essentials']
  },
  'monarch-fleece': {
    eyebrow: 'Layered warmth',
    name: 'Monarch Fleece',
    price: 95,
    description: 'A brushed fleece that locks in warmth while staying sharp, with a more refined volume and premium texture.',
    gallery: ['image-five', 'image-one', 'image-seven', 'image-two'],
    colors: ['#17171a', '#b1b0a8', '#7a6350'],
    sizes: ['S', 'M', 'L', 'XL'],
    features: ['Brushed interior finish', 'Roomy, structured cut', 'Premium fleece weight']
  },
  'drift-coat': {
    eyebrow: 'Statement layer',
    name: 'Drift Utility Coat',
    price: 140,
    description: 'A full-length utility coat with details that sharpen the silhouette while balancing comfort and polish.',
    gallery: ['image-six', 'image-two', 'image-five', 'image-one'],
    colors: ['#25262a', '#b29d81', '#8ba1a8'],
    sizes: ['S', 'M', 'L', 'XL'],
    features: ['Insulated inner layer', 'Multiple utility pockets', 'Tailored longline cut']
  },
  'night-shift-tee': {
    eyebrow: 'Late night',
    name: 'Night Shift Tee',
    price: 38,
    description: 'A dark, refined everyday tee with a crisp finish and just enough weight to feel premium without trying too hard.',
    gallery: ['image-seven', 'image-three', 'image-one', 'image-eight'],
    colors: ['#111216', '#a5a3a1', '#6c7d8b'],
    sizes: ['S', 'M', 'L', 'XL'],
    features: ['Crisp everyday weight', 'Structured neckline', 'Soft brushed hand feel']
  },
  'transit-cap': {
    eyebrow: 'Everyday finish',
    name: 'Transit Cap',
    price: 28,
    description: 'Low-profile, easy-fit headwear that completes the look without overpowering the rest of the outfit.',
    gallery: ['image-eight', 'image-four', 'image-three', 'image-six'],
    colors: ['#111214', '#d9d4ca', '#8d7360'],
    sizes: ['One size'],
    features: ['Structured crown', 'Soft brushed lining', 'Low-key finishing details']
  }
};

const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

const saveCart = (cart) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
};

const updateCartCount = () => {
  const cartCount = document.getElementById('cartCount');
  if (!cartCount) return;

  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + Number(item.qty || 1), 0);
  cartCount.textContent = total;
};

const addToCart = (productId, name, price) => {
  const cart = getCart();
  const existingProduct = cart.find((item) => item.id === productId);

  if (existingProduct) {
    existingProduct.qty += 1;
  } else {
    cart.push({ id: productId, name, price, qty: 1 });
  }

  saveCart(cart);
  updateCartCount();

  const buttons = document.querySelectorAll(`[data-product-id="${productId}"]`);
  buttons.forEach((button) => {
    button.textContent = 'Added';
    button.disabled = true;
    button.style.opacity = '0.8';

    setTimeout(() => {
      button.textContent = button.classList.contains('primary-btn') ? 'Add to cart' : 'Add to cart';
      button.disabled = false;
      button.style.opacity = '1';
    }, 900);
  });
};

const initProductFilters = () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));

      productCards.forEach((card) => {
        const matches = selectedFilter === 'all' || card.dataset.category === selectedFilter;
        card.classList.toggle('hidden', !matches);
      });
    });
  });
};

const initAddToCartButtons = () => {
  const productButtons = document.querySelectorAll('button[data-product-id]');

  productButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();

      const productId = button.dataset.productId;
      const name = button.dataset.name;
      const price = Number(button.dataset.price || 0);

      addToCart(productId, name, price);
    });
  });
};

const getProductDisplayName = (productId) => {
  const nameMap = {
    'shadow-hoodie': 'Shadow Zip Hoodie',
    'stormshell-bomber': 'Stormshell Bomber',
    'signal-tee': 'Signal Tee',
    'crossbody-sling': 'Crossbody Sling',
    'monarch-fleece': 'Monarch Fleece',
    'drift-coat': 'Drift Utility Coat',
    'night-shift-tee': 'Night Shift Tee',
    'transit-cap': 'Transit Cap',
  };

  return nameMap[productId] || 'VANTA Essential';
};

const renderCartPage = () => {
  const cartItemsEl = document.getElementById('cartItems');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('total');

  if (!cartItemsEl) return;

  const cart = getCart();

  if (!cart.length) {
    cartItemsEl.innerHTML = '<div class="empty-state">Your bag is empty. Explore the latest drop.</div>';
    subtotalEl.textContent = '$0';
    totalEl.textContent = '$0';
    return;
  }

  let subtotal = 0;

  cartItemsEl.innerHTML = cart
    .map((item) => {
      const productName = item.name || getProductDisplayName(item.id);
      const itemTotal = Number(item.price) * item.qty;
      subtotal += itemTotal;

      return `
        <div class="cart-item">
          <div class="cart-item-image image-${item.id === 'shadow-hoodie' ? 'one' : item.id === 'stormshell-bomber' ? 'two' : item.id === 'signal-tee' ? 'three' : item.id === 'crossbody-sling' ? 'four' : item.id === 'monarch-fleece' ? 'five' : item.id === 'drift-coat' ? 'six' : item.id === 'night-shift-tee' ? 'seven' : 'eight'}"></div>
          <div>
            <h3>${productName}</h3>
            <p>Premium streetwear piece</p>
            <div class="item-controls">
              <div class="qty-box">
                <button type="button" data-action="decrease" data-product-id="${item.id}">−</button>
                <span>${item.qty}</span>
                <button type="button" data-action="increase" data-product-id="${item.id}">+</button>
              </div>
              <button type="button" class="remove-btn" data-action="remove" data-product-id="${item.id}">Remove</button>
            </div>
          </div>
          <div class="item-price">$${itemTotal}</div>
        </div>
      `;
    })
    .join('');

  const shipping = cart.length ? 12 : 0;
  subtotalEl.textContent = `$${subtotal}`;
  totalEl.textContent = `$${subtotal + shipping}`;

  document.querySelectorAll('[data-action="increase"]').forEach((button) => {
    button.addEventListener('click', () => {
      const cartData = getCart();
      const item = cartData.find((entry) => entry.id === button.dataset.productId);
      if (!item) return;
      item.qty += 1;
      saveCart(cartData);
      renderCartPage();
      updateCartCount();
    });
  });

  document.querySelectorAll('[data-action="decrease"]').forEach((button) => {
    button.addEventListener('click', () => {
      const cartData = getCart();
      const item = cartData.find((entry) => entry.id === button.dataset.productId);
      if (!item) return;
      item.qty -= 1;
      if (item.qty <= 0) {
        const nextCart = cartData.filter((entry) => entry.id !== button.dataset.productId);
        saveCart(nextCart);
      } else {
        saveCart(cartData);
      }
      renderCartPage();
      updateCartCount();
    });
  });

  document.querySelectorAll('[data-action="remove"]').forEach((button) => {
    button.addEventListener('click', () => {
      const filtered = getCart().filter((entry) => entry.id !== button.dataset.productId);
      saveCart(filtered);
      renderCartPage();
      updateCartCount();
    });
  });
};

const initSwatchesAndSizes = () => {
  document.querySelectorAll('.swatch').forEach((swatch) => {
    swatch.addEventListener('click', () => {
      document.querySelectorAll('.swatch').forEach((item) => item.classList.remove('active'));
      swatch.classList.add('active');
    });
  });

  document.querySelectorAll('.size-btn').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.size-btn').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
    });
  });
};

const initWishlistButtons = () => {
  const wishlistButtons = document.querySelectorAll('[data-wishlist]');

  wishlistButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const saved = button.classList.toggle('saved');
      button.setAttribute('aria-pressed', String(saved));
      button.textContent = saved ? 'Saved' : 'Wishlist';
    });
  });
};

const initSortMenu = () => {
  const sortMenu = document.querySelector('.sort-menu');
  const toggle = document.querySelector('.sort-toggle');
  const options = document.querySelectorAll('.sort-option');

  if (!sortMenu || !toggle || !options.length) return;

  toggle.addEventListener('click', () => {
    const isOpen = sortMenu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  options.forEach((option) => {
    option.addEventListener('click', () => {
      const value = option.textContent.trim();
      options.forEach((item) => item.classList.toggle('active', item === option));
      toggle.textContent = value;
      sortMenu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');

      const cards = [...document.querySelectorAll('.shop-grid .product-card')];
      const grid = document.querySelector('.shop-grid');
      if (!grid) return;

      const sortedCards = [...cards];
      const getPrice = (card) => Number((card.querySelector('.product-meta span:last-child')?.textContent || '$0').replace(/[$,]/g, ''));

      if (option.dataset.sort === 'low-high') {
        sortedCards.sort((a, b) => getPrice(a) - getPrice(b));
      }

      if (option.dataset.sort === 'high-low') {
        sortedCards.sort((a, b) => getPrice(b) - getPrice(a));
      }

      sortedCards.forEach((card) => grid.appendChild(card));
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.sort-menu')) {
      sortMenu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
};

const getProductIdFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('id') || 'shadow-hoodie';
};

const buildProductLink = (productId) => `product.html?id=${productId}`;

const renderProductDetailPage = () => {
  const page = document.querySelector('.product-page');
  if (!page) return;

  const productId = getProductIdFromUrl();
  const product = PRODUCT_DETAILS[productId] || PRODUCT_DETAILS['shadow-hoodie'];

  const pageTitle = document.title.replace(/.*\| VANTA/, '');
  if (product && pageTitle !== `${product.name} | VANTA`) {
    document.title = `${product.name} | VANTA`;
  }

  const titleEl = document.querySelector('.product-details h1');
  const priceEl = document.querySelector('.price');
  const descriptionEl = document.querySelector('.product-description');
  const eyebrowEl = document.querySelector('.eyebrow');
  const galleryMain = document.querySelector('.gallery-main');
  const thumbs = document.querySelectorAll('.thumb');
  const swatches = document.querySelectorAll('.swatch');
  const sizes = document.querySelectorAll('.size-btn');
  const featureList = document.querySelector('.feature-list');
  const addToCartButton = document.querySelector('.primary-btn');

  if (eyebrowEl) eyebrowEl.textContent = product.eyebrow;
  if (titleEl) titleEl.textContent = product.name;
  if (priceEl) priceEl.textContent = `$${product.price}`;
  if (descriptionEl) descriptionEl.textContent = product.description;
  if (galleryMain) galleryMain.className = `gallery-main ${product.gallery[0]}`;

  thumbs.forEach((thumb, index) => {
    const imageClass = product.gallery[index + 1] || product.gallery[0];
    thumb.className = `thumb ${imageClass}`;
  });

  swatches.forEach((swatch, index) => {
    const color = product.colors[index] || product.colors[0];
    swatch.style.background = color;
    swatch.classList.toggle('active', index === 0);
  });

  sizes.forEach((sizeButton, index) => {
    sizeButton.textContent = product.sizes[index] || product.sizes[0];
    sizeButton.classList.toggle('active', index === 0);
  });

  if (featureList) {
    featureList.innerHTML = product.features.map((feature) => `<li>${feature}</li>`).join('');
  }

  if (addToCartButton) {
    addToCartButton.dataset.productId = productId;
    addToCartButton.dataset.name = product.name;
    addToCartButton.dataset.price = String(product.price);
  }
};

const initProductCardNavigation = () => {
  const productCards = document.querySelectorAll('.product-card[data-product-id]');

  productCards.forEach((card) => {
    const productId = card.dataset.productId;

    card.addEventListener('click', (event) => {
      if (event.target.closest('.buy-btn') || event.target.closest('.mini-link')) {
        return;
      }

      window.location.href = buildProductLink(productId);
    });
  });

  document.querySelectorAll('[data-product-link]').forEach((link) => {
    const productId = link.dataset.productLink;
    link.href = buildProductLink(productId);
  });
};

const setYear = () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
};

initProductFilters();
initAddToCartButtons();
initSwatchesAndSizes();
initWishlistButtons();
initSortMenu();
initProductCardNavigation();
renderProductDetailPage();
renderCartPage();
setYear();
updateCartCount();
