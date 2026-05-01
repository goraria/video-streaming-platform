"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Phone, 
  Video, 
  MoreVertical, 
  Paperclip, 
  Smile, 
  Send,
  Star,
  Archive,
  Trash2
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils'
// import { ChatMessageItem } from '@/components/chat-message'
import { useChatScroll } from '@/hooks/use-chat-scroll'
import {
  type ChatMessage,
  useConversationChat,
  useConversationList,
  useRealtimeChat,
} from '@/hooks/use-realtime-chat'
import { useUser } from '@/hooks/use-user'
import type { Conversation, Message } from '@/lib/interfaces'
import { UserRole } from '@/lib/interfaces'
import { formatMessageTime, formatRelativeTime } from '@/lib/utils/formatters'

interface RealtimeChatProps {
  roomName: string
  username: string
  onMessage?: (messages: ChatMessage[]) => void
  messages?: ChatMessage[]
}

/**
 * Realtime chat component
 * @param roomName - The name of the room to join. Each room is a unique chat.
 * @param username - The username of the user
 * @param onMessage - The callback function to handle the messages. Useful if you want to store the messages in a database.
 * @param messages - The messages to display in the chat. Useful if you want to display messages from a database.
 * @returns The chat component
 */
export function RealtimeChat({
  roomName,
  username,
  onMessage,
  messages: initialMessages = [],
}: RealtimeChatProps) {
  const { containerRef, scrollToBottom } = useChatScroll()

  const {
    messages: realtimeMessages,
    sendMessage,
    isConnected,
  } = useRealtimeChat({
    roomName,
    username,
  })
  const [newMessage, setNewMessage] = useState('')

  // Merge realtime messages with initial messages
  const allMessages = useMemo(() => {
    const mergedMessages = [...initialMessages, ...realtimeMessages]
    // Remove duplicates based on message id
    const uniqueMessages = mergedMessages.filter(
      (message, index, self) => index === self.findIndex((m) => m.id === message.id)
    )
    // Sort by creation date
    const sortedMessages = uniqueMessages.sort((a, b) => a.createdAt.localeCompare(b.createdAt))

    return sortedMessages
  }, [initialMessages, realtimeMessages])

  useEffect(() => {
    if (onMessage) {
      onMessage(allMessages)
    }
  }, [allMessages, onMessage])

  useEffect(() => {
    // Scroll to bottom whenever messages change
    scrollToBottom()
  }, [allMessages, scrollToBottom])

  const handleSendMessage = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!newMessage.trim() || !isConnected) return

      sendMessage(newMessage)
      setNewMessage('')
    },
    [newMessage, isConnected, sendMessage]
  )

  return (
    <div className="flex flex-col h-full w-full bg-background text-foreground antialiased">
      {/* Messages */}
      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {allMessages.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground">
            No messages yet. Start the conversation!
          </div>
        ) : null}
        <div className="space-y-1">
          {allMessages.map((message, index) => {
            const prevMessage = index > 0 ? allMessages[index - 1] : null
            const showHeader = !prevMessage || prevMessage.user.name !== message.user.name

            return (
              <div
                key={message.id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-300"
              >
                <ChatMessageItem
                  message={message}
                  isOwnMessage={message.user.name === username}
                  showHeader={showHeader}
                />
              </div>
            )
          })}
        </div>
      </div>

      <form onSubmit={handleSendMessage} className="flex w-full gap-2 border-t border-border p-4">
        <Input
          className={cn(
            'rounded-full bg-background text-sm transition-all duration-300',
            isConnected && newMessage.trim() ? 'w-[calc(100%-36px)]' : 'w-full'
          )}
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={!isConnected}
        />
        {isConnected && newMessage.trim() && (
          <Button
            className="aspect-square rounded-full animate-in fade-in slide-in-from-right-4 duration-300"
            type="submit"
            disabled={!isConnected}
          >
            <Send className="size-4" />
          </Button>
        )}
      </form>
    </div>
  )
}

