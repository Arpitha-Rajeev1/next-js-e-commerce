import Link from "next/link"
import { useRef } from "react"
import Head from "next/head"
import Script from "next/script"

const checkout = ({ toggleCart, cart, addtoCart, removeCart, subtotal }) => {

  const initiatePayment = async () => {
    
    let oid = Math.floor(Math.random() * Date.now())
    const data = { cart, subtotal, oid, email: 'email' };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let txnToken = await a.json()
    console.log(txnToken)

    var config = {
      "root": "",
      "flow": "DEFAULT",
      "data": {
        "orderId": oid,
        "token": txnToken,
        "tokenType": "TXN_TOKEN",
        "amount": subtotal,
      },
      "handler": {
        "notifyMerchant": function(eventName, data){
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        }
      }
    }
    window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
      window.Paytm.CheckoutJS.invoke();
    }).catch(function onError(error){
      console.log("error => ", error)
    })
  }

  const ref = useRef()

  return (
    <div className='container m-auto px-10'>
      <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" /></Head>
      <Script type="application/javascript" crossOrigin="anonymous" src={`${process.env.PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.PAYTM_MID}.js`} onload="onScriptLoad()" />
      <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
      <h2 className='p-4 font-bold text-xl'>1. Delivery details</h2>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className="relative mb-4">
            <label for="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="relative mb-4">
            <label for="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className="relative mb-4">
            <label for="street" className="leading-7 text-sm text-gray-600">Street</label>
            <input type="text" id="street" name="street" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="relative mb-4">
            <label for="area" className="leading-7 text-sm text-gray-600">Area</label>
            <input type="text" id="area" name="area" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="relative mb-4">
            <label for="city" className="leading-7 text-sm text-gray-600">City</label>
            <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className="relative mb-4">
            <label for="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input type="text" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="relative mb-4">
            <label for="state" className="leading-7 text-sm text-gray-600">State</label>
            <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="relative mb-4">
            <label for="pin" className="leading-7 text-sm text-gray-600">PinCode</label>
            <input type="text" id="pin" name="pin" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>

      <h2 className='p-4 font-bold text-xl'>2. Review Cart Items</h2>
      <div ref={ref} className='z-10 sidebar px-5 py-2 my-5 bg-blue-200'>
        <span onClick={toggleCart} className='absolute top-2 right-2 cursor-pointer text-2xl text-blue-200'>X</span>
        <ol className='list-decimal font-semibold px-5'>
          {Object.keys(cart).length === 0 && <div className='my-4'>Cart is empty!</div>}
          {Object.keys(cart).map((item) => {
            return <li key={item}>
              <div className="item flex my-5">
                <div className="font-semibold">{cart[item].name}</div>
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
      </div>
      <div className="mx-3">
        <Link href={'/order'}><button onClick={initiatePayment} disabled={true} className="flex mx-auto my-8 text-black bg-blue-100 border-0 py-2 px-8 focus:outline-none hover:bg-blue-300 rounded text-lg">Pay</button></Link>
      </div>
    </div>
  )
}

export default checkout