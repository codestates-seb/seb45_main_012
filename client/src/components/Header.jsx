import "../styles/components/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faRightFromBracket, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { createStore } from 'redux';

const Header = () => {

    // 로그인 여부에 따라 달라지는 상태)
    // function logIn(state = false, action) {
    //     switch (action.type) {
    //         case 'LOGIN':
    //             return state 
    //     }
    // }

    return (
        <>
        <div className="header_container">
            <div className="header_bar">
                <ul className="header_bar_list">
                    <li className="header_item lgoo">
                        <img src={require("../assets/logo.png")} alt="logo" />
                    </li>
                    <li className="header_item black">
                        <FontAwesomeIcon icon={faPencil} />
                    </li>
                    <li className="header_item black">
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </li>
                </ul>
            </div>
        </div>
        <div className="header_container">
            <div className="header_bar">
                <ul className="header_bar_list">
                    <li className="header_item logo">
                        <img src={require("../assets/logo.png")} alt="logo" />
                    </li>
                    <li className="header_item search">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </li>
                    <li className="header_item black">
                        <img src={require("../assets/user_shadow.png")} className="white" width="70" alt="user profile" />
                    </li>
                    <li className="header_item black">
                        <FontAwesomeIcon icon={faPencil} className="header_icon" />
                    </li>
                    <li className="header_item black">
                        <FontAwesomeIcon icon={faRightFromBracket} className="header_icon" />
                    </li>
                </ul>
            </div>
        </div>
        /</>
    )
}

export default Header;