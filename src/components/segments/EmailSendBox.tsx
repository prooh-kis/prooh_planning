import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import { isValidEmail } from "../../utils/valueValidate";
import { message } from "antd";
import ButtonInput from "../../components/atoms/ButtonInput";

interface EmailSendBoxProps {
  toEmail?: any;
  setToEmail?: any;
  sendEmail?: any;
  sendEmailToAll?: any;
  cc?: any;
  data?: any;
  type?: any;
  loading?: any;
  page?: any;
}

export const EmailSendBox = ({
  loading,
  page,
  cc,
  data,
  type,
  toEmail,
  setToEmail,
  sendEmail,
  sendEmailToAll,
}: EmailSendBoxProps) => {
  return (
    <div className="p-2">
      <div className="flex flex-col">
        <h1 className="font-semibold text-lg">
          {page === "VendorApproval" && "2."}Share this plan
        </h1>
        <div className="grid grid-cols-6 gap-2 pt-4">
          <div className="col-span-4">
            <PrimaryInput
              placeholder="Enter Email"
              value={toEmail}
              inputType="text" // Updated inputType to be more specific
              action={setToEmail} // Updated action type to be more specific
              rounded="rounded-[8px]"
            />
          </div>
          <div className="col-span-2">
            <ButtonInput
              variant="primary"
              disabled={loading}
              size="large"
              loadingText="Sending...."
              icon={<i className="fi fi-rs-paper-plane"></i>}
              onClick={() => {
                if (isValidEmail(toEmail)) sendEmail(toEmail);
                else message.error("Please Enter valid email");
              }}
            >
              Send Email
            </ButtonInput>
          </div>
        </div>
        {page !== "VendorApproval" ? (
          <div className="py-4 flex items-center gap-2">
            <p className="text-gray-500 text-[14px] truncate">
              Click here to send request for email confirmation to vendor
            </p>
            <i
              className="cursor-pointer fi fi-ss-paper-plane text-primaryButton text-[14px] flex items-center"
              onClick={() => {
                message.info("Sending email to all vendors...");
                sendEmailToAll();
              }}
            ></i>
          </div>
        ) : (
          <div className="py-4 flex items-center gap-2">
            <p className="text-gray-500 text-[14px] truncate">
              Send email to client for budget approval with selected attachments
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
