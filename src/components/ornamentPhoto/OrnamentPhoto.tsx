'use client'

import Uploader from '../uploader/Uploader'
import styles from './ornamentPhoto.module.scss'
import Image from 'next/image'
import ImagePlaceholder from '../../../public/images/image.svg'
import { useEffect, useRef, useState } from 'react'
const OrnamentPhoto = () => {
    const [selectedFile, setSelectedFile] = useState<File>()
    const [preview, setPreview] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const handleUploaderClick = () => {
        inputRef.current?.click()
    }
    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        setSelectedFile(e.target.files[0])
    }

    useEffect(() => {
        if (!selectedFile) {
            setPreview('')
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])
    return (
        <div onClick={handleUploaderClick} className={styles.ornament__photo}>
            {!preview && (
                <div>
                    <Image
                        src={ImagePlaceholder}
                        alt="upload-placeholder-icon"
                    />
                    <h3>Add ornament photo</h3>
                </div>
            )}
            <Uploader onChange={onSelectFile} ref={inputRef} />

            {preview && (
                <div className={styles.preview__image__wrapper}>
                    <Image
                        src={preview}
                        width={300}
                        height={200}
                        alt="preview-image"
                    />
                </div>
            )}
        </div>
    )
}

export default OrnamentPhoto
