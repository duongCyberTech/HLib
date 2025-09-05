import { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import { authService } from '../../services';

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
  const { register } = useAuth();
  const [toggleUpload, setToggleUpload] = useState(1);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    setImage(file);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'avata_docs'); // 👈 Replace
    formData.append('cloud_name', 'dsivbzwgs');       // 👈 Replace

    try {
      setToggleUpload(2)
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dsivbzwgs/image/upload',
        formData
      );
      setUrl(res.data.secure_url);
      setToggleUpload(3);
    } catch (err) {
        setToggleUpload(1);
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
      const result = await register({ fname, mname, lname, email, avata: url, password });
      if (result.success) {
        // Store uid for OTP verification
        const uid = result.data.data.uid;
        localStorage.setItem("uid", uid);

        // Request OTP
        await authService.requestOTP(uid);

        setSuccess('Registration successful! OTP code has been sent to your email, please check your inbox');
        setTimeout(() => {
          navigate("/verify", { state: { uid: uid, isSignup: true } });
        }, 2000);
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Something went wrong, please try again later');
    } finally {
      setLoading(false);
    }

  }
  return (
    <Container sx={{ display: 'flex', justifyContent:'center', alignItems:'center', minHeight: '100vh', width:'100%', backgroundColor:'#05326d'  }}>
            {/* Left Side - Form */}
            <Box sx={{ maxWidth:'650px', maxHeight: '800px', width:'100%', boxShadow: 3, p: 4, borderRadius: 1, backgroundColor: "#fff" }}>
                <Box display={'flex'} flexDirection="column" alignItems="center" mb={3}>
                    <PersonAddIcon sx={{ fontSize: 50, color: '#05326d', mb: 1 }} />
                    <Typography variant="h5" color='#05326d' fontWeight="bold" gutterBottom>
                        SIGN IN
                    </Typography>
                </Box>
                

                {/* Inputs */}
                <Box component="form" noValidate>
                  {/* Row 1: First name & Middle name */}
                  <Grid container spacing={2} sx={{ mb: 2, justifyContent: "center" }}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="middleName"
                        label="Middle Name"
                        name="middleName"
                        value={mname}
                        onChange={(e) => setMname(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  {/* Row 2: Last name & Email */}
                  <Grid container spacing={2} sx={{ mb: 2, justifyContent: "center" }}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  {/* Row 3: Password & Confirm password */}
                  <Grid container spacing={2} sx={{ justifyContent: "center" }}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        error={confirmPass !== '' && confirmPass !== password}
                        helperText={confirmPass !== '' && confirmPass !== password ? 'Passwords do not match' : ''}
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Box>

                {/* Đưa Upload Avatar ra ngoài Grid để không phá layout */}
                <Box mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    {toggleUpload === 1 ? 'Upload Avatar' : toggleUpload === 2 ? 'Uploading...' : image?.name}
                    <VisuallyHiddenInput
                    type="file"
                    onChange={handleUpload}
                    // chỉ up 1 ảnh avatar
                    multiple={false}
                    accept="image/*"
                    />
                </Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
                </Box>

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
                    sx={{ mt: 2, py: 1.2, fontWeight: 'bold', backgroundColor: '#05326d', '&:hover':{backgroundColor:'#4bbad4'}, color: '#fff' }}
                    onClick={(e) => handleSubmit(e)}
                    disabled={loading || !fname || !lname || !email || !password || !mname || !confirmPass || toggleUpload === 2}
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
    </Container>
  );
}
