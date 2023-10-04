/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react'
import { Form, useLoaderData } from 'react-router-dom'
import './style.scss'
import { CategoryModal } from '../../components/CategoryModal/CategoryModal'
import { instance } from '../../api/axios.api'
import { ICategory } from '@/Types/types'
import { ButtonRed } from '../../components/Button/ButtonRed'
import Girafe from '../../assets/icon/giraffe.png'
import { toast } from 'react-toastify'
export const categoriesAction = async ({ request }: any) => {
  switch (request.method) {
    case 'POST': {
      const formdata = await request.formData()
      const title = {
        title: formdata.get('title'),
      }

      await instance.post('/categories', title)
      toast.success('You create new category')
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
      toast.success('You delete category')
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
                <span className="title-category">{category.title}</span>
                <div className="conteiner-for-icon">
                  <img src={Girafe} alt="" />
                </div>

                <div className="categorie__selary__buttonGroup">
                  <button
                    className="categorie__selary__icon"
                    onClick={() => {
                      setIsEdit(true)
                      setCategoryId(category.id)
                    }}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>

                  <Form method="DELETE" action="/categories">
                    <input type="hidden" name="id" value={category.id} />
                    <button className="categorie__selary__icon">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </Form>
                </div>
              </div>
            )
          })}
        </div>
        {/* add category */}
        <ButtonRed
          click={() => setVisibleModal(true)}
          text="Create new category"
        />
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
