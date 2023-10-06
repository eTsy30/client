/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, useLoaderData } from 'react-router-dom'
import { findSumArray } from './SumArray'
import { instance } from '../../api/axios.api'
import { IBank } from '../../Types/types'
import { FC } from 'react'
import './style.scss'

export const bankAction = async ({ request }: any) => {
  console.log(request, 'request')

  switch (request.method) {
    case 'POST': {
      const formdata = await request.formData()
      const bankArray = findSumArray(
        +formdata.get('money'),
        +formdata.get('day')
      )
      const bankData = {
        title: formdata.get('title'),
        bank: bankArray,
      }
      await instance.post(`/piggybank`, bankData)
      return null
    }

    case 'PATCH': {
      const formdata = await request.formData()
      const bankData = {
        status: false,
      }
      await instance.patch(`/piggybank/${formdata.get('id')}`, bankData)

      return null
    }
    // case 'DELETE': {
    // }
  }
}

export const bankLoader = async () => {
  const { data } = await instance.get('/piggybank')
  const result = data.filter((i: any) => i.bankItems.length)

  return result
}

export const Bank: FC = () => {
  const bank = useLoaderData() as IBank[]
  return (
    <div>
      <Form action="/bank" method="post">
        <label htmlFor="title">
          <input type="text" name="title" placeholder="title" />
          <input type="number" name="day" placeholder="day" />
          <input type="number" name="money" placeholder="money" />
        </label>

        <button type="submit">Create</button>
      </Form>

      {bank &&
        bank[0]?.bankItems?.map((item, index) => {
          return (
            <div key={index}>
              <Form action="/bank" method="PATCH">
                <input type="hidden" name={'id'} value={item.id} />
                <button className="but" disabled={!item.status}>
                  {item.count} {item.status}
                  'id=' {item.id}
                </button>
              </Form>
            </div>
          )
        })}
    </div>
  )
}
