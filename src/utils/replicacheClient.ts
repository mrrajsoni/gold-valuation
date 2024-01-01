import { InvoiceOrderWithID } from '@/app/page'
import { Replicache, TEST_LICENSE_KEY, WriteTransaction } from 'replicache'
import { nanoid } from 'nanoid'

export const replicacheInstance = process.browser
    ? new Replicache({
          name: 'invoice-order',
          licenseKey: TEST_LICENSE_KEY,
          pushURL: '/api/replicache-push',
          pullURL: '/api/replicache-pull',
          mutators: {
              async addBranchName(
                  tx: WriteTransaction,
                  { branchName }: { branchName: string },
              ) {
                  await tx.set(`order/${1}`, {
                      branchName,
                  })
              },
              async customerName(
                  tx: WriteTransaction,
                  { customerName }: { customerName: string },
              ) {
                  await tx.set(`order/${1}`, {
                      customerName,
                  })
              },
              async goldRate(
                  tx: WriteTransaction,
                  { goldRate }: { goldRate: string },
              ) {
                  await tx.set(`order/${1}`, {
                      goldRate,
                  })
              },
          },
      })
    : null
