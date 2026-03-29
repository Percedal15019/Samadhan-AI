import React, { useState } from 'react';
import { AlertTriangle, TrendingUp, UploadCloud, FileText, CheckCircle, MessageSquare, Activity, X } from 'lucide-react';

const STATIC_METRICS = {
  total: 12450,
  resolved: 10210,
  pending: 2240,
  critical: 85
};

const SAMPLE_DATA = [
  { id: 1, text: "The server is completely down, I can't access my accounts!", category: "TECHNICAL_ISSUE", sentiment: "NEGATIVE", priority: "HIGH", topics: "server down, login failure" },
  { id: 2, text: "My new credit card hasn't arrived yet after 3 weeks of waiting.", category: "CARD_SERVICES", sentiment: "NEUTRAL", priority: "MEDIUM", topics: "card delivery, status" },
  { id: 3, text: "Thank you for fixing the issue quickly and reversing the late fee.", category: "GENERAL_INQUIRY", sentiment: "POSITIVE", priority: "LOW", topics: "fee reversal, solved" },
  { id: 4, text: "I noticed an unauthorized charge of $450 from a merchant I don't recognize. Please investigate immediately.", category: "FRAUD_DISPUTE", sentiment: "NEGATIVE", priority: "HIGH", topics: "unauthorized charge, fraud" },
  { id: 5, text: "The ATM on Main St swallowed my debit card and didn't dispense the cash.", category: "ATM_ISSUE", sentiment: "NEGATIVE", priority: "HIGH", topics: "ATM swallowed card, cash missing" },
  { id: 6, text: "I want to inquire about the current interest rates for your 5-year fixed mortgage.", category: "LOAN_INQUIRY", sentiment: "NEUTRAL", priority: "LOW", topics: "mortgage, interest rates" },
  { id: 7, text: "The mobile app keeps crashing every time I try to deposit a check using my phone camera.", category: "TECHNICAL_ISSUE", sentiment: "NEGATIVE", priority: "MEDIUM", topics: "app crash, mobile deposit" },
  { id: 8, text: "Can you please send me a physical copy of my bank statement for tax purposes?", category: "ACCOUNT_SERVICES", sentiment: "NEUTRAL", priority: "LOW", topics: "paper statement, document request" },
  { id: 9, text: "Absolutely phenomenal customer service at the downtown branch today. The teller was so helpful!", category: "FEEDBACK", sentiment: "POSITIVE", priority: "LOW", topics: "positive feedback, teller service" },
  { id: 10, text: "My wire transfer to Europe has been pending for four days now. I need this cleared ASAP for a business transaction.", category: "WIRE_TRANSFER", sentiment: "NEGATIVE", priority: "HIGH", topics: "wire delay, international transfer" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const renderContent = () => {
    if (selectedComplaint) return <ContextPanel complaint={selectedComplaint} onBack={() => setSelectedComplaint(null)} />;
    if (activeTab === 'dashboard') return <Dashboard />;
    if (activeTab === 'bulk') return <BulkProcessor onSelect={setSelectedComplaint} />;
    return <Dashboard />;
  };

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          Samadhan<br/>Resolution<br/>Hub
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            className={`btn ${activeTab === 'dashboard' && !selectedComplaint ? 'primary' : ''}`}
            onClick={() => { setActiveTab('dashboard'); setSelectedComplaint(null); }}
          >
            <Activity size={18} /> Command Center
          </button>
          <button 
            className={`btn ${activeTab === 'bulk' && !selectedComplaint ? 'primary' : ''}`}
            onClick={() => { setActiveTab('bulk'); setSelectedComplaint(null); }}
          >
            <UploadCloud size={18} /> Bulk Intelligence
          </button>
        </div>

        <div style={{ marginTop: 'auto', fontSize: '0.8rem', opacity: 0.7 }}>
          <p>AGENT: OP-772</p>
          <p>STATUS: ONLINE</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

// ---------------------------------------------------------
// Screen 1: Dashboard
// ---------------------------------------------------------
function Dashboard() {
  return (
    <>
      <div className="spike-banner">
        <AlertTriangle size={24} color="var(--bg-primary)" />
        <span>SPIKE DETECTED: 450% increase in 'Server Downtime' complaints in the last hour. Immediate action required.</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '2px solid var(--border-primary)', paddingBottom: '16px' }}>
        <div>
          <h2>Executive Briefing</h2>
          <p className="metric-title" style={{marginTop: '8px'}}>Last Updated: {new Date().toLocaleTimeString()}</p>
        </div>
        <button className="btn primary" onClick={() => {
          const csv = "ID,Text,Category,Sentiment,Priority,Topics\\n" + SAMPLE_DATA.map(r => `${r.id},"${r.text}",${r.category},${r.sentiment},${r.priority},"${r.topics}"`).join('\\n');
          const blob = new Blob([csv], { type: 'text/csv' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'samadhan_executive_report.csv';
          a.click();
        }}><TrendingUp size={18}/> Export Report</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--grid-gap)' }}>
        <div className="metric-card">
          <span className="metric-title">Total Volume (24h)</span>
          <span className="metric-value">{STATIC_METRICS.total.toLocaleString()}</span>
        </div>
        <div className="metric-card">
          <span className="metric-title">Critical Escalations</span>
          <span className="metric-value" style={{color: 'var(--accent-vermillion)'}}>{STATIC_METRICS.critical}</span>
        </div>
        <div className="metric-card">
          <span className="metric-title">Resolved</span>
          <span className="metric-value" style={{color: 'var(--accent-emerald)'}}>{STATIC_METRICS.resolved.toLocaleString()}</span>
        </div>
        <div className="metric-card">
          <span className="metric-title">Pending Review</span>
          <span className="metric-value">{STATIC_METRICS.pending.toLocaleString()}</span>
        </div>
      </div>

      <div className="card" style={{ flex: 1 }}>
        <h3 style={{ borderBottom: '1px solid var(--border-primary)', paddingBottom: '12px', marginBottom: '16px'}}>Live Processing Stream</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Sentiment</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_DATA.map(row => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.category}</td>
                <td><span className={`badge ${row.sentiment.toLowerCase()}`}>{row.sentiment}</span></td>
                <td>{row.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// ---------------------------------------------------------
// Screen 2: Bulk Processor
// ---------------------------------------------------------
function BulkProcessor({ onSelect }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);

  const handleProcess = async () => {
    setIsProcessing(true);
    // Simulate FastAPI backend processing delay
    setTimeout(() => {
      setData(SAMPLE_DATA);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <>
      <div style={{ borderBottom: '2px solid var(--border-primary)', paddingBottom: '16px' }}>
        <h2>Bulk Intelligence Hub</h2>
        <p className="metric-title" style={{marginTop: '8px'}}>Upload CSV for rapid contextual analysis</p>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px', borderStyle: 'dashed', backgroundColor: 'transparent' }}>
        <UploadCloud size={48} color="var(--text-primary)" style={{ marginBottom: '16px' }} />
        <h3 style={{ marginBottom: '8px' }}>Drag & Drop CSV File</h3>
        <p className="metric-title" style={{ marginBottom: '24px' }}>Max file size: 50MB</p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <input 
            type="file" 
            accept=".csv" 
            style={{ display: 'none' }} 
            id="file-upload" 
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file-upload" className="btn">
            Select File
          </label>
          <button 
            className="btn primary" 
            disabled={!file || isProcessing}
            onClick={handleProcess}
          >
            {isProcessing ? 'Processing AI Models...' : 'Run Analysis Core'}
          </button>
        </div>
        {file && <p style={{marginTop: '16px', fontFamily: 'var(--font-data)', fontSize: '0.85rem'}}>Selected: {file.name}</p>}
      </div>

      {data.length > 0 && (
        <div className="card">
          <h3 style={{ borderBottom: '1px solid var(--border-primary)', paddingBottom: '12px', marginBottom: '16px'}}>Processed Intelligence</h3>
          <table>
            <thead>
              <tr>
                <th>Extracted Text</th>
                <th>AI Category</th>
                <th>Sentiment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map(row => (
                <tr key={row.id}>
                  <td style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.text}</td>
                  <td>{row.category}</td>
                  <td><span className={`badge ${row.sentiment.toLowerCase()}`}>{row.sentiment}</span></td>
                  <td>{row.priority === 'HIGH' ? 'Critical Action' : 'Pending'}</td>
                  <td>
                    <button className="btn" style={{ padding: '6px 12px', fontSize: '0.75rem' }} onClick={() => onSelect(row)}>
                      Context View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

// ---------------------------------------------------------
// Screen 3: Contextual Analysis Panel
// ---------------------------------------------------------
function ContextPanel({ complaint, onBack }) {
  const initialDraft = `Dear Customer, \n\nWe sincerely apologize for the inconvenience you are experiencing regarding the ${complaint.category.toLowerCase().replace('_', ' ')}. Our engineering teams have detected the fault and are working urgently to restore services.\n\nWe will update you as soon as full access is restored.\n\nBest,\nSamadhan Resolution Team`;
  
  const [draft, setDraft] = useState(initialDraft);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setDraft("Intelligently analyzing context and generating alternative response...");
    setTimeout(() => {
      setDraft(`Hello,\n\nI am sorry about the ${complaint.category.toLowerCase().replace('_', ' ')} issue you highlighted involving: "${complaint.topics}".\n\nI have immediately escalated ticket #${complaint.id} to our Tier 2 specialists for urgent investigation. We take this very seriously and will ensure the problem is resolved.\n\nThank you,\nSamadhan Resolution Team`);
      setIsRegenerating(false);
    }, 1500);
  };

  const handleApprove = () => {
    setIsSent(true);
    setTimeout(() => {
      alert(`Response for ticket #${complaint.id} successfully queued for dispatch!`);
      onBack();
    }, 800);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--border-primary)', paddingBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px'}}>
          <button className="btn" onClick={onBack} style={{ padding: '8px' }}><X size={20}/></button>
          <h2>Context View: Ticket #{complaint.id}</h2>
        </div>
        <div>
           <span className={`badge ${complaint.sentiment.toLowerCase()}`} style={{ marginRight: '8px'}}>{complaint.sentiment}</span>
           <span className="badge neutral">{complaint.priority} Priority</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--grid-gap)', flex: 1 }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h4 className="metric-title" style={{ borderBottom: '1px solid var(--border-primary)', paddingBottom: '8px', marginBottom: '16px'}}>Raw Customer Input</h4>
            <p style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>"{complaint.text}"</p>
          </div>
          
          <div>
            <h4 className="metric-title" style={{ borderBottom: '1px solid var(--border-primary)', paddingBottom: '8px', marginBottom: '16px'}}>AI Intelligence Extraction</h4>
            <table style={{ background: 'var(--bg-secondary)'}}>
              <tbody>
                <tr>
                  <th style={{ width: '150px' }}>Category</th>
                  <td>{complaint.category}</td>
                </tr>
                <tr>
                  <th>Confidence Score</th>
                  <td>94.2%</td>
                </tr>
                <tr>
                  <th>Topic Extraction</th>
                  <td style={{ color: 'var(--accent-vermillion)'}}>{complaint.topics}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)', borderColor: 'var(--text-primary)' }}>
          <h4 className="metric-title" style={{ color: 'var(--border-light)', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px', marginBottom: '16px'}}>Generative AI Draft Response</h4>
          <textarea 
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={isRegenerating || isSent}
            style={{ 
              flex: 1, 
              background: 'transparent', 
              border: 'none', 
              color: 'var(--bg-primary)', 
              fontFamily: 'var(--font-heading)', 
              fontSize: '1.1rem', 
              resize: 'none', 
              outline: 'none',
              lineHeight: 1.6
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '24px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
            <button 
              className="btn" 
              onClick={handleRegenerate} 
              disabled={isRegenerating || isSent} 
              style={{ borderColor: 'var(--bg-primary)', color: 'var(--bg-primary)', background: 'transparent', opacity: isRegenerating ? 0.5 : 1 }}
            >
              {isRegenerating ? 'Generating...' : 'Regenerate Draft'}
            </button>
            <button 
              className="btn" 
              onClick={handleApprove} 
              disabled={isRegenerating || isSent}
              style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', borderColor: 'var(--bg-primary)' }}
            >
              {isSent ? 'Sending...' : 'Approve & Send'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
