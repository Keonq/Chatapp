import React, { useState } from 'react';
import ChatPage from './pages/ChatPage.jsx';
import FriendsPage from './pages/FriendsPage.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('chat');
  const [selectedContact, setSelectedContact] = useState({
    name: "张三",
    isOnline: true,
    avatar: "👨‍💼",
  });

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
        />
      )}
      {currentPage === 'friends' && (
        <FriendsPage
          onNavigateToChat={navigateToChat}
          onSelectFriend={handleSelectFriend}
        />
      )}
    </div>
  );
}

export default App;
