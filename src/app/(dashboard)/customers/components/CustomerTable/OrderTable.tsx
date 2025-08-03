// src/components/customers/CustomerTable/OrderTable.tsx
'use client';

import { Table, TableHead, TableBody, TableRow, TableCell, CircularProgress, Alert, Typography, Box } from '@mui/material';
import { Order } from '@/lib/types';
import OrderItemRow from './OrderItemRow';

export default function OrderTable({
  orders,
  loading,
  error,
  customerId
}: {
  orders?: Order[];
  loading: boolean;
  error: string | null;
  customerId: string;
}) {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={2}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>;
  }

  if (!orders || orders.length === 0) {
    return (
      <Typography variant="body2" color="textSecondary">
        No orders found for this customer
      </Typography>
    );
  }

  return (
    <Table size="small" sx={{ backgroundColor: 'white' }}>
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: 'bold' }}>Order ID</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>Order Date</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>Items</TableCell>
          <TableCell align="right" sx={{ fontWeight: 'bold' }}>Total Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.orderId} hover>
            <TableCell>{order.orderId}</TableCell>
            <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
            <TableCell>
              <OrderItemRow items={order.items} orderId={order.orderId} />
            </TableCell>
            <TableCell align="right">
              ${order.totalAmount.toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}