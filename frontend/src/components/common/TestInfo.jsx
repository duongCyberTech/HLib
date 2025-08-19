import { 
  Alert, 
  AlertTitle, 
  Box, 
  Typography, 
  Chip,
  Collapse,
  IconButton
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon 
} from '@mui/icons-material';
import { useState } from 'react';

export default function TestInfo() {
  const [expanded, setExpanded] = useState(false);

  const testAccounts = [
    { email: 'admin@hcmut.edu.vn', password: 'admin123', role: 'Admin' },
    { email: 'user@hcmut.edu.vn', password: 'user123', role: 'User' }
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Alert 
        severity="info" 
        sx={{ 
          cursor: 'pointer',
          '&:hover': { backgroundColor: '#e3f2fd' }
        }}
        onClick={() => setExpanded(!expanded)}
        action={
          <IconButton size="small" color="inherit">
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        }
      >
        <AlertTitle>🧪 Test Mode - Click để xem tài khoản test</AlertTitle>
        Đang sử dụng Mock Service (không cần backend)
      </Alert>
      
      <Collapse in={expanded}>
        <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            Tài khoản Test:
          </Typography>
          {testAccounts.map((account, index) => (
            <Box key={index} sx={{ mb: 2, p: 2, backgroundColor: 'white', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Chip label={account.role} color="primary" size="small" />
              </Box>
              <Typography variant="body2">
                <strong>Email:</strong> {account.email}
              </Typography>
              <Typography variant="body2">
                <strong>Password:</strong> {account.password}
              </Typography>
            </Box>
          ))}
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            💡 Tip: Copy email và password để đăng nhập nhanh
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
}
