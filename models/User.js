class User
{
    constructor (name, gender, birth, country, email, password, photo, admin)
    {
        this._name = name
        this._gender = gender
        this._birth = birth
        this._country = country
        this._email = email
        this._password = password
        this._photo = photo
        this._admin = admin
        this._register = new Date
    }

    get name ()
    {
        return this._name
    }

    get gender ()
    {
        return this._gender
    }

    get birth ()
    {
        return this._birth
    }

    get country ()
    {
        return this._country
    }

    get email ()
    {
        return this._email
    }

    get passwd ()
    {
        return this._passwd
    }

    get photo ()
    {
        return this._photo
    }

    get admim ()
    {
        return this._admim
    }

    get register ()
    {
        return this._register
    }

    //

    set photo (value)
    {
        this._photo = value
    }
}
