import React, { useState } from 'react';

const VideoCallModal = ({ isOpen, onClose, contactName = "好友" }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!isOpen) return null;

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(233, 30, 99, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const modalStyle = {
    width: '90%',
    maxWidth: '600px',
    height: '80%',
    maxHeight: '500px',
    backgroundColor: '#2d2d2d',
    borderRadius: '16px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 20px 40px rgba(233, 30, 99, 0.3)',
  };

  const headerStyle = {
    padding: '20px',
    backgroundColor: '#e91e63',
    color: '#ffffff',
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: '500',
    borderBottom: '1px solid #f8bbd9',
  };

  const videoAreaStyle = {
    flex: 1,
    backgroundColor: '#f8bbd9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    color: '#e91e63',
    fontSize: '16px',
  };

  const controlsStyle = {
    padding: '20px',
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const hangupButtonStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#e91e63',
    color: '#ffffff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    transition: 'all 0.2s ease',
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    boxShadow: '0 4px 12px rgba(233, 30, 99, 0.3)',
  };

  const hangupButtonHoverStyle = {
    backgroundColor: '#c2185b',
    boxShadow: '0 6px 16px rgba(233, 30, 99, 0.4)',
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          与 {contactName} 的视频通话
        </div>

        <div style={videoAreaStyle}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              color: '#e91e63',
            }}>
              📹
            </div>
            <div>视频通话进行中...</div>
          </div>
        </div>

        <div style={controlsStyle}>
          <button
            style={{
              ...hangupButtonStyle,
              ...(isHovered ? hangupButtonHoverStyle : {}),
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClose}
            title="挂断"
          >
            📞
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallModal;
