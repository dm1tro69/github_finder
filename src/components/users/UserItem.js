import React from 'react'
import PropTypes from 'prop-types'

const UserItem =(props) => {

        const {login, avatar_url, html_url} = props.user
        return(
            <div className={'card text-center'}>
                <img
                    src={avatar_url}
                    alt="img"
                    className={'round-img'}
                    style={{width: '60px'}}
                />
                <h3>{login}</h3>
                <div>
                    <a
                        className={'btn btn-dark btn-sm my-1'}
                        href={html_url}
                    >More
                    </a>
                </div>
            </div>
        )


}

UserItem.propTypes = {
    login: PropTypes.string,
    avatar_url: PropTypes.string,
    html_url: PropTypes.string
}

export default UserItem