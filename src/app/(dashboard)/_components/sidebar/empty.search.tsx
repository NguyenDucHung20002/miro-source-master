import Image from "next/image";

interface IEmptySearchProps {
  emptyContent?: string;
  emptyKind?: string;
}

const EmptySearch = ({ emptyContent, emptyKind }: IEmptySearchProps) => {
  return (
    <>
      <div className="h-full flex flex-col items-center justify-center">
        <Image
          className="ml-3"
          src="/empty-org.svg"
          alt="Empty Organization"
          height={200}
          width={200}
        ></Image>
        <h2 className="text-2xl font-semibold ">
          Welcome to {emptyKind || "boards"}
        </h2>
        <p className="text-muted-foreground text-lg mt-2">{emptyContent}</p>
      </div>
    </>
  );
};

export default EmptySearch;
