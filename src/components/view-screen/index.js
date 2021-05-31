import React, {useState, useRef} from 'react';
import gitIcon from "../../assets/gitIcon.png";
import UserScreen from "./user-info";


async function getUserData(username, setUserInfo) {
    console.log(username)
    let url_user = `https://api.github.com/users/${username}`;
    let response_user = await fetch(url_user);
    let url_repo = `https://api.github.com/users/${username}/repos`;
    let response_repo = await fetch(url_repo);
    setUserInfo({
        user: await response_user.json(),
        repos: await response_repo.json()
    })
}


export default function ViewScreen() {

    const inputEl = useRef(null);
    let inputValue = '';
    const [data, setData] = useState({
        user: '',
        repos: ''
    })


    return (
        <div className="app_container_main">
            <div className="search-tab_container">
                <img src={gitIcon} alt='Github logo' className='search-tab_logo'/>
                <form className='search-tab_input-container'
                      onSubmit={(e) => {
                          e.preventDefault()
                          getUserData(inputValue, setData).then(() => {
                              }
                          )
                          inputEl.current.value = ''
                      }}>
                    <input ref={inputEl} type='text' className='search-tab_input' placeholder='Enter GitHub username'
                           onChange={e => inputValue = e.target.value}
                    />
                </form>
            </div>
            <div>
                <UserScreen userInfo={data}/>
            </div>
        </div>
    );
}

