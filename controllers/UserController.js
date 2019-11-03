class UserController
{
    constructor (formID, tableID)
    {
        this.formEl = document.getElementById (formID)
        this.tableEl = document.getElementById (tableID)

        this.submitListener()

        this.onEdit()
    }

    onEdit ()
    {
        document.querySelector ('#box-user-update .btn-cancel').addEventListener ('click', event => {

            this.showFormCreate ()
        } )
    }

    submitListener ()
    {
        this.formEl.addEventListener ('submit', event => {

            event.preventDefault()

            const btnSubmit = this.formEl.querySelector ( '[type=submit]' )

            btnSubmit.disabled = true

            let fields = this.getFields ()

            if ( ! fields ) return false

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
        let user = {}

        let formValid = true ;

        [...this.formEl.elements].forEach ( (field, index) => {

            if (['name', 'email', 'password'].indexOf ( field.name ) > -1 && ! field.value )
            {
                field.parentElement.classList.add ('has-error')

                formValid = false
            }

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

        if ( ! formValid) return false
    
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

        tr.dataset.user = JSON.stringify(userData)

        tr.innerHTML = `
        <td><img src="${ userData.photo }" alt="User Image" class="img-circle img-sm"></td>
        <td>${ userData.name }</td>
        <td>${ userData.email }</td>
        <td>${ (userData.admin) ? 'Sim' : 'Não' }</td>
        <td>${ Utils.dateFormat ( userData.register ) }</td>
        <td>
            <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>`

        tr.querySelector ('.btn-edit').addEventListener ('click', event => {

            let json = JSON.parse(tr.dataset.user)

            let form = document.querySelector ('#form-user-update')

            for (let name in json)
            {
                let field = form.querySelector (`[name=${name.replace('_', '')}]`)

                if (field)
                {
                    switch ( field.type )
                    {
                        case 'file':

                            continue

                        break

                        case 'radio':

                            field = form.querySelector (` [name=${name.replace('_', '')} ][value=${json[name]}] `)

                            field.checked = true

                        break

                        case 'checkbox':

                            field.checked = json[ name ]

                        break

                        default:

                            field.value = json[ name ]
                    }
                }
            }

            this.showFormUpdate()

        })

        this.tableEl.append (tr)

        this.updateCount()

    } // addLine

    showFormCreate ()
    {
        document.querySelector ('#box-user-create').style.display = 'block'
        document.querySelector ('#box-user-update').style.display = 'none'
    }
    showFormUpdate ()
    {
        document.querySelector ('#box-user-create').style.display = 'none'
        document.querySelector ('#box-user-update').style.display = 'block'
    }

    updateCount ()
    {

        let numberUsers = 0
        let numberAdmin = 0

        ;[...this.tableEl.children].forEach(row => {

            numberUsers ++

            let user = JSON.parse(row.dataset.user)

            if (user._admin)
            {
                numberAdmin ++
            }
        })

        document.querySelector ('#numberUsers').innerHTML = numberUsers
        document.querySelector ('#numberAdmins').innerHTML = numberAdmin

    } // updateCount
}