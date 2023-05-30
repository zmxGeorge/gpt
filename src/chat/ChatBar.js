import React, { useState } from 'react';
import { Input, Row, Col } from 'antd';

const ChatBar = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    onSend(message);
    setMessage('');
  };

  return (
    <Input.Search
      value={message}
      onChange={e => setMessage(e.target.value)}
      enterButton="Send"
      onSearch={handleSend}
      style={{ marginTop: '16px' }}
    />
  );
};

export default ChatBar;