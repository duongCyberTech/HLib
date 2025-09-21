export const profileTabs = {
  COURSES: 'courses',
  THREADS: 'threads'
};

export const tabLabels = {
  [profileTabs.COURSES]: 'Your Courses',
  [profileTabs.THREADS]: 'Your Threads'
};

export const defaultUserInfo = {
  department: 'Computer Science',
  joinDate: new Date().toISOString().split('T')[0],
  posts: 0,
  followers: 0,
  following: 0
};
