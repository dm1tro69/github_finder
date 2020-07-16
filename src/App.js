import React, {Component} from 'react'
import './App.css'
import axios from 'axios'
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import {Switch, Route} from 'react-router-dom'
import About from "./components/pages/About";
import User from "./components/users/User";

const github = axios.create({
    baseURL: 'https://api.github.com',
    timeout: 1000,
    headers: { Authorization: process.env.REACT_APP_SECRET_NAME }
})

class App extends Component{

    state = {
        users: [],
        user: {},
        loading: false,
        alert: null,
        repos: []
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

    //Clear users from state
    clearUsers = () => {
       this.setState({users: [], loading: false})
    }

    //Set alert
    setAlert = (msg, type) => {
        this.setState({alert: {msg, type}})
        setTimeout(() => this.setState({alert: null}), 5000)
    }

    //Get single Github user
    getUser = async (username) => {
        this.setState({loading: true})
        const res = await github.get(`/users/${username}`)
        this.setState({user: res.data, loading: false})
    }

    //Get users repos
    getUserRepos = async (username) => {
        this.setState({loading: true})
        const res = await github.get(`/users/${username}/repos?per_page=5&sort=created:asc?`)
        this.setState({repos: res.data, loading: false})
    }


    render() {
        const {users, user, loading, repos} = this.state
        return(
            <div className={'App'}>
              <Navbar/>
              <div className="container">
                  <Alert alert={this.state.alert}/>
                  <Switch>
                      <Route path={'/'} exact render={props => (
                          <React.Fragment>
                              <Search
                                  setAlert={this.setAlert}
                                  showClear={users.length > 0 ? true: false}
                                  clearUsers={this.clearUsers}
                                  searchUsers={this.searchUsers}
                              />
                              <Users
                                  users={users}
                                  loading={loading}/>
                          </React.Fragment>
                      )}/>
                      <Route path={'/about'} component={About}/>
                      <Route path={'/user/:login'} render={props => (
                          <User
                              {...props}
                              getUser={this.getUser}
                              user={user}
                              loading={loading}
                              getUserRepos={this.getUserRepos}
                              repos={repos}
                          />
                      )}/>
                  </Switch>

              </div>

            </div>
        )
    }

}
export default App