import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const signup = () => {
  const router = useRouter()
  useEffect(() => {
    if(localStorage.getItem('token')) {
      router.push('/')
    }
  }, [])
  
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const handleChange = (e) => {
    if (e.target.name == 'name') {
      setname(e.target.value)
    }
    else if (e.target.name == 'email') {
      setemail(e.target.value)
    }
    else if (e.target.name == 'password') {
      setpassword(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { name, email, password }
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        toast.success('Successfully created', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      })
      .catch((error) => {
        console.log(error)
        toast.error('Sorry! Some error occured', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      })

    setname('')
    setemail('')
    setpassword('')
  }

  return (
    <section className="text-gray-600 body-font">
      <ToastContainer />
      <form onSubmit={handleSubmit} method="POST" className="container px-5 py-24 mx-auto flex flex-wrap items-center">

        <div className="bg-gray-100 rounded-lg p-8 flex flex-col m-auto w-1/2 mt-5">
          <h2 className="text-gray-900 text-lg text-center font-medium title-font mb-5">Sign up</h2>
          <div className="relative mb-4">
            <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Full Name</label>
            <input value={name} onChange={handleChange} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input value={email} onChange={handleChange} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
            <input value={password} onChange={handleChange} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <button type="submit" className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>

          <Link href='/login'><p className="text-s text-gray-500 mt-3">Already have an account yet? Log in</p></Link>
        </div>
      </form>
    </section>
  )
}

export default signup