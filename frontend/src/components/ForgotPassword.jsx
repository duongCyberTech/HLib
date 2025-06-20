import { useState} from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import {SensorOccupiedTwoTone} from '@mui/icons-material';
import axios from 'axios';
import CountdownTimer from './CountDown';
import { useLocation } from 'react-router-dom';

export default function ForgotPassword() {
    const [otp, setOTP] = useState('');
    const [seconds, setSeconds] = useState(0);
    const [email, setEmail] = useState('');
    const [isON, setIsON] = useState(false);
  const handleVerify = async (event) => {
    event.preventDefault();
    if (!otp) {
        alert("Please enter the OTP code");
        return;
    }
    alert(localStorage.getItem("uid"))
    try {
        const res = await axios.post(`http://localhost:3001/api/auth/otp/verify/`,{
            email,
            otp
        })
        console.log(res.data)
        alert("Register successfully, please login to continue")
    } catch (error) {
        console.error(error.message)
        alert("Something went wrong, please try again later")
    }
  }

  const handleResend = async (event) => {
    event.preventDefault();
    try {
        const res = await axios.post(`http://localhost:3001/api/auth/otp/request/`,{
            email
        });
        console.log(res.data);
        alert("OTP code has been resent to your email");
        setSeconds(120); // Reset countdown timer
    } catch (error) {
        console.error(error.message);
        alert("Something went wrong, please try again later");
    }
    }
  return (
    <>
    <video
    
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <source src="/assets/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        <Box mb={2} sx={{marginLeft: 5,mt: -10, display: "flex", gap: 2, alignItems: "center", marginTop: 5}} >
          <img src="/assets/Logo.png" alt="Logo" style={{ width: 50, height: 50 }} />
          <Typography variant="h5" color="#40C4FF" fontWeight="bold">
            HCMUT ACADEMIC FORUM
          </Typography>
        </Box>
        <Container sx={{ ml: 0, mt: 5, mb: 5, display: 'flex', gap: 4, width: '100%', flexWrap:"wrap" }}>
            {/* Left Side - Form */}
            <Box sx={{ flex: 1, width: "100%", boxShadow: 3, p: 4, borderRadius: 2, backgroundColor: '#fff', justifyItems: 'space-between' }}>
                <Box display={'flex'} flexDirection="column" alignItems="center" mb={3}>
                    <SensorOccupiedTwoTone sx={{ fontSize: 50, color: '#40C4FF', mb: 1 }} />
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        RESET PASSWORD
                    </Typography>
                </Box>
                
                
                <Grid container spacing={2} sx={{justifyItems: 'center', alignSelf: 'center'}}>
                    {!isON ? 
                        (
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
                        ) : (
                            <Grid item xs={6}>
                                <TextField 
                                    fullWidth 
                                    label="OTP Code" 
                                    required
                                    value={otp} 
                                    onChange={(e) => setOTP(e.target.value)}
                                />
                            </Grid>
                        )
                    }
                    
                </Grid>
                <CountdownTimer seconds={seconds} setSeconds={setSeconds}/>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 3 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, py: 1.2, fontWeight: 'bold' }}
                        onClick={(e) => handleResend(e)}
                        {...(seconds > 0
                        ) ? { disabled: true } : {}}
                    >
                        Send Code
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, py: 1.2, fontWeight: 'bold' }}
                        onClick={(e) => handleVerify(e)}
                        {...(!otp || otp.length < 6
                        ) ? { disabled: true } : {}}
                    >
                        Verify
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
    </>
    
  );
}
