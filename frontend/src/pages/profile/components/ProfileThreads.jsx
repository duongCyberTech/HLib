import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Avatar
} from '@mui/material';
import { Forum as ForumIcon, Add as AddIcon } from '@mui/icons-material';

export default function ProfileThreads({ threads = [], loading = false }) {
  if (loading) {
    return (
      <Card elevation={1} sx={{ borderRadius: 2 }}>
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            Loading threads...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (threads.length === 0) {
    return (
      <Card elevation={1} sx={{ borderRadius: 2 }}>
        <CardContent sx={{ textAlign: 'center', py: 6 }}>
          <ForumIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No Threads Yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            You haven't created any discussion threads yet. Start a conversation!
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ borderRadius: 2, textTransform: 'none' }}
          >
            Create Thread
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Grid container spacing={3}>
      {threads.map((thread, index) => (
        <Grid item xs={12} key={thread.id || index}>
          <Card 
            elevation={1} 
            sx={{ 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              transition: 'all 0.2s ease',
              '&:hover': {
                boxShadow: 2,
                borderColor: 'primary.main'
              }
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="flex-start" gap={2}>
                <Avatar sx={{ width: 40, height: 40 }}>
                  {thread.author?.charAt(0) || 'U'}
                </Avatar>
                <Box flexGrow={1}>
                  <Typography variant="h6" gutterBottom>
                    {thread.title || 'Thread Title'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {thread.content || 'Thread content preview...'}
                  </Typography>
                  <Box display="flex" gap={1} alignItems="center" flexWrap="wrap">
                    <Chip 
                      label={`${thread.replies || 0} replies`} 
                      size="small" 
                      variant="outlined"
                    />
                    <Chip 
                      label={thread.category || 'General'} 
                      size="small" 
                      color="primary"
                      variant="outlined"
                    />
                    <Typography variant="caption" color="text.secondary">
                      {thread.createdAt || 'Recently'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
