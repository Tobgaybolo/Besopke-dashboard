// src/components/customers/CustomerTable/SizeEditor.tsx
'use client';

import { useState } from 'react';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import { Check as CheckIcon, Close as CloseIcon, Edit as EditIcon } from '@mui/icons-material';
import { OrderItem, CustomSize } from '@/lib/types';

export default function SizeEditor({
  item,
  orderId
}: {
  item: OrderItem;
  orderId: string;
}) {
  const [editing, setEditing] = useState(false);
  const [size, setSize] = useState<CustomSize>({ ...item.customSize });

  const handleSave = async () => {
    try {
      console.log('Saving size:', {
        orderId,
        orderItemId: item.orderItemId,
        size
      });
      setEditing(false);
    } catch (error) {
      console.error('Size update failed:', error);
    }
  };

  if (editing) {
    return (
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="body2" component="span">
          {item.itemName} - ${item.price.toFixed(2)}, Size:
        </Typography>
        <Box display="flex" gap={1}>
          {(['chest', 'waist', 'hips'] as const).map((measurement) => (
            <TextField
              key={measurement}
              size="small"
              label={measurement.charAt(0).toUpperCase()}
              type="number"
              value={size[measurement]}
              onChange={(e) => setSize(prev => ({
                ...prev,
                [measurement]: parseFloat(e.target.value) || 0
              }))}
              sx={{ width: 60 }}
              inputProps={{ min: 20, max: 60, step: 0.5 }}
            />
          ))}
        </Box>
        <IconButton 
          onClick={handleSave}
          size="small"
          aria-label="save size"
        >
          <CheckIcon fontSize="small" />
        </IconButton>
        <IconButton 
          onClick={() => {
            setSize({ ...item.customSize });
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
      <Typography variant="body2">
        {item.itemName} - ${item.price.toFixed(2)} (C/W/H: {item.customSize.chest}/{item.customSize.waist}/{item.customSize.hips})
      </Typography>
      <IconButton 
        onClick={() => setEditing(true)}
        size="small"
        aria-label="edit size"
      >
        <EditIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}