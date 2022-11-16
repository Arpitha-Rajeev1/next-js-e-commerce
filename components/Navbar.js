import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = ({ user, logout, cart, addtoCart, removeCart, clearCart, subtotal }) => {

  const toggleCart = () => {
    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }
    else if (!ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.add('translate-x-full')
      ref.current.classList.remove('translate-x-0')
    }
  }

  const ref = useRef()

  return (
    <header className="text-gray-600 body-font bg-blue-100">
      <div className="container mx-auto flex flex-wrap py-5 flex-col md:flex-row items-center">
        <nav className="flex lg:w-1/5 flex-wrap items-center text-base md:ml-auto">
          <Link href={'/orders'} className="mr-5 hover:text-gray-900 text-xl font-bold">Orders</Link>
          <Link href={'/shirts'} className="mr-5 hover:text-gray-900 text-xl font-bold">T-Shirts</Link>
          <Link href={'/hoodies'} className="mr-5 hover:text-gray-900 text-xl font-bold">Hoodies</Link>
          <Link href={'/mugs'} className="mr-5 hover:text-gray-900 text-xl font-bold">Mugs</Link>
          <Link href={'/stickers'} className="mr-5 hover:text-gray-900 text-xl font-bold">Stickers</Link>
          <Link href={'/myaccount'} className="mr-5 hover:text-gray-900 text-xl font-bold">My account</Link>
        </nav>
        <Link href={'/'} className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
          <Image src='https://www.freepnglogos.com/uploads/b-letter-logo-png/b-letter-capital-letter-transparent-png-stickpng-0.png' width={50} height={50} alt="nav" />
          <span className="ml-1 text-2xl">Buy Online</span>
        </Link>
        <div onClick={logout} className="cursor-pointer lg:w-1/5 inline-flex lg:justify-end ml-5 lg:ml-0 mt-3">
          {user.value && <Image alt='phot' src='https://png.pngtree.com/element_our/20190604/ourmid/pngtree-user-avatar-boy-image_1482937.jpg' width={50} height={50} />}
        </div>
        <div onClick={toggleCart} className="cursor-pointer lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0 mt-3">
          <Image src='https://media.istockphoto.com/vectors/shopping-cart-symbol-vector-id1249708785?k=20&m=1249708785&s=612x612&w=0&h=coA5fj8MJy4j-gt2C21xno4PfXN6tOSVRtRcUSvWJa8=' width={50} height={50} alt="nav" />
        </div>
        <div ref={ref} className='h-full z-10 sidebar w-72 absolute top-0 right-0 bg-yellow-200 px-5 py-10 transform translate-transform translate-x-full'>
          <h2 className='font-bold text-xl text-center'>Shopping cart</h2>
          <span onClick={toggleCart} className='absolute top-2 right-2 cursor-pointer text-2xl text-blue-200'>X</span>
          <ol className='list-decimal font-semibold px-5'>
            {Object.keys(cart).length === 0 && <div className='my-4'>Cart is empty!</div>}
            {Object.keys(cart).map((item) => {
              return <li key={item}>
                <div className="item flex my-5">
                  <div className="w-2/3 font-semibold">{cart[item].name} ({cart[item].size}/{cart[item].variant})</div>
                  <div className="flex font-semibold items-center justify-center w-1/3">
                    <div className='cursor-pointer mx-3' onClick={() => removeCart(item, 1, cart[item].price, cart[item].name, cart[item].size, cart[item].variant)}>-</div>
                    {cart[item].qty}
                    <div onClick={() => addtoCart(item, 1, cart[item].price, cart[item].name, cart[item].size, cart[item].variant)} className='cursor-pointer mx-3'>+</div>
                  </div>
                </div>
              </li>
            })}
          </ol>
          <span className="total font-bold">Subtotal: $ {subtotal}</span>
          <Link href={'/checkout'}><button className="flex mx-auto mt-8 text-black bg-blue-100 border-0 py-2 px-8 focus:outline-none hover:bg-blue-300 rounded text-lg">Checkout</button></Link>
          <button onClick={clearCart} className="flex mx-auto mt-8 text-black bg-blue-400 border-0 py-2 px-8 focus:outline-none hover:bg-blue-800 hover:text-white rounded text-lg">Clear Cart</button>
        </div>
      </div>
    </header>
  )
}

export default Navbar