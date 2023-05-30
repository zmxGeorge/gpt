import React from 'react';
import { List } from 'antd';

const ChatSession = ({ messages }) => (
  <List
    dataSource={messages}
    renderItem={message => (
      <List.Item>
        <List.Item.Meta
          title={message.sender}
          description={message.text}
        />
      </List.Item>
    )}
  />
);

export default ChatSession;