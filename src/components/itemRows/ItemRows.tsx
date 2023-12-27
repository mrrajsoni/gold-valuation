'use client'
import { useEffect, useState } from 'react'
import styles from './itemrows.module.scss'
import ItemRow from '../itemRow/ItemRow'
import { ornamentOptions } from '@/constants/global'

export type ornamentListKeys = {
    id: string
    listOfItems: { label: string; value: string }
    quantity: string
    weight: string
    averageValue: string
    purityInCarat: string
    purityInPercentage: string
}
const ornamentList: ornamentListKeys[] = [
    {
        id: '1',
        listOfItems: {
            label: '',
            value: '',
        },
        quantity: '',
        weight: '',
        averageValue: '',
        purityInCarat: '',
        purityInPercentage: '',
    },
]

const totalValues = {
    units: 0,
    weightInGrams: 0,
    netWeight: 0,
    carat24Gold: 0,
    carat22Gold: 0,
    priceValue: 0,
}

interface ItemRowsProps {
    goldRatePerGram?: number
}
const ItemRows = ({ goldRatePerGram = 4420 }: ItemRowsProps) => {
    const [allOrnamentList, setAllOrnamentList] = useState(ornamentList)
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
                    Number(newListCopy[index].weight) * goldRatePerGram
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
    }, [allOrnamentList])

    const addNewRow = () => {
        const newList: ornamentListKeys[] = [...allOrnamentList]
        newList.push({
            averageValue: '',
            id: `${newList.length}`,
            listOfItems: { label: '', value: '' },
            purityInCarat: '',
            purityInPercentage: '',
            quantity: '',
            weight: '',
        })
        setAllOrnamentList(newList)
    }
    return (
        <>
            <ItemRowsHeader>
                {allOrnamentList.map((ornament, index) => {
                    return (
                        <ItemRow
                            index={index}
                            onChange={handleChange}
                            purityInCaratValue={ornament.purityInCarat}
                            units={ornament.quantity}
                            purityInPercentageValue={
                                ornament.purityInPercentage
                            }
                            valuationPrice={ornament.averageValue}
                            weight={ornament.weight}
                            key={ornament.id}
                        />
                    )
                })}
            </ItemRowsHeader>

            <div className={`${styles.totals__row} flex`}>
                <span>Total</span>,<span>{totals.units}</span>,
                <span>{totals.weightInGrams}</span>,
                <span>{totals.netWeight}</span>,
                <span>{totals.carat22Gold}</span>,
                <span>{totals.carat24Gold}</span>,
                <span>{totals.priceValue}</span>,
            </div>
            <button onClick={addNewRow} type="button">
                Add New Row
            </button>
        </>
    )
}

const ItemRowsHeader = ({ children }: { children: JSX.Element[] }) => {
    return (
        <div className={`${styles.item__rows__header} grid`}>
            <span>Sr. No.</span>
            <span className={`${styles.ornament__list}`}>Ornament List</span>
            <span>No. of units</span>
            <span>Purity in carat</span>
            <span>Purity in percentage</span>
            <span>Weight in grams</span>
            <span>Approx value in rupees</span>
            {children}
        </div>
    )
}

export default ItemRows
