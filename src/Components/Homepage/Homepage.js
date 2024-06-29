import React, { useState } from 'react';
import {
  NotificationOutlined,
  UserOutlined,
  QuestionCircleOutlined,
  InfoCircleOutlined,
  CalendarOutlined,
  LogoutOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Popconfirm, Button, Form, Input, DatePicker, List, Modal, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const { Header, Content, Sider } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Homepage = () => {
  const navigate = useNavigate();

  
  const themeColor = '#FFB6C1'; 

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [isRoutineModalVisible, setIsRoutineModalVisible] = useState(false);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/Profile');
  };

  const handleCalendar = () => {
    navigate('/Calendar');
  };

  const handleAddTodo = (values) => {
    const { title, dateTimeRange } = values;
    const [startDateTime, endDateTime] = dateTimeRange;
    const newTodo = {
      title,
      startDate: startDateTime.format('YYYY-MM-DD HH:mm'),
      endDate: endDateTime.format('YYYY-MM-DD HH:mm'),
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleAddRoutineTask = (values) => {
    const { title, dayOfWeek, timeRange } = values;
    const [startTime, endTime] = timeRange;
    const newRoutineTodo = {
      title,
      routine: true,
      dayOfWeek,
      startTime: startTime.format('HH:mm'),
      endTime: endTime.format('HH:mm'),
    };
    const updatedTodos = [...todos, newRoutineTodo];
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setIsRoutineModalVisible(false);
  };

  const onRangePickerChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };

  return (
    <Layout>
      <Header style={{ background: themeColor, padding: 0 }}>
        <div className="demo-logo" />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: themeColor }}>
          <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%', borderRight: 0 }}>
            <Menu.SubMenu key="sub1" icon={<IdcardOutlined />} title="My Account">
              <Menu.Item key="1" icon={<UserOutlined />} onClick={handleProfile}>
                Profile
              </Menu.Item>
              <Menu.Item key="2" icon={<LogoutOutlined />}>
                <Popconfirm
                  title="Confirm Logout"
                  description="Are you sure you want to logout?"
                  onConfirm={handleLogout}
                  okText="Yes"
                  cancelText="No"
                >
                  Logout
                </Popconfirm>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="sub2" icon={<CalendarOutlined />} title="Scheduler">
              <Menu.Item key="5" onClick={handleCalendar}>Calendar</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="sub3" icon={<NotificationOutlined />} title="Support">
              <Menu.Item key="9" icon={<QuestionCircleOutlined />}>Contact</Menu.Item>
              <Menu.Item key="10" icon={<InfoCircleOutlined />}>Help</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              marginTop: 15,
              minHeight: 280,
              background: '#fff', 
              borderRadius: '8px', 
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', 
            }}
          >
            <Form onFinish={handleAddTodo}>
              <Form.Item
                name="title"
                rules={[{ required: true, message: 'Please input the title!' }]}
              >
                <Input placeholder="Title" />
              </Form.Item>
              <Form.Item
                name="dateTimeRange"
                rules={[{ required: true, message: 'Please select the date and time range!' }]}
              >
                <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  onChange={onRangePickerChange}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Add To-Do
                </Button>
                <Button type="dashed" onClick={() => setIsRoutineModalVisible(true)} style={{ marginLeft: '10px' }}>
                  Add Routine Task
                </Button>
              </Form.Item>
            </Form>
            <List
              header={<div>To-Do List</div>}
              bordered
              dataSource={todos}
              renderItem={(item, index) => (
                <List.Item
                  actions={[
                    <Button type="danger" onClick={() => handleDeleteTodo(index)}>
                      Delete
                    </Button>,
                  ]}
                >
                  {item.title} - {item.routine ? `${item.startTime} - ${item.endTime}` : `${moment(item.startDate).format('HH:mm')} to ${moment(item.endDate).format('HH:mm')}`}
                </List.Item>
              )}
            />
          </Content>
        </Layout>
      </Layout>
      <Modal
        title="Add Routine Task"
        visible={isRoutineModalVisible}
        onCancel={() => setIsRoutineModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleAddRoutineTask}>
          <Form.Item name="title" rules={[{ required: true, message: 'Please input the title!' }]}>
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item name="dayOfWeek" rules={[{ required: true, message: 'Please select the day of the week!' }]}>
            <Select placeholder="Select Day of the Week">
              <Option value="Monday">Monday</Option>
              <Option value="Tuesday">Tuesday</Option>
              <Option value="Wednesday">Wednesday</Option>
              <Option value="Thursday">Thursday</Option>
              <Option value="Friday">Friday</Option>
              <Option value="Saturday">Saturday</Option>
              <Option value="Sunday">Sunday</Option>
            </Select>
          </Form.Item>
          <Form.Item name="timeRange" rules={[{ required: true, message: 'Please select the time range!' }]}>
            <RangePicker
              picker="time"
              format="HH:mm"
              onChange={onRangePickerChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Routine Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Homepage;
