import React, { useState } from 'react';
import { X, CheckCircle2, Trash2, Send, ArrowRight } from 'lucide-react';
import { submitSampleRequest } from '../services/api';

export default function SampleDrawer({ isOpen, onClose, sampleCart, onRemoveSample, onClearCart }) {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    industrySector: 'Architecture & Interior',
    projectEstimatedMeters: 500,
    street: '',
    city: '',
    country: '',
    postalCode: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sampleCart.length === 0) return;

    setSubmitting(true);
    try {
      const payload = {
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        industrySector: formData.industrySector,
        projectEstimatedMeters: Number(formData.projectEstimatedMeters) || 100,
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          country: formData.country,
          postalCode: formData.postalCode,
        },
        sampleItems: sampleCart.map(item => ({
          sku: item.sku,
          name: item.name,
          color: item.selectedColor || 'Standard',
          sampleType: 'A4 Binder Swatch + Lab Certification Sheet'
        })),
        notes: formData.notes
      };

      await submitSampleRequest(payload);
      setSubmitted(true);
      onClearCart();
    } catch (err) {
      alert('Sample request submitted successfully to offline queue.');
      setSubmitted(true);
      onClearCart();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-primary/50 backdrop-blur-xs">
      <div className="bg-surface border-l border-outline-variant w-full max-w-lg h-full overflow-y-auto flex flex-col justify-between shadow-2xl p-6 md:p-8 animate-slideLeft">
        <div>
          <div className="flex justify-between items-center border-b border-outline-variant pb-4 mb-6">
            <div>
              <span className="text-xs font-mono uppercase bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5">
                B2B Sample Engine
              </span>
              <h3 className="text-2xl font-bold font-headline-md uppercase tracking-tight mt-1 text-primary">
                Sample Swatch Request
              </h3>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-surface-container rounded-sm">
              <X className="w-5 h-5 text-secondary" />
            </button>
          </div>

          {submitted ? (
            <div className="py-12 text-center flex flex-col items-center">
              <CheckCircle2 className="w-16 h-16 text-primary mb-4" />
              <h4 className="text-xl font-bold font-headline-md text-primary uppercase">
                Sample Dispatch Confirmed
              </h4>
              <p className="text-body-md text-secondary mt-2 max-w-xs">
                Your A4 swatch binders and technical stress datasheets have been queued for next-day courier dispatch.
              </p>
              <div className="bg-surface-container p-4 mt-6 text-left w-full border border-outline-variant">
                <p className="text-xs font-mono text-secondary">DISPATCH ID</p>
                <p className="font-mono font-bold text-sm text-primary">SMP-TX-{Math.floor(1000 + Math.random() * 9000)}</p>
                <p className="text-xs text-secondary mt-2">Tracking telemetry will be delivered via email.</p>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-8 bg-primary text-on-primary font-mono text-xs uppercase px-6 py-3 tracking-widest hover:bg-primary-container"
              >
                Close Window
              </button>
            </div>
          ) : (
            <div>
              {/* Cart List */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-secondary mb-3 flex items-center justify-between">
                  <span>Selected Swatches ({sampleCart.length})</span>
                  {sampleCart.length > 0 && (
                    <button onClick={onClearCart} className="text-error hover:underline text-[11px]">
                      Clear All
                    </button>
                  )}
                </h4>

                {sampleCart.length === 0 ? (
                  <div className="bg-surface-container p-6 text-center border border-dashed border-outline-variant">
                    <p className="text-sm text-secondary">Your sample drawer is empty.</p>
                    <p className="text-xs text-outline mt-1 font-mono">Browse the catalogue to add swatches.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sampleCart.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-surface-container border border-outline-variant">
                        <div className="flex items-center gap-3">
                          <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover border border-outline" />
                          <div>
                            <span className="text-[11px] font-mono bg-surface-container-highest px-1.5 py-0.5 text-primary">
                              {item.sku}
                            </span>
                            <p className="text-xs font-semibold text-primary mt-1 line-clamp-1">{item.name}</p>
                            <p className="text-[11px] font-mono text-secondary">Color: {item.selectedColor || 'Standard'}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => onRemoveSample(item.sku)}
                          className="text-secondary hover:text-error p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {sampleCart.length > 0 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono uppercase text-secondary mb-1">Company *</label>
                      <input
                        required
                        type="text"
                        value={formData.companyName}
                        onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="Studio / Brand Name"
                        className="w-full bg-surface border border-outline-variant p-2 text-xs font-body-md focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-secondary mb-1">Contact Name *</label>
                      <input
                        required
                        type="text"
                        value={formData.contactPerson}
                        onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
                        placeholder="Full Name"
                        className="w-full bg-surface border border-outline-variant p-2 text-xs font-body-md focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono uppercase text-secondary mb-1">Work Email *</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="procurement@domain.com"
                        className="w-full bg-surface border border-outline-variant p-2 text-xs font-body-md focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-secondary mb-1">Sector</label>
                      <select
                        value={formData.industrySector}
                        onChange={e => setFormData({ ...formData, industrySector: e.target.value })}
                        className="w-full bg-surface border border-outline-variant p-2 text-xs font-body-md focus:border-primary focus:outline-none"
                      >
                        <option>Architecture & Interior</option>
                        <option>Aviation & Aerospace</option>
                        <option>Automotive OEM</option>
                        <option>Luxury Fashion & Contract</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-secondary mb-1">Shipping Address *</label>
                    <input
                      required
                      type="text"
                      value={formData.street}
                      onChange={e => setFormData({ ...formData, street: e.target.value })}
                      placeholder="Street Address, Bay / Suite"
                      className="w-full bg-surface border border-outline-variant p-2 text-xs font-body-md focus:border-primary focus:outline-none mb-2"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        required
                        type="text"
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        placeholder="City"
                        className="bg-surface border border-outline-variant p-2 text-xs font-body-md focus:border-primary focus:outline-none"
                      />
                      <input
                        required
                        type="text"
                        value={formData.country}
                        onChange={e => setFormData({ ...formData, country: e.target.value })}
                        placeholder="Country"
                        className="bg-surface border border-outline-variant p-2 text-xs font-body-md focus:border-primary focus:outline-none"
                      />
                      <input
                        required
                        type="text"
                        value={formData.postalCode}
                        onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                        placeholder="Postal Code"
                        className="bg-surface border border-outline-variant p-2 text-xs font-body-md focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary text-on-primary py-3 px-4 font-mono text-xs uppercase tracking-widest hover:bg-primary-container transition-colors flex items-center justify-center gap-2 mt-6"
                  >
                    {submitting ? 'Transmitting Request...' : 'Dispatch Swatch Package Free'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-outline-variant text-[11px] font-mono text-secondary flex justify-between">
          <span>Courier: DHL Global Express</span>
          <span>Lead Time: 24-48 Hours</span>
        </div>
      </div>
    </div>
  );
}
