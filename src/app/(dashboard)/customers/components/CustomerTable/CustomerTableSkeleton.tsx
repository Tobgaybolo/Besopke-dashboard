// src/components/customers/CustomerTable/CustomerTableSkeleton.tsx
'use client';

import { TableRow, TableCell, CircularProgress } from '@mui/material';

export default function CustomerTableSkeleton() {
  return (
    <TableRow>
      <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
        <CircularProgress size={24} />
      </TableCell>
    </TableRow>
  );
}