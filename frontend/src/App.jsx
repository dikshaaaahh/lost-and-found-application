
import './App.css';
import ReportLost from './ReportLost';
import ReportFound from './ReportFound';
import Items from './Items';
import Register from './Register';
import Login from './Login';
import Chatbot from './Chatbot';
import MyReports from './MyReports';
import ForgotPassword from './ForgotPassword';

function App() {
  const loggedInUser = localStorage.getItem('loggedInUser');

  let userName = '';

  if (loggedInUser) {
    try {
      const user = JSON.parse(loggedInUser);
     userName = user.user?.name || '';
    } catch (error) {
      userName = '';
    }
  }

  // Decide which page should be displayed
  let page;

  if (window.location.pathname === '/report-lost') {
    if (!loggedInUser) {
      page = <Login />;
    } else {
      page = <ReportLost />;
    }
  } else if (window.location.pathname === '/report-found') {
    if (!loggedInUser) {
      page = <Login />;
    } else {
      page = <ReportFound />;
    }
  } else if (window.location.pathname === '/items') {
    page = <Items />;
  } else if (window.location.pathname === '/my-reports') {
    if (!loggedInUser) {
      page = <Login />;
    } else {
      page = <MyReports />;
    }
  } else if (window.location.pathname === '/register') {
    page = <Register />;
    } else if (window.location.pathname === '/login') {
    page = <Login />;
  } else if (window.location.pathname === '/forgot-password') {
    page = <ForgotPassword />;
  } else {
    page = (
      <div className="app">

        <nav className="navbar">
          <div className="logo">
            Lost & Found
          </div>

          <div className="nav-links">
            <a href="#home">Home</a>

            <a href="/items">Lost & Found Items</a>

            <a href="/report-found">Report Found</a>

            {loggedInUser && (
              <a href="/my-reports">My Reports</a>
            )}

            <a href="#about">About</a>

            {!loggedInUser && (
              <>
                <a href="/login">Login</a>
                <a href="/register">Register</a>
              </>
            )}

            {loggedInUser && userName && (
              <>
                <span>Hi, {userName} 👋</span>

                <button
                  onClick={() => {
                    localStorage.removeItem('loggedInUser');
                    localStorage.removeItem('token');
                    window.location.href = '/';
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>

        <section className="hero-section" id="home">
          <div className="hero-content">

            <h1>
              Lost something?
              <br />
              <span>Let's find it.</span>
            </h1>

            <p>
              Report lost items, report found items,
              and help reunite people with their belongings.
            </p>

            <div className="hero-buttons">

              <button
                className="primary-btn"
                onClick={() => {
                  if (loggedInUser) {
                    window.location.href = '/report-lost';
                  } else {
                    window.location.href = '/login';
                  }
                }}
              >
                Report Lost Item
              </button>

              <button
                className="secondary-btn"
                onClick={() => {
                  if (loggedInUser) {
                    window.location.href = '/report-found';
                  } else {
                    window.location.href = '/login';
                  }
                }}
              >
                Report Found Item
              </button>

            </div>

          </div>
        </section>

        <section id="items">
          <h2>Lost & Found Items</h2>
          <p>Items reported by users will appear here.</p>
        </section>

        <section id="about">
          <h2>About Lost & Found</h2>
          <p>
            This application helps people report and find lost belongings.
          </p>
        </section>

        <footer>
          <p>© 2026 Lost & Found Application</p>
        </footer>

      </div>
    );
  }

  return (
    <>
      {page}
      <Chatbot />
    </>
  );
}

export default App;

