class UserController
{
    constructor (formID, tableID)
    {
        this.formEl = document.getElementById (formID)
        this.tableEl = document.getElementById (tableID)

        this.submitListener()
    }

    submitListener ()
    {
        this.formEl.addEventListener ('submit', event => {

            event.preventDefault()

            let fields = this.getFields ()

            this.getPhoto ().then ( photoContent => {

                fields.photo = photoContent
                this.addLine (fields)

            }, errors => console.error ( errors ) )
        })

    } // submitListener

    getPhoto ()
    {
        return new Promise ( (resolve, reject) => {

            let fileReader = new FileReader ()

            let photoElement = [...this.formEl.elements].filter (item => item.name === 'photo')
    
            let photo = photoElement [0].files [0]
    
            fileReader.onload = () => resolve (fileReader.result)

            fileReader.onerror  = error => reject ( error )
    
            fileReader.readAsDataURL (photo)

        } )
    }

    getFields ()
    {
        let user = {} ;

        [...this.formEl.elements].forEach ( (field, index) => {

            if (field.name == "gender")
            {
                if (field.checked) user[field.name] = field.value
            }
            else
            {
                user[field.name] = field.value
            }
        } )
    
        return new User (
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
        )

    } // getFields

    addLine (userData)
    {
        this.tableEl.innerHTML = `<tr>

            <td><img src="${ userData.photo }" alt="User Image" class="img-circle img-sm"></td>
            <td>${ userData.name }</td>
            <td>${ userData.email }</td>
            <td>${ userData.admin }</td>
            <td>${ userData.birth }</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        </tr>`

    } // addLine
}