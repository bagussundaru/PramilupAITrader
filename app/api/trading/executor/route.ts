import { NextResponse } from "next/server";
import { getBinanceTradingExecutor } from '@/lib/trading-bot/executors/binance-trading-executor';

/**
 * GET /api/trading/executor
 * Get trading executor status
 */
export async function GET() {
  try {
    const executor = getBinanceTradingExecutor();
    const status = executor.getTradingStatus();
    const positions = executor.getActivePositionsSummary();
    
    return NextResponse.json({
      success: true,
      data: {
        ...status,
        positions,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error("Error getting trading executor status:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to get trading executor status",
        details: (error as Error).message 
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/trading/executor
 * Control trading executor (start/stop/config)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, config } = body;
    
    const executor = getBinanceTradingExecutor();
    
    let result: any = {};
    
    switch (action) {
      case 'start':
        await executor.startAutomatedTrading();
        result = {
          message: "Automated trading started successfully",
          status: executor.getTradingStatus()
        };
        break;
        
      case 'stop':
        await executor.stopAutomatedTrading();
        result = {
          message: "Automated trading stopped successfully",
          status: executor.getTradingStatus()
        };
        break;
        
      case 'config':
        if (config) {
          executor.updateConfig(config);
          result = {
            message: "Trading configuration updated successfully",
            config: executor.getTradingStatus().config
          };
        } else {
          throw new Error("Configuration data required for config action");
        }
        break;
        
      default:
        throw new Error(`Unknown action: ${action}`);
    }
    
    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("Error controlling trading executor:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to control trading executor",
        details: (error as Error).message 
      },
      { status: 500 }
    );
  }
}