class UserDto{
    id;
    phone;
    activated;
    createdAt;

    constructor(user){
        this.id = user._id;
        this.phone = user.phone;
        this.activated = user.activated;
        this.createdAt = user.createdAt;
    }
}

export default UserDto;