import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { Text } from '@components/ui'
import { Layout } from '@components/common'
import getSlug from '@lib/get-slug'
import { missingLocaleInPages } from '@lib/usage-warns'
import { getConfig } from '@framework/api'
import getPage from '@framework/api/operations/get-page'
import getAllPages from '@framework/api/operations/get-all-pages'
import { defaultPageProps } from '@lib/defaults'

export async function getStaticProps({
  preview,
  params,
  locale,
}: GetStaticPropsContext<{ pages: string[] }>) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ preview, config })
  const path = params?.pages.join('/')
  const slug = path

  const pageItem = pages.find((p) => (p.url ? getSlug(p.url) === slug : false))
  const data =
    pageItem &&
    (await getPage({ variables: { id: pageItem.id! }, config, preview }))
  const page = data?.page

  if (!page) {
    // We throw to make sure this fails at build time as this is never expected to happen
    throw new Error(`Page with slug '${slug}' not found`)
  }

  return {
    props: { ...defaultPageProps, pages, page },
    revalidate: 60 * 60, // Every hour
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const { pages } = await getAllPages()
  const [invalidPaths, log] = missingLocaleInPages()
  const paths = pages.map((page) => page.url)
  log()

  return {
    paths,
    // Fallback shouldn't be enabled here or otherwise this route
    // will catch every page, even 404s, and we don't want that
    fallback: false,
  }
}

export default function Pages({
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="max-w-2xl mx-8 sm:mx-auto py-20">
      {page?.body && <Text html={page.body} />}
    </div>
  )
}

Pages.Layout = Layout
