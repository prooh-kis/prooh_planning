import { CAMPAIGN_PLANNER, CLIENT_POC_USER, SCREEN_OWNER } from "../../constants/userConstants";
import { useCallback, useEffect, useRef, useState } from "react";

export const DashboardViewSelectionPopup = ({
  open,
  onClose,
  onSelectView,
  type,
  data
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const views: any[] = 
    type === "vendor" && data?.length > 0 ? 
    [...new Map(data?.map((d: any) => [d.master, {
      id: d.master, 
      label: d.masterEmail, 
      value: d.masterEmail
    }])).values()] : 
    [
      { id: 'planner', label: 'Planner', value: CAMPAIGN_PLANNER },
      { id: 'client', label: 'Client', value: CLIENT_POC_USER },
      { id: 'vendor', label: 'Vendor', value: SCREEN_OWNER },
    ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
      onClose?.();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleViewSelect = (view: any) => {
    onSelectView?.(view);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="flex justify-center items-center">
        <button
          title="Select View"
          type="button"
          className="inline-flex items-center justify-center border border-gray-300 rounded-lg h-[38px] w-[38px] cursor-pointer"
          id="dashboard-view-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          {type === "vendor" ? (
            <i className="fi fi-br-user text-[12px] flex items-center justify-center text-[#129BFF]"></i>
          ) : (
            <i className="fi fi-sr-convert-shapes text-[12px] flex items-center justify-center text-[#129BFF]"></i>
          )}
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="dashboard-view-menu"
        >
          <div className="py-1" role="none">
            {views.map((view) => (
              <button
                key={view.id}
                onClick={() => handleViewSelect(view)}
                className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {view.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
