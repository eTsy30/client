/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react'
import { Form, useLoaderData } from 'react-router-dom'
import './style.scss'
import { CategoryModal } from '../../components/CategoryModal/CategoryModal'
import { instance } from '../../api/axios.api'
import { ICategory } from '@/Types/types'

export const categoriesAction = async ({ request }: any) => {
  switch (request.method) {
    case 'POST': {
      const formdata = await request.formData()
      const title = {
        title: formdata.get('title'),
      }

      await instance.post('/categories', title)
      return null
    }
    case 'PATCH': {
      const formdata = await request.formData()
      const category = {
        id: formdata.get('id'),
        title: formdata.get('title'),
      }
      await instance.patch(`/categories/category/${category.id}`, category)
      return null
    }
    case 'DELETE': {
      const formdata = await request.formData()
      const categoryId = formdata.get('id')
      await instance.delete(`/categories/category/${categoryId}`)
      return null
    }
  }
}
export const categoriesLoader = async () => {
  const { data } = await instance.get<ICategory[]>('/categories')
  return data
}

export const Categories: FC = () => {
  const [visibleModal, setVisibleModal] = useState<boolean>(false)
  const [categoriId, setCategoryId] = useState<number>(0)
  const [isEdit, setIsEdit] = useState(false)

  const categories = useLoaderData() as ICategory[]
  return (
    <>
      <div className="categories">
        <h1>Your category list:</h1>
        {/* category list */}
        <div className="category">
          {categories.map((category, index) => {
            return (
              <div key={index} className="categorie__selary">
                {category.title}
                <div className="categorie__selary__buttonGroup">
                  <button
                    onClick={() => {
                      setIsEdit(true)
                      setCategoryId(category.id)
                    }}
                  >
                    {' '}
                    edit
                  </button>
                  <Form method="DELETE" action="/categories">
                    <input type="hidden" name="id" value={category.id} />
                    <button>dell</button>
                  </Form>
                </div>
              </div>
            )
          })}
        </div>
        {/* add category */}
        <button onClick={() => setVisibleModal(true)}>
          <span>Create new category</span>
          Icon
        </button>
      </div>
      {/* add category  modal */}
      {visibleModal && (
        <CategoryModal type="POST" setVisibleModal={setVisibleModal} />
      )}
      {/* edit category  modal */}
      {isEdit && (
        <CategoryModal
          type="PATCH"
          id={categoriId}
          setVisibleModal={setIsEdit}
        />
      )}
    </>
  )
}
