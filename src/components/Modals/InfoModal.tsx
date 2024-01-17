import { BaseModal } from "./BaseModal";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal
      title="How to play"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <p className="text-sm text-gray-300">
        Guess the language in 5 tries. After each guess, the color of the text
        will change depending on how close your guess was to the word.
      </p>

      <div className="mt-4 flex justify-center flex-col gap-2 mx-2 items-center">
        <table className="border border-white-400 text-center">
          <thead>
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Release Year</th>
              <th className="p-2">Compiled</th>
              <th className="p-2">Object Oriented</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-green-300 p-2">Dart</td>
              <td className="text-green-300 p-2">2011</td>
              <td className="text-green-300 p-2">True</td>
              <td className="text-green-300 p-2">True</td>
            </tr>
          </tbody>
        </table>
        <p className="text-sm text-gray-300">
          In the example above all parts are correct
        </p>
        <table className="border border-white-400 text-center">
          <thead>
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Release Year</th>
              <th className="p-2">Compiled</th>
              <th className="p-2">Object Oriented</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-red-300 p-2">C#</td>
              <td className="text-red-300 p-2">2000</td>
              <td className="text-green-300 p-2">True</td>
              <td className="text-red-300 p-2">True</td>
            </tr>
          </tbody>
        </table>
        <p className="text-sm text-gray-300">
          In the example above some, but not all parts are correct
        </p>

        <table className="border border-white-400 text-center">
          <thead>
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Release Year</th>
              <th className="p-2">Compiled</th>
              <th className="p-2">Object Oriented</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-red-300 p-2">Bash</td>
              <td className="text-red-300 p-2">1989</td>
              <td className="text-red-300 p-2">False</td>
              <td className="text-red-300 p-2">False</td>
            </tr>
          </tbody>
        </table>
        <p className="text-sm text-gray-300">
          In the example above none of the parts are correct
        </p>
      </div>

      <p className="mt-4 text-sm italic text-gray-300">
        Made by{" "}
        <a
          href="https://github.com/voffiedev"
          className="font-bold underline"
        >
          VoffieDev
        </a>
      </p>
    </BaseModal>
  );
};
