/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, useLoaderData } from 'react-router-dom'
import { findSumArray } from './SumArray'
import { instance } from '../../api/axios.api'
import { IBankItems, IBothBank, ICategory } from '../../Types/types'
import { FC } from 'react'
import './style.scss'
import { Input } from '../../components/Input/Input'
import { ButtonGreen } from '../../components/Button/ButtonGreen'
import { ProgressBar } from '../../components/ProgressBar/ProgressBar'

export const bankAction = async ({ request }: any) => {
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

      const newTransActions = {
        title: formdata.get('title'),
        amount: formdata.get('amount'),
        category: formdata.get('idDream'),
        type: 'expense',
      }

      await instance.patch(`/piggybank/${formdata.get('id')}`, bankData)
      await instance.post('/transaction', newTransActions)
      return null
    }
    case 'DELETE': {
      const formdata = await request.formData()
      await instance.delete(`/piggybank/${formdata.get('id')}`)
    }
  }
}

export const bankLoader = async () => {
  const { data } = await instance.get('/piggybank')
  const categories = await instance.get<ICategory[]>('/categories')

  const result = data.filter((i: any) => i.bankItems.length)

  return {
    categories: categories.data,
    bank: result,
  }
}

export const Bank: FC = () => {
  const { categories, bank } = useLoaderData() as IBothBank

  const idDream = categories
    .filter((item) => item.title === 'Dream')
    .map((item) => item.id)
  const getProcent = (bank: IBankItems[]) => {
    const total: number = bank.reduce(
      (accumulator: number, currentValue: IBankItems) =>
        accumulator + currentValue.count,
      0
    )
    const totalSaveMoney = bank.reduce(
      (accumulator: number, currentValue: IBankItems) =>
        !currentValue.status ? accumulator + currentValue.count : accumulator,
      0
    )
    return Number(((totalSaveMoney * 100) / total).toFixed(1))
  }

  if (bank[0]?.bankItems?.filter((i) => i.status === true).length === 0) {
    return (
      <div>
        <h1>Congratulations</h1>
        <Form action="/bank" method="delete">
          <input type="hidden" name={'id'} value={bank[0]?.id} />

          <ButtonGreen type="submit" text="Create new goal" />
        </Form>
      </div>
    )
  }

  return (
    <div className="bankContainer">
      {bank[0] && <h3 className="title_bank">{bank[0]?.title}</h3>}
      {bank[0] && (
        <ProgressBar
          percent={getProcent(bank[0]?.bankItems)}
          title={bank[0].title}
        />
      )}
      {!bank[0] && (
        <>
          <h2 className="title_bank">New goal</h2>
          <Form action="/bank" method="post">
            <label htmlFor="title">
              <Input type="text" name="title" placeholder="title" />
              <div className="bankInputWrapper">
                <Input type="number" name="day" placeholder="day" />
                <Input type="number" name="money" placeholder="money" />
              </div>
            </label>
            <ButtonGreen type="submit" text="Create" />
          </Form>
        </>
      )}
      <ul id="categories" className="hive_container">
        {bank[0]?.bankItems?.map((item) => (
          <>
            <li>
              <div>
                {item.status ? (
                  <div className="color">
                    <Form action="/bank" className="bank_form" method="PATCH">
                      <input
                        type="hidden"
                        name={'title'}
                        value={bank[0].title}
                      />
                      <input type="hidden" name={'id'} value={item.id} />
                      <input
                        type="hidden"
                        name={'idDream'}
                        value={`${idDream[0]}`}
                      />
                      <input type="hidden" name={'amount'} value={item.count} />
                      <div className="button-grid">
                        <button disabled={!item.status}>{item.count}</button>
                      </div>
                    </Form>
                  </div>
                ) : (
                  <div className="color2">{item.count}</div>
                )}
              </div>
            </li>
            {Math.random() < 0.5 && <li className="pusher"></li>}
          </>
        ))}
      </ul>
    </div>
  )
}
