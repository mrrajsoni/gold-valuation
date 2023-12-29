import localFont from 'next/font/local'
export const areaRegular = localFont({
    src: '../../public/fonts/Area-Regular.woff2',
    display: 'swap',
    variable: '--body-font-regular',
})

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
