import React, {useEffect} from 'react'
import './layout.css'
import Sidebar from '../sidebar/Sidebar'
import TopNav from '../topnav/TopNav'
import Routes from '../Routes'
import { BrowserRouter, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setColor, setMode } from '../../redux/themeReducer'
import Login from '../../pages/login/Login'

const Layout = () => {

    const themeReducer = useSelector(state => state.theme)
    const dispatch = useDispatch()

    useEffect(() => {
        const themeClass = localStorage.getItem('themeMode', 'theme-mode-dark');
        const colorClass = localStorage.getItem('themeMode', 'theme-mode-light');

        dispatch(setMode(themeClass));
        dispatch(setColor(colorClass));
    
    }, [dispatch])
    console.log(themeReducer.mode);
    const user = useSelector((state) => state.user.currentUser);

    return (
        <BrowserRouter>
            <Route path="/login">
                <Login/>
            </Route>

            {user !== null && (
                <>
                  <Route render={(props) => (
                <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
                    <Sidebar {...props}/>
                    <div className="layout__content">
                        <TopNav/>
                        <div className="layout__content-main">
                            <Routes />
                        </div>
                    </div>
                </div>
            )}/>
                </>
            )
            }
          
        </BrowserRouter>
    )
}

export default Layout
