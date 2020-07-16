import React, {useState} from 'react'
import PropTypes from "prop-types";

const Search =({clearUsers, showClear, searchUsers, setAlert}) =>{

    const [text, setText] = useState('')

    const onChange = (e) => {
        setText(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if (text === ''){
           setAlert('Please enter something', 'light')
        }else {
            searchUsers(text)
            setText('')
        }

    }



        return(
            <div>
                <form
                    onSubmit={onSubmit}
                    className={'form'}>
                    <input

                        type="text"
                        name={'text'}
                        placeholder={'Search Users...'}
                        value={text}
                        onChange={onChange}
                    />
                    <input
                        className={'btn btn-dark btn-block'}
                        type="submit"
                        value={'Search'}/>
                </form>
                {showClear ? <button
                    onClick={clearUsers}
                    className={'btn btn-light btn-block'}
                >Clear</button> : null}


            </div>
        )


}
export default Search
Search.propTypes ={
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
}