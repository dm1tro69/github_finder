import React, {useState} from 'react'
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

const App = () => {

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [alert, setAlerts] = useState(null);
    const [repos, setRepos] = useState([]);




    // Search Github users
    const searchUsers = async (text) => {
         setLoading(true)
        const res = await github.get(`/search/users?q=${text}`)
        setUsers(res.data.items)
        setLoading(false)

    }

    //Clear users from state
    const clearUsers = () => {
        setLoading(false)
        setUsers([])

    }

    //Set alert
    const setAlert = (msg, type) => {
        setAlerts({msg, type})
        setTimeout(() => setAlerts(null), 5000)
    }

    //Get single Github user
    const getUser = async (username) => {
        setLoading(true)
        const res = await github.get(`/users/${username}`)
        setLoading(false)
        setUser(res.data)

    }

    //Get users repos
    const getUserRepos = async (username) => {
        this.setState({loading: true})
        const res = await github.get(`/users/${username}/repos?per_page=5&sort=created:asc?`)
        setLoading(false)
        setRepos(res.data)

    }




        return(
            <div className={'App'}>
              <Navbar/>
              <div className="container">
                  <Alert alert={alert}/>
                  <Switch>
                      <Route path={'/'} exact render={props => (
                          <React.Fragment>
                              <Search
                                  setAlert={setAlert}
                                  showClear={users.length > 0 ? true: false}
                                  clearUsers={clearUsers}
                                  searchUsers={searchUsers}
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
                              getUser={getUser}
                              user={user}
                              loading={loading}
                              getUserRepos={getUserRepos}
                              repos={repos}
                          />
                      )}/>
                  </Switch>

              </div>

            </div>
        )


}
export default App