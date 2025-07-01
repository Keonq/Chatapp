import React, { useState } from 'react';

const SignUpPage = ({ onNavigateToLogin, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    verificationCode: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  // Mock 已存在用户数据
  const existingUsers = [
    { email: 'zhang@example.com', nickname: '张三' },
    { email: 'li@example.com', nickname: '李四' },
    { email: 'wang@example.com', nickname: '王五' },
  ];

  const showAlertMessage = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendCode = () => {
    if (!formData.email.trim()) {
      showAlertMessage('请输入邮箱');
      return;
    }

    if (!validateEmail(formData.email)) {
      showAlertMessage('请输入有效的邮箱地址');
      return;
    }

    // TODO: 此处是发送验证码的函数
    // 模拟发送验证码
    setCodeSent(true);
    showAlertMessage('验证码已发送到您的邮箱');
  };

  const handleRegister = () => {
    // 检查所有字段是否为空
    const requiredFields = [
      { field: 'email', name: '邮箱' },
      { field: 'nickname', name: '昵称' },
      { field: 'password', name: '密码' },
      { field: 'confirmPassword', name: '确认密码' },
      { field: 'verificationCode', name: '验证码' }
    ];

    for (const { field, name } of requiredFields) {
      if (!formData[field].trim()) {
        showAlertMessage(`请输入${name}`);
        return;
      }
    }

    // 验证邮箱格式
    if (!validateEmail(formData.email)) {
      showAlertMessage('请输入有效的邮箱地址');
      return;
    }

    // 检查邮箱是否已存在
    const emailExists = existingUsers.some(user => user.email === formData.email);
    if (emailExists) {
      showAlertMessage('该邮箱已被注册');
      return;
    }

    // 检查昵称是否已存在
    const nicknameExists = existingUsers.some(user => user.nickname === formData.nickname);
    if (nicknameExists) {
      showAlertMessage('该昵称已被使用');
      return;
    }

    // 检查密码长度
    if (formData.password.length < 6) {
      showAlertMessage('密码长度至少6位');
      return;
    }

    // 检查密码确认
    if (formData.password !== formData.confirmPassword) {
      showAlertMessage('两次输入的密码不一致');
      return;
    }

    // 验证验证码（这里简单模拟）
    if (formData.verificationCode !== '123456') {
      showAlertMessage('验证码错误');
      return;
    }

    // TODO: 注册成功的函数
    // 模拟注册成功
    handleRegisterSuccess();
  };

  const handleRegisterSuccess = () => {
    showAlertMessage('注册成功！即将跳转到登录页面');
    setTimeout(() => {
      onRegisterSuccess();
    }, 2000);
  };



  const handleLoginPage = () => {
    onNavigateToLogin();
  };

  // 样式定义
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#fce4ec',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '20px',
  };

  const formContainerStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 8px 32px rgba(233, 30, 99, 0.15)',
    width: '100%',
    maxWidth: '400px',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: '600',
    color: '#e91e63',
    textAlign: 'center',
    marginBottom: '30px',
  };

  const inputGroupStyle = {
    marginBottom: '20px',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#424242',
    marginBottom: '8px',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #f8bbd9',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    boxSizing: 'border-box',
  };

  const inputFocusStyle = {
    borderColor: '#e91e63',
    boxShadow: '0 0 0 2px rgba(233, 30, 99, 0.1)',
  };

  const codeInputContainerStyle = {
    display: 'flex',
    gap: '8px',
    alignItems: 'flex-end',
  };

  const codeInputStyle = {
    ...inputStyle,
    flex: 1,
  };

  const sendCodeButtonStyle = {
    padding: '12px 16px',
    backgroundColor: codeSent ? '#c8e6c9' : '#f8bbd9',
    color: codeSent ? '#4caf50' : '#e91e63',
    border: 'none',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: codeSent ? 'default' : 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s ease',
  };

  const registerButtonStyle = {
    width: '100%',
    padding: '12px 24px',
    backgroundColor: '#e91e63',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: '30px',
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

  const Button = ({ style, onClick, children, disabled = false }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);

    if (disabled) {
      return (
        <button style={style} disabled>
          {children}
        </button>
      );
    }

    const hoverStyle = {
      backgroundColor: '#c2185b',
      transform: 'translateY(-1px)'
    };
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
        <h1 style={titleStyle}>注册</h1>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>邮箱</label>
          <input
            style={inputStyle}
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => {
              e.target.style.borderColor = '#f8bbd9';
              e.target.style.boxShadow = 'none';
            }}
            placeholder="请输入邮箱"
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>昵称</label>
          <input
            style={inputStyle}
            type="text"
            value={formData.nickname}
            onChange={(e) => handleInputChange('nickname', e.target.value)}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => {
              e.target.style.borderColor = '#f8bbd9';
              e.target.style.boxShadow = 'none';
            }}
            placeholder="请输入昵称"
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>密码</label>
          <input
            style={inputStyle}
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => {
              e.target.style.borderColor = '#f8bbd9';
              e.target.style.boxShadow = 'none';
            }}
            placeholder="请输入密码（至少6位）"
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>确认密码</label>
          <input
            style={inputStyle}
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => {
              e.target.style.borderColor = '#f8bbd9';
              e.target.style.boxShadow = 'none';
            }}
            placeholder="请再次输入密码"
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>验证码</label>
          <div style={codeInputContainerStyle}>
            <input
              style={codeInputStyle}
              type="text"
              value={formData.verificationCode}
              onChange={(e) => handleInputChange('verificationCode', e.target.value)}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = '#f8bbd9';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="请输入验证码"
            />
            <button
              style={sendCodeButtonStyle}
              onClick={handleSendCode}
              disabled={codeSent}
            >
              {codeSent ? '已发送' : '发送验证码'}
            </button>
          </div>
        </div>

        <Button
          style={registerButtonStyle}
          onClick={handleRegister}
        >
          注册
        </Button>

        <div style={linkStyle}>
          <a
            style={linkTextStyle}
            onClick={handleLoginPage}
            onMouseEnter={(e) => e.target.style.color = '#c2185b'}
            onMouseLeave={(e) => e.target.style.color = '#e91e63'}
          >
            已有账号？去登录
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

export default SignUpPage;
