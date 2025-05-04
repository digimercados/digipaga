import { NextRequest, NextResponse } from 'next/server';
import { getConnectedAccount } from '@/lib/minipay';
import { getStablecoinBySymbol } from '@/lib/token-contracts';
import { parseTokenAmount } from '@/lib/minipay';

// Maps the crypto currency to fiat currency for internal conversion
const CRYPTO_TO_FIAT_MAP = {
  'cUSD': 'USD',
  'cEUR': 'EUR',
  'cREAL': 'BRL',
  'eXOF': 'XOF',
  'cKES': 'KES',
  'PUSO': 'PHP',
  'cCOP': 'COP'
};

// This is where we would store transaction data to prevent replay attacks
// In a production environment, this should be a database
const processedTransactions = new Set<string>();

/**
 * Handles POST requests to process payments
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      paymentId, 
      tokenSymbol, 
      amount, 
      recipientAddress, 
      billReference, 
      serviceProvider, 
      serviceType,
      txHash 
    } = body;

    // Check required fields
    if (!paymentId || !tokenSymbol || !amount || !txHash || !billReference || !serviceProvider || !serviceType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prevent replay attacks by checking if the transaction has already been processed
    if (processedTransactions.has(txHash)) {
      return NextResponse.json(
        { error: 'Transaction already processed' },
        { status: 409 }
      );
    }

    // Get user's wallet address
    const userAddress = body.userAddress || await getConnectedAccount();
    if (!userAddress) {
      return NextResponse.json(
        { error: 'Unable to get user address' },
        { status: 400 }
      );
    }

    // Validate token exists
    const token = getStablecoinBySymbol(tokenSymbol);
    if (!token) {
      return NextResponse.json(
        { error: `Token ${tokenSymbol} not supported` },
        { status: 400 }
      );
    }

    // Convert crypto amount to fiat equivalent
    // In a real implementation, you would fetch the latest exchange rate
    const fiatCurrency = CRYPTO_TO_FIAT_MAP[tokenSymbol] || 'USD';
    const fiatAmount = parseFloat(amount);
    
    // Log transaction for internal records
    const paymentRecord = {
      id: paymentId,
      txHash,
      userAddress,
      tokenSymbol,
      tokenAmount: amount,
      tokenDecimals: token.decimals,
      recipientAddress,
      fiatCurrency,
      fiatAmount,
      billReference,
      serviceProvider,
      serviceType,
      status: 'pending',
      timestamp: new Date().toISOString(),
    };

    // Here you would typically:
    // 1. Verify the transaction on the blockchain
    // 2. Store the transaction details in your database
    // 3. Trigger the fiat payment to the service provider via your private API
    
    // For now, we'll just log the transaction and mark it as successful
    console.log('Processing payment:', paymentRecord);
    
    // Add txHash to processed transactions to prevent replay
    processedTransactions.add(txHash);

    // In a real implementation, you would initiate the fiat payment here
    // await initiateProviderPayment(fiatCurrency, fiatAmount, billReference, serviceProvider);

    return NextResponse.json({
      success: true,
      message: 'Payment processed successfully',
      paymentId,
      status: 'completed',
      fiatAmount,
      fiatCurrency,
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process payment', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * Handles GET requests to get payment status
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const paymentId = searchParams.get('paymentId');
  
  if (!paymentId) {
    return NextResponse.json(
      { error: 'Missing payment ID' },
      { status: 400 }
    );
  }

  // In a real implementation, you would fetch the payment status from your database
  // For now, we'll just return a hardcoded success response
  return NextResponse.json({
    paymentId,
    status: 'completed',
    timestamp: new Date().toISOString(),
  });
} 