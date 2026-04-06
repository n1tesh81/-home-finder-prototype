import React, { useMemo, useState } from 'react';

const properties = [
  {
    id: 1,
    title: 'Contemporary 1 Bed Flat with Gym Access in Westminster',
    price: 435000,
    bedrooms: 1,
    bathrooms: 1,
    propertyType: 'flat',
    location: 'Westminster',
    description: 'Stylish one-bedroom flat in Westminster with residents’ gym access and a short walk to the tube.',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop',
    gym: true,
    tube: true,
    fireplace: false,
    balcony: false,
    parking: false,
    garden: false,
    furnished: true,
    agentName: 'Sarah Collins',
  },
  {
    id: 2,
    title: 'Charming 2 Bed Flat with Fireplace in Notting Hill',
    price: 585000,
    bedrooms: 2,
    bathrooms: 1,
    propertyType: 'flat',
    location: 'Notting Hill',
    description: 'Beautiful two-bedroom flat with a traditional fireplace, classic charm and excellent transport links.',
    imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&h=800&fit=crop',
    gym: false,
    tube: true,
    fireplace: true,
    balcony: false,
    parking: false,
    garden: false,
    furnished: false,
    agentName: 'Oliver Reed',
  },
  {
    id: 3,
    title: 'Spacious 2 Bed Flat with Balcony in Canary Wharf',
    price: 610000,
    bedrooms: 2,
    bathrooms: 2,
    propertyType: 'flat',
    location: 'Canary Wharf',
    description: 'Modern two-bedroom flat with a private balcony and strong city connections for commuting professionals.',
    imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=800&fit=crop',
    gym: true,
    tube: true,
    fireplace: false,
    balcony: true,
    parking: false,
    garden: false,
    furnished: true,
    agentName: 'Maya Shah',
  },
  {
    id: 4,
    title: 'Cozy 1 Bed Flat Near Hyde Park with Great Transport Links',
    price: 390000,
    bedrooms: 1,
    bathrooms: 1,
    propertyType: 'flat',
    location: 'Hyde Park',
    description: 'Comfortable one-bedroom flat near Hyde Park with strong transport links and a quieter residential setting.',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop',
    gym: false,
    tube: true,
    fireplace: false,
    balcony: false,
    parking: false,
    garden: false,
    furnished: true,
    agentName: 'Daniel Foster',
  },
  {
    id: 5,
    title: 'Modern 3 Bed House with Garden and Parking in Clapham',
    price: 745000,
    bedrooms: 3,
    bathrooms: 2,
    propertyType: 'house',
    location: 'Clapham',
    description: 'Spacious family home with private garden and off-street parking close to parks and transport.',
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&h=800&fit=crop',
    gym: false,
    tube: true,
    fireplace: true,
    balcony: false,
    parking: true,
    garden: true,
    furnished: false,
    agentName: 'Emma Brooks',
  },
  {
    id: 6,
    title: 'Luxury 2 Bed Flat with Gym and Balcony in Battersea',
    price: 595000,
    bedrooms: 2,
    bathrooms: 2,
    propertyType: 'flat',
    location: 'Battersea',
    description: 'Premium two-bedroom flat with gym, balcony and strong local amenities in Battersea.',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
    gym: true,
    tube: true,
    fireplace: false,
    balcony: true,
    parking: false,
    garden: false,
    furnished: true,
    agentName: 'Isla Bennett',
  },
  {
    id: 7,
    title: 'Furnished 1 Bed Flat with Balcony in South Bank',
    price: 455000,
    bedrooms: 1,
    bathrooms: 1,
    propertyType: 'flat',
    location: 'South Bank',
    description: 'Smart furnished flat with a balcony and quick access to central London connections.',
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&h=800&fit=crop',
    gym: true,
    tube: true,
    fireplace: false,
    balcony: true,
    parking: false,
    garden: false,
    furnished: true,
    agentName: 'Nina Patel',
  },
  {
    id: 8,
    title: 'Classic 2 Bed Flat with Fireplace and Balcony in Marylebone',
    price: 625000,
    bedrooms: 2,
    bathrooms: 2,
    propertyType: 'flat',
    location: 'Marylebone',
    description: 'Elegant flat with period fireplace, balcony and excellent access to the West End.',
    imageUrl: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200&h=800&fit=crop',
    gym: false,
    tube: true,
    fireplace: true,
    balcony: true,
    parking: false,
    garden: false,
    furnished: false,
    agentName: 'Freddie Green',
  },
  {
    id: 9,
    title: 'Bright 2 Bed Flat with Parking in Stratford',
    price: 505000,
    bedrooms: 2,
    bathrooms: 2,
    propertyType: 'flat',
    location: 'Stratford',
    description: 'Bright flat with secure parking, modern layout and strong transport for commuting.',
    imageUrl: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&h=800&fit=crop',
    gym: false,
    tube: true,
    fireplace: false,
    balcony: true,
    parking: true,
    garden: false,
    furnished: true,
    agentName: 'Leah Turner',
  },
  {
    id: 10,
    title: 'Fireplace 2 Bed House with Parking in Hampstead',
    price: 595000,
    bedrooms: 2,
    bathrooms: 2,
    propertyType: 'house',
    location: 'Hampstead',
    description: 'Characterful two-bedroom house with fireplace and parking in a desirable Hampstead setting.',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop',
    gym: false,
    tube: true,
    fireplace: true,
    balcony: false,
    parking: true,
    garden: false,
    furnished: false,
    agentName: 'Thomas Lane',
  },
];