interface ChatMessageItemProps {
  message: ChatMessage
  isOwnMessage: boolean
  showHeader: boolean
}

export function ChatMessageItem({ message, isOwnMessage, showHeader }: ChatMessageItemProps) {
  return (
    <div className={`flex mt-2 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div
        className={cn('max-w-[75%] w-fit flex flex-col gap-1', {
          'items-end': isOwnMessage,
        })}
      >
        {showHeader && (
          <div
            className={cn('flex items-center gap-2 text-xs px-3', {
              'justify-end flex-row-reverse': isOwnMessage,
            })}
          >
            <span className={'font-medium'}>{message.user.name}</span>
            <span className="text-foreground/50 text-xs">
              {formatMessageTime(message.createdAt, { locales: 'en-US', hour12: true })}
            </span>
          </div>
        )}
        <div
          className={cn(
            'py-2 px-3 rounded-xl text-sm w-fit',
            isOwnMessage ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
          )}
        >
          {message.content}
        </div>
      </div>
    </div>
  )
}

export type ConversationHeader = {
  conversationId?: string | null
  name: string
  avatarUrl?: string | null
  isOnline?: boolean
}

export type UserLite = {
  id?: string | null
  firstName?: string | null
  lastName?: string | null
  fullName?: string | null
  email?: string | null
  avatarUrl?: string | null
  imageUrl?: string | null
  isOnline?: boolean
}

export type MessageRecord = Message & {
  sender?: UserLite | null
}

export type ConversationWithRelations = Conversation & {
  customer?: UserLite | null
  staff?: UserLite | null
  restaurant?: {
    id?: string | null
    name?: string | null
    logoUrl?: string | null
  } | null
  messages?: MessageRecord[]
}

export type ChatParticipant = {
  id?: string | null
  name: string
  avatarUrl?: string | null
  isOnline?: boolean
}

const getUserDisplayName = (user?: UserLite | null) => {
  if (!user) return 'Người dùng'
  const fullName =
    user.fullName ||
    [user.firstName, user.lastName].filter(Boolean).join(' ').trim() ||
    user.email ||
    'Người dùng'
  return fullName
}

export const getConversationParticipant = (
  conversation: ConversationWithRelations | null,
  currentUserId: string
) => {
  if (!conversation) return null
  const isCustomer = conversation.customerId === currentUserId

  if (isCustomer) {
    if (conversation.staff) {
      return {
        id: conversation.staff.id ?? null,
        name: getUserDisplayName(conversation.staff),
        avatarUrl: conversation.staff.avatarUrl ?? null,
        isOnline: conversation.staff.isOnline,
      }
    }
    if (conversation.restaurant) {
      return {
        id: conversation.restaurant.id ?? null,
        name: conversation.restaurant.name || 'Nhà hàng',
        avatarUrl: conversation.restaurant.logoUrl ?? null,
        isOnline: true,
      }
    }
  } else {
    if (conversation.customer) {
      return {
        id: conversation.customer.id ?? null,
        name: getUserDisplayName(conversation.customer),
        avatarUrl: conversation.customer.avatarUrl ?? null,
        isOnline: conversation.customer.isOnline,
      }
    }
    if (conversation.staff) {
      return {
        id: conversation.staff.id ?? null,
        name: getUserDisplayName(conversation.staff),
        avatarUrl: conversation.staff.avatarUrl ?? null,
        isOnline: conversation.staff.isOnline,
      }
    }
  }

  return {
    id: null,
    name: conversation.title || 'Cuộc trò chuyện',
    avatarUrl: null,
    isOnline: false,
  }
}

export const getConversationLabel = (
  conversation: ConversationWithRelations,
  currentUserId: string
) => {
  const participant = getConversationParticipant(conversation, currentUserId)
  return participant?.name ?? 'Cuộc trò chuyện'
}


const StatusIndicator = ({ isOnline }: { isOnline?: boolean }) => {
  const color = isOnline ? 'bg-green-500' : 'bg-gray-400'

  return (
    <div className={`w-3 h-3 rounded-full ${color} border-2 border-white absolute -bottom-0.5 -right-0.5`} />
  )
}

export const ConversationItem = ({
  conversation,
  isActive,
  action,
  currentUserId,
}: {
  conversation: ConversationWithRelations
  isActive: boolean
  action: () => void
  currentUserId: string
}) => {
  const otherParty = getConversationParticipant(conversation, currentUserId)
  const messages = conversation.messages ?? []
  const lastMessage = messages[messages.length - 1]
  const lastMessageText = lastMessage?.content || conversation.title || 'Chưa có tin nhắn'
  const lastTime =
    conversation.lastMessageAt ||
    (lastMessage ? (lastMessage.createdAt as unknown as Date) : null)
  const unreadCount = messages.filter(
    (message) => !message.isRead && message.senderId !== currentUserId
  ).length

  return (
    <div
      className={cn(
        'flex items-center gap-2 p-2 mx-2 rounded-md cursor-pointer transition-colors',
        isActive ? 'bg-professional-main/24' : 'hover:bg-sidebar-accent'
      )}
      onClick={action}
    >
      <div className="relative">
        <Avatar className="w-12 h-12">
          <AvatarImage src={otherParty?.avatarUrl || undefined} alt={otherParty?.name} />
          <AvatarFallback>{otherParty?.name?.charAt(0) ?? 'U'}</AvatarFallback>
        </Avatar>
        <StatusIndicator isOnline={otherParty?.isOnline} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm truncate">{otherParty?.name ?? 'Cuộc trò chuyện'}</h4>
          <span className="text-xs text-gray-500">
            {formatRelativeTime(lastTime)}
          </span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-gray-600 truncate">
            {lastMessage?.senderId === currentUserId ? 'Bạn: ' : ''}
            {lastMessageText}
          </p>
          {unreadCount > 0 && (
            <Badge variant="default" className="ml-2 px-2 py-0.5 text-xs">
              {unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}

const MessageBubble = ({
  message,
  isOwn,
  otherParty,
  currentUser,
}: {
  message: MessageRecord
  isOwn: boolean
  otherParty: ChatParticipant
  currentUser: ChatParticipant
}) => {
  return (
    <div className={`flex gap-2 mb-4 ${isOwn ? 'justify-end' : 'justify-start'}`}>
      {!isOwn && (
        <Avatar className="w-8 h-8 mt-1">
          <AvatarImage src={otherParty.avatarUrl || undefined} alt={otherParty.name} />
          <AvatarFallback>{otherParty.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )}

      <div className={`max-w-xs lg:max-w-md ${isOwn ? 'order-1' : 'order-2'}`}>
        <div
          className={`px-4 py-2 rounded-2xl ${
            isOwn
              ? 'bg-blue-500 text-white rounded-br-md'
              : 'bg-gray-100 text-gray-900 rounded-bl-md'
          }`}
        >
          <p className="text-sm">{message.content}</p>
        </div>
        <div className={`flex items-center gap-2 mt-1 ${isOwn ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs text-gray-500">
            {formatMessageTime(message.createdAt)}
          </span>
          {isOwn && (
            <div className="flex">
              <div className="w-4 h-4 text-blue-500">
                <svg viewBox="0 0 16 16" fill="currentColor">
                  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>

      {isOwn && (
        <Avatar className="w-8 h-8 mt-1 order-2">
          <AvatarImage src={currentUser.avatarUrl || undefined} alt={currentUser.name} />
          <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

const ChatHeader = ({ user }: { user?: ChatParticipant | null }) => {
  if (!user) return null

  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.avatarUrl || undefined} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <StatusIndicator isOnline={user.isOnline} />
        </div>
        <div>
          <h3 className="font-medium">{user.name}</h3>
          <p className="text-sm text-gray-500">
            {user.isOnline ? 'Đang hoạt động' : 'Không hoạt động'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Phone className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Video className="w-4 h-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Star className="w-4 h-4 mr-2" />
              Đánh dấu quan trọng
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Archive className="w-4 h-4 mr-2" />
              Lưu trữ
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="w-4 h-4 mr-2" />
              Xóa cuộc trò chuyện
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

const MessageInput = ({
  onSend,
  disabled = false,
  isSending = false,
}: {
  onSend: (message: string) => Promise<boolean> | boolean
  disabled?: boolean
  isSending?: boolean
}) => {
  const [message, setMessage] = useState('')
  const canSend = message.trim().length > 0 && !disabled && !isSending

  const handleSend = useCallback(async () => {
    if (!canSend) return
    const content = message.trim()
    const result = await onSend(content)
    if (result !== false) {
      setMessage('')
    }
  }, [canSend, message, onSend])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      void handleSend()
    }
  }

  return (
    <div className="p-4 border-t bg-white">
      <div className="flex items-end gap-2">
        <Button variant="ghost" size="icon" disabled={disabled}>
          <Paperclip className="w-4 h-4" />
        </Button>

        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nhập tin nhắn..."
            className="pr-10"
            disabled={disabled}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2"
            disabled={disabled}
          >
            <Smile className="w-4 h-4" />
          </Button>
        </div>

        <Button onClick={() => void handleSend()} disabled={!canSend}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

interface MessageAppProps {
  initialConversationId?: string
  hideChatHeader?: boolean
  onConversationChange?: (header: ConversationHeader | null) => void
}

// export const MessageApp = ({
//   initialConversationId,
//   hideChatHeader = false,
//   onConversationChange,
// }: MessageAppProps) => {
//   const [selectedConversation, setSelectedConversation] = useState<string | null>(
//     initialConversationId || null
//   )
//   const [searchQuery, setSearchQuery] = useState('')
//   const { user } = useUser()
//   const currentUserId = user?.id ?? ''
//   const currentUserInfo = useMemo<ChatParticipant>(() => {
//     const fallbackName = user ? getUserDisplayName(user as UserLite) : 'Bạn'
//     return {
//       id: currentUserId || null,
//       name: fallbackName,
//       avatarUrl: (user as UserLite | undefined)?.avatarUrl ?? (user as UserLite | undefined)?.imageUrl ?? null,
//       isOnline: true,
//     }
//   }, [currentUserId, user])
//
//   const {
//     conversations,
//     isLoading: isLoadingConversations,
//     error: conversationsError,
//     refresh,
//   } = useConversationList({
//     userId: currentUserId || null,
//     role: (user?.role as UserRole | null) ?? null,
//   })
//
//   useEffect(() => {
//     if (initialConversationId) {
//       setSelectedConversation(initialConversationId)
//     }
//   }, [initialConversationId])
//
//   useEffect(() => {
//     if (!selectedConversation && conversations.length > 0) {
//       setSelectedConversation(conversations[0].id)
//     }
//   }, [conversations, selectedConversation])
//
//   const {
//     conversation,
//     messages,
//     isLoading: isLoadingMessages,
//     error: messagesError,
//     isSending,
//     sendMessage,
//     refresh: refreshConversation,
//   } = useConversationChat({
//     conversationId: selectedConversation,
//     userId: currentUserId || null,
//   })
//
//   const otherParty = useMemo(
//     () => getConversationParticipant(conversation, currentUserId),
//     [conversation, currentUserId]
//   )
//
//   const headerInfo = useMemo<ConversationHeader | null>(() => {
//     if (!selectedConversation || !otherParty) return null
//     return {
//       conversationId: selectedConversation,
//       name: otherParty.name,
//       avatarUrl: otherParty.avatarUrl ?? null,
//       isOnline: otherParty.isOnline,
//     }
//   }, [selectedConversation, otherParty])
//
//   useEffect(() => {
//     if (!onConversationChange) return
//     onConversationChange(headerInfo)
//   }, [headerInfo, onConversationChange])
//
//   const normalizedQuery = searchQuery.trim().toLowerCase()
//   const filteredConversations = useMemo(() => {
//     if (!normalizedQuery) return conversations
//     return conversations.filter((conv) =>
//       getConversationLabel(conv as ConversationWithRelations, currentUserId)
//         .toLowerCase()
//         .includes(normalizedQuery)
//     )
//   }, [conversations, currentUserId, normalizedQuery])
//
//   const handleSendMessage = useCallback(
//     async (content: string) => {
//       await sendMessage(content)
//     },
//     [sendMessage]
//   )
//
//   const bottomRef = useRef<HTMLDivElement>(null)
//
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }, [messages])
//
//   return (
//     <div className="flex h-full bg-white rounded-lg shadow-sm border overflow-hidden">
//       <div className="w-80 border-r flex flex-col">
//         <div className="p-4 border-b">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold">Tin nhắn</h2>
//             <Button variant="ghost" size="icon">
//               <MoreVertical className="w-4 h-4" />
//             </Button>
//           </div>
//
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <Input
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Tìm kiếm cuộc trò chuyện..."
//               className="pl-9"
//             />
//           </div>
//         </div>
//
//         <ScrollArea className="flex-1">
//           <div className="divide-y">
//             {isLoadingConversations && filteredConversations.length === 0 ? (
//               <div className="p-4 text-sm text-muted-foreground">
//                 Đang tải cuộc trò chuyện...
//               </div>
//             ) : conversationsError ? (
//               <div className="p-4 space-y-2">
//                 <p className="text-sm text-destructive">{conversationsError}</p>
//                 <Button size="sm" variant="outline" onClick={refresh}>
//                   Thử lại
//                 </Button>
//               </div>
//             ) : filteredConversations.length > 0 ? (
//               filteredConversations.map((conversationItem) => (
//                 <ConversationItem
//                   key={conversationItem.id}
//                   conversation={conversationItem as ConversationWithRelations}
//                   isActive={selectedConversation === conversationItem.id}
//                   onClick={() => setSelectedConversation(conversationItem.id)}
//                   currentUserId={currentUserId}
//                 />
//               ))
//             ) : (
//               <div className="p-4 text-sm text-muted-foreground">
//                 Không có cuộc trò chuyện.
//               </div>
//             )}
//           </div>
//         </ScrollArea>
//       </div>
//
//       <div className="flex-1 flex flex-col">
//         {selectedConversation ? (
//           <>
//             {!hideChatHeader && <ChatHeader user={otherParty ?? undefined} />}
//
//             <ScrollArea className="flex-1 p-4">
//               {isLoadingMessages && messages.length === 0 ? (
//                 <div className="text-center text-sm text-muted-foreground">
//                   Đang tải tin nhắn...
//                 </div>
//               ) : messagesError ? (
//                 <div className="flex flex-col items-center gap-2 text-sm text-destructive">
//                   <p>{messagesError}</p>
//                   <Button size="sm" variant="outline" onClick={refreshConversation}>
//                     Thử lại
//                   </Button>
//                 </div>
//               ) : messages.length === 0 ? (
//                 <div className="text-center text-sm text-muted-foreground">
//                   Chưa có tin nhắn. Hãy bắt đầu cuộc trò chuyện!
//                 </div>
//               ) : (
//                 <div className="space-y-1">
//                   {messages.map((message) => (
//                     <MessageBubble
//                       key={message.id}
//                       message={message}
//                       isOwn={message.senderId === currentUserId}
//                       otherParty={otherParty ?? { name: 'Cuộc trò chuyện' }}
//                       currentUser={currentUserInfo}
//                     />
//                   ))}
//                   <div ref={bottomRef} />
//                 </div>
//               )}
//             </ScrollArea>
//
//             <MessageInput
//               onSend={handleSendMessage}
//               disabled={!currentUserId || !selectedConversation}
//               isSending={isSending}
//             />
//           </>
//         ) : (
//           <div className="flex-1 flex items-center justify-center">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Search className="w-8 h-8 text-gray-400" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">
//                 Chọn một cuộc trò chuyện
//               </h3>
//               <p className="text-gray-500">
//                 Chọn cuộc trò chuyện từ danh sách bên trái để bắt đầu nhắn tin
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
