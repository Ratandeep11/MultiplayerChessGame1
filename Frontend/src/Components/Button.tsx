export const Button=({onClick,children}:{onClick:()=>void, children :React.ReactNode})=>{
    return  <button  onClick={onClick}className="px-8 py-4 md:py-5 text-lg md:text-xl bg-green-500
       hover:bg-green-600 text-white 
       font-bold rounded-full shadow-md
        transition duration-300 ease-in-out">
       {children}</button>
}