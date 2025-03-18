import { NavLink,useNavigate } from "react-router-dom";
import useAuth from "../../store/auth-context";
const Header=()=>{

    const navigateTo=useNavigate()
    const {isLoggedIn,handleLogOut}=useAuth()

    const logOut=()=>{
        handleLogOut();
        navigateTo('/',{replace:true});
    }



    return (
        <header >
            <h1 >MyWebLink</h1>
            <nav >
                <ul >
                    <li ><NavLink to='/home'>Home</NavLink></li>

                    <li ><NavLink >Products</NavLink></li>
                    <li ><NavLink >About us</NavLink></li>
                </ul>
                {isLoggedIn && <button onClick={logOut} >Logout</button>}
            </nav>
        </header>
    );

}

export default Header;