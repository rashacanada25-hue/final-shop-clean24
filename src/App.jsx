import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [categories, setCategories] = useState([]); 
  
  const selectRef = useRef(null); 

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);
        
        const uniqueCats = [...new Set(data.products.map(p => p.category))];
        setCategories(uniqueCats);
      });

    // Auto-focus the select element on load
    if (selectRef.current) {
      selectRef.current.focus();
    }
  }, []);

  const handleFilter = (e) => {
    const category = e.target.value;
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(p => p.category === category);
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Product Catalog</h1>
      </header>

      <div className="filter-section">
        <label htmlFor="category-select">Filter by Category: </label>
        <select 
          id="category-select"
          ref={selectRef} 
          onChange={handleFilter}
        >
          <option value="all">All Products</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <main className="product-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="image-container">
              <img src={product.thumbnail} alt={product.title} />
            </div>
            <h3>{product.title}</h3>
            <p className="category-tag">{product.category}</p>
            <p className="price">${product.price}</p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;