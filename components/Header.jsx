import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { getCategories } from '../services'

const Header = () => {
  const [categories, setCategories] = useState()
  useEffect(() => {
    const reponse = getCategories().then((result) => setCategories(result))
  }, [])

  return (
    <div className="head container mx-auto mb-8 px-10">
      <div className="inline-block w-full border-blue-400 py-6">
        <div className="block md:float-left">
          <Link href="/">
            <span className="cursor-pointer text-2xl font-bold text-white">
              <span className="text-blue-400">T</span>Blog
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories?.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className="mt-2 ml-4 cursor-pointer align-middle font-semibold text-white md:float-right">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header
