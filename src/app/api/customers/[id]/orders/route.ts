import { NextResponse } from 'next/server';
import { mockCustomers } from '@/lib/mockData';
import { Customer } from '@/lib/types';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const customer = mockCustomers.find(c => c.id === params.id);
  
  if (!customer) {
    return NextResponse.json(
      { error: 'Customer not found' },
      { status: 404 }
    );
  }
  
  // Return the orders array (with all nested details)
  return NextResponse.json(customer.orders || []);
}