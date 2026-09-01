import { useMessage } from "../../context/Message.context";

const Message = () => {
  const { message } = useMessage();

  console.log("MESSAGE COMPONENT:", message);

  if (!message.text) return null;

  return (
    <div
      className={`fixed top-5 right-5 z-50 p-4 rounded ${
        message.type === "success"
          ? "bg-green-500"
          : "bg-red-500"
      }`}
    >
      {message.text}
    </div>
  );
};

export default Message;