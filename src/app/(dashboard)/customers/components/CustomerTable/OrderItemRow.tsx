// src/components/customers/CustomerTable/OrderItemRow.tsx
'use client';

import { Stack, Box, Typography, IconButton } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { OrderItem } from '@/lib/types';
import SizeEditor from './SizeEditor';

export default function OrderItemRow({
  items,
  orderId
}: {
  items: OrderItem[];
  orderId: string;
}) {
  return (
    <Stack spacing={1}>
      {items.map((item) => (
        <SizeEditor 
          key={item.orderItemId}
          item={item}
          orderId={orderId}
        />
      ))}
    </Stack>
  );
}