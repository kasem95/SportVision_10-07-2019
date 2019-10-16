export default class User{
    constructor(userID,email,password,userName,isInGame,MatchID,points,imageURL){
        this.userID = userID
        this.email = email
        this.password = password
        this.username = userName
        this.isInGame = isInGame
        this.MatchID = MatchID
        this.points = points
        this.imageURL = imageURL
    }

}