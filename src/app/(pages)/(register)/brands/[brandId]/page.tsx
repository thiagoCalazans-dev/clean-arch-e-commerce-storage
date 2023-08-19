import { BrandForm } from "@/client/components/forms/brand-form";

export default async function BrandPage({
  params,
}: {
  params: { brandId: string };
}) {
  const reponse = await fetch(
    `http://localhost:3000/api/brand/${params.brandId}`
  );
  const data = await reponse.json();
  console.log(data);

  return (
    <div className="flex-col ">
      <BrandForm initialData={data.data} />
    </div>
  );
}
