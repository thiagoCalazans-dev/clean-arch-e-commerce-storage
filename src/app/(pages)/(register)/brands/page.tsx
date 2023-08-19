import { BrandsClientPage } from "./client";

export default async function BrandsPage() {
  const reponse = await fetch("http://localhost:3000/api/brand");
  const { data } = await reponse.json();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BrandsClientPage data={data} />
      </div>
    </div>
  );
}
