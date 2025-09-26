5️⃣ Mock E-commerce (HTML, CSS, React JS)

Description: Small simulated online store.

Key Features: Interactive shopping cart, category filters, real-time updateable total.

E-commerce Website Documentation
This document provides an overview of the single-file React e-commerce application. The application is a functional demo that showcases product browsing, category filtering, and a dynamic shopping cart. All styling is included directly within the component using plain CSS, eliminating the need for external frameworks like Tailwind CSS.

Project Structure
The entire application logic and UI are contained within a single file, src/App.jsx.

App.jsx: The main component that renders the entire user interface.

State Management: Uses React's useState hook to manage the cart, activeCategory, and isCartOpen states.

Memoization: Employs useMemo to optimize performance by caching filtered products, cart totals, and item counts. This prevents unnecessary re-calculations on every render.

Core Features
Product Display: A grid layout shows a list of mock products, each with a title, category, price, and an "Add to Cart" button.

Category Filtering: Users can click on category buttons to filter the displayed products. Clicking "All" shows all available items.

Dynamic Shopping Cart:

Clicking the shopping cart icon in the header opens a sidebar.

Items added to the cart are displayed in the sidebar with their names, prices, and quantities.

The cart total and item count are updated in real-time.

Users can increment or decrement the quantity of items in the cart.

Plain CSS Styling: All styling is embedded within the <style> tag of the main component. This ensures the app is self-contained and avoids common configuration issues.

Key Components
App: The root component. It manages the application state and renders all other components.

ProductCard: A component responsible for displaying a single product's information and the "Add to Cart" button.

CartSidebar: A component that handles the display and functionality of the shopping cart. It shows a list of cart items, the subtotal, and a checkout button.

CartItem: A component that displays a single item within the cart, including its image, name, price, and quantity controls.

SVG Icons: All icons (shopping cart, plus, minus, trash, and close) are included as self-contained SVG components.

How to Run the Project
Open your terminal.

Navigate to the root directory of your project.

Run the command: yarn start