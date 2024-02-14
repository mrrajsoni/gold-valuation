'use client'
import { useEffect, useState } from 'react'
import styles from './itemrows.module.scss'
import ItemRow from '../itemRow/ItemRow'
import LabelValue from '../labelValue/LabelValue'
import { replicacheInstance } from '@/utils/replicacheClient'

export type ornamentListKeys = {
    id: string
    listOfItems: { label: string; value: string }
    quantity: string
    weight: string
    averageValue: string
    purityInCarat: string
    purityInPercentage: string
}

const totalValues = {
    units: 0,
    weightInGrams: 0,
    netWeight: 0,
    carat24Gold: 0,
    carat22Gold: 0,
    priceValue: 0,
}

const headerRowItems = [
    {
        text: 'Sr. No.',
    },
    {
        text: 'Ornament List',
    },
    {
        text: 'No. of units',
    },
    {
        text: 'Purity in carat',
    },
    {
        text: 'Purity in percentage',
    },
    {
        text: 'Weight in grams',
    },
    {
        text: 'Approx value in rupees',
    },
]

interface ItemRowsProps {
    goldRatePerGram?: string
    ornamentsData: ornamentListKeys[]
}
const ItemRows = ({
    goldRatePerGram = '4420',
    ornamentsData,
}: ItemRowsProps) => {
    const [allOrnamentList, setAllOrnamentList] = useState(ornamentsData)
    const [totals, setTotals] = useState(totalValues)
    const handleChange = (
        value: string,
        index: number,
        key: keyof ornamentListKeys,
    ) => {
        const newListCopy = [...allOrnamentList]
        if (key === 'listOfItems') {
            newListCopy[index][key] = {
                label: value,
                value: value.toLocaleLowerCase(),
            }
        } else {
            newListCopy[index][key] = value
            if (newListCopy[index].purityInPercentage) {
                newListCopy[index].purityInCarat = (
                    (Number(newListCopy[index].purityInPercentage) / 100) *
                    24
                )
                    .toFixed(2)
                    .toString()
            }
            if (newListCopy[index].weight) {
                newListCopy[index].averageValue = (
                    Number(newListCopy[index].weight) * Number(goldRatePerGram)
                )
                    .toFixed(2)
                    .toString()
            }
        }
        setAllOrnamentList(newListCopy)
    }

    useEffect(() => {
        let totalUnits = 0
        let totalGrams = 0
        let totalPrice = 0
        allOrnamentList.forEach((ornament) => {
            totalUnits += Number(ornament.quantity)
            totalGrams += Number(ornament.weight)
            totalPrice += Number(ornament.averageValue)
        })
        setTotals({
            carat22Gold: 0,
            carat24Gold: 0,
            netWeight: 0,
            weightInGrams: totalGrams,
            priceValue: totalPrice,
            units: totalUnits,
        })
    }, [allOrnamentList, goldRatePerGram])

    const addNewRow = () => {
        const newList: ornamentListKeys[] = [...allOrnamentList]
        newList.push({
            averageValue: '',
            id: `${newList.length + 1} `,
            listOfItems: { label: '', value: '' },
            purityInCarat: '',
            purityInPercentage: '',
            quantity: '',
            weight: '',
        })
        setAllOrnamentList(newList)
        replicacheInstance?.mutate.addOrnaments({
            ornaments: allOrnamentList,
        })
    }

    const handleDeleteRow = (id: string) => {
        const newList = allOrnamentList.filter((list) => list.id !== id)
        setAllOrnamentList(newList)
    }
    return (
        <section className={styles.item__rows__container}>
            <div className={`text-center ${styles.bold}`}>
                <h5 className="mb-2">
                    Details of Gold Ornaments kept with the bank are as under
                </h5>
            </div>
            <ItemRowsHeader />
            {allOrnamentList.map((ornament, index) => {
                return (
                    <ItemRow
                        id={ornament.id}
                        index={index}
                        onChange={handleChange}
                        purityInCaratValue={ornament.purityInCarat}
                        units={ornament.quantity}
                        purityInPercentageValue={ornament.purityInPercentage}
                        valuationPrice={ornament.averageValue}
                        weight={ornament.weight}
                        key={ornament.id}
                        onDeleteRow={handleDeleteRow}
                    />
                )
            })}

            <button onClick={addNewRow} type="button">
                Add New Row
            </button>

            <ItemTotals
                units={totals.units}
                weightInGrams={totals.weightInGrams}
                netWeight={totals.netWeight}
                carat22Gold={totals.carat22Gold}
                price={totals.priceValue}
            />
        </section>
    )
}

const ItemRowsHeader = () => {
    return (
        <div className={`${styles.item__rows__header} grid`}>
            {headerRowItems.map((headerItem) => {
                return (
                    <span key={headerItem.text} className={styles.header__span}>
                        {headerItem.text}
                    </span>
                )
            })}
        </div>
    )
}

interface ItemTotalsProps {
    units: number
    weightInGrams: number
    netWeight: number
    carat22Gold: number
    price: number
}
const ItemTotals = ({
    carat22Gold,
    netWeight,
    price,
    units,
    weightInGrams,
}: ItemTotalsProps) => {
    return (
        <div className={styles.totals__row__container}>
            <table>
                <thead>
                    <th>Units</th>
                    <th>Weight in grams</th>
                    <th>Net Weight</th>
                    <th>22 carat gold</th>
                    <th>Approx valuation price</th>
                </thead>
                <tbody>
                    <tr>{units.toString()}</tr>
                    <tr>{weightInGrams.toString()}</tr>
                    <tr>{netWeight.toString()}</tr>
                    <tr>{carat22Gold.toString()}</tr>
                    <tr>{price.toString()}</tr>
                </tbody>
            </table>
        </div>
    )
}

export default ItemRows
