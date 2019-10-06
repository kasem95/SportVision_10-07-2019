import React from 'react'
import { decorate, observable, action, configure } from 'mobx';


configure({ enforceActions: "observed" });

class UserStore extends React.Component {

    user = ""
    FBToken = ""


    insertUser = val => {
        this.user = val
        console.log(this.user)
    }


    
}
decorate(UserStore, {
    user: observable,
    insertUser: action,
    FBToken: observable
});

export default new UserStore();