const examplePrompts = [
  '1 bed flat in Hyde Park under £600k',
  '1 bed flat with gym near tube',
  '2 bedroom property with a fireplace under £600k',
];

const bookingSlots = ['Tue 10:00', 'Tue 14:00', 'Wed 11:00', 'Thu 18:00'];

function normaliseText(input) {
  return input
    .toLowerCase()
    .replace(/apartments?/g, 'flat')
    .replace(/condos?/g, 'flat')
    .replace(/metro/g, 'tube')
    .replace(/subway/g, 'tube');
}

function parsePrice(input) {
  const cleaned = input.toLowerCase().replace(/,/g, '').replace('£', '').trim();
  const match = cleaned.match(/^(\d+)(k|m)?$/);
  if (!match) return null;

  let value = Number(match[1]);
  const suffix = match[2];
  if (suffix === 'k') value *= 1000;
  if (suffix === 'm') value *= 1000000;
  return value;
}

function parsePrompt(prompt) {
  const text = normaliseText(prompt);
  const words = text.split(/\s+/).filter(Boolean);

  const bedroomsMatch = text.match(/(\d+)\s*bed(?:room)?/);
  const bedrooms = bedroomsMatch ? Number(bedroomsMatch[1]) : null;

  let maxPrice = null;
  let targetPrice = null;

  for (let i = 0; i < words.length - 1; i += 1) {
    if (words[i] === 'under') {
      maxPrice = parsePrice(words[i + 1]);
    }
    if (words[i] === 'around') {
      targetPrice = parsePrice(words[i + 1]);
      if (targetPrice !== null) {
        maxPrice = Math.round(targetPrice * 1.1);
      }
    }
  }

  const locationList = [
    'canary wharf',
    'notting hill',
    'hyde park',
    'south bank',
    'marylebone',
    'battersea',
    'stratford',
    'hampstead',
    'richmond',
    'clapham',
    'westminster',
    'london',
  ];
  const location = locationList.find((loc) => text.includes(loc)) || null;

  let propertyType = null;
  if (text.includes('flat')) propertyType = 'flat';
  if (text.includes('house')) propertyType = 'house';

  return {
    bedrooms,
    maxPrice,
    targetPrice,
    propertyType,
    features: {
      gym: text.includes('gym'),
      tube: text.includes('tube'),
      fireplace: text.includes('fireplace'),
      balcony: text.includes('balcony'),
      parking: text.includes('parking'),
      garden: text.includes('garden'),
      furnished: text.includes('furnished'),
    },
    location,
  };
}

