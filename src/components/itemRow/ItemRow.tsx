import InvoiceInput from '@/components/input/InvoiceInput'
import styles from './itemrow.module.scss'
import { ornamentListKeys } from '../itemRows/ItemRows'
import ReactSelect from 'react-select'
import { ornamentOptions } from '@/constants/global'

interface ItemRowProps {
    units: string
    purityInCaratValue: string
    weight: string
    valuationPrice: string
    index: number
    onDeleteRow: (id: string) => void
    id: string
    purityInPercentageValue?: string
    option?: string
    onChange?: (
        value: string,
        index: number,
        key: keyof ornamentListKeys,
    ) => void
}
const ItemRow = ({
    units,
    purityInCaratValue,
    purityInPercentageValue,
    weight,
    valuationPrice,
    index,
    onChange,
    onDeleteRow,
    id,
}: ItemRowProps) => {
    const handleUnitChange = (unit: string, key: keyof ornamentListKeys) => {
        onChange && onChange(unit, index, key)
    }
    return (
        <div className={`${styles.item__row__container} grid relative`}>
            <span className={styles.item__row}>{index + 1}</span>
            <ReactSelect
                className={`${styles.item__row} ${styles.select__class}`}
                options={ornamentOptions}
                onChange={(newValue) =>
                    handleUnitChange(newValue?.label ?? '', 'listOfItems')
                }
                unstyled
            ></ReactSelect>
            <InvoiceInput
                type="number"
                value={units.toString()}
                extraClass={[styles.item__row, 'units']}
                onChange={(event) =>
                    handleUnitChange(event.target.value, 'quantity')
                }
            />
            <span>{purityInCaratValue.toString()}</span>
            <InvoiceInput
                value={purityInPercentageValue?.toString() ?? ''}
                extraClass={[styles.item__row, 'purity__in__percentage']}
                onChange={(event) =>
                    handleUnitChange(event.target.value, 'purityInPercentage')
                }
            />
            <InvoiceInput
                value={weight.toString()}
                extraClass={[styles.item__row, 'gross__weight']}
                onChange={(event) =>
                    handleUnitChange(event.target.value, 'weight')
                }
            />
            <span className={styles.item__row}>
                {valuationPrice.toString()}
            </span>
            {Number(id) > 1 && (
                <div
                    onClick={() => onDeleteRow(id)}
                    className={`absolute ${styles.delete__button}`}
                >
                    Del
                </div>
            )}
        </div>
    )
}

export default ItemRow
