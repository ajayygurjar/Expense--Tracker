import { NavLink } from "react-router-dom";

const Header=()=>{


    return (
        <header >
            <h1 >MyWebLink</h1>
            <nav >
                <ul >
                    <li ><NavLink to='/home'>Home</NavLink></li>

                    <li ><NavLink >Products</NavLink></li>
                    <li ><NavLink >About us</NavLink></li>
                </ul>
            </nav>
        </header>
    );

}

export default Header;