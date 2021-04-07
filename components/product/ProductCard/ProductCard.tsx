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
  
interface Product {
  id: string | numbe
  name: string
  description: string
  slug?: string
  path?: string
  sku?: string
  images: ProductImage[]
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
  return (
    <Link href={`/product${product.slug}`}>
      <a
        className={cn(s.root, { [s.simple]: variant === 'simple' }, className)}
      >
      <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
           {product?.images && (
            <Image
              quality="85"
              className="hover:grow hover:shadow-lg"
              src={product.images[0].url || placeholderImg}
              alt={product.name || 'Product Image'}
              height={320}
              width={320}
              layout="fixed"
            />
          )}
          <div className="pt-3 flex items-center justify-between">
            <p>{product.name}</p>
              <WishlistButton
                className="h-6 w-6 fill-current text-gray-500 hover:text-black"
                productId={product.id}
                variant={product.variants[0] as any}
              />
          </div>
          <p className="pt-1 text-gray-900">{price}</p>
      </div>
      </a>
    </Link>
  )
}

export default ProductCard
