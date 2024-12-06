import { useState } from "react";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Label } from "./components/Label";
import { ReferenceTable } from "./components/ReferenceTable";
import { calculateIMC, imcResult } from "./lib/imc";
import { ResultsTable } from "./components/ResultsTable";

function App() {
  const [imcData, setImcData] = useState<null | {
    weight: number;
    height: number;
    imc: number;
    imcResult: string;
  }>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Get the input values
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData) as {
      weight: string;
      height: string;
    };

    // Handle empty fields
    const { weight, height } = data;
    if (!weight || !height) {
      alert("Preencha todos os campos");
      return;
    }

    // parse and handle string to number
    const weightNumber = parseFloat(weight.replace(",", "."));
    const heightNumber = parseFloat(height.replace(",", ".")) / 100;

    if (isNaN(weightNumber) || isNaN(heightNumber)) {
      alert("Preencha os campos com números válidos");
      return;
    }

    // handle invalid numbers
    if (weightNumber <= 2 || weightNumber >= 500) {
      alert("Peso inválido");
      return;
    }

    if (heightNumber < 0.5 || heightNumber > 2.5) {
      alert("Altura inválida");
      return;
    }

    // calculate imc
    const imc = calculateIMC(weightNumber, heightNumber);
    const imcResultString = imcResult(imc);
    console.log(imcResultString);

    // set result
    setImcData({
      weight: weightNumber,
      height: heightNumber,
      imc,
      imcResult: imcResultString,
    });

    // clear form
    event.currentTarget.reset();
  }

  function handleClickReset(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setImcData(null);
  }

  return (
    <main className="bg-white max-w-4xl mx-auto md:py-24 md:px-48 px-5 py-10">
      <section id="form">
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="weitght">Peso (kg)</Label>
            <Input
              disabled={!!imcData}
              name="weight"
              className="mt-1"
              type="text"
              id="weitght"
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="height">Altura (cm)</Label>
            <Input
              disabled={!!imcData}
              name="height"
              className="mt-1"
              type="text"
              id="height"
            />
          </div>
          {imcData ? (
            <Button type="button" onClick={handleClickReset}>
              Refazer
            </Button>
          ) : (
            <Button type="submit">Calcular</Button>
          )}
        </form>
      </section>

      <section id="result" className="py-10 px-4 h-40">
        {imcData ? (
          <ResultsTable imcData={imcData} />
        ) : (
          <p className="text-center text-neutral-400 text-xl">
            Saiba seu peso ideal.
          </p>
        )}
      </section>

      <section id="reference-table">
        <ReferenceTable />
      </section>
    </main>
  );
}

export default App;
