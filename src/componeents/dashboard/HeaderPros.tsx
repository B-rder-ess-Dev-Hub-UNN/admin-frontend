
interface HeaderProps {
  currentPage: string;
  
}

const HeaderProps = ({ currentPage= 'Dashboard' }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center px-6 pt-24 md:pt-6 md:pb-6 bg-white  ">
      <div className="flex items-center space-x-2">
        <span className="font-semibold">Dashboard</span>
        <span className="mx-2">{'>'}</span>
        <span className=" text-gray-800">{currentPage}</span>
      </div>
    </div>
  );
}

export default HeaderProps;