import { NextResponse } from 'next/server';
import { mockCustomers } from '@/lib/mockData';
import { Customer } from '@/lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // Pagination
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  
  // Sorting
  const sortBy = searchParams.get('sortBy') || 'name';
  const order = searchParams.get('order') || 'asc';
  
  // Filtering
  const search = searchParams.get('search') || '';
  
  // Filter customers based on search
  let filteredCustomers = mockCustomers.filter(customer => 
    customer.name.toLowerCase().includes(search.toLowerCase()) || 
    customer.email.toLowerCase().includes(search.toLowerCase())
  );
  
  // Sort customers
  filteredCustomers.sort((a, b) => {
    const aValue = a[sortBy as keyof Customer];
    const bValue = b[sortBy as keyof Customer];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return order === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    } else if (aValue instanceof Date && bValue instanceof Date) {
      return order === 'asc' 
        ? aValue.getTime() - bValue.getTime() 
        : bValue.getTime() - aValue.getTime();
    }
    return 0;
  });
  
  // Paginate results
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);
  
  // Remove orders array from response (as per requirements)
  const customersWithoutOrders = paginatedCustomers.map(({ orders, ...rest }) => rest);
  
  return NextResponse.json({
    data: customersWithoutOrders,
    total: filteredCustomers.length,
    page,
    limit,
    totalPages: Math.ceil(filteredCustomers.length / limit),
  });
}