import { useState } from "react";
import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import ButtonInput from "../../components/atoms/ButtonInput";

interface ContactDetail {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export const AddContactDetailsForCampaignAlerts = ({savedContacts, setSavedContacts}: any) => {
  const [contactDetails, setContactDetails] = useState<Omit<ContactDetail, 'id'>>({
    name: "",
    email: "",
    phone: "",
  });
  const handleSaveContact = () => {
    if (!contactDetails.name || !contactDetails.email || !contactDetails.phone) {
      // You might want to add proper validation here
      return;
    }

    const newContact: ContactDetail = {
      ...contactDetails,
      id: Date.now().toString(),
    };

    setSavedContacts((prev: any) => [...prev, newContact]);
    
    // Reset form
    setContactDetails({
      name: "",
      email: "",
      phone: "",
    });
  };

  const handleRemoveContact = (id: string) => {
    setSavedContacts((prev: any) => prev.filter((contact: any) => contact.id !== id));
  };
  return (
    <div className="border rounded-[8px] p-4">
      <div className="flex items-center justify-between border-b pb-2">
        <div>
          <h1 className="text-[16px] font-semibold">Add contact details for campaign alerts</h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            type="button"
            className="text-[12px] text-primaryButton hover:underline"
            onClick={() => {
              // // Template 1: Fill with sample data
              // setContactDetails({
              //   name: "John Doe",
              //   email: "john.doe@example.com",
              //   phone: "+1234567890",
              // });
            }}
          >
            Template 1
          </button>
          <button 
            type="button"
            className="text-[12px] text-primaryButton hover:underline"
            onClick={() => {
              // // Template 2: Fill with different sample data
              // setContactDetails({
              //   name: "Jane Smith",
              //   email: "jane.smith@example.com",
              //   phone: "+1987654321",
              // });
            }}
          >
            Template 2
          </button>
        </div>
      </div>
      <div>
        {/* Display saved contacts */}
        {savedContacts.length > 0 && (
          <div className="py-4 border-b border-gray-100">
            <div className="space-y-2">
              {savedContacts.map((contact: any, i: any) => (
                <div 
                  key={i} 
                  className="grid grid-cols-12 gap-4 items-center"
                >
                  <div className="col-span-3 grid-cols-5 flex justify-start items-center gap-2">
                    <h1 className="text-[12px] col-span-1">
                      {i + 1}
                    </h1>
                    <div className="col-span-4 w-full">
                      <PrimaryInput
                        inputType="text"
                        height="h-[36px]"
                        placeholder="Name"
                        
                        value={contact.name || ''}
                        action={(value) => {}}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="col-span-3">
                    <PrimaryInput
                      inputType="text"
                      height="h-[36px]"
                      placeholder="Phone Number"
                      value={contact.phone || ''}
                      action={(value) => {}}
                      disabled={true}
                    />
                  </div>
                  <div className="col-span-3">
                    <PrimaryInput
                      inputType="text"
                      height="h-[36px]"
                      placeholder="Email"
                      value={contact.email || ''}
                      action={(value) => {}}
                      disabled={true}
                    />
                  </div>
                  <div className="col-span-1">
                    <ButtonInput 
                      variant="danger" 
                      size="small" 
                      className="h-[32px] w-full"
                      onClick={() => handleRemoveContact(contact.id)}
                    >
                      Remove
                    </ButtonInput>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-12 gap-4 my-4">
          <div className="col-span-3 grid-cols-5 flex justify-start items-center gap-2">
            <h1 className="text-[12px] col-span-1">
              {savedContacts.length + 1}
            </h1>
            <div className="col-span-4 w-full">
            <PrimaryInput
              inputType="text"
              height="h-[36px]"
              placeholder="Enter name"
              value={contactDetails.name || ''}
              action={(value) => {
                setContactDetails((prev: any) => {
                  return { ...prev, name: value }
                });
              }}
            />
            </div>
          </div>
          <div className="col-span-3">
            <PrimaryInput
              inputType="text"
              height="h-[36px]"
              placeholder="Enter Phone Number"
              value={contactDetails.phone || ''}
              action={(value) => {
                setContactDetails((prev: any) => {
                  return { ...prev, phone: value }
                });
              }}
            />
          </div>
          <div className="col-span-3">
            <PrimaryInput
              inputType="email"
              height="h-[36px]"
              placeholder="Enter Email"
              value={contactDetails.email || ''}
              action={(value) => {
                setContactDetails((prev: any) => {
                  return { ...prev, email: value }
                });
              }}
            />
          </div>
          <div className="col-span-1 flex items-center">
            <ButtonInput 
              variant="primary" 
              size="small" 
              className="h-[32px] w-full" 
              onClick={handleSaveContact}
              disabled={!contactDetails.name || !contactDetails.email || !contactDetails.phone}
            >
              Save
            </ButtonInput>
          </div>
        </div>
      </div>
      
      
    </div>
  )
}