function rankProperties(prompt) {
  const criteria = parsePrompt(prompt);
  const hasCriteria = Object.values(criteria.features).some(Boolean)
    || Boolean(criteria.bedrooms || criteria.maxPrice || criteria.location || criteria.propertyType);

  return properties
    .filter((property) => {
      if (criteria.bedrooms !== null && property.bedrooms !== criteria.bedrooms) return false;
      if (criteria.maxPrice !== null && property.price > criteria.maxPrice) return false;
      if (criteria.location && criteria.location !== 'london' && !property.location.toLowerCase().includes(criteria.location)) return false;
      if (criteria.propertyType && property.propertyType !== criteria.propertyType) return false;

      for (const [feature, required] of Object.entries(criteria.features)) {
        if (required && !property[feature]) return false;
      }

      return true;
    })
    .map((property) => {
      if (!hasCriteria) {
        return {
          ...property,
          score: 50,
          matchPercentage: 50,
          reasons: ['Trending property'],
        };
      }

      let score = 0;
      const reasons = [];

      if (criteria.bedrooms !== null && property.bedrooms === criteria.bedrooms) {
        score += 30;
        reasons.push(`${property.bedrooms} bedrooms matches exactly`);
      }

      if (criteria.maxPrice !== null && property.price <= criteria.maxPrice) {
        score += 25;
        reasons.push('Within budget');
      }

      if (criteria.location) {
        if (criteria.location === 'london') {
          score += 10;
          reasons.push('In London');
        } else if (property.location.toLowerCase().includes(criteria.location)) {
          score += 20;
          reasons.push(`In ${property.location}`);
        }
      }

      if (criteria.propertyType && property.propertyType === criteria.propertyType) {
        score += 10;
        reasons.push(`${property.propertyType === 'flat' ? 'Flat' : 'House'} matches requested type`);
      }

      const requestedFeatures = Object.entries(criteria.features).filter(([, value]) => value);
      const featureWeight = requestedFeatures.length > 0 ? Math.floor(15 / requestedFeatures.length) : 0;
      requestedFeatures.forEach(([feature]) => {
        score += featureWeight;
        const labels = {
          gym: 'Has gym',
          tube: 'Near tube',
          fireplace: 'Has fireplace',
          balcony: 'Has balcony',
          parking: 'Has parking',
          garden: 'Has garden',
          furnished: 'Furnished',
        };
        reasons.push(labels[feature]);
      });

      return {
        ...property,
        score,
        matchPercentage: Math.min(100, score),
        reasons,
      };
    })
    .sort((a, b) => b.score - a.score || a.price - b.price);
}

function formatPrice(value) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value);
}

