import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import PropertyCard from "../components/PropertyCard";
import { useAuth } from "../context/AuthContext";

const SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    title: "Find Your Dream Rental Property",
    subtitle: "Comfort, Convenience & Class — All in One Place",
  },
  {
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80",
    title: "Commercial Spaces That Mean Business",
    subtitle: "Prime addresses for offices, retail & more",
  },
  {
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    title: "Buy, Rent, or List — Effortlessly",
    subtitle: "A single platform for renters, owners & admins",
  },
  {
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    title: "Verified Owners. Trusted Listings.",
    subtitle: "Every property, vetted for your peace of mind",
  },
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [properties, setProperties] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    api
      .get("/properties")
      .then((res) => setProperties(res.data.properties.slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <div className="relative h-[640px] w-full overflow-hidden">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === slide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={s.img} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-base-950 via-base-950/40 to-black/40" />
          </div>
        ))}

        <div className="relative h-full flex flex-col items-start justify-end max-w-7xl mx-auto px-6 pb-24">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white max-w-3xl leading-tight drop-shadow-lg">
            {SLIDES[slide].title}
          </h1>
          <p className="text-slate-200 text-lg md:text-xl mt-4">{SLIDES[slide].subtitle}</p>

          <div className="flex gap-2 mt-8">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  i === slide ? "w-8 bg-accent-500" : "w-2.5 bg-slate-500/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Explore section */}
      <div className="bg-base-900/60 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-3">Explore Our Premium Properties</h2>
          <p className="text-slate-400 mb-6">
            Looking to post your property?{" "}
            <Link
              to={user ? "/owner" : "/register"}
              className="text-accent-400 border border-accent-500 rounded-lg px-4 py-1.5 ml-1 hover:bg-accent-500/10 transition-colors inline-block"
            >
              Register as Owner
            </Link>
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
            {properties.map((p) => (
              <PropertyCard
                key={p._id}
                property={p}
                footer={
                  <Link
                    to="/properties"
                    className="text-amber-400 text-sm font-medium hover:underline"
                  >
                    {user ? "View details" : "Login to see details"}
                  </Link>
                }
              />
            ))}
          </div>

          <Link
            to="/properties"
            className="inline-block mt-12 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-glow"
          >
            Browse All Properties
          </Link>
        </div>
      </div>

      {/* Feature strip */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        {[
          { title: "Verified Listings", desc: "Every owner is vetted and granted access by our admin team." },
          { title: "Instant Booking Requests", desc: "Send a booking request in seconds and track its status live." },
          { title: "Residential & Commercial", desc: "From cozy homes to prime commercial addresses, all in one place." },
        ].map((f) => (
          <div key={f.title} className="glass rounded-2xl p-6 border border-white/5">
            <h3 className="text-accent-400 font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-slate-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
