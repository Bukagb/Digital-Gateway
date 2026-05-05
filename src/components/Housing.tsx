import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  Home, 
  MapPin, 
  Euro, 
  ArrowRight, 
  CheckCircle2, 
  Info, 
  AlertCircle, 
  ExternalLink,
  MessageCircle,
  Clock,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { UserProfile } from '../types';

interface HousingListing {
  id: string;
  title: string;
  price: number;
  type: 'Student residence' | 'Shared apartment' | 'Studio';
  city: string;
  image: string;
  gallery?: string[];
  verified: boolean;
  suitableForNIF: boolean;
  description: string;
  isInternal: boolean;
  partnerUrl?: string;
}

const FALLBACK_HOUSING_IMAGE = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800";

const MOCK_LISTINGS: HousingListing[] = [
  {
    id: 'h1',
    title: 'Student Room – Porto Downtown',
    price: 550,
    type: 'Shared apartment',
    city: 'Porto',
    image: 'https://images.unsplash.com/photo-1596276122653-679c5c46b7f0?auto=format&fit=crop&q=80&w=800', // Bedroom
    gallery: [
      'https://images.unsplash.com/photo-1596276122653-679c5c46b7f0?auto=format&fit=crop&q=80&w=800', // Bed
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800', // Small Living
      'https://images.unsplash.com/photo-1556911223-e47974639379?auto=format&fit=crop&q=80&w=800', // Kitchen
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800', // Clean bath
      'https://images.unsplash.com/photo-1512915922686-57c11fd9b6b3?auto=format&fit=crop&q=80&w=800', // Exterior
    ],
    verified: true,
    suitableForNIF: true,
    isInternal: true,
    description: 'Realistic shared apartment in the city center. Includes a desk for studying and all essential utilities. You share with 2 other international students.'
  },
  {
    id: 'h2',
    title: 'Compact Studio near University',
    price: 750,
    type: 'Studio',
    city: 'Porto',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800', // Main
    gallery: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800', // Desk view
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800', // Bed area
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800', // Kitchenette
      'https://images.unsplash.com/photo-1507652313519-d451e7a4f1ea?auto=format&fit=crop&q=80&w=800', // Bathroom
    ],
    verified: true,
    suitableForNIF: true,
    isInternal: true,
    description: 'Private studio for students who prefer personal space. Fully equipped with a private bathroom and kitchenette.'
  },
  {
    id: 'h3',
    title: 'Shared Flat Room - Boavista',
    price: 450,
    type: 'Shared apartment',
    city: 'Porto',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1484154218962-0e311a2f6431?auto=format&fit=crop&q=80&w=800',
    ],
    verified: true,
    suitableForNIF: true,
    isInternal: false,
    partnerUrl: 'https://www.uniplaces.com/',
    description: 'Simple and affordable room in the residential area of Boavista. Excellent metro connections to all campus locations.'
  },
  {
    id: 'h4',
    title: 'University Hub Room',
    price: 600,
    type: 'Student residence',
    city: 'Porto',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1536376074432-bf132404ad72?auto=format&fit=crop&q=80&w=800',
    ],
    verified: true,
    suitableForNIF: true,
    isInternal: true,
    description: 'Standard single room in a certified student residence. Includes study areas and shared common rooms.'
  },
  {
    id: 'h5',
    title: 'Bright Room - Cedofeita',
    price: 500,
    type: 'Shared apartment',
    city: 'Porto',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800',
    gallery: [
       'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800',
       'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800',
       'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800',
    ],
    verified: true,
    suitableForNIF: true,
    isInternal: false,
    partnerUrl: 'https://www.idealista.pt/',
    description: 'Traditional Porto apartment room. High ceilings and wooden floors. Located in the artistic quarter.'
  },
  {
    id: 'h6',
    title: 'Ribeira District Studio',
    price: 900,
    type: 'Studio',
    city: 'Porto',
    image: 'https://images.unsplash.com/photo-1502672023488-70e25813efdf?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1502672023488-70e25813efdf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1556911223-e47974639379?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    ],
    verified: true,
    suitableForNIF: true,
    isInternal: true,
    description: 'Central studio with historic character. Small but efficient layout, perfect for short academic stays.'
  }
];


