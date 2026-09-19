import { useEffect, useState } from 'react';
import './Items.css';

function MyReports() {


  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const loggedInData = JSON.parse(
  localStorage.getItem('loggedInUser')
);

const loggedInUser = loggedInData?.user;

  useEffect(() => {
    if (!loggedInUser?.name) {
      setLoading(false);
      return;
    }

    

    const token = localStorage.getItem('token');

    fetch(
      `http://localhost:8080/api/items/my-reports?name=${encodeURIComponent(
        loggedInUser.name
      )}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        

        if (!response.ok) {
          throw new Error('Failed to fetch reports');
        }

        return response.json();
      })
      .then((data) => {
       
        setReports(data);
        setLoading(false);
      })
      .catch((error) => {
        
        setLoading(false);
      });
  }, [loggedInUser?.name]);

  if (loading) {
    return (
      <div className="items-page">
        <div className="loading-box">
          <h2>Loading your reports...</h2>
          <p>Please wait.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="items-page">

      <div className="items-header">
        <h1>My Reports</h1>
        <p>
          View all the lost and found items you have reported.
        </p>
      </div>

      <div className="items-count">
        Showing <strong>{reports.length}</strong> report(s)
      </div>

      <div className="items-grid">

        {reports.length === 0 ? (
          <div className="no-items">
            <h2>No reports found 🔍</h2>
            <p>You haven't reported any items yet.</p>
          </div>
        ) : (
          reports.map((item) => (
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

                <div className="detail-box location-box">
                  <span>📍</span>
                  <div>
                    <strong>Location</strong>
                    <p>
                      {item.location || 'Location not available'}
                    </p>
                  </div>
                </div>

                <div className="detail-box">
                  <span>📅</span>
                  <div>
                    <strong>Date</strong>
                    <p>
                      {item.itemDate || 'Date not available'}
                    </p>
                  </div>
                </div>

                <div className="detail-box">
                  <span>🏷️</span>
                  <div>
                    <strong>Category</strong>
                    <p>
                      {item.category || 'Category not available'}
                    </p>
                  </div>
                </div>

                <div className="detail-box">
                  <span>📞</span>
                  <div>
                    <strong>Contact</strong>
                    <p>
                      {item.contact || 'Contact not available'}
                    </p>
                  </div>
                </div>

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

export default MyReports;