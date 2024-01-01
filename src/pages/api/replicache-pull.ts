import { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (_: NextApiRequest, res: NextApiResponse) {
    res.json({
        // We will discuss these two fields in later steps.
        lastMutationIDChanges: {},
        cookie: 42,
        patch: [
            {
                op: 'put',
                key: 'order/qpdgkvpb9ao',
                value: {
                    customerName: 'Hardika',
                    branchName: 'Viman Nagar',
                    goldRate: '4222',
                    order: 1,
                },
            },
        ],
    })
}
