#!/bin/bash

echo "🔍 Checking Trading Results"
echo "=========================="

# Check current balance
echo ""
echo "💰 Current Balance:"
curl -s http://localhost:3000/api/trading/balance | jq '{
    success: .success,
    totalBalance: .data.total,
    availableBalance: .data.available,
    unrealizedPnL: .data.performance.totalPnL,
    positions: (.data.positions | length)
}'

echo ""
echo "=========================="

# Check trading engine status
echo ""
echo "⚡ Trading Engine Status:"
curl -s http://localhost:3000/api/trading/engine | jq '{
    success: .success,
    status: .data.status,
    performance: .data.performance
}'

echo ""
echo "=========================="

# Check AI analysis
echo ""
echo "🤖 Current AI Analysis:"
curl -s http://localhost:3000/api/ai/analysis | jq '{
    success: .success,
    nebiusStatus: .data.nebiusAIStatus,
    bestOpportunity: .data.bestOpportunity,
    totalAnalyzed: .data.totalAnalyzed
}'

echo ""
echo "=========================="

# Check executor status
echo ""
echo "🚀 Trading Executor Status:"
curl -s http://localhost:3000/api/trading/executor | jq '{
    success: .success,
    isActive: .data.isActive,
    activePositions: .data.activePositions,
    positions: .data.positions
}'

echo ""
echo "=========================="

# Check recent container logs for trading activity
echo ""
echo "📋 Recent Trading Activity (from logs):"
docker logs live-trading-bot --tail 10 | grep -E "(Trade executed|Position|BUY|SELL)" || echo "No recent trading activity found"

echo ""
echo "=========================="
echo "✅ Trading Results Check Complete"