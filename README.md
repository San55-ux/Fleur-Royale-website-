# Fleur Royale | Premium Flower Booking System

Fleur Royale is a high-fidelity, editorial flower shop and online booking website built with pure HTML, modern CSS variables, and vanilla Javascript. The system features custom wrapping selections, an interactive scheduling calendar, a digital handwritten calligraphy card generator, and a shopping checkout cart.

> [!NOTE]
> **Hosting Status**: This project is not hosted live online. To view and interact with the website, please run the application locally on your machine using the setup instructions below.

---

## Key Features

1. **Editorial Flower Catalog**: Filterable collections (Roses, Peonies, Orchids, Sunflowers, Lilacs, Calla Lilies) with discount pricing.
2. **Arrangement Customizer**: Collapsible customization drawers inside catalog cards to select wrapping paper style and ribbons.
3. **Bespoke Single Stems**: A "Build Your Own" stems grid where users can select individual flowers (Roses, Peonies) and manually enter stem counts to calculate custom rates.
4. **Interactive Delivery Scheduler**: A monthly calendar showing current/future dates to lock hand-delivery time windows (Morning, Afternoon, Sunset Express).
5. **Calligraphy Greeting Card**: A live-rendering handwritten calligraphy note builder with smooth sliding envelope animations.
6. **Cart Slide-out Drawer**: Summary of bookings, items, customized ribbons, selected delivery date/time slot, and surcharge tallies.

---

## Local Setup & Run Instructions

To run this website locally on your computer:

1. **Navigate to the Project Directory** in your terminal or Command Prompt:
   ```bash
   cd C:\Users\yourdrive\OneDrive\Documents\fleur-royale
   ```

2. **Install Dependencies** (Vite development server):
   ```bash
   npm install
   ```

3. **Start the Local Server**:
   ```bash
   npm run dev
   ```

4. **Launch in Browser**:
   Open Google Chrome and navigate to the address shown in the output:
   `http://localhost:5173`

---

## Directory Structure

*   `index.html` - Structural layout
*   `package.json` - Bundler configurations (Vite)
*   `main.js` - Route & state coordinator
*   `src/style.css` - Design tokens and theme styling
*   `src/components/` - Catalog, Booking, CardWriter, and Cart modules
*   `src/utils/` - Calendar calculation helpers
*   `public/assets/` - Generated high-fidelity floral graphics
