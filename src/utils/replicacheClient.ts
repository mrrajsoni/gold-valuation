import { Replicache, TEST_LICENSE_KEY, WriteTransaction } from 'replicache'
import { ornamentListKeys } from '@/components/itemRows/ItemRows'

export const replicacheInstance = process.browser
    ? new Replicache({
          name: 'invoice-order',
          licenseKey: TEST_LICENSE_KEY,
          pullURL: '/api/replicache-pull',
          mutators: {
              async addBranchName(
                  tx: WriteTransaction,
                  { branchName }: { branchName: string },
              ) {
                  const prev = await tx.get<any>('order/1')

                  if (prev) {
                      const newValues = { ...prev, branchName }
                      await tx.set(`order/${1}`, newValues)
                  } else {
                      await tx.set(`order/${1}`, {
                          branchName,
                      })
                  }
              },
              async customerName(
                  tx: WriteTransaction,
                  { customerName }: { customerName: string },
              ) {
                  const prev = await tx.get<any>('order/1')
                  if (prev) {
                      const newValues = { ...prev, customerName }
                      await tx.set(`order/${1}`, newValues)
                  } else {
                      await tx.set(`order/${1}`, {
                          customerName,
                      })
                  }
              },
              async goldRate(
                  tx: WriteTransaction,
                  { goldRate }: { goldRate: string },
              ) {
                  const prev = await tx.get<any>('order/1')
                  if (prev) {
                      const newValues = { ...prev, goldRate }

                      await tx.set(`order/${1}`, newValues)
                  } else {
                      await tx.set(`order/${1}`, {
                          goldRate,
                      })
                  }
              },
              async customerMobile(
                  tx: WriteTransaction,
                  { customerMobile }: { customerMobile: string },
              ) {
                  const prev = await tx.get<any>('order/1')
                  if (prev) {
                      const newValues = { ...prev, customerMobile }
                      await tx.set(`order/${1}`, newValues)
                  } else {
                      await tx.set(`order/${1}`, {
                          customerMobile,
                      })
                  }
              },
              async customerAddress(
                  tx: WriteTransaction,
                  { customerAddress }: { customerAddress: string },
              ) {
                  const prev = await tx.get<any>('order/1')
                  if (prev) {
                      const newValues = { ...prev, customerAddress }
                      await tx.set(`order/${1}`, newValues)
                  } else {
                      await tx.set(`order/${1}`, {
                          customerAddress,
                      })
                  }
              },
              async addOrnaments(
                  tx: WriteTransaction,
                  { ornaments }: { ornaments: ornamentListKeys[] },
              ) {
                  const prev = await tx.get<any>('order/1')
                  if (prev) {
                      const newValues = { ...prev, ornamentList: ornaments }
                      await tx.set(`order/${1}`, newValues)
                  } else {
                      await tx.set(`order/${1}`, {
                          ornaments,
                      })
                  }
              },
          },
      })
    : null
