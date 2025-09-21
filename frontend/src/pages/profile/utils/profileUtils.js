export const formatUserName = (user) => {
  if (!user) return 'Unknown User';
  
  const fname = user.fname || '';
  const mname = user.mname || '';
  const lname = user.lname || '';
  
  return `${fname} ${mname} ${lname}`.trim();
};

export const getUserInitials = (user) => {
  if (!user) return 'UN';
  
  const fname = user.fname || '';
  const lname = user.lname || '';
  
  return `${fname.charAt(0)}${lname.charAt(0)}`.toUpperCase();
};

export const formatJoinDate = (dateString) => {
  if (!dateString) return 'Unknown';
  
  try {
    return new Date(dateString).toLocaleDateString('vi-VN');
  } catch (error) {
    console.log('Lỗi: ', error)
    return 'Unknown';
  }
};

export const getUserAvatar = (user) => {
  // Note: API trả về 'avata' không phải 'avatar'
  return user?.avata || '/assets/default-avatar.png';
};
