import { BaseModal } from "./BaseModal";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-300">
        Guess the language in 5 tries. After each guess, the color of the text
        will change depending on how close your guess was to the word.
      </p>

      <div className="mx-2 mt-4 flex flex-col items-center justify-center gap-2">
        <table className="border-white-400 border text-center">
          <thead>
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Release Year</th>
              <th className="p-2">Compiled</th>
              <th className="p-2">Object Oriented</th>
              <th className="p-2">Typed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 text-green-300">Dart</td>
              <td className="p-2 text-green-300">2011</td>
              <td className="p-2 text-green-300">True</td>
              <td className="p-2 text-green-300">True</td>
              <td className="p-2 text-green-300">Static</td>
            </tr>
          </tbody>
        </table>
        <p className="text-sm text-gray-300">
          In the example above all parts are correct
        </p>
        <table className="border-white-400 border text-center">
          <thead>
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Release Year</th>
              <th className="p-2">Compiled</th>
              <th className="p-2">Object Oriented</th>
              <th className="p-2">Typed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 text-red-300">C#</td>
              <td className="p-2 text-red-300">2000</td>
              <td className="p-2 text-green-300">True</td>
              <td className="p-2 text-red-300">True</td>
              <td className="p-2 text-green-300">Static</td>
            </tr>
          </tbody>
        </table>
        <p className="text-sm text-gray-300">
          In the example above some, but not all parts are correct
        </p>

        <table className="border-white-400 border text-center">
          <thead>
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Release Year</th>
              <th className="p-2">Compiled</th>
              <th className="p-2">Object Oriented</th>
              <th className="p-2">Typed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 text-red-300">Bash</td>
              <td className="p-2 text-red-300">1989</td>
              <td className="p-2 text-red-300">False</td>
              <td className="p-2 text-red-300">False</td>
              <td className="p-2 text-red-300">Static</td>
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
          href="https://github.com/voffie"
          className="font-bold underline"
          target="_blank"
        >
          Voffie
        </a>
      </p>
    </BaseModal>
  );
};
