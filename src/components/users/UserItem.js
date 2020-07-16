import React from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";

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
                    <Link
                        className={'btn btn-dark btn-sm my-1'}
                        to={`/user/${login}`}
                    >More
                    </Link>
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