import React, { useMemo, useState } from "react";
import {
  Home,
  MapPin,
  BedDouble,
  Bath,
  Search,
  CalendarDays,
  Building2,
} from "lucide-react";

const properties = [
  {
    id: 1,
    title: "Contemporary 1 Bed Flat with Gym Access in Westminster",
    price: 435000,
    bedrooms: 1,
    bathrooms: 1,
    propertyType: "flat",
    location: "Westminster",
    description:
      "Stylish one-bedroom flat in Westminster with residents’ gym access and a short walk to the tube.",
    imageUrl:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
    gym: true,
    tube: true,
    fireplace: false,
    balcony: false,
    parking: false,
    garden: false,
    furnished: true,
    agentName: "Sarah Collins",
  },
  {
    id: 2,
    title: "Charming 2 Bed Flat with Fireplace in Notting Hill",
    price: 585000,
    bedrooms: 2,
    bathrooms: 1,
    propertyType: "flat",
    location: "Notting Hill",
    description:
      "Beautiful two-bedroom flat with a traditional fireplace and excellent transport links.",
    imageUrl:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&h=800&fit=crop",
    gym: false,
    tube: true,
    fireplace: true,
    balcony: false,
    parking: false,
    garden: false,
    furnished: false,
    agentName: "Oliver Reed",
  },
  {
    id: 3,
    title: "Spacious 2 Bed Flat with Balcony in Canary Wharf",
    price: 610000,
    bedrooms: 2,
    bathrooms: 2,
    propertyType: "flat",
    location: "Canary Wharf",
    description:
      "Modern two-bedroom flat with a private balcony and strong city connections.",
    imageUrl:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=800&fit=crop",
    gym: true,
    tube: true,
    fireplace: false,
    balcony: true,
    parking: false,
    garden: false,
    furnished: true,
    agentName: "Maya Shah",
  },
  {
    id: 4,
    title: "Cozy 1 Bed Flat Near Hyde Park",
    price: 390000,
    bedrooms: 1,
    bathrooms: 1,
    propertyType: "flat",
    location: "Hyde Park",
    description:
      "Comfortable one-bedroom flat near Hyde Park with strong transport links.",
    imageUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop",
    gym: false,
    tube: true,
    fireplace: false,
    balcony: false,
    parking: false,
    garden: false,
    furnished: true,
    agentName: "Daniel Foster",
  },
  {
    id: 5,
    title: "Luxury 2 Bed Flat with Gym and Balcony in Battersea",
    price: 595000,
    bedrooms: 2,
    bathrooms: 2,
    propertyType: "flat",
    location: "Battersea",
    description:
      "Premium two-bedroom flat with gym, balcony and strong local amenities.",
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop",
    gym: true,
    tube: true,
    fireplace: false,
    balcony: true,
    parking: false,
    garden: false,
    furnished: true,
    agentName: "Isla Bennett",
  },
];

const bookingSlots = [
  "Tue 9 Apr · 10:00",
  "Tue 9 Apr · 14:00",
  "Wed 10 Apr · 11:00",
  "Thu 11 Apr · 18:00",
];

function normaliseText(input) {
  return input
    .toLowerCase()
    .replace(/apartments?/g, "flat")
    .replace(/condos?/g, "flat")
    .replace(/metro/g, "tube")
    .replace(/subway/g, "tube");
}

function parsePrice(input) {
  const cleaned = input
    .toLowerCase()
    .replace(/,/g, "")
    .replace("£", "")
    .trim();

  const match = cleaned.match(/^(\d+)(k|m)?$/);

  if (!match) return null;

  let value = Number(match[1]);

  if (match[2] === "k") value *= 1000;
  if (match[2] === "m") value *= 1000000;

  return value;
}

function parsePrompt(prompt) {
  const text = normaliseText(prompt);
  const words = text.split(/\s+/).filter(Boolean);

  const bedroomsMatch = text.match(/(\d+)\s*bed(?:room)?/);

  const bedrooms = bedroomsMatch
    ? Number(bedroomsMatch[1])
    : null;

  let maxPrice = null;
  let targetPrice = null;

  for (let i = 0; i < words.length - 1; i++) {
    if (words[i] === "under") {
      maxPrice = parsePrice(words[i + 1]);
    }

    if (words[i] === "around") {
      targetPrice = parsePrice(words[i + 1]);

      if (targetPrice !== null) {
        maxPrice = Math.round(targetPrice * 1.1);
      }
    }
  }

  const locationList = [
    "canary wharf",
    "notting hill",
    "hyde park",
    "battersea",
    "westminster",
    "london",
  ];

  const location =
    locationList.find((loc) => text.includes(loc)) || null;

  let propertyType = null;

  if (text.includes("flat")) propertyType = "flat";
  if (text.includes("house")) propertyType = "house";

  return {
    bedrooms,
    maxPrice,
    targetPrice,
    propertyType,
    features: {
      gym: text.includes("gym"),
      tube: text.includes("tube"),
      fireplace: text.includes("fireplace"),
      balcony: text.includes("balcony"),
      parking: text.includes("parking"),
      garden: text.includes("garden"),
      furnished: text.includes("furnished"),
    },
    location,
  };
}

