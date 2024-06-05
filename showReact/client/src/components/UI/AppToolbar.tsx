import { Header } from 'antd/es/layout/layout';

export function AppToolbar() {
  
  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className="demo-logo" style={{ color: 'white' }}>
        Show Game
      </div>
    </Header>
  );
}
