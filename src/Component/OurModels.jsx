import { useLayoutEffect, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight, Heart, X, ChevronRight, Check } from "lucide-react";

import { supabase } from "../supabaseClient";
import "./OurModels.css";

const CARS = [
  {
    id: "CH-01",
    name: "Lamborghini Huracán EVO",
    cat: "Sports",
    tags: ["Sports", "Luxury"],
    rent: 250000,
    rating: 5.0,
    reviews: 92,
    img: "https://i.pinimg.com/736x/a5/69/49/a569490c5bd1a43df34e5b5d78e1df18.jpg",
    gallery: [
      "https://i.pinimg.com/736x/de/10/22/de102269daabfb06dd690e87336d8501.jpg",
      "https://i.pinimg.com/1200x/5f/5e/0b/5f5e0b7683aee3aae1f7dbe41db27b4e.jpg",
      "https://i.pinimg.com/736x/0b/bc/67/0bbc6702fc8ab36aa94e0dc20230458b.jpg",
      "https://i.pinimg.com/1200x/4f/79/72/4f7972c105c4d27d20e1a38d722f4aed.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ULdRfsiiq_9paUylB0g4UoOSlYo1ruJ1eAl9FvK3jULiNVmwsSzVwGg&s=10",
      "https://i.pinimg.com/1200x/04/ca/82/04ca820f4aad607aa09b5900ea7f2fc4.jpg",
    ],
    desc: "A 640-horsepower V10 with launch control and a soundtrack to match — our most requested supercar for film shoots, groom arrivals and once-in-a-lifetime drives. Delivered with a professional chauffeur.",
  },
  {
    id: "CH-02",
    name: "Porsche 911 Carrera S",
    cat: "Sports",
    tags: ["Sports", "Luxury"],
    rent: 180000,
    rating: 4.9,
    reviews: 134,
    img: "https://i.pinimg.com/1200x/03/af/b2/03afb2510ded7e29e37035db10ea5240.jpg",
    gallery: [
      "https://i.pinimg.com/1200x/18/54/1a/18541adff5e63a8bc4c3aae6afc8d6ba.jpg",
      "https://i.pinimg.com/1200x/f0/75/2a/f0752a69d3e94c68426ed0a3fd31969a.jpg",
      "https://i.pinimg.com/736x/37/56/78/375678707b17e544371bfe8c97dcfd1d.jpg",
      "https://i.pinimg.com/1200x/18/a8/34/18a834722ed898ca39f406fe31680861.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHUUG8L-RIAM8cwkOq7g6yfP_wc4FXCMH3R98kzC3Fal4wZ6HBhWimFc0&s=10",
      "https://i.pinimg.com/1200x/6a/0b/a4/6a0ba43f9535be6769372fd5cf63f9b3.jpg",
    ],
    desc: "The benchmark sports car — 443 horsepower, rear-engine balance and genuine everyday usability. Equally at home on the motorway and outside a five-star porch.",
  },
  {
    id: "CH-03",
    name: "Nissan GT-R Nismo",
    cat: "Sports",
    tags: ["Sports"],
    rent: 120000,
    rating: 4.8,
    reviews: 156,
    img: "https://i.pinimg.com/1200x/fb/c4/eb/fbc4eb809b989038ec4fd0c02384dea4.jpg",
    gallery: [
      "https://i.pinimg.com/736x/88/b3/06/88b306b28e37889439787607ced0afe5.jpg",
      "https://i.pinimg.com/1200x/d3/cf/b0/d3cfb06c034ecbfdccfcf80f73accdd4.jpg",
      "https://i.pinimg.com/736x/9c/d0/a3/9cd0a36911ae15ab9232a596b31d3fe5.jpg",
      "https://i.pinimg.com/1200x/79/18/6a/79186a0cd22ded3e86769ad6304f27fc.jpg",
      "https://i.pinimg.com/1200x/6d/4f/1a/6d4f1a7bb66a24ba7a6ef6bc1a17efe7.jpg",
      "https://i.pinimg.com/1200x/9c/be/97/9cbe973d24904654b82fa9b81405be88.jpg",
    ],
    desc: "Godzilla. Twin-turbo V6, AWD launch control and a legend's reputation — the rawest, loudest experience in our sports line.",
  },
  {
    id: "CH-04",
    name: "Mercedes-Benz S-Class",
    cat: "Sedan",
    tags: ["Sedan", "Luxury"],
    rent: 90000,
    rating: 4.9,
    reviews: 210,
    img: "https://i.pinimg.com/736x/ff/33/24/ff3324a6a6510985133ef6d9526f31a8.jpg",
    gallery: [
      "https://i.pinimg.com/1200x/e9/e9/b4/e9e9b4f0bb6605eb6ccf68fe9516cc0a.jpg",
      "https://i.pinimg.com/736x/ca/48/2b/ca482ba4e41f4829e64d63f191460572.jpg",
      "https://i.pinimg.com/736x/0f/f4/04/0ff40424f45fa09fadf4396e05a5cde4.jpg",
      "https://i.pinimg.com/736x/47/8e/99/478e99fcb69a627e20de321f78a4688b.jpg",
      "https://i.pinimg.com/1200x/e3/5d/ce/e35dcebb6009d5c0c454f1ac6206a400.jpg",
      "https://i.pinimg.com/736x/f6/9a/d7/f69ad7c62319cce5bb4ebc4fca4cd790.jpg",
    ],
    desc: "The executive standard — massaging rear seats, near-silence at speed and a chauffeur who knows the city by heart. Our most requested VIP transfer car.",
  },
  {
    id: "CH-05",
    name: "BMW 7 Series",
    cat: "Sedan",
    tags: ["Sedan", "Luxury"],
    rent: 85000,
    rating: 4.8,
    reviews: 176,
    img: "https://i.pinimg.com/736x/35/d5/b2/35d5b28e54ce5277da445265f99ebf49.jpg",
    gallery: [
      "https://i.pinimg.com/1200x/13/50/db/1350dbc86c99f6dd7f81a8eb063024e8.jpg",
      "https://i.pinimg.com/1200x/d1/e1/5b/d1e15bc1ed65485f670405a1d6e78fa9.jpg",
      "https://i.pinimg.com/1200x/ef/af/57/efaf572d0cf136012b216a1d584af480.jpg",
      "https://i.pinimg.com/736x/e3/16/20/e31620192c63d9e2cf5706cf70e5c33e.jpg",
      "https://i.pinimg.com/1200x/59/9d/c8/599dc81bfb47a9d098c72e54b6e242a7.jpg",
      "https://i.pinimg.com/736x/61/ad/01/61ad01f6b2712f089f2f46ba5203a4e6.jpg",
    ],
    desc: "Driver's luxury — an executive rear cabin, adaptive suspension and presence at every porch. A favourite for outstation executive trips.",
  },
  {
    id: "CH-06",
    name: "Audi A8 L",
    cat: "Sedan",
    tags: ["Sedan", "Luxury"],
    rent: 80000,
    rating: 4.8,
    reviews: 164,
    img: "https://i.pinimg.com/1200x/63/4d/c1/634dc1631c5470ea86b587925d3b0898.jpg",
    gallery: [
      "https://i.pinimg.com/1200x/a0/b3/f9/a0b3f956d39849919acf88e09d320de0.jpg",
      "https://i.pinimg.com/1200x/b1/d6/83/b1d6837b95ffb76851d2776fc309a030.jpg",
      "https://i.pinimg.com/736x/df/1c/c5/df1cc5d1d94ce1295195917168bf5809.jpg",
      "https://i.pinimg.com/736x/d5/86/ef/d586ef1d78699671d074d533be6de704.jpg",
      "https://mercury.bid.cars/0-39083280/2010-Audi-A8-WAURVAFA3AN007279-10.jpg",
      "https://i.pinimg.com/236x/97/aa/a6/97aaa6ed79e5966f6bfe146d8f5ec2be.jpg",
    ],
    desc: "The understated flagship — quattro confidence and acoustic glazing that turns the outside world into a murmur. Discreet, high-profile movement.",
  },
  {
    id: "CH-07",
    name: "Range Rover Vogue",
    cat: "SUV",
    tags: ["SUV", "Luxury"],
    rent: 100000,
    rating: 4.9,
    reviews: 188,
    img: "https://i.pinimg.com/736x/94/2f/c8/942fc8d9e3a65558f3da5bba8e293c5f.jpg",
    gallery: [
      "https://i.pinimg.com/1200x/28/7e/f0/287ef04042bc603f99aedb086916c44e.jpg",
      "https://i.pinimg.com/1200x/b3/fe/31/b3fe318ebdc964c5cfc61a5010460518.jpg",
      "https://i.pinimg.com/1200x/a9/5e/a9/a95ea99ab73a8e4ab83407b2738f7c00.jpg",
      "https://i.pinimg.com/1200x/69/1b/98/691b9880663edd88f61a0a72e986f721.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2Y1ibniBJF5J3xR98eg797yLAVVDmU0ElJav4ycJrB4CwB-NJ9HHuWBMH&s=10",
      "https://i.pinimg.com/1200x/25/5a/1f/255a1f2fd14891f81b04c9d174babebe.jpg",
    ],
    desc: "Commanding presence, air suspension and a lounge-like cabin — the statement SUV for weddings, shoots and upcountry runs in one silhouette.",
  },
  {
    id: "CH-08",
    name: "Toyota Fortuner",
    cat: "SUV",
    tags: ["SUV"],
    rent: 35000,
    rating: 4.7,
    reviews: 240,
    img: "https://i.pinimg.com/1200x/e2/db/58/e2db5847eca9a669e77fa74bf3c743ff.jpg",
    gallery: [
      "https://i.pinimg.com/736x/cd/ca/44/cdca44acbd0a4a1c72092d452984dc1e.jpg",
      "https://i.pinimg.com/1200x/54/c8/e3/54c8e313b16f964f1b380bceddb9bcde.jpg",
      "https://i.pinimg.com/736x/c0/f6/00/c0f60083e1975cadfe4526e81b10e162.jpg",
      "https://i.pinimg.com/1200x/2f/fe/74/2ffe74f997b750447c28566facc646b2.jpg",
      "https://i.pinimg.com/736x/d5/8e/45/d58e452be179bc98a8e86d6b0aebcf0e.jpg",
      "https://i.pinimg.com/1200x/f5/26/b6/f526b6b1f2ff1ddc5f0c2f93b3933901.jpg",
    ],
    desc: "Seven seats, ladder-frame toughness and real ground clearance — the north-tour operator's first pick when the itinerary leaves the tarmac.",
  },
  {
    id: "CH-09",
    name: "Kia Sportage",
    cat: "SUV",
    tags: ["SUV"],
    rent: 25000,
    rating: 4.6,
    reviews: 312,
    img: "https://i.pinimg.com/736x/13/db/90/13db9003ad8203d95c0ed7f6eda00ccd.jpg",
    gallery: [
      "https://i.pinimg.com/736x/80/dd/27/80dd27658d239b4c58bff45ee37c3fe5.jpg",
      "https://i.pinimg.com/736x/8b/bf/91/8bbf9120d413d6179696774bb21a8154.jpg",
      "https://i.pinimg.com/736x/f7/be/a6/f7bea69dd6a11268e14c68a83806e8c6.jpg",
      "https://i.pinimg.com/1200x/9c/e9/e4/9ce9e4c1c580c4f83e35353bbced9437.jpg",
      "https://i.pinimg.com/736x/98/02/07/980207990dd05ca3a8176af38a10a299.jpg",
      "https://i.pinimg.com/236x/99/1e/03/991e030111fa6a59d9b2fc77ab3498f3.jpg",
    ],
    desc: "High-riding comfort for airport runs and weekend getaways — panoramic roof, 360-degree camera and easy running costs.",
  },
  {
    id: "CH-10",
    name: "Porsche Taycan Turbo",
    cat: "Electric",
    tags: ["Electric", "Luxury"],
    rent: 140000,
    rating: 4.9,
    reviews: 98,
    img: "https://i.pinimg.com/736x/97/dd/c0/97ddc07848a04ec2216d9d8a7806cb90.jpg",
    gallery: [
      "https://i.pinimg.com/1200x/2d/b2/25/2db2250fee31cf4e5447c1af90c0e5f3.jpg",
      "https://i.pinimg.com/1200x/ef/93/78/ef9378b8201c5d25965aa32f33bbb164.jpg",
      "https://i.pinimg.com/1200x/ef/93/78/ef9378b8201c5d25965aa32f33bbb164.jpg",
      "https://i.pinimg.com/1200x/ef/93/78/ef9378b8201c5d25965aa32f33bbb164.jpg",
      "https://i.pinimg.com/1200x/ef/93/78/ef9378b8201c5d25965aa32f33bbb164.jpg",
      "https://i.pinimg.com/1200x/9f/a9/98/9fa99808b063ac38d446fd0d701f23aa.jpg",
    ],
    desc: "Porsche's electric flagship — silent torque, 800-volt charging and a cabin that feels like tomorrow. The future, chauffeur included.",
  },
  {
    id: "CH-11",
    name: "Tesla Model S",
    cat: "Electric",
    tags: ["Electric"],
    rent: 95000,
    rating: 4.8,
    reviews: 145,
    img: "https://i.pinimg.com/736x/d5/ab/95/d5ab95d225555b75c36170951ca73229.jpg",
    gallery: [
      "https://i.pinimg.com/736x/ef/6c/9d/ef6c9df4923fb4e8c71c9e38f3dfb475.jpg",
      "https://i.pinimg.com/1200x/68/80/52/688052df2fe0c161596887cb4f7e2ca2.jpg",
      "https://i.pinimg.com/1200x/2a/e4/fe/2ae4fe919deee71729020d4dd96b8238.jpg",
      "https://i.pinimg.com/1200x/ae/cd/6d/aecd6dac55749e2605e86eb399af39b7.jpg",
      "https://i.pinimg.com/736x/40/9d/f1/409df1351326bf507f27dc1b5181e335.jpg",
      "https://i.pinimg.com/1200x/21/fd/ad/21fdada145c1b4dee62f3370c56b0609.jpg",
    ],
    desc: "The EV that started it all — the longest range in our fleet, instant acceleration and a minimal, futuristic cabin.",
  },
  {
    id: "CH-12",
    name: "Mercedes-Benz V-Class",
    cat: "Van",
    tags: ["Van", "Luxury"],
    rent: 55000,
    rating: 4.7,
    reviews: 76,
    img: "https://i.pinimg.com/1200x/bf/a4/ca/bfa4caa035e9e2cdf5b866a95c719b92.jpg",
    gallery: [
      "https://i.pinimg.com/1200x/7a/3f/45/7a3f45508c6733ea8dde601e1dc4e3ca.jpg",
      "https://i.pinimg.com/1200x/7a/3f/45/7a3f45508c6733ea8dde601e1dc4e3ca.jpg",
      "https://i.pinimg.com/736x/78/78/84/787884bce28514d1d8c3533110ae6084.jpg",
      "https://i.pinimg.com/1200x/7a/3f/45/7a3f45508c6733ea8dde601e1dc4e3ca.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsyLhx4h4LERyDh3toAx9RVFFqC5wIbsDJEyTNiuqg8BVeTKtbmV8z9O0&s=10",
      "https://i.pinimg.com/1200x/a1/37/bb/a137bb1dd8827a8caf336cedea1c708a.jpg",
    ],
    desc: "Eight captain seats, a conference-style cabin and Mercedes quiet — executive group and family travel, redefined.",
  },
  {
    id: "CH-13",
    name: "Toyota Hiace Grand Cabin",
    cat: "Van",
    tags: ["Van"],
    rent: 30000,
    rating: 4.6,
    reviews: 268,
    img: "https://i.pinimg.com/1200x/3e/47/da/3e47dad0f63686d805c5c162af724051.jpg",
    gallery: [
      "https://i.pinimg.com/736x/d5/b2/bf/d5b2bfda2d6ff3e511450c0e475dbb74.jpg",
      "https://i.pinimg.com/736x/d5/c9/b9/d5c9b9a2493cc685e579ce7c66e858a5.jpg",
      "https://i.pinimg.com/736x/0d/7c/27/0d7c2776633b8578e31dbd77b0d34dd6.jpg",
      "https://i.pinimg.com/736x/bd/98/92/bd989242d59e8b14d67f5a40d60f5c36.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPqSecSDv9undUyUQxIgr3YiUb-QL4dlzwhidEBiLHuMvjq4_g-YhDWEaN&s=10",
      "https://i.pinimg.com/1200x/ca/da/17/cada17ae3b1911bfbbe861568f563cb4.jpg",
    ],
    desc: "Thirteen seats and luggage room to match — the country's standard for family tours, Umrah groups and office pick-and-drops.",
  },
];