function rankProperties(prompt) {
  const criteria = parsePrompt(prompt);

  const hasCriteria =
    Object.values(criteria.features).some(Boolean) ||
    Boolean(
      criteria.bedrooms ||
        criteria.maxPrice ||
        criteria.location ||
        criteria.propertyType
    );

  const results = properties
    .filter((property) => {
      if (
        criteria.bedrooms !== null &&
        property.bedrooms !== criteria.bedrooms
      ) {
        return false;
      }

      if (
        criteria.maxPrice !== null &&
        property.price > criteria.maxPrice
      ) {
        return false;
      }

      if (
        criteria.location &&
        criteria.location !== "london" &&
        !property.location
          .toLowerCase()
          .includes(criteria.location)
      ) {
        return false;
      }

      if (
        criteria.propertyType &&
        property.propertyType !== criteria.propertyType
      ) {
        return false;
      }

      for (const [feature, required] of Object.entries(
        criteria.features
      )) {
        if (required && !property[feature]) {
          return false;
        }
      }

      return true;
    })
    .map((property) => {
      let score = 0;
      const reasons = [];

      if (!hasCriteria) {
        return {
          ...property,
          score: 50,
          matchPercentage: 50,
          reasons: ["Trending property"],
        };
      }

      if (
        criteria.bedrooms !== null &&
        property.bedrooms === criteria.bedrooms
      ) {
        score += 30;
        reasons.push(
          `${property.bedrooms} bedrooms matches exactly`
        );
      }

      if (
        criteria.maxPrice !== null &&
        property.price <= criteria.maxPrice
      ) {
        score += 25;
        reasons.push("Within budget");

        if (criteria.targetPrice !== null) {
          const distancePct =
            (Math.abs(
              property.price - criteria.targetPrice
            ) /
              criteria.targetPrice) *
            100;

          const closenessBonus = Math.max(
            0,
            5 - Math.round(distancePct)
          );

          score += closenessBonus;

          if (closenessBonus >= 2) {
            reasons.push("Close to target budget");
          }
        } else {
          const headroomPct =
            ((criteria.maxPrice - property.price) /
              criteria.maxPrice) *
            100;

          const budgetBonus = Math.max(
            0,
            Math.min(5, Math.round(headroomPct))
          );

          score += budgetBonus;

          if (budgetBonus >= 2) {
            reasons.push("More room within budget");
          }
        }
      }

      if (criteria.location) {
        if (criteria.location === "london") {
          score += 10;
          reasons.push("In London");
        } else if (
          property.location
            .toLowerCase()
            .includes(criteria.location)
        ) {
          score += 20;
          reasons.push(`In ${property.location}`);
        }
      }

      if (
        criteria.propertyType &&
        property.propertyType === criteria.propertyType
      ) {
        score += 10;

        reasons.push(
          `${
            property.propertyType === "flat"
              ? "Flat"
              : "House"
          } matches requested type`
        );
      }

      const requestedFeatures = Object.entries(
        criteria.features
      ).filter(([, value]) => value);

      const featureWeight =
        requestedFeatures.length > 0
          ? Math.floor(15 / requestedFeatures.length)
          : 0;

      requestedFeatures.forEach(([feature]) => {
        score += featureWeight;

        const labels = {
          gym: "Has gym",
          tube: "Near tube",
          fireplace: "Has fireplace",
          balcony: "Has balcony",
          parking: "Has parking",
          garden: "Has garden",
          furnished: "Furnished",
        };

        reasons.push(labels[feature]);
      });

      return {
        ...property,
        score,
        matchPercentage: Math.min(
          92,
          Math.max(62, score)
        ),
        reasons,
      };
    })
    .sort((a, b) => b.score - a.score || a.price - b.price);

  return results;
}

function formatPrice(value) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);
}

