import {
  Box,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import { profileTabs, tabLabels } from '../constants/profileConstants';

export default function ProfileTabs({ activeTab, onTabChange }) {
  const handleChange = (event, newValue) => {
    onTabChange(newValue);
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        mb: 3,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Tabs
        value={activeTab}
        onChange={handleChange}
        sx={{
          '& .MuiTabs-indicator': {
            height: 3,
            borderRadius: '3px 3px 0 0'
          },
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '1rem',
            minHeight: 56,
            '&.Mui-selected': {
              fontWeight: 600
            }
          }
        }}
      >
        <Tab 
          label={tabLabels[profileTabs.COURSES]} 
          value={profileTabs.COURSES} 
        />
        <Tab 
          label={tabLabels[profileTabs.THREADS]} 
          value={profileTabs.THREADS} 
        />
      </Tabs>
    </Paper>
  );
}
