// src/components/customers/CustomerTable/CustomerRow.tsx
'use client';

import { Fragment, useState } from 'react';
import { TableRow, TableCell, Collapse, Box, Typography, IconButton } from '@mui/material';
import { KeyboardArrowDown as ExpandIcon, KeyboardArrowUp as CollapseIcon } from '@mui/icons-material';
import { Customer, Order } from '@/lib/types';
import StatusEditor from './StatusEditor';
import OrderTable from './OrderTable';

interface CustomerRowProps {
  customer: Customer;
  sortBy: string;
  order: string;
  onSort: (column: string) => void;
}

export default function CustomerRow({ 
  customer, 
  sortBy, 
  order, 
  onSort 
}: CustomerRowProps) {
  const [expanded, setExpanded] = useState(false);
  const [orders, setOrders] = useState<Order[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleExpanded = async () => {
    if (expanded) {
      setExpanded(false);
      return;
    }

    if (!orders) {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/customers/${customer.id}/orders`);
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    }
    setExpanded(true);
  };

  return (
    <Fragment>
      <TableRow hover>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={toggleExpanded}
          >
            {expanded ? <CollapseIcon /> : <ExpandIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{customer.name}</TableCell>
        <TableCell>
          <StatusEditor customer={customer} />
        </TableCell>
        <TableCell>{customer.email}</TableCell>
        <TableCell align="right">{customer.orderCount}</TableCell>
        <TableCell align="right">
          ${customer.revenue.toLocaleString()}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ p: 0, borderBottom: expanded ? '1px solid #e0e0e0' : 0 }}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
                Orders
              </Typography>
              <OrderTable 
                orders={orders}
                loading={loading}
                error={error}
                customerId={customer.id}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}