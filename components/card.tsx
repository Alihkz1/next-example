interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="w-50 h-full p-4 rounded-lg bg-white shadow-md flex justify-center items-center">
      {children}
    </div>
  );
};

export default Card;
