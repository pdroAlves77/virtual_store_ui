import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import api from 'src/api';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function CreateProductView() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: '', // só uma imagem
  });

  const [loading, setLoading] = useState(false);
  const [imageInput, setImageInput] = useState('');

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Define a URL da imagem
  const handleSetImage = () => {
    if (
      imageInput.trim() &&
      /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(imageInput)
    ) {
      setFormData((prev) => ({
        ...prev,
        imageUrl: imageInput.trim(),
      }));
      setImageInput('');
    } else {
      alert('URL inválida ou formato de imagem não suportado.');
    }
  };

  // Remove imagem
  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: '',
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const submitData = {
      ...formData,
      price: Number(formData.price),
      imageUrl: formData.imageUrl, // só uma imagem
    };
    api.post('http://localhost:3000/api/products', submitData)
      .then((data: any) => {
        setLoading(false);
        alert("Produto cadastrado com sucesso!")
        router.push('/')
      })
      .catch((err) => {
        console.error(err)
        setLoading(false);
        alert("Ocorreu um erro ao cadastrar produto!")
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
        label="Nome do Produto"
        value={formData.name}
        onChange={handleChange}
        sx={{ mb: 3 }}
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />

      <TextField
        fullWidth
        name="price"
        label="Preço (R$)"
        value={formData.price}
        onChange={handleChange}
        type="number"
        sx={{ mb: 3 }}
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />

      <TextField
        fullWidth
        name="description"
        label="Descrição"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={3}
        sx={{ mb: 3 }}
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />

      <Box sx={{ mb: 3, width: '100%' }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Imagem do Produto</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            label="URL da Imagem"
            value={imageInput}
            onChange={e => setImageInput(e.target.value)}
            placeholder="https://imagem.jpg"
            sx={{ flex: 1 }}
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />
          <Button variant="contained" color="primary" onClick={handleSetImage}>
            Adicionar
          </Button>
        </Box>
        {formData.imageUrl && (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Box sx={{ position: 'relative', height: 180 }}>
              <img
                src={formData.imageUrl}
                alt="Imagem do Produto"
                style={{ maxHeight: 180, maxWidth: '100%', borderRadius: 8 }}
              />
              <IconButton
                sx={{ position: 'absolute', top: 0, left: 0 }}
                onClick={handleRemoveImage}
              >
                <Iconify icon={"mdi:trash-can-outline" as any} />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>

      <Button
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Enviando..." : "Cadastrar Produto"}
      </Button>
    </Box>
  );

  return (
    <Box
      sx={{
        gap: 0.5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mb: 5,
      }}
    >
      <Typography variant="h5">Cadastrar Produto</Typography>
      {renderForm}
    </Box>
  );
}