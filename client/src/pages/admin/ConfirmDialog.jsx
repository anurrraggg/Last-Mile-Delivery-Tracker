import Button from "../ui/Button";

const ConfirmDialog = ({
  open,
  title,
  message,
  onCancel,
  onConfirm,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl p-6 w-full max-w-md">

        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <p className="mt-3 text-gray-600">
          {message}
        </p>

        <div className="flex justify-end gap-3 mt-6">

          <Button
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={onConfirm}
          >
            Confirm
          </Button>

        </div>

      </div>

    </div>
  );
};

export default ConfirmDialog;