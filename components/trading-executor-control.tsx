'use client';

import React, { useState, useEffect } from 'react';

interface TradingExecutorStatus {
  isActive: boolean;
  activePositions: number;
  config: {
    maxPositions: number;
    riskPerTrade: number;
    maxLeverage: number;
    minConfidence: number;
    stopLossPercent: number;
    takeProfitPercent: number;
  };
  positions: Array<{
    symbol: string;
    side: string;
    size: number;
    entryPrice: number;
    markPrice: number;
    pnl: number;
    pnlPercent: number;
  }>;
}

export default function TradingExecutorControl() {
  const [executorStatus, setExecutorStatus] = useState<TradingExecutorStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchExecutorStatus = async () => {
    try {
      const response = await fetch('/api/trading/executor');
      const result = await response.json();
      
      if (result.success) {
        setExecutorStatus(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch executor status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExecutorControl = async (action: 'start' | 'stop') => {
    setActionLoading(true);
    try {
      const response = await fetch('/api/trading/executor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });

      const result = await response.json();
      
      if (result.success) {
        console.log(`Trading executor ${action}ed successfully`);
        await fetchExecutorStatus(); // Refresh status
      } else {
        console.error(`Failed to ${action} trading executor:`, result.error);
        alert(`Failed to ${action} trading executor: ${result.error}`);
      }
    } catch (error) {
      console.error(`Error ${action}ing trading executor:`, error);
      alert(`Error ${action}ing trading executor`);
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    fetchExecutorStatus();
    
    // Refresh status every 10 seconds
    const interval = setInterval(fetchExecutorStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="text-center p-xl">
        <div className="loading-spinner" style={{ width: '24px', height: '24px', margin: '0 auto 16px' }}></div>
        <p className="text-muted">Loading executor...</p>
      </div>
    );
  }

  if (!executorStatus) {
    return (
      <div className="text-center p-xl">
        <p className="text-muted">Failed to load executor status</p>
        <button 
          onClick={fetchExecutorStatus}
          className="btn btn-primary mt-md"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Status Indicator */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
        <div className={`status ${
          executorStatus.isActive ? 'status-active' : 'status-inactive'
        }`} style={{ 
          fontSize: 'var(--font-size-lg)', 
          padding: 'var(--spacing-md) var(--spacing-xl)',
          marginBottom: 'var(--spacing-sm)'
        }}>
          {executorStatus.isActive ? 'ACTIVE' : 'INACTIVE'}
        </div>
        <div className="text-muted" style={{ fontSize: 'var(--font-size-xs)' }}>
          {executorStatus.isActive ? 'AI Trading in Progress' : 'AI Trading Stopped'}
        </div>
      </div>
      
      {/* Metrics */}
      <div className="grid grid-1 mb-lg" style={{ gap: 'var(--spacing-md)' }}>
        <div className="metric-card">
          <div className="metric-value text-warning">
            {executorStatus.activePositions}
          </div>
          <div className="metric-label">Active Positions</div>
        </div>
        
        <div className="metric-card">
          <div className="metric-value" style={{ color: 'var(--color-primary)' }}>
            {(executorStatus.config.riskPerTrade * 100).toFixed(1)}%
          </div>
          <div className="metric-label">Risk Per Trade</div>
        </div>
        
        <div className="metric-card">
          <div className="metric-value text-success">
            {(executorStatus.config.minConfidence * 100).toFixed(0)}%
          </div>
          <div className="metric-label">Min Confidence</div>
        </div>
      </div>

      {/* Active Positions */}
      {executorStatus.positions && executorStatus.positions.length > 0 && (
        <div style={{ 
          marginBottom: 'var(--spacing-lg)',
          padding: 'var(--spacing-md)',
          backgroundColor: 'var(--color-neutral-light)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-neutral-medium)'
        }}>
          <div className="font-semibold mb-sm" style={{ fontSize: 'var(--font-size-sm)' }}>
            📊 Current Positions
          </div>
          {executorStatus.positions.map((position, index) => (
            <div key={index} style={{ 
              marginBottom: 'var(--spacing-sm)',
              padding: 'var(--spacing-sm)',
              backgroundColor: 'var(--color-background)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--font-size-xs)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span className="font-semibold">{position.symbol}</span>
                  <span className={`status ml-sm ${
                    position.side === 'LONG' ? 'status-active' : 'status-inactive'
                  }`} style={{ fontSize: 'var(--font-size-xs)' }}>
                    {position.side}
                  </span>
                </div>
                <div className={`font-semibold ${
                  position.pnl >= 0 ? 'text-success' : 'text-danger'
                }`}>
                  {position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent.toFixed(2)}%
                </div>
              </div>
              <div className="text-muted" style={{ fontSize: 'var(--font-size-xs)', marginTop: 'var(--spacing-xs)' }}>
                Entry: ${position.entryPrice.toFixed(2)} | Mark: ${position.markPrice.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Configuration Display */}
      <div style={{ 
        marginBottom: 'var(--spacing-lg)',
        padding: 'var(--spacing-md)',
        backgroundColor: 'var(--color-neutral-light)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-neutral-medium)'
      }}>
        <div className="font-semibold mb-sm" style={{ fontSize: 'var(--font-size-sm)' }}>
          ⚙️ Configuration
        </div>
        <div className="grid grid-2" style={{ gap: 'var(--spacing-xs)', fontSize: 'var(--font-size-xs)' }}>
          <div>
            <div className="text-muted">Max Positions</div>
            <div className="font-semibold">{executorStatus.config.maxPositions}</div>
          </div>
          <div>
            <div className="text-muted">Max Leverage</div>
            <div className="font-semibold">{executorStatus.config.maxLeverage}x</div>
          </div>
          <div>
            <div className="text-muted">Stop Loss</div>
            <div className="font-semibold">{(executorStatus.config.stopLossPercent * 100).toFixed(1)}%</div>
          </div>
          <div>
            <div className="text-muted">Take Profit</div>
            <div className="font-semibold">{(executorStatus.config.takeProfitPercent * 100).toFixed(1)}%</div>
          </div>
        </div>
      </div>
      
      {/* Control Button */}
      <button 
        onClick={() => handleExecutorControl(executorStatus.isActive ? 'stop' : 'start')}
        disabled={actionLoading}
        className={`btn ${
          executorStatus.isActive ? 'btn-danger' : 'btn-success'
        }`}
        style={{ 
          width: '100%', 
          padding: 'var(--spacing-lg)',
          fontSize: 'var(--font-size-base)',
          fontWeight: '600'
        }}
      >
        {actionLoading ? (
          <span>
            <div className="loading-spinner" style={{ 
              width: '16px', 
              height: '16px', 
              display: 'inline-block', 
              marginRight: 'var(--spacing-sm)' 
            }}></div>
            Processing...
          </span>
        ) : (
          <>
            {executorStatus.isActive ? '🛑 Stop AI Trading' : '🚀 Start AI Trading'}
          </>
        )}
      </button>

      {/* Warning Notice */}
      <div style={{ 
        marginTop: 'var(--spacing-md)',
        padding: 'var(--spacing-sm)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid rgba(245, 158, 11, 0.3)'
      }}>
        <div className="text-warning" style={{ fontSize: 'var(--font-size-xs)', textAlign: 'center' }}>
          ⚠️ Binance Futures Testnet
        </div>
        <div className="text-muted" style={{ fontSize: 'var(--font-size-xs)', textAlign: 'center' }}>
          Using fake money for testing
        </div>
      </div>
    </div>
  );
}