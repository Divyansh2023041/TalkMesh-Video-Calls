import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser, // this will run only when authUser is available
  });

  useEffect(() => {
   const initChat = async () => {
  if (!tokenData?.token || !authUser) return;

  try {
    console.log("Initializing stream chat client...");
    console.log("STREAM API KEY:", STREAM_API_KEY);

    const client = StreamChat.getInstance(STREAM_API_KEY);

    // 1. Connect only the current (auth) user
    await client.connectUser(
      {
        id: authUser._id,
        name: authUser.fullName,
        image: authUser.profilePic || "/default-avatar.png",
      },
      tokenData.token
    );
console.log("Upserting users:", authUser._id, targetUserId);

    // 🔥 2. Create BOTH users on Stream (this is what’s missing!)
    // await client.upsertUsers([
    //   {
    //     id: authUser._id,
    //     name: authUser.fullName,
    //     image: authUser.profilePic || "/default-avatar.png",
    //   },
    //   {
    //     id: targetUserId,
    //     name: "Unknown User",
    //     image: "/default-avatar.png",
    //   },
    // ]);

    // 3. Now safely create the channel
    const channelId = [authUser._id, targetUserId].sort().join("-");
    const currChannel = client.channel("messaging", channelId, {
      members: [authUser._id, targetUserId],
    });

    await currChannel.watch(); // 🔥 This will now work

    setChatClient(client);
    setChannel(currChannel);
  } catch (error) {
    console.error("Error initializing chat:", error);
    toast.error("Could not connect to chat. Please try again.");
  } finally {
    setLoading(false);
  }
};


    initChat();
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  };

  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};
export default ChatPage;