function ImageCarousel({ images, id, setExternalIndex, externalIndex }: { images: string[], id: string, setExternalIndex?: (i: number) => void, externalIndex?: number }) {
  const [index, setInternalIndex] = React.useState(0);
  const [errorIds, setErrorIds] = React.useState<Set<number>>(new Set());
  
  const currentIndex = externalIndex !== undefined ? externalIndex : index;
  const setIndex = setExternalIndex || setInternalIndex;

  React.useEffect(() => {
    if (images.length <= 1 || externalIndex !== undefined) return;
    const interval = setInterval(() => {
      setIndex((currentIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length, currentIndex, externalIndex, setIndex]);

  // If we have an error for the current index, try to move to the next one
  const handleImageError = () => {
    setErrorIds(prev => new Set(prev).add(currentIndex));
    if (images.length > 1) {
      setIndex((currentIndex + 1) % images.length);
    }
  };

  // If the specific image at index results in error, and it's the only one, show fallback
  const currentImg = (images[currentIndex] && !errorIds.has(currentIndex)) 
    ? images[currentIndex] 
    : FALLBACK_HOUSING_IMAGE;

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center text-gray-400">
        <Home size={40} className="mb-2 opacity-20" />
        <span className="text-[10px] uppercase font-bold tracking-widest">Image not available</span>
      </div>
    );
  }

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((currentIndex + 1) % images.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-full group/carousel bg-gray-50">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImg}
          src={currentImg}
          onError={handleImageError}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover/carousel:opacity-100 transition-all pointer-events-none">
            <button 
              onClick={prev}
              className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors pointer-events-auto shadow-sm"
            >
              <ChevronRight className="rotate-180" size={18} />
            </button>
            <button 
              onClick={next}
              className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors pointer-events-auto shadow-sm"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 px-4 pointer-events-none">
            {images.map((_, i) => (
              <div 
                key={i}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  i === currentIndex ? 'w-6 bg-white shadow-sm' : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Housing() {
  const [activeTab, setActiveTab] = useState<'find' | 'learn'>('find');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [selectedListing, setSelectedListing] = useState<HousingListing | null>(null);
  const [detailImageIndex, setDetailImageIndex] = useState(0);

  // Interaction flows state
  const [bookingStep, setBookingStep] = useState<'none' | 'confirm' | 'date' | 'submitting' | 'success'>('none');
  const [helpStep, setHelpStep] = useState<'none' | 'form' | 'submitting' | 'success'>('none');
  const [moveInDate, setMoveInDate] = useState('');
  const [supportType, setSupportType] = useState('Verify listing');
  const [redirectNotice, setRedirectNotice] = useState(false);

  const resetFlows = () => {
    setBookingStep('none');
    setHelpStep('none');
    setMoveInDate('');
    setSupportType('Verify listing');
    setRedirectNotice(false);
  };

  const handleCloseModal = () => {
    setSelectedListing(null);
    setDetailImageIndex(0);
    resetFlows();
  };

  const startBooking = () => {
    if (!selectedListing) return;
    
    if (selectedListing.isInternal) {
      setBookingStep('confirm');
    } else {
      setRedirectNotice(true);
      setTimeout(() => {
        window.open(selectedListing.partnerUrl, '_blank');
        setRedirectNotice(false);
      }, 2000);
    }
  };

  const handleBookingSubmit = () => {
    setBookingStep('submitting');
    setTimeout(() => {
      setBookingStep('success');
    }, 1500);
  };

  const handleHelpSubmit = () => {
    setHelpStep('submitting');
    setTimeout(() => {
      setHelpStep('success');
    }, 1500);
  };

  const filteredListings = MOCK_LISTINGS.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          listing.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || listing.type === selectedType;
    const matchesVerified = !verifiedOnly || listing.verified;
    return matchesSearch && matchesType && matchesVerified;
  });

  const renderFindHousing = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-ink mb-2 tracking-tight">Find Verified Housing</h1>
        <p className="text-text-muted text-lg">Browse safe and trusted housing options suitable for your stay in Portugal.</p>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-teal-50 shadow-soft space-y-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search by city or area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-gray-50 border border-gray-100 rounded-2xl py-3.5 px-6 text-sm font-bold text-ink focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="All">All Housing Types</option>
              <option value="Student residence">Student Residence</option>
              <option value="Shared apartment">Shared Apartment</option>
              <option value="Studio">Studio</option>
            </select>
            
            <label className="flex items-center gap-3 bg-gray-50 border border-gray-100 px-6 py-3.5 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors">
              <input 
                type="checkbox" 
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-5 h-5 accent-primary rounded-lg"
              />
              <span className="text-sm font-bold text-ink">Verified only</span>
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredListings.map((listing) => (
          <motion.div 
            key={listing.id}
            layoutId={listing.id}
            className="group bg-white rounded-[2.5rem] overflow-hidden border border-teal-50 shadow-soft hover:shadow-xl transition-all"
          >
            <div className="relative h-56 overflow-hidden">
              <ImageCarousel images={listing.gallery || [listing.image]} id={listing.id} />
              <div className="absolute top-4 left-4 p-1.5 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest text-primary shadow-sm z-10">
                {listing.type}
              </div>
              <div className="absolute top-4 right-4 p-1.5 bg-ink/80 backdrop-blur-md rounded-xl text-[8px] font-black uppercase tracking-widest text-white shadow-sm z-10">
                {listing.isInternal ? 'Handled by Gateway' : 'Partner Listing'}
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-ink mb-1 group-hover:text-primary transition-colors line-clamp-1">{listing.title}</h3>
                <div className="flex items-center gap-2 text-text-muted text-sm font-medium">
                  <MapPin size={14} />
                  <span>{listing.city}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-2xl font-black text-primary">€{listing.price}</span>
                <span className="text-xs text-text-muted font-bold">/month</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {listing.verified && (
                  <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold border border-emerald-100">
                    <ShieldCheck size={12} /> Verified
                  </span>
                )}
                {listing.suitableForNIF && (
                  <span className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold border border-blue-100">
                    <Home size={12} /> Suitable for NIF
                  </span>
                )}
              </div>
              
              <div className="pt-2">
                <button 
                  onClick={() => setSelectedListing(listing)}
                  className="w-full bg-primary text-white font-black py-4 rounded-xl text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredListings.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-gray-300 mx-auto mb-6">
            <Search size={40} />
          </div>
          <h3 className="text-xl font-bold text-ink mb-2">No listings found</h3>
          <p className="text-text-muted">Try adjusting your filters or search terms.</p>
        </div>
      )}

      {/* Listing Detail Side Modal */}
      <AnimatePresence>
        {selectedListing && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col"
            >
              <div className="h-80 relative shrink-0">
                <ImageCarousel 
                  images={selectedListing.gallery || [selectedListing.image]} 
                  id={selectedListing.id} 
                  externalIndex={detailImageIndex}
                  setExternalIndex={setDetailImageIndex}
                />
                <button 
                  onClick={handleCloseModal}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-ink shadow-lg hover:scale-110 transition-transform z-10"
                >
                  <ArrowRight size={20} />
                </button>
                <div className="absolute top-6 left-6 p-2 bg-white/90 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary shadow-sm border border-primary/10 z-10">
                  {selectedListing.isInternal ? 'Handled by Digital Gateway' : 'Partner Listing'}
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-10">
                {/* Initial View */}
                {bookingStep === 'none' && helpStep === 'none' && (
                  <div className="space-y-8 animate-in fade-in duration-300">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h2 className="text-3xl font-black text-ink mb-2">{selectedListing.title}</h2>
                        <div className="flex items-center gap-2 text-text-muted font-bold text-base">
                          <MapPin size={18} />
                          {selectedListing.city} • {selectedListing.type}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-black text-primary mb-1">€{selectedListing.price}</p>
                        <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Per Month</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-5 bg-emerald-50 rounded-3xl border border-emerald-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm">
                          <ShieldCheck size={24} />
                        </div>
                        <div>
                          <p className="text-xs font-black text-emerald-900 uppercase">Verified</p>
                          <p className="text-xs text-emerald-700 font-medium">Safe Listing</p>
                        </div>
                      </div>
                      <div className="p-5 bg-amber-50 rounded-3xl border border-amber-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-sm">
                          <Home size={24} />
                        </div>
                        <div>
                          <p className="text-xs font-black text-amber-900 uppercase">NIF Ready</p>
                          <p className="text-xs text-amber-700 font-medium">Valid for NIF</p>
                        </div>
                      </div>
                    </div>

                    {/* Thumbnail Navigation */}
                    {selectedListing.gallery && selectedListing.gallery.length > 1 && (
                      <div className="space-y-4">
                        <h4 className="text-[10px] uppercase font-black tracking-widest text-gray-400">All Photos</h4>
                        <div className="grid grid-cols-5 gap-3">
                          {selectedListing.gallery.map((img, i) => (
                             <motion.div 
                              key={i} 
                              whileHover={{ scale: 1.05 }}
                              onClick={() => setDetailImageIndex(i)}
                              className={`aspect-square rounded-2xl overflow-hidden shadow-sm border transition-all cursor-pointer ${
                                detailImageIndex === i ? 'border-primary ring-2 ring-primary/20' : 'border-gray-100 opacity-60 hover:opacity-100'
                              }`}
                             >
                              <img 
                                src={img} 
                                alt={`Property ${i}`} 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                             </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-4 pt-4 border-t border-gray-100">
                      <h4 className="font-bold text-ink text-lg">About this property</h4>
                      <p className="text-text-muted leading-relaxed">{selectedListing.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3 bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex-1">
                        <ShieldCheck className="text-emerald-600" size={24} />
                        <div>
                          <p className="text-xs font-black uppercase text-emerald-600">Verification</p>
                          <p className="text-[11px] font-bold text-emerald-800">Verified by Gateway</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-2xl border border-blue-100 flex-1">
                        <Home className="text-blue-600" size={24} />
                        <div>
                          <p className="text-xs font-black uppercase text-blue-600">Residency Info</p>
                          <p className="text-[11px] font-bold text-blue-800">Provides NIF Proof</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-2">
                       <button 
                        onClick={startBooking}
                        className="flex-1 bg-primary text-white font-black py-5 rounded-2xl shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                      >
                        {selectedListing.isInternal ? 'Proceed to Booking' : 'Book with Partner'} <ExternalLink size={20} />
                      </button>
                      <button 
                        onClick={() => setHelpStep('form')}
                        className="flex-1 bg-ink text-white font-black py-5 rounded-2xl shadow-xl hover:bg-black transition-all"
                      >
                        Get Help from Gateway
                      </button>
                    </div>

                    {redirectNotice && (
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-xs font-bold text-primary bg-primary/5 py-3 rounded-xl border border-primary/10"
                      >
                        You are being redirected to a verified partner platform.
                      </motion.p>
                    )}
                  </div>
                )}
                
                {/* Help Flow - Now handled by separate component/state or integrated logic */}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Booking Flow Side Modal */}
      <AnimatePresence>
        {bookingStep !== 'none' && selectedListing && (
          <div className="fixed inset-0 z-[60] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg">
                    <CheckCircle2 size={20} />
                  </div>
                  <h3 className="text-xl font-black text-ink">Confirm Booking</h3>
                </div>
                <button 
                  onClick={() => setBookingStep('none')}
                  className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-ink transition-colors"
                >
                  <ArrowRight size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8">
                <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                  {bookingStep === 'confirm' && (
                    <>
                      <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                          <Home size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-ink">Confirm Interest</h3>
                        <p className="text-text-muted">You are starting a booking request for {selectedListing.title}.</p>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-3xl space-y-4 border border-gray-100">
                        <p className="text-sm font-medium text-ink">Everything looks good! In the next step, you'll choose your preferred move-in date.</p>
                        <div className="flex items-center gap-3 text-xs text-primary font-bold">
                          <ShieldCheck size={16} /> Verified Internal Listing
                        </div>
                      </div>
                      <div className="pt-4">
                        <button onClick={() => setBookingStep('date')} className="w-full py-5 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Next: Select Date</button>
                        <button onClick={() => setBookingStep('none')} className="w-full mt-4 py-4 text-gray-500 font-bold hover:text-ink transition-colors">Cancel</button>
                      </div>
                    </>
                  )}

                  {bookingStep === 'date' && (
                     <>
                      <div className="text-center space-y-2">
                         <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                          <Clock size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-ink">Select Move-in Date</h3>
                        <p className="text-text-muted">When do you plan to arrive?</p>
                      </div>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Move-in Date</label>
                          <input 
                            type="date" 
                            value={moveInDate}
                            onChange={(e) => setMoveInDate(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 text-ink font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                          <p className="text-[10px] text-emerald-800 font-bold text-center uppercase tracking-widest">A Digital Gateway expert will contact you to finalize the contract after submission.</p>
                        </div>
                      </div>
                      <div className="pt-4 space-y-4">
                        <button 
                          disabled={!moveInDate}
                          onClick={handleBookingSubmit}
                          className="w-full py-5 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                        >
                          Submit Request
                        </button>
                        <button onClick={() => setBookingStep('confirm')} className="w-full py-4 text-gray-500 font-bold hover:text-ink transition-colors">Back</button>
                      </div>
                    </>
                  )}

                  {bookingStep === 'submitting' && (
                    <div className="h-full flex flex-col items-center justify-center py-20 text-center space-y-6">
                       <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
                       <p className="text-lg font-bold text-ink">Processing your request...</p>
                    </div>
                  )}

                  {bookingStep === 'success' && (
                     <div className="h-full flex flex-col items-center justify-center py-10 text-center space-y-8 animate-in zoom-in-95 duration-500">
                      <div className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-200">
                        <CheckCircle2 size={48} />
                      </div>
                      <div>
                        <h3 className="text-3xl font-black text-ink mb-4">Request Sent!</h3>
                        <p className="text-text-muted leading-relaxed max-w-xs mx-auto">Your booking request has been sent. A Digital Gateway expert will follow up within 24 hours to guide you through the next steps.</p>
                      </div>
                      <button onClick={handleCloseModal} className="w-full py-5 bg-ink text-white rounded-2xl font-black shadow-xl hover:bg-black transition-all">Close</button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Help Flow Side Modal */}
      <AnimatePresence>
        {helpStep !== 'none' && (
          <div className="fixed inset-0 z-[60] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg">
                    <MessageCircle size={20} />
                  </div>
                  <h3 className="text-xl font-black text-ink">Get Expert Help</h3>
                </div>
                <button 
                  onClick={() => setHelpStep('none')}
                  className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-ink transition-colors"
                >
                  <ArrowRight size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8">
                {helpStep === 'form' && (
                  <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10">
                      <p className="text-sm text-text-muted font-medium leading-relaxed">
                        Our team can verify this listing, contact the landlord, and assist you through the booking process. We ensure you're working with a legitimate property.
                      </p>
                    </div>

                    <div className="space-y-6">
                       <div>
                        <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3">Support Type</label>
                        <div className="grid grid-cols-1 gap-3">
                          {['Verify listing', 'Help contact landlord', 'Full booking assistance'].map((type) => (
                            <button
                              key={type}
                              onClick={() => setSupportType(type)}
                              className={`p-5 rounded-2xl border text-left font-bold transition-all ${
                                supportType === type 
                                ? 'bg-primary/5 border-primary text-primary shadow-sm' 
                                : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                        <div className="flex justify-between items-center mb-3">
                           <p className="text-xs font-bold text-ink">Upload Documents (Optional)</p>
                           <span className="text-[10px] text-gray-400 font-bold uppercase">PDF, Image</span>
                        </div>
                        <button className="w-full py-8 bg-white border border-dashed border-gray-300 rounded-2xl text-xs font-bold text-gray-400 hover:border-primary hover:text-primary transition-all flex flex-col items-center gap-2">
                           <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                             <ExternalLink size={14} />
                           </div>
                           Drag & drop or Click to browse
                        </button>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button 
                        onClick={handleHelpSubmit} 
                        className="w-full py-5 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                      >
                        Request Assistance
                      </button>
                    </div>
                  </div>
                )}

                {helpStep === 'submitting' && (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                     <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                     <p className="text-xl font-bold text-ink">Submitting your request...</p>
                  </div>
                )}

                {helpStep === 'success' && (
                   <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in-95 duration-500">
                    <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/20">
                      <Sparkles size={48} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-ink mb-4">We've got your back!</h3>
                      <p className="text-text-muted leading-relaxed max-w-xs mx-auto">
                        A Digital Gateway expert will contact you shortly via the platform chat and email to assist you with this listing.
                      </p>
                    </div>
                    <button 
                      onClick={() => setHelpStep('none')} 
                      className="w-full py-5 bg-ink text-white rounded-2xl font-black shadow-xl hover:bg-black transition-all"
                    >
                      Got it
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderLearnGuide = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-ink mb-2 tracking-tight">Learn & Guide</h1>
        <p className="text-text-muted text-lg">Understand the housing landscape and requirements in Portugal.</p>
      </div>

      <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <p className="text-text-muted leading-relaxed">
          Housing is one of the most important and challenging steps for international students. Finding a permanent address isn't just about comfort; it's practically mandatory for finalizing your <span className="font-bold text-primary">NIF</span>, opening a full <span className="font-bold text-primary">bank account</span>, and completing your <span className="font-bold text-primary">residency registration</span>.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
          <h3 className="text-xl font-bold mb-6">Types of Housing</h3>
          <div className="space-y-4">
            {[
              { type: 'Student Residences', desc: 'University or private dorms with social areas.' },
              { type: 'Shared Apartments', desc: 'Private room in a shared flat with other students/expats.' },
              { type: 'Private Studios', desc: 'Full privacy, usually the most expensive option.' }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                  <Home size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-ink">{item.type}</h4>
                  <p className="text-xs text-text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="space-y-8">
          <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
            <h3 className="text-xl font-bold mb-6">Requirements</h3>
            <ul className="space-y-3">
              {['Valid Passport', 'Proof of income or guarantor (sometimes)', 'Deposit (usually 1–2 months rent)'].map((req, i) => (
                <li key={i} className="flex gap-3 text-sm font-medium text-text-main items-center">
                  <CheckCircle2 size={18} className="text-primary" />
                  {req}
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
            <h3 className="text-xl font-bold mb-6">Average Pricing</h3>
            <div className="flex gap-4">
              <div className="flex-1 p-4 bg-gray-50 rounded-2xl text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Shared Room</p>
                <p className="text-lg font-bold text-primary">€250 – €500</p>
              </div>
              <div className="flex-1 p-4 bg-gray-50 rounded-2xl text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Private Studio</p>
                <p className="text-lg font-bold text-primary">€600 – €1000</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-xl font-bold text-ink">Trusted Platforms</h3>
            <p className="text-xs text-text-muted">Verified partners for safe student housing in Portugal.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Uniplaces', url: 'https://www.uniplaces.com/', logo: 'U', color: 'bg-blue-600', desc: 'Mid-long term stays' },
            { name: 'Idealista', url: 'https://www.idealista.pt/', logo: 'I', color: 'bg-emerald-600', desc: 'Real estate portal' },
            { name: 'Spotahome', url: 'https://www.spotahome.com/', logo: 'S', color: 'bg-orange-600', desc: 'Online booking focus' },
            { name: 'Inlife', url: 'https://inlifeportugal.com/', logo: 'N', color: 'bg-purple-600', desc: 'Video tours available' }
          ].map((platform) => (
            <div 
              key={platform.name}
              className="flex flex-col items-center p-6 bg-gray-50/50 rounded-[2rem] border border-gray-100 hover:border-primary/20 hover:bg-white hover:shadow-xl transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl ${platform.color} flex items-center justify-center text-white font-black text-2xl mb-4 shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-all`}>
                {platform.logo}
              </div>
              <h4 className="font-bold text-base mb-1 text-ink">{platform.name}</h4>
              <p className="text-[10px] text-text-muted mb-4 font-medium">{platform.desc}</p>
              <div className="flex flex-col gap-2 w-full mt-2">
                <a 
                  href={platform.url}
                  target="_blank"
                  rel="no-referrer"
                  className="text-[10px] text-primary font-bold flex items-center justify-center gap-1 uppercase tracking-widest bg-primary/5 px-3 py-2 rounded-xl hover:bg-primary hover:text-white transition-all text-center"
                >
                  View Listing <ExternalLink size={10} />
                </a>
                <button 
                  onClick={() => {
                    const win = window.open(platform.url, '_blank');
                    if (win) {
                      // Show a small temporary indicator if needed, but the external redirect is clear
                    }
                  }}
                  className="text-[10px] text-gray-500 font-bold flex items-center justify-center gap-1 uppercase tracking-widest bg-gray-100 px-3 py-2 rounded-xl hover:bg-gray-200 transition-all"
                >
                  Book with Partner
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 p-4 bg-orange-50/50 rounded-2xl border border-orange-100 flex items-center gap-3">
           <AlertCircle className="text-secondary shrink-0" size={20} />
           <p className="text-xs text-orange-900 leading-normal">
             <strong>Facebook Groups:</strong> Use with extreme caution. Never pay a deposit before seeing a room in person or through a verified platform. Ask them for a video tour or a "Contrato de Arrendamento" proof first.
           </p>
        </div>
      </section>

      <section className="bg-white p-8 rounded-[2.5rem] border border-teal-50 shadow-soft">
        <h3 className="text-xl font-bold mb-8">Step-by-Step Guide</h3>
        <div className="space-y-8">
          {[
            { title: 'Decide budget and city', desc: 'Factor in utilities (electricity/water) which are sometimes extra.' },
            { title: 'Search on trusted platforms', desc: 'Use filters for location, price, and "verified" listings.' },
            { title: 'Contact landlord or book online', desc: 'Have your documents ready to show profile seriousness.' },
            { title: 'Verify contract before payment', desc: 'Ask for a "Contrato de Arrendamento" registered with AT.' },
            { title: 'Move in and keep proof of address', desc: 'Save the contract PDF; you will need it for other processes.' }
          ].map((s, i) => (
            <div key={i} className="flex gap-6">
              <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                {i + 1}
              </div>
              <div>
                <h4 className="font-bold text-lg text-ink mb-1">{s.title}</h4>
                <p className="text-sm text-text-muted leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-red-50 p-8 rounded-[2.5rem] border border-red-100">
          <h3 className="text-xl font-bold text-red-900 mb-6 flex items-center gap-2">
            <AlertCircle size={24} /> Risks & Common Mistakes
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {[
              'Paying before viewing (unless via verified platforms)',
              'Fake listings on social media',
              'Transfers via Western Union/Wise outside official apps',
              'Landlords refusing to provide a legal contract'
            ].map((risk, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-red-800 font-medium">
                <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-red-500 text-[10px] shrink-0 mt-0.5">X</span>
                {risk}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-teal-50 p-8 rounded-[2.5rem] border border-teal-100">
          <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <Info size={24} /> Pro Tips
          </h3>
          <ul className="space-y-4">
            {[
              'Use verified platforms like Uniplaces or Spotahome for your first month.',
              'Avoid sending money to individuals you haven\'t met or without a legal contract.',
              'Always request an official contract (Contrato de Arrendamento).'
            ].map((tip, i) => (
              <li key={i} className="flex gap-3 text-sm text-teal-900 font-medium leading-relaxed">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-4 space-y-10">
      {/* Tabs */}
      <div className="flex justify-center md:justify-start">
        <div className="bg-white p-1.5 rounded-[1.5rem] border border-teal-50 shadow-soft flex gap-2">
          <button 
            onClick={() => setActiveTab('find')}
            className={`px-8 py-3.5 rounded-[1.2rem] text-sm font-bold transition-all ${
              activeTab === 'find' 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'text-gray-500 hover:text-ink'
            }`}
          >
            Find Housing
          </button>
          <button 
            onClick={() => setActiveTab('learn')}
            className={`px-8 py-3.5 rounded-[1.2rem] text-sm font-bold transition-all ${
              activeTab === 'learn' 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'text-gray-500 hover:text-ink'
            }`}
          >
            Learn & Guide
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'find' ? renderFindHousing() : renderLearnGuide()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
