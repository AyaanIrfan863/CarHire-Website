import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import {
  LayoutDashboard,
  Car,
  Wrench,
  MessageSquare,
  Heart,
  Users,
  LogOut,
  Trash2,
  Edit2,
  X,
  TrendingUp,
  Calendar,
  Search,
} from "lucide-react";
import "./Admin.css";

const ADMIN_EMAIL = "ayaanirfan752@gmail.com";

const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");

  const [bookings, setBookings] = useState([]);
  const [serviceBookings, setServiceBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [profiles, setProfiles] = useState([]);

  const [editModal, setEditModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    setUser(user);

    if (user.email === ADMIN_EMAIL) {
      setIsAdmin(true);
      fetchAllData();
    }

    setLoading(false);
  };

  const fetchAllData = async () => {
    fetchBookings();
    fetchServiceBookings();
    fetchContacts();
    fetchWishlist();
    fetchProfiles();
  };

  const fetchBookings = async () => {
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setBookings(data);
  };

  const fetchServiceBookings = async () => {
    const { data } = await supabase
      .from("service_bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setServiceBookings(data);
  };

  const fetchContacts = async () => {
    const { data } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setContacts(data);
  };

  const fetchWishlist = async () => {
    const { data } = await supabase
      .from("wishlist")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setWishlist(data);
  };

  const fetchProfiles = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setProfiles(data);
  };

  const handleDelete = async (table, id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    const { error } = await supabase.from(table).delete().eq("id", id);

    if (!error) {
      alert("Deleted successfully!");
      fetchAllData();
    } else {
      alert("Delete failed: " + error.message);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { table, id } = editModal;
    const updateData = {};

    Object.keys(editModal).forEach((key) => {
      if (!["id", "created_at", "user_id", "table"].includes(key)) {
        updateData[key] = formData.get(key);
      }
    });

    const { error } = await supabase.from(table).update(updateData).eq("id", id);

    if (!error) {
      alert("Updated successfully!");
      setEditModal(null);
      fetchAllData();
    } else {
      alert("Update failed: " + error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loader"></div>
        <p>Loading Admin Panel...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-access-denied">
        <div className="denied-card">
          <h1>Access Denied</h1>
          <p>You don't have permission to access this page.</p>
          <p className="denied-email">Logged in as: {user?.email}</p>
          <button onClick={() => navigate("/")} className="denied-btn">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const totalBookings = bookings.length;
  const totalServiceBookings = serviceBookings.length;
  const totalContacts = contacts.length;
  const totalWishlist = wishlist.length;
  const totalUsers = profiles.length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.total || 0), 0);

  const getMonthlyData = () => {
    const months = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        month: d.toLocaleString("default", { month: "short" }),
        bookings: 0,
        services: 0,
        contacts: 0,
      });
    }

    bookings.forEach((b) => {
      if (b.created_at) {
        const d = new Date(b.created_at);
        const diff =
          (now.getFullYear() - d.getFullYear()) * 12 +
          (now.getMonth() - d.getMonth());
        if (diff >= 0 && diff < 6) {
          months[5 - diff].bookings++;
        }
      }
    });

    serviceBookings.forEach((b) => {
      if (b.created_at) {
        const d = new Date(b.created_at);
        const diff =
          (now.getFullYear() - d.getFullYear()) * 12 +
          (now.getMonth() - d.getMonth());
        if (diff >= 0 && diff < 6) {
          months[5 - diff].services++;
        }
      }
    });

    contacts.forEach((c) => {
      if (c.created_at) {
        const d = new Date(c.created_at);
        const diff =
          (now.getFullYear() - d.getFullYear()) * 12 +
          (now.getMonth() - d.getMonth());
        if (diff >= 0 && diff < 6) {
          months[5 - diff].contacts++;
        }
      }
    });

    return months;
  };

  const monthlyData = getMonthlyData();
  const maxMonthly = Math.max(
    ...monthlyData.map((m) => Math.max(m.bookings, m.services, m.contacts)),
    1
  );

  const serviceDistribution = () => {
    const dist = {};
    serviceBookings.forEach((b) => {
      const s = b.service || "Unknown";
      dist[s] = (dist[s] || 0) + 1;
    });
    return Object.entries(dist).map(([name, value]) => ({ name, value }));
  };

  const pieData = serviceDistribution();
  const totalPie = pieData.reduce((sum, p) => sum + p.value, 0) || 1;
  const pieColors = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#3b82f6",
    "#a855f7",
    "#ec4899",
  ];

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "bookings", label: "Car Bookings", icon: Car, count: totalBookings },
    { id: "services", label: "Service Bookings", icon: Wrench, count: totalServiceBookings },
    { id: "contacts", label: "Messages", icon: MessageSquare, count: totalContacts },
    { id: "wishlist", label: "Wishlist", icon: Heart, count: totalWishlist },
    { id: "profiles", label: "Users", icon: Users, count: totalUsers },
  ];

  const filterData = (data, fields) => {
    if (!searchQuery) return data;
    return data.filter((item) =>
      fields.some((field) =>
        String(item[field] || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
  };

  const renderTable = (data, columns, table) => {
    const filtered = filterData(data, columns.map((c) => c.key));
    if (filtered.length === 0) {
      return <div className="no-data">No records found</div>;
    }
    return (
      <div className="admin-table-wrapper">
        <div className="admin-table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                {columns.map((c) => (
                  <th key={c.key}>{c.label}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  {columns.map((c) => (
                    <td key={c.key}>{formatValue(item[c.key], c.type)}</td>
                  ))}
                  <td>
                    <div className="table-actions">
                      <button
                        className="action-btn edit"
                        onClick={() => setEditModal({ ...item, table })}
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(table, item.id)}
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const formatValue = (value, type) => {
    if (value === null || value === undefined) return "—";
    if (type === "date") return new Date(value).toLocaleDateString();
    if (type === "datetime") return new Date(value).toLocaleString();
    if (type === "currency") return "PKR " + Number(value).toLocaleString();
    if (type === "truncate")
      return (
        String(value).substring(0, 50) +
        (String(value).length > 50 ? "..." : "")
      );
    return String(value);
  };

  // ===== Professional Area Chart SVG =====
  const renderAreaChart = () => {
    const w = 540;
    const h = 240;
    const padding = 40;

    const points = (data) =>
      data.map((m, i) => ({
        x: padding + (i * w) / 5,
        y: h - (m / maxMonthly) * (h - 20) + 10,
      }));

    const smoothPath = (pts) => {
      if (pts.length < 2) return "";
      let d = `M ${pts[0].x},${pts[0].y}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const cp1x = pts[i].x + (pts[i + 1].x - pts[i].x) / 2;
        const cp1y = pts[i].y;
        const cp2x = pts[i].x + (pts[i + 1].x - pts[i].x) / 2;
        const cp2y = pts[i + 1].y;
        d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${pts[i + 1].x},${pts[i + 1].y}`;
      }
      return d;
    };

    const bookingsPts = points(monthlyData.map((m) => m.bookings));
    const servicesPts = points(monthlyData.map((m) => m.services));
    const contactsPts = points(monthlyData.map((m) => m.contacts));

    return (
      <div className="area-chart-container">
        <svg viewBox="0 0 600 280" className="area-chart" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grad-bookings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="grad-services" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="grad-contacts" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 60, 120, 180, 240].map((y, i) => (
            <line
              key={i}
              x1="40"
              y1={y + 10}
              x2="580"
              y2={y + 10}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}

          {/* Y-axis labels */}
          {[0, 60, 120, 180, 240].map((y, i) => (
            <text
              key={i}
              x="30"
              y={y + 14}
              fill="rgba(255,255,255,0.4)"
              fontSize="10"
              textAnchor="end"
            >
              {Math.round((maxMonthly * (4 - i)) / 4)}
            </text>
          ))}

          {/* Area paths */}
          <path
            d={`${smoothPath(bookingsPts)} L ${bookingsPts[bookingsPts.length - 1].x},250 L ${bookingsPts[0].x},250 Z`}
            fill="url(#grad-bookings)"
          />
          <path
            d={smoothPath(bookingsPts)}
            fill="none"
            stroke="#ef4444"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          <path
            d={`${smoothPath(servicesPts)} L ${servicesPts[servicesPts.length - 1].x},250 L ${servicesPts[0].x},250 Z`}
            fill="url(#grad-services)"
          />
          <path
            d={smoothPath(servicesPts)}
            fill="none"
            stroke="#f97316"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          <path
            d={`${smoothPath(contactsPts)} L ${contactsPts[contactsPts.length - 1].x},250 L ${contactsPts[0].x},250 Z`}
            fill="url(#grad-contacts)"
          />
          <path
            d={smoothPath(contactsPts)}
            fill="none"
            stroke="#22c55e"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Data points */}
          {bookingsPts.map((p, i) => (
            <g key={`b-${i}`} className="chart-point">
              <circle
                cx={p.x}
                cy={p.y}
                r="4"
                fill="#ef4444"
                stroke="#0a0a0f"
                strokeWidth="2"
              />
              <text
                x={p.x}
                y={p.y - 10}
                fill="#fff"
                fontSize="10"
                textAnchor="middle"
                className="chart-tooltip"
              >
                {monthlyData[i].bookings}
              </text>
            </g>
          ))}
          {servicesPts.map((p, i) => (
            <circle
              key={`s-${i}`}
              cx={p.x}
              cy={p.y}
              r="3.5"
              fill="#f97316"
              stroke="#0a0a0f"
              strokeWidth="2"
            />
          ))}
          {contactsPts.map((p, i) => (
            <circle
              key={`c-${i}`}
              cx={p.x}
              cy={p.y}
              r="3.5"
              fill="#22c55e"
              stroke="#0a0a0f"
              strokeWidth="2"
            />
          ))}

          {/* X-axis labels */}
          {monthlyData.map((m, i) => (
            <text
              key={i}
              x={40 + (i * 540) / 5}
              y="270"
              fill="rgba(255,255,255,0.6)"
              fontSize="11"
              textAnchor="middle"
              fontWeight="600"
            >
              {m.month}
            </text>
          ))}
        </svg>
      </div>
    );
  };

  // ===== Professional Donut Chart SVG =====
  const renderDonutChart = () => {
    if (pieData.length === 0) {
      return <div className="no-data">No service bookings yet</div>;
    }

    return (
      <div className="donut-container">
        <div className="donut-chart">
          <svg viewBox="0 0 200 200">
            {(() => {
              let offset = 0;
              return pieData.map((slice, i) => {
                const percentage = (slice.value / totalPie) * 100;
                const dash = (percentage / 100) * 251.2;
                const circle = (
                  <circle
                    key={i}
                    cx="100"
                    cy="100"
                    r="40"
                    fill="transparent"
                    stroke={pieColors[i % pieColors.length]}
                    strokeWidth="20"
                    strokeDasharray={`${dash} 251.2`}
                    strokeDashoffset={-offset}
                    className="donut-segment"
                  />
                );
                offset += dash;
                return circle;
              });
            })()}
          </svg>
          <div className="donut-center">
            <h4>{totalPie}</h4>
            <p>Total Services</p>
          </div>
        </div>

        <div className="donut-legend">
          {pieData.map((slice, i) => {
            const pct = ((slice.value / totalPie) * 100).toFixed(1);
            return (
              <div key={i} className="donut-legend-item">
                <div className="legend-left">
                  <span
                    className="legend-dot"
                    style={{ background: pieColors[i % pieColors.length] }}
                  ></span>
                  <span className="legend-label">{slice.name}</span>
                </div>
                <div className="legend-right">
                  <span className="legend-value">{slice.value}</span>
                  <span className="legend-percent">{pct}%</span>
                </div>
                <div className="legend-bar">
                  <div
                    className="legend-bar-fill"
                    style={{
                      width: `${pct}%`,
                      background: pieColors[i % pieColors.length],
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="admin-panel">
      {/* ===== Sidebar ===== */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <p>Car Hire</p>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${currentView === item.id ? "active" : ""}`}
                onClick={() => {
                  setCurrentView(item.id);
                  setSearchQuery("");
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.count !== undefined && (
                  <span className="nav-badge">{item.count}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1>
              {menuItems.find((m) => m.id === currentView)?.label || "Dashboard"}
            </h1>
            <p>Welcome back, {user?.email}</p>
          </div>

          {currentView !== "dashboard" && (
            <div className="search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
        </header>

        <div className="admin-content">
          {/* ===== Dashboard View ===== */}
          {currentView === "dashboard" && (
            <>
              {/* Stats Cards */}
              <div className="stats-grid">
                <div className="stat-card red">
                  <div className="stat-icon">
                    <Car size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{totalBookings}</h3>
                    <p>Car Bookings</p>
                  </div>
                </div>

                <div className="stat-card orange">
                  <div className="stat-icon">
                    <Wrench size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{totalServiceBookings}</h3>
                    <p>Service Bookings</p>
                  </div>
                </div>

                <div className="stat-card green">
                  <div className="stat-icon">
                    <MessageSquare size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{totalContacts}</h3>
                    <p>Messages</p>
                  </div>
                </div>

                <div className="stat-card blue">
                  <div className="stat-icon">
                    <Users size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{totalUsers}</h3>
                    <p>Total Users</p>
                  </div>
                </div>

                <div className="stat-card purple">
                  <div className="stat-icon">
                    <Heart size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{totalWishlist}</h3>
                    <p>Wishlist Items</p>
                  </div>
                </div>

                <div className="stat-card pink">
                  <div className="stat-icon">
                    <TrendingUp size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>PKR {totalRevenue.toLocaleString()}</h3>
                    <p>Total Revenue</p>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="charts-grid">
                {/* Area Chart */}
                <div className="chart-card">
                  <div className="chart-header">
                    <div>
                      <h3>Last 6 Months Activity</h3>
                      <p className="chart-subtitle">Booking trends over time</p>
                    </div>
                    <div className="chart-trend">
                      <TrendingUp size={14} />
                      <span>+24%</span>
                    </div>
                  </div>
                  {renderAreaChart()}
                  <div className="chart-legend">
                    <div className="legend-item">
                      <span className="legend-dot" style={{ background: "#ef4444" }}></span>
                      Bookings
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot" style={{ background: "#f97316" }}></span>
                      Services
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot" style={{ background: "#22c55e" }}></span>
                      Contacts
                    </div>
                  </div>
                </div>

                {/* Donut Chart */}
                <div className="chart-card">
                  <div className="chart-header">
                    <div>
                      <h3>Service Distribution</h3>
                      <p className="chart-subtitle">By category</p>
                    </div>
                    <div className="chart-icon-wrap">
                      <Wrench size={18} />
                    </div>
                  </div>
                  {renderDonutChart()}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="recent-section">
                <h3>Recent Bookings</h3>
                {bookings.length > 0 ? (
                  <div className="recent-list">
                    {bookings.slice(0, 5).map((b) => (
                      <div key={b.id} className="recent-item">
                        <div className="recent-info">
                          <h4>{b.car_name}</h4>
                          <p>{b.customer_name} • {b.phone}</p>
                        </div>
                        <div className="recent-meta">
                          <span className="recent-price">PKR {b.total?.toLocaleString()}</span>
                          <span className="recent-date">
                            {new Date(b.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-data">No bookings yet</div>
                )}
              </div>
            </>
          )}

          {/* ===== Bookings View ===== */}
          {currentView === "bookings" &&
            renderTable(
              bookings,
              [
                { key: "car_name", label: "Car" },
                { key: "customer_name", label: "Customer" },
                { key: "phone", label: "Phone" },
                { key: "pickup_date", label: "Pickup", type: "date" },
                { key: "return_date", label: "Return", type: "date" },
                { key: "days", label: "Days" },
                { key: "total", label: "Total", type: "currency" },
                { key: "created_at", label: "Booked On", type: "date" },
              ],
              "bookings"
            )}

          {/* ===== Service Bookings View ===== */}
          {currentView === "services" &&
            renderTable(
              serviceBookings,
              [
                { key: "full_name", label: "Name" },
                { key: "email", label: "Email" },
                { key: "service", label: "Service" },
                { key: "preferred_date", label: "Date", type: "date" },
                { key: "created_at", label: "Booked On", type: "date" },
              ],
              "service_bookings"
            )}

          {/* ===== Contacts View ===== */}
          {currentView === "contacts" &&
            renderTable(
              contacts,
              [
                { key: "name", label: "Name" },
                { key: "email", label: "Email" },
                { key: "message", label: "Message", type: "truncate" },
                { key: "created_at", label: "Date", type: "datetime" },
              ],
              "contact_messages"
            )}

          {/* ===== Wishlist View ===== */}
          {currentView === "wishlist" &&
            renderTable(
              wishlist,
              [
                { key: "car_name", label: "Car" },
                { key: "rent", label: "Rent", type: "currency" },
                { key: "created_at", label: "Added On", type: "date" },
              ],
              "wishlist"
            )}

          {/* ===== Profiles View ===== */}
          {currentView === "profiles" &&
            renderTable(
              profiles,
              [
                { key: "full_name", label: "Name" },
                { key: "phone", label: "Phone" },
                { key: "address", label: "Address", type: "truncate" },
                { key: "created_at", label: "Joined", type: "date" },
              ],
              "profiles"
            )}
        </div>
      </main>

      {/* ===== Edit Modal ===== */}
      {editModal && (
        <div className="modal-overlay" onClick={() => setEditModal(null)}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Record</h2>
              <button onClick={() => setEditModal(null)} className="close-btn">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="edit-form">
              {Object.keys(editModal)
                .filter(
                  (key) =>
                    !["id", "created_at", "user_id", "table"].includes(key)
                )
                .map((key) => (
                  <div key={key} className="form-group">
                    <label>{key.replace(/_/g, " ").toUpperCase()}</label>
                    <input
                      type="text"
                      name={key}
                      defaultValue={editModal[key] || ""}
                    />
                  </div>
                ))}
              <div className="modal-actions">
                <button type="button" onClick={() => setEditModal(null)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
