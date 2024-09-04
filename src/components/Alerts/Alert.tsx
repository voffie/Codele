import { RxCheck, RxCross2 } from "react-icons/rx";
import { IoInformation } from "react-icons/io5";
import toast from "react-hot-toast";

function Alert({
  message,
  status,
  closeFunc,
}: {
  message: string;
  status: string;
  closeFunc: () => void;
}) {
  function getBorder(type: string) {
    if (type === "error") return " border-red";
    if (type === "success") return " border-green";
    if (type === "system") return " border-blue";
  }

  return (
    <section className={"rounded-md border p-2 shadow-md" + getBorder(status)}>
      <article
        className={
          "flex w-full justify-between border-b py-1" + getBorder(status)
        }
      >
        <aside className="flex items-center gap-2">
          {status === "error" && (
            <RxCross2 className="rounded-md bg-red text-black" />
          )}
          {status === "success" && (
            <RxCheck className="rounded-md bg-green text-black" />
          )}
          {status === "system" && (
            <IoInformation className="rounded-md bg-blue text-black" />
          )}
          {status.charAt(0).toUpperCase() + status.substring(1)}
        </aside>
        <button onClick={closeFunc}>
          <RxCross2 />
        </button>
      </article>
      <article className="w-full py-1">
        <p>{message}</p>
      </article>
    </section>
  );
}

export function successToast(message: string) {
  toast.custom(
    (t) => (
      <>
        <Alert
          message={message}
          status="success"
          closeFunc={() => toast.remove(t.id)}
        />
      </>
    ),
    { id: "success" },
  );
}

export function errorToast(message: string) {
  toast.custom(
    (t) => (
      <>
        <Alert
          message={message}
          status="error"
          closeFunc={() => toast.remove(t.id)}
        />
      </>
    ),
    { id: "error" },
  );
}
