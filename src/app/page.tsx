import { Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Bespoke Clothing Dashboard
      </Typography>
      <Button 
        variant="contained" 
        component={Link} 
        href="/customers"
        sx={{ mt: 2 }}
      >
        Go to Customers Dashboard
      </Button>
    </Box>
  );
}