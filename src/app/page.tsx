'use client'

import Certification from '@/components/Certfication'
import CustomerDeclaration from '@/components/CustomerDeclaration'
import DateSignature from '@/components/DateSignature'
import GoldRate from '@/components/GoldRate'
import CompanyInfo from '@/components/companyInfo/CompanyInfo'
import CustomerInfo from '@/components/contactInfo/customerInfo/CustomerInfo'
import ItemRows from '@/components/itemRows/ItemRows'

import { FormEvent, useRef } from 'react'
import { Replicache, TEST_LICENSE_KEY, WriteTransaction } from 'replicache'
import { useSubscribe } from 'replicache-react'
import { nanoid } from 'nanoid'
import Pusher from 'pusher-js'

export type Message = {
    from: string
    content: string
    order: number
}

export type MessageWithID = Message & { id: string }

const rep = process.browser
    ? new Replicache({
          name: 'chat-user-id',
          licenseKey: TEST_LICENSE_KEY,
          pushURL: '/api/replicache-push',
          pullURL: '/api/replicache-pull',
          mutators: {
              async createMessage(
                  tx: WriteTransaction,
                  { id, from, content, order }: MessageWithID,
              ) {
                  await tx.set(`message/${id}`, {
                      from,
                      content,
                      order,
                  })
              },
          },
      })
    : null

listen()
export default function Home() {
    const messages = useSubscribe(
        rep,
        async (tx) => {
            const list = await tx
                .scan<Message>({ prefix: 'message/' })
                .entries()
                .toArray()
            list.sort(([, { order: a }], [, { order: b }]) => a - b)
            return list
        },
        { default: [] },
    )

    const usernameRef = useRef<HTMLInputElement>()
    const contentRef = useRef<HTMLInputElement>()

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (rep && usernameRef.current && contentRef.current) {
            const last = messages.length && messages[messages.length - 1][1]
            const order = (last?.order ?? 0) + 1

            rep &&
                rep.mutate.createMessage({
                    id: nanoid(),
                    from: usernameRef.current.value,
                    content: contentRef.current.value,
                    order,
                })
            contentRef.current.value = ''
        }
    }
    return (
        <main className="min-h-screen">
            <CompanyInfo />
            <GoldRate />
            <CustomerInfo />
            <Certification />
            <ItemRows />
            <CustomerDeclaration />
            <DateSignature />

            <form onSubmit={onSubmit}>
                <input ref={usernameRef} required /> says:{' '}
                <input ref={contentRef} required /> <input type="submit" />
            </form>
            <MessageList messages={messages} />
        </main>
    )
}

function MessageList({
    messages,
}: {
    messages: (readonly [string, Message])[]
}) {
    return messages.map(([k, v]) => {
        return (
            <div key={k}>
                <b>{v.from}: </b>
                {v.content}
            </div>
        )
    })
}

function listen() {
    // TODO: Listen for changes on server
}
