import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import api from 'src/api';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { ProductItem } from '../product-item';
import { ProductTableToolbar } from '../product-table-toolbar';



// ----------------------------------------------------------------------
export function ProductsView() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    api.get(
      '/products' +
        (search ? `?name=${encodeURIComponent(search)}` : '')
    )
       .then((data: any) => {
        setProducts(data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [search]);

  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Products
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => router.push('/create')}
        >
          New product
        </Button>
      </Box>

      <Box sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          {products.map((product: any) => (
            <Grid key={product._id} size={{ xs: 12, sm: 6, md: 3 }}>
              <ProductItem product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Pagination count={10} color="primary" sx={{ mt: 8, mx: 'auto' }} />
    </DashboardContent>
  );
}
