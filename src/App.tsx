import Div100vh from "react-div-100vh";
import { Navbar } from "./components/Header";
import { FormProvider, useForm } from "react-hook-form";

const App = () => {
  const methods = useForm();
  const { handleSubmit, register } = methods;

  const onSubmit = handleSubmit((values) => {
    console.log(values);
  });
  return (
    <Div100vh>
      <div className="flex h-full flex-col bg-black">
        <Navbar />
        <div className="flex flex-col gap-20 h-full w-full text-white terminal">
          <FormProvider {...methods}>
            <form
              onSubmit={onSubmit}
              className="m-2"
            >
              <div className="flex gap-2">
                <h1>guest@codele.dev</h1>
                <input
                  autoFocus
                  type="text"
                  className="appearance-none bg-transparent focus:outline-none selection:bg-white selection:text-black"
                  {...register("currentGuess")}
                />
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </Div100vh>
  );
};

export default App;
