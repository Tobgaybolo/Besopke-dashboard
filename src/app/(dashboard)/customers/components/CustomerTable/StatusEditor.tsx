// src/components/customers/CustomerTable/StatusEditor.tsx
'use client';

import { useState } from 'react';
import { Box, Chip, IconButton, MenuItem, Select } from '@mui/material';
import { Check as CheckIcon, Close as CloseIcon, Edit as EditIcon } from '@mui/icons-material';
import { Customer, CustomerStatus } from '@/lib/types';

const STATUS_COLORS: Record<CustomerStatus, 'success' | 'error' | 'warning'> = {
  active: 'success',
  churned: 'error',
  prospect: 'warning'
};

export default function StatusEditor({ customer }: { customer: Customer }) {
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState<CustomerStatus>(customer.status);

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/customers/${customer.id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update status');
      setEditing(false);
    } catch (error) {
      console.error('Status update failed:', error);
    }
  };

  if (editing) {
    return (
      <Box display="flex" alignItems="center" gap={1}>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value as CustomerStatus)}
          size="small"
          sx={{ minWidth: 100 }}
        >
          {Object.keys(STATUS_COLORS).map((status) => (
            <MenuItem key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </MenuItem>
          ))}
        </Select>
        <IconButton 
          onClick={handleSave} 
          size="small"
          aria-label="save status"
        >
          <CheckIcon fontSize="small" />
        </IconButton>
        <IconButton 
          onClick={() => {
            setStatus(customer.status);
            setEditing(false);
          }} 
          size="small"
          aria-label="cancel edit"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Chip
        label={customer.status}
        color={STATUS_COLORS[customer.status]}
        size="small"
      />
      <IconButton 
        onClick={() => setEditing(true)} 
        size="small"
        aria-label="edit status"
      >
        <EditIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}