function PropertyCard({ property, onSelect }) {
  return (
    <button className="card property-card" onClick={onSelect}>
      <div className="card-image-wrap">
        <img src={property.imageUrl} alt={property.title} className="card-image" />
      </div>
      <div className="card-body">
        <div className="card-header-row">
          <div>
            <div className="card-price">{formatPrice(property.price)}</div>
            <div className="muted">{property.bedrooms} bed {property.propertyType} · {property.location}</div>
          </div>
          <span className="badge">{property.matchPercentage}% match</span>
        </div>
        <div className="card-description">{property.description}</div>
      </div>
    </button>
  );
}

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [submittedPrompt, setSubmittedPrompt] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const results = useMemo(() => rankProperties(submittedPrompt), [submittedPrompt]);
  const trending = useMemo(() => rankProperties('').slice(0, 6), []);

  const handleSearch = () => {
    setSubmittedPrompt(prompt.trim());
    setSelectedProperty(null);
    setSelectedSlot(null);
    setBookingConfirmed(false);
  };

  const activeList = submittedPrompt ? results : trending;

  return (
    <div className="page">
      <div className="container">
        <header className="topbar">
          <div>
            <div className="brand">🏠 Home Finder</div>
            <p className="subtitle">Prompt-first property discovery prototype</p>
          </div>
          <span className="pill">UK property search demo</span>
        </header>

        <main className="layout">
          <section className="left-column">
            <div className="card hero-card">
              <h1>Describe the home you want</h1>
              <p className="muted">Type naturally. The prototype extracts key criteria and ranks only relevant listings.</p>
              <div className="search-row">
                <input
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="Try: 1 bed flat in Westminster under £500k"
                  className="search-input"
                />
                <button className="primary-button" onClick={handleSearch}>Search</button>
              </div>
              <div className="chip-row">
                {examplePrompts.map((item) => (
                  <button
                    key={item}
                    className="chip"
                    onClick={() => {
                      setPrompt(item);
                      setSubmittedPrompt(item);
                      setSelectedProperty(null);
                      setSelectedSlot(null);
                      setBookingConfirmed(false);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="section-head">
              <h2>{submittedPrompt ? 'Search results' : 'Trending properties'}</h2>
              {submittedPrompt ? <span className="pill small">{results.length} results</span> : null}
            </div>

            {submittedPrompt && results.length === 0 ? (
              <div className="card empty-state">No exact matches found. Try increasing your budget, removing a feature, or broadening the area.</div>
            ) : null}

            <div className="grid">
              {activeList.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onSelect={() => {
                    setSelectedProperty(property);
                    setSelectedSlot(null);
                    setBookingConfirmed(false);
                  }}
                />
              ))}
            </div>
          </section>

          <aside className="right-column">
            <div className="card sticky-card">
              {selectedProperty ? (
                <>
                  <img src={selectedProperty.imageUrl} alt={selectedProperty.title} className="detail-image" />
                  <div className="detail-body">
                    <div className="card-header-row">
                      <div>
                        <div className="detail-price">{formatPrice(selectedProperty.price)}</div>
                        <div className="muted">{selectedProperty.title}</div>
                      </div>
                      <span className="badge">{selectedProperty.matchPercentage}% match</span>
                    </div>

                    <div className="facts muted">
                      <span>{selectedProperty.bedrooms} bed</span>
                      <span>{selectedProperty.bathrooms} bath</span>
                      <span>{selectedProperty.propertyType}</span>
                      <span>{selectedProperty.location}</span>
                    </div>

                    <div className="divider" />

                    <div>
                      <div className="section-label">Why this matches</div>
                      <div className="chip-row">
                        {selectedProperty.reasons.map((reason) => (
                          <span className="chip static" key={reason}>{reason}</span>
                        ))}
                      </div>
                    </div>

                    <div className="divider" />

                    <div>
                      <div className="section-label">Description</div>
                      <p className="muted detail-copy">{selectedProperty.description}</p>
                    </div>

                    <div className="divider" />

                    <div>
                      <div className="section-label">Book a viewing</div>
                      <div className="chip-row">
                        {bookingSlots.map((slot) => (
                          <button
                            key={slot}
                            className={`chip ${selectedSlot === slot ? 'chip-active' : ''}`}
                            onClick={() => {
                              setSelectedSlot(slot);
                              setBookingConfirmed(false);
                            }}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                      <button
                        className="primary-button full"
                        disabled={!selectedSlot}
                        onClick={() => setBookingConfirmed(true)}
                      >
                        Confirm viewing with {selectedProperty.agentName}
                      </button>
                      {bookingConfirmed ? (
                        <div className="success-box">Viewing confirmed for {selectedSlot} with {selectedProperty.agentName}.</div>
                      ) : null}
                    </div>
                  </div>
                </>
              ) : (
                <div className="placeholder-panel">
                  <h3>Select a property</h3>
                  <p className="muted">Click a card to view the property details, see why it matches the prompt and test the booking flow.</p>
                  <div className="note-box">
                    <strong>What this prototype proves</strong>
                    <ul>
                      <li>Natural-language prompt search can narrow down property options quickly</li>
                      <li>Structured attributes make results more reliable</li>
                      <li>AI-style ranking can help users focus on the top few listings</li>
                      <li>A lightweight prototype is enough to demonstrate the concept publicly</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
