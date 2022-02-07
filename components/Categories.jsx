import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getCategories } from '../services'

const Categories = () => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    getCategories().then((result) => setCategories(result))
  }, [])

  return (
    <div className="rounded bg-white p-8 shadow-lg">
      <h3 className="mb-8 border-b text-xl font-semibold">Categories</h3>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/category/${category.slug}`}
          // className="text-lg"
        >
          <span className="mb-3 block cursor-pointer pb-3">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  )
}

export default Categories
