// 好友页面共享样式
export const friendsStyles = {
    containerStyle: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#fce4ec',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
  
    headerStyle: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #f8bbd9',
      boxShadow: '0 2px 4px rgba(233, 30, 99, 0.1)',
    },
  
    logoStyle: {
      flex: '1',
      width: '40px',
      height: '40px',
      backgroundColor: '#e91e63',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      fontSize: '18px',
      fontWeight: 'bold',
    },
  
    contactInfoStyle: {
      flex: '2',
      display: 'flex',
      alignItems: 'center',
      marginLeft: '16px',
    },
  
    statusDotStyle: (isOnline) => ({
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: isOnline ? '#4caf50' : '#9e9e9e',
      marginLeft: '8px',
    }),
  
    mainContentStyle: {
      flex: 1,
      display: 'flex',
      overflow: 'hidden',
    },
  };
  