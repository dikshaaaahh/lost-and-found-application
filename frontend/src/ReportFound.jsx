import { useState } from 'react';
import './ReportFound.css';

function ReportFound() {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [place, setPlace] = useState('');
  const [city, setCity] = useState('');
  const [exactLocation, setExactLocation] = useState('');
  const [itemDate, setItemDate] = useState('');
  const [contact, setContact] = useState('');

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullLocation = `${place}, ${city} - ${exactLocation}`;

    const item = {
      itemName,
      category,
      description,
      location: fullLocation,
      status: 'FOUND',
      itemDate,
      contact,
      reportedBy: loggedInUser?.name
    };

    try {
      const response = await fetch('http://localhost:8080/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      });

      if (response.ok) {
        alert('Found item reported successfully! 🎉');

        setItemName('');
        setCategory('');
        setDescription('');
        setPlace('');
        setCity('');
        setExactLocation('');
        setItemDate('');
        setContact('');

      } else {
        const errorText = await response.text();
        console.log('SERVER STATUS:', response.status);
        console.log('SERVER RESPONSE:', errorText);
        alert('Failed: ' + response.status);
      }

    } catch (error) {
      console.error(error);
      alert('Could not connect to the server.');
    }
  };

  return (
    <div className="report-page">
      <div className="report-card">

        <h1>Report Found Item</h1>

        <p>
          Tell us about the item you found.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Item Name</label>
          <input
            type="text"
            placeholder="e.g. Black Wallet"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />

          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Documents">Documents</option>
            <option value="Wallet">Wallet</option>
            <option value="Keys">Keys</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Accessories">Accessories</option>
            <option value="Other">Other</option>
          </select>

          <label>Description</label>
          <textarea
            placeholder="Describe the item you found..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <label>Place / Area</label>
          <input
            type="text"
            placeholder="e.g. LNCT College"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            required
          />

          <label>City</label>
          <input
            type="text"
            placeholder="e.g. Bhopal"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />

          <label>Exact Location Details</label>
          <input
            type="text"
            placeholder="e.g. Near CSE Department, 2nd Floor"
            value={exactLocation}
            onChange={(e) => setExactLocation(e.target.value)}
            required
          />

          <label>Date Found</label>
          <input
            type="date"
            value={itemDate}
            onChange={(e) => setItemDate(e.target.value)}
            required
          />

          <label>Contact</label>
          <input
            type="text"
            placeholder="Enter your phone number or email"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />

          <button type="submit">
            Submit Found Item
          </button>

        </form>

      </div>
    </div>
  );
}

export default ReportFound;