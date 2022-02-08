import Head from 'next/head'
import React from 'react'
import { useRouter } from 'next/router'

import { getPosts, getPostDetails } from '../../services'
import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
  Loader,
} from '../../components'

const PostDetails = ({ post }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <Loader />
  }
  return (
    <>
      <Head>
        <title>{`TBlog - ${post.title}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto mb-8 px-10">
        <div className="grid grid-cols-1  gap-12 lg:grid-cols-12 ">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            <Author author={post.author} />
            <CommentsForm slug={post.slug} />
            <Comments slug={post.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative top-8 lg:sticky">
              <PostWidget
                slug={post.slug}
                categories={post.categories.map((category) => category.slug)}
              />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostDetails

export async function getStaticProps({ params }) {
  const post = await getPostDetails(params.slug)

  return {
    props: { post },
  }
}

export async function getStaticPaths() {
  const posts = await getPosts()

  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  }
}
