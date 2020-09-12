class UserInfo {
    constructor(name, profession) {
        this._name = name;
        this._profession = profession;

    }

    getUserInfo() {
        const userData = {};
        userData['name'] = this._name.textContent;
        userData['profession'] = this._profession.textContent;
        return userData;
    }

    setUserInfo(changeProfileName, changeProfileProfession) {
        this._name.textContent = changeProfileName;
        this._profession.textContent = changeProfileProfession;
    }
}

export { UserInfo };