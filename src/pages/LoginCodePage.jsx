import React, { useState } from 'react';

const LoginCodePage = ({ onNavigateToSignUp, onNavigateToVerificationLogin, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Mock 用户数据
  const mockUsers = [
    { email: 'zhang@example.com', password: '123456', name: '张三' },
    { email: 'li@example.com', password: 'password', name: '李四' },
    { email: 'wang@example.com', password: '888888', name: '王五' },
  ];

  const showAlertMessage = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleLogin = () => {
    // 检查输入是否为空
    if (!email.trim()) {
      showAlertMessage('请输入邮箱');
      return;
    }
    if (!password.trim()) {
      showAlertMessage('请输入密码');
      return;
    }

    // 查找用户
    const user = mockUsers.find(u => u.email === email);

    if (!user) {
      showAlertMessage('该用户不存在，请注册');
      return;
    }

    if (user.password !== password) {
      showAlertMessage('密码错误，请重试');
      return;
    }

    // 登录成功，跳转到聊天页面
    showAlertMessage('登录成功！');
    setTimeout(() => {
      onLoginSuccess({ email: user.email, name: user.name });
    }, 1000);
  };

  const handleRegister = () => {
    onNavigateToSignUp();
  };

  const handleVerificationLogin = () => {
    onNavigateToVerificationLogin();
  };

  // 桌面端适配样式
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#fce4ec',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '20px',
    minWidth: '1200px', // 桌面端最小宽度
  };

  const formContainerStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '50px 60px', // 增加内边距
    boxShadow: '0 8px 32px rgba(233, 30, 99, 0.15)',
    width: '100%',
    maxWidth: '480px', // 增加最大宽度
    minWidth: '400px', // 设置最小宽度
  };

  const titleStyle = {
    fontSize: '28px', // 增大标题字体
    fontWeight: '600',
    color: '#e91e63',
    textAlign: 'center',
    marginBottom: '40px', // 增加底部间距
  };

  const inputGroupStyle = {
    marginBottom: '24px', // 增加间距
  };

  const labelStyle = {
    display: 'block',
    fontSize: '16px', // 增大字体
    fontWeight: '500',
    color: '#424242',
    marginBottom: '10px', // 增加间距
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 18px', // 增加内边距
    border: '1px solid #f8bbd9',
    borderRadius: '10px', // 调整圆角
    fontSize: '16px', // 增大字体
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    boxSizing: 'border-box',
  };

  const inputFocusStyle = {
    borderColor: '#e91e63',
    boxShadow: '0 0 0 3px rgba(233, 30, 99, 0.1)', // 增加阴影
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '15px', // 增加间距
    marginTop: '35px', // 增加顶部间距
  };

  const buttonStyle = {
    flex: 1,
    padding: '14px 28px', // 增加内边距
    borderRadius: '10px',
    border: 'none',
    fontSize: '16px', // 增大字体
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const registerButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#f8bbd9',
    color: '#e91e63',
  };

  const loginButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#e91e63',
    color: '#ffffff',
  };

  const linkStyle = {
    textAlign: 'center',
    marginTop: '20px',
  };

  const linkTextStyle = {
    color: '#e91e63',
    fontSize: '14px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  };

  const alertStyle = {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#ffffff',
    color: '#e91e63',
    padding: '12px 24px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(233, 30, 99, 0.2)',
    border: '1px solid #f8bbd9',
    zIndex: 1000,
    animation: showAlert ? 'slideDown 0.3s ease' : 'slideUp 0.3s ease',
  };

  const Button = ({ style, onClick, children, type = 'button' }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const hoverStyle = type === 'register'
      ? { backgroundColor: '#f48fb1', transform: 'translateY(-1px)' }
      : { backgroundColor: '#c2185b', transform: 'translateY(-1px)' };

    const activeStyle = { transform: 'translateY(0px) scale(0.98)' };

    return (
      <button
        style={{
          ...style,
          ...(isHovered ? hoverStyle : {}),
          ...(isActive ? activeStyle : {}),
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h1 style={titleStyle}>登录</h1>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>邮箱</label>
          <input
            style={inputStyle}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => {
              e.target.style.borderColor = '#f8bbd9';
              e.target.style.boxShadow = 'none';
            }}
            placeholder="请输入邮箱"
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>密码</label>
          <input
            style={inputStyle}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => {
              e.target.style.borderColor = '#f8bbd9';
              e.target.style.boxShadow = 'none';
            }}
            placeholder="请输入密码"
          />
        </div>

        <div style={buttonContainerStyle}>
          <Button
            style={registerButtonStyle}
            onClick={handleRegister}
            type="register"
          >
            注册
          </Button>
          <Button
            style={loginButtonStyle}
            onClick={handleLogin}
            type="login"
          >
            登录
          </Button>
        </div>

        <div style={linkStyle}>
          <a
            style={linkTextStyle}
            onClick={handleVerificationLogin}
            onMouseEnter={(e) => e.target.style.color = '#c2185b'}
            onMouseLeave={(e) => e.target.style.color = '#e91e63'}
          >
            验证码登录
          </a>
        </div>
      </div>

      {/* alert 弹窗 */}
      {showAlert && (
        <div style={alertStyle}>
          {alertMessage}
        </div>
      )}

      <style>
        {`
          @keyframes slideDown {
            from {
              transform: translateX(-50%) translateY(-100%);
              opacity: 0;
            }
            to {
              transform: translateX(-50%) translateY(0);
              opacity: 1;
            }
          }

          @keyframes slideUp {
            from {
              transform: translateX(-50%) translateY(0);
              opacity: 1;
            }
            to {
              transform: translateX(-50%) translateY(-100%);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoginCodePage;
