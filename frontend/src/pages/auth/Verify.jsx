import { useState} from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';
import {SensorOccupiedTwoTone} from '@mui/icons-material';
import axios from 'axios';
import CountdownTimer from '../../components/CountDown';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Verify() {
    const [otp, setOTP] = useState('');
    const [seconds, setSeconds] = useState(120);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const location = useLocation()
    const uid = location.state.uid
    const navigate = useNavigate()
  const handleVerify = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!otp) {
        setError('Please enter the OTP code');
        return;
    }

    setLoading(true);

    try {
        const res = await axios.post(`http://localhost:3001/api/auth/otp/verify`,{
            uid,
            otp
        })
        console.log(res.data)
        setSuccess('Registration successful! Please login to continue');
        setTimeout(() => {
            navigate('/login')
        }, 2000);
    } catch (error) {
        console.error(error.message)
        setError('Invalid OTP code or something went wrong, please try again');
    } finally {
        setLoading(false);
    }
  }

  const handleResend = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
        const res = await axios.post(`http://localhost:3001/api/auth/otp/request`,{
            uid,
        });
        console.log(res.data);
        setSuccess('OTP code has been resent to your email');
        setSeconds(120); // Reset countdown timer
    } catch (error) {
        console.error(error.message);
        setError('Failed to resend OTP, please try again later');
    }
    }
  return (
    <Container sx={{ ml: 0, mt: 5, mb: 5, display: 'flex', gap: 4, width: '100%', flexWrap:"wrap" }}>
            {/* Left Side - Form */}
            <Box sx={{ flex: 1, width: "100%", boxShadow: 3, p: 4, borderRadius: 2, backgroundColor: '#fff', justifyItems: 'space-between' }}>
                <Box display={'flex'} flexDirection="column" alignItems="center" mb={3}>
                    <SensorOccupiedTwoTone sx={{ fontSize: 50, color: '#40C4FF', mb: 1 }} />
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        VERIFY YOUR ACCOUNT
                    </Typography>
                </Box>
                

                <Grid container spacing={2} sx={{justifyItems: 'center', alignSelf: 'center'}}>
                    <Grid item xs={6}>
                        <TextField 
                            fullWidth 
                            label="OTP Code" 
                            required
                            value={otp} 
                            onChange={(e) => setOTP(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <CountdownTimer seconds={seconds} setSeconds={setSeconds}/>

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

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 3 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, py: 1.2, fontWeight: 'bold' }}
                        onClick={(e) => handleResend(e)}
                        {...(seconds > 0
                        ) ? { disabled: true } : {}}
                    >
                        Resend Code
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, py: 1.2, fontWeight: 'bold' }}
                        onClick={(e) => handleVerify(e)}
                        disabled={loading || !otp || otp.length < 6}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                        {loading ? 'Verifying...' : 'Verify'}
                    </Button>
                </Box>
                

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