function PropertyCard({ property, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-200 cursor-pointer hover:shadow-md transition"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start gap-3">
          <div>
            <div className="text-lg font-semibold">
              {formatPrice(property.price)}
            </div>

            <div className="text-sm text-gray-600">
              {property.bedrooms} bed{" "}
              {property.propertyType} ·{" "}
              {property.location}
            </div>
          </div>

          <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
            {property.matchPercentage}% match
          </div>
        </div>

        <div className="text-sm text-gray-700 line-clamp-2">
          {property.description}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [submittedPrompt, setSubmittedPrompt] =
    useState("");
  const [selectedProperty, setSelectedProperty] =
    useState(null);
  const [selectedSlot, setSelectedSlot] =
    useState(null);
  const [bookingConfirmed, setBookingConfirmed] =
    useState(false);

  const results = useMemo(
    () => rankProperties(submittedPrompt),
    [submittedPrompt]
  );

  const trending = useMemo(
    () => rankProperties("").slice(0, 4),
    []
  );

  const handleSearch = () => {
    setSubmittedPrompt(prompt.trim());
    setSelectedProperty(null);
    setSelectedSlot(null);
    setBookingConfirmed(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 text-xl font-semibold">
              <Home className="h-5 w-5" />
              Home Finder
            </div>

            <p className="text-sm text-gray-600 mt-1">
              Prompt-first property discovery prototype
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
              <h1 className="text-3xl font-semibold leading-tight">
                Describe the home you want
              </h1>

              <p className="text-sm text-gray-600 mt-2">
                Type naturally. The prototype extracts
                key criteria and ranks relevant listings.
              </p>

              <div className="flex flex-col md:flex-row gap-3 mt-5">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                  <input
                    value={prompt}
                    onChange={(e) =>
                      setPrompt(e.target.value)
                    }
                    placeholder="Try: 1 bed flat in Westminster under £500k"
                    className="w-full h-12 rounded-2xl border border-gray-300 pl-10 pr-4 outline-none"
                  />
                </div>

                <button
                  onClick={handleSearch}
                  className="h-12 px-6 rounded-2xl bg-black text-white"
                >
                  Search
                </button>
              </div>
            </div>

            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">
                  {submittedPrompt
                    ? "Search results"
                    : "Trending properties"}
                </h2>

                {submittedPrompt ? (
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {results.length}{" "}
                    {results.length === 1
                      ? "result"
                      : "results"}
                  </div>
                ) : null}
              </div>

              {submittedPrompt &&
              results.length === 0 ? (
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 text-sm text-gray-600">
                  No exact matches found. Try increasing
                  your budget or removing a feature.
                </div>
              ) : null}

              <div className="grid gap-4 md:grid-cols-2">
                {(submittedPrompt
                  ? results
                  : trending
                ).map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onClick={() => {
                      setSelectedProperty(property);
                      setSelectedSlot(null);
                      setBookingConfirmed(false);
                    }}
                  />
                ))}
              </div>
            </section>
          </div>

          <div>
            <div className="sticky top-6 bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
              {selectedProperty ? (
                <>
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={selectedProperty.imageUrl}
                      alt={selectedProperty.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6 space-y-5">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <div className="text-2xl font-semibold">
                            {formatPrice(
                              selectedProperty.price
                            )}
                          </div>

                          <div className="text-sm text-gray-600">
                            {selectedProperty.title}
                          </div>
                        </div>

                        <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                          {
                            selectedProperty.matchPercentage
                          }
                          % match
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <BedDouble className="h-4 w-4" />
                          {selectedProperty.bedrooms} bed
                        </span>

                        <span className="flex items-center gap-1">
                          <Bath className="h-4 w-4" />
                          {selectedProperty.bathrooms} bath
                        </span>

                        <span className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {
                            selectedProperty.propertyType
                          }
                        </span>

                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {selectedProperty.location}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-semibold mb-2">
                        Why this matches
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {selectedProperty.reasons.map(
                          (reason) => (
                            <div
                              key={reason}
                              className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                            >
                              {reason}
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-semibold mb-2">
                        Description
                      </div>

                      <p className="text-sm leading-6 text-gray-600">
                        {
                          selectedProperty.description
                        }
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-sm font-semibold mb-3">
                        <CalendarDays className="h-4 w-4" />
                        Book a viewing
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {bookingSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => {
                              setSelectedSlot(slot);
                              setBookingConfirmed(false);
                            }}
                            className={`px-4 py-2 rounded-full border ${
                              selectedSlot === slot
                                ? "bg-black text-white"
                                : "bg-white"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>

                      <button
                        disabled={!selectedSlot}
                        onClick={() =>
                          setBookingConfirmed(true)
                        }
                        className="w-full mt-4 h-12 rounded-2xl bg-black text-white disabled:opacity-50"
                      >
                        Confirm viewing with{" "}
                        {selectedProperty.agentName}
                      </button>

                      {bookingConfirmed ? (
                        <div className="mt-4 bg-green-50 text-green-700 rounded-2xl p-3 text-sm">
                          Viewing confirmed for{" "}
                          {selectedSlot} with{" "}
                          {selectedProperty.agentName}.
                        </div>
                      ) : null}
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-8">
                  <div className="text-2xl font-semibold">
                    Select a property
                  </div>

                  <p className="text-sm text-gray-600 mt-4 leading-6">
                    Click a property to view details,
                    understand why it matches your
                    search, and test the booking flow.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
