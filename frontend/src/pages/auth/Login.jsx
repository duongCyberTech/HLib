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
  Typography
} from '@mui/material';
import {SensorOccupiedTwoTone, CloudUpload} from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

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
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if ( !email || !password) {
        return;
    }

    try {
        const res = await axios.post("http://localhost:3001/api/auth/login",{
            email,
            password
        })
        console.log(res.data)
        localStorage.setItem("token", res.data.token)
        Swal.fire({
            title: 'Login Successful!',
            text: "You have logged in successfully.",
            icon: 'success',
            confirmButtonText: 'OK'
        })
        navigate("/dashboard");
               //navigate("/verify",{state: {uid: res.data.data.uid}});
    } catch (error) {
        console.error(error.message)
        Swal.fire({
            title: 'Error!',
            text: "Something went wrong, please try again later",
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
  }

  return (
    <Container sx={{ ml: 0, mt: 5, mb: 5, display: 'flex', gap: 4, width: '100%', flexWrap:"wrap" }}>
            {/* Left Side - Form */}
            <Box sx={{ flex: 1, width: "100%", boxShadow: 3, p: 4, borderRadius: 2, backgroundColor: '#fff', justifyItems: 'space-between' }}>
                <Box display={'flex'} flexDirection="column" alignItems="center" mb={3}>
                    <SensorOccupiedTwoTone sx={{ fontSize: 50, color: '#40C4FF', mb: 1 }} />
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        LOG IN
                    </Typography>
                </Box>
                

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
                    {...(!email || !password) ? { disabled: true } : {}}
                >
                    Log in
                </Button>

                <Divider sx={{ my: 3 }}>OR</Divider>

                <Box display="flex" justifyContent="center" gap={2}>
                    <IconButton>
                        <GoogleIcon />
                    </IconButton>
                    <IconButton>
                        <FacebookIcon />
                    </IconButton>
                    <IconButton>
                        <AppleIcon />
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
                Come join us
                </Typography>
                <ul style={{ paddingLeft: '1rem', marginTop: '1rem' }}>
                <li>
                    <Typography>
                    💡 Explore articles, tutorials, and guides on diverse subjects
                    </Typography>
                </li>
                <li>
                    <Typography>
                    ⏰ Learn at your own pace and access educational resources anytime
                    </Typography>
                </li>
                <li>
                    <Typography>
                    🌐 Engage with a community of learners and share insights
                    </Typography>
                </li>
                </ul>
            </Box>
    </Container>
  );
}
