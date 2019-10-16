import React from 'react'
import { decorate, observable, action, configure } from 'mobx';


configure({ enforceActions: "observed" });
const defaultPIC = '../assets/profilepicture.png';

class UserStore extends React.Component {

    user = ""
    FBToken = ""
    PhotoURI = ""

    changePhotoURI = val => {
        this.PhotoURI = val
    }

    insertUser = val => {
        this.user = val
        console.log(this.user)
    }


    
}
decorate(UserStore, {
    user: observable,
    insertUser: action,
    FBToken: observable,
    PhotoURI: observable,
    changePhotoURI: action
});

export default new UserStore();