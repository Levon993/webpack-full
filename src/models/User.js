 export default class User
{
    constructor(name, age, role ) {
        this._name = name
        this._age = age
        this._role = role
    }
     getUser()
     {
         let age = this._age > 18 ? "adult" : "children"
    const data = {
          name: this._name.toUpperCase(),
          age:age,
          role: this._role
    }
    return data

     }
}

