import React, { useState } from 'react';

const ChatListPage = ({ isVisible, onClose, onSwitchChat }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Mock 数据
  const chatList = [
    {
      id: 1,
      name: "张三",
      lastMessage: "你好，今天天气真不错呢！你在做什么？",
      timestamp: "14:30",
      avatar: "👨‍💼",
      unreadCount: 2,
    },
    {
      id: 2,
      name: "李四",
      lastMessage: "会议资料我已经准备好了，明天见",
      timestamp: "12:15",
      avatar: "👩‍💻",
      unreadCount: 0,
    },
    {
      id: 3,
      name: "王五",
      lastMessage: "周末一起去看电影吧！",
      timestamp: "昨天",
      avatar: "👨‍🎓",
      unreadCount: 1,
    },
    {
      id: 4,
      name: "赵六",
      lastMessage: "项目进度如何了？需要帮助吗",
      timestamp: "昨天",
      avatar: "👩‍🔬",
      unreadCount: 0,
    },
    {
      id: 5,
      name: "孙七",
      lastMessage: "谢谢你的帮助！",
      timestamp: "周二",
      avatar: "👨‍🎨",
      unreadCount: 0,
    },
  ];

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(233, 30, 99, 0.3)',
    display: isVisible ? 'block' : 'none',
    zIndex: 999,
  };

  const containerStyle = {
    position: 'fixed',
    top: 0,
    right: isVisible ? 0 : '-320px',
    width: '320px',
    height: '100vh',
    backgroundColor: '#ffffff',
    boxShadow: '-4px 0 20px rgba(233, 30, 99, 0.2)',
    transition: 'right 0.3s ease-in-out',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
  };

  const headerStyle = {
    padding: '16px 20px',
    backgroundColor: '#e91e63',
    color: '#ffffff',
    fontSize: '18px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease',
  };

  const listStyle = {
    flex: 1,
    overflowY: 'auto',
    padding: '8px 0',
  };

  const chatItemStyle = {
    display: 'flex',
    padding: '12px 20px',
    cursor: 'pointer',
    borderBottom: '1px solid #fce4ec',
    transition: 'background-color 0.2s ease',
  };

  const chatItemHoverStyle = {
    backgroundColor: '#fce4ec',
  };

  const avatarStyle = {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#f8bbd9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    marginRight: '12px',
    flexShrink: 0,
  };

  const contentStyle = {
    flex: 1,
    minWidth: 0,
  };

  const nameRowStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '4px',
  };

  const nameStyle = {
    fontSize: '15px',
    fontWeight: '500',
    color: '#212529',
  };

  const timestampStyle = {
    fontSize: '12px',
    color: '#ad7a99',
  };

  const messageStyle = {
    fontSize: '13px',
    color: '#ad7a99',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginBottom: '2px',
  };

  const unreadBadgeStyle = {
    minWidth: '18px',
    height: '18px',
    borderRadius: '9px',
    backgroundColor: '#e91e63',
    color: '#ffffff',
    fontSize: '11px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '8px',
    fontWeight: '500',
  };

  const truncateMessage = (message, maxLength = 30) => {
    return message.length > maxLength ? message.substring(0, maxLength) + '...' : message;
  };

  const handleChatClick = (chat) => {
    onSwitchChat(chat.id, chat.name);
  };

  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div style={containerStyle}>
        <div style={headerStyle}>
          <span>最近消息</span>
          <button
            style={closeButtonStyle}
            onClick={onClose}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            ✕
          </button>
        </div>

        <div style={listStyle}>
          {chatList.map((chat, index) => (
            <div
              key={chat.id}
              style={{
                ...chatItemStyle,
                ...(hoveredIndex === index ? chatItemHoverStyle : {}),
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleChatClick(chat)}
            >
              <div style={avatarStyle}>
                {chat.avatar}
              </div>
              <div style={contentStyle}>
                <div style={nameRowStyle}>
                  <span style={nameStyle}>{chat.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={timestampStyle}>{chat.timestamp}</span>
                    {chat.unreadCount > 0 && (
                      <div style={unreadBadgeStyle}>
                        {chat.unreadCount}
                      </div>
                    )}
                  </div>
                </div>
                <div style={messageStyle}>
                  {truncateMessage(chat.lastMessage)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatListPage;
