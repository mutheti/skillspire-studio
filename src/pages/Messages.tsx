import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Send } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const conversations = [
  {
    id: '1',
    name: 'Sarah Wilson',
    role: 'Tutor',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b662?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'Great progress on your assignment!',
    time: '2 min ago',
    unread: 2
  },
  {
    id: '2',
    name: 'Study Group - Web Dev',
    role: 'Group',
    avatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'Anyone available for the study session tonight?',
    time: '1 hour ago',
    unread: 0
  }
];

const messages = [
  {
    id: '1',
    sender: 'Sarah Wilson',
    content: "Hi Alex! I reviewed your portfolio project and I'm really impressed with your work.",
    time: '2:30 PM',
    isMe: false
  },
  {
    id: '2',
    sender: 'Me',
    content: 'Thank you! I put a lot of effort into making it responsive.',
    time: '2:32 PM',
    isMe: true
  },
  {
    id: '3',
    sender: 'Sarah Wilson',
    content: 'Great progress on your assignment! The code structure is clean and well-organized.',
    time: '2:35 PM',
    isMe: false
  }
];

export default function Messages() {
  const { currentUser } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [selectedConversation, setSelectedConversation] = useState('1');

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole={currentUser?.role} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto h-full">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Messages</h1>
              <p className="text-muted-foreground">
                Communicate with tutors and classmates
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
              {/* Conversations List */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Conversations</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search conversations..." className="pl-10" />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors border-l-2 ${
                          selectedConversation === conversation.id
                            ? 'border-primary bg-muted/30'
                            : 'border-transparent'
                        }`}
                        onClick={() => setSelectedConversation(conversation.id)}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={conversation.avatar} />
                            <AvatarFallback>{conversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-sm truncate">{conversation.name}</h4>
                              <span className="text-xs text-muted-foreground">{conversation.time}</span>
                            </div>
                            <Badge variant="secondary" className="text-xs mb-1">
                              {conversation.role}
                            </Badge>
                            <p className="text-sm text-muted-foreground truncate">
                              {conversation.lastMessage}
                            </p>
                          </div>
                          {conversation.unread > 0 && (
                            <Badge className="h-5 w-5 p-0 text-xs flex items-center justify-center">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Chat Area */}
              <Card className="col-span-2 flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b662?w=150&h=150&fit=crop&crop=face" />
                      <AvatarFallback>SW</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">Sarah Wilson</CardTitle>
                      <p className="text-sm text-muted-foreground">Tutor • Online</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  {/* Messages */}
                  <div className="flex-1 space-y-4 py-4 overflow-y-auto">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.isMe
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs mt-1 opacity-70">{message.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="border-t pt-4">
                    <div className="flex gap-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && newMessage.trim()) {
                            setNewMessage('');
                          }
                        }}
                      />
                      <Button size="icon" disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}