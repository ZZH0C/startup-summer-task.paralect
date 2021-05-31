import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../../../assets/search-icon-big.png'
import humanIcon from '../../../assets/human-icon.png'
import followers from '../../../assets/followers-icon.png'
import following from '../../../assets/following-icon.png'
import {UserRepos} from "./user-info_repo";

export function UserScreen(props) {
    const [loaderStyle, setLoaderStyle] = useState('loader-background hidden')
    const [viewScreenContent, setViewScreenContent] = useState('')


    useEffect(() => {

        if (props.userInfo.user.message === 'Not Found' || !props) {
            setViewScreenContent(
                <div className='view-screen_about'>
                    <img
                        alt='Human icon'
                        src={humanIcon}
                        onLoad={() => setLoaderStyle('loader-background hidden')}
                    />
                    <span>User not found</span>
                </div>
            )
        } else {
            setViewScreenContent(
                <div className='view-screen_user-info_container'>
                    <div className='view-screen_user-info_profile'>
                        <img
                            className='view-screen_user-info_profile-image'
                            alt='Profile avatar'
                            src={props.userInfo.user.avatar_url}
                            onLoad={() => setLoaderStyle('loader-background hidden')}
                        />
                        <span className='view-screen_user-info_profile_text-name'>
                            {props.userInfo.user.name}
                        </span>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={props.userInfo.user.html_url} className='view-screen_user-info_profile_text-link'>
                            {props.userInfo.user.login}
                        </a>
                        <div className='view-screen_user-info_profile_followers'>
                            <div>
                                <img alt='followers' src={followers}/>
                                <span>
                                    {props.userInfo.user.followers} followers
                                </span>
                            </div>
                            <div>
                                <img alt='following' src={following}/>
                                <span>
                                    {props.userInfo.user.following} following
                                </span>
                            </div>
                        </div>
                    </div>
                    <UserRepos repos={props.userInfo.repos}/>
                </div>
            )
        }
        setLoaderStyle('loader-background')
    }, [props])

    useEffect(() => {
        setViewScreenContent(
            <div className='view-screen_about'>
                <img
                    alt='Search icon'
                    src={searchIcon}
                    onLoad={() => setLoaderStyle('loader-background hidden')}
                />
                <span>Start with searching a GitHub user</span>
            </div>
        )
        setLoaderStyle('loader-background hidden')
    }, [])


    return (
        <div className="view-screen_container">
            <div className={loaderStyle}>
                <div className="lds-dual-ring">
                </div>
            </div>
            {viewScreenContent}
        </div>
    );
}


UserScreen.propTypes = PropTypes.any.isRequired;

export default UserScreen;
