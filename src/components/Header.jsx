import { Link } from "react-router-dom";
const Header =  () =>{
    return (
        <div className="Header">
            <div className="logo-container">
                <img className="logo" src="https://pnggallery.com/wp-content/uploads/swiggy-logo-01.png" alt="Swiggy Img" />
            </div>
            <div className="nav-items">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li>Cart</li>
                    <li>Login</li>
                </ul>
            </div>

        </div>
    )
};

export default Header;