import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  LogOut,
  Calendar,
  Heart,
  Trash2,
  X,
  CheckCircle,
} from "lucide-react";
import "./Id.css";

const Id = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activeTab, setActiveTab] = useState("bookings");
  const [editingBooking, setEditingBooking] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setTimeout(() => navigate("/login"), 100);
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setProfile({ ...data, email: user.email });
      setFormData({
        full_name: data.full_name || "",
        phone: data.phone || "",
        address: data.address || "",
      });
    } else {
      setProfile({ email: user.email });
    }

    await fetchBookings(user.id);
    await fetchWishlist(user.id);
    setLoading(false);
  };

  const fetchBookings = async (userId) => {
    const { data, error } = await supabase
      .from("service_bookings")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (data) setBookings(data);
  };

  const fetchWishlist = async (userId) => {
    const { data, error } = await supabase
      .from("wishlist")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (data) setWishlist(data);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: formData.full_name,
      phone: formData.phone,
      address: formData.address,
    });

    if (!error) {
      setProfile({
        ...profile,
        full_name: formData.full_name,
        phone: formData.phone,
        address: formData.address,
      });
      setEditing(false);
      alert("Profile updated successfully!");
    } else {
      alert("Error: " + error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
    window.location.reload();
  };

  // ===== Booking Delete =====
  const handleDeleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    const { error } = await supabase
      .from("service_bookings")
      .delete()
      .eq("id", id);

    if (!error) {
      setBookings(bookings.filter((b) => b.id !== id));
      alert("Booking deleted!");
    }
  };

  // ===== Booking Update =====
  const handleUpdateBooking = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("service_bookings")
      .update({
        full_name: editingBooking.full_name,
        service: editingBooking.service,
        preferred_date: editingBooking.preferred_date,
      })
      .eq("id", editingBooking.id);

    if (!error) {
      setBookings(
        bookings.map((b) =>
          b.id === editingBooking.id ? { ...editingBooking } : b
        )
      );
      setEditingBooking(null);
      alert("Booking updated successfully!");
    }
  };

  // ===== Wishlist Delete =====
  const handleDeleteWishlist = async (id) => {
    if (!window.confirm("Remove this car from wishlist?")) return;

    const { error } = await supabase.from("wishlist").delete().eq("id", id);

    if (!error) {
      setWishlist(wishlist.filter((w) => w.id !== id));
      alert("Removed from wishlist!");
    }
  };

  if (loading) {
    return (
      <div className="id-loading">Loading...</div>
    );
  }

  return (
    <section className="id-section">
      <div className="id-container">
        <h1>My Id</h1>

        {/* ===== Profile Card ===== */}
        {!editing ? (
          <div className="id-card">
            <div className="id-avatar">
              <User size={60} />
            </div>

            <div className="id-info">
              <div className="info-row">
                <User size={18} />
                <span>{profile?.full_name || "Not set"}</span>
              </div>

              <div className="info-row">
                <Mail size={18} />
                <span>{profile?.email || "Not set"}</span>
              </div>

              <div className="info-row">
                <Phone size={18} />
                <span>{profile?.phone || "Not set"}</span>
              </div>

              <div className="info-row">
                <MapPin size={18} />
                <span>{profile?.address || "Not set"}</span>
              </div>
            </div>

            <div className="id-actions">
              <button onClick={() => setEditing(true)} className="edit-btn">
                Edit Id
              </button>
              <button onClick={handleLogout} className="logout-btn">
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="id-edit-form">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={(e) =>
                setFormData({ ...formData, full_name: e.target.value })
              }
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <textarea
              placeholder="Address"
              rows="3"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
            <div className="form-actions">
              <button type="submit" className="save-btn">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* ===== Tabs: Bookings & Wishlist ===== */}
        <div className="tabs">
          <button
            className={activeTab === "bookings" ? "active" : ""}
            onClick={() => setActiveTab("bookings")}
          >
            <Calendar size={18} /> My Bookings ({bookings.length})
          </button>
          <button
            className={activeTab === "wishlist" ? "active" : ""}
            onClick={() => setActiveTab("wishlist")}
          >
            <Heart size={18} /> Wishlist ({wishlist.length})
          </button>
        </div>

        {/* ===== Bookings List ===== */}
        {activeTab === "bookings" && (
          <div className="bookings-list">
            {bookings.length === 0 ? (
              <div className="empty-state">
                <Calendar size={50} />
                <p>No bookings yet</p>
              </div>
            ) : (
              bookings.map((booking) => (
                <div key={booking.id} className="booking-card">
                  {editingBooking?.id === booking.id ? (
                    /* ===== Edit Booking Form ===== */
                    <form
                      onSubmit={handleUpdateBooking}
                      className="booking-edit-form"
                    >
                      <input
                        type="text"
                        value={editingBooking.full_name}
                        onChange={(e) =>
                          setEditingBooking({
                            ...editingBooking,
                            full_name: e.target.value,
                          })
                        }
                        placeholder="Full Name"
                      />
                      <select
                        value={editingBooking.service}
                        onChange={(e) =>
                          setEditingBooking({
                            ...editingBooking,
                            service: e.target.value,
                          })
                        }
                      >
                        <option value="daily">Daily Rental</option>
                        <option value="long-term">Long-Term Rental</option>
                        <option value="airport">Airport Transfer</option>
                        <option value="chauffeur">Chauffeur Service</option>
                        <option value="luxury">Luxury Rental</option>
                        <option value="corporate">Corporate Rental</option>
                      </select>
                      <input
                        type="date"
                        value={editingBooking.preferred_date}
                        onChange={(e) =>
                          setEditingBooking({
                            ...editingBooking,
                            preferred_date: e.target.value,
                          })
                        }
                      />
                      <div className="booking-edit-actions">
                        <button type="submit" className="save-btn">
                          <CheckCircle size={16} /> Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingBooking(null)}
                          className="cancel-btn"
                        >
                          <X size={16} /> Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* ===== Booking View ===== */
                    <>
                      <div className="booking-info">
                        <h3>{booking.full_name}</h3>
                        <p>
                          <strong>Service:</strong>{" "}
                          {booking.service?.replace(/-/g, " ")}
                        </p>
                        <p>
                          <strong>Date:</strong>{" "}
                          {new Date(booking.preferred_date).toLocaleDateString()}
                        </p>
                        {booking.email && (
                          <p>
                            <strong>Email:</strong> {booking.email}
                          </p>
                        )}
                        <p className="booking-date">
                          Booked on:{" "}
                          {new Date(booking.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="booking-actions">
                        <button
                          onClick={() => setEditingBooking(booking)}
                          className="edit-small-btn"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteBooking(booking.id)}
                          className="delete-small-btn"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* ===== Wishlist List ===== */}
        {activeTab === "wishlist" && (
          <div className="wishlist-list">
            {wishlist.length === 0 ? (
              <div className="empty-state">
                <Heart size={50} />
                <p>Your wishlist is empty</p>
              </div>
 
            ) : (
              wishlist.map((item) => (
                <div key={item.id} className="wishlist-card">
                  {item.car_image && (
                    <img
                      src={item.car_image}
                      alt={item.car_name}
                      className="wishlist-image"
                    />
                  )}
                  <div className="wishlist-info">
                    <h3>{item.car_name}</h3>
                    {item.price && <p className="price">{item.price}</p>}
                    <p className="added-date">
                      Added on:{" "}
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteWishlist(item.id)}
                    className="delete-small-btn"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Id;