import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useLocalStorage } from 'react-use'
import { Navigate } from 'react-router-dom'

import { Input } from "../../components/Input/"
import { Icon } from "../../components/Icon"

const validationSchema = yup.object().shape({
    email: yup.string().email("Informe um email válido").required('Informe seu e-mail'),
    password: yup.string().required('Digite uma senha'),
})

export const Login =() => {
    const [auth, setAuth] = useLocalStorage("auth", {})
    
    const formik = useFormik({
        onSubmit: async (values) => {
           const res = await axios({
                method: 'get',
                baseURL: import.meta.env.VITE_API_URL,
                url: '/login',
                auth: {
                   username: values.email,
                    password: values.password
                }
            })
            //   OU PODERIA SER DESTA FORMA 
            // -> axios.post('htt://localhost:8989/users',{
            //     data: values
            // }) <-

            //Salva informações no localStorage
            setAuth(res.data)
            //PEGA OS DADOS
        },
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema
    })

    if(auth?.user?.id){
        return <Navigate to="/dashboard"  replace={true}/>
    }

    return(
        <div>
            <header className='p-4 border-b  border-red-300'>
                <div className="container max-w-xl  flex justify-center">
                 <img src='./imgs/logo-black.svg' className='w-32 md:w-40' />
                </div>
            </header>
             
            <main className="container max-w-xl p-4">
                <div className="p-4 flex space-x-4 items-center">
                    <a href="/">
                        <Icon name='arrowLeft' className='h-6'/>
                    </a>
                    <h2 className="text-xl font-bold">
                        Entre na sua conta
                    </h2>
                </div>
                    <form className="p-4 space-y-6" onSubmit={formik.handleSubmit}>
                        <Input 
                        id="email"
                        name="email"
                        type="text"
                        label="Seu e-mail"
                        error={formik.touched.email && formik.errors.email}
                        placeholder='Digite seu email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    
                    <Input 
                        id="password"
                        type="password"
                        name="password"
                        label="Sua senha"
                        error={formik.touched.password && formik.errors.password}
                       placeholder='Digite sua senha'
                       value={formik.values.password}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                    />

                <button 
                    type='submit'
                    className='block w-full bg-red-500 text-center text-white px-6 py-3 rounded-xl disabled:opacity-50'
                    disabled={!formik.isValid || formik.isSubmitting}>
                       {formik.isSubmitting ? 'Carregando...' : " Entrar"}
                </button>

            </form>
      
      </main>

    </div>

    )
}