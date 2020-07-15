import React, {Component} from 'react'
import './App.css'
import axios from 'axios'
import PropTypes from 'prop-types'
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";

const github = axios.create({
    baseURL: 'https://api.github.com',
    timeout: 1000,
    headers: { Authorization: process.env.REACT_APP_SECRET_NAME }
})

class App extends Component{

    state = {
        users: [],
        loading: false
    }

    static propTypes ={
        searchUsers: PropTypes.func
    }

     // async componentDidMount() {
     //    this.setState({loading: true})
     //   const res = await github.get('/users')
     //     this.setState({users: res.data, loading: false})
     // }

    // Search Github users
    searchUsers = async (text) => {
         this.setState({loading: true})
        const res = await github.get(`/search/users?q=${text}`)
        this.setState({users: res.data.items, loading: false})
    }


    render() {
        return(
            <div className={'App'}>
              <Navbar/>
              <div className="container">
                  <Search searchUsers={this.searchUsers}/>
                  <Users
                      users={this.state.users}
                      loading={this.state.loading}/>
              </div>

            </div>
        )
    }

}
export default App