const FILTERS = ["All", "Sports", "Sedan", "SUV", "Electric", "Luxury", "Van"];
const GALLERY_LABELS = ["Front View", "Back View", "Left View", "Right View", "Bonnet Open", "Interior"];
const PER_PAGE = 6;

function fmt(n) {
  return "PKR " + n.toLocaleString("en-US");
}

function Stars({ r }) {
  return (
    <span className="cf-stars" title={r + " / 5"}>
      <span className="bg">★★★★★</span>
      <span className="fg" style={{ width: (r / 5) * 100 + "%" }}>★★★★★</span>
    </span>
  );
}

function BookingForm({ car }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  let days = 0;
  if (from && to) {
    const diff = Math.round((new Date(to) - new Date(from)) / 86400000) + 1;
    if (diff > 0) days = diff;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (days <= 0) {
      setError("Return date cannot be before the pickup date.");
      return;
    }

    setLoading(true);


    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Please login first to book a car.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("bookings").insert({
      car_id: car.id,
      car_name: car.name,
      customer_name: name,
      phone: phone,
      pickup_date: from,
      return_date: to,
      days: days,
      total: days * car.rent,
      user_id: user.id, // ← ye add kiya hai
    });

    setLoading(false);

    if (error) {
      setError("Booking could not be saved. Please try again.");
    } else {
      setBooked(true);
    }
  }

  if (booked) {
    return (
      <div className="cf-success cf-anim">
        <b><Check /> Booking request received!</b>
        Thank you {name}! Our team will call {phone} within 30 minutes to confirm {car.name}
        {days ? ` — ${days} day${days > 1 ? "s" : ""}, ${fmt(days * car.rent)}` : ""}.
      </div>
    );
  }

  return (
    <form className="cf-book cf-anim" onSubmit={handleSubmit}>
      <div className="cf-book-title">Book {car.name}</div>

      <div className="cf-fields">
        <label>
          Full Name
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </label>
        <label>
          Phone
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="03xx-xxxxxxx"
          />
        </label>
        <label>
          Pickup Date
          <input
            required
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </label>
        <label>
          Return Date
          <input
            required
            type="date"
            value={to}
            min={from || undefined}
            onChange={(e) => setTo(e.target.value)}
          />
        </label>
      </div>

      <div className="cf-sum">
        <div><span>Daily rent</span><b>{fmt(car.rent)}</b></div>
        <div><span>Days</span><b>{days || "—"}</b></div>
        <div className="cf-total">
          <span>Estimated total</span>
          <b>{days ? fmt(days * car.rent) : "—"}</b>
        </div>
      </div>

      {error && <div className="cf-error">{error}</div>}

      <div className="cf-book-actions">
        <button className="cf-btn cf-btn-solid" type="submit" disabled={loading}>
          {loading ? "Booking…" : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
}



function CarModal({ car, closing, onClose, onAnimEnd, wished, onToggleWish }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div
      className={"cf-modal" + (closing ? " closing" : "")}
      role="dialog"
      aria-modal="true"
      aria-label={car.name}
      onAnimationEnd={onAnimEnd}
    >
      <button className="cf-close" type="button" aria-label="Close" onClick={onClose}>
        <X size={18} />
      </button>

      <div className="cf-modal-scroll">

       
        <div className="cf-hero">
          <div className="cf-hero-media">
            <img src={car.img} alt={car.name} />
          </div>

          <div className="cf-hero-info">
            <span className="cf-mcode cf-anim">
              {car.id} · {car.cat}{car.tags.includes("Luxury") ? " · Luxury" : ""}
            </span>

            <h2 className="cf-mname cf-anim" style={{ animationDelay: ".06s" }}>
              {car.name}
            </h2>

            <div className="cf-mprice cf-anim" style={{ animationDelay: ".12s" }}>
              <b>{fmt(car.rent)}</b><span> / day</span>
            </div>

            <div className="cf-mrating cf-anim" style={{ animationDelay: ".18s" }}>
              <Stars r={car.rating} />
              <b>{car.rating.toFixed(1)}</b>
              <span>({car.reviews} reviews)</span>
            </div>

            <p className="cf-mdesc cf-anim" style={{ animationDelay: ".24s" }}>
              {car.desc}
            </p>

            <div className="cf-mactions cf-anim" style={{ animationDelay: ".3s" }}>
              <button
                className="cf-btn cf-btn-solid"
                type="button"
                onClick={() => setShowForm(true)}
              >
                Book Now
              </button>
              <button
                className="cf-btn cf-btn-ghost"
                type="button"
                onClick={() => onToggleWish(car.id)}
              >
                <Heart
                  size={15}
                  fill={wished ? "#c22530" : "none"}
                  color={wished ? "#c22530" : "currentColor"}
                />
                {wished ? "Wishlisted" : "Add to Wishlist"}
              </button>
            </div>

            {showForm && <BookingForm car={car} />}
          </div>
        </div>

          <div className="cf-gallery">
          {GALLERY_LABELS.map((label, i) => (
            <figure className="cf-tile" key={label}>
              <img src={car.gallery[i]} alt={car.name + " — " + label} />
              <figcaption>{label}</figcaption>
            </figure>
          ))}
        </div>

      </div>
    </div>
  );
}



export default function OurModels() {
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState(null);
  const [closing, setClosing] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const gridRef = useRef(null);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("wishlist")
      .select("car_id")
      .eq("user_id", user.id);

    if (data) {
      setWishlist(data.map((item) => item.car_id));
    }
  };

  
  let filtered = CARS;
  if (filter !== "All") {
    filtered = CARS.filter((c) => c.cat === filter || c.tags.includes(filter));
  }


  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const startIndex = (page - 1) * PER_PAGE;
  const visibleCars = filtered.slice(startIndex, startIndex + PER_PAGE);

 
  const openCar = CARS.find((c) => c.id === openId);

  // ---------- handlers ----------

  function handleFilterClick(f) {
    setFilter(f);
    setPage(1);
  }

  function handleCardClick(car) {
    setOpenId(car.id);
  }

  function handleCloseModal() {
    setClosing(true);
  }

  // ===== NAYA: Wishlist toggle - database ke saath sync =====
  const handleWishlist = async (carId) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first to add cars to wishlist!");
      return;
    }

    // Car ka data find karo
    const car = CARS.find((c) => c.id === carId);
    if (!car) return;

    if (wishlist.includes(carId)) {
      // Remove from wishlist
      setWishlist(wishlist.filter((w) => w !== carId));
      await supabase
        .from("wishlist")
        .delete()
        .eq("user_id", user.id)
        .eq("car_id", carId);
    } else {
      // Add to wishlist
      setWishlist([...wishlist, carId]);
      await supabase.from("wishlist").insert({
        user_id: user.id,
        car_id: car.id,
        car_name: car.name,
        car_image: car.img,
        rent: car.rent,
      });
    }
  };

  function handleModalAnimEnd(e) {
    if (closing && e.animationName === "cfPanelDown") {
      setOpenId(null);
      setClosing(false);
    }
  }

  // ---------- effects ----------

  // card animation
  useLayoutEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cf-card",
        { y: 26, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.05, ease: "power3.out" }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [filter, page]);

  // Escape key se modal band karo
  useEffect(() => {
    if (!openId) return;

    function handleKey(e) {
      if (e.key === "Escape") setClosing(true);
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [openId]);

  // modal open ho to page scroll lock
  useEffect(() => {
    if (!openId) return;

    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [openId]);

  // ---------- render ----------

  return (
    <section className="cf-section" id="models">

      {/* ---- Heading ---- */}
      <div className="cf-head">
        <h2 className="cf-heading">Our <em>Models</em></h2>
        <p className="cf-sub">Hand-picked cars · chauffeur on call · transparent daily rates</p>
      </div>

      {/* ---- Filter Buttons ---- */}
      <div className="cf-filters" aria-label="Filter models">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={"cf-pill" + (filter === f ? " active" : "")}
            onClick={() => handleFilterClick(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ---- Cards Grid ---- */}
      <div className="cf-grid" ref={gridRef}>
        {visibleCars.map((car) => (
          <article
            key={car.id}
            className="cf-card"
            role="button"
            tabIndex={0}
            onClick={() => handleCardClick(car)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCardClick(car);
            }}
          >
            <div className="cf-card-media">
              <img src={car.img} alt={car.name} draggable="false" />
            </div>

            <div className="cf-card-body">
              <div className="cf-card-left">
                <span className="cf-code">{car.id}</span>
                <span className="cf-cat">{car.cat}</span>
                <span className="cf-price">
                  {fmt(car.rent)}<em>/ day</em>
                </span>
              </div>

              <button
                className="cf-go"
                type="button"
                aria-label={"View " + car.name}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(car);
                }}
              >
                <ArrowUpRight size={16} />
              </button>
            </div>
          </article>
        ))}

        {visibleCars.length === 0 && (
          <div className="cf-empty">No vehicles in this category yet.</div>
        )}
      </div>

      {/* ---- Pagination ---- */}
      {totalPages > 1 && (
        <div className="cf-pager">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              className={"cf-page" + (p === page ? " active" : "")}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            className="cf-page"
            disabled={page === totalPages}
            aria-label="Next page"
            onClick={() => setPage(page + 1)}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* ---- Modal ---- */}
      {openCar && (
        <CarModal
          car={openCar}
          closing={closing}
          onClose={handleCloseModal}
          onAnimEnd={handleModalAnimEnd}
          wished={wishlist.includes(openCar.id)}
          onToggleWish={handleWishlist}
        />
      )}

    </section>
  );
}
