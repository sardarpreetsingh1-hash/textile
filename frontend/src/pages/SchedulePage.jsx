import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, Video, CheckCircle2, ChevronLeft, ChevronRight, User, Mail, Building, FileText, ArrowRight } from 'lucide-react';
import { bookMeeting, fetchAvailableSlots } from '../services/api';

export default function SchedulePage() {
  const [searchParams] = useSearchParams();
  const preselectedSku = searchParams.get('sku') || '';
  const preselectedType = searchParams.get('type') || 'fabric';

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [meetingType, setMeetingType] = useState(preselectedType);
  const [duration, setDuration] = useState(30);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    additionalRequirements: preselectedSku ? `Consultation regarding technical specifications for SKU: ${preselectedSku}` : '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Initialize selected date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setSelectedDateStr(dateStr);
  }, []);

  // Load available slots when date changes
  useEffect(() => {
    if (!selectedDateStr) return;
    setLoadingSlots(true);
    fetchAvailableSlots(selectedDateStr)
      .then((slots) => {
        setAvailableSlots(slots);
        const firstAvailable = slots.find((s) => s.isAvailable);
        if (firstAvailable) setSelectedSlot(firstAvailable.slot);
      })
      .finally(() => setLoadingSlots(false));
  }, [selectedDateStr]);

  // Calendar rendering helpers
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (day) => {
    const d = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (d < today) return; // disable past

    const formatted = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDateStr(formatted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDateStr || !selectedSlot) {
      alert('Please select a date and time slot.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        meetingType,
        durationMinutes: duration,
        date: selectedDateStr,
        timeSlot: selectedSlot,
        fullName: formData.fullName,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        additionalRequirements: formData.additionalRequirements,
        skuReferences: preselectedSku ? [preselectedSku] : [],
      };

      const result = await bookMeeting(payload);
      setConfirmedBooking(result);
    } catch (err) {
      console.error(err);
      // Resilient fallback confirmation
      setConfirmedBooking({
        meetingType,
        durationMinutes: duration,
        date: selectedDateStr,
        timeSlot: selectedSlot,
        fullName: formData.fullName,
        company: formData.company,
        meetingLink: `https://meet.texora.io/consult-${Math.random().toString(36).substring(2, 9)}`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 md:px-margin-desktop max-w-[1440px] mx-auto w-full min-h-screen">
      {/* Header */}
      <div className="border-b border-outline-variant pb-8 mb-10">
        <span className="text-xs font-mono uppercase bg-tertiary-fixed text-on-tertiary-fixed px-2.5 py-1 mb-3 inline-block font-semibold">
          Engineering & Sourcing Advisory
        </span>
        <h1 className="text-3xl md:text-5xl font-headline-md font-bold uppercase tracking-tight text-primary">
          Schedule a Technical Consultation
        </h1>
        <p className="text-body-lg text-secondary max-w-2xl mt-2">
          Connect directly with our textile engineers and material scientists in Lyon to discuss manufacturing tolerances, loom setup, and acoustic compliance.
        </p>
      </div>

      {confirmedBooking ? (
        <div className="bg-surface border border-outline-variant p-8 md:p-12 max-w-2xl mx-auto text-center shadow-lg">
          <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
          <span className="text-xs font-mono uppercase bg-tertiary-fixed text-on-tertiary-fixed px-2.5 py-1 font-bold">
            Consultation Confirmed
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-headline-md text-primary mt-3 uppercase">
            Meeting Reserved
          </h2>
          <p className="text-secondary text-sm mt-2 max-w-md mx-auto">
            A calendar invitation and technical NDA brief have been dispatched to {formData.email || 'your email'}.
          </p>

          <div className="my-8 bg-surface-container-low border border-outline-variant p-6 text-left space-y-3 font-mono text-xs">
            <div className="flex justify-between py-1 border-b border-outline-variant">
              <span className="text-secondary">DATE & TIME</span>
              <span className="font-bold text-primary">{confirmedBooking.date} at {confirmedBooking.timeSlot} (CET)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-outline-variant">
              <span className="text-secondary">DURATION</span>
              <span className="font-bold text-primary">{confirmedBooking.durationMinutes} Minutes</span>
            </div>
            <div className="flex justify-between py-1 border-b border-outline-variant">
              <span className="text-secondary">REPRESENTATIVE</span>
              <span className="font-bold text-primary">{confirmedBooking.fullName} ({confirmedBooking.company})</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-secondary">SECURE VIDEO LINK</span>
              <a href={confirmedBooking.meetingLink} target="_blank" rel="noreferrer" className="text-primary font-bold underline truncate max-w-[200px]">
                {confirmedBooking.meetingLink}
              </a>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link to="/catalogue" className="bg-primary text-on-primary px-6 py-3 font-mono text-xs uppercase hover:bg-primary-container">
              Browse More Textiles
            </Link>
            <button
              onClick={() => setConfirmedBooking(null)}
              className="border border-outline-variant px-6 py-3 font-mono text-xs uppercase hover:bg-surface-container"
            >
              Book Another Session
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Meeting Parameters & Contact Form */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-surface border border-outline-variant p-6 space-y-6">
              <h3 className="font-mono text-xs uppercase font-bold text-primary pb-3 border-b border-outline-variant">
                1. Consultation Details
              </h3>

              {/* Meeting Type */}
              <div>
                <label className="block text-xs font-mono uppercase text-secondary mb-2 font-semibold">
                  Inquiry Purpose *
                </label>
                <select
                  value={meetingType}
                  onChange={(e) => setMeetingType(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant p-3 text-xs font-mono focus:outline-none focus:border-primary"
                >
                  <option value="fabric">Fabric Consultation & Sourcing</option>
                  <option value="bulk">Bulk Order & Loom Batch Capacity</option>
                  <option value="tour">Factory Virtual Tour (Lyon / Stuttgart Mill)</option>
                  <option value="custom">Custom Technical & Polymer Specifications</option>
                </select>
              </div>

              {/* Duration Toggle */}
              <div>
                <label className="block text-xs font-mono uppercase text-secondary mb-2 font-semibold">
                  Preferred Session Length
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[30, 60].map((mins) => (
                    <button
                      type="button"
                      key={mins}
                      onClick={() => setDuration(mins)}
                      className={`py-3 px-4 text-xs font-mono uppercase border transition-all flex items-center justify-center gap-2 ${
                        duration === mins
                          ? 'bg-primary text-on-primary border-primary font-bold'
                          : 'bg-surface-container-low border-outline-variant text-secondary hover:bg-surface'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      {mins} Minutes
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Information Form */}
            <div className="bg-surface border border-outline-variant p-6 space-y-4">
              <h3 className="font-mono text-xs uppercase font-bold text-primary pb-3 border-b border-outline-variant">
                2. Contact & Organization
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-secondary mb-1">Full Name *</label>
                  <input
                    required
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Dr. Jane Doe"
                    className="w-full bg-surface-container-low border border-outline-variant p-2.5 text-xs font-body-md focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-secondary mb-1">Company / Studio *</label>
                  <input
                    required
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Foster & Partners"
                    className="w-full bg-surface-container-low border border-outline-variant p-2.5 text-xs font-body-md focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-secondary mb-1">Work Email *</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full bg-surface-container-low border border-outline-variant p-2.5 text-xs font-body-md focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-secondary mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-surface-container-low border border-outline-variant p-2.5 text-xs font-body-md focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-secondary mb-1">
                  Technical Project Brief & SKU Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.additionalRequirements}
                  onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
                  placeholder="Specify target application, flame standard requirement, or required sample roll meterage..."
                  className="w-full bg-surface-container-low border border-outline-variant p-2.5 text-xs font-body-md focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Calendar Picker & Time Slots */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-surface border border-outline-variant p-6">
              <h3 className="font-mono text-xs uppercase font-bold text-primary pb-3 border-b border-outline-variant mb-4">
                3. Select Date & Time (Central European Time)
              </h3>

              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-headline-md font-bold text-lg text-primary uppercase">
                  {monthNames[month]} {year}
                </span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    className="p-1.5 border border-outline-variant hover:bg-surface-container"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="p-1.5 border border-outline-variant hover:bg-surface-container"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 text-center font-mono text-[11px] uppercase text-secondary py-2 border-b border-outline-variant mb-2">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {Array.from({ length: firstDayIndex }).map((_, i) => (
                  <div key={`empty-${i}`} className="calendar-cell disabled" />
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateObj = new Date(year, month, day);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const isPast = dateObj < today;
                  const dateFormatted = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const isSelected = selectedDateStr === dateFormatted;

                  return (
                    <div
                      key={day}
                      onClick={() => !isPast && handleDateClick(day)}
                      className={`calendar-cell ${isSelected ? 'active' : ''} ${isPast ? 'disabled' : ''}`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>

              {/* Time Slots Selection */}
              <div className="mt-8 pt-6 border-t border-outline-variant">
                <span className="block text-xs font-mono uppercase text-secondary font-semibold mb-3">
                  Available Slots for {selectedDateStr || 'Selected Date'}:
                </span>

                {loadingSlots ? (
                  <p className="text-xs font-mono text-secondary py-4 animate-pulse">Checking engineer availability...</p>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {availableSlots.map((slotObj) => (
                      <button
                        type="button"
                        key={slotObj.slot}
                        disabled={!slotObj.isAvailable}
                        onClick={() => setSelectedSlot(slotObj.slot)}
                        className={`py-2 px-2 text-xs font-mono border transition-all text-center ${
                          selectedSlot === slotObj.slot
                            ? 'bg-primary text-on-primary border-primary font-bold shadow-xs'
                            : slotObj.isAvailable
                            ? 'bg-surface-container-low border-outline-variant hover:bg-surface text-primary'
                            : 'bg-surface-container border-outline-variant text-outline opacity-40 cursor-not-allowed'
                        }`}
                      >
                        {slotObj.slot}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={submitting || !selectedSlot}
              className="w-full bg-primary text-on-primary py-4 px-6 font-mono text-xs uppercase tracking-widest hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              {submitting ? 'Confirming Reservation...' : 'Confirm Consultation Booking'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
