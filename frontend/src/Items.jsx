import { useEffect, useState } from 'react';
import './Items.css';

function Items() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/items')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        return response.json();
      })
      .then((data) => {
        console.log('ITEMS FROM BACKEND:', data);
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('ERROR:', error);
        setLoading(false);
      });
  }, []);

  const filteredItems = items.filter((item) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      item.itemName?.toLowerCase().includes(searchText) ||
      item.category?.toLowerCase().includes(searchText) ||
      item.description?.toLowerCase().includes(searchText) ||
      item.location?.toLowerCase().includes(searchText);

    const matchesFilter =
      filter === 'ALL' ||
      item.status?.toUpperCase() === filter;

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="items-page">
        <div className="loading-box">
          <h2>Loading items...</h2>
          <p>Please wait while we fetch the latest reports.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="items-page">

      <div className="items-header">
        <h1>Lost & Found Items</h1>

        <p>
          Browse items reported by users and help reunite them
          with their owners.
        </p>
      </div>

      <div className="items-controls">

        <input
          type="text"
          className="search-box"
          placeholder="🔎 Search item, category, description or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="filter-buttons">

          <button
            className={filter === 'ALL' ? 'active' : ''}
            onClick={() => setFilter('ALL')}
          >
            All Items
          </button>

          <button
            className={filter === 'LOST' ? 'active lost-btn' : ''}
            onClick={() => setFilter('LOST')}
          >
            🔴 Lost
          </button>

          <button
            className={filter === 'FOUND' ? 'active found-btn' : ''}
            onClick={() => setFilter('FOUND')}
          >
            🟢 Found
          </button>

        </div>

      </div>

      <div className="items-count">
        Showing <strong>{filteredItems.length}</strong> item(s)
      </div>

      <div className="items-grid">

        {filteredItems.length === 0 ? (
          <div className="no-items">
            <h2>No items found 🔍</h2>
            <p>Try a different search or filter.</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div className="item-card" key={item.id}>

              <div className="card-top">
                <span
                  className={`item-status ${item.status?.toLowerCase()}`}
                >
                  {item.status === 'LOST' ? '🔴 LOST' : '🟢 FOUND'}
                </span>
              </div>

              <h2>{item.itemName}</h2>

              <p className="description">
                {item.description}
              </p>

              <div className="item-details">

                {/* Category */}
                <div className="detail-box">
                  <span>📂</span>
                  <div>
                    <strong>Category</strong>
                    <p>
                      {item.category || 'Not specified'}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="detail-box location-box">
                  <span>📍</span>

                  <div>
                    <strong>Location</strong>
                    <p>
                      {item.location || 'Location not available'}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="detail-box">
                  <span>📅</span>

                  <div>
                    <strong>Date</strong>
                    <p>
                      {item.itemDate || 'Date not available'}
                    </p>
                  </div>
                </div>

                {/* Contact */}
                <div className="detail-box">
                  <span>📞</span>

                  <div>
                    <strong>Contact</strong>
                    <p>
                      {item.contact || 'Contact not available'}
                    </p>
                  </div>
                </div>

                {/* Reported By */}
                <div className="detail-box">
                  <span>👤</span>

                  <div>
                    <strong>Reported By</strong>
                    <p>
                      {item.reportedBy || 'User'}
                    </p>
                  </div>
                </div>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Items;