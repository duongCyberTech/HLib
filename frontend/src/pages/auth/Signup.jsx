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
  CircularProgress,
  Alert
} from '@mui/material';
import { CloudUploadIcon, GoogleIcon, FacebookIcon, AppleIcon, PersonAddIcon } from '../../components/common/Icons';
import { styled } from '@mui/material/styles';
import axios from 'axios';
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

export default function SignupForm() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [fname, setFname] = useState('');
  const [mname, setMname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    setImage(file);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'avata_docs'); // 👈 Replace
    formData.append('cloud_name', 'dsivbzwgs');       // 👈 Replace

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dsivbzwgs/image/upload',
        formData
      );
      setUrl(res.data.secure_url);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!fname || !lname || !email || !password || !mname || !confirmPass) {
        setError('Please fill in all fields');
        return;
    }
    if (password !== confirmPass) {
        setError('Passwords do not match');
        return;
    }

    setLoading(true);

    try {
        const res = await axios.post("http://localhost:3001/api/auth/register",{
            fname,
            mname,
            lname,
            email,
            avata: url,
            password
        })
        console.log(res.data)
        localStorage.setItem("uid", res.data.data.uid)
        await axios.post(`http://localhost:3001/api/auth/otp/request`,{uid: res.data.data.uid});

        setSuccess('Registration successful! OTP code has been sent to your email, please check your inbox');
        setTimeout(() => {
            navigate("/verify",{state: {uid: res.data.data.uid}});
        }, 2000);
    } catch (error) {
        console.error(error.message)
        setError('Something went wrong, please try again later');
    } finally {
        setLoading(false);
    }

  }
  return (
    <Container sx={{ ml: 0, mt: 5, mb: 5, display: 'flex', gap: 4, width: '100vw', flexWrap:"wrap", justifyItems: 'center' }}>
            {/* Left Side - Form */}
            <Box sx={{ flex: 1, width: "100%", boxShadow: 3, p: 4, borderRadius: 2, backgroundColor: '#fff', justifyItems: 'space-between' }}>
                <Box display={'flex'} flexDirection="column" alignItems="center" mb={3}>
                    <PersonAddIcon sx={{ fontSize: 50, color: '#40C4FF', mb: 1 }} />
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        SIGN IN
                    </Typography>
                </Box>
                

                <Grid container spacing={2} sx={{justifyItems: 'center', alignSelf: 'center'}}>
                    <Grid item xs={6}>
                        <TextField 
                            fullWidth 
                            label="First name" 
                            required
                            value={fname} 
                            onChange={(e) => setFname(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            fullWidth 
                            label="Middle name" 
                            required
                            value={mname} onChange={(e) => setMname(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            fullWidth 
                            label="Last name" 
                            value={lname} 
                            required
                            onChange={(e) => setLname(e.target.value)}
                        />
                    </Grid>
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
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Confirmed Password"
                            type="password"
                            required
                            error={confirmPass !== password && confirmPass !== ''}
                            helperText={confirmPass !== password && confirmPass !== '' ? "Passwords do not match" : "Matche"}
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                        />
                    </Grid>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        loading={!image ? <CircularProgress size={24} /> : null}
                    >
                        {image ? image.name : 'Upload Avatar'}
                        <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => handleUpload(event)}
                            multiple
                        />
                    </Button>
                </Grid>

                <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={
                        <Typography variant="body2">
                        By signing up, I agree with the{' '}
                        <Link href="#" underline="hover">
                            Terms of Use & Privacy Policy
                        </Link>
                        </Typography>
                    }
                    sx={{ mt: 1 }}
                />

                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        {success}
                    </Alert>
                )}

                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, py: 1.2, fontWeight: 'bold' }}
                    onClick={(e) => handleSubmit(e)}
                    disabled={loading || !fname || !lname || !email || !password || !mname || !confirmPass || !url || url === ''}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                    {loading ? 'Registering...' : 'Register'}
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
                    Returning user?{' '}
                    <Link href="/login" underline="hover">
                        Log in here
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
