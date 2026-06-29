// Catalog creations data
const BOUQUETS = [
  {
    id: 'crimson-noir',
    name: 'Crimson Noir',
    price: 180,
    originalPrice: 220,
    category: 'roses',
    image: '/assets/roses.png',
    desc: 'Bespoke arrangement of classic deep velvet red roses, hand-tied and wrapped in premium textured matte black paper with a luxury gold satin ribbon.'
  },
  {
    id: 'adeline-peony',
    name: 'Adeline Bouquet',
    price: 150,
    originalPrice: 180,
    category: 'peonies',
    image: '/assets/peonies.png',
    desc: 'Soft pastel pink peonies layered with fresh eucalyptus, wrapped in our signature ivory silk paper and bound with a delicate cream ribbon.'
  },
  {
    id: 'imperial-orchid',
    name: 'Imperial Phalaenopsis',
    price: 310,
    category: 'orchids',
    image: '/assets/orchids.png',
    desc: 'A striking minimalist arrangement of pure white phalaenopsis orchid stems anchored in a sleek metallic gold vase, expressing refined grandeur.'
  },
  {
    id: 'sunlit-meadow',
    name: 'Sunlit Meadow',
    price: 140,
    originalPrice: 165,
    category: 'sunflowers',
    image: '/assets/sunflowers.png',
    desc: 'A cheerful rustic arrangement of vibrant yellow sunflowers, field daisies, and baby\'s breath, wrapped in natural brown kraft paper with a satin ribbon.'
  },
  {
    id: 'lilac-dream',
    name: 'Lilac Dream',
    price: 165,
    originalPrice: 190,
    category: 'lilacs',
    image: '/assets/lilacs.png',
    desc: 'A soothing pastel bouquet of sweet purple lilacs, lavender sprigs, and white hydrangeas, bound in a luxurious matching lavender silk wrap.'
  },
  {
    id: 'elysian-garden',
    name: 'Elysian Garden',
    price: 280,
    category: 'lilies',
    image: '/assets/lilies.png',
    desc: 'A wild luxury collection featuring majestic white calla lilies, blue delphiniums, and snapdragons, bound with a royal navy blue velvet ribbon.'
  }
];

