import CustomerTable from './components/CustomerTable/CustomerTable';
import { Box, Typography } from '@mui/material';

export default function CustomersPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Customers
      </Typography>
      <CustomerTable />
    </Box>
  );
}