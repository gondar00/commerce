import rangeMap from '@lib/range-map'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { getConfig } from '@framework/api'
import getAllProducts from '@framework/api/operations/get-all-products'
import getSiteInfo from '@framework/api/operations/get-site-info'
import getAllPages from '@framework/api/operations/get-all-pages'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })

  // Get Featured Products
  const { products: featuredProducts } = await getAllProducts({
    variables: { field: 'featuredProducts', first: 6 },
    config,
    preview,
  })

  // Get Best Selling Products
  const { products: bestSellingProducts } = await getAllProducts({
    variables: { field: 'bestSellingProducts', first: 6 },
    config,
    preview,
  })

  // Get Best Newest Products
  const { products: newestProducts } = await getAllProducts({
    variables: { field: 'newestProducts', first: 12 },
    config,
    preview,
  })

  const { categories, brands } = await getSiteInfo({ config, preview })
  const { pages } = await getAllPages({ config, preview })

  // These are the products that are going to be displayed in the landing.
  // We prefer to do the computation at buildtime/servertime
  const { featured, bestSelling } = (() => {
    // Create a copy of products that we can mutate
    // Filter products that do not have images
    const products = [...newestProducts]
    // If the lists of featured and best selling products don't have enough
    // products, then fill them with products from the products list, this
    // is useful for new commerce sites that don't have a lot of products
    return {
      featured: rangeMap(6, (i) => featuredProducts[i] ?? products.shift())
        .filter(nonNullable)
        .sort((a, b) => a.node.prices.price.value - b.node.prices.price.value)
        .reverse(),
      bestSelling: rangeMap(
        6,
        (i) => bestSellingProducts[i] ?? products.shift()
      ).filter(nonNullable),
    }
  })()

  return {
    props: {
      featured,
      bestSelling,
      newestProducts,
      categories,
      brands,
      pages,
    },
    revalidate: 14400,
  }
}

const nonNullable = (v: any) => v

