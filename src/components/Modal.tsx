import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import classNames from "classnames";
import { Button } from "./ui/button";

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  description: string;
  children?: React.ReactNode;
  renderConfirm?: () => React.ReactNode;
  hideOverflow?: boolean;
  confirm?: {
    label: string;
    disabled?: boolean;
    loading?: boolean;
    onClick: () => void;
  };
  noActions?: boolean;
};

export default function Modal({
  isOpen,
  title,
  description,
  children,
  closeModal,
  renderConfirm,
  confirm,
  hideOverflow = true,
  noActions = false,
}: ModalProps) {
  const { label, disabled, loading, onClick } = confirm || {};

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0  overflow-y-auto font-body">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={classNames(
                  "w-full max-w-3xl transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all",
                  {
                    "overflow-hidden": hideOverflow,
                  }
                )}
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{description}</p>
                  {children && <div className="mt-4">{children}</div>}
                </div>

                {!noActions && (
                  <div className="mt-4 flex flex-row justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        closeModal();
                      }}
                    >
                      Cancel
                    </Button>
                    {renderConfirm ? (
                      renderConfirm()
                    ) : (
                      <Button
                        disabled={loading || disabled}
                        loading={Boolean(loading)}
                        onClick={() => {
                          onClick && onClick();
                        }}
                      >
                        {label}
                      </Button>
                    )}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
