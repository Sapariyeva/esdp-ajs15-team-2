import { Breadcrumb, Layout, theme } from 'antd';
import { AppToolbar } from './components/UI/AppToolbar';
import { Route, Routes } from 'react-router-dom';
import { Cards } from './containers/Cards';

const { Content, Footer } = Layout;

const layoutStyle = {
  overflow: 'hidden',
  width: '100%',
};

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={layoutStyle}>
      <AppToolbar />
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
        <Routes>
          <Route path="/" element={<Cards/>} />
        </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default App;
