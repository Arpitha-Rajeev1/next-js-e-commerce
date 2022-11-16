import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Head from 'next/head'
import '../styles/globals.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [cart, setcart] = useState({})
  const [subtotal, setsubtotal] = useState(0)
  const [user, setUser] = useState({value: null})
  const [key, setkey] = useState(0)

  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setcart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
      console.error(error)
      localStorage.clear()
    }
    const token = localStorage.getItem('token')
    if(token) {
      setUser({value: token})
      setkey(Math.random)
    }
  }, [router.query])

  const logout = () => {
    localStorage.removeItem('token')
    setUser({value: null})
    setkey(Math.random())
    router.push('/login')
  }

  const saveCart = (myCart) => {
    localStorage.setItem('cart', JSON.stringify(myCart))
    let sub = 0
    let keys = Object.keys(myCart)
    for (let i = 0; i < keys.length; i++) {
      sub += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setsubtotal(sub)
  }

  const addtoCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty
    }
    else {
      newCart[itemCode] = { qty: 1, price, name, size, variant }
    }
    setcart(newCart)
    saveCart(newCart)
  }

  const clearCart = () => {
    setcart({})
    saveCart({})
  }

  const removeCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty
    }
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode]
    }
    setcart(newCart)
    saveCart(newCart)
  }

  return (
    <>
      <div>
        <Head>
          <title>Buy Online</title>
          <meta name="description" content="Buy online is an e-commerce dummy app" />
          <link rel="icon" href="https://www.freepnglogos.com/uploads/b-letter-logo-png/b-letter-capital-letter-transparent-png-stickpng-0.png" />
        </Head>
      </div>
      <Navbar logout={logout} user={user} key={key} cart={cart} addtoCart={addtoCart} removeCart={removeCart} clearCart={clearCart} subtotal={subtotal} />
      <Component cart={cart} addtoCart={addtoCart} removeCart={removeCart} clearCart={clearCart} subtotal={subtotal} {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
