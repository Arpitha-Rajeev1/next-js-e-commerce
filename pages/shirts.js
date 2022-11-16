import Image from 'next/image'
import Link from 'next/link'
import Product from '../models/Product'
import mongoose from 'mongoose'

const shirts = ({ products }) => {

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {Object.keys(products).map((item) => {
            return <div key={products[item]._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <Link href={'/product/tshirts'} className="block relative h-100 rounded overflow-hidden">
                <Image width={421} height={261} alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://5.imimg.com/data5/SH/GC/MY-8764775/mens-t-shirt-500x500.jpg" />
              </Link>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                <p className="mt-1">${products[item].price}</p>
                <p className="mt-1">
                  {products[item].size.includes('S') && <span className='border border-gray-600 px-1 mx-1'>S</span>}
                  {products[item].size.includes('M') && <span className='border border-gray-600 px-1 mx-1'>M</span>}
                  {products[item].size.includes('L') && <span className='border border-gray-600 px-1 mx-1'>L</span>}
                  {products[item].size.includes('XL') && <span className='border border-gray-600 px-1 mx-1'>XL</span>}
                  {products[item].size.includes('XXL') && <span className='border border-gray-600 px-1 mx-1'>XXL</span>}
                </p>
                <div className="mt-1">
                  {products[item].color.includes('Red') && <button className='border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none'></button>}
                  {products[item].color.includes('Blue') && <button className='border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none'></button>}
                  {products[item].color.includes('Green') && <button className='border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none'></button>}
                  {products[item].color.includes('Black') && <button className='border-2 border-gray-300 ml-1 bg-black-700 rounded-full w-6 h-6 focus:outline-none'></button>}
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps() {

  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }

  let products = await Product.find({category: 'tshirt'})
    let tshirts = {}
    for(let item of products){
        if(item.title in tshirts){
            if(!tshirts[item.title].color.includes(item.color) && item.availableQty > 0){
                tshirts[item.title].color.push(item.color)
            }
            if(!tshirts[item.title].size.includes(item.color) && item.availableQty > 0){
                tshirts[item.title].size.push(item.size)
            }
        }
        else{
            tshirts[item.title] = JSON.parse(JSON.stringify(item))
            if(item.availableQty > 0){
                tshirts[item.title].color = [item.color]
                tshirts[item.title].size = [item.size]
            }
        }
    }

  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) }
  }
}

export default shirts 