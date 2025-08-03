// src/components/customers/CustomerTable/CustomerTable.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, TextField, Typography, TablePagination, TableSortLabel } from '@mui/material';
import { Customer, CustomerStatus } from '@/lib/types';
import CustomerRow from './CustomerRow';
import CustomerTableSkeleton from './CustomerTableSkeleton';
import CustomerTableEmpty from './CustomerTableEmpty';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const DEFAULT_SORT_BY = 'name';
const DEFAULT_ORDER = 'asc';

export default function CustomerTable() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');

  const page = parseInt(searchParams.get('page') || DEFAULT_PAGE.toString(), 10);
  const limit = parseInt(searchParams.get('limit') || DEFAULT_LIMIT.toString(), 10);
  const sortBy = searchParams.get('sortBy') || DEFAULT_SORT_BY;
  const order = searchParams.get('order') || DEFAULT_ORDER;

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortBy,
        order,
        ...(search && { search })
      });

      const response = await fetch(`/api/customers?${params}`);
      const data = await response.json();
      setCustomers(data.data);
      setTotal(data.total);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  }, [page, limit, sortBy, order, search]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleSort = useCallback((column: string) => {
    const newOrder = sortBy === column && order === 'asc' ? 'desc' : 'asc';
    const params = new URLSearchParams({
      page: '1',
      limit: limit.toString(),
      sortBy: column,
      order: newOrder,
      ...(search && { search })
    });
    router.push(`?${params.toString()}`);
  }, [sortBy, order, limit, search, router]);

  const handleChangePage = useCallback((_: unknown, newPage: number) => {
    const params = new URLSearchParams({
      page: (newPage + 1).toString(),
      limit: limit.toString(),
      sortBy,
      order,
      ...(search && { search })
    });
    router.push(`?${params.toString()}`);
  }, [limit, sortBy, order, search, router]);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(event.target.value, 10);
    const params = new URLSearchParams({
      page: '1',
      limit: newLimit.toString(),
      sortBy,
      order,
      ...(search && { search })
    });
    router.push(`?${params.toString()}`);
  }, [sortBy, order, search, router]);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 2, boxShadow: 'none' }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        Customers
      </Typography>
      
      <TextField
        label="Search Customers"
        variant="outlined"
        size="small"
        value={search}
        onChange={handleSearchChange}
        sx={{ mb: 2, width: 300 }}
      />

      <TableContainer sx={{ maxHeight: 'calc(100vh - 200px)', border: '1px solid #e0e0e0' }}>
        <Table stickyHeader aria-label="customer table" size="small">
          <TableHead>
            <TableRow>
              <TableCell width={50} />
              <TableCell sx={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active={sortBy === 'name'}
                  direction={order === 'asc' ? 'asc' : 'desc'}
                  onClick={() => handleSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active={sortBy === 'status'}
                  direction={order === 'asc' ? 'asc' : 'desc'}
                  onClick={() => handleSort('status')}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active={sortBy === 'email'}
                  direction={order === 'asc' ? 'asc' : 'desc'}
                  onClick={() => handleSort('email')}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active={sortBy === 'orderCount'}
                  direction={order === 'asc' ? 'asc' : 'desc'}
                  onClick={() => handleSort('orderCount')}
                >
                  Order Count
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active={sortBy === 'revenue'}
                  direction={order === 'asc' ? 'asc' : 'desc'}
                  onClick={() => handleSort('revenue')}
                >
                  Total Revenue
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <CustomerTableSkeleton />
            ) : customers.length === 0 ? (
              <CustomerTableEmpty />
            ) : (
              customers.map((customer) => (
                <CustomerRow 
                  key={customer.id}
                  customer={customer}
                  sortBy={sortBy}
                  order={order}
                  onSort={handleSort}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={total}
        rowsPerPage={limit}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          borderTop: '1px solid #e0e0e0',
          '& .MuiTablePagination-toolbar': {
            px: 2
          }
        }}
      />
    </Paper>
  );
}