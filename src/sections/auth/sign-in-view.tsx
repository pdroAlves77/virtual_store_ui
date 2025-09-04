import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function SignInView() {
  const router = useRouter();

  const [formData, setFormData] = useState({
      email: '',
      password: '',
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({
          ...formData,
          [name]: value
      }); 
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
        fetch('https://virtual-store-exwil69up-pedro-alves-projects-b3253365.vercel.app/api/auth/login', {method: 'POST', body: JSON.stringify(formData), headers: {
            'Content-Type': 'application/json',
        }})
        .then((res) => {    
            if (!res.ok){
                throw new Error('Erro ao fazer login.');
            }
            return res.json();
        })
        .then((data) => {
            setLoading(false);
            alert("Login realizado com sucesso!");
            localStorage.setItem('token', data.token);
            localStorage.setItem('data', JSON.stringify(data.data));
            router.push('/');
            // Aqui você pode redirecionar o usuário ou armazenar o token
        })
        .catch((err) => {
            console.error(err);
            setLoading(false);
            alert("Ocorreu um erro ao fazer login!");
        });
  }

  const renderForm = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}
    >
      <TextField
        fullWidth
        name="email"
        label="Email address"
        defaultValue="hello@gmail.com"
        value={formData.email}
        onChange={handleChange}
        sx={{ mb: 3 }}
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />

      <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
        Forgot password?
      </Link>

      <TextField
        fullWidth
        name="password"
        label="Password"
        defaultValue="@demo1234"
        value={formData.password}
        onChange={handleChange}
        type={showPassword ? 'text' : 'password'}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 3 }}
      />

      <Button
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleSignIn}
      >
        Sign in
      </Button>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h5">Sign in</Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          Don’t have an account?
          <Link 
            variant="subtitle2" 
            sx={{ ml: 0.5 }}
            onClick={() => router.push('/sign-up')}
            style={{ cursor: 'pointer' }}
          >
            Get started
          </Link>
        </Typography>
      </Box>
      {renderForm}
    </>
  );
}
