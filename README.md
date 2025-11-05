# 🚀 November AI Trader - Pramilupu Trading AI

[![Nebius AI](https://img.shields.io/badge/Powered%20by-Nebius%20AI-blue)](https://nebius.ai)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://typescriptlang.org)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://docker.com)

Advanced AI-powered cryptocurrency trading platform with real-time market analysis, automated trading strategies, and professional dashboard interface.

## 🎯 Features

### 🤖 Nebius AI Integration
- **Real-time Market Analysis** powered by `meta-llama/Meta-Llama-3.1-8B-Instruct`
- **Intelligent Trading Signals** with BUY/SELL/HOLD recommendations
- **Market Sentiment Analysis** with confidence levels
- **Technical Indicators**: RSI, Trend Analysis, Support/Resistance levels
- **Risk Assessment**: Volatility analysis, Stop Loss, Take Profit calculations

### 📊 Professional Trading Dashboard
- **Live Market Data** from multiple cryptocurrency exchanges
- **Individual Analysis Cards** for BTC, ETH, SOL, ADA, DOGE
- **Real-time P&L Tracking** with position management
- **Trading Engine Controls** with start/stop functionality
- **Exchange Management** with secure API key handling

### 🔧 Technical Architecture
- **Next.js 15** with TypeScript for robust frontend
- **Prisma ORM** with PostgreSQL for data persistence
- **Docker Containerization** for production deployment
- **Real-time Data Processing** with caching mechanisms
- **Comprehensive Error Handling** with fallback systems

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Docker & Docker Compose
- PostgreSQL database
- Nebius AI API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/bagussundaru/NovemberAITrader.git
cd NovemberAITrader
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.production.template .env.production
# Edit .env.production with your configuration
```

4. **Database Setup**
```bash
npx prisma generate
npx prisma db push
```

5. **Build and Run**
```bash
npm run build
docker-compose up -d
```

6. **Access Dashboard**
```
http://localhost:3000
```

## 🔑 Environment Configuration

### Required Environment Variables

```env
# Nebius AI Configuration
NEBIUS_API_KEY=your_nebius_api_key_here
NEBIUS_API_URL=https://api.studio.nebius.ai/v1/chat/completions

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/trading_bot

# Trading Configuration
TRADING_PAIRS=BTC/USDT,ETH/USDT,SOL/USDT,ADA/USDT,DOGE/USDT
RISK_PER_TRADE=2.0
MAX_LEVERAGE=10

# Security
ENCRYPTION_KEY=your_32_character_encryption_key
JWT_SECRET=your_jwt_secret_key

# Exchange APIs (Optional)
BINANCE_API_KEY=your_binance_api_key
BINANCE_SECRET_KEY=your_binance_secret_key
GATEIO_API_KEY=your_gateio_api_key
GATEIO_SECRET_KEY=your_gateio_secret_key
```

## 📊 Dashboard Features

### AI Market Analysis
- **Nebius AI Status**: Real-time connection indicator
- **Market Sentiment**: AI-powered market analysis
- **Trading Signals**: BUY/SELL/HOLD recommendations with confidence levels
- **Best Opportunities**: Highlighted trading opportunities with detailed reasoning

### Individual Cryptocurrency Analysis
Each supported cryptocurrency displays:
- **Action Recommendation**: BUY/SELL/HOLD
- **Confidence Level**: Percentage confidence from AI analysis
- **Technical Indicators**: RSI values, trend direction
- **Risk Assessment**: Stop loss and take profit levels
- **AI Reasoning**: Detailed explanation for recommendations

### Trading Engine
- **Engine Status**: Active/Inactive with real-time controls
- **Performance Metrics**: Total P&L, trade count, active positions
- **Position Management**: Real-time position tracking with P&L
- **Risk Controls**: Configurable risk parameters

## 🤖 AI Analysis Example

```json
{
  "symbol": "BTCUSDT",
  "action": "BUY",
  "confidence": 0.75,
  "reasoning": "Despite the strong bearish trend, the RSI level is normal, indicating a potential oversold condition. The price has pulled back to the support level, and the volatility is high, suggesting a possible bounce.",
  "technicalIndicators": {
    "rsi": 44.82,
    "trend": "BEARISH",
    "support": 98000,
    "resistance": 110000
  },
  "riskAssessment": {
    "volatility": "HIGH",
    "stopLoss": 97000,
    "takeProfit": 105000,
    "recommendedLeverage": 2
  },
  "modelUsed": "Nebius-meta-llama/Meta-Llama-3.1-8B-Instruct"
}
```

## 🔧 API Endpoints

### AI Analysis
- `GET /api/ai/analysis` - Get latest AI analysis results
- `POST /api/ai/analysis` - Trigger new AI analysis

### Trading Engine
- `GET /api/trading/engine` - Get engine status
- `POST /api/trading/engine` - Control engine (start/stop)
- `GET /api/trading/balance` - Get account balance and positions
- `GET /api/trading/positions` - Get active positions

### Market Data
- `GET /api/pricing` - Get real-time cryptocurrency prices
- `GET /api/news` - Get latest cryptocurrency news
- `GET /api/health` - System health check

## 🐳 Docker Deployment

### Production Deployment
```bash
# Build and start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Docker Configuration
The application includes:
- **Next.js Application** container
- **PostgreSQL Database** container
- **Nginx Reverse Proxy** (optional)
- **Monitoring Stack** with Prometheus (optional)

## 🧪 Testing

### Run Test Suite
```bash
# API Integration Tests
npm run test

# Trading Engine Tests
./test-trading-engine.sh

# Nebius AI Integration Tests
./test-nebius-integration.sh

# Dashboard Tests
./test-final-nebius-dashboard.sh
```

### Test Coverage
- ✅ Nebius AI API integration
- ✅ Trading engine functionality
- ✅ Database operations
- ✅ Risk management systems
- ✅ Dashboard rendering
- ✅ Error handling and recovery

## 📈 Performance Features

### Caching Strategy
- **In-memory caching** for AI analysis results (5-minute TTL)
- **Database query optimization** with Prisma
- **Real-time data streaming** with efficient updates

### Error Handling
- **Graceful degradation** when AI services are unavailable
- **Fallback mechanisms** with cached data
- **Comprehensive logging** for debugging
- **Automatic retry logic** for failed operations

## 🔒 Security Features

### Data Protection
- **API Key Encryption** using AES-256
- **Secure Environment Variables** management
- **Input Validation** and sanitization
- **Rate Limiting** on API endpoints

### Trading Security
- **Risk Management** with configurable limits
- **Position Size Controls** to prevent over-exposure
- **Stop Loss Automation** for risk mitigation
- **Emergency Stop** functionality

## 🛠️ Development

### Project Structure
```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── trading/           # Trading dashboard pages
│   └── page.tsx           # Main dashboard
├── components/            # React components
├── lib/                   # Core libraries
│   ├── ai/               # AI integration
│   ├── trading-bot/      # Trading engine
│   └── exchanges/        # Exchange integrations
├── prisma/               # Database schema
└── docker-compose.yml    # Docker configuration
```

### Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run database migrations
npx prisma db push

# Generate Prisma client
npx prisma generate
```

## 📊 Monitoring & Analytics

### Dashboard Metrics
- **Real-time Trading Performance**
- **AI Analysis Accuracy Tracking**
- **System Health Monitoring**
- **Exchange API Status**

### Logging
- **Structured Logging** with Winston
- **Error Tracking** with detailed stack traces
- **Performance Metrics** collection
- **Trading Activity Logs**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Nebius AI** for providing advanced AI capabilities
- **Meta** for the Llama 3.1 8B Instruct model
- **Next.js Team** for the excellent framework
- **Prisma Team** for the robust ORM

## 📞 Support

For support and questions:
- Create an [Issue](https://github.com/bagussundaru/NovemberAITrader/issues)
- Check the [Documentation](https://github.com/bagussundaru/NovemberAITrader/wiki)

---

**⚠️ Disclaimer**: This software is for educational and research purposes. Cryptocurrency trading involves significant risk. Always do your own research and never invest more than you can afford to lose.

---

Made with ❤️ by [Bagus Sundaru](https://github.com/bagussundaru) | Powered by [Nebius AI](https://nebius.ai)