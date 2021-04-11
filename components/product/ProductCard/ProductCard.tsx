import cn from 'classnames'
import Link from 'next/link'
import type { FC } from 'react'
import s from './ProductCard.module.css'
import WishlistButton from '@components/wishlist/WishlistButton'

import usePrice from '@framework/use-price'
import type { ProductNode } from '@framework/api/operations/get-all-products'
import Image, { ImageProps } from 'next/image'

interface ProductImage {
  url: string
  alt?: string
}
interface ProductOption {
  id: string | number
  displayName: string
  values: ProductOptionValues[]
}

interface ProductOptionValues {
  label: string
  hexColors?: string[]
}
interface ProductVariant2 {
  id: string | number
  options: ProductOption[]
}
interface Product {
  id: string | number
  name: string
  description: string
  slug?: string
  path?: string
  sku?: string
  images: ProductImage[]
  price: any
  variants: ProductVariant2[]
}

interface Props {
  className?: string
  product: Product
  variant?: 'slim' | 'simple'
  imgProps?: Omit<ImageProps, 'src'>
}

const placeholderImg = '/product-img-placeholder.svg'

const ProductCard: FC<Props> = ({
  className,
  product,
  variant,
  imgProps,
  ...props
}) => {
  const { price } = usePrice({
    amount: product.prices?.price?.value,
    baseAmount: product.prices?.retailPrice?.value,
    currencyCode: product.prices?.price?.currencyCode!,
  })
  return (
    <Link href={`/product${product.path}`}>
      <a
        className={className}
        style={props.style && props.style}
      >
        <div>
          {product?.images && (
            <Image
              quality="25"
              className="hover:grow hover:shadow-lg"
              src={product.images.edges.length > 0 && product.images.edges[0].node.urlOriginal || placeholderImg}
              alt={product.name || 'Product Image'}
              height={300}
              width={300}
              layout="fixed"
            />
          )}
          <div className="pt-3  text-center ">
            <p className="text-sm text-center">{product.name}</p>
            {/* <WishlistButton
              className="h-6 w-6 fill-current text-gray-500 hover:text-black"
              productId={product.id}
              variant={product.variants && product.variants[0] as any}
            /> */}
            <b className='px-3'>
            {price}
          </b>
          </div>
          
        </div>
      </a>
    </Link>
  )
}

export default ProductCard
