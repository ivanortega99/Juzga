class usr_User{
    constructor(usr_id,usr_username,usr_password,usr_tipo_fk,usr_name,usr_lastname){
        this.usr_id=usr_id;
        this.usr_username=usr_username;
        this.usr_password=usr_password;
        this.usr_tipo_fk=usr_tipo_fk;
        this.usr_name=usr_name;
        this.usr_lastname=usr_lastname;
    }
}

module.exports = usr_User;