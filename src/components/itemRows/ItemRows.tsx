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
        <section className={styles.item__rows__container}>
            <ItemRowsHeader>
                {allOrnamentList.map((ornament, index) => {
                    return (
                        <>
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
                                key={index}
                            />
                        </>
                    )
                })}
            </ItemRowsHeader>

            <div className={`${styles.totals__row} grid`}>
                <span className={styles.total__text}>Total</span>
                <span className={styles.total__units}>{totals.units}</span>
                <span className={styles.total__weight}>
                    {totals.weightInGrams}
                </span>
                <span className={styles.total__net__weight}>
                    {totals.netWeight}
                </span>
                <span className={styles.total__carat__22__gold}>
                    {totals.carat22Gold}
                </span>
                <span className={styles.total__carat__24__gold}>
                    {totals.carat24Gold}
                </span>
                <span className={styles.total__price}>{totals.priceValue}</span>
            </div>
            <button onClick={addNewRow} type="button">
                Add New Row
            </button>
        </section>
    )
}

const ItemRowsHeader = ({ children }: { children: JSX.Element[] }) => {
    return (
        <div className={`${styles.item__rows__header} grid`}>
            {headerRowItems.map((headerItem) => {
                return (
                    <span key={headerItem.text} className={styles.header__span}>
                        {headerItem.text}
                    </span>
                )
            })}
            {children}
        </div>
    )
}

export default ItemRows
