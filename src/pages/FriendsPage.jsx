import React, { useState } from 'react';
import NavButton from '../components/NavButton.jsx';
import FriendsList from '../components/FriendsList.jsx';
import FriendDetail from '../components/FriendDetail.jsx';
import { friendsStyles } from '../styles/friendsStyles.js';

const FriendsPage = ({ onNavigateToChat, onSelectFriend, currentUser, onAvatarChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // 创建包含自己的好友列表
  const createFriendsList = () => {
    const selfUser = {
      id: 'self',
      name: currentUser?.name || "我",
      account: currentUser?.email || "current_user",
      avatar: currentUser?.avatar || "1.png",
      signature: "这是我的个性签名",
      isOnline: true,
      isSelf: true,
    };

    const otherFriends = [
      {
        id: 1,
        name: "张三",
        account: "zhangsan001",
        avatar: "2.png",
        signature: "工作使我快乐",
        isOnline: true,
      },
      {
        id: 2,
        name: "李四",
        account: "lisi_dev",
        avatar: "3.png",
        signature: "代码改变世界",
        isOnline: false,
      },
      {
        id: 3,
        name: "王五",
        account: "wangwu2023",
        avatar: "4.png",
        signature: "学习永无止境",
        isOnline: true,
      },
      {
        id: 4,
        name: "赵六",
        account: "zhaoliu_sci",
        avatar: "5.png",
        signature: "探索科学的奥秘",
        isOnline: true,
      },
      {
        id: 5,
        name: "孙七",
        account: "sunqi_art",
        avatar: "6.png",
        signature: "艺术来源于生活",
        isOnline: false,
      },
    ];

    return [selfUser, ...otherFriends];
  };

  const friendsList = createFriendsList();

  const [contactInfo] = useState({
    name: currentUser?.name || "当前用户",
    isOnline: true,
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = friendsList.filter(friend =>
        friend.name.includes(query) ||
        friend.account.includes(query) ||
        friend.signature.includes(query)
      );
      setSearchResults(results);
      setShowSearchResults(true);
      if (results.length === 0) {
        alert('该用户不存在');
      }
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
    }
  };

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
    setShowSearchResults(false);
  };

  const handleNavigateToChat = () => {
    onNavigateToChat();
  };

  const handleRefreshPage = () => {
    window.location.reload();
  };

  const handleSendMessage = () => {
    if (selectedFriend) {
      onSelectFriend(selectedFriend);
    }
  };

  const handleVideoCall = () => {
    console.log('发起视频通话');
  };

  return (
    <div style={friendsStyles.containerStyle}>
      {/* 顶部栏 */}
      <div style={friendsStyles.headerStyle}>
        <div style={friendsStyles.logoStyle}>C</div>
        <div style={friendsStyles.contactInfoStyle}>
          <span style={{ fontSize: '16px', fontWeight: '500', color: '#212529' }}>
            {contactInfo.name}
          </span>
          <div style={friendsStyles.statusDotStyle(contactInfo.isOnline)}></div>
        </div>
        <NavButton
          onClick={handleRefreshPage}
          title="好友列表"
          isActive={true}
        >
          👥
        </NavButton>
        <NavButton
          onClick={handleNavigateToChat}
          title="聊天页面"
        >
          💬
        </NavButton>
      </div>

      {/* 主内容区 */}
      <div style={friendsStyles.mainContentStyle}>
        {/* 左侧面板 - 好友列表 */}
        <FriendsList
          friends={showSearchResults ? searchResults : friendsList}
          selectedFriend={selectedFriend}
          onFriendSelect={handleFriendSelect}
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
        />

        {/* 右侧面板 - 好友详情 */}
        <FriendDetail
          selectedFriend={selectedFriend}
          onSendMessage={handleSendMessage}
          onVideoCall={handleVideoCall}
          onAvatarChange={onAvatarChange}
        />
      </div>
    </div>
  );
};

export default FriendsPage;
