interface Props {
  view: string;
  view_detail: string;
  onClick: () => void;
}

const BreadcrumbComponent = ({ view, view_detail, onClick }: Props) => {
  return (
    <div className="flex mt-2 mx-6 text-lg text-black border-blue-100 border-2 p-2">
      <div className="font-semibold mr-2 cursor-pointer" onClick={onClick}>{view}</div>
      {"<<"}
      <div className="font-semibold ml-2">{view_detail}</div>
    </div>
  );
};

export default BreadcrumbComponent;
