import logo from '@/assets/images/logo/igrovuz-logo-lg.svg';

const Footer = () => {
    return (
        <>
            <div>
                <footer className="main-footer" style={{ backgroundColor: 'white' }}>
                    <div>
                        <img src={logo} alt="AdminLTE Logo" style={{ opacity: '.8' }} />
                    </div>
                    <strong style={{ color: 'black' }}>Copyright © 2014-2021
                        <a href="https://adminlte.io"> AdminLTE.io
                        </a>.
                    </strong >
                    <strong style={{ color: 'black' }}> All rights reserved.</strong>
                    <div className="float-right d-none d-sm-inline-block" style={{ color: 'black' }}>
                        <b>Version</b> 3.2.0
                    </div>
                </footer>
                <aside className="control-sidebar control-sidebar-dark">
                </aside>
            </div>
        </>
    )
}

export default Footer;