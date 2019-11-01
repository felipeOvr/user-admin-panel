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

            const btnSubmit = this.formEl.querySelector ( '[type=submit]' )

            btnSubmit.disabled = true

            let fields = this.getFields ()

            this.getPhoto ().then ( photoContent => {

                fields.photo = photoContent
                this.addLine (fields)

                this.formEl.reset ()

                btnSubmit.disabled = false

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

            if ( photo )
            {
                fileReader.readAsDataURL (photo)
            }
            else
            {
                resolve ('dist/img/boxed-bg.jpg')
            }
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
            else if ( field.name === 'admin' )
            {
                user [ field.name ] = field.checked
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
        let tr = document.createElement ('tr')

        tr.innerHTML = `
        <td><img src="${ userData.photo }" alt="User Image" class="img-circle img-sm"></td>
        <td>${ userData.name }</td>
        <td>${ userData.email }</td>
        <td>${ (userData.admin) ? 'Sim' : 'Não' }</td>
        <td>${ userData.register }</td>
        <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>`

        this.tableEl.append (tr)

    } // addLine
}