export function renderCatalog(filtersContainerId, gridContainerId, onBookItem) {
  const filtersContainer = document.getElementById(filtersContainerId);
  const gridContainer = document.getElementById(gridContainerId);
  
  if (!filtersContainer || !gridContainer) return;

  let activeCategory = 'all';

  // Selected customization options per product id
  const customSelections = {};
  BOUQUETS.forEach(b => {
    customSelections[b.id] = {
      wrap: 'Signature Silk',
      ribbon: 'Gold Satin'
    };
  });

  const categories = [
    { id: 'all', label: 'All Creations' },
    { id: 'roses', label: 'Velvet Roses' },
    { id: 'peonies', label: 'Pastel Peonies' },
    { id: 'orchids', label: 'White Orchids' },
    { id: 'sunflowers', label: 'Sunflowers' },
    { id: 'lilacs', label: 'Lilacs & Lavenders' },
    { id: 'lilies', label: 'Calla Lilies' }
  ];

  function renderFilters() {
    filtersContainer.innerHTML = categories.map(cat => `
      <button class="filter-tab ${activeCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
        ${cat.label}
      </button>
    `).join('');

    // Attach click listeners to filter tabs
    filtersContainer.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        activeCategory = tab.getAttribute('data-cat');
        renderFilters();
        renderGrid();
      });
    });
  }

  function renderGrid() {
    const filtered = activeCategory === 'all' 
      ? BOUQUETS 
      : BOUQUETS.filter(b => b.category === activeCategory);

    gridContainer.innerHTML = filtered.map(b => `
      <div class="bouquet-card" id="card-${b.id}">
        <div class="card-image-box">
          <img src="${b.image}" alt="${b.name}" class="card-img">
        </div>
        <div class="card-body">
          <div class="card-header-row">
            <h3 class="bouquet-name">${b.name}</h3>
            <div style="display: flex; align-items: baseline; gap: 0.5rem;">
              ${b.originalPrice ? `<span class="original-price" style="text-decoration: line-through; color: var(--color-gray); font-size: 1.05rem; font-weight: 300;">$${b.originalPrice}</span>` : ''}
              <span class="bouquet-price">$${b.price}</span>
            </div>
          </div>
          <p class="bouquet-desc">${b.desc}</p>
          
          <!-- Customizer Toggle -->
          <button class="card-customizer-toggle" id="toggle-opt-${b.id}" data-id="${b.id}">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            Customize Arrangement
          </button>
          
          <!-- Customizer Panel -->
          <div class="card-options-panel" id="panel-opt-${b.id}">
            <div class="opt-section">
              <span class="opt-title">Wrapping Paper</span>
              <div class="opt-selectors">
                <button class="opt-btn ${customSelections[b.id].wrap === 'Signature Silk' ? 'active' : ''}" data-type="wrap" data-val="Signature Silk" data-id="${b.id}">Signature Silk</button>
                <button class="opt-btn ${customSelections[b.id].wrap === 'Matte Black' ? 'active' : ''}" data-type="wrap" data-val="Matte Black" data-id="${b.id}">Matte Black</button>
                <button class="opt-btn ${customSelections[b.id].wrap === 'Classic Kraft' ? 'active' : ''}" data-type="wrap" data-val="Classic Kraft" data-id="${b.id}">Classic Kraft</button>
              </div>
            </div>
            <div class="opt-section">
              <span class="opt-title">Ribbon Style</span>
              <div class="opt-selectors">
                <button class="opt-btn ${customSelections[b.id].ribbon === 'Gold Satin' ? 'active' : ''}" data-type="ribbon" data-val="Gold Satin" data-id="${b.id}">Gold Satin</button>
                <button class="opt-btn ${customSelections[b.id].ribbon === 'Emerald Velvet' ? 'active' : ''}" data-type="ribbon" data-val="Emerald Velvet" data-id="${b.id}">Emerald Velvet</button>
                <button class="opt-btn ${customSelections[b.id].ribbon === 'Blush Lace' ? 'active' : ''}" data-type="ribbon" data-val="Blush Lace" data-id="${b.id}">Blush Lace</button>
              </div>
            </div>
          </div>

          <button class="card-book-btn" data-id="${b.id}">
            Add to Bookings
          </button>
        </div>
      </div>
    `).join('');

    // Attach listeners for card options panels toggling
    gridContainer.querySelectorAll('.card-customizer-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const panel = document.getElementById(`panel-opt-${id}`);
        const isActive = btn.classList.toggle('active');
        
        if (panel) {
          panel.style.display = isActive ? 'block' : 'none';
        }
      });
    });

    // Attach option selectors listeners
    gridContainer.querySelectorAll('.opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const type = btn.getAttribute('data-type');
        const val = btn.getAttribute('data-val');

        // Update selections state
        customSelections[id][type] = val;

        // Toggle active visual states
        btn.parentElement.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Book button event handler
    gridContainer.querySelectorAll('.card-book-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const bouquet = BOUQUETS.find(b => b.id === id);
        
        // Bundle bouquet with its custom selections
        const bookingItem = {
          ...bouquet,
          selections: { ...customSelections[id] }
        };

        onBookItem(bookingItem);
        
        // Nice temporary visual feedback on button
        const originalText = btn.innerText;
        btn.innerText = 'Added to Cart ✓';
        btn.style.backgroundColor = 'var(--color-gold-dark)';
        btn.style.borderColor = 'var(--color-gold-dark)';
        
        setTimeout(() => {
          btn.innerText = originalText;
          btn.style.backgroundColor = '';
          btn.style.borderColor = '';
        }, 1500);
      });
    });
  }

  // Run initial renders
  renderFilters();
  renderGrid();
}

// Single flower creations
const SINGLE_FLOWERS = [
  {
    id: 'single-rose',
    name: 'Red Velvet Rose Stem',
    price: 6,
    image: '/assets/single_rose.png',
    desc: 'Bespoke hand-cut stem of deep crimson velvet rose with rich foliage.'
  },
  {
    id: 'single-peony',
    name: 'Blush Peony Stem',
    price: 8,
    image: '/assets/single_peony.png',
    desc: 'Soft blush pink peony stem, perfect for manual customized arrangements.'
  }
];

