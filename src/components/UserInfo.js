class UserInfo {
    constructor(name, profession, avatar) {
        this._name = name;
        this._profession = profession;
        this._avatar = avatar;
        this._id = null;
    }

    setId(id) {
        this._id = id;
    }

    getId() {
        return this._id;
    }

    getUserInfo() {
        const userData = {};
        userData["name"] = this._name.textContent;
        userData["profession"] = this._profession.textContent;
        userData["avatar"] = this._avatar.src;
        return userData;
    }

    setUserInfo(changeProfileName, changeProfileProfession) {
        this._name.textContent = changeProfileName;
        this._profession.textContent = changeProfileProfession;
    }

    setUserAvatar(changeProfileAvatar) {
        this._avatar.src = changeProfileAvatar;
    }
}

export { UserInfo };
