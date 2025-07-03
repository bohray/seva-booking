import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Navbar.module.css";
import { clearCart } from "../../store/Cart/cartSlice";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [latestOrders, setLatestOrders] = useState([]);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("seva_user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Fetch latest 3 orders
      axios
        .get(`/api/orders/user/${parsedUser._id}`)
        .then((res) => {
          if (res.data) {
            const recent = res.data.slice(-3).reverse();
            setLatestOrders(recent);
          }
        })
        .catch((err) => console.error("Failed to load orders", err));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("seva_user");
    dispatch(clearCart());
    window.location.reload();
  };

  return (
    <nav className={styles.navbar}>
      <div>
        <h1>Seva Bookings</h1>
      </div>
      <div className={styles.navOptions}>
        <Link to="/" className={styles.customLink}>
          Home
        </Link>
        <Link to="/cart" className={styles.customLink}>
          Cart ({cartItems.length})
        </Link>
        <div
          className={styles.userSection}
          onMouseEnter={() => setShowUserDropdown(true)}
          onMouseLeave={() => setShowUserDropdown(false)}
        >
          <span className={styles.userIcon}>User</span>

          {showUserDropdown && (
            <div className={styles.dropdown}>
              <div className={styles.userInfo}>
                <p>
                  <strong>{user.name}</strong>
                </p>
                <p>{user.email}</p>
                <p>{user.contact}</p>
              </div>

              <hr />

              <div className={styles.latestOrders}>
                <strong>Latest 3 orders</strong>
                {latestOrders.length < 3 ? (
                  <p>No Orders Present</p>
                ) : (
                  <ul>
                    {latestOrders.map((order) => (
                      <li key={order._id}>Order #{order._id.slice(-5)}</li>
                    ))}
                  </ul>
                )}
              </div>

              <button onClick={handleLogout} className={styles.logoutBtn}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