export function renderSingleStems(containerId, onBookItem) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const quantities = {};
  SINGLE_FLOWERS.forEach(f => {
    quantities[f.id] = 5; // Default quantity
  });

  function renderStems() {
    container.innerHTML = SINGLE_FLOWERS.map(f => {
      const qty = quantities[f.id];
      const totalRate = f.price * qty;
      return `
        <div class="bouquet-card" id="card-${f.id}">
          <div class="card-image-box" style="height: 280px;">
            <img src="${f.image}" alt="${f.name}" class="card-img">
          </div>
          <div class="card-body">
            <div class="card-header-row">
              <h3 class="bouquet-name" style="font-size: 1.4rem;">${f.name}</h3>
              <span class="bouquet-price" style="font-size: 1.15rem; color: var(--color-gold-dark);">$${f.price} / stem</span>
            </div>
            <p class="bouquet-desc" style="font-size: 0.85rem; margin-bottom: 1rem;">${f.desc}</p>
            
            <!-- Manual Stem Quantity Selector -->
            <div class="stem-qty-selector" style="display: flex; flex-direction: column; gap: 0.75rem; background-color: var(--color-cream); padding: 1rem; border-radius: 8px; border: 1px dashed var(--color-gold); margin-bottom: 1.25rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; color: var(--color-emerald);">
                <span>Stem Quantity</span>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <button class="qty-btn" data-action="dec" data-id="${f.id}" style="width: 24px; height: 24px; border-radius: 4px; border: 1px solid var(--color-gray-light); background-color: var(--color-white); cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: 700;">-</button>
                  <input type="number" class="qty-input" data-id="${f.id}" min="1" max="100" value="${qty}" style="width: 44px; text-align: center; border: 1px solid var(--color-gray-light); border-radius: 4px; padding: 2px; font-family: var(--font-sans); font-size: 0.85rem;" />
                  <button class="qty-btn" data-action="inc" data-id="${f.id}" style="width: 24px; height: 24px; border-radius: 4px; border: 1px solid var(--color-gray-light); background-color: var(--color-white); cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: 700;">+</button>
                </div>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; font-weight: 500;">
                <span>Total Rate:</span>
                <strong style="color: var(--color-emerald); font-family: var(--font-serif); font-size: 1.15rem;" id="rate-total-${f.id}">$${totalRate}</strong>
              </div>
            </div>

            <button class="card-book-btn add-stem-btn" data-id="${f.id}">
              Add Stems to Booking
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Attach Qty Button events
    container.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const action = btn.getAttribute('data-action');
        let val = quantities[id];
        
        if (action === 'dec' && val > 1) val--;
        if (action === 'inc' && val < 100) val++;
        
        quantities[id] = val;
        
        const input = container.querySelector(`input[data-id="${id}"]`);
        if (input) input.value = val;
        
        updateRateDisplay(id);
      });
    });

    // Attach Input change events
    container.querySelectorAll('.qty-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const id = input.getAttribute('data-id');
        let val = parseInt(e.target.value) || 1;
        if (val < 1) val = 1;
        if (val > 100) val = 100;
        
        quantities[id] = val;
        e.target.value = val;
        
        updateRateDisplay(id);
      });
    });

    // Add to Bookings
    container.querySelectorAll('.add-stem-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const flower = SINGLE_FLOWERS.find(f => f.id === id);
        const qty = quantities[id];
        
        const bookingItem = {
          id: `${flower.id}-${Date.now()}`,
          name: `${flower.name} (x${qty})`,
          price: flower.price * qty,
          image: flower.image,
          selections: {
            wrap: 'Kraft sleeve',
            ribbon: 'Simple Twine'
          }
        };

        onBookItem(bookingItem);

        // Feedback animation
        const originalText = btn.innerText;
        btn.innerText = 'Added to Cart ✓';
        btn.style.backgroundColor = 'var(--color-gold-dark)';
        btn.style.borderColor = 'var(--color-gold-dark)';
        
        setTimeout(() => {
          btn.innerText = originalText;
          btn.style.backgroundColor = '';
          btn.style.borderColor = '';
        }, 1500);
      });
    });
  }

  function updateRateDisplay(id) {
    const flower = SINGLE_FLOWERS.find(f => f.id === id);
    const qty = quantities[id];
    const totalRate = flower.price * qty;
    const rateText = document.getElementById(`rate-total-${id}`);
    if (rateText) {
      rateText.innerText = `$${totalRate}`;
    }
  }

  renderStems();
}
