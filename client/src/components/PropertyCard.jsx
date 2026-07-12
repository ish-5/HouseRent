import { Link } from "react-router-dom";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=60";

export default function PropertyCard({ property, footer }) {
  const img = property.images && property.images.length > 0 ? property.images[0] : FALLBACK_IMG;

  return (
    <div className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-accent-500/40 hover:shadow-glow transition-all duration-300 group">
      <div className="h-48 overflow-hidden">
        <img
          src={img}
          alt={property.address}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
        />
      </div>
      <div className="p-5">
        <h3 className="text-white font-semibold leading-snug mb-1">{property.address}</h3>
        <p className="text-slate-400 text-sm mb-2 capitalize">
          {property.propertyType} - {property.adType}
        </p>
        {footer}
      </div>
    </div>
  );
}