export default function Home({
  featured,
  bestSelling,
  brands,
  categories,
  newestProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
  <div className="carousel relative container mx-auto" style={{maxWidth: 1600}}>
    <div className="carousel-inner relative overflow-hidden w-full">
      {/*Slide 1*/}
      <input className="carousel-open" type="radio" id="carousel-1" name="carousel" aria-hidden="true" hidden checked />
      <div className="carousel-item absolute opacity-0" style={{height: '50vh'}}>
        <div className="block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1422190441165-ec2956dc9ecc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80")'}}>
          <div className="container mx-auto">
            <div className="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide">
              <p className="text-black text-2xl my-4">Stripy Zig Zag Jigsaw Pillow and Duvet Set</p>
              <a className="text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black" href="#">view product</a>
            </div>
          </div>
        </div>
      </div>
      <label htmlFor="carousel-3" className="prev control-1 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
      <label htmlFor="carousel-2" className="next control-1 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>
      {/*Slide 2*/}
      <input className="carousel-open" type="radio" id="carousel-2" name="carousel" aria-hidden="true" hidden />
      <div className="carousel-item absolute opacity-0 bg-cover bg-right" style={{height: '50vh'}}>
        <div className="block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjM0MTM2fQ&auto=format&fit=crop&w=1600&q=80")'}}>
          <div className="container mx-auto">
            <div className="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide">
              <p className="text-black text-2xl my-4">Real Bamboo Wall Clock</p>
              <a className="text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black" href="#">view product</a>
            </div>
          </div>
        </div>
      </div>
      <label htmlFor="carousel-1" className="prev control-2 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
      <label htmlFor="carousel-3" className="next control-2 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>
      {/*Slide 3*/}
      <input className="carousel-open" type="radio" id="carousel-3" name="carousel" aria-hidden="true" hidden />
      <div className="carousel-item absolute opacity-0" style={{height: '50vh'}}>
        <div className="block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-bottom" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1519327232521-1ea2c736d34d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80")'}}>
          <div className="container mx-auto">
            <div className="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide">
              <p className="text-black text-2xl my-4">Brown and blue hardbound book</p>
              <a className="text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black" href="#">view product</a>
            </div>
          </div>
        </div>
      </div>
      <label htmlFor="carousel-2" className="prev control-3 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
      <label htmlFor="carousel-1" className="next control-3 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>
      {/* Add additional indicators for each slide*/}
      <ol className="carousel-indicators">
        <li className="inline-block mr-3">
          <label htmlFor="carousel-1" className="carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900">•</label>
        </li>
        <li className="inline-block mr-3">
          <label htmlFor="carousel-2" className="carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900">•</label>
        </li>
        <li className="inline-block mr-3">
          <label htmlFor="carousel-3" className="carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900">•</label>
        </li>
      </ol>
    </div>
  </div>
  {/*	 
Alternatively if you want to just have a single hero
<section class="w-full mx-auto bg-nordic-gray-light flex pt-12 md:pt-0 md:items-center bg-cover bg-right" style="max-width:1600px; height: 32rem; background-image: url('https://images.unsplash.com/photo-1422190441165-ec2956dc9ecc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80');">
	<div class="container mx-auto">
		<div class="flex flex-col w-full lg:w-1/2 justify-center items-start  px-6 tracking-wide">
			<h1 class="text-black text-2xl my-4">Stripy Zig Zag Jigsaw Pillow and Duvet Set</h1>
			<a class="text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black" href="#">products</a>
		</div>
	  </div>
</section>
*/}
  <section className="bg-white py-8">
    <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
      <nav id="store" className="w-full z-30 top-0 px-6 py-1">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
          <a className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl " href="#">
            Store
          </a>
          <div className="flex items-center" id="store-nav-content">
            <a className="pl-3 inline-block no-underline hover:text-black" href="#">
              <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
              </svg>
            </a>
            <a className="pl-3 inline-block no-underline hover:text-black" href="#">
              <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
              </svg>
            </a>
          </div>
        </div>
      </nav>
      <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
        <a href="#">
          <img className="hover:grow hover:shadow-lg" src="https://images.unsplash.com/photo-1555982105-d25af4182e4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80" />
          <div className="pt-3 flex items-center justify-between">
            <p>Product Name</p>
            <svg className="h-6 w-6 fill-current text-gray-500 hover:text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
            </svg>
          </div>
          <p className="pt-1 text-gray-900">£9.99</p>
        </a>
      </div>
      <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
        <a href="#">
          <img className="hover:grow hover:shadow-lg" src="https://images.unsplash.com/photo-1508423134147-addf71308178?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80" />
          <div className="pt-3 flex items-center justify-between">
            <p>Product Name</p>
            <svg className="h-6 w-6 fill-current text-gray-500 hover:text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
            </svg>
          </div>
          <p className="pt-1 text-gray-900">£9.99</p>
        </a>
      </div>
      <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
        <a href="#">
          <img className="hover:grow hover:shadow-lg" src="https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80" />
          <div className="pt-3 flex items-center justify-between">
            <p>Product Name</p>
            <svg className="h-6 w-6 fill-current text-gray-500 hover:text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
            </svg>
          </div>
          <p className="pt-1 text-gray-900">£9.99</p>
        </a>
      </div>
      <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
        <a href="#">
          <img className="hover:grow hover:shadow-lg" src="https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80" />
          <div className="pt-3 flex items-center justify-between">
            <p>Product Name</p>
            <svg className="h-6 w-6 fill-current text-gray-500 hover:text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
            </svg>
          </div>
          <p className="pt-1 text-gray-900">£9.99</p>
        </a>
      </div>
      <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
        <a href="#">
          <img className="hover:grow hover:shadow-lg" src="https://images.unsplash.com/photo-1467949576168-6ce8e2df4e13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80" />
          <div className="pt-3 flex items-center justify-between">
            <p>Product Name</p>
            <svg className="h-6 w-6 fill-current text-gray-500 hover:text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
            </svg>
          </div>
          <p className="pt-1 text-gray-900">£9.99</p>
        </a>
      </div>
      <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
        <a href="#">
          <img className="hover:grow hover:shadow-lg" src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80" />
          <div className="pt-3 flex items-center justify-between">
            <p>Product Name</p>
            <svg className="h-6 w-6 fill-current text-gray-500 hover:text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
            </svg>
          </div>
          <p className="pt-1 text-gray-900">£9.99</p>
        </a>
      </div>
      <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
        <a href="#">
          <img className="hover:grow hover:shadow-lg" src="https://images.unsplash.com/photo-1550837368-6594235de85c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80" />
          <div className="pt-3 flex items-center justify-between">
            <p>Product Name</p>
            <svg className="h-6 w-6 fill-current text-gray-500 hover:text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
            </svg>
          </div>
          <p className="pt-1 text-gray-900">£9.99</p>
        </a>
      </div>
      <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
        <a href="#">
          <img className="hover:grow hover:shadow-lg" src="https://images.unsplash.com/photo-1551431009-a802eeec77b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80" />
          <div className="pt-3 flex items-center justify-between">
            <p>Product Name</p>
            <svg className="h-6 w-6 fill-current text-gray-500 hover:text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
            </svg>
          </div>
          <p className="pt-1 text-gray-900">£9.99</p>
        </a>
      </div>
    </div>
  </section>
  <footer className="container mx-auto bg-white py-8 border-t border-gray-400">
    <div className="container flex px-3 py-8 ">
      <div className="w-full mx-auto flex flex-wrap">
        <div className="flex w-full lg:w-1/2 ">
          <div className="px-3 md:px-0">
            <h3 className="font-bold text-gray-900">About</h3>
            <p className="py-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel mi ut felis tempus commodo nec id erat. Suspendisse consectetur dapibus velit ut lacinia.
            </p>
          </div>
        </div>
        <div className="flex w-full lg:w-1/2 lg:justify-end lg:text-right">
          <div className="px-3 md:px-0">
            <h3 className="font-bold text-gray-900">Social</h3>
            <ul className="list-reset items-center pt-3">
              <li>
                <a className="inline-block no-underline hover:text-black hover:underline py-1" href="#">Add social links</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</>

  )
}

Home.Layout = Layout
