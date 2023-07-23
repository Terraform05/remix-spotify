export function SectionCard({ children, id }: {children: React.ReactNode, id: string}) {
  return (
    <>
      <div className="mx-auto max-w-7xl py-6 justify-center items-center" id={id}>
        <div className="relative isolate overflow-hidden bg-gray-800 px-6 shadow-2xl sm:rounded-3xl">
          {" "}
          {children}
        </div>
      </div>
    </>
  );
}