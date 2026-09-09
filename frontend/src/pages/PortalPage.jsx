import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package2,
  Calendar,
  Layers,
  Activity,
  Plus,
  CheckCircle,
  Clock,
  Truck,
  FileCheck,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import {
  fetchDashboardStats,
  fetchOrders,
  fetchMeetings,
  fetchSampleRequests,
  updateOrderStatus,
  createOrder,
} from '../services/api';

export default function PortalPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Order Modal State
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [newOrderForm, setNewOrderForm] = useState({
    clientName: '',
    company: '',
    email: '',
    destination: '',
    totalVolumeMeters: 500,
    totalAmountUsd: 72500,
    sku: 'TX-902-AER',
    name: 'AeroCarbon 3D Interlock Composite Weave',
  });

  const loadAllPortalData = async () => {
    setLoading(true);
    try {
      const [statsData, ordersData, meetingsData, samplesData] = await Promise.all([
        fetchDashboardStats(),
        fetchOrders(),
        fetchMeetings(),
        fetchSampleRequests(),
      ]);
      setStats(statsData);
      setOrders(ordersData);
      setMeetings(meetingsData);
      setSamples(samplesData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllPortalData();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const stageMap = {
      Confirmed: 0,
      Production: 1,
      'Quality Check': 2,
      Packed: 3,
      'In Transit': 4,
      'Customs Cleared': 5,
      Delivered: 6,
    };
    try {
      await updateOrderStatus(orderId, newStatus, stageMap[newStatus] || 1);
      loadAllPortalData();
    } catch (err) {
      alert('Updated status locally in fallback mode.');
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus, currentStageIndex: stageMap[newStatus] } : o))
      );
    }
  };

  const handleCreateOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        clientName: newOrderForm.clientName,
        company: newOrderForm.company,
        email: newOrderForm.email,
        destination: newOrderForm.destination,
        totalVolumeMeters: Number(newOrderForm.totalVolumeMeters),
        totalAmountUsd: Number(newOrderForm.totalAmountUsd),
        estimatedDelivery: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        status: 'Production',
        currentStageIndex: 1,
        items: [
          {
            sku: newOrderForm.sku,
            name: newOrderForm.name,
            meters: Number(newOrderForm.totalVolumeMeters),
            unitPrice: 145,
          },
        ],
      };
      await createOrder(payload);
      setShowNewOrderModal(false);
      loadAllPortalData();
    } catch (err) {
      alert('Error creating order. Check console.');
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-surface flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-surface-container-low border-r border-outline-variant p-6 flex flex-col justify-between shrink-0">
        <div>
          <div className="mb-8">
            <span className="text-[10px] font-mono uppercase bg-primary text-on-primary px-2 py-0.5">
              Industrial Console
            </span>
            <h2 className="text-xl font-bold font-headline-md text-primary mt-2">
              Texora B2B Portal
            </h2>
            <p className="text-xs font-mono text-secondary">Lyon Mill Central Registry</p>
          </div>

          <nav className="space-y-1 text-xs font-mono uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 transition-colors text-left ${
                activeTab === 'dashboard'
                  ? 'bg-primary text-on-primary font-bold'
                  : 'text-secondary hover:bg-surface-container hover:text-primary'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Overview & KPIs
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 transition-colors text-left ${
                activeTab === 'orders'
                  ? 'bg-primary text-on-primary font-bold'
                  : 'text-secondary hover:bg-surface-container hover:text-primary'
              }`}
            >
              <Package2 className="w-4 h-4" />
              Active Orders ({orders.length})
            </button>

            <button
              onClick={() => setActiveTab('samples')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 transition-colors text-left ${
                activeTab === 'samples'
                  ? 'bg-primary text-on-primary font-bold'
                  : 'text-secondary hover:bg-surface-container hover:text-primary'
              }`}
            >
              <Layers className="w-4 h-4" />
              Sample Queue ({samples.length})
            </button>

            <button
              onClick={() => setActiveTab('meetings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 transition-colors text-left ${
                activeTab === 'meetings'
                  ? 'bg-primary text-on-primary font-bold'
                  : 'text-secondary hover:bg-surface-container hover:text-primary'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Consultations ({meetings.length})
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-outline-variant space-y-2 text-[11px] font-mono text-secondary">
          <button
            onClick={loadAllPortalData}
            className="flex items-center gap-2 hover:text-primary w-full text-left"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Sync MongoDB Cluster
          </button>
          <div className="flex items-center gap-2 text-tertiary-container">
            <Activity className="w-3.5 h-3.5" />
            <span>Atlas DB: Resilient Ready</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-x-auto">
        {/* Top Action Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-outline-variant">
          <div>
            <span className="text-xs font-mono uppercase text-secondary">Admin & Customer Workspace</span>
            <h1 className="text-2xl md:text-3xl font-bold font-headline-md text-primary uppercase">
              {activeTab === 'dashboard' && 'Operations Dashboard'}
              {activeTab === 'orders' && 'Loom Batch & Shipment Orders'}
              {activeTab === 'samples' && 'Sample Swatch Dispatch Queue'}
              {activeTab === 'meetings' && 'Booked Engineering Consultations'}
            </h1>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowNewOrderModal(true)}
              className="bg-primary text-on-primary px-4 py-2.5 font-mono text-xs uppercase tracking-wider hover:bg-primary-container flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              New Batch Order
            </button>
          </div>
        </div>

        {/* Tab 1: Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-surface-container-low border border-outline-variant p-6">
                <span className="text-[10px] font-mono uppercase text-secondary block">Total Batch Output</span>
                <p className="text-3xl font-bold font-headline-md text-primary mt-1">
                  {stats?.totalVolumeMeters?.toLocaleString() || '4,520'}
                </p>
                <span className="text-[11px] font-mono text-secondary">Linear Meters Delivered</span>
              </div>

              <div className="bg-surface-container-low border border-outline-variant p-6">
                <span className="text-[10px] font-mono uppercase text-secondary block">Active Freight Batches</span>
                <p className="text-3xl font-bold font-headline-md text-primary mt-1">
                  {orders.filter((o) => o.status !== 'Delivered').length}
                </p>
                <span className="text-[11px] font-mono text-tertiary-container">Live Air & Ground Transit</span>
              </div>

              <div className="bg-surface-container-low border border-outline-variant p-6">
                <span className="text-[10px] font-mono uppercase text-secondary block">Pending Sample RFQs</span>
                <p className="text-3xl font-bold font-headline-md text-primary mt-1">
                  {samples.length}
                </p>
                <span className="text-[11px] font-mono text-secondary">A4 Swatch Binder Requests</span>
              </div>

              <div className="bg-surface-container-low border border-outline-variant p-6">
                <span className="text-[10px] font-mono uppercase text-secondary block">Upcoming Consultations</span>
                <p className="text-3xl font-bold font-headline-md text-primary mt-1">
                  {meetings.length}
                </p>
                <span className="text-[11px] font-mono text-secondary">Engineering Sessions</span>
              </div>
            </div>

            {/* Quick Summary Table */}
            <div className="bg-surface border border-outline-variant">
              <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
                <h3 className="font-mono text-xs uppercase font-bold text-primary">
                  Recent Production Contracts
                </h3>
                <button onClick={() => setActiveTab('orders')} className="text-xs font-mono underline text-secondary hover:text-primary">
                  View All Orders &rarr;
                </button>
              </div>

              <div className="divide-y divide-outline-variant">
                {orders.slice(0, 3).map((ord) => (
                  <div key={ord._id} className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-primary">#{ord.orderNumber}</span>
                        <span className="text-xs font-mono uppercase bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5">
                          {ord.status}
                        </span>
                      </div>
                      <p className="text-xs text-secondary mt-1">{ord.clientName} · {ord.company}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono">
                      <span>{ord.totalVolumeMeters}m</span>
                      <Link to={`/tracking?order=${ord.orderNumber}`} className="text-primary underline flex items-center gap-1">
                        Track <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Orders Management */}
        {activeTab === 'orders' && (
          <div className="bg-surface border border-outline-variant overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant uppercase text-secondary">
                  <th className="p-4">Order #</th>
                  <th className="p-4">Client / Company</th>
                  <th className="p-4">Material SKU</th>
                  <th className="p-4">Volume</th>
                  <th className="p-4">Delivery</th>
                  <th className="p-4">Status & Stage</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {orders.map((ord) => (
                  <tr key={ord._id} className="hover:bg-surface-container-low transition-colors">
                    <td className="p-4 font-bold text-primary">#{ord.orderNumber}</td>
                    <td className="p-4">
                      <span className="font-bold block text-primary">{ord.company}</span>
                      <span className="text-secondary">{ord.clientName}</span>
                    </td>
                    <td className="p-4">
                      <span className="bg-surface-container-highest px-1.5 py-0.5">{ord.items?.[0]?.sku || 'TX-902'}</span>
                    </td>
                    <td className="p-4 font-bold">{ord.totalVolumeMeters}m</td>
                    <td className="p-4">{new Date(ord.estimatedDelivery).toLocaleDateString()}</td>
                    <td className="p-4">
                      <select
                        value={ord.status}
                        onChange={(e) => handleStatusChange(ord._id, e.target.value)}
                        className="bg-surface border border-outline-variant p-1 text-xs font-mono uppercase"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Production">Production</option>
                        <option value="Quality Check">Quality Check</option>
                        <option value="Packed">Packed</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Customs Cleared">Customs Cleared</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        to={`/tracking?order=${ord.orderNumber}`}
                        className="inline-flex items-center gap-1 bg-surface-container px-2.5 py-1 text-primary hover:bg-primary hover:text-on-primary transition-colors"
                      >
                        Live Telemetry
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Sample Requests */}
        {activeTab === 'samples' && (
          <div className="bg-surface border border-outline-variant">
            <div className="divide-y divide-outline-variant">
              {samples.length === 0 ? (
                <div className="p-8 text-center text-secondary text-xs font-mono">
                  No sample requests in queue.
                </div>
              ) : (
                samples.map((samp) => (
                  <div key={samp._id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-sm text-primary">{samp.companyName}</span>
                        <span className="text-xs font-mono bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5">
                          Status: {samp.status}
                        </span>
                      </div>
                      <p className="text-xs text-secondary">
                        Contact: {samp.contactPerson} ({samp.email}) · Sector: {samp.industrySector}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {samp.sampleItems?.map((item, idx) => (
                          <span key={idx} className="text-[11px] font-mono bg-surface-container px-2 py-0.5 border border-outline-variant">
                            {item.sku} ({item.color || 'Standard'})
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-secondary">{samp.shippingAddress?.city}, {samp.shippingAddress?.country}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Booked Consultations */}
        {activeTab === 'meetings' && (
          <div className="bg-surface border border-outline-variant">
            <div className="divide-y divide-outline-variant">
              {meetings.length === 0 ? (
                <div className="p-8 text-center text-secondary text-xs font-mono">
                  No upcoming consultations booked.
                </div>
              ) : (
                meetings.map((m) => (
                  <div key={m._id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-sm text-primary">{m.fullName}</span>
                        <span className="text-xs font-mono uppercase bg-surface-container-highest px-2 py-0.5">
                          {m.meetingType} ({m.durationMinutes} min)
                        </span>
                      </div>
                      <p className="text-xs text-secondary">{m.company} · {m.email} {m.phone && `· ${m.phone}`}</p>
                      {m.additionalRequirements && (
                        <p className="text-xs text-secondary mt-2 bg-surface-container-low p-2 border border-outline-variant italic">
                          "{m.additionalRequirements}"
                        </p>
                      )}
                    </div>

                    <div className="text-right font-mono text-xs">
                      <span className="font-bold text-primary block">{m.date} at {m.timeSlot}</span>
                      <a href={m.meetingLink} target="_blank" rel="noreferrer" className="text-primary underline mt-1 inline-block">
                        Open Meeting Link &rarr;
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>

      {/* New Order Modal */}
      {showNewOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/60 backdrop-blur-xs p-4">
          <div className="bg-surface border border-outline-variant p-6 md:p-8 max-w-lg w-full shadow-2xl">
            <h3 className="text-xl font-bold font-headline-md text-primary uppercase mb-4 pb-2 border-b border-outline-variant">
              Create Loom Batch Order
            </h3>

            <form onSubmit={handleCreateOrderSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block uppercase text-secondary mb-1">Client Name *</label>
                <input
                  required
                  type="text"
                  value={newOrderForm.clientName}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, clientName: e.target.value })}
                  placeholder="e.g. Dr. Roland Klein"
                  className="w-full bg-surface-container-low border border-outline-variant p-2 font-body-md"
                />
              </div>

              <div>
                <label className="block uppercase text-secondary mb-1">Company / Studio *</label>
                <input
                  required
                  type="text"
                  value={newOrderForm.company}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, company: e.target.value })}
                  placeholder="e.g. Airbus Interior Systems"
                  className="w-full bg-surface-container-low border border-outline-variant p-2 font-body-md"
                />
              </div>

              <div>
                <label className="block uppercase text-secondary mb-1">Destination Address *</label>
                <input
                  required
                  type="text"
                  value={newOrderForm.destination}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, destination: e.target.value })}
                  placeholder="e.g. Toulouse Delivery Center, France"
                  className="w-full bg-surface-container-low border border-outline-variant p-2 font-body-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase text-secondary mb-1">Volume (Meters)</label>
                  <input
                    type="number"
                    value={newOrderForm.totalVolumeMeters}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, totalVolumeMeters: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant p-2"
                  />
                </div>
                <div>
                  <label className="block uppercase text-secondary mb-1">Total Value (USD)</label>
                  <input
                    type="number"
                    value={newOrderForm.totalAmountUsd}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, totalAmountUsd: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant p-2"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-outline-variant">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-on-primary py-3 uppercase tracking-widest hover:bg-primary-container"
                >
                  Create & Dispatch to Loom
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewOrderModal(false)}
                  className="border border-outline-variant px-4 py-3 uppercase hover:bg-surface-container"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
