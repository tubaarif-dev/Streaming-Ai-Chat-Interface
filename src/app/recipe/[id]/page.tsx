export default async function DynamicItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="p-8 max-w-xl mx-auto rounded-xl border border-slate-800 bg-slate-900/30 text-center space-y-2">
      <h1 className="text-xl font-bold">Dynamic Details Screen</h1>
      <p className="text-sm text-slate-400">
        Viewing item ID parameter: <span className="font-mono text-indigo-400">{id}</span>
      </p>
    </div>
  );
}