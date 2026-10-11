import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  HeartHandshake, 
  CheckCircle, 
  Sparkles, 
  ShieldCheck, 
  Receipt, 
  Gift, 
  ArrowRight,
  Heart,
  QrCode
} from 'lucide-react';

export const DonationPage = () => {
  const { triggerConfetti } = useApp();

  const [selectedAmount, setSelectedAmount] = useState(501);
  const [customAmount, setCustomAmount] = useState('');
  const [purpose, setPurpose] = useState('fodder'); // fodder, medical, ambulance, shelter
  const [donorName, setDonorName] = useState('Rajesh Sharma');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const amountPresets = [51, 101, 501, 1001];

  const purposeOptions = [
    { id: 'fodder', title: 'Daily Green Fodder & Jaggery', hindi: 'हरा चारा व गुड़ सेवा', icon: '🌾', impact: 'Feeds 4 cows with fresh grass for a day' },
    { id: 'medical', title: 'Emergency Wound Dressing & Medicines', hindi: 'दवाई व पट्टी सेवा', icon: '🩹', impact: 'Covers antiseptic spray, bandages and pain relief' },
    { id: 'ambulance', title: 'Rescue Ambulance Diesel / Logistics', hindi: 'एम्बुलेंस ईंधन सेवा', icon: '⛽', impact: 'Powers ~35 km of emergency rescue runs' },
    { id: 'shelter', title: 'Gaushala Winter Shed & Sanctuary', hindi: 'गौशाला आश्रय निर्माण', icon: '🏡', impact: 'Helps shelter abandoned and elderly cows' }
  ];

  const activeAmount = customAmount ? Number(customAmount) : selectedAmount;

  const handleStartDonation = () => {
    setIsModalOpen(true);
    setDonationSuccess(false);
  };

  const handleConfirmDemoPayment = () => {
    const txId = `GS-DON-${Math.floor(100000 + Math.random() * 900000)}`;
    setReceiptData({
      txId,
      amount: activeAmount,
      purpose: purposeOptions.find(p => p.id === purpose)?.title || 'General Cow Care',
      donorName: donorName || 'Devotee / Gau Mitra',
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    });
    setDonationSuccess(true);
    triggerConfetti();
  };

  return (
    <div className="animate-fade-in mobile-frame-container" style={{ paddingBottom: '36px' }}>
      
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1B3F2E, #2F6B4F)',
        borderRadius: 'var(--radius-xl)',
        padding: '28px 20px',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px',
          fontSize: '28px'
        }}>
          💝
        </div>
        <h1 style={{ fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '6px' }}>
          Support Gau Seva
        </h1>
        <span className="hindi-subtitle" style={{ color: '#E8F2EC', fontSize: '0.95rem', marginBottom: '8px' }}>
          गौ सेवा एवं गोवंश संरक्षण में सहयोग करें
        </span>
        <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.9)', maxWidth: '380px', margin: '0 auto' }}>
          Your support helps create a stronger network for emergency animal care, medical aid, and gaushala rehabilitation.
        </p>
      </div>

      {/* Select Purpose */}
      <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '4px' }}>
          1. Choose Seva Cause
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
          Direct your contribution to a specific area of care:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {purposeOptions.map(p => {
            const isSelected = purpose === p.id;
            return (
              <div 
                key={p.id}
                onClick={() => setPurpose(p.id)}
                className="card card-interactive"
                style={{
                  padding: '12px 14px',
                  border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-card)',
                  backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--bg-surface)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2px' }}>
                  <span style={{ fontSize: '20px' }}>{p.icon}</span>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.92rem', color: 'var(--text-main)', margin: 0 }}>{p.title}</h4>
                    <span className="hindi-subtitle" style={{ fontSize: '0.78rem' }}>{p.hindi}</span>
                  </div>
                  {isSelected && (
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--primary)' }} />
                  )}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '30px' }}>
                  🌱 {p.impact}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Select Amount */}
      <div className="card" style={{ padding: '20px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '4px' }}>
          2. Select Contribution Amount
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
          Any amount makes a meaningful difference:
        </p>

        {/* Amount Presets */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '14px' }}>
          {amountPresets.map(amt => {
            const isSelected = !customAmount && selectedAmount === amt;
            return (
              <button
                key={amt}
                type="button"
                onClick={() => {
                  setSelectedAmount(amt);
                  setCustomAmount('');
                }}
                className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '12px 8px', fontSize: '1.05rem', fontWeight: 700 }}
              >
                ₹{amt}
              </button>
            );
          })}
        </div>

        {/* Custom Amount Input */}
        <div className="form-group" style={{ marginBottom: '14px' }}>
          <label className="form-label" style={{ fontSize: '0.82rem' }}>Or Enter Custom Amount (₹)</label>
          <input 
            type="number" 
            className="form-input"
            value={customAmount}
            onChange={e => setCustomAmount(e.target.value)}
            placeholder="e.g. 2100"
          />
        </div>

        {/* Donor Name Input */}
        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label" style={{ fontSize: '0.82rem' }}>Donor Name (For Certificate / Receipt)</label>
          <input 
            type="text" 
            className="form-input"
            value={donorName}
            onChange={e => setDonorName(e.target.value)}
            placeholder="Your Full Name"
          />
        </div>
      </div>

      {/* Primary Donate CTA (Warm Amber with Dark Text for Contrast) */}
      <button 
        onClick={handleStartDonation}
        disabled={!activeAmount || activeAmount <= 0}
        className="btn btn-accent btn-block btn-lg"
        style={{ fontSize: '1.1rem' }}
      >
        <span>Proceed to Support ₹{activeAmount || 0}</span>
        <ArrowRight size={18} />
      </button>

      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '12px' }}>
        🔒 Prototype Demonstration Mode • No real financial transactions or bank details required.
      </p>

      {/* Simulated Payment & Receipt Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(31, 42, 36, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 300,
          padding: '16px'
        }} onClick={() => setIsModalOpen(false)}>
          <div 
            className="card"
            style={{ maxWidth: '420px', width: '100%', padding: '24px', textAlign: 'center' }}
            onClick={e => e.stopPropagation()}
          >
            {!donationSuccess ? (
              <div>
                <span className="badge badge-primary" style={{ marginBottom: '8px' }}>
                  Simulated Payment Gateway
                </span>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '4px' }}>
                  Confirm Demo Donation
                </h3>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', margin: '10px 0' }}>
                  ₹{activeAmount}
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Towards: <strong>{purposeOptions.find(p => p.id === purpose)?.title}</strong>
                </p>

                {/* Simulated QR Code box */}
                <div style={{
                  backgroundColor: 'var(--bg-surface-alt)',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-card)',
                  marginBottom: '20px'
                }}>
                  <QrCode size={90} style={{ margin: '0 auto 8px', color: 'var(--primary-dark)' }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                    UPI / QR / Net Banking Demo Test
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1 }}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleConfirmDemoPayment}
                    className="btn btn-accent btn-sm"
                    style={{ flex: 1 }}
                  >
                    Pay ₹{activeAmount} (Demo)
                  </button>
                </div>
              </div>
            ) : (
              <div className="animate-fade-in">
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-normal-bg)',
                  color: 'var(--color-normal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px'
                }}>
                  <CheckCircle size={36} />
                </div>

                <h3 style={{ fontSize: '1.35rem', color: 'var(--color-normal-text)', marginBottom: '4px' }}>
                  Demo Donation Successful!
                </h3>
                <span className="hindi-subtitle" style={{ marginBottom: '12px' }}>
                  गौ सेवा में आपके अमूल्य योगदान के लिए धन्यवाद
                </span>

                {/* Receipt Card */}
                <div style={{
                  backgroundColor: 'var(--bg-surface-alt)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  textAlign: 'left',
                  fontSize: '0.82rem',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: '18px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Receipt Ref:</span>
                    <strong>{receiptData?.txId}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Donor:</span>
                    <strong>{receiptData?.donorName}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Amount:</span>
                    <strong style={{ color: 'var(--primary)' }}>₹{receiptData?.amount}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Cause:</span>
                    <span>{receiptData?.purpose}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Date:</span>
                    <span>{receiptData?.date}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-primary btn-block btn-sm"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
