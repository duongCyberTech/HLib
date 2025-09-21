import { Container } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../../context';
import {
  ProfileInfo,
  ProfileTabs,
  ProfileCourses,
  ProfileThreads
} from './components';
import { profileTabs } from './constants/profileConstants';

export default function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(profileTabs.COURSES);
  const [userCourses] = useState([]); 
  const [userThreads] = useState([]); 

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
  };

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* User Info Section */}
      <ProfileInfo
        user={user}
        onEditProfile={handleEditProfile}
      />

      {/* Tabs Section */}
      <ProfileTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Tab Content */}
      {activeTab === profileTabs.COURSES && (
        <ProfileCourses courses={userCourses} />
      )}

      {activeTab === profileTabs.THREADS && (
        <ProfileThreads threads={userThreads} />
      )}
    </Container>
  );
}
