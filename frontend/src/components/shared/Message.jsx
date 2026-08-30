
const Message = ({ type, message }) => {
  if (!message) return null;

  const styles =
    type === "success"
      ? "bg-green-100 text-green-700 border-green-300"
      : "bg-red-100 text-red-700 border-red-300";

  return (
    <div className={`border rounded-md px-4 py-3 text-sm ${styles}`}>
      {message}
    </div>
  );
};

export default Message;

