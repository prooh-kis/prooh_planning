

interface RadioInputProps {
  option: string;
  value: string;
  title: string;
  handleClick: any;  // Updated action type to be more specific
}


export const RadioInput = ({ option, value, title, handleClick }: RadioInputProps) => {
  return (
    <label className="inline-flex items-center">
      <input
        type="radio"
        value={value}
        defaultChecked={option === value}
        onChange={handleClick}
        className="h-4 w-4 border border-gray-300 rounded-full checked:bg-green-600 checked:border-gray-600 transition duration-200"
      />
      <span className="ml-2 text-primaryText text-[14px]">{title}</span>
    </label>
  )
}