import React, { useState, useRef, useEffect } from 'react';
import ChatBubble from '../components/ChatBubble.jsx';
import ChatInputBar from '../components/ChatInputBar.jsx';
import ChatListPage from '../components/ChatListPage.jsx';
import VideoCallModal from '../components/VideoCallModal.jsx';

const ChatPage = ({ onNavigateToFriends, currentUser }) => {
  // 模拟不同用户的聊天数据
  const [allChats] = useState({
    1: [
      { id: 1, text: "你好！今天天气不错呢", isOwn: false, timestamp: "14:20", avatar: "2.png" },
      { id: 2, text: "是的，很适合出去走走", isOwn: true, timestamp: "14:21", avatar: currentUser?.avatar || "1.png" },
      { id: 3, text: "周末有什么计划吗？", isOwn: false, timestamp: "14:22", avatar: "2.png" },
      { id: 4, text: "想去公园拍照，你要一起来吗？", isOwn: true, timestamp: "14:23", avatar: currentUser?.avatar || "1.png" },
    ],
    2: [
      { id: 1, text: "会议资料我已经准备好了", isOwn: false, timestamp: "12:15", avatar: "3.png" },
      { id: 2, text: "太好了，明天见！", isOwn: true, timestamp: "12:16", avatar: currentUser?.avatar || "1.png" },
    ],
    3: [
      { id: 1, text: "周末一起去看电影吧！", isOwn: false, timestamp: "昨天", avatar: "4.png" },
      { id: 2, text: "好的，看什么电影？", isOwn: true, timestamp: "昨天", avatar: currentUser?.avatar || "1.png" },
    ],
  });

  const [currentChatId, setCurrentChatId] = useState(1);
  const [messages, setMessages] = useState(allChats[currentChatId]);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [isChatListOpen, setIsChatListOpen] = useState(false);

  const [contactInfo, setContactInfo] = useState({
    name: "张三",
    isOnline: true,
  });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages(allChats[currentChatId] || []);
    // 根据聊天ID更新联系人信息
    const contacts = {
      1: { name: "张三", isOnline: true },
      2: { name: "李四", isOnline: false },
      3: { name: "王五", isOnline: true },
    };
    setContactInfo(contacts[currentChatId] || { name: "未知用户", isOnline: false });
  }, [currentChatId, allChats]);

  const handleSendMessage = (messageText) => {
    const newMessage = {
      id: Date.now(),
      text: messageText,
      isOwn: true,
      timestamp: new Date().toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      avatar: currentUser?.avatar || "1.png"
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleVideoCall = () => {
    setIsVideoCallOpen(true);
  };

  const handleSendImage = () => {
    const imageMessage = {
      id: Date.now(),
      text: "📷 [图片]",
      isOwn: true,
      timestamp: new Date().toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      avatar: currentUser?.avatar || "1.png"
    };
    setMessages(prev => [...prev, imageMessage]);
  };

  const handleSendVoice = () => {
    console.log('发送语音功能暂未实现');
  };

  const handleNavigateToFriends = () => {
    onNavigateToFriends();
  };

  const handleRefreshChat = () => {
    window.location.reload();
  };

  const handleSwitchChat = (chatId) => {
    setCurrentChatId(chatId);
    setIsChatListOpen(false);
  };

  // 电脑端适配：水平布局容器
  const containerStyle = {
    display: 'flex',
    flexDirection: 'row', // 水平布局
    height: '100vh',
    backgroundColor: '#fce4ec',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    minWidth: '1200px', // 桌面端最小宽度
    width: '100vw',
    boxSizing: 'border-box',
  };

  // 左侧主聊天区域
  const leftPanelStyle = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    minWidth: '600px',
    maxWidth: 'calc(100vw - 350px)', // 减去右侧面板宽度
  };

  // 右侧ChatList面板
  const rightPanelStyle = {
    width: '350px',
    backgroundColor: '#ffffff',
    borderLeft: '1px solid #f8bbd9',
    display: isChatListOpen ? 'flex' : 'none',
    flexDirection: 'column',
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 20px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #f8bbd9',
    boxShadow: '0 2px 4px rgba(233, 30, 99, 0.1)',
    minHeight: '70px',
  };

  const logoStyle = {
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
    marginRight: '16px',
  };

  const contactInfoStyle = {
    flex: '1',
    display: 'flex',
    alignItems: 'center',
  };

  const statusDotStyle = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: contactInfo.isOnline ? '#4caf50' : '#9e9e9e',
    marginLeft: '8px',
  };

  const navButtonStyle = {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'all 0.2s ease',
    margin: '0 4px',
  };

  // 聊天区域样式
  const chatAreaStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    padding: '0 20px',
  };

  const messagesScrollStyle = {
    flex: 1,
    overflowY: 'auto',
    padding: '16px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  // ChatList切换按钮
  const chatListToggleStyle = {
    position: 'fixed',
    right: isChatListOpen ? '360px' : '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '50px',
    height: '50px',
    backgroundColor: '#e91e63',
    borderRadius: '25px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(233, 30, 99, 0.3)',
    transition: 'all 0.3s ease',
    zIndex: 100,
    color: '#ffffff',
    fontSize: '18px',
  };

  const NavButton = ({ onClick, children, title, isActive = false }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <button
        style={{
          ...navButtonStyle,
          backgroundColor: isActive
            ? '#fce4ec'
            : isHovered
              ? '#f8bbd9'
              : 'transparent',
          color: isActive ? '#e91e63' : '#424242',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        title={title}
      >
        {children}
      </button>
    );
  };



  return (
    <div style={containerStyle}>
      {/* 左侧主聊天区域 */}
      <div style={leftPanelStyle}>
        {/* 顶部栏 */}
        <div style={headerStyle}>
          <div style={logoStyle}>C</div>
          <div style={contactInfoStyle}>
            <span style={{ fontSize: '16px', fontWeight: '500', color: '#212529' }}>
              {contactInfo.name}
            </span>
            <div style={statusDotStyle}></div>
          </div>
          <NavButton onClick={handleNavigateToFriends} title="好友列表">
            👥
          </NavButton>
          <NavButton onClick={handleRefreshChat} title="刷新聊天" isActive={true}>
            💬
          </NavButton>
        </div>

        {/* 聊天区域 */}
        <div style={chatAreaStyle}>
          <div style={messagesScrollStyle}>
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                message={message.text}
                isOwn={message.isOwn}
                timestamp={message.timestamp}
                avatar={message.avatar}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          <ChatInputBar
            onSendMessage={handleSendMessage}
            onVideoCall={handleVideoCall}
            onSendImage={handleSendImage}
            onSendVoice={handleSendVoice}
          />
        </div>
      </div>

      {/* 右侧ChatList面板 */}
      <div style={rightPanelStyle}>
        <ChatListPage
          isVisible={true}
          onClose={() => setIsChatListOpen(false)}
          onSwitchChat={handleSwitchChat}
        />
      </div>

      {/* ChatList切换按钮 */}
      <button
        style={chatListToggleStyle}
        onClick={() => setIsChatListOpen(!isChatListOpen)}
        title={isChatListOpen ? "关闭消息列表" : "打开消息列表"}
      >
        {isChatListOpen ? '❯' : '❮'}
      </button>

      {/* 视频通话弹窗 */}
      <VideoCallModal
        isOpen={isVideoCallOpen}
        onClose={() => setIsVideoCallOpen(false)}
        contactName={contactInfo.name}
      />
    </div>
  );
};

export default ChatPage;
