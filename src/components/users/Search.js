import React, {Component} from 'react'
import PropTypes from "prop-types";

export default class Search extends Component{

    state = {
        text: ''
    }

    static propTypes ={
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        setAlert: PropTypes.func.isRequired,
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit = (e) => {
        e.preventDefault()
        if (this.state.text === ''){
           this.props.setAlert('Please enter something', 'light')
        }else {
            this.props.searchUsers(this.state.text)
            this.setState({text: ''})
        }

    }

    render() {
        const {clearUsers, showClear} = this.props
        return(
            <div>
                <form
                    onSubmit={this.onSubmit}
                    className={'form'}>
                    <input

                        type="text"
                        name={'text'}
                        placeholder={'Search Users...'}
                        value={this.state.text}
                        onChange={this.onChange}
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

}