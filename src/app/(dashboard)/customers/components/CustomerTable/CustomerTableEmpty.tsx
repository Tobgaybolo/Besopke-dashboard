// src/components/customers/CustomerTable/CustomerTableEmpty.tsx
'use client';

import { TableRow, TableCell, Typography } from '@mui/material';

export default function CustomerTableEmpty() {
  return (
    <TableRow>
      <TableCell colSpan={6} align="center" sx={{ py: 2 }}>
        <Typography variant="body2" color="textSecondary">
          No customers found
        </Typography>
      </TableCell>
    </TableRow>
  );
}