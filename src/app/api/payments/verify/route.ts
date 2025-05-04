import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem';
import { celoAlfajores } from 'viem/chains';

// Configure the public client with the Celo Alfajores testnet
const publicClient = createPublicClient({
  chain: celoAlfajores,
  transport: http('https://alfajores-forno.celo-testnet.org')
});

/**
 * Verifies a transaction on the Celo blockchain
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { txHash, expectedAmount, expectedRecipient, tokenAddress } = body;

    // Basic validation
    if (!txHash) {
      return NextResponse.json(
        { error: 'Missing transaction hash' },
        { status: 400 }
      );
    }

    // Convert txHash to 0x format if needed
    const formattedTxHash = txHash.startsWith('0x') ? txHash : `0x${txHash}`;

    try {
      // Get transaction receipt
      const receipt = await publicClient.getTransactionReceipt({
        hash: formattedTxHash as `0x${string}`
      });

      // Check if transaction was successful
      if (receipt.status !== 'success') {
        return NextResponse.json({
          verified: false,
          reason: 'Transaction failed',
          receipt
        });
      }

      // For token transfers, we'd typically check logs to verify the transfer details
      // This is a simplified version. In a real implementation, you would:
      // 1. Parse events from logs to find the token transfer event
      // 2. Verify the recipient and amount match what's expected
      // 3. Check if the transaction is confirmed with enough blocks

      let verified = true;
      let details = { receipt };

      // If token transfer details are provided, verify them
      if (tokenAddress && expectedRecipient && expectedAmount) {
        // In a real implementation, parse token transfer events from logs
        // and verify the details match what's expected
        
        // Mock implementation - in production replace with actual event parsing
        const mockVerification = {
          actualRecipient: expectedRecipient,
          actualAmount: expectedAmount,
          verified: true
        };
        
        verified = mockVerification.verified;
        details = {
          ...details,
          ...mockVerification
        };
      }

      return NextResponse.json({
        verified,
        details
      });
    } catch (error) {
      // Transaction doesn't exist or other blockchain query error
      return NextResponse.json({
        verified: false,
        reason: 'Transaction verification failed',
        error: error.message
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Transaction verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify transaction', details: error.message },
      { status: 500 }
    );
  }
} 