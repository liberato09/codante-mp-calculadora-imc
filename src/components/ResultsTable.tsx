import { formatNumber } from "../lib/utils";

export function ResultsTable({
  imcData,
}: {
  imcData: { weight: number; height: number; imc: number; imcResult: string };
}) {
  return (
    <table className="text-center text-sm md:text-base md:[&>tbody>tr>td]:p-2 md:[&>tbody>tr>td]:px-4 [&>tbody>tr>td]:px-2 text-neutral-600 mx-auto">
      <tbody>
        <tr className="font-bold border-b border-b-rose-400">
          <td>Peso</td>
          <td>Altura</td>
          <td>IMC</td>
          <td>Resultado</td>
        </tr>
        <tr>
          <td>{formatNumber(imcData.weight)} kg</td>
          <td>{formatNumber(imcData.height * 100, 0)} cm</td>
          <td>{formatNumber(imcData.imc)}</td>
          <td>{imcData.imcResult}</td>
        </tr>
      </tbody>
    </table>
  );
}
