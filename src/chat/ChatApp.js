import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Input, Row, Col } from 'antd';
import axios from 'axios';
import ChatSession from './ChatSession';
import ChatBar from './ChatBar';
import { PlusOutlined } from '@ant-design/icons';

const { Sider, Content } = Layout;

const ChatApp = () => {
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);

  const handleNewSession = () => {
    const newSession = { id: Date.now(), messages: [] };
    setSessions(prevSessions => [...prevSessions, newSession]);
    setActiveSessionId(newSession.id);
  };

  const handleSend = async (sessionId, messageText) => {
    const newMessage = { sender: 'You', text: messageText };
    setSessions(prevSessions => prevSessions.map(session => {
      if (session.id === sessionId) {
        session.messages.push(newMessage);
      }
      return session;
    }));

    const gptMessage = { sender: 'GPT-3', text: `You said: "${messageText}"` };

    setSessions(prevSessions => prevSessions.map(session => {
      if (session.id === sessionId) {
        session.messages.push(gptMessage);
      }
      return session;
    }));
  };

  const activeSession = sessions.find(session => session.id === activeSessionId);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark" breakpoint="lg" collapsedWidth="0">
        <div style={{display:'block',display:'flex',justifyContent:'stretch'}}>
          <Button onClick={handleNewSession} type='dashed' style={{ backgroundColor: 'transparent', color: '#fff', borderColor: '#fff', margin: 8, width:'100%',boxSizing: 'border-box' }}><PlusOutlined></PlusOutlined> New chat</Button>
        </div>

        <Menu theme="dark" selectedKeys={[activeSessionId]}>
          {sessions.map(session => (
            <Menu.Item key={session.id} onClick={() => setActiveSessionId(session.id)}>
              Session {session.id}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '24px', display: 'flex', flexDirection: 'column', justifyContent:'flex-start',alignItems:'stretch',position:'relative'}}>
          {activeSession && (
            <div style={{ overflowY: 'auto', marginBottom: '16px' }}>
              {/* ...ChatSession的代码... */}
            </div>
          )}
          <div style={{ position:'absolute', bottom: 0,left:0,right:0}}>
            <Row justify="center">
              <Col xs={24} sm={20} md={18} lg={16} xl={14}>
                <ChatBar onSend={message => handleSend(activeSessionId, message)} />
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ChatApp;