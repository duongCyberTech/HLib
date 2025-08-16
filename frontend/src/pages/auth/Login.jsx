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
import { TestInfo, FontAwesomeIcon } from '../../components/common';

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
    <Container sx={{ ml: 0, mt: 5, mb: 5, display: 'flex', gap: 4, width: '100%', flexWrap:"wrap" }}>
            {/* Test Info */}
            <Box sx={{ width: '100%' }}>
                <TestInfo />
            </Box>

            {/* Left Side - Form */}
            <Box sx={{ flex: 1, width: "100%", boxShadow: 3, p: 4, borderRadius: 2, backgroundColor: '#fff', justifyItems: 'space-between' }}>
                <Box display={'flex'} flexDirection="column" alignItems="center" mb={3}>
                    <FontAwesomeIcon
                        icon="fas fa-user-lock"
                        size="3rem"
                        color="#40C4FF"
                        sx={{ mb: 1 }}
                    />
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        LOG IN
                    </Typography>
                </Box>
                

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Grid container spacing={2} sx={{justifyItems: 'center', alignSelf: 'center'}}>
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
                    <Link href="/forgot-password" underline="hover">
                            Click here
                    </Link>
                </Typography>

                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, py: 1.2, fontWeight: 'bold' }}
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
                    <Link href="/" underline="hover">
                        Register now
                    </Link>
                </Typography>
            </Box>

            {/* Right Side - Info */}
            <Box sx={{ flex: 1}}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                Tài khoản để test
                </Typography>
                <ul style={{ paddingLeft: '1rem', marginTop: '1rem' }}>
                <li>
                    <Typography>
                    Email: user@hcmut.edu.vn
                    </Typography>
                </li>
                <li>
                    <Typography>
                    Password: user123
                    </Typography>
                </li>
                </ul>
            </Box>
    </Container>
  );
}
