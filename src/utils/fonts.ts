import localFont from 'next/font/local'

export const aeonikBold = localFont({
    src: '../../public/fonts/Aeonik-Bold.woff2',
    display: 'swap',
    variable: '--heading-font',
})

export const monaSansRegular = localFont({
    src: '../../public/fonts/MonaSans-Regular.woff2',
    display: 'swap',
    variable: '--mona-sans-regular',
})

export const monaSansBold = localFont({
    src: '../../public/fonts/MonaSans-Bold.woff2',
    display: 'swap',
    variable: '--mona-sans-bold',
})
