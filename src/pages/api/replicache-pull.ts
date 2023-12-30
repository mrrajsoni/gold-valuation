import { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (_: NextApiRequest, res: NextApiResponse) {
    res.json({
        // We will discuss these two fields in later steps.
        lastMutationIDChanges: {},
        cookie: 42,
        patch: [
            { op: 'clear' },
            {
                op: 'put',
                key: 'message/qpdgkvpb9ao',
                value: {
                    from: 'Jane',
                    content: "Hey, what's for lunch?",
                    order: 1,
                },
            },
            {
                op: 'put',
                key: 'message/5ahljadc408',
                value: {
                    from: 'Fred',
                    content: 'tacos?',
                    order: 2,
                },
            },
        ],
    })
}
