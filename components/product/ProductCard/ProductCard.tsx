import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import type { FC } from 'react'
import s from './ProductCard.module.css'
import WishlistButton from '@components/wishlist/WishlistButton'

import usePrice from '@framework/use-price'
import type { ProductNode } from '@framework/api/operations/get-all-products'

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
    <Link href={`/product${p.slug}`}>
      <a
        className={cn(s.root, { [s.simple]: variant === 'simple' }, className)}
      >
      <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
          <img
            className="hover:grow hover:shadow-lg"
            src={p.images.edges?.[0]?.node.urlOriginal! || placeholderImg}
            alt={p.images.edges?.[0]?.node.altText || 'Product Image'}
           />
          <div className="pt-3 flex items-center justify-between">
            <p>{p.name}</p>
              <WishlistButton
                className="h-6 w-6 fill-current text-gray-500 hover:text-black"
                productId={p.entityId}
                variant={p.variants.edges?.[0]!}
              />
          </div>
          <p className="pt-1 text-gray-900">{price}</p>
      </div>
      </a>
    </Link>
  )
}

export default ProductCard
