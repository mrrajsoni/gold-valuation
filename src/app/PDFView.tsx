'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const DownloadPDF = dynamic(() => import('./PDFDownload'), { ssr: false })
const PDFDownloadLinkDynamic = dynamic(
    () => import('@react-pdf/renderer').then((value) => value.PDFDownloadLink),
    {
        ssr: false,
    },
)

const styles = StyleSheet.create({
    page: { backgroundColor: 'tomato' },
    section: { color: 'white', textAlign: 'center', margin: 30 },
})
const GeneratePdf = () => {
    return (
        <div>
            <PDFDownloadLinkDynamic
                document={
                    <Document>
                        <Page style={styles.page}>
                            <View style={styles.section}>
                                <Text>Aajaa meri</Text>
                            </View>
                        </Page>
                    </Document>
                }
                fileName="somename.pdf"
            >
                {({ loading }) =>
                    loading ? 'Loading document...' : 'Download now!'
                }
            </PDFDownloadLinkDynamic>
        </div>
    )
}
export default GeneratePdf
