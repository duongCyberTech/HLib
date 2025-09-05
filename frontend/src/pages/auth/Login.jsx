import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography,
  Alert
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import { FontAwesomeIcon } from '../../components/common';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Something went wrong, please try again later');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container sx={{ display: 'flex', justifyContent:'center', alignItems:'center', minHeight: '100vh', width:'100%', backgroundColor:'#05326d' }}>
            {/* Test Info */}

            {/* Left Side - Form */}
            <Box sx={{ maxWidth:'550px', maxHeight: '800px', width:'100%', boxShadow: 3, p: 4, borderRadius: 1, backgroundColor: "#fff" }}>
                <Box display={'flex'} flexDirection="column" alignItems="center" mb={3}>
                    <img src="/assets/Logo.png" alt="Logo" style={{ width: 50, height: 50 }} />
                    <Typography
                      variant="h5"
                      color="#05326d"
                      fontWeight="bold"
                      sx={{
                        fontFamily: 'Roboto-SemiBold, system-ui, sans-serif',
                        letterSpacing: '0.5px'
                      }}
                    >
                      HCMUT ACADEMIC FORUM
                    </Typography>
                    <Box display={'flex'} flexDirection="column" alignItems="center" mt={3} mb={1}>
                        <FontAwesomeIcon
                            icon="fas fa-user-lock"
                            size="3rem"
                            color="#05326d"
                            sx={{ mb: 1 }}
                        />
                        <Typography variant="h5" color='#05326d' fontWeight="bold" gutterBottom >
                            LOG IN
                        </Typography>
                    </Box>



                </Box>


                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Grid container spacing={2} direction={'column'}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Typography variant="body2" sx={{mt: 2}}>
                    Forgot your password ?{' '}
                    <Link href="/forgot-password" underline="hover" sx={{ color: '#05326d' }}>
                            Click here
                    </Link>
                </Typography>

                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, py: 1.2, fontWeight: 'bold', backgroundColor: '#05326d', '&:hover': {backgroundColor: '#4bbad5'}, color: '#fff' }}
                    onClick={(e) => handleSubmit(e)}
                    disabled={!email || !password || loading}
                >
                    {loading ? 'Logging in...' : 'Log in'}
                </Button>

                <Divider sx={{ my: 3 }}>OR</Divider>

                <Box display="flex" justifyContent="center" gap={2}>
                    <IconButton>
                        <FontAwesomeIcon
                            icon="fab fa-google"
                            size="1.5rem"
                            color="#db4437"
                        />
                    </IconButton>
                    <IconButton>
                        <FontAwesomeIcon
                            icon="fab fa-facebook"
                            size="1.5rem"
                            color="#3b5998"
                        />
                    </IconButton>
                    <IconButton>
                        <FontAwesomeIcon
                            icon="fab fa-apple"
                            size="1.5rem"
                            color="#000000"
                        />
                    </IconButton>
                </Box>

                <Typography align="center" variant="body2" mt={3}>
                    New user ?{' '}
                    <Link href="/" underline="hover" sx={{ color: '#05326d' }}>
                        Register now
                    </Link>
                </Typography>
            </Box>
    </Container>
  );
}
