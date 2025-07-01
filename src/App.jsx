import React, { useState, useEffect } from 'react';
import ChatPage from './pages/ChatPage.jsx';
import FriendsPage from './pages/FriendsPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginCodePage from './pages/LoginCodePage.jsx';
import LoginVcodePage from './pages/LoginVcodePage.jsx';

// App主组件，负责全局状态管理
function App() {
  // 从localStorage读取currentUser，若无则用默认值
  const getInitialUser = () => {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return { name: '我', email: 'current_user', avatar: '1.png' };
      }
    }
    return { name: '我', email: 'current_user', avatar: '1.png' };
  };

  const [currentUser, setCurrentUser] = useState(getInitialUser());
  const [currentPage, setCurrentPage] = useState('chat');
  const [selectedContact, setSelectedContact] = useState({
    name: '张三',
    isOnline: true,
    avatar: '👨‍💼',
  });

  // 头像变更时，写入localStorage并刷新页面
  const handleAvatarChange = (newAvatar) => {
    const updatedUser = { ...currentUser, avatar: newAvatar };
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    // 刷新页面以同步所有头像显示
    window.location.reload();
  };

  const navigateToChat = () => {
    setCurrentPage('chat');
  };

  const navigateToFriends = () => {
    setCurrentPage('friends');
  };

  const handleSelectFriend = (friend) => {
    setSelectedContact({
      name: friend.name,
      isOnline: friend.isOnline,
      avatar: friend.avatar,
    });
  };

  return (
    <div>
      {currentPage === 'chat' && (
        <ChatPage
          onNavigateToFriends={navigateToFriends}
          selectedContact={selectedContact}
          currentUser={currentUser} // 传递currentUser
        />
      )}
      {currentPage === 'friends' && (
        <FriendsPage
          onNavigateToChat={navigateToChat}
          onSelectFriend={handleSelectFriend}
          currentUser={currentUser} // 传递currentUser
          onAvatarChange={handleAvatarChange} // 传递头像变更回调
        />
      )}
    </div>
  );
}

export default App;
