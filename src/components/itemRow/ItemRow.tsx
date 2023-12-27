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
}: ItemRowProps) => {
    const handleUnitChange = (unit: string, key: keyof ornamentListKeys) => {
        onChange && onChange(unit, index, key)
    }
    return (
        <>
            <div>{index + 1}</div>
            <ReactSelect
                options={ornamentOptions}
                onChange={(newValue) =>
                    handleUnitChange(newValue?.label ?? '', 'listOfItems')
                }
            ></ReactSelect>
            <InvoiceInput
                type="number"
                value={units.toString()}
                extraClass="units"
                onChange={(event) =>
                    handleUnitChange(event.target.value, 'quantity')
                }
            />
            <span>{purityInCaratValue.toString()}</span>
            <InvoiceInput
                value={purityInPercentageValue?.toString() ?? ''}
                extraClass="purity__in__percentage"
                onChange={(event) =>
                    handleUnitChange(event.target.value, 'purityInPercentage')
                }
            />
            <InvoiceInput
                value={weight.toString()}
                extraClass="gross__weight"
                onChange={(event) =>
                    handleUnitChange(event.target.value, 'weight')
                }
            />
            <span>{valuationPrice.toString()}</span>
        </>
    )
}

export default ItemRow
