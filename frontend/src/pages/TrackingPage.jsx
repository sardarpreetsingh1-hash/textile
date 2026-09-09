import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Check, AlertCircle, Thermometer, Droplets, Activity, MapPin, Download } from 'lucide-react';
import { trackOrder, fetchOrders } from '../services/api';

export default function TrackingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [orderNumberInput, setOrderNumberInput] = useState(searchParams.get('order') || 'TX-902-84A');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    fetchOrders().then((data) => {
      if (data && data.length > 0) {
        setRecentOrders(data);
      }
    });
  }, []);

  useEffect(() => {
    const q = searchParams.get('order') || 'TX-902-84A';
    setOrderNumberInput(q);
    loadTracking(q);
  }, [searchParams]);

  const loadTracking = async (orderNum) => {
    if (!orderNum) return;
    setLoading(true);
    setError(null);
    try {
      const data = await trackOrder(orderNum);
      setOrder(data);
    } catch (err) {
      setError(err.response?.data?.message || `Order #${orderNum.toUpperCase()} not found in current logistics ledger.`);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (orderNumberInput.trim()) {
      setSearchParams({ order: orderNumberInput.trim().toUpperCase() });
    }
  };

  // Stage Icons & Mapping
  const stageIcons = [
    { title: 'Confirmed', icon: 'check' },
    { title: 'Production', icon: 'manufacturing' },
    { title: 'Quality Check', icon: 'fact_check' },
    { title: 'Packed', icon: 'inventory' },
    { title: 'In Transit', icon: 'shipping' },
    { title: 'Customs Cleared', icon: 'verified' },
    { title: 'Delivered', icon: 'done_all' },
  ];

  return (
    <div className="pt-24 pb-20 px-4 md:px-margin-desktop max-w-[1440px] mx-auto w-full min-h-screen">
      {/* Top Search Banner */}
      <div className="bg-surface-container-low border border-outline-variant p-6 mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <span className="text-xs font-mono uppercase bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 font-bold">
            Real-Time Logistics Telemetry
          </span>
          <h2 className="text-xl font-bold font-headline-md text-primary mt-1">
            Global Loom Batch & Air Freight Tracker
          </h2>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex w-full md:w-auto min-w-[320px]">
          <input
            type="text"
            value={orderNumberInput}
            onChange={(e) => setOrderNumberInput(e.target.value)}
            placeholder="Search Order # (e.g. TX-902-84A)"
            className="w-full bg-surface border border-outline-variant px-3 py-2 text-xs font-mono uppercase focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="bg-primary text-on-primary px-5 py-2 font-mono text-xs uppercase tracking-wider hover:bg-primary-container shrink-0"
          >
            Track
          </button>
        </form>
      </div>

      {/* Quick Select Quick Chips */}
      <div className="flex items-center gap-2 mb-8 text-xs font-mono text-secondary overflow-x-auto pb-2">
        <span className="shrink-0 uppercase font-semibold">Live Trackers:</span>
        {['TX-902-84A', 'TX-512-19B'].map((num) => (
          <button
            key={num}
            onClick={() => {
              setOrderNumberInput(num);
              setSearchParams({ order: num });
            }}
            className={`px-2.5 py-1 border transition-colors shrink-0 uppercase ${
              order?.orderNumber === num
                ? 'bg-primary text-on-primary border-primary font-bold'
                : 'bg-surface border-outline-variant hover:bg-surface-container text-primary'
            }`}
          >
            Order #{num}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-20 text-center font-mono">
          <p className="text-secondary animate-pulse">Querying satellite telemetry for {orderNumberInput}...</p>
        </div>
      ) : error ? (
        <div className="bg-surface-container border border-outline-variant p-12 text-center max-w-xl mx-auto">
          <AlertCircle className="w-12 h-12 text-error mx-auto mb-3" />
          <h3 className="text-xl font-bold font-headline-md text-primary">No Record Found</h3>
          <p className="text-xs text-secondary mt-2">{error}</p>
          <button
            onClick={() => {
              setOrderNumberInput('TX-902-84A');
              setSearchParams({ order: 'TX-902-84A' });
            }}
            className="mt-6 bg-primary text-on-primary px-6 py-2.5 text-xs font-mono uppercase"
          >
            Load Sample Order #TX-902-84A
          </button>
        </div>
      ) : order ? (
        <div>
          {/* Header Section */}
          <div className="mb-12 border-b border-outline-variant pb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-label-sm font-label-sm uppercase tracking-wider text-tertiary-container bg-tertiary-fixed px-2.5 py-1 mb-3 inline-block font-bold">
                  Status: {order.status}
                </span>
                <h1 className="text-3xl md:text-5xl font-headline-lg font-bold text-primary mb-2">
                  Order #{order.orderNumber}
                </h1>
                <p className="text-body-lg text-secondary max-w-2xl">
                  {order.items?.[0]?.name || 'High-tensile composite weave structure'}. Dispatched from {order.origin}.
                </p>
              </div>
              <div className="flex flex-col md:items-end bg-surface-container-low p-4 border border-outline-variant">
                <span className="text-xs font-mono text-secondary uppercase tracking-wider mb-1">
                  Est. Delivery Arrival
                </span>
                <span className="text-2xl font-headline-md font-bold text-primary">
                  {new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="text-xs font-mono text-secondary mt-1">Carrier: {order.carrier}</span>
              </div>
            </div>
          </div>

          {/* Horizontal Timeline Progress */}
          <div className="mb-16">
            <h3 className="text-xs font-mono uppercase text-secondary font-bold tracking-wider mb-6">
              Batch Progression Lifecycle
            </h3>

            {/* Desktop Timeline */}
            <div className="hidden md:flex items-center justify-between relative w-full px-2">
              {stageIcons.map((st, idx) => {
                const isCompleted = idx < order.currentStageIndex;
                const isActive = idx === order.currentStageIndex;
                const isPending = idx > order.currentStageIndex;

                return (
                  <div key={st.title} className="flex flex-col items-center flex-1 relative group">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center z-20 mb-3 border-2 transition-all ${
                        isCompleted
                          ? 'bg-primary text-on-primary border-primary'
                          : isActive
                          ? 'bg-surface border-primary text-primary relative shadow-lg'
                          : 'bg-surface-container border-outline-variant text-outline opacity-60'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-30"></div>
                      )}
                      {isCompleted ? (
                        <span className="material-symbols-outlined icon-fill text-xl">check</span>
                      ) : (
                        <span className="font-mono text-xs font-bold">{idx + 1}</span>
                      )}
                    </div>

                    <span
                      className={`text-xs font-mono uppercase tracking-wider font-bold text-center ${
                        isActive ? 'text-primary underline' : isCompleted ? 'text-primary' : 'text-secondary'
                      }`}
                    >
                      {st.title}
                    </span>

                    {order.timeline?.[idx]?.date && (
                      <span className="text-[11px] font-mono text-secondary mt-0.5">
                        {order.timeline[idx].date.split(',')[0]}
                      </span>
                    )}

                    {/* Connecting Bar */}
                    {idx < stageIcons.length - 1 && (
                      <div
                        className={`absolute top-6 left-1/2 w-full h-[2px] -z-10 ${
                          idx < order.currentStageIndex ? 'bg-primary' : 'bg-outline-variant'
                        }`}
                      ></div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Vertical List */}
            <div className="md:hidden space-y-4 border-l-2 border-primary ml-4 pl-6">
              {stageIcons.map((st, idx) => {
                const isCompleted = idx < order.currentStageIndex;
                const isActive = idx === order.currentStageIndex;
                return (
                  <div key={st.title} className="relative">
                    <div
                      className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 ${
                        isCompleted ? 'bg-primary border-primary' : isActive ? 'bg-primary animate-pulse' : 'bg-surface border-outline-variant'
                      }`}
                    ></div>
                    <p className={`font-mono text-xs uppercase font-bold ${isActive ? 'text-primary' : 'text-secondary'}`}>
                      {st.title} {isActive && '(Current Stage)'}
                    </p>
                    {order.timeline?.[idx]?.description && (
                      <p className="text-xs text-secondary mt-0.5">{order.timeline[idx].description}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Telemetry & Logistics Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Sensor Telemetry Module */}
            <div className="lg:col-span-6 bg-surface border border-outline-variant p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-outline-variant pb-3">
                <h3 className="font-mono text-xs uppercase font-bold text-primary flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  Cargo Environment Telemetry (Live Sensors)
                </h3>
                <span className="text-[10px] font-mono text-tertiary-container bg-tertiary-fixed px-2 py-0.5 font-bold">
                  SATELLITE SYNC: ACTIVE
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-surface-container-low p-4 border border-outline-variant">
                  <div className="flex items-center gap-1.5 text-secondary text-xs mb-1">
                    <Thermometer className="w-3.5 h-3.5" />
                    <span>TEMP</span>
                  </div>
                  <p className="text-2xl font-mono font-bold text-primary">
                    {order.telemetry?.currentTemperatureC || 19.4}°C
                  </p>
                  <span className="text-[10px] font-mono text-secondary">Optimal (15-22°C)</span>
                </div>

                <div className="bg-surface-container-low p-4 border border-outline-variant">
                  <div className="flex items-center gap-1.5 text-secondary text-xs mb-1">
                    <Droplets className="w-3.5 h-3.5" />
                    <span>HUMIDITY</span>
                  </div>
                  <p className="text-2xl font-mono font-bold text-primary">
                    {order.telemetry?.relativeHumidityPct || 44.2}%
                  </p>
                  <span className="text-[10px] font-mono text-secondary">Controlled &lt; 50%</span>
                </div>

                <div className="bg-surface-container-low p-4 border border-outline-variant">
                  <div className="flex items-center gap-1.5 text-secondary text-xs mb-1">
                    <Activity className="w-3.5 h-3.5" />
                    <span>SHOCK G</span>
                  </div>
                  <p className="text-2xl font-mono font-bold text-primary">
                    {order.telemetry?.vibrationG || 0.08} G
                  </p>
                  <span className="text-[10px] font-mono text-secondary">Zero Impact</span>
                </div>
              </div>

              <div className="p-3 bg-surface-container-low border border-outline-variant flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div className="text-xs font-mono">
                  <span className="text-secondary block">LAST TRANSMITTED TELEMETRY COORDINATES</span>
                  <span className="font-bold text-primary">
                    {order.telemetry?.gpsLocation || '48.8566° N, 2.3522° E (Lyon Lab Facility)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Shipment Manifest & Consignment Details */}
            <div className="lg:col-span-6 bg-surface-container-low border border-outline-variant p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center border-b border-outline-variant pb-3 mb-4">
                  <h3 className="font-mono text-xs uppercase font-bold text-primary">
                    Consignment Manifest
                  </h3>
                  <span className="text-xs font-mono text-secondary">Bill of Lading: {order.billOfLading}</span>
                </div>

                <div className="space-y-3 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-outline-variant">
                    <span className="text-secondary">CLIENT RECIPIENT</span>
                    <span className="font-bold text-primary">{order.clientName} ({order.company})</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-outline-variant">
                    <span className="text-secondary">DESTINATION</span>
                    <span className="font-bold text-primary text-right max-w-xs">{order.destination}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-outline-variant">
                    <span className="text-secondary">TOTAL ROLL VOLUME</span>
                    <span className="font-bold text-primary">{order.totalVolumeMeters} linear meters</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-outline-variant">
                    <span className="text-secondary">CARRIER AIRWAY BILL</span>
                    <span className="font-bold text-primary">{order.trackingCode}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-outline-variant flex gap-3">
                <button
                  onClick={() => alert(`Consignment airway manifest & lab pass certificates for ${order.orderNumber} initiated.`)}
                  className="w-full bg-primary text-on-primary py-3 px-4 font-mono text-xs uppercase tracking-widest hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Bill of Lading & Lab Certificate (PDF)
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
