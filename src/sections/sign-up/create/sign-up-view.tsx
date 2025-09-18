import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function SignUpView() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e:any) => { 
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    // Aqui você pode enviar os dados para a API, etc.
    setLoading(true)
    fetch('virtual-store-api.vercel.app/api/users', {method: 'POST', body: JSON.stringify(formData), headers: {
      'Content-Type': 'application/json',
    }})
      .then((res) => {
        if (!res.ok){
          throw new Error('Erro ao buscar usuários.')
        }
        return res.json();
      })
    .then((data) => {
      setLoading(false);
      alert("Usuário cadastrado com sucesso!")
      router.push('/')
    })
    .catch((err) => {
      console.error(err)
      setLoading(false);
      alert("Ocorreu um erro ao cadastrar usuário!")
    })
  };

  const renderForm = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <TextField
        fullWidth
        name="name"
        label="Name"
        defaultValue="John Doe"
        value={formData.name}
        onChange={handleChange}
        sx={{ mb: 3 }}
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />

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
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          gap: 0.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h5">Create User</Typography>
        {renderForm}
      </Box>    
    </>
  );
}
