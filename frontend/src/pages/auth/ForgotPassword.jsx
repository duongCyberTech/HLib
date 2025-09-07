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
import { authService } from '../../services';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isON, setIsON] = useState(false);
  const handleSendPassword = async (event) => {
    event.preventDefault();
    if (!email) {
        alert("Please enter your email address");
        return;
    }
    try {
        const response = await authService.forgotPassword(email);
        console.log(response);
        alert("New password has been sent to your email. Please check your inbox.");
        setIsON(true);
    } catch (error) {
        console.error('Forgot password error:', error);
        alert(error.message || "Something went wrong, please try again later");
    }
  }


  return (
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
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isON}
                        />
                    </Grid>
                </Grid>

                {isON && (
                    <Typography variant="body1" sx={{ mt: 2, textAlign: 'center', color: 'green' }}>
                        New password has been sent to your email. Please check your inbox and login with the new password.
                    </Typography>
                )}

                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, py: 1.2, fontWeight: 'bold' }}
                    onClick={(e) => handleSendPassword(e)}
                    disabled={!email || isON}
                >
                    {isON ? 'Password Sent' : 'Send New Password'}
                </Button>
                

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
