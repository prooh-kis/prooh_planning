
interface EmailSendBoxProps {

}

export const EmailSendBox = ({}: EmailSendBoxProps) => {
  return (
    <div className="p-2">
      <div className="flex flex-col">
        <h1 className="font-semibold text-lg">
          2. Share this plan to client
        </h1>
        <div className="flex gap-2 pt-4">
          <input
            placeholder="Enter email"
            type="email"
            className="px-4 py-2 border border-1 border-#C3C3C3 rounded-md"
          />
          <button type="submit" className="px-4 py-2 border border-1 border-#C3C3C3 rounded-md bg-blue-400 text-white hover:bg-blue-600 text-md">
            Send
          </button>
        </div>
        <p className="p-1 pb-6 text-gray-500 text-[12px]">Send plan summary as pdf attachement in email</p>
      </div>
    </div>